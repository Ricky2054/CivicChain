"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Shield, Check, Clock, Calendar, Users } from "lucide-react"
import apiService from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

// Default user data for demo mode
const DEFAULT_USER_DATA = {
  id: "guest-user",
  name: "Guest User",
  email: "guest@example.com"
}

export default function SocialCreditPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [creditScore, setCreditScore] = useState<any>(null)
  const [scoreDetails, setScoreDetails] = useState<any>(null)
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [badges, setBadges] = useState<any[]>([])
  const [benefits, setBenefits] = useState<any[]>([])
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr || userDataStr === "undefined") {
      // Use default data for demo/development
      fetchSocialCreditData(DEFAULT_USER_DATA.id)
      
      toast({
        title: "Demo Mode",
        description: "You're viewing the social credit page in demo mode.",
        variant: "default"
      })
      return
    }
    
    try {
      const userData = JSON.parse(userDataStr)
      fetchSocialCreditData(userData.id)
    } catch (error) {
      console.error("Error parsing user data:", error)
      
      // Use default data instead of redirecting
      fetchSocialCreditData(DEFAULT_USER_DATA.id)
      
      toast({
        title: "Error",
        description: "Could not load your profile data. Using demo data instead.",
        variant: "destructive"
      })
    }
  }, [router, toast])
  
  const fetchSocialCreditData = async (userId: string) => {
    try {
      setLoading(true)
      const response = await apiService.civic.getSocialCredit(userId)
      
      if (response.score) {
        setCreditScore(response.score)
        setScoreDetails(response.categories)
        setRecentActivities(response.recentActivities || [])
        setBadges(response.badges || [])
        setBenefits(response.benefits || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch social credit data",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error fetching social credit data:", error)
      toast({
        title: "Error",
        description: "Could not load your social credit data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  // Calculate score level
  const getScoreLevel = (score: number) => {
    if (score >= 800) return "Excellent"
    if (score >= 700) return "Very Good"
    if (score >= 600) return "Good"
    if (score >= 500) return "Fair"
    return "Needs Improvement"
  }
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-emerald-500"
    if (score >= 700) return "text-green-500"
    if (score >= 600) return "text-yellow-500"
    if (score >= 500) return "text-orange-500"
    return "text-red-500"
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Social Credit Score"
          text="Track your reputation and trustworthiness in the CivicChain ecosystem"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading your social credit data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Social Credit Score"
        text="Track your reputation and trustworthiness in the CivicChain ecosystem"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Your Credit Score</CardTitle>
            <CardDescription>Overall reputation score</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle 
                    className="text-muted stroke-current" 
                    strokeWidth="8" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-primary stroke-current" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray={`${(creditScore/1000) * 251.2} 251.2`} 
                    strokeDashoffset="0" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(creditScore)}`}>{creditScore}</span>
                  <span className="text-xs text-muted-foreground">of 1000</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Badge className="px-3 py-1">
                  {getScoreLevel(creditScore)}
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">Last updated: 2 days ago</p>
              </div>
              
              {scoreDetails && (
                <div className="w-full mt-6 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Financial</span>
                      <span className="font-medium">{scoreDetails.financial}%</span>
                    </div>
                    <Progress value={scoreDetails.financial} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Civic</span>
                      <span className="font-medium">{scoreDetails.civic}%</span>
                    </div>
                    <Progress value={scoreDetails.civic} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Environmental</span>
                      <span className="font-medium">{scoreDetails.environmental}%</span>
                    </div>
                    <Progress value={scoreDetails.environmental} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Reputation</span>
                      <span className="font-medium">{scoreDetails.reputation}%</span>
                    </div>
                    <Progress value={scoreDetails.reputation} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Loyalty</span>
                      <span className="font-medium">{scoreDetails.loyalty}%</span>
                    </div>
                    <Progress value={scoreDetails.loyalty} className="h-1.5" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Benefits & Privileges</CardTitle>
            <CardDescription>Your current social credit tier unlocks these benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="p-2 rounded-full inline-flex bg-primary/10 mb-2">
                    {index === 0 ? <TrendingUp className="h-5 w-5 text-primary" /> :
                     index === 1 ? <Shield className="h-5 w-5 text-primary" /> :
                     index === 2 ? <Award className="h-5 w-5 text-primary" /> :
                     <Users className="h-5 w-5 text-primary" />}
                  </div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  <Badge variant="outline" className="mt-2">{benefit.discount}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activities" className="mt-6">
        <TabsList className="grid w-full md:w-[500px] grid-cols-2">
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements & Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Activities that have affected your social credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{activity.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-emerald-500">{activity.points}</span>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{activity.impact}</Badge>
                        <Badge variant="secondary" className="text-xs">{activity.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
              <CardDescription>Recognition for your positive contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline">{badge.dateEarned}</Badge>
                    </div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 