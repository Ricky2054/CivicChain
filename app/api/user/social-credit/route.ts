import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import CivicEvent from '@/models/CivicEvent';

// GET - Fetch user's social credit data
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch user with social credit data
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get completed civic events
    const allEvents = await CivicEvent.find({});
    const completedEvents = allEvents
      .filter(event => 
        event.participants && 
        event.participants.some(p => 
          p.userId === userId && 
          p.status === 'completed'
        )
      )
      .sort((a, b) => {
        const aDate = a.participants.find(p => p.userId === userId)?.registrationDate || '';
        const bDate = b.participants.find(p => p.userId === userId)?.registrationDate || '';
        return new Date(bDate).getTime() - new Date(aDate).getTime(); // Descending order
      })
      .slice(0, 10);
    
    // Calculate recent activity
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const recentActivityCount = allEvents.filter(event => 
      event.participants && 
      event.participants.some(p => 
        p.userId === userId && 
        p.status === 'completed' && 
        new Date(p.registrationDate) >= oneMonthAgo
      )
    ).length;
    
    // Fetch leaderboard position
    const allUsers = await User.find({});
    const userRanking = allUsers.filter(u => 
      u.socialCredit && 
      u.socialCredit.score > (user.socialCredit?.score || 0)
    ).length;
    
    // Get top categories
    const categories = user.socialCredit?.categories || {};
    const sortedCategories = Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    // Calculate progress to next level
    const currentScore = user.socialCredit?.score || 0;
    const currentLevel = Math.floor(currentScore / 100) + 1;
    const pointsToNextLevel = (currentLevel * 100) - currentScore;
    const progressPercent = 100 - (pointsToNextLevel);
    
    // Get activity history (last 6 months)
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    // Group events by month manually instead of using mongoose aggregation
    const eventsByMonth = new Map();
    
    allEvents.forEach(event => {
      const participant = event.participants?.find(p => p.userId === userId && p.status === 'completed');
      if (participant && new Date(participant.registrationDate) >= sixMonthsAgo) {
        const date = new Date(participant.registrationDate);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (!eventsByMonth.has(yearMonth)) {
          eventsByMonth.set(yearMonth, { count: 0, points: 0, year: date.getFullYear(), month: date.getMonth() + 1 });
        }
        
        const monthData = eventsByMonth.get(yearMonth);
        monthData.count += 1;
        monthData.points += (event.points || 0);
      }
    });
    
    // Transform to monthly format
    const activityHistory = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const yearMonth = `${year}-${month}`;
      
      const found = eventsByMonth.get(yearMonth);
      
      activityHistory.unshift({
        month: d.toLocaleString('default', { month: 'short' }),
        year: year,
        activities: found ? found.count : 0,
        points: found ? found.points : 0
      });
    }
    
    return NextResponse.json({
      success: true,
      socialCredit: {
        ...(user.socialCredit || {}),
        level: currentLevel,
        rank: userRanking + 1,
        pointsToNextLevel,
        progressPercent,
        levelTitle: getLevelTitle(currentLevel),
        recentActivity: recentActivityCount,
        topCategories: sortedCategories.slice(0, 3),
        activityHistory,
        recentEvents: completedEvents.map(event => ({
          id: event.id,
          title: event.title,
          category: event.category,
          points: event.points,
          date: event.participants?.find(p => p.userId === userId)?.registrationDate
        }))
      }
    });
    
  } catch (error) {
    console.error('Error fetching social credit data:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user's social credit categories
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { userId, category, change, reason } = body;
    
    if (!userId || !category || change === undefined) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate category
    const validCategories = ['civic', 'finance', 'environment', 'education', 'health', 'community'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: 'Invalid category' },
        { status: 400 }
      );
    }
    
    // Fetch user
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Ensure socialCredit object exists
    if (!user.socialCredit) {
      user.socialCredit = {
        score: 0,
        lastUpdated: new Date().toISOString(),
        categories: {
          civic: 0,
          finance: 0,
          environment: 0,
          education: 0,
          health: 0,
          community: 0
        },
        history: []
      };
    }
    
    // Update category score
    const currentScore = user.socialCredit.categories[category] || 0;
    const newScore = Math.max(0, Math.min(100, currentScore + change));
    user.socialCredit.categories[category] = newScore;
    
    // Calculate overall score based on category averages
    const categories = user.socialCredit.categories;
    const totalScore = Object.values(categories).reduce((sum, val) => sum + (val as number), 0);
    const categoryCount = Object.keys(categories).length;
    
    user.socialCredit.score = Math.round(totalScore / categoryCount * 10);
    user.socialCredit.lastUpdated = new Date().toISOString();
    
    // Add to history if reason provided
    if (reason) {
      user.socialCredit.history = user.socialCredit.history || [];
      user.socialCredit.history.push({
        category,
        change,
        date: new Date().toISOString(),
        reason,
        newCategoryScore: newScore,
        newTotalScore: user.socialCredit.score
      });
      
      // Keep history limited to last 100 entries
      if (user.socialCredit.history.length > 100) {
        user.socialCredit.history = user.socialCredit.history.slice(-100);
      }
    }
    
    await User.update({ id: userId }, user);
    
    return NextResponse.json({
      success: true,
      message: 'Social credit updated successfully',
      socialCredit: {
        ...user.socialCredit,
        level: Math.floor(user.socialCredit.score / 100) + 1,
        levelTitle: getLevelTitle(Math.floor(user.socialCredit.score / 100) + 1)
      }
    });
    
  } catch (error) {
    console.error('Error updating social credit:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to get level title based on level
function getLevelTitle(level: number): string {
  if (level <= 1) return "Civic Starter";
  if (level <= 3) return "Community Helper";
  if (level <= 5) return "Civic Contributor";
  if (level <= 8) return "Community Champion";
  if (level <= 12) return "Civic Leader";
  if (level <= 18) return "City Influencer";
  if (level <= 25) return "Civic Visionary";
  return "Civic Legend";
} 