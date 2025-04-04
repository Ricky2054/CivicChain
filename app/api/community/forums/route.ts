import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import User from '@/models/User';

// Define a mongoose schema for Forum if not already defined elsewhere
let Forum;
try {
  Forum = mongoose.model('Forum');
} catch {
  const ForumSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true,
      enum: ['general', 'finance', 'governance', 'education', 'environment', 'health', 'technology', 'other']
    },
    createdBy: { 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true }
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    isActive: {
      type: Boolean,
      default: true
    },
    posts: [{
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true }
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      likes: { type: Number, default: 0 },
      likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      comments: [{
        content: { type: String, required: true },
        author: {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          name: { type: String, required: true }
        },
        createdAt: { type: Date, default: Date.now },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
      }],
      isActive: { type: Boolean, default: true }
    }]
  });

  // Add indexes
  ForumSchema.index({ category: 1 });
  ForumSchema.index({ createdAt: -1 });
  ForumSchema.index({ 'posts.createdAt': -1 });

  Forum = mongoose.model('Forum', ForumSchema);
}

// GET - Fetch forums and posts
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const forumId = searchParams.get('forumId');
    const category = searchParams.get('category');
    const limit = Number(searchParams.get('limit') || 10);
    const offset = Number(searchParams.get('offset') || 0);
    
    // If forumId is provided, fetch specific forum with posts
    if (forumId) {
      const forum = await Forum.findById(forumId);
      
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Sort posts by creation date (newest first)
      forum.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Apply pagination to posts if needed
      const paginatedPosts = forum.posts
        .filter(post => post.isActive)
        .slice(offset, offset + limit);
      
      return NextResponse.json({
        success: true,
        forum: {
          ...forum.toObject(),
          posts: paginatedPosts,
          totalPosts: forum.posts.filter(post => post.isActive).length
        }
      });
    }
    
    // Otherwise, fetch all forums based on category
    const query: any = { isActive: true };
    if (category) query.category = category;
    
    const forums = await Forum.find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    
    const totalCount = await Forum.countDocuments(query);
    
    // Process forums to include post count
    const processedForums = forums.map(forum => ({
      ...forum.toObject(),
      posts: undefined, // Don't send all posts in forum list
      postCount: forum.posts.filter(post => post.isActive).length,
      latestPost: forum.posts
        .filter(post => post.isActive)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null
    }));
    
    return NextResponse.json({
      success: true,
      forums: processedForums,
      pagination: {
        total: totalCount,
        offset,
        limit,
        hasMore: offset + forums.length < totalCount
      }
    });
    
  } catch (error) {
    console.error('Error fetching forums:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new forum, post, or comment
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Creating a new forum
    if (body.action === 'createForum') {
      const { title, description, category, userId } = body;
      
      if (!title || !description || !category || !userId) {
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
      
      const newForum = new Forum({
        title,
        description,
        category,
        createdBy: {
          userId,
          name: user.name
        },
        createdAt: new Date(),
        isActive: true,
        posts: []
      });
      
      await newForum.save();
      
      return NextResponse.json(
        {
          success: true,
          message: 'Forum created successfully',
          forum: newForum
        },
        { status: 201 }
      );
    }
    
    // Creating a new post in a forum
    if (body.action === 'createPost') {
      const { forumId, title, content, userId } = body;
      
      if (!forumId || !title || !content || !userId) {
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
      
      // Find the forum
      const forum = await Forum.findById(forumId);
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Add new post
      const newPost = {
        title,
        content,
        author: {
          userId,
          name: user.name
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        likedBy: [],
        comments: [],
        isActive: true
      };
      
      forum.posts.push(newPost);
      await forum.save();
      
      return NextResponse.json({
        success: true,
        message: 'Post created successfully',
        post: newPost
      });
    }
    
    // Adding a comment to a post
    if (body.action === 'addComment') {
      const { forumId, postId, content, userId } = body;
      
      if (!forumId || !postId || !content || !userId) {
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
      
      // Find the forum
      const forum = await Forum.findById(forumId);
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Find the post
      const postIndex = forum.posts.findIndex(
        p => p._id.toString() === postId && p.isActive
      );
      
      if (postIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Add new comment
      const newComment = {
        content,
        author: {
          userId,
          name: user.name
        },
        createdAt: new Date(),
        likes: 0,
        likedBy: []
      };
      
      forum.posts[postIndex].comments.push(newComment);
      await forum.save();
      
      return NextResponse.json({
        success: true,
        message: 'Comment added successfully',
        comment: newComment
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing forum request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update forum, post, or comment, handle likes
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Like a post
    if (body.action === 'likePost') {
      const { forumId, postId, userId } = body;
      
      if (!forumId || !postId || !userId) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      // Find the forum
      const forum = await Forum.findById(forumId);
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Find the post
      const postIndex = forum.posts.findIndex(
        p => p._id.toString() === postId && p.isActive
      );
      
      if (postIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Check if user already liked this post
      const alreadyLiked = forum.posts[postIndex].likedBy.some(
        id => id.toString() === userId
      );
      
      if (alreadyLiked) {
        // Unlike the post
        forum.posts[postIndex].likes -= 1;
        forum.posts[postIndex].likedBy = forum.posts[postIndex].likedBy.filter(
          id => id.toString() !== userId
        );
      } else {
        // Like the post
        forum.posts[postIndex].likes += 1;
        forum.posts[postIndex].likedBy.push(userId);
      }
      
      await forum.save();
      
      return NextResponse.json({
        success: true,
        message: alreadyLiked ? 'Post unliked' : 'Post liked',
        liked: !alreadyLiked,
        likes: forum.posts[postIndex].likes
      });
    }
    
    // Edit a post
    if (body.action === 'editPost') {
      const { forumId, postId, userId, title, content } = body;
      
      if (!forumId || !postId || !userId || (!title && !content)) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      // Find the forum
      const forum = await Forum.findById(forumId);
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Find the post
      const postIndex = forum.posts.findIndex(
        p => p._id.toString() === postId && p.isActive
      );
      
      if (postIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Check if user is the author
      if (forum.posts[postIndex].author.userId.toString() !== userId) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized to edit this post' },
          { status: 403 }
        );
      }
      
      // Update post
      if (title) forum.posts[postIndex].title = title;
      if (content) forum.posts[postIndex].content = content;
      forum.posts[postIndex].updatedAt = new Date();
      
      await forum.save();
      
      return NextResponse.json({
        success: true,
        message: 'Post updated successfully',
        post: forum.posts[postIndex]
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing forum update:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Mark forum, post, or comment as inactive
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const forumId = searchParams.get('forumId');
    const postId = searchParams.get('postId');
    const userId = searchParams.get('userId');
    
    if (!userId || (!forumId && !postId)) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
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
    
    // Delete an entire forum (admin only)
    if (forumId && !postId) {
      // Check admin permissions (simplified)
      if (user.socialCredit.score < 500) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized for this action' },
          { status: 403 }
        );
      }
      
      // Find and mark forum as inactive
      const forum = await Forum.findByIdAndUpdate(
        forumId,
        { isActive: false },
        { new: true }
      );
      
      if (!forum) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Forum removed successfully'
      });
    }
    
    // Delete a post
    if (forumId && postId) {
      // Find the forum
      const forum = await Forum.findById(forumId);
      if (!forum || !forum.isActive) {
        return NextResponse.json(
          { success: false, message: 'Forum not found' },
          { status: 404 }
        );
      }
      
      // Find the post
      const postIndex = forum.posts.findIndex(
        p => p._id.toString() === postId && p.isActive
      );
      
      if (postIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Check if user is the author or has admin rights
      if (forum.posts[postIndex].author.userId.toString() !== userId && user.socialCredit.score < 500) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized to delete this post' },
          { status: 403 }
        );
      }
      
      // Mark post as inactive
      forum.posts[postIndex].isActive = false;
      await forum.save();
      
      return NextResponse.json({
        success: true,
        message: 'Post removed successfully'
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing forum delete:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 