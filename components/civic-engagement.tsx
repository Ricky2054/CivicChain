"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CivicEngagementProps {
  className?: string
}

const upcomingEvents = [
  {
    id: 1,
    title: "Community Cleanup",
    location: "Central Park",
    date: "Aug 15, 2023",
    time: "9:00 AM",
    points: 25,
    participants: 42,
  },
  {
    id: 2,
    title: "Local Council Meeting",
    location: "City Hall",
    date: "Aug 18, 2023",
    time: "6:30 PM",
    points: 15,
    participants: 28,
  },
  {
    id: 3,
    title: "Neighborhood Watch",
    location: "Downtown District",
    date: "Aug 22, 2023",
    time: "7:00 PM",
    points: 20,
    participants: 15,
  },
]

const completedActivities = [
  {
    id: 1,
    title: "Volunteer at Food Bank",
    date: "Jul 28, 2023",
    points: 30,
    status: "Verified",
  },
  {
    id: 2,
    title: "Blood Donation",
    date: "Jul 15, 2023",
    points: 40,
    status: "Verified",
  },
  {
    id: 3,
    title: "Recycling Program",
    date: "Jul 5, 2023",
    points: 15,
    status: "Verified",
  },
]

export function CivicEngagement({ className }: CivicEngagementProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-base">Civic Engagement</CardTitle>
          <CardDescription>Upcoming events and completed activities</CardDescription>
        </div>
        <div className="flex items-center mt-1">
          <BadgeCheck className="h-4 w-4 text-indigo-400 mr-1.5" />
          <span className="text-sm font-medium">
            <span className="text-indigo-400">320</span> Total Points
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="map">District Map</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingEvents.slice(0, 1).map((event) => (
                <div key={event.id} className="rounded-md border p-3">
                  <h4 className="font-medium text-sm">Community Cleanup</h4>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                      {event.participants} participants
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                      <span>{event.points} points</span>
                    </Badge>
                    <Button variant="secondary" size="sm" className="h-8 text-xs px-4">Register</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="space-y-3">
              {completedActivities.slice(0, 2).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      {activity.date}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                      <span>{activity.points} points</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="map" className="flex justify-center">
            <div className="relative h-[150px] w-full rounded-md border bg-muted/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Interactive district map
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

