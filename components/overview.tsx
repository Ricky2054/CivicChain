"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { cn } from "@/lib/utils"

interface OverviewProps {
  className?: string
}

const data = [
  {
    name: "Jan",
    socialCredit: 780,
    financialHealth: 680,
    civicEngagement: 580,
  },
  {
    name: "Feb",
    socialCredit: 790,
    financialHealth: 700,
    civicEngagement: 600,
  },
  {
    name: "Mar",
    socialCredit: 810,
    financialHealth: 720,
    civicEngagement: 650,
  },
  {
    name: "Apr",
    socialCredit: 825,
    financialHealth: 740,
    civicEngagement: 680,
  },
  {
    name: "May",
    socialCredit: 830,
    financialHealth: 760,
    civicEngagement: 700,
  },
  {
    name: "Jun",
    socialCredit: 835,
    financialHealth: 780,
    civicEngagement: 720,
  },
  {
    name: "Jul",
    socialCredit: 842,
    financialHealth: 800,
    civicEngagement: 750,
  },
]

export function Overview({ className }: OverviewProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Track your progress across all metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Metrics</TabsTrigger>
            <TabsTrigger value="social">Social Credit</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="civic">Civic</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="socialCredit" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="financialHealth" stroke="hsl(var(--secondary))" strokeWidth={2} />
                <Line type="monotone" dataKey="civicEngagement" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="social" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="socialCredit"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary)/0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="financial" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="financialHealth"
                  stroke="hsl(var(--secondary))"
                  fill="hsl(var(--secondary)/0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="civic" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="civicEngagement"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent)/0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

