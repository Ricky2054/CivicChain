import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Users, 
  ChevronUp, 
  Search,
  ArrowUpRight,
  Filter, 
  CalendarDays,
  Clock
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Community Leaderboard | CivicChain Finance",
  description: "View your community ranking and compare your civic engagement with others",
}

export default function LeaderboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Community Leaderboard" text="See your ranking and top community members based on civic engagement." />
      
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#12</div>
              <p className="text-xs text-muted-foreground">Out of 547 local citizens</p>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <ChevronUp className="mr-1 h-3 w-3" />
                Up 3 positions this month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Civic Impact</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">278</div>
              <p className="text-xs text-muted-foreground">Total impact score</p>
              <div className="mt-2 space-y-1">
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Newcomer</span>
                  <span>Active</span>
                  <span>Leader</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground">From civic participation</p>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <ChevronUp className="mr-1 h-3 w-3" />
                +350 points this month
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Community Rankings</CardTitle>
                <CardDescription>Residents ranked by civic engagement score</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search members" className="pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="near-you">Near You</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
              </TabsList>
              
              <div className="mt-4 space-y-4">
                {[
                  { id: 1, name: "Sarah Johnson", rank: 1, score: 452, avatar: "SJ", trend: "stable", badges: ["Sustainability Champion", "Volunteer Leader"] },
                  { id: 2, name: "Michael Chen", rank: 2, score: 445, avatar: "MC", trend: "up", badges: ["Education Advocate", "Tech Innovator"] },
                  { id: 3, name: "Aisha Patel", rank: 3, score: 438, avatar: "AP", trend: "up", badges: ["Healthcare Volunteer", "Youth Mentor"] },
                  { id: 4, name: "David Williams", rank: 4, score: 412, avatar: "DW", trend: "down", badges: ["Urban Planner", "Policy Expert"] },
                  { id: 5, name: "Elena Rodriguez", rank: 5, score: 398, avatar: "ER", trend: "up", badges: ["Arts Advocate", "Community Organizer"] },
                  { id: 12, name: "Alex Johnson", rank: 12, score: 278, avatar: "AJ", trend: "up", badges: ["Digital Citizen", "Finance Advocate"], isYou: true },
                ].map(member => (
                  <div 
                    key={member.id} 
                    className={`flex items-center justify-between rounded-md border p-4 ${member.isYou ? 'bg-muted/50 border-primary/50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        {member.rank <= 3 ? (
                          <Trophy className={`h-5 w-5 ${
                            member.rank === 1 ? 'text-yellow-500' : 
                            member.rank === 2 ? 'text-slate-400' : 
                            'text-amber-700'
                          }`} />
                        ) : (
                          <span className="text-sm font-medium">#{member.rank}</span>
                        )}
                      </div>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{member.name}</p>
                          {member.isYou && <Badge className="ml-2" variant="outline">You</Badge>}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.badges.map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs py-0 px-1">{badge}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <p className="font-medium">{member.score}</p>
                        {member.trend === 'up' && <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Impact Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 6 of 547 members</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Community Activity Feed</CardTitle>
              <CardDescription>Recent civic achievements in your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  user: { name: "Sarah Johnson", avatar: "SJ" },
                  achievement: "Completed the Downtown Cleanup Initiative",
                  points: 75,
                  category: "Environment",
                  time: "2 hours ago"
                },
                { 
                  user: { name: "David Williams", avatar: "DW" },
                  achievement: "Contributed to the Community Budget Proposal",
                  points: 100,
                  category: "Governance",
                  time: "Yesterday"
                },
                { 
                  user: { name: "Michael Chen", avatar: "MC" },
                  achievement: "Led a Digital Literacy Workshop for Seniors",
                  points: 90,
                  category: "Education",
                  time: "2 days ago"
                },
                { 
                  user: { name: "Elena Rodriguez", avatar: "ER" },
                  achievement: "Organized the Community Art Exhibition",
                  points: 80,
                  category: "Culture",
                  time: "3 days ago"
                },
                { 
                  user: { name: "Alex Johnson", avatar: "AJ" },
                  achievement: "Participated in the District Policy Vote",
                  points: 65,
                  category: "Voting",
                  time: "5 days ago",
                  isYou: true
                },
              ].map((activity, index) => (
                <div key={index} className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {activity.user.avatar}
                      </div>
                      <div>
                        <span className="font-medium">
                          {activity.user.name} 
                          {activity.isYou && <span className="text-muted-foreground font-normal"> (You)</span>}
                        </span>
                        <p className="text-sm">{activity.achievement}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{activity.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                    <div className="text-xs font-medium">+{activity.points} points</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Stats</CardTitle>
              <CardDescription>Community engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-4 text-center">
                    <h4 className="text-sm text-muted-foreground mb-1">Total Members</h4>
                    <p className="text-2xl font-bold">547</p>
                    <p className="text-xs text-muted-foreground">Active in the community</p>
                  </div>
                  
                  <div className="rounded-md border p-4 text-center">
                    <h4 className="text-sm text-muted-foreground mb-1">Monthly Activities</h4>
                    <p className="text-2xl font-bold">1,458</p>
                    <p className="text-xs text-muted-foreground">Civic actions this month</p>
                  </div>
                  
                  <div className="rounded-md border p-4 text-center">
                    <h4 className="text-sm text-muted-foreground mb-1">Average Score</h4>
                    <p className="text-2xl font-bold">245</p>
                    <p className="text-xs text-muted-foreground">Community average</p>
                  </div>
                  
                  <div className="rounded-md border p-4 text-center">
                    <h4 className="text-sm text-muted-foreground mb-1">Top Score</h4>
                    <p className="text-2xl font-bold">452</p>
                    <p className="text-xs text-muted-foreground">Highest in community</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Your Position</h3>
                  <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary"
                      style={{ width: "65%" }}
                    />
                    <div 
                      className="absolute top-0 h-4 w-4 -mt-1 rounded-full bg-primary border-2 border-background"
                      style={{ left: "65%" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0</span>
                    <span>Your score: 278</span>
                    <span>452</span>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-3">Top Categories</h3>
                  <div className="space-y-3">
                    {[
                      { category: "Environmental", percentage: 28 },
                      { category: "Education", percentage: 22 },
                      { category: "Governance", percentage: 18 },
                      { category: "Health", percentage: 16 },
                      { category: "Economic", percentage: 12 },
                    ].map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{category.category}</span>
                          <span>{category.percentage}%</span>
                        </div>
                        <Progress value={category.percentage} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
} 