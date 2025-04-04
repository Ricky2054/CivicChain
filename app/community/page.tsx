import type { Metadata } from "next"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Users, 
  Building2, 
  ChevronUp, 
  Vote, 
  BarChart, 
  LucideIcon, 
  ShieldCheck,
  Check,
  ThumbsUp,
  X,
  ArrowUpRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Community | CivicChain Finance",
  description: "Explore community leaderboards, DAO governance, and social impact",
}

export default function CommunityPage() {
  return (
    <DashboardClientWrapper
      heading="Community"
      text="Engage with your community, participate in governance, and track your impact."
    >
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="governance">DAO Governance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <CardTitle className="text-sm font-medium">Governance Power</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.15x</div>
                <p className="text-xs text-muted-foreground">Voting multiplier</p>
                <div className="mt-2 text-xs">
                  <span className="font-medium">Next level: </span>
                  <span className="text-muted-foreground">1.25x at rank #10</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Community Leaderboard</CardTitle>
              <CardDescription>Top community members based on civic engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                    className={`flex items-center justify-between rounded-md border p-3 ${member.isYou ? 'bg-muted/50 border-primary/50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
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
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Leaderboard</Button>
            </CardFooter>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Impact Breakdown</CardTitle>
                <CardDescription>Your community contribution metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Environmental", score: 72, description: "Sustainability initiatives", icon: <ShieldCheck className="h-5 w-5 text-green-600" /> },
                    { category: "Civic Participation", score: 85, description: "Voting & public forums", icon: <Vote className="h-5 w-5 text-blue-600" /> },
                    { category: "Education", score: 63, description: "Learning & workshops", icon: <CustomBadgeCheck className="h-5 w-5 text-indigo-600" /> },
                    { category: "Economic", score: 58, description: "Local economy support", icon: <BarChart className="h-5 w-5 text-amber-600" /> },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2 font-medium">{category.category}</span>
                        </div>
                        <span className="font-bold">{category.score}/100</span>
                      </div>
                      <Progress value={category.score} className="h-2" />
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Badges and milestones you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 rounded-md border p-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
                <Vote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.15x</div>
                <p className="text-xs text-muted-foreground">Your vote multiplier</p>
                <div className="mt-2 text-xs text-green-500 flex items-center">
                  <ChevronUp className="mr-1 h-3 w-3" />
                  +0.05x from last month
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participation Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Governance participation</p>
                <div className="mt-2 space-y-1">
                  <Progress value={87} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>Average</span>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CVC Tokens</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">550</div>
                <p className="text-xs text-muted-foreground">Governance tokens</p>
                <div className="mt-2 text-xs">
                  <span className="font-medium">Next threshold: </span>
                  <span className="text-muted-foreground">1000 CVC for proposal rights</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Proposals</CardTitle>
              <CardDescription>Current DAO governance proposals open for voting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    id: 1, 
                    title: "Community Garden Funding", 
                    description: "Allocate 5,000 CVC for expanding the downtown community garden project", 
                    deadline: "Apr 12, 2025",
                    category: "Environmental",
                    votes: { for: 345, against: 102 },
                    status: "active",
                    voted: "for"
                  },
                  { 
                    id: 2, 
                    title: "Civic Education Program", 
                    description: "Fund a new education initiative to promote civic literacy in local schools", 
                    deadline: "Apr 15, 2025",
                    category: "Education",
                    votes: { for: 286, against: 157 },
                    status: "active",
                    voted: null
                  },
                  { 
                    id: 3, 
                    title: "Public Transit Discount", 
                    description: "Allocate funds for public transit discounts for active community members", 
                    deadline: "Apr 18, 2025",
                    category: "Transportation",
                    votes: { for: 412, against: 89 },
                    status: "active",
                    voted: null
                  },
                  { 
                    id: 4, 
                    title: "Small Business Grants", 
                    description: "Create a grant program to support local small businesses and entrepreneurs", 
                    deadline: "Apr 22, 2025",
                    category: "Economic",
                    votes: { for: 253, against: 201 },
                    status: "active",
                    voted: "against"
                  },
                ].map(proposal => (
                  <div key={proposal.id} className="rounded-md border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">{proposal.description}</p>
                      </div>
                      <Badge>{proposal.category}</Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>For: {proposal.votes.for}</span>
                        <span>Against: {proposal.votes.against}</span>
                      </div>
                      <div className="flex h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%` }} 
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(proposal.votes.against / (proposal.votes.for + proposal.votes.against)) * 100}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Deadline: {proposal.deadline}
                      </p>
                      <div className="flex space-x-2">
                        {proposal.voted ? (
                          <Badge variant={proposal.voted === "for" ? "default" : "destructive"} className="flex items-center">
                            {proposal.voted === "for" ? (
                              <>
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                Voted For
                              </>
                            ) : (
                              <>
                                <X className="mr-1 h-3 w-3" />
                                Voted Against
                              </>
                            )}
                          </Badge>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="h-8">
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              For
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              <X className="mr-1 h-3 w-3" />
                              Against
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Past Proposals</Button>
              <Button>Create Proposal</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Community Treasury</CardTitle>
              <CardDescription>Current funds and resource allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Total Treasury</h3>
                      <p className="text-sm text-muted-foreground">Available for community projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">128,500 CVC</p>
                      <p className="text-sm text-muted-foreground">≈ $442,325</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Allocation by Category</h3>
                  
                  <div className="space-y-3">
                    {[
                      { category: "Infrastructure", percentage: 35, amount: "45,000 CVC" },
                      { category: "Education", percentage: 25, amount: "32,000 CVC" },
                      { category: "Environment", percentage: 20, amount: "25,700 CVC" },
                      { category: "Social Services", percentage: 15, amount: "19,300 CVC" },
                      { category: "Emergency Fund", percentage: 5, amount: "6,500 CVC" },
                    ].map((allocation, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{allocation.category}</span>
                          <div className="text-right">
                            <span className="text-muted-foreground">{allocation.percentage}%</span>
                            <span className="ml-2 font-medium">{allocation.amount}</span>
                          </div>
                        </div>
                        <Progress value={allocation.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardClientWrapper>
  )
}

function CustomBadgeCheck(props) {
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
} 