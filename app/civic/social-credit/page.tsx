import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Shield, Award, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Social Credit Score | CivicChain Finance",
  description: "Track and manage your social credit score and benefits",
}

export default function SocialCreditPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Social Credit Score" text="Your civic reputation and benefits based on community participation." />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Your Social Credit Score</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[280px] text-xs">
                      Your social credit score is calculated based on your financial behavior, civic engagement, and
                      community contributions. A higher score unlocks additional benefits and privileges.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Current standing and score history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Score</p>
                  <div className="flex items-center">
                    <span className="text-5xl font-bold">842</span>
                    <span className="ml-3 flex items-center text-sm text-green-500">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      +12 points this month
                    </span>
                  </div>
                </div>
                
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-primary/20">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">A+</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Rating Category</span>
                  <span className="font-medium">Excellent</span>
                </div>
                <Progress value={84} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor (0-300)</span>
                  <span>Fair (301-500)</span>
                  <span>Good (501-700)</span>
                  <span>Excellent (701-900)</span>
                  <span>Elite (901-1000)</span>
                </div>
              </div>
              
              <div className="rounded-md border bg-muted/20 p-4">
                <h3 className="mb-2 text-sm font-medium">Next Milestone</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Elite Status</p>
                      <p className="text-xs text-muted-foreground">Unlock tax credit benefits and premium financial services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">58 points away</p>
                    <p className="text-xs text-muted-foreground">900 points required</p>
                  </div>
                </div>
                <Progress className="mt-2 h-2" value={93.5} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Benefits</CardTitle>
              <CardDescription>Advantages unlocked by your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Loan Rate Reduction", description: "-1.2% on all loans", icon: <ArrowUpRight className="h-5 w-5 text-green-500" /> },
                { name: "Premium Cashback", description: "3% on all transactions", icon: <Award className="h-5 w-5 text-primary" /> },
                { name: "Priority Community Services", description: "Fast-track government services", icon: <Badge className="h-5 w-5 text-primary" /> },
                { name: "DAO Voting Power", description: "+15% voting weight in governance", icon: <Shield className="h-5 w-5 text-primary" /> },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="font-medium">{benefit.name}</p>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
              <CardDescription>Factors affecting your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  category: "Civic Participation", 
                  score: 92, 
                  description: "Voting and community engagement",
                  impact: "Very Positive",
                  impactColor: "text-green-500"
                },
                { 
                  category: "Financial Responsibility", 
                  score: 88, 
                  description: "Savings rate and debt management",
                  impact: "Positive",
                  impactColor: "text-green-500"
                },
                { 
                  category: "Community Contribution", 
                  score: 75, 
                  description: "Volunteering and local economy support",
                  impact: "Positive",
                  impactColor: "text-green-500"
                },
                { 
                  category: "Environmental Impact", 
                  score: 65, 
                  description: "Carbon footprint and sustainability",
                  impact: "Neutral",
                  impactColor: "text-amber-500"
                },
                { 
                  category: "Education & Skills", 
                  score: 80, 
                  description: "Ongoing learning and skill development",
                  impact: "Positive",
                  impactColor: "text-green-500"
                },
              ].map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{factor.category}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${factor.impactColor}`}>{factor.impact}</span>
                      <span className="font-bold">{factor.score}/100</span>
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Score History</CardTitle>
            <CardDescription>Your social credit progression over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-16 w-16"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              <p className="text-center text-sm">Score trend line chart</p>
              <p className="text-center text-xs">This would be an actual chart in a real implementation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
} 