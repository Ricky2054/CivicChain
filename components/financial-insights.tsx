"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { cn } from "@/lib/utils"
import { BrainCircuit, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FinancialInsightsProps {
  className?: string
}

const spendingData = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 1800 },
  { name: "Mar", amount: 1600 },
  { name: "Apr", amount: 1400 },
  { name: "May", amount: 2000 },
  { name: "Jun", amount: 1800 },
  { name: "Jul", amount: 1700 },
]

const savingsData = [
  { name: "Jan", amount: 500 },
  { name: "Feb", amount: 600 },
  { name: "Mar", amount: 800 },
  { name: "Apr", amount: 1100 },
  { name: "May", amount: 1300 },
  { name: "Jun", amount: 1500 },
  { name: "Jul", amount: 1800 },
]

export function FinancialInsights({ className }: FinancialInsightsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium">Financial Insights</CardTitle>
            <CardDescription>AI-powered analysis of your financial behavior</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>
          <TabsContent value="spending" className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Insights</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <p className="text-sm">Your spending is 12% lower than last month</p>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm">Entertainment spending increased by 24%</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="savings" className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Insights</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <p className="text-sm">Your savings rate has increased by 20% this quarter</p>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <p className="text-sm">You're on track to meet your annual savings goal</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="predictions" className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-start space-x-3">
                  <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">AI Prediction</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your current spending patterns, you could save an additional $320 per month by optimizing
                      your subscription services and food delivery expenses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-start space-x-3">
                  <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Investment Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Your risk profile and financial goals align with a diversified ETF portfolio. Consider allocating
                      15% of your savings to these investments.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full">View Detailed Financial Plan</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

