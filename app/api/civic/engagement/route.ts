import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would fetch from a database
    // For demo, generate dynamic data based on userId
    
    // Use userId as seed for "randomness"
    const seed = userId 
      ? parseInt(userId.toString().split('').map(c => c.charCodeAt(0)).join('').slice(0, 5)) 
      : Date.now();
    const randomMultiplier = (seed % 10) / 10 + 0.5; // Range 0.5-1.4
    
    // Calculate engagement stats with mathematical variations
    const totalEngagements = Math.floor(48 * randomMultiplier);
    const activitiesCompleted = Math.floor(36 * randomMultiplier);
    const percentile = Math.min(98, Math.floor(75 + (seed % 25)));
    const totalPoints = Math.floor(420 * randomMultiplier);
    const level = Math.floor(4 + (totalPoints / 150)); // Level increases every 150 points
    const nextLevelPoints = (level + 1) * 150;
    const pointsToNextLevel = nextLevelPoints - totalPoints;
    const progressPercent = Math.floor((totalPoints % 150) / 1.5); // 0-100 percentage to next level
    
    // Current date for generating recent and upcoming activities
    const now = new Date();
    
    // Local events with mathematically derived properties
    const localEvents = [
      {
        id: 1,
        title: "Community Cleanup Drive",
        description: "Join the community in cleaning up the local park and surrounding areas",
        date: new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 3 days from now
        time: "09:00 AM - 12:00 PM",
        location: "Central Park",
        participants: Math.floor(42 * randomMultiplier),
        maxParticipants: Math.floor(75 * randomMultiplier),
        points: 50,
        categories: ["Environment", "Community Service"],
        isRegistered: Math.random() > 0.5
      },
      {
        id: 2,
        title: "Senior Citizens Health Camp",
        description: "Volunteer at the health camp for senior citizens and help with basic health checkups",
        date: new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 7 days from now
        time: "10:00 AM - 04:00 PM",
        location: "Community Center",
        participants: Math.floor(28 * randomMultiplier),
        maxParticipants: Math.floor(50 * randomMultiplier),
        points: 75,
        categories: ["Healthcare", "Elderly Care"],
        isRegistered: Math.random() > 0.7
      },
      {
        id: 3,
        title: "Digital Literacy Workshop",
        description: "Teach basic digital skills to underserved community members",
        date: new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 14 days from now
        time: "02:00 PM - 05:00 PM",
        location: "Public Library",
        participants: Math.floor(18 * randomMultiplier),
        maxParticipants: Math.floor(30 * randomMultiplier),
        points: 60,
        categories: ["Education", "Digital Inclusion"],
        isRegistered: false
      }
    ];
    
    // Online events
    const onlineEvents = [
      {
        id: 4,
        title: "Civic Tech Hackathon",
        description: "Participate in developing technology solutions for civic problems",
        date: new Date(now.getTime() + (10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 10 days from now
        time: "09:00 AM - 06:00 PM",
        platform: "Zoom & GitHub",
        participants: Math.floor(120 * randomMultiplier),
        maxParticipants: Math.floor(200 * randomMultiplier),
        points: 100,
        categories: ["Technology", "Innovation"],
        isRegistered: Math.random() > 0.6
      },
      {
        id: 5,
        title: "Policy Feedback Session",
        description: "Provide feedback on proposed local policies and initiatives",
        date: new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // 5 days from now
        time: "07:00 PM - 08:30 PM",
        platform: "Google Meet",
        participants: Math.floor(65 * randomMultiplier),
        maxParticipants: Math.floor(100 * randomMultiplier),
        points: 40,
        categories: ["Governance", "Policy"],
        isRegistered: Math.random() > 0.4
      }
    ];
    
    // Completed activities with mathematical patterns
    const daysAgo = (days) => new Date(now.getTime() - (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    const completedActivities = [
      {
        id: 101,
        title: "Neighborhood Watch Meeting",
        date: daysAgo(Math.floor(5 + (seed % 10))),
        points: 30,
        impact: "Helped increase community safety awareness"
      },
      {
        id: 102,
        title: "Tree Planting Initiative",
        date: daysAgo(Math.floor(12 + (seed % 15))),
        points: 50,
        impact: "Contributed to planting 15 trees in the local area"
      },
      {
        id: 103,
        title: "Voter Registration Drive",
        date: daysAgo(Math.floor(20 + (seed % 20))),
        points: 45,
        impact: "Helped register 23 new voters"
      },
      {
        id: 104,
        title: "Local School Volunteer Program",
        date: daysAgo(Math.floor(30 + (seed % 25))),
        points: 60,
        impact: "Assisted in after-school programs for underprivileged children"
      }
    ];
    
    // Categorize points (with mathematically consistent sums)
    const pointCategories = [
      { name: "Environment", points: Math.floor(totalPoints * 0.25) },
      { name: "Education", points: Math.floor(totalPoints * 0.2) },
      { name: "Healthcare", points: Math.floor(totalPoints * 0.15) },
      { name: "Community Service", points: Math.floor(totalPoints * 0.3) },
      { name: "Governance", points: Math.floor(totalPoints * 0.1) }
    ];
    
    // Calculate total again to ensure it matches after floor operations
    let recalculatedTotal = pointCategories.reduce((sum, cat) => sum + cat.points, 0);
    
    // Adjust first category to ensure the total is correct (account for rounding)
    pointCategories[0].points += (totalPoints - recalculatedTotal);
    
    // Badges earned
    const badges = [
      { name: "Environmental Protector", level: Math.floor(2 + (seed % 3)), points: pointCategories[0].points },
      { name: "Education Advocate", level: Math.floor(1 + (seed % 3)), points: pointCategories[1].points },
      { name: "Community Builder", level: Math.floor(3 + (seed % 3)), points: pointCategories[3].points }
    ];
    
    const engagementData = {
      userStats: {
        totalEngagements,
        activitiesCompleted,
        totalPoints,
        percentile,
        level,
        pointsToNextLevel,
        progressPercent
      },
      events: {
        local: localEvents,
        online: onlineEvents
      },
      completedActivities,
      pointCategories,
      badges
    };
    
    return NextResponse.json(engagementData);
  } catch (error) {
    console.error("Error in civic engagement API:", error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 