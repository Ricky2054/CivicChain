"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Vote, Award, MapPin, Calendar, Users } from "lucide-react"
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Civic Engagement</CardTitle>
            <CardDescription>Upcoming events and completed activities</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Vote className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">320 Total Points</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="map">District Map</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {event.participants} participants
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="outline" className="flex items-center">
                        <Award className="mr-1 h-3 w-3" />
                        {event.points} points
                      </Badge>
                      <Button size="sm">Register</Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {activity.date}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="outline" className="flex items-center">
                      <Award className="mr-1 h-3 w-3" />
                      {activity.points} points
                    </Badge>
                    <span className="text-xs font-medium text-emerald-500">{activity.status}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="map" className="flex justify-center">
            <div className="relative h-[300px] w-full rounded-lg border bg-muted/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Interactive district map with civic engagement heatmap
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Load Map
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

