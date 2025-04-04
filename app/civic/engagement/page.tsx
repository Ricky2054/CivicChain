"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Clock, CalendarDays, Users, Shield, BadgeCheck, Building2, Heart, MapPin, ChevronRight, CheckSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import apiService from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

// Default user data to use when real data isn't available
const DEFAULT_USER_DATA = {
  id: "guest-user",
  name: "Guest User",
  email: "guest@example.com"
}

export default function CivicEngagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("local")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState<number | null>(null)
  const [localEvents, setLocalEvents] = useState<any[]>([])
  const [onlineEvents, setOnlineEvents] = useState<any[]>([])
  const [userEngagement, setUserEngagement] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr || userDataStr === "undefined") {
      // Use default data for demo/development
      fetchEngagementData(DEFAULT_USER_DATA.id)
      
      toast({
        title: "Demo Mode",
        description: "You're viewing the civic engagement page in demo mode.",
        variant: "default"
      })
      return
    }
    
    try {
      const userData = JSON.parse(userDataStr)
      fetchEngagementData(userData.id)
    } catch (error) {
      console.error("Error parsing user data:", error)
      
      // Use default data instead of redirecting
      fetchEngagementData(DEFAULT_USER_DATA.id)
      
      toast({
        title: "Error",
        description: "Could not load your profile data. Using demo data instead.",
        variant: "destructive"
      })
    }
  }, [router, toast])
  
  const fetchEngagementData = async (userId: string) => {
    try {
      setLoading(true)
      
      // Fetch engagement data
      const response = await apiService.civic.getEngagement(userId)
      if (response.opportunities) {
        // Separate local and online events
        setLocalEvents(response.opportunities.filter((opp: any) => opp.type === 'local') || [])
        setOnlineEvents(response.opportunities.filter((opp: any) => opp.type === 'online') || [])
        
        // Set user engagement stats
        if (response.userStats) {
          setUserEngagement(response.userStats)
        }
      }
    } catch (error) {
      console.error("Error fetching engagement data:", error)
      toast({
        title: "Error",
        description: "Could not load civic engagement data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  const handleRegister = async (eventId: number) => {
    const userDataStr = localStorage.getItem("userData")
    if (!userDataStr || userDataStr === "undefined") {
      toast({
        title: "Error",
        description: "You must be logged in to register for events",
        variant: "destructive"
      })
      return
    }
    
    try {
      setSubmitting(eventId)
      
      let userId = DEFAULT_USER_DATA.id
      
      // Try to get the actual user ID
      if (userDataStr && userDataStr !== "undefined") {
        const userData = JSON.parse(userDataStr)
        userId = userData.id
      }
      
      // Call the API to register
      const response = await fetch('/api/civic/engagement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update the local event state to reflect registration
        const updateEvents = (events: any[]) => {
          return events.map(event => {
            if (event.id === eventId) {
              return {
                ...event,
                isRegistered: true,
                participants: event.participants + 1
              }
            }
            return event
          })
        }
        
        setLocalEvents(updateEvents(localEvents))
        setOnlineEvents(updateEvents(onlineEvents))
        
        // Show success message
        toast({
          title: "Registered",
          description: "You have successfully registered for this event",
        })
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "Could not register for the event",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "An error occurred while registering for the event",
        variant: "destructive"
      })
    } finally {
      setSubmitting(null)
    }
  }
  
  // Component to render category badge
  const CategoryBadge = ({ category }: { category: string }) => {
    const colors: Record<string, string> = {
      environment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      education: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      technology: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      governance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    )
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader 
          heading="Civic Engagement" 
          text="Participate in community activities and earn rewards."
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading civic engagement opportunities...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Civic Engagement" 
        text="Participate in community activities and earn rewards."
      />
      
      {userEngagement && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Engagement</CardTitle>
                <CardDescription>Track your civic participation and impact</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                <span>{userEngagement.levelTitle}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Impact Score</span>
                  <span className="text-lg font-bold">{userEngagement.totalPoints}</span>
                </div>
                <Progress value={userEngagement.progressPercent} className="h-2" />
                <p className="text-xs text-muted-foreground">{userEngagement.pointsToNextLevel} points until Level {userEngagement.level + 1}</p>
              </div>
              
              <div className="space-y-1.5">
                <span className="text-sm font-medium">Activities Completed</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{userEngagement.activitiesCompleted}</span>
                  <span className="text-xs text-muted-foreground">events</span>
                </div>
                <div className="flex items-center text-xs text-emerald-500">
                  <CheckSquare className="mr-1 h-3 w-3" />
                  <span>{userEngagement.activitiesThisMonth} this month</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <span className="text-sm font-medium">Community Rank</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">#{userEngagement.communityRank}</span>
                  <span className="text-xs text-muted-foreground">of {userEngagement.totalParticipants}</span>
                </div>
                <div className="flex items-center text-xs text-emerald-500">
                  <ChevronRight className="mr-1 h-3 w-3" />
                  <span>Up {userEngagement.rankChange} positions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="local" onValueChange={setActiveTab} className="mt-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="local">Local Events</TabsTrigger>
            <TabsTrigger value="online">Online Opportunities</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <TabsContent value="local" className="mt-4 space-y-4">
          {localEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-muted p-3">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Local Events Found</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  There are no local events available in your area at the moment.
                  Please check back later for new opportunities.
                </p>
              </CardContent>
            </Card>
          ) : (
            localEvents.map((event) => (
              <Card key={event.id}>
                <div className="md:flex">
                  <div className="md:w-1/4 h-[140px] md:h-auto overflow-hidden bg-muted rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Heart className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <CategoryBadge category={event.category} />
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-2">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="px-3 py-1">{event.points} points</Badge>
                        {event.isRegistered ? (
                          <Button variant="outline" className="mt-auto" disabled>
                            <Check className="mr-2 h-4 w-4" />
                            Registered
                          </Button>
                        ) : (
                          <Button 
                            className="mt-auto" 
                            onClick={() => handleRegister(event.id)}
                            disabled={submitting === event.id}
                          >
                            {submitting === event.id ? (
                              <>
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-background rounded-full" />
                                Registering...
                              </>
                            ) : (
                              "Register"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="online" className="mt-4 space-y-4">
          {onlineEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-muted p-3">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Online Events Found</h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  There are no online events available at the moment.
                  Please check back later for new opportunities.
                </p>
              </CardContent>
            </Card>
          ) : (
            onlineEvents.map((event) => (
              <Card key={event.id}>
                <div className="md:flex">
                  <div className="md:w-1/4 h-[140px] md:h-auto overflow-hidden bg-muted rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Heart className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <CategoryBadge category={event.category} />
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-2">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="px-3 py-1">{event.points} points</Badge>
                        {event.isRegistered ? (
                          <Button variant="outline" className="mt-auto" disabled>
                            <Check className="mr-2 h-4 w-4" />
                            Registered
                          </Button>
                        ) : (
                          <Button 
                            className="mt-auto" 
                            onClick={() => handleRegister(event.id)}
                            disabled={submitting === event.id}
                          >
                            {submitting === event.id ? (
                              <>
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-background rounded-full" />
                                Registering...
                              </>
                            ) : (
                              "Register"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 