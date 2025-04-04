import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Clock, CalendarDays, Users, Shield, BadgeCheck, Building2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Civic Engagement | CivicChain Finance",
  description: "Track and participate in civic activities in your community",
}

export default function EngagementPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Civic Engagement" text="Track your community participation and discover new opportunities." />
      
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Engagement Stats</CardTitle>
                <CardDescription>Your civic participation metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Activities This Month</span>
                    </div>
                    <span className="font-bold">16</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Target: 20</span>
                    <span>80% Complete</span>
                  </div>
                </div>
                
                <div className="rounded-md border p-3">
                  <div className="mb-3 text-sm font-medium">Activity Breakdown</div>
                  <div className="grid grid-cols-2 gap-2 text-center">
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
                    <div className="rounded-md bg-primary/10 p-2">
                      <p className="text-lg font-bold">0</p>
                      <p className="text-xs text-muted-foreground">Environmental</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Points Earned</span>
                    <span className="text-lg font-bold">1,250</span>
                  </div>
                  <p className="text-xs text-muted-foreground">From civic participation activities</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Browse Activities</Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your completed civic activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Neighborhood Watch Participation", date: "Apr 2, 2025", points: 50, type: "Community", status: "Verified" },
                  { name: "District Policy Vote", date: "Mar 28, 2025", points: 75, type: "Voting", status: "Verified" },
                  { name: "Blood Donation Drive", date: "Mar 24, 2025", points: 60, type: "Health", status: "Verified" },
                  { name: "Community Budget Forum", date: "Mar 20, 2025", points: 45, type: "Governance", status: "Verified" },
                  { name: "Tree Planting Initiative", date: "Mar 15, 2025", points: 80, type: "Environment", status: "Verified" },
                  { name: "Financial Literacy Workshop", date: "Mar 10, 2025", points: 40, type: "Education", status: "Verified" },
                  { name: "Local Business Support Campaign", date: "Mar 5, 2025", points: 55, type: "Economic", status: "Verified" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
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
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Activity Calendar</CardTitle>
                <CardDescription>Upcoming civic events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-2 h-[220px] flex items-center justify-center text-center text-muted-foreground text-sm">
                  <div>
                    <CalendarDays className="h-10 w-10 mx-auto mb-2" />
                    <p>Calendar view would be displayed here</p>
                    <p className="text-xs mt-1">This would include a full calendar in a real implementation</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Previous</Button>
                <div className="text-sm font-medium">April 2025</div>
                <Button variant="outline" size="sm">Next</Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Civic activities you can participate in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    name: "Community Clean-up", 
                    date: "Apr 15, 2025", 
                    time: "09:00 AM", 
                    points: 75, 
                    type: "Volunteer",
                    location: "Central Park",
                    icon: <Users className="h-5 w-5 text-primary" />,
                    registered: true 
                  },
                  { 
                    name: "City Council Meeting", 
                    date: "Apr 22, 2025", 
                    time: "06:30 PM", 
                    points: 50, 
                    type: "Governance",
                    location: "City Hall",
                    icon: <Building2 className="h-5 w-5 text-primary" />,
                    registered: true 
                  },
                  { 
                    name: "Financial Literacy Workshop", 
                    date: "Apr 25, 2025", 
                    time: "11:00 AM", 
                    points: 60, 
                    type: "Education",
                    location: "Community Center",
                    icon: <BadgeCheck className="h-5 w-5 text-primary" />,
                    registered: true 
                  },
                  { 
                    name: "Local Election Voting", 
                    date: "May 1, 2025", 
                    time: "All Day", 
                    points: 100, 
                    type: "Voting",
                    location: "Your Local Polling Station",
                    icon: <Shield className="h-5 w-5 text-primary" />,
                    registered: false 
                  },
                  { 
                    name: "Public Health Forum", 
                    date: "May 5, 2025", 
                    time: "05:30 PM", 
                    points: 45, 
                    type: "Health",
                    location: "Memorial Hospital",
                    icon: <BadgeCheck className="h-5 w-5 text-primary" />,
                    registered: false 
                  },
                ].map((event, index) => (
                  <div key={index} className="rounded-md border p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {event.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{event.name}</p>
                            {event.registered && (
                              <Badge className="ml-2" variant="outline">Registered</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <CalendarDays className="inline-block mr-1 h-3 w-3" />
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{event.location}</span>
                      <span className="font-medium">{event.points} points</span>
                    </div>
                    
                    <Button variant={event.registered ? "outline" : "default"} className="w-full" disabled={event.registered}>
                      {event.registered ? "Already Registered" : "Register Now"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Your Civic Impact</CardTitle>
                <CardDescription>Track the difference you're making in your community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-md border p-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-2 text-xl font-bold">83</h3>
                    <p className="text-sm text-muted-foreground">Activities Completed</p>
                    <p className="text-xs text-muted-foreground">Lifetime total</p>
                  </div>
                  
                  <div className="rounded-md border p-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-2 text-xl font-bold">278</h3>
                    <p className="text-sm text-muted-foreground">Community Impact</p>
                    <p className="text-xs text-muted-foreground">Total impact score</p>
                  </div>
                  
                  <div className="rounded-md border p-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-2 text-xl font-bold">4,830</h3>
                    <p className="text-sm text-muted-foreground">Points Earned</p>
                    <p className="text-xs text-muted-foreground">Lifetime total</p>
                  </div>
                </div>
                
                <div className="mt-6 h-[300px] border border-dashed rounded-md flex items-center justify-center">
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
                    <p className="text-sm">Civic Impact Over Time</p>
                    <p className="text-xs">This would be an actual chart in a real implementation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Impact Breakdown</CardTitle>
                <CardDescription>Your community contribution by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Environmental", score: 72, description: "Tree planting, clean-ups, sustainability initiatives" },
                  { category: "Civic Participation", score: 85, description: "Voting, public forums, governance participation" },
                  { category: "Education", score: 63, description: "Workshops, skills training, mentorship programs" },
                  { category: "Economic", score: 58, description: "Local business support, financial literacy" },
                  { category: "Health & Wellness", score: 68, description: "Blood drives, health forums, community fitness" },
                ].map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="font-bold">{category.score}/100</span>
                    </div>
                    <Progress value={category.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Impact Badges</CardTitle>
                <CardDescription>Recognition for your contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    name: "Digital Citizen", 
                    description: "Completed 5 online civic participation events", 
                    date: "Apr 2, 2025",
                    icon: "📱"
                  },
                  { 
                    name: "Finance Advocate", 
                    description: "Participated in 3 financial literacy workshops", 
                    date: "Mar 15, 2025",
                    icon: "💰"
                  },
                  { 
                    name: "Eco Warrior", 
                    description: "Joined 2 environmental clean-up initiatives", 
                    date: "Feb 28, 2025",
                    icon: "🌱"
                  },
                  { 
                    name: "Voting Champion", 
                    description: "Voted in 10 consecutive community polls", 
                    date: "Jan 22, 2025",
                    icon: "🗳️"
                  },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 rounded-md border p-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl flex-shrink-0">
                      {badge.icon}
                    </div>
                    <div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 