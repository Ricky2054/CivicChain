import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // In a real app, we would fetch from a database
    // For demo, we'll create mock data with some mathematical patterns
    
    // Generate 20 leaderboard entries with mathematical patterns for scores
    const leaderboardEntries = Array.from({ length: 20 }, (_, i) => {
      const rank = i + 1
      
      // Base score decreases slightly with rank using a logarithmic function
      // This gives a more realistic distribution where top users are closer in score
      const baseScore = Math.round(1000 * Math.pow(0.95, Math.log(rank + 1)))
      
      // Add some randomness to make scores look more realistic
      const randomFactor = 0.9 + (Math.random() * 0.2) // Between 0.9 and 1.1
      const totalScore = Math.round(baseScore * randomFactor)
      
      // Calculate component scores that add up to total
      const civicScore = Math.round(totalScore * (0.4 + (Math.random() * 0.1)))
      const financialScore = Math.round(totalScore * (0.3 + (Math.random() * 0.1)))
      const environmentalScore = totalScore - civicScore - financialScore
      
      // Randomly assign badge types (more badges for higher ranks)
      const badgeTypes = ["Civic Leader", "Financial Guru", "Environmental Champion", "Local Hero", "Digital Innovator"]
      const badgeCount = Math.max(1, Math.floor((20 - rank) / 4))
      const badges = Array.from({ length: badgeCount }, () => {
        return badgeTypes[Math.floor(Math.random() * badgeTypes.length)]
      })
      
      // Determine if this entry has moved up or down
      const movement = rank <= 3 
        ? { direction: "up", value: Math.floor(Math.random() * 3) + 1 }
        : (Math.random() > 0.7 
          ? { direction: "down", value: Math.floor(Math.random() * 3) + 1 }
          : { direction: "up", value: Math.floor(Math.random() * 3) + 1 })
      
      // Generate synthetic user data
      const firstNames = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Ananya", "Rohan", "Nisha", "Arjun", "Meera"]
      const lastNames = ["Kumar", "Singh", "Sharma", "Patel", "Verma", "Shah", "Gupta", "Joshi", "Das", "Reddy"]
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      
      // Mask part of the name for privacy
      const displayName = `${firstName} ${lastName.charAt(0)}.`
      
      return {
        rank,
        userId: `user-${100 + rank}`,
        name: displayName,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${rank}`,
        totalScore,
        civicScore,
        financialScore,
        environmentalScore,
        badges: [...new Set(badges)], // Remove duplicates
        movement,
        isCurrentUser: rank === 12 // For demo, we'll say the user viewing this is ranked 12th
      }
    })
    
    // Add current user data to our response
    const currentUserData = leaderboardEntries.find(entry => entry.isCurrentUser) || {
      rank: 12,
      userId: "user-112",
      name: "You",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=current-user",
      totalScore: 820,
      civicScore: 340,
      financialScore: 270,
      environmentalScore: 210,
      badges: ["Civic Leader", "Local Hero"],
      movement: { direction: "up", value: 3 },
      isCurrentUser: true
    }
    
    // Calculate some community stats based on mathematical patterns
    const communityStats = {
      totalUsers: 547,
      totalCivicActions: 2845,
      totalStakedAmount: "129,450 CVC",
      averageScore: 624,
      topCivicCategory: "Infrastructure",
      userPercentile: Math.round(((communityStats.totalUsers - currentUserData.rank) / communityStats.totalUsers) * 100),
      leaderGap: leaderboardEntries[0].totalScore - currentUserData.totalScore,
      recentTrends: [
        { category: "Education", change: "+8.3%" },
        { category: "Infrastructure", change: "+6.1%" },
        { category: "Healthcare", change: "+4.5%" },
        { category: "Environment", change: "+12.7%" }
      ]
    }
    
    return NextResponse.json({
      leaderboard: leaderboardEntries,
      currentUser: currentUserData,
      stats: communityStats
    })
  } catch (error) {
    console.error("Error in leaderboard API:", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 