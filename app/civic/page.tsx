import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Check, Award, Shield, BadgeCheck, Clock, CalendarDays, Users, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Civic Engagement | CivicChain Finance",
  description: "Manage your civic participation, social credit, and community rewards",
}

export default function CivicPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Civic Engagement" text="Track your civic participation, social credit, and earn rewards." />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Social Credit Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <div className="mt-2 space-y-1">
                  <Progress value={84} className="h-2" />
                  <div className="flex text-xs justify-between text-muted-foreground">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +12 points this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Civic Activities</CardTitle>
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">Completed activities this month</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-primary/10 p-2">
                    <p className="text-lg font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Voting</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-2">
                    <p className="text-lg font-bold">5</p>
                    <p className="text-xs text-muted-foreground">Volunteer</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-2">
                    <p className="text-lg font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Education</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">Available to redeem</p>
                <div className="mt-4">
                  <Button size="sm" variant="outline" className="w-full">Redeem Rewards</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Activities</CardTitle>
                <CardDescription>Civic events in your community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: "Community Clean-up", date: "Apr 15, 2025", time: "09:00 AM", points: 75, type: "Volunteer" },
                  { id: 2, name: "City Council Meeting", date: "Apr 22, 2025", time: "06:30 PM", points: 50, type: "Governance" },
                  { id: 3, name: "Financial Literacy Workshop", date: "Apr 25, 2025", time: "11:00 AM", points: 60, type: "Education" },
                  { id: 4, name: "Local Election Voting", date: "May 1, 2025", time: "All Day", points: 100, type: "Voting" },
                ].map(activity => (
                  <div key={activity.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {activity.type === "Volunteer" ? (
                          <Users className="h-5 w-5 text-primary" />
                        ) : activity.type === "Governance" ? (
                          <Shield className="h-5 w-5 text-primary" />
                        ) : activity.type === "Education" ? (
                          <BadgeCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <CalendarDays className="inline-block mr-1 h-3 w-3" />
                          {activity.date} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{activity.type}</Badge>
                      <p className="mt-1 text-xs font-medium">{activity.points} points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activities</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Social Credit Benefits</CardTitle>
                <CardDescription>Your current rewards and benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: "Loan Rate Reduction", description: "-1.2% on all loans", icon: <ArrowUpRight className="h-5 w-5 text-green-500" /> },
                  { id: 2, name: "Premium Cashback", description: "3% on all transactions", icon: <Award className="h-5 w-5 text-primary" /> },
                  { id: 3, name: "Priority Community Services", description: "Fast-track government services", icon: <Badge className="h-5 w-5 text-primary" /> },
                  { id: 4, name: "DAO Voting Power", description: "+15% voting weight in governance", icon: <Shield className="h-5 w-5 text-primary" /> },
                ].map(benefit => (
                  <div key={benefit.id} className="flex items-center space-x-4 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {benefit.icon}
                    </div>
                    <div>
                      <p className="font-medium">{benefit.name}</p>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="rounded-md border border-dashed p-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Tax Credit Benefits</p>
                      <p className="text-sm text-muted-foreground">Unlock at 900 credit score (58 points away)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Civic Activity History</CardTitle>
              <CardDescription>Your completed and upcoming civic activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Completed Activities</h3>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Neighborhood Watch Participation", date: "Apr 2, 2025", points: 50, type: "Community", status: "Verified" },
                      { id: 2, name: "District Policy Vote", date: "Mar 28, 2025", points: 75, type: "Voting", status: "Verified" },
                      { id: 3, name: "Blood Donation Drive", date: "Mar 24, 2025", points: 60, type: "Health", status: "Verified" },
                      { id: 4, name: "Community Budget Forum", date: "Mar 20, 2025", points: 45, type: "Governance", status: "Verified" },
                      { id: 5, name: "Tree Planting Initiative", date: "Mar 15, 2025", points: 80, type: "Environment", status: "Verified" },
                    ].map(activity => (
                      <div key={activity.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">{activity.type}</Badge>
                          <div className="flex items-center justify-end space-x-1">
                            <Badge variant="secondary">{activity.status}</Badge>
                            <span className="font-medium text-green-500">{activity.points} pts</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Registered for Upcoming</h3>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Community Clean-up", date: "Apr 15, 2025", time: "09:00 AM", points: 75, type: "Volunteer" },
                      { id: 2, name: "City Council Meeting", date: "Apr 22, 2025", time: "06:30 PM", points: 50, type: "Governance" },
                      { id: 3, name: "Financial Literacy Workshop", date: "Apr 25, 2025", time: "11:00 AM", points: 60, type: "Education" },
                    ].map(activity => (
                      <div key={activity.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">{activity.date} • {activity.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{activity.type}</Badge>
                          <p className="mt-1 text-xs font-medium">{activity.points} points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Center</CardTitle>
              <CardDescription>Redeem your civic participation points for rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Your Current Points</h3>
                      <p className="text-sm text-muted-foreground">Earned from civic participation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">1,250</p>
                      <p className="text-sm text-muted-foreground">Points available</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Rewards</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { id: 1, name: "Public Transit Pass", points: 500, value: "1 Month Free", image: "🚌" },
                      { id: 2, name: "Local Shop Discount", points: 300, value: "15% Off", image: "🛍️" },
                      { id: 3, name: "Park Reservation", points: 750, value: "Priority Booking", image: "🌳" },
                      { id: 4, name: "Museum Passes", points: 400, value: "2 Free Tickets", image: "🏛️" },
                      { id: 5, name: "Community Center Membership", points: 1000, value: "3 Months", image: "🏢" },
                      { id: 6, name: "Local Tax Credit", points: 2000, value: "$50 Credit", image: "💵" },
                    ].map(reward => (
                      <div key={reward.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">
                              {reward.image}
                            </div>
                            <div>
                              <p className="font-medium">{reward.name}</p>
                              <p className="text-sm text-muted-foreground">{reward.value}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{reward.points} pts</p>
                            <Button
                              size="sm"
                              variant={reward.points <= 1250 ? "default" : "outline"}
                              disabled={reward.points > 1250}
                            >
                              {reward.points <= 1250 ? "Redeem" : "Unavailable"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Redemption History</h3>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Public Transit Pass", redeemed: "Mar 15, 2025", points: 500, status: "Active" },
                      { id: 2, name: "Local Shop Discount", redeemed: "Feb 28, 2025", points: 300, status: "Used" },
                      { id: 3, name: "Community Center Access", redeemed: "Jan 10, 2025", points: 750, status: "Expired" },
                    ].map(redemption => (
                      <div key={redemption.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">{redemption.name}</p>
                          <p className="text-xs text-muted-foreground">Redeemed on {redemption.redeemed}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{redemption.points} points</p>
                          <Badge variant={
                            redemption.status === "Active" ? "default" : 
                            redemption.status === "Used" ? "secondary" : "outline"
                          }>
                            {redemption.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function Lock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
} 