"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Vote, Award, CreditCard, Landmark } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RecentActivityProps {
  className?: string
}

const activities = [
  {
    id: 1,
    type: "transaction",
    title: "Grocery Purchase",
    amount: "-$85.20",
    date: "Today, 10:30 AM",
    icon: CreditCard,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    direction: "down",
  },
  {
    id: 2,
    type: "civic",
    title: "Community Cleanup",
    amount: "+15 points",
    date: "Yesterday, 2:15 PM",
    icon: Vote,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    direction: "up",
  },
  {
    id: 3,
    type: "reward",
    title: "Cashback Reward",
    amount: "+$12.50",
    date: "Yesterday, 9:45 AM",
    icon: Award,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    direction: "up",
  },
  {
    id: 4,
    type: "transaction",
    title: "Electric Bill",
    amount: "-$120.00",
    date: "Jul 12, 2023",
    icon: CreditCard,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    direction: "down",
  },
  {
    id: 5,
    type: "verification",
    title: "Identity Verified",
    amount: "+25 points",
    date: "Jul 10, 2023",
    icon: ShieldCheck,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    direction: "up",
  },
  {
    id: 6,
    type: "governance",
    title: "DAO Vote Cast",
    amount: "+10 points",
    date: "Jul 8, 2023",
    icon: Landmark,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    direction: "up",
  },
]

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest transactions and civic actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", activity.bgColor)}>
                  <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <div className="flex items-center">
                  {activity.direction === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      activity.direction === "up" ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {activity.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

