"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useMemo } from "react"

interface OverviewProps {
  className?: string
  accounts?: any[]
}

export function Overview({ className, accounts = [] }: OverviewProps) {
  // Calculate real statistics from account data
  const statistics = useMemo(() => {
    if (!accounts || accounts.length === 0) {
      // Fallback mock data when no accounts are available
      return [
        {
          title: "Total Balance",
          value: "₹43,594.00",
          change: "+12.5%",
          trend: "up",
          icon: CircleDollarSign
        },
        {
          title: "Savings",
          value: "₹12,234.50",
          change: "+8.2%",
          trend: "up",
          icon: TrendingUp
        },
        {
          title: "Expenditure",
          value: "₹8,342.32",
          change: "-3.1%",
          trend: "down",
          icon: TrendingDown
        }
      ]
    }
    
    // Calculate total balance
    const totalBalance = accounts.reduce((sum, account) => sum + (account.balanceRaw || 0), 0)
    const formattedTotalBalance = `₹${Math.abs(totalBalance).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
    
    // Calculate savings (positive balances)
    const savings = accounts
      .filter(account => account.balanceRaw > 0 && account.type !== 'Loan')
      .reduce((sum, account) => sum + account.balanceRaw, 0)
    const formattedSavings = `₹${savings.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
    
    // Calculate debt (negative balances or loans)
    const debt = accounts
      .filter(account => account.balanceRaw < 0 || account.type === 'Loan')
      .reduce((sum, account) => sum + Math.abs(account.balanceRaw), 0)
    const formattedDebt = `₹${debt.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
    
    return [
      {
        title: "Total Balance",
        value: formattedTotalBalance,
        change: "+2.5%", // Mock change percentage
        trend: "up", 
        icon: CircleDollarSign
      },
      {
        title: "Savings",
        value: formattedSavings,
        change: "+8.2%", // Mock change percentage
        trend: "up",
        icon: TrendingUp
      },
      {
        title: "Expenditure",
        value: formattedDebt,
        change: "-3.1%", // Mock change percentage
        trend: "down",
        icon: TrendingDown
      }
    ]
  }, [accounts])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Financial Overview</CardTitle>
        <CardDescription>Your financial summary for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {statistics.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                <span className="text-sm font-semibold">{item.change}</span>
                {item.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              </div>
            </div>
          ))}
          
          <div className="mt-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Monthly Summary</p>
              <div className="w-full h-44 rounded-md overflow-hidden bg-muted/40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <path 
                    d="M0,150 L20,142 L40,145 L60,135 L80,140 L100,130 L120,125 L140,135 L160,120 L180,125 L200,110 L220,115 L240,100 L260,105 L280,90 L300,95 L320,80 L340,85 L360,70 L380,75 L400,60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-primary"
                  />
                  <path 
                    d="M0,150 L20,145 L40,148 L60,140 L80,145 L100,135 L120,140 L140,130 L160,135 L180,125 L200,130 L220,120 L240,125 L260,115 L280,120 L300,110 L320,115 L340,105 L360,110 L380,100 L400,105" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-muted-foreground/50" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

