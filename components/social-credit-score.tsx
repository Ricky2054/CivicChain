"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, Award, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialCreditScoreProps {
  className?: string
}

export function SocialCreditScore({ className }: SocialCreditScoreProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Social Credit Score</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  Your social credit score is calculated based on your financial behavior, civic engagement, and
                  community contributions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Your current standing and benefits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Score</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold">842</span>
                <span className="ml-2 flex items-center text-xs text-emerald-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12
                </span>
              </div>
            </div>
            <Progress value={84} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Current Benefits</h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 rounded-md border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Loan Rate Reduction</p>
                  <p className="text-xs text-muted-foreground">-1.2% on all loans</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Premium Cashback</p>
                  <p className="text-xs text-muted-foreground">3% on all transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

