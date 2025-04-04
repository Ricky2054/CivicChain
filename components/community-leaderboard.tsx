"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Medal } from "lucide-react"

interface CommunityLeaderboardProps {
  className?: string
}

const individualLeaders = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
    score: 920,
    rank: 1,
    change: "up",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MR",
    score: 895,
    rank: 2,
    change: "up",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    score: 842,
    rank: 3,
    change: "down",
  },
  {
    id: 4,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PP",
    score: 830,
    rank: 4,
    change: "same",
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    score: 815,
    rank: 5,
    change: "up",
  },
  {
    id: 6,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    score: 802,
    rank: 6,
    change: "down",
  },
  {
    id: 7,
    name: "James Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JT",
    score: 790,
    rank: 7,
    change: "same",
  },
]

const districtLeaders = [
  {
    id: 1,
    name: "Downtown District",
    score: 875,
    rank: 1,
    participants: 1240,
    change: "up",
  },
  {
    id: 2,
    name: "Riverside Community",
    score: 860,
    rank: 2,
    participants: 980,
    change: "up",
  },
  {
    id: 3,
    name: "Oakwood Heights",
    score: 845,
    rank: 3,
    participants: 1120,
    change: "same",
  },
  {
    id: 4,
    name: "Westside Neighborhood",
    score: 830,
    rank: 4,
    participants: 890,
    change: "down",
  },
  {
    id: 5,
    name: "Northgate Area",
    score: 810,
    rank: 5,
    participants: 760,
    change: "up",
  },
]

export function CommunityLeaderboard({ className }: CommunityLeaderboardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Community Leaderboard</CardTitle>
            <CardDescription>Top performers in your community</CardDescription>
          </div>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individuals">
          <TabsList className="mb-4">
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="districts">Districts</TabsTrigger>
          </TabsList>
          <TabsContent value="individuals">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {individualLeaders.map((leader) => (
                  <div key={leader.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {leader.rank === 1 ? (
                          <Trophy className="h-4 w-4 text-amber-500" />
                        ) : leader.rank === 2 ? (
                          <Medal className="h-4 w-4 text-slate-400" />
                        ) : leader.rank === 3 ? (
                          <Medal className="h-4 w-4 text-amber-700" />
                        ) : (
                          <span className="text-sm font-medium">{leader.rank}</span>
                        )}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={leader.avatar} alt={leader.name} />
                        <AvatarFallback>{leader.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{leader.name}</p>
                        {leader.id === 3 && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{leader.score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="districts">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {districtLeaders.map((district) => (
                  <div key={district.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {district.rank === 1 ? (
                          <Trophy className="h-4 w-4 text-amber-500" />
                        ) : district.rank === 2 ? (
                          <Medal className="h-4 w-4 text-slate-400" />
                        ) : district.rank === 3 ? (
                          <Medal className="h-4 w-4 text-amber-700" />
                        ) : (
                          <span className="text-sm font-medium">{district.rank}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{district.name}</p>
                        <p className="text-xs text-muted-foreground">{district.participants} participants</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{district.score}</p>
                      <p className="text-xs text-muted-foreground">avg. score</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

