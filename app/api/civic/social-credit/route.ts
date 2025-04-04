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
    
    // In a real app, this would fetch from a database
    // For demo, generate dynamic data based on userId
    
    // Use userId as seed for "randomness"
    const seed = userId 
      ? parseInt(userId.toString().split('').map(c => c.charCodeAt(0)).join('').slice(0, 5)) 
      : Date.now();
    const randomMultiplier = (seed % 10) / 10 + 0.5; // Range 0.5-1.4
    
    // Calculate the score based on userId as seed
    const baseScore = 600;
    const scoreRange = 300;
    const score = Math.min(950, Math.floor(baseScore + (seed % scoreRange)));
    
    // Calculate individual category scores
    const financialScore = Math.floor(score * (0.25 + (seed % 10) / 100));
    const civicScore = Math.floor(score * (0.20 + (seed % 15) / 100));
    const environmentalScore = Math.floor(score * (0.15 + (seed % 10) / 100));
    const reputationScore = Math.floor(score * (0.25 + (seed % 10) / 100));
    const loyaltyScore = Math.floor(score * (0.15 + (seed % 10) / 100));
    
    // Scale for display
    const scaledFinancial = Math.min(100, Math.floor(financialScore / 10));
    const scaledCivic = Math.min(100, Math.floor(civicScore / 10));
    const scaledEnvironmental = Math.min(100, Math.floor(environmentalScore / 10));
    const scaledReputation = Math.min(100, Math.floor(reputationScore / 10));
    const scaledLoyalty = Math.min(100, Math.floor(loyaltyScore / 10));
    
    // Determine score level
    let level = '';
    let color = '';
    if (score >= 900) {
      level = 'Excellent';
      color = '#4CAF50'; // Green
    } else if (score >= 800) {
      level = 'Very Good';
      color = '#8BC34A'; // Light Green
    } else if (score >= 700) {
      level = 'Good';
      color = '#CDDC39'; // Lime
    } else if (score >= 600) {
      level = 'Fair';
      color = '#FFEB3B'; // Yellow
    } else if (score >= 500) {
      level = 'Poor';
      color = '#FFC107'; // Amber
    } else {
      level = 'Very Poor';
      color = '#FF5722'; // Deep Orange
    }
    
    // Create recent activities affecting score
    const activityTypes = ['financial_payment', 'civic_participation', 'environmental_action', 'community_engagement', 'digital_verification'];
    const actionDescriptions = [
      'On-time loan payment', 
      'Participated in community cleanup', 
      'Used green transportation',
      'Verified digital identity',
      'Completed civic engagement survey',
      'Participated in local governance',
      'Reduced carbon footprint',
      'Supported local businesses',
      'Reported infrastructure issue',
      'Participated in civic tech project'
    ];
    
    const now = new Date();
    const recentActivities = Array.from({ length: 8 }, (_, i) => {
      const isPositive = Math.random() > 0.2;
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const pointChange = isPositive ? 
        Math.floor(5 + Math.random() * 15) : 
        -Math.floor(5 + Math.random() * 10);
      
      const daysAgo = Math.floor(i * 3 + Math.random() * 5);
      const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      
      return {
        id: `act-${userId}-${i}`,
        type,
        description: actionDescriptions[Math.floor(Math.random() * actionDescriptions.length)],
        pointChange,
        date: date.toISOString(),
        impact: isPositive ? 'positive' : 'negative'
      };
    });
    
    // Sort activities by date (newest first)
    recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Generate badges
    const badges = [
      {
        id: 'badge-financial',
        name: 'Financial Responsible',
        level: Math.floor(1 + (seed % 3)),
        category: 'financial',
        description: 'Maintaining excellent payment history',
        earnedAt: new Date(now.getTime() - (20 + (seed % 10)) * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'badge-civic',
        name: 'Civic Contributor',
        level: Math.floor(1 + (seed % 3)),
        category: 'civic',
        description: 'Active participation in community initiatives',
        earnedAt: new Date(now.getTime() - (30 + (seed % 15)) * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'badge-environmental',
        name: 'Green Guardian',
        level: Math.floor(1 + (seed % 3)),
        category: 'environmental',
        description: 'Supporting environmental sustainability',
        earnedAt: new Date(now.getTime() - (45 + (seed % 20)) * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    // Benefits based on score
    const benefits = [
      {
        id: 'benefit-loan',
        name: 'Preferential Loan Rates',
        description: 'Access to loans with reduced interest rates',
        requiredScore: 700,
        isEligible: score >= 700
      },
      {
        id: 'benefit-priority',
        name: 'Priority Government Services',
        description: 'Expedited processing of government applications',
        requiredScore: 750,
        isEligible: score >= 750
      },
      {
        id: 'benefit-discount',
        name: 'Public Transport Discounts',
        description: 'Discounted rates for public transportation',
        requiredScore: 650,
        isEligible: score >= 650
      },
      {
        id: 'benefit-scholarship',
        name: 'Educational Scholarship Eligibility',
        description: 'Qualification for educational financial assistance',
        requiredScore: 800,
        isEligible: score >= 800
      },
      {
        id: 'benefit-healthcare',
        name: 'Healthcare Benefits',
        description: 'Additional healthcare coverage and discounts',
        requiredScore: 850,
        isEligible: score >= 850
      }
    ];
    
    return NextResponse.json({
      userId,
      score,
      level,
      color,
      percentile: Math.min(99, Math.floor(60 + (score - 600) / 3.5)),
      categories: [
        { name: 'Financial', score: financialScore, scaledScore: scaledFinancial },
        { name: 'Civic', score: civicScore, scaledScore: scaledCivic },
        { name: 'Environmental', score: environmentalScore, scaledScore: scaledEnvironmental },
        { name: 'Reputation', score: reputationScore, scaledScore: scaledReputation },
        { name: 'Loyalty', score: loyaltyScore, scaledScore: scaledLoyalty }
      ],
      recentActivities,
      badges,
      benefits,
      history: {
        lastMonth: score - Math.floor(15 + Math.random() * 30) * (Math.random() > 0.7 ? 1 : -1),
        lastQuarter: score - Math.floor(30 + Math.random() * 50) * (Math.random() > 0.6 ? 1 : -1),
        lastYear: score - Math.floor(50 + Math.random() * 100) * (Math.random() > 0.6 ? 1 : -1),
      }
    });
  } catch (error) {
    console.error('Error fetching social credit score:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 