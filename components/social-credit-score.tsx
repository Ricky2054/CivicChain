"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowUpRight, Award, AlertCircle, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialCreditScoreProps {
  className?: string
}

export function SocialCreditScore({ className }: SocialCreditScoreProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">Social Credit Score</CardTitle>
          <CardDescription>Your current standing and benefits</CardDescription>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px] text-xs">
                Your social credit score is calculated based on your financial behavior, civic engagement, and
                community contributions.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Current Score</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">842</span>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  +12
                </span>
              </div>
            </div>
            
            <div className="mt-3 space-y-1.5">
              <Progress value={84} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Current Benefits</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-3 rounded-md border p-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">Loan Rate Reduction</p>
                  <p className="text-xs text-muted-foreground">-1.2% on all loans</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
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

