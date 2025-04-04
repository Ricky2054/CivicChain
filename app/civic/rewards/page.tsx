import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircleDollarSign, Award, Check, ArrowRight, CalendarDays, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Rewards | CivicChain Finance",
  description: "Redeem points earned from civic participation for rewards and benefits",
}

export default function RewardsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Rewards Center" text="Redeem your civic participation points for community rewards and benefits." />
      
      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
          <TabsTrigger value="history">Redemption History</TabsTrigger>
          <TabsTrigger value="goals">Reward Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Your Reward Balance</CardTitle>
              <CardDescription>Points earned from civic participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Available Points</h3>
                    <p className="text-sm text-muted-foreground">Ready to redeem for rewards</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">1,250</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-500">+350</span> this month
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm font-medium">Lifetime Points Earned</div>
                <div className="text-sm font-bold">4,830</div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-sm font-medium">Points Redeemed</div>
                <div className="text-sm font-bold">3,580</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Redeem your points for these benefits and perks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { id: 1, name: "Public Transit Pass", points: 500, value: "1 Month Free", image: "🚌", category: "Transportation" },
                  { id: 2, name: "Local Shop Discount", points: 300, value: "15% Off", image: "🛍️", category: "Economic" },
                  { id: 3, name: "Park Reservation", points: 750, value: "Priority Booking", image: "🌳", category: "Recreation" },
                  { id: 4, name: "Museum Passes", points: 400, value: "2 Free Tickets", image: "🏛️", category: "Culture" },
                  { id: 5, name: "Community Center Membership", points: 1000, value: "3 Months", image: "🏢", category: "Community" },
                  { id: 6, name: "Local Tax Credit", points: 2000, value: "$50 Credit", image: "💵", category: "Financial" },
                ].map(reward => (
                  <div key={reward.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">
                          {reward.image}
                        </div>
                        <div>
                          <p className="font-medium">{reward.name}</p>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2 text-xs">{reward.category}</Badge>
                            <p className="text-sm text-muted-foreground">{reward.value}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-medium">{reward.points} pts</div>
                      <Button
                        size="sm"
                        variant={reward.points <= 1250 ? "default" : "outline"}
                        disabled={reward.points > 1250}
                      >
                        {reward.points <= 1250 ? "Redeem" : "Unavailable"}
                      </Button>
                    </div>
                    
                    {reward.points > 1250 && (
                      <div className="mt-2">
                        <Progress 
                          value={(1250 / reward.points) * 100} 
                          className="h-1" 
                        />
                        <p className="mt-1 text-xs text-muted-foreground text-right">
                          {reward.points - 1250} more points needed
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Browse All Rewards</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Featured Reward Programs</CardTitle>
              <CardDescription>Special reward opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Community Champions Program</p>
                        <p className="text-sm text-muted-foreground">Earn exclusive rewards for community leadership</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                        <CircleDollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Local Business Partnership</p>
                        <p className="text-sm text-muted-foreground">Support local economy and get special discounts</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Redemption History</CardTitle>
              <CardDescription>Track rewards you've claimed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    id: 1, 
                    name: "Public Transit Pass", 
                    redeemed: "Mar 15, 2025", 
                    points: 500, 
                    status: "Active",
                    expires: "Apr 15, 2025",
                    image: "🚌" 
                  },
                  { 
                    id: 2, 
                    name: "Local Shop Discount", 
                    redeemed: "Feb 28, 2025", 
                    points: 300, 
                    status: "Used",
                    expires: "Mar 28, 2025",
                    image: "🛍️" 
                  },
                  { 
                    id: 3, 
                    name: "Community Center Access", 
                    redeemed: "Jan 10, 2025", 
                    points: 750, 
                    status: "Expired",
                    expires: "Apr 10, 2025",
                    image: "🏢" 
                  },
                  { 
                    id: 4, 
                    name: "Museum Passes", 
                    redeemed: "Dec 5, 2024", 
                    points: 400, 
                    status: "Used",
                    expires: "Jan 5, 2025",
                    image: "🏛️" 
                  },
                  { 
                    id: 5, 
                    name: "Park Reservation", 
                    redeemed: "Nov 18, 2024", 
                    points: 750, 
                    status: "Expired",
                    expires: "Dec 18, 2024",
                    image: "🌳" 
                  },
                ].map(redemption => (
                  <div key={redemption.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">
                        {redemption.image}
                      </div>
                      <div>
                        <p className="font-medium">{redemption.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="mr-1 h-3 w-3" /> 
                          Redeemed on {redemption.redeemed}
                        </div>
                        {redemption.status === "Active" && (
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="mr-1 h-3 w-3" /> 
                            Expires on {redemption.expires}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        redemption.status === "Active" ? "default" : 
                        redemption.status === "Used" ? "secondary" : "outline"
                      }>
                        {redemption.status}
                      </Badge>
                      <p className="mt-1 text-xs font-medium">{redemption.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Complete History</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Track your point earnings and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] border border-dashed rounded-md flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 mx-auto mb-2"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  <p className="text-sm">Points Earned vs. Points Spent</p>
                  <p className="text-xs">This would be an actual chart in a real implementation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Reward Goals</CardTitle>
              <CardDescription>Track progress toward rewards you're saving for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    id: 1, 
                    name: "Local Tax Credit", 
                    points: 2000, 
                    value: "$50 Credit", 
                    currentPoints: 1250,
                    image: "💵",
                    targetDate: "Jul 15, 2025" 
                  },
                  { 
                    id: 2, 
                    name: "Community Center Membership", 
                    points: 1000, 
                    value: "3 Months", 
                    currentPoints: 1250,
                    image: "🏢",
                    targetDate: "May 1, 2025" 
                  },
                ].map(goal => (
                  <div key={goal.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">
                          {goal.image}
                        </div>
                        <div>
                          <p className="font-medium">{goal.name}</p>
                          <p className="text-sm text-muted-foreground">{goal.value}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{goal.points} pts</p>
                        <p className="text-xs text-muted-foreground">Target: {goal.targetDate}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {goal.currentPoints} / {goal.points} points 
                          ({Math.round((goal.currentPoints / goal.points) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(goal.currentPoints / goal.points) * 100} className="h-2" />
                    </div>
                    
                    <div className="mt-3 flex justify-between">
                      <Button variant="outline" size="sm">Remove Goal</Button>
                      {goal.currentPoints >= goal.points ? (
                        <Button size="sm">Redeem Now</Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          {goal.points - goal.currentPoints} points needed
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Reward Goal</CardTitle>
              <CardDescription>Set targets for rewards you want to earn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { id: 6, name: "Local Tax Credit", points: 2000, value: "$50 Credit", image: "💵", category: "Financial" },
                  { id: 7, name: "Annual Park Pass", points: 1500, value: "Unlimited Access", image: "🌳", category: "Recreation" },
                  { id: 8, name: "Public Library Card", points: 600, value: "1 Year Premium", image: "📚", category: "Education" },
                  { id: 9, name: "Public WiFi Access", points: 800, value: "6 Months Premium", image: "📡", category: "Technology" },
                ].map(reward => (
                  <div key={reward.id} className="rounded-md border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-xl">
                        {reward.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{reward.name}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 text-xs">{reward.category}</Badge>
                          <p className="text-xs text-muted-foreground">{reward.value}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{reward.points} pts</p>
                        <Button size="sm" variant="outline" className="mt-1">
                          Add Goal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Browse All Rewards</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 