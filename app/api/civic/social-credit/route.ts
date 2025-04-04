import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    
    // In a real application, you would fetch the score from a database
    // For demo purposes, we'll return mock data
    
    const creditScore = 780;
    const scoreDetails = {
      financial: 85,
      civic: 92,
      environmental: 78,
      reputation: 88,
      loyalty: 75
    };
    
    const recentActivities = [
      {
        id: 1,
        activity: "Community Cleanup",
        date: "15 March 2023",
        points: "+15",
        pointsRaw: 15,
        impact: "Environmental",
        status: "Verified"
      },
      {
        id: 2,
        activity: "On-time Loan Repayment",
        date: "12 March 2023",
        points: "+10",
        pointsRaw: 10,
        impact: "Financial",
        status: "Verified"
      },
      {
        id: 3,
        activity: "Local Election Participation",
        date: "05 March 2023",
        points: "+25",
        pointsRaw: 25,
        impact: "Civic",
        status: "Verified"
      },
      {
        id: 4,
        activity: "Digital Literacy Workshop",
        date: "27 February 2023",
        points: "+20",
        pointsRaw: 20,
        impact: "Education",
        status: "Verified"
      }
    ];
    
    const badges = [
      {
        name: "Trusted Citizen",
        description: "Consistently high social credit score",
        level: "Gold",
        progress: 100
      },
      {
        name: "Community Leader",
        description: "Active participation in local governance",
        level: "Silver",
        progress: 75
      },
      {
        name: "Financial Steward",
        description: "Excellent financial responsibility record",
        level: "Gold",
        progress: 100
      },
      {
        name: "Environmental Champion",
        description: "Contributed to sustainability initiatives",
        level: "Bronze",
        progress: 50
      }
    ];
    
    // Calculate score level
    const getScoreLevel = (score: number) => {
      if (score >= 800) return "Excellent";
      if (score >= 700) return "Very Good";
      if (score >= 600) return "Good";
      if (score >= 500) return "Fair";
      return "Needs Improvement";
    };
    
    return NextResponse.json({
      success: true,
      creditScore: {
        score: creditScore,
        level: getScoreLevel(creditScore),
        details: scoreDetails,
        history: [
          { month: "Jan", score: 745 },
          { month: "Feb", score: 760 },
          { month: "Mar", score: 780 }
        ],
        recentActivities,
        badges,
        benefits: [
          {
            id: 1,
            title: "Preferential Loan Rates",
            description: "Access to loans at reduced interest rates based on your credit score.",
            discount: "-2.5% Interest"
          },
          {
            id: 2,
            title: "Fast-Track Verification",
            description: "Expedited verification process for new services and applications.",
            discount: "Priority Access"
          },
          {
            id: 3,
            title: "Community Governance",
            description: "Voting rights in community DAO proposals and initiatives.",
            discount: "3x Voting Weight"
          },
          {
            id: 4,
            title: "Exclusive Network",
            description: "Access to networking events and trusted partner directory.",
            discount: "Tier 2 Access"
          }
        ]
      }
    });
    
  } catch (error) {
    console.error("Error fetching social credit:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching social credit data" },
      { status: 500 }
    );
  }
} 