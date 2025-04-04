import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      )
    }
    
    // In a real app, we would fetch from a database
    // For demo, generate dynamic data based on userId
    
    // Use userId as seed for "randomness"
    const seed = userId 
      ? parseInt(userId.toString().split('').map(c => c.charCodeAt(0)).join('').slice(0, 5)) 
      : Date.now()
    const randomMultiplier = (seed % 10) / 10 + 0.5 // Range 0.5-1.4
    
    const totalStakedAmount = Math.floor(320 * randomMultiplier)
    const cvcPrice = 3.45 // Mock price of CVC in USD
    const totalStakedUSD = (totalStakedAmount * cvcPrice).toFixed(2)
    const growthRateValue = (5.3 + (seed % 3)).toFixed(1)
    const estYieldValue = (8.2 + (seed % 4) / 2).toFixed(1)
    
    const poolYieldBase = 7.5
    const pools = [
      { 
        id: 1, 
        name: "Neighborhood Improvement", 
        apy: `${(poolYieldBase + 0.3 + (seed % 3) / 10).toFixed(1)}%`,
        totalStaked: `${Math.floor(5430 * randomMultiplier)} CVC`, 
        participants: Math.floor(45 * randomMultiplier),
        category: "Infrastructure",
        description: "Fund local infrastructure projects like parks and roads"
      },
      { 
        id: 2, 
        name: "Local Education Fund", 
        apy: `${(poolYieldBase + 0.7 + (seed % 4) / 10).toFixed(1)}%`,
        totalStaked: `${Math.floor(3780 * randomMultiplier)} CVC`, 
        participants: Math.floor(32 * randomMultiplier),
        category: "Education",
        description: "Support educational programs and scholarship opportunities"
      },
      { 
        id: 3, 
        name: "Green Energy Initiative", 
        apy: `${(poolYieldBase + 1.6 + (seed % 5) / 10).toFixed(1)}%`,
        totalStaked: `${Math.floor(2950 * randomMultiplier)} CVC`, 
        participants: Math.floor(27 * randomMultiplier),
        category: "Environment",
        description: "Fund renewable energy projects in your community"
      },
    ]
    
    const userStakes = [
      { 
        poolId: 1, 
        poolName: "Neighborhood Improvement", 
        amount: `${Math.floor(150 * randomMultiplier)} CVC`, 
        percentage: 46.9, 
        yield: `${(9.2 * randomMultiplier).toFixed(1)} CVC`, 
        daysStaked: Math.floor(68 * randomMultiplier),
        yieldRate: "7.8%"
      },
      { 
        poolId: 2, 
        poolName: "Local Education Fund", 
        amount: `${Math.floor(100 * randomMultiplier)} CVC`, 
        percentage: 31.3, 
        yield: `${(8.4 * randomMultiplier).toFixed(1)} CVC`, 
        daysStaked: Math.floor(54 * randomMultiplier),
        yieldRate: "8.2%"
      },
      { 
        poolId: 3, 
        poolName: "Green Energy Initiative", 
        amount: `${Math.floor(70 * randomMultiplier)} CVC`, 
        percentage: 21.8, 
        yield: `${(6.9 * randomMultiplier).toFixed(1)} CVC`, 
        daysStaked: Math.floor(42 * randomMultiplier),
        yieldRate: "9.1%"
      }
    ]

    // Create staking history with timestamps
    const currentDate = new Date()
    const dayInMs = 24 * 60 * 60 * 1000
    const history = [
      {
        type: "stake",
        pool: "Neighborhood Improvement",
        amount: `${Math.floor(50 * randomMultiplier)} CVC`,
        timestamp: new Date(currentDate.getTime() - 68 * dayInMs).toISOString()
      },
      {
        type: "stake",
        pool: "Local Education Fund",
        amount: `${Math.floor(100 * randomMultiplier)} CVC`,
        timestamp: new Date(currentDate.getTime() - 54 * dayInMs).toISOString()
      },
      {
        type: "reward",
        pool: "Neighborhood Improvement",
        amount: `${(3.8 * randomMultiplier).toFixed(1)} CVC`,
        timestamp: new Date(currentDate.getTime() - 30 * dayInMs).toISOString()
      },
      {
        type: "stake",
        pool: "Green Energy Initiative",
        amount: `${Math.floor(70 * randomMultiplier)} CVC`,
        timestamp: new Date(currentDate.getTime() - 42 * dayInMs).toISOString()
      },
      {
        type: "reward",
        pool: "Local Education Fund",
        amount: `${(4.1 * randomMultiplier).toFixed(1)} CVC`,
        timestamp: new Date(currentDate.getTime() - 15 * dayInMs).toISOString()
      },
      {
        type: "stake",
        pool: "Neighborhood Improvement",
        amount: `${Math.floor(100 * randomMultiplier)} CVC`,
        timestamp: new Date(currentDate.getTime() - 10 * dayInMs).toISOString()
      },
    ]

    const stakingData = {
      totalStaked: `${totalStakedAmount} CVC`,
      totalStakedUSD: `$${totalStakedUSD}`,
      communityFund: `${Math.floor(15450 * randomMultiplier)} CVC`,
      growthRate: `${growthRateValue}%`,
      estAnnualYield: `${estYieldValue}%`,
      userBalance: `${Math.floor(550 * randomMultiplier)} CVC`,
      pools,
      userStakes,
      history
    }
    
    return NextResponse.json(stakingData)
  } catch (error) {
    console.error("Error in staking API:", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 