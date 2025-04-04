import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Building, CircleDollarSign, TrendingUp, Users } from "lucide-react"

interface CommunityStakingProps {
  className?: string
  variant?: "default" | "compact"
}

export function CommunityStaking({ className, variant = "default" }: CommunityStakingProps) {
  // This would be fetched from an API in a real application
  const stakingSummary = {
    totalStaked: "320 CVC",
    totalStakedUSD: "$1,104.00",
    communityFund: "15,450 CVC",
    growthRate: "5.3%",
    estAnnualYield: "8.2%",
    pools: [
      { id: 1, name: "Neighborhood Improvement", apy: "7.8%", totalStaked: "5,430 CVC", participants: 45, category: "Infrastructure" },
      { id: 2, name: "Local Education Fund", apy: "8.2%", totalStaked: "3,780 CVC", participants: 32, category: "Education" },
      { id: 3, name: "Green Energy Initiative", apy: "9.1%", totalStaked: "2,950 CVC", participants: 27, category: "Environment" },
    ],
    userStakes: [
      { poolId: 1, poolName: "Neighborhood Improvement", amount: "150 CVC", percentage: 46.9, yield: "9.2 CVC", daysStaked: 68 },
      { poolId: 2, poolName: "Local Education Fund", amount: "100 CVC", percentage: 31.3, yield: "8.4 CVC", daysStaked: 54 },
      { poolId: 3, poolName: "Green Energy Initiative", amount: "70 CVC", percentage: 21.8, yield: "6.9 CVC", daysStaked: 42 },
    ]
  }

  if (variant === "compact") {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Community Staking</CardTitle>
          <CardDescription>Staking pools and your contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Your Total Stake</p>
                <p className="text-sm text-muted-foreground">Across all pools</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">{stakingSummary.totalStaked}</div>
                <p className="text-xs text-muted-foreground">~{stakingSummary.totalStakedUSD}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {stakingSummary.userStakes.map((stake, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="w-[60%]">
                    <p className="text-sm font-medium mb-1">{stake.poolName}</p>
                    <Progress value={stake.percentage} className="h-2" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{stake.amount}</p>
                    <p className="text-xs text-green-500">+{stake.yield}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="sm" className="w-full mt-2">
              Manage Stakes
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Community Staking</CardTitle>
        <CardDescription>Join community funds to power local improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Your Stake</p>
              <div className="flex items-center">
                <p className="text-lg font-bold">{stakingSummary.totalStaked}</p>
                <span className="text-xs text-muted-foreground ml-2">~{stakingSummary.totalStakedUSD}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Community Fund</p>
              <div className="flex items-center">
                <p className="text-lg font-bold">{stakingSummary.communityFund}</p>
                <span className="text-xs text-green-500 ml-2 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stakingSummary.growthRate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Est. Annual Yield</p>
              <p className="text-lg font-bold">{stakingSummary.estAnnualYield}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Available Staking Pools</h3>
            <Button variant="link" size="sm" className="h-auto p-0">View All Pools</Button>
          </div>
          
          {stakingSummary.pools.map((pool) => (
            <div key={pool.id} className="flex items-center justify-between rounded-md border p-3 hover:bg-accent/50 transition-colors cursor-pointer">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{pool.name}</p>
                  <Badge variant="outline" className="ml-2">{pool.category}</Badge>
                </div>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-muted-foreground">{pool.participants} participants</p>
                  <span className="mx-2 text-xs">•</span>
                  <p className="text-xs text-muted-foreground">Total: {pool.totalStaked}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-medium">{pool.apy} APY</p>
                <button className="text-xs text-primary hover:underline mt-1">Stake</button>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="outline" className="w-full">
              Manage Your Stakes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 