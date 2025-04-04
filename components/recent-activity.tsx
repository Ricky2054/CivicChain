"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowDown, ArrowUp, CircleDollarSign, Clock, CreditCard, Landmark, Building, UserRound } from "lucide-react"
import { useMemo } from "react"

interface RecentActivityProps {
  className?: string
  transactions?: any[]
}

export function RecentActivity({ className, transactions = [] }: RecentActivityProps) {
  // Process transactions data or use mock data if none provided
  const activityData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      // Fallback mock data
      return [
        {
          id: 1,
          type: "deposit",
          amount: "₹5,000.00",
          description: "Salary Deposit",
          date: "Today, 10:45 AM",
          icon: Landmark,
          color: "bg-emerald-500",
          iconColor: "text-emerald-500"
        },
        {
          id: 2,
          type: "withdrawal",
          amount: "₹1,250.00",
          description: "Rent Payment",
          date: "Yesterday, 6:30 PM",
          icon: Building,
          color: "bg-rose-500",
          iconColor: "text-rose-500"
        },
        {
          id: 3,
          type: "payment",
          amount: "₹350.00",
          description: "Electricity Bill",
          date: "2 days ago",
          icon: CreditCard,
          color: "bg-amber-500",
          iconColor: "text-amber-500"
        },
        {
          id: 4,
          type: "transfer",
          amount: "₹2,000.00",
          description: "To Rahul Kumar",
          date: "3 days ago",
          icon: UserRound,
          color: "bg-blue-500",
          iconColor: "text-blue-500"
        }
      ]
    }
    
    // Map API transaction data to the format needed for display
    return transactions.map(transaction => {
      // Determine transaction type and styling based on category and amount
      let type = "payment"
      let icon = CreditCard
      let color = "bg-amber-500"
      let iconColor = "text-amber-500"
      
      if (transaction.category === "Income") {
        type = "deposit"
        icon = Landmark
        color = "bg-emerald-500"
        iconColor = "text-emerald-500"
      } else if (transaction.category === "Loans") {
        type = "withdrawal"
        icon = Building
        color = "bg-rose-500"
        iconColor = "text-rose-500"
      } else if (transaction.category === "Transfer") {
        type = "transfer"
        icon = UserRound
        color = "bg-blue-500"
        iconColor = "text-blue-500"
      }
      
      return {
        id: transaction.id,
        type,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.formattedDate,
        icon,
        color,
        iconColor
      }
    })
  }, [transactions])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription>Your latest transactions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activityData.map((transaction) => (
            <div key={transaction.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${transaction.color}/10`}>
                <transaction.icon className={`h-4 w-4 ${transaction.iconColor}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{transaction.date}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  {transaction.type === "deposit" || transaction.type === "transfer" ? (
                    <span className="text-emerald-500 flex items-center">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {transaction.amount}
                    </span>
                  ) : (
                    <span className="text-rose-500 flex items-center">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {transaction.amount}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Showing recent activities from the last 7 days
            </p>
            <a 
              href="/finance/transactions" 
              className="text-xs text-primary inline-flex items-center mt-2 hover:underline"
            >
              View all transactions
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

