import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  LineChart,
  PieChart,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Users,
  BadgeCheck,
  Trophy,
  Activity,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Analytics | CivicChain Finance",
  description: "View detailed analytics for your financial and civic activities",
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics Dashboard" text="Comprehensive insights into your financial and civic activities." />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="civic">Civic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,456.78</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>5.2%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,350.00</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>12.5%</span>
                  <span className="text-muted-foreground ml-1">from target</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Social Credit</CardTitle>
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>+12</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#12</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>+3</span>
                  <span className="text-muted-foreground ml-1">positions this month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Monthly financial trends over the past year</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] w-full">
                  <BarChartExample />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution of your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChartExample />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Civic Participation</CardTitle>
                <CardDescription>Activity trends over time</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] w-full">
                  <LineChartExample />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key indicators of your financial and civic health</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Savings Rate</span>
                    </div>
                    <span className="font-medium">21.3%</span>
                  </div>
                  <Progress value={21.3} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Target: 20%</span>
                    <span>50%</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Investment Returns (YTD)</span>
                    </div>
                    <span className="font-medium">8.15%</span>
                  </div>
                  <Progress value={81.5} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Target: 7%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <BadgeCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Civic Engagement</span>
                    </div>
                    <span className="font-medium">16 activities</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>Target: 15</span>
                    <span>20</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Community Impact</span>
                    </div>
                    <span className="font-medium">278 points</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>Target: 300</span>
                    <span>500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250.00</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>3.2%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,830.00</div>
                <div className="flex items-center pt-1 text-xs text-red-500">
                  <ChevronDown className="h-3.5 w-3.5 mr-1" />
                  <span>2.3%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,420.00</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>8.5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investment Returns</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.15%</div>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>0.5%</span>
                  <span className="text-muted-foreground ml-1">from last quarter</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Monthly comparison over the past year</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[350px] w-full">
                  <StackedBarChartExample />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current month's spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center">
                  <ExpensePieChartExample />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="civic" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Social Credit</CardTitle>
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <div className="mt-2 space-y-1">
                  <Progress value={84} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Civic Activities</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">Completed activities this month</p>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>+4</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">Available to redeem</p>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>+350</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#12</div>
                <p className="text-xs text-muted-foreground">Out of 547 local citizens</p>
                <div className="flex items-center pt-1 text-xs text-green-500">
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  <span>+3</span>
                  <span className="text-muted-foreground ml-1">positions this month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Civic Activity Breakdown</CardTitle>
                <CardDescription>Participation by category</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[350px] w-full">
                  <CivicBarChartExample />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Social Credit Trend</CardTitle>
                <CardDescription>Score progress over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[350px] w-full">
                  <SocialCreditLineChartExample />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Note: In a real application, these would be actual chart components using a library like Recharts
// For this example, I'm just showing placeholder components

function BarChartExample() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <BarChart className="h-16 w-16" />
      <p className="text-center text-sm">Monthly financial trends chart (Bar)</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function PieChartExample() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <PieChart className="h-16 w-16" />
      <p className="text-center text-sm">Asset allocation pie chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function LineChartExample() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <LineChart className="h-16 w-16" />
      <p className="text-center text-sm">Civic participation line chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function StackedBarChartExample() {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <BarChart className="h-16 w-16" />
      <p className="text-center text-sm">Income vs. Expenses stacked bar chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function ExpensePieChartExample() {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <PieChart className="h-16 w-16" />
      <p className="text-center text-sm">Expense breakdown pie chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function CivicBarChartExample() {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <BarChart className="h-16 w-16" />
      <p className="text-center text-sm">Civic activity breakdown chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
}

function SocialCreditLineChartExample() {
  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
      <LineChart className="h-16 w-16" />
      <p className="text-center text-sm">Social credit trend line chart</p>
      <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
    </div>
  )
} 