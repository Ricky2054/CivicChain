"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, Award, TrendingUp, ArrowUp, ArrowDown, Medal, User,
  Shield, LineChart, Building, BookOpen, Heart, Tree
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import apiService from "@/lib/api-service"
import { toast } from "@/components/ui/use-toast"

export default function CommunityLeaderboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [communityStats, setCommunityStats] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr) {
      // Redirect to home if not logged in
      router.push("/")
      return
    }
    
    fetchLeaderboardData()
  }, [router])
  
  const fetchLeaderboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch leaderboard data
      const response = await apiService.community.getLeaderboard()
      if (response.leaderboard) {
        setLeaderboardData(response.leaderboard)
      }
      if (response.currentUser) {
        setCurrentUser(response.currentUser)
      }
      if (response.stats) {
        setCommunityStats(response.stats)
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error)
      toast({
        title: "Error",
        description: "Could not load leaderboard data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  const getBadgeIcon = (badgeName: string) => {
    const name = badgeName.toLowerCase()
    if (name.includes('civic')) return <Building className="h-4 w-4" />
    if (name.includes('financial') || name.includes('guru')) return <LineChart className="h-4 w-4" />
    if (name.includes('environment') || name.includes('green')) return <Tree className="h-4 w-4" />
    if (name.includes('hero') || name.includes('leader')) return <Medal className="h-4 w-4" />
    if (name.includes('innovator') || name.includes('digital')) return <Shield className="h-4 w-4" />
    return <Award className="h-4 w-4" />
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Community Leaderboard"
          text="See how you rank among other community members"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading leaderboard data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community Leaderboard"
        text="See how you rank among other community members"
      />
      
      {currentUser && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Your Current Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.split(' ')[0]?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      #{currentUser.rank}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-sm">
                    {currentUser.movement.direction === "up" ? (
                      <div className="flex items-center text-green-500">
                        <ArrowUp className="h-3.5 w-3.5" />
                        <span>{currentUser.movement.value} positions</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <ArrowDown className="h-3.5 w-3.5" />
                        <span>{currentUser.movement.value} positions</span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">this week</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Score</p>
                  <p className="text-2xl font-bold">{currentUser.totalScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Percentile</p>
                  <p className="text-2xl font-bold">{communityStats?.userPercentile || '--'}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Gap to #1</p>
                  <p className="text-2xl font-bold">{communityStats?.leaderGap || '--'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Civic Score</span>
                  <span className="font-medium">{currentUser.civicScore} / {currentUser.totalScore}</span>
                </div>
                <Progress value={(currentUser.civicScore / currentUser.totalScore) * 100} className="h-2 bg-blue-100 dark:bg-blue-900">
                  <div className="bg-blue-500 h-full rounded-full" />
                </Progress>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Financial Score</span>
                  <span className="font-medium">{currentUser.financialScore} / {currentUser.totalScore}</span>
                </div>
                <Progress value={(currentUser.financialScore / currentUser.totalScore) * 100} className="h-2 bg-green-100 dark:bg-green-900">
                  <div className="bg-green-500 h-full rounded-full" />
                </Progress>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Environmental Score</span>
                  <span className="font-medium">{currentUser.environmentalScore} / {currentUser.totalScore}</span>
                </div>
                <Progress value={(currentUser.environmentalScore / currentUser.totalScore) * 100} className="h-2 bg-yellow-100 dark:bg-yellow-900">
                  <div className="bg-yellow-500 h-full rounded-full" />
                </Progress>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {currentUser.badges.map((badge: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {getBadgeIcon(badge)}
                  <span>{badge}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats?.totalUsers || '--'}</div>
            <p className="text-xs text-muted-foreground">Active participants</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Civic Actions</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats?.totalCivicActions || '--'}</div>
            <p className="text-xs text-muted-foreground">Total completed actions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats?.totalStakedAmount || '--'}</div>
            <p className="text-xs text-muted-foreground">In community funds</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats?.averageScore || '--'}</div>
            <p className="text-xs text-muted-foreground">Community average</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="top" className="mt-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="top">Top Rankings</TabsTrigger>
          <TabsTrigger value="trends">Recent Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="top" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Community Members</CardTitle>
              <CardDescription>
                Leaders in civic engagement and community building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.slice(0, 10).map((entry, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isCurrentUser ? 'bg-primary/5 border border-primary/20' : 'border border-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          entry.rank === 1 ? 'bg-yellow-500 text-yellow-950' :
                          entry.rank === 2 ? 'bg-gray-300 text-gray-800' :
                          entry.rank === 3 ? 'bg-amber-600 text-amber-950' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {entry.rank}
                        </div>
                        
                        {entry.movement.direction === "up" ? (
                          <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <ArrowUp className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <ArrowDown className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                          <AvatarFallback>
                            {entry.name.split(' ')[0]?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {entry.badges.slice(0, 2).map((badge: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-[10px] h-4 px-1">
                                {badge}
                              </Badge>
                            ))}
                            {entry.badges.length > 2 && (
                              <Badge variant="outline" className="text-[10px] h-4 px-1">
                                +{entry.badges.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">{entry.totalScore}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline">View Full Leaderboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Trends</CardTitle>
              <CardDescription>
                Recent activity and growth in different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Top Growing Categories</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {communityStats?.recentTrends.map((trend: any, i: number) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {trend.category === "Education" ? (
                              <BookOpen className="h-5 w-5 text-blue-500" />
                            ) : trend.category === "Infrastructure" ? (
                              <Building className="h-5 w-5 text-amber-500" />
                            ) : trend.category === "Healthcare" ? (
                              <Heart className="h-5 w-5 text-red-500" />
                            ) : (
                              <Tree className="h-5 w-5 text-green-500" />
                            )}
                            <span className="font-medium">{trend.category}</span>
                          </div>
                          <Badge variant="secondary" className="text-green-600">
                            {trend.change}
                          </Badge>
                        </div>
                        <Progress value={parseInt(trend.change)} max={15} className="h-1.5 mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Top Civic Category</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">{communityStats?.topCivicCategory || "Infrastructure"}</span>
                      </div>
                      <Badge>Most Active</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      The most popular category for civic engagement activities in your community.
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>186 participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>12 projects</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span>45,300 CVC staked</span>
                      </div>
                    </div>
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