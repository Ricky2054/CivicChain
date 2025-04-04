"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommunityStaking } from "@/components/community-staking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, CircleDollarSign, TrendingUp, Users, Wallet, BarChart, ArrowUpRight } from "lucide-react"
import { Loader2 } from "lucide-react"

export default function CommunityStakingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [stakingData, setStakingData] = useState({
    totalStaked: "0 CVC",
    totalStakedUSD: "$0.00",
    communityFund: "0 CVC",
    growthRate: "0%",
    estAnnualYield: "0%",
    userBalance: "0 CVC",
    pools: [],
    userStakes: []
  })

  useEffect(() => {
    // Check if user is logged in
    try {
      const userDataStr = localStorage.getItem("userData")
      if (!userDataStr || userDataStr === 'undefined') {
        router.push("/")
        return
      }
      
      const parsedUserData = JSON.parse(userDataStr)
      setUserData(parsedUserData)
      
      // Fetch staking data
      fetchStakingData(parsedUserData.id)
    } catch (error) {
      console.error("Error loading user data:", error)
      router.push("/")
    }
  }, [router])

  const fetchStakingData = async (userId: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo, we'll use mock data with calculated values

      // Calculate dynamic values based on userId
      // Using the userId as a seed for "randomness"
      const seed = userId ? parseInt(userId.toString().split('').map(c => c.charCodeAt(0)).join('').slice(0, 5)) : Date.now()
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

      setStakingData({
        totalStaked: `${totalStakedAmount} CVC`,
        totalStakedUSD: `$${totalStakedUSD}`,
        communityFund: `${Math.floor(15450 * randomMultiplier)} CVC`,
        growthRate: `${growthRateValue}%`,
        estAnnualYield: `${estYieldValue}%`,
        userBalance: `${Math.floor(550 * randomMultiplier)} CVC`,
        pools,
        userStakes
      })
      
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching staking data:", error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading staking data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Community Staking" 
        text="Stake your CVC tokens to support community initiatives and earn rewards"
      />

      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your Stake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{stakingData.totalStaked}</div>
                <p className="text-xs text-muted-foreground">~{stakingData.totalStakedUSD}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{stakingData.userBalance}</div>
                <p className="text-xs text-muted-foreground">Available for staking</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Est. Annual Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold">{stakingData.estAnnualYield}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stakingData.growthRate} growth
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pools" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="pools">Staking Pools</TabsTrigger>
          <TabsTrigger value="stakes">Your Stakes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Staking Pools</CardTitle>
              <CardDescription>Invest in your community by staking in these pools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stakingData.pools.map((pool: any) => (
                  <div key={pool.id} className="flex flex-col md:flex-row md:items-center justify-between rounded-md border p-4 hover:bg-accent/50 transition-colors">
                    <div className="mb-2 md:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{pool.name}</h3>
                        <Badge variant="outline" className="ml-2">{pool.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{pool.description}</p>
                      <div className="flex items-center mt-2">
                        <p className="text-xs text-muted-foreground">{pool.participants} participants</p>
                        <span className="mx-2 text-xs">•</span>
                        <p className="text-xs text-muted-foreground">Total: {pool.totalStaked}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-green-500 font-medium">{pool.apy} APY</p>
                      <Button size="sm" variant="outline" className="mt-2">Stake</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stakes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Stakes</CardTitle>
              <CardDescription>Current stakes and earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stakingData.userStakes.map((stake: any, i: number) => (
                  <div key={i} className="rounded-md border p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{stake.poolName}</h3>
                        <p className="text-xs text-muted-foreground">Staked for {stake.daysStaked} days</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">{stake.yieldRate} APY</Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Amount Staked</span>
                        <span className="font-medium">{stake.amount}</span>
                      </div>
                      <Progress value={stake.percentage} className="h-2 mb-3" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Rewards Earned</span>
                        <span className="text-green-500 font-medium">+{stake.yield}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-3">
                      <Button size="sm" variant="outline">Stake More</Button>
                      <Button size="sm" variant="outline">Unstake</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staking History</CardTitle>
              <CardDescription>Your past staking activities and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                <h3 className="font-medium mt-2">Transaction History</h3>
                <p className="text-sm text-muted-foreground mt-1">Your staking transaction history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 