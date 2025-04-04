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
    
    // Generate personalized financial opportunities based on mathematical patterns
    
    // Credit score variation based on seed
    const creditScoreBase = 650
    const creditScoreRange = 150
    const creditScore = Math.min(850, Math.floor(creditScoreBase + (seed % creditScoreRange)))
    
    // Generate subsidies with mathematical patterns
    const subsidies = [
      {
        id: 1,
        title: "Solar Panel Installation Subsidy",
        description: "Government subsidy for installing rooftop solar panels",
        eligibility: "Homeowners with civic score above 600",
        amount: `₹${Math.floor(25000 + (seed % 15000))}`,
        deadline: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        category: "Green Energy",
        matchPercent: Math.min(96, Math.floor(65 + (seed % 35))),
        applicationProcess: "Online application with property documents"
      },
      {
        id: 2,
        title: "Small Business Startup Grant",
        description: "Financial assistance for new small businesses and entrepreneurs",
        eligibility: "First-time entrepreneurs with civic score above 550",
        amount: `₹${Math.floor(50000 + (seed % 25000))}`,
        deadline: new Date(Date.now() + (45 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        category: "Entrepreneurship",
        matchPercent: Math.min(92, Math.floor(70 + (seed % 25))),
        applicationProcess: "Business plan submission and interview"
      },
      {
        id: 3,
        title: "Digital Skills Training Voucher",
        description: "Vouchers for approved digital skills training programs",
        eligibility: "Job seekers and students",
        amount: `₹${Math.floor(10000 + (seed % 5000))}`,
        deadline: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        category: "Education",
        matchPercent: Math.min(98, Math.floor(75 + (seed % 25))),
        applicationProcess: "Online application with education details"
      }
    ]
    
    // Generate loans with mathematical patterns
    const baseInterestRate = 8.5
    const loans = [
      {
        id: 101,
        title: "Micro-Enterprise Loan",
        description: "Low-interest loans for small businesses with social impact",
        interestRate: `${(baseInterestRate - 0.5 - (creditScore - 650) / 100).toFixed(2)}%`,
        maxAmount: `₹${Math.floor(300000 + (seed % 200000))}`,
        tenureMonths: 36,
        eligibility: "Small business owners with civic score above 600",
        category: "Business",
        matchPercent: Math.min(94, Math.floor(60 + (seed % 35))),
        specialFeatures: "No collateral required, flexible repayment options"
      },
      {
        id: 102,
        title: "Educational Advancement Loan",
        description: "Special loans for higher education and skill development",
        interestRate: `${(baseInterestRate - 1.0 - (creditScore - 650) / 100).toFixed(2)}%`,
        maxAmount: `₹${Math.floor(500000 + (seed % 300000))}`,
        tenureMonths: 60,
        eligibility: "Students with civic score above 500",
        category: "Education",
        matchPercent: Math.min(90, Math.floor(65 + (seed % 25))),
        specialFeatures: "Repayment starts after course completion, interest subsidy for high performers"
      },
      {
        id: 103,
        title: "Community Housing Improvement Loan",
        description: "Home improvement loans for eco-friendly and energy-efficient upgrades",
        interestRate: `${(baseInterestRate - 0.75 - (creditScore - 650) / 100).toFixed(2)}%`,
        maxAmount: `₹${Math.floor(200000 + (seed % 150000))}`,
        tenureMonths: 48,
        eligibility: "Homeowners with civic score above 550",
        category: "Housing",
        matchPercent: Math.min(88, Math.floor(55 + (seed % 35))),
        specialFeatures: "Additional discount for solar installations, interest rebate for timely repayment"
      }
    ]
    
    // Generate investments with mathematical patterns
    const investments = [
      {
        id: 201,
        title: "Community Development Bond",
        description: "Bonds issued for local community development projects",
        returnRate: `${(7.5 + (seed % 10) / 10).toFixed(1)}%`,
        minInvestment: 10000,
        lockInPeriod: "3 years",
        riskLevel: "Low",
        category: "Community",
        impactDescription: "Funds infrastructure projects in underserved areas",
        matchPercent: Math.min(95, Math.floor(70 + (seed % 25)))
      },
      {
        id: 202,
        title: "Green Energy Fund",
        description: "Mutual fund investing in sustainable energy companies",
        returnRate: `${(9.0 + (seed % 15) / 10).toFixed(1)}%`,
        minInvestment: 25000,
        lockInPeriod: "2 years",
        riskLevel: "Medium",
        category: "Environment",
        impactDescription: "Supports renewable energy adoption and research",
        matchPercent: Math.min(91, Math.floor(65 + (seed % 30)))
      },
      {
        id: 203,
        title: "Education Technology Growth Fund",
        description: "Growth-focused fund investing in education technology startups",
        returnRate: `${(11.0 + (seed % 20) / 10).toFixed(1)}%`,
        minInvestment: 50000,
        lockInPeriod: "5 years",
        riskLevel: "High",
        category: "Education",
        impactDescription: "Accelerates innovation in education technology",
        matchPercent: Math.min(87, Math.floor(60 + (seed % 30)))
      }
    ]
    
    // Generate microfinance opportunities with mathematical patterns
    const microfinance = [
      {
        id: 301,
        title: "Women Entrepreneurs Microloan",
        description: "Micro-loans for women starting small businesses",
        interestRate: `${(baseInterestRate - 1.5 - (creditScore - 650) / 100).toFixed(2)}%`,
        maxAmount: 50000,
        eligibility: "Women entrepreneurs with civic score above 500",
        category: "Women Empowerment",
        matchPercent: Math.min(97, Math.floor(75 + (seed % 25))),
        specialFeatures: "Mentorship program included, group lending option"
      },
      {
        id: 302,
        title: "Rural Artisan Credit",
        description: "Small loans for rural artisans to purchase equipment and materials",
        interestRate: `${(baseInterestRate - 1.25 - (creditScore - 650) / 100).toFixed(2)}%`,
        maxAmount: 30000,
        eligibility: "Rural artisans with civic score above 450",
        category: "Rural Development",
        matchPercent: Math.min(89, Math.floor(65 + (seed % 25))),
        specialFeatures: "No processing fee, flexible repayment schedule"
      }
    ]
    
    // User financial profile with mathematical patterns
    const financialProfile = {
      civicScore: Math.floor(700 + (seed % 150)),
      creditScore,
      eligibleCategories: [
        "Education",
        "Community",
        "Environment",
        creditScore > 700 ? "Business" : null,
        seed % 2 === 0 ? "Housing" : null,
        seed % 3 === 0 ? "Rural Development" : null
      ].filter(Boolean),
      recommendedAmount: Math.floor(100000 + (seed % 200000)),
      applications: [
        {
          id: 401,
          type: "Subsidy",
          title: "Digital Skills Training Voucher",
          appliedDate: new Date(Date.now() - (15 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          status: "Under Review",
          expectedDecisionDate: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
        },
        {
          id: 402,
          type: "Loan",
          title: "Educational Advancement Loan",
          appliedDate: new Date(Date.now() - (45 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          status: "Approved",
          amount: `₹${Math.floor(300000 + (seed % 100000))}`
        }
      ]
    }
    
    return NextResponse.json({
      subsidies,
      loans,
      investments,
      microfinance,
      financialProfile
    })
  } catch (error) {
    console.error("Error in finance opportunities API:", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 