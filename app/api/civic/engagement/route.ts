import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CivicEvent from '@/models/CivicEvent';
import User from '@/models/User';

// GET - Fetch civic engagement opportunities
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Build filter query
    const query: any = { isActive: true };
    if (category) query.category = category;
    if (type) query.type = type;
    
    // Fetch all active civic events
    const opportunities = await CivicEvent.find(query);
    
    // Sort opportunities by startDate
    opportunities.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    // Add registration status for each event
    const processedOpportunities = opportunities.map(event => {
      const registration = event.participants?.find(
        p => p.userId === userId
      );
      
      return {
        ...event,
        isRegistered: !!registration,
        registrationStatus: registration ? registration.status : null
      };
    });
    
    // Calculate user engagement stats
    const userEvents = await CivicEvent.find({
      participants: {
        $elemMatch: {
          userId: userId,
          status: { $in: ['completed', 'attended'] }
        }
      }
    });
    
    const totalPoints = userEvents.reduce((sum, event) => sum + (event.points || 0), 0);
    const activitiesCompleted = userEvents.length;
    
    // Get this month's activities
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const thisMonthEvents = userEvents.filter(event => 
      event.participants.some(p => 
        p.userId === userId && 
        new Date(p.registrationDate) >= thisMonth
      )
    );
    
    // Get user's position in leaderboard (simplified)
    const allUsers = await User.find({}, { id: 1, name: 1, socialCredit: 1 });
    
    // Sort users by socialCredit score
    allUsers.sort((a, b) => (b.socialCredit?.score || 0) - (a.socialCredit?.score || 0));
    
    const userRank = allUsers.findIndex(u => u.id === userId) + 1;
    
    const userStats = {
      totalPoints,
      activitiesCompleted,
      activitiesThisMonth: thisMonthEvents.length,
      level: Math.floor(totalPoints / 100) + 1,
      levelTitle: getLevelTitle(Math.floor(totalPoints / 100) + 1),
      progressPercent: (totalPoints % 100),
      pointsToNextLevel: 100 - (totalPoints % 100),
      communityRank: userRank,
      totalParticipants: allUsers.length,
      rankChange: Math.floor(Math.random() * 5) + 1 // Mock data for demo
    };
    
    return NextResponse.json({
      success: true,
      opportunities: processedOpportunities,
      userStats
    });
    
  } catch (error) {
    console.error('Error fetching engagement data:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Register for an event or create an event
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // If eventId is present, this is a registration request
    if (body.eventId) {
      const { userId, eventId } = body;
      
      if (!userId || !eventId) {
        return NextResponse.json(
          { success: false, message: 'User ID and Event ID are required' },
          { status: 400 }
        );
      }
      
      // Find the event
      const event = await CivicEvent.findOne({ id: eventId });
      if (!event) {
        return NextResponse.json(
          { success: false, message: 'Event not found' },
          { status: 404 }
        );
      }
      
      // Check if already registered
      const alreadyRegistered = event.participants?.some(
        p => p.userId === userId
      );
      
      if (alreadyRegistered) {
        return NextResponse.json(
          { success: false, message: 'Already registered for this event' },
          { status: 409 }
        );
      }
      
      // Check if max participants reached
      if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
        return NextResponse.json(
          { success: false, message: 'Event has reached maximum participants' },
          { status: 409 }
        );
      }
      
      // Ensure participants array exists
      if (!event.participants) {
        event.participants = [];
      }
      
      // Register user for the event
      event.participants.push({
        userId,
        status: 'registered',
        registrationDate: new Date().toISOString()
      });
      
      // Increment participant count
      event.currentParticipants = (event.currentParticipants || 0) + 1;
      
      await CivicEvent.update({ id: eventId }, event);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully registered for the event',
        event
      });
      
    } else {
      // This is a new event creation request
      const { 
        title, 
        description, 
        category, 
        type, 
        location, 
        organizer, 
        startDate,
        endDate,
        points,
        maxParticipants,
        image
      } = body;
      
      // Validate required fields
      if (!title || !description || !category || !type || !organizer || !startDate || !endDate || !points) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      // Create new event
      const newEvent = {
        id: Date.now().toString(), // Create a unique ID
        title,
        description,
        category,
        type,
        location: location || null,
        organizer,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        points,
        maxParticipants: maxParticipants || null,
        currentParticipants: 0,
        image: image || null,
        isActive: true,
        participants: []
      };
      
      await CivicEvent.create(newEvent);
      
      return NextResponse.json(
        {
          success: true,
          message: 'Event created successfully',
          event: newEvent
        },
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error('Error processing civic event request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update event status or participant status
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { eventId, userId, participantStatus, eventStatus } = body;
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    // Find the event
    const event = await CivicEvent.findOne({ id: eventId });
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    // If updating participant status
    if (userId && participantStatus) {
      if (!event.participants) {
        return NextResponse.json(
          { success: false, message: 'No participants found for this event' },
          { status: 404 }
        );
      }
      
      const participantIndex = event.participants.findIndex(p => p.userId === userId);
      
      if (participantIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'User not registered for this event' },
          { status: 404 }
        );
      }
      
      // Update the participant status
      event.participants[participantIndex].status = participantStatus;
      
      // If the participant has completed the event, update social credit score
      if (participantStatus === 'completed' || participantStatus === 'attended') {
        // Find the user
        const user = await User.findOne({ id: userId });
        
        if (user && user.socialCredit) {
          // Update civic category score and overall score
          user.socialCredit.categories.civic += Math.min(10, event.points / 10);
          user.socialCredit.score += event.points;
          user.socialCredit.lastUpdated = new Date().toISOString();
          
          // Keep scores within bounds
          if (user.socialCredit.categories.civic > 100) {
            user.socialCredit.categories.civic = 100;
          }
          
          await User.update({ id: userId }, user);
        }
      }
      
      await CivicEvent.update({ id: eventId }, event);
      
      return NextResponse.json({
        success: true,
        message: 'Participant status updated successfully',
        event
      });
    }
    
    // If updating event status
    if (eventStatus !== undefined) {
      event.isActive = eventStatus;
      
      await CivicEvent.update({ id: eventId }, event);
      
      return NextResponse.json({
        success: true,
        message: 'Event status updated successfully',
        event
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'No update parameters provided' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove an event
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    // Instead of delete, set to inactive (soft delete)
    const event = await CivicEvent.findOne({ id: eventId });
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    event.isActive = false;
    
    await CivicEvent.update({ id: eventId }, event);
    
    return NextResponse.json({
      success: true,
      message: 'Event successfully deactivated'
    });
    
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getLevelTitle(level: number): string {
  const titles = [
    'Civic Novice',
    'Engaged Citizen',
    'Community Contributor',
    'Civic Leader',
    'Community Champion',
    'Civic Hero',
    'Social Impact Maker',
    'Community Pillar',
    'Civic Visionary',
    'Legendary Citizen'
  ];
  
  if (level <= 0) return titles[0];
  if (level > titles.length) return titles[titles.length - 1];
  return titles[level - 1];
} 