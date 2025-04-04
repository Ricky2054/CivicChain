import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import User from '@/models/User';

// Define a mongoose schema for Proposal if not already defined elsewhere
let Proposal;
try {
  Proposal = mongoose.model('Proposal');
} catch {
  const ProposalSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    proposer: { 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true }
    },
    category: { 
      type: String, 
      required: true,
      enum: ['finance', 'community', 'infrastructure', 'education', 'environment', 'health', 'other']
    },
    status: { 
      type: String, 
      required: true,
      enum: ['pending', 'active', 'completed', 'rejected'],
      default: 'pending'
    },
    dateCreated: { 
      type: Date, 
      default: Date.now 
    },
    deadline: { 
      type: Date, 
      required: true 
    },
    votingResults: {
      inFavor: { type: Number, default: 0 },
      against: { type: Number, default: 0 },
      abstain: { type: Number, default: 0 }
    },
    votes: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      vote: { type: String, enum: ['inFavor', 'against', 'abstain'], required: true },
      votingPower: { type: Number, default: 1 },
      timestamp: { type: Date, default: Date.now }
    }],
    comments: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      userName: { type: String, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }],
    updateHistory: [{
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      details: { type: String }
    }],
    result: {
      type: String,
      enum: ['passed', 'failed', 'pending'],
      default: 'pending'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  });

  // Add indexes
  ProposalSchema.index({ status: 1, deadline: 1 });
  ProposalSchema.index({ 'proposer.userId': 1 });
  ProposalSchema.index({ category: 1 });

  // Virtual for calculating total votes
  ProposalSchema.virtual('totalVotes').get(function() {
    return this.votingResults.inFavor + this.votingResults.against + this.votingResults.abstain;
  });

  // Virtual for checking if deadline has passed
  ProposalSchema.virtual('isExpired').get(function() {
    return new Date() > this.deadline;
  });

  // Method to finalize a proposal result
  ProposalSchema.methods.finalizeResult = async function() {
    if (this.status !== 'active' || !this.isExpired) {
      return false;
    }
    
    const { inFavor, against } = this.votingResults;
    const totalVotesCount = inFavor + against;
    
    if (totalVotesCount === 0) {
      this.result = 'failed';
      this.status = 'completed';
      this.updateHistory.push({
        status: 'completed',
        details: 'Proposal failed due to no votes'
      });
      return await this.save();
    }
    
    // Simple majority rule
    if (inFavor > against) {
      this.result = 'passed';
    } else {
      this.result = 'failed';
    }
    
    this.status = 'completed';
    this.updateHistory.push({
      status: 'completed',
      details: `Proposal ${this.result} with ${inFavor} votes in favor and ${against} against`
    });
    
    return await this.save();
  };

  Proposal = mongoose.model('Proposal', ProposalSchema);
}

// GET - Fetch proposals
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = Number(searchParams.get('limit') || 10);
    const offset = Number(searchParams.get('offset') || 0);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Build filter query
    const query: any = { isActive: true };
    if (status) query.status = status;
    if (category) query.category = category;
    
    // Fetch proposals
    const proposals = await Proposal.find(query)
      .sort({ dateCreated: -1 })
      .skip(offset)
      .limit(limit);
    
    // Get total count for pagination
    const totalCount = await Proposal.countDocuments(query);
    
    // Process proposals to include user's vote
    const processedProposals = proposals.map(proposal => {
      const userVote = proposal.votes.find(v => v.userId.toString() === userId);
      
      // Calculate time remaining
      let timeRemaining = null;
      if (proposal.status === 'active') {
        const now = new Date();
        const deadline = new Date(proposal.deadline);
        if (deadline > now) {
          const diff = deadline.getTime() - now.getTime();
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          timeRemaining = { days, hours };
        }
      }
      
      return {
        ...proposal.toObject({ virtuals: true }),
        userVote: userVote ? userVote.vote : null,
        timeRemaining
      };
    });
    
    // Get user governance stats
    const userStats = {
      proposalsCreated: await Proposal.countDocuments({ 'proposer.userId': userId }),
      proposalsVoted: await Proposal.countDocuments({ 'votes.userId': userId }),
      votingPower: calculateVotingPower(user)
    };
    
    return NextResponse.json({
      success: true,
      proposals: processedProposals,
      pagination: {
        total: totalCount,
        offset,
        limit,
        hasMore: offset + proposals.length < totalCount
      },
      userStats
    });
    
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new proposal or comment
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // If commentId is present, this is a comment addition
    if (body.proposalId && body.comment) {
      const { proposalId, userId, comment } = body;
      
      if (!proposalId || !userId || !comment) {
        return NextResponse.json(
          { success: false, message: 'Proposal ID, User ID and comment content are required' },
          { status: 400 }
        );
      }
      
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Find the proposal
      const proposal = await Proposal.findById(proposalId);
      if (!proposal) {
        return NextResponse.json(
          { success: false, message: 'Proposal not found' },
          { status: 404 }
        );
      }
      
      // Add comment
      proposal.comments.push({
        userId,
        userName: user.name,
        content: comment,
        timestamp: new Date()
      });
      
      await proposal.save();
      
      return NextResponse.json({
        success: true,
        message: 'Comment added successfully',
        comment: proposal.comments[proposal.comments.length - 1]
      });
      
    } else {
      // This is a new proposal creation
      const { 
        title, 
        description, 
        userId, 
        category,
        deadline
      } = body;
      
      // Validate required fields
      if (!title || !description || !userId || !category || !deadline) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Check if user has sufficient social credit
      if (user.socialCredit.score < 100) {
        return NextResponse.json(
          { success: false, message: 'Insufficient social credit to create a proposal' },
          { status: 403 }
        );
      }
      
      // Create new proposal
      const newProposal = new Proposal({
        title,
        description,
        proposer: {
          userId,
          name: user.name
        },
        category,
        status: 'pending',
        dateCreated: new Date(),
        deadline: new Date(deadline),
        votingResults: {
          inFavor: 0,
          against: 0,
          abstain: 0
        },
        votes: [],
        comments: [],
        updateHistory: [{
          status: 'pending',
          details: 'Proposal created and pending approval'
        }]
      });
      
      await newProposal.save();
      
      return NextResponse.json(
        {
          success: true,
          message: 'Proposal created successfully',
          proposal: newProposal
        },
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error('Error processing proposal request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Vote on a proposal or update proposal status
export async function PUT(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    await dbConnect();
    
    const body = await req.json();
    const { proposalId, userId, action, vote, adminAction } = body;
    
    if (!proposalId) {
      return NextResponse.json(
        { success: false, message: 'Proposal ID is required' },
        { status: 400 }
      );
    }
    
    // Find the proposal
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return NextResponse.json(
        { success: false, message: 'Proposal not found' },
        { status: 404 }
      );
    }
    
    // Admin actions for proposal status changes
    if (adminAction && userId) {
      // Check if user has admin role (simplified check, should check against user roles)
      const user = await User.findById(userId);
      if (!user || user.socialCredit.score < 500) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized for admin actions' },
          { status: 403 }
        );
      }
      
      if (adminAction === 'approve' && proposal.status === 'pending') {
        proposal.status = 'active';
        proposal.updateHistory.push({
          status: 'active',
          details: 'Proposal approved for voting'
        });
      } else if (adminAction === 'reject' && proposal.status === 'pending') {
        proposal.status = 'rejected';
        proposal.result = 'failed';
        proposal.updateHistory.push({
          status: 'rejected',
          details: 'Proposal rejected by admin'
        });
      } else if (adminAction === 'finalize' && proposal.status === 'active') {
        await proposal.finalizeResult();
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid admin action for proposal status' },
          { status: 400 }
        );
      }
      
      await proposal.save({ session });
      await session.commitTransaction();
      
      return NextResponse.json({
        success: true,
        message: `Proposal ${adminAction}d successfully`,
        proposal
      });
    }
    
    // Regular voting actions
    if (action === 'vote' && userId && vote) {
      if (proposal.status !== 'active') {
        return NextResponse.json(
          { success: false, message: 'This proposal is not open for voting' },
          { status: 400 }
        );
      }
      
      if (new Date() > proposal.deadline) {
        return NextResponse.json(
          { success: false, message: 'Voting deadline has passed' },
          { status: 400 }
        );
      }
      
      if (!['inFavor', 'against', 'abstain'].includes(vote)) {
        return NextResponse.json(
          { success: false, message: 'Invalid vote value' },
          { status: 400 }
        );
      }
      
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Calculate voting power based on user's social credit
      const votingPower = calculateVotingPower(user);
      
      // Check if user has already voted
      const existingVoteIndex = proposal.votes.findIndex(
        v => v.userId.toString() === userId
      );
      
      if (existingVoteIndex !== -1) {
        // User has voted before - update vote
        const oldVote = proposal.votes[existingVoteIndex].vote;
        const oldPower = proposal.votes[existingVoteIndex].votingPower;
        
        // Remove old vote from results
        proposal.votingResults[oldVote] -= oldPower;
        
        // Update with new vote
        proposal.votes[existingVoteIndex] = {
          userId,
          vote,
          votingPower,
          timestamp: new Date()
        };
        
        // Add new vote to results
        proposal.votingResults[vote] += votingPower;
      } else {
        // New vote
        proposal.votes.push({
          userId,
          vote,
          votingPower,
          timestamp: new Date()
        });
        
        // Add vote to results
        proposal.votingResults[vote] += votingPower;
      }
      
      await proposal.save({ session });
      await session.commitTransaction();
      
      return NextResponse.json({
        success: true,
        message: 'Vote recorded successfully',
        proposal
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
    
  } catch (error) {
    await session.abortTransaction();
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}

// DELETE - Flag a proposal as inactive
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const proposalId = searchParams.get('id');
    const userId = searchParams.get('userId');
    
    if (!proposalId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Proposal ID and User ID are required' },
        { status: 400 }
      );
    }
    
    // Check if user has admin permissions (simplified)
    const user = await User.findById(userId);
    if (!user || user.socialCredit.score < 500) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized for this action' },
        { status: 403 }
      );
    }
    
    // Find and mark proposal as inactive
    const proposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { isActive: false },
      { new: true }
    );
    
    if (!proposal) {
      return NextResponse.json(
        { success: false, message: 'Proposal not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Proposal removed successfully'
    });
    
  } catch (error) {
    console.error('Error removing proposal:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to calculate voting power based on user's social credit
function calculateVotingPower(user: any): number {
  const baseScore = user.socialCredit.score || 0;
  
  // Basic calculation: 1 voting power per 100 social credit points, minimum 1
  const votingPower = Math.max(1, Math.floor(baseScore / 100));
  
  return votingPower;
} 