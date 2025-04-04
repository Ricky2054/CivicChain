"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Building, Vote, Clock, MessageSquare, Check, XCircle, AlertCircle,
  ChevronRight, CircleCheck, CircleX, BarChart3, FileText
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityGovernancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [activeProposals, setActiveProposals] = useState<any[]>([])
  const [pastProposals, setPastProposals] = useState<any[]>([])
  const [votingStatus, setVotingStatus] = useState<Record<string, string>>({})
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr) {
      // Redirect to home if not logged in
      router.push("/")
      return
    }
    
    fetchGovernanceData()
  }, [router])
  
  const fetchGovernanceData = async () => {
    try {
      setLoading(true)
      
      // In a real app, this would fetch from an API
      // For now, generate mock data
      
      const active = [
        {
          id: "prop-123",
          title: "School Infrastructure Improvement Fund",
          description: "Allocate funds from the community treasury to renovate and upgrade facilities at local schools",
          proposer: {
            name: "Education Council",
            avatar: "/placeholder.svg"
          },
          category: "Infrastructure",
          status: "Active",
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          votes: {
            for: 326,
            against: 124,
            abstain: 23
          },
          totalVotes: 473,
          threshold: 500,
          quorum: 400
        },
        {
          id: "prop-124",
          title: "Community Green Space Development",
          description: "Create new public gardens and recreational spaces in underutilized urban areas",
          proposer: {
            name: "Environment Committee",
            avatar: "/placeholder.svg"
          },
          category: "Environment",
          status: "Active",
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          votes: {
            for: 482,
            against: 76,
            abstain: 18
          },
          totalVotes: 576,
          threshold: 500,
          quorum: 400
        },
        {
          id: "prop-125",
          title: "Digital Literacy Program Funding",
          description: "Allocate resources to expand digital literacy programs for seniors and underserved communities",
          proposer: {
            name: "Tech Inclusion Group",
            avatar: "/placeholder.svg"
          },
          category: "Education",
          status: "Active",
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          votes: {
            for: 289,
            against: 98,
            abstain: 42
          },
          totalVotes: 429,
          threshold: 500,
          quorum: 400
        }
      ]
      
      const past = [
        {
          id: "prop-121",
          title: "Community Health Center Funding",
          description: "Fund expansion of the local health center to serve more residents",
          proposer: {
            name: "Healthcare Alliance",
            avatar: "/placeholder.svg"
          },
          category: "Healthcare",
          status: "Passed",
          endTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          votes: {
            for: 578,
            against: 156,
            abstain: 32
          },
          totalVotes: 766,
          threshold: 500,
          quorum: 400
        },
        {
          id: "prop-122",
          title: "Public Transit Improvement Initiative",
          description: "Allocate funds to improve bus routes and add electric vehicles to the fleet",
          proposer: {
            name: "Transit Board",
            avatar: "/placeholder.svg"
          },
          category: "Infrastructure",
          status: "Failed",
          endTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          votes: {
            for: 312,
            against: 452,
            abstain: 28
          },
          totalVotes: 792,
          threshold: 500,
          quorum: 400
        }
      ]
      
      setActiveProposals(active)
      setPastProposals(past)
    } catch (error) {
      console.error("Error fetching governance data:", error)
      toast({
        title: "Error",
        description: "Could not load governance data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  const handleVote = async (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    try {
      // In a real app, this would make an API call
      // For now, just update local state
      
      setVotingStatus(prev => ({
        ...prev,
        [proposalId]: vote
      }))
      
      // Update the vote count in the proposals
      setActiveProposals(prev => 
        prev.map(proposal => {
          if (proposal.id === proposalId) {
            const updatedVotes = { ...proposal.votes }
            updatedVotes[vote]++
            
            return {
              ...proposal,
              votes: updatedVotes,
              totalVotes: proposal.totalVotes + 1
            }
          }
          return proposal
        })
      )
      
      toast({
        title: "Vote Recorded",
        description: `You have voted ${vote} on this proposal`,
      })
    } catch (error) {
      console.error("Error voting:", error)
      toast({
        title: "Error",
        description: "Could not record your vote",
        variant: "destructive"
      })
    }
  }
  
  const formatTimeRemaining = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr)
    const now = new Date()
    
    const diffMs = endTime.getTime() - now.getTime()
    
    if (diffMs < 0) {
      return "Ended"
    }
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (diffDays > 0) {
      return `${diffDays} days, ${diffHours} hours`
    } else {
      return `${diffHours} hours`
    }
  }
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'infrastructure':
        return <Building className="h-5 w-5" />
      case 'education':
        return <FileText className="h-5 w-5" />
      case 'healthcare':
        return <AlertCircle className="h-5 w-5" />
      case 'environment':
        return <Building className="h-5 w-5" />
      default:
        return <Building className="h-5 w-5" />
    }
  }
  
  // Get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Community Governance"
          text="Participate in decision making through distributed governance"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading governance data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community Governance"
        text="Participate in decision making through distributed governance"
      />
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Your Governance Status</CardTitle>
          <CardDescription>Your voting power and participation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Voting Power</h3>
              <p className="text-2xl font-bold mt-1">145 CVC</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-xs text-muted-foreground">Based on your staked tokens</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Participation Rate</h3>
              <p className="text-2xl font-bold mt-1">78%</p>
              <Progress value={78} className="h-1.5 mt-2" />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Proposals Voted</h3>
              <p className="text-2xl font-bold mt-1">8/12</p>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  View History
                </Button>
                <Badge variant="secondary" className="h-7 text-xs">Top 15%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="active" className="mt-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="past">Past Proposals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4 space-y-6">
          {activeProposals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3">
                  <Vote className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Active Proposals</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                  There are no active proposals at the moment. Check back later or create a new proposal.
                </p>
                <Button className="mt-4">Create Proposal</Button>
              </CardContent>
            </Card>
          ) : (
            activeProposals.map(proposal => (
              <Card key={proposal.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                      </div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription>{proposal.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTimeRemaining(proposal.endTime)} remaining</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {proposal.proposer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{proposal.proposer.name}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Votes: {proposal.totalVotes}</span>
                        <span>Quorum: {proposal.totalVotes}/{proposal.quorum}</span>
                      </div>
                      <Progress 
                        value={proposal.totalVotes} 
                        max={proposal.quorum} 
                        className="h-1.5"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <h4 className="font-medium">For</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.for}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.for / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">Against</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.against}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.against / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-medium">Abstain</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.abstain}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.abstain / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between border-t">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Discussion
                  </Button>
                  
                  {votingStatus[proposal.id] ? (
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        You voted: {votingStatus[proposal.id]}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Change Vote
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-200 text-green-700 bg-green-50 hover:bg-green-100 hover:text-green-800"
                        onClick={() => handleVote(proposal.id, 'for')}
                      >
                        <CircleCheck className="h-4 w-4 mr-2" />
                        For
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800"
                        onClick={() => handleVote(proposal.id, 'against')}
                      >
                        <CircleX className="h-4 w-4 mr-2" />
                        Against
                      </Button>
                      <Button size="sm" variant="outline"
                        onClick={() => handleVote(proposal.id, 'abstain')}
                      >
                        Abstain
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
          
          <div className="flex justify-center mt-8">
            <Button>
              Create New Proposal
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-4 space-y-6">
          {pastProposals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3">
                  <BarChart3 className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Past Proposals</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                  There are no completed proposals yet. Past proposals will appear here once voting has concluded.
                </p>
              </CardContent>
            </Card>
          ) : (
            pastProposals.map(proposal => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                      </div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription>{proposal.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {proposal.proposer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{proposal.proposer.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ended {new Date(proposal.endTime).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <h4 className="font-medium">For</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.for}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.for / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">Against</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.against}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.against / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-medium">Abstain</h4>
                        </div>
                        <p className="text-lg font-bold">{proposal.votes.abstain}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((proposal.votes.abstain / proposal.totalVotes) * 100)}% of votes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button variant="outline" size="sm">
                    View Results
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 