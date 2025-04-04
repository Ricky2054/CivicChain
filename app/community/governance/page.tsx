import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Vote, 
  Building2, 
  ChevronUp, 
  BarChart, 
  ThumbsUp,
  X,
  CalendarDays,
  Check,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "DAO Governance | CivicChain Finance",
  description: "Participate in community governance through decentralized decision making",
}

export default function GovernancePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="DAO Governance" text="Participate in community decision-making through decentralized governance." />
      
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="voting">Voting Power</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proposals" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
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
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Next threshold: </span>
                  <span>1000 CVC for proposal rights</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Proposals</CardTitle>
              <CardDescription>Current proposals open for voting</CardDescription>
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
                      <p className="text-xs text-muted-foreground flex items-center">
                        <CalendarDays className="mr-1 h-3 w-3" />
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
              <CardTitle>Recent Governance Activity</CardTitle>
              <CardDescription>Latest voting and proposal activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    action: "Proposal Approved", 
                    proposal: "Community Garden Funding", 
                    result: "Passed with 77% support",
                    time: "2 days ago" 
                  },
                  { 
                    action: "Vote Cast", 
                    proposal: "Civic Education Program", 
                    result: "You voted: For",
                    time: "4 days ago",
                    isYou: true 
                  },
                  { 
                    action: "Proposal Created", 
                    proposal: "Public Transit Discount", 
                    result: "By CivicCouncil",
                    time: "1 week ago" 
                  },
                  { 
                    action: "Vote Cast", 
                    proposal: "Small Business Grants", 
                    result: "You voted: Against",
                    time: "1 week ago",
                    isYou: true 
                  },
                  { 
                    action: "Proposal Implemented", 
                    proposal: "Public Park Renovation", 
                    result: "Successfully executed",
                    time: "2 weeks ago" 
                  },
                ].map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between rounded-md border p-3 ${activity.isYou ? 'bg-muted/20' : ''}`}>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs">{activity.proposal}</p>
                      <p className="text-xs text-muted-foreground">{activity.result}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      {activity.isYou && <Badge variant="outline" className="ml-2 text-xs">Your Activity</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Voting Power</CardTitle>
              <CardDescription>Details of your governance influence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Current Multiplier</h3>
                    <span className="text-2xl font-bold">1.15x</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your votes are counted as 1.15x based on your social credit score and governance participation.
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress to Next Level (1.25x)</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Governance Tokens</h3>
                    <span className="text-2xl font-bold">550 CVC</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    CVC tokens give you additional voting rights and proposal creation ability.
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress to Proposal Rights (1000 CVC)</span>
                      <span>55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-3">Voting Power Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { source: "Social Credit Score", value: "0.50x", description: "Based on score of 842" },
                    { source: "Governance Participation", value: "0.25x", description: "87% participation rate" },
                    { source: "Community Rank", value: "0.15x", description: "Rank #12 out of 547" },
                    { source: "Token Holding", value: "0.25x", description: "550 CVC tokens" },
                  ].map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{factor.source}</p>
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                      <p className="text-xl font-bold">{factor.value}</p>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t flex items-center justify-between">
                    <p className="font-medium">Total Multiplier</p>
                    <p className="text-xl font-bold text-primary">1.15x</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-3">How to Increase Your Voting Power</h3>
                <div className="space-y-3">
                  {[
                    { action: "Improve Social Credit Score", impact: "Significant", difficulty: "Medium" },
                    { action: "Participate in More Votes", impact: "Medium", difficulty: "Low" },
                    { action: "Climb Community Ranks", impact: "Medium", difficulty: "High" },
                    { action: "Acquire More CVC Tokens", impact: "High", difficulty: "Medium" },
                  ].map((strategy, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{strategy.action}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2 text-xs">Impact: {strategy.impact}</Badge>
                          <Badge variant="outline" className="text-xs">Difficulty: {strategy.difficulty}</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treasury" className="space-y-6">
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
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-3">Recent Treasury Activities</h3>
                    <div className="space-y-3">
                      {[
                        { action: "Fund Allocation", description: "Community Garden Project", amount: "-5,000 CVC", date: "Apr 2, 2025" },
                        { action: "Token Acquisition", description: "Community Rewards Program", amount: "+12,500 CVC", date: "Mar 28, 2025" },
                        { action: "Grant Disbursement", description: "Education Initiative", amount: "-8,000 CVC", date: "Mar 15, 2025" },
                        { action: "Tax Contribution", description: "Quarterly Local Tax", amount: "+25,000 CVC", date: "Mar 1, 2025" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${activity.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {activity.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-3">Upcoming Funding Rounds</h3>
                    <div className="space-y-3">
                      {[
                        { 
                          title: "Q2 Community Projects", 
                          description: "Funding for approved community initiatives", 
                          amount: "30,000 CVC",
                          deadline: "Apr 30, 2025",
                          status: "Collecting Proposals" 
                        },
                        { 
                          title: "Environmental Grants", 
                          description: "Sustainability and green initiatives", 
                          amount: "15,000 CVC",
                          deadline: "May 15, 2025",
                          status: "Coming Soon" 
                        },
                        { 
                          title: "Education Scholarship", 
                          description: "Support for local educational needs", 
                          amount: "20,000 CVC",
                          deadline: "Jun 1, 2025",
                          status: "Coming Soon" 
                        },
                      ].map((funding, index) => (
                        <div key={index} className="rounded-md border p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{funding.title}</p>
                            <Badge variant="outline">{funding.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{funding.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">
                              <CalendarDays className="inline-block mr-1 h-3 w-3" />
                              Deadline: {funding.deadline}
                            </p>
                            <p className="text-sm font-medium">{funding.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Treasury Dashboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 