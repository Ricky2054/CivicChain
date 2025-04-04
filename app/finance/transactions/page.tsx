import type { Metadata } from "next"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react"

export const metadata: Metadata = {
  title: "Transactions | CivicChain Finance",
  description: "View and manage your transaction history",
}

export default function TransactionsPage() {
  return (
    <DashboardClientWrapper
      heading="Transactions"
      text="View and manage your transaction history"
    >
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View your recent financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, name: "Coffee Shop", amount: "-$4.50", date: "Apr 4, 2025", time: "08:45 AM", type: "expense", category: "Food & Drink", account: "Main Checking" },
              { id: 2, name: "Salary Deposit", amount: "+$3,450.00", date: "Apr 3, 2025", time: "06:00 AM", type: "income", category: "Salary", account: "Main Checking" },
              { id: 3, name: "Grocery Store", amount: "-$78.25", date: "Apr 2, 2025", time: "02:30 PM", type: "expense", category: "Groceries", account: "Main Checking" },
              { id: 4, name: "Dividend Payment", amount: "+$32.40", date: "Apr 1, 2025", time: "12:00 AM", type: "income", category: "Investments", account: "Investment" },
              { id: 5, name: "Electric Bill", amount: "-$145.30", date: "Mar 30, 2025", time: "03:15 PM", type: "expense", category: "Utilities", account: "Main Checking" },
              { id: 6, name: "Gas Station", amount: "-$45.75", date: "Mar 28, 2025", time: "05:45 PM", type: "expense", category: "Transportation", account: "Main Checking" },
              { id: 7, name: "Movie Tickets", amount: "-$32.50", date: "Mar 25, 2025", time: "07:20 PM", type: "expense", category: "Entertainment", account: "Main Checking" },
              { id: 8, name: "Transfer to Savings", amount: "-$500.00", date: "Mar 22, 2025", time: "10:00 AM", type: "transfer", category: "Transfers", account: "Main Checking" },
              { id: 9, name: "Transfer from Checking", amount: "+$500.00", date: "Mar 22, 2025", time: "10:00 AM", type: "transfer", category: "Transfers", account: "Savings" },
              { id: 10, name: "Rent Payment", amount: "-$1,450.00", date: "Mar 1, 2025", time: "09:00 AM", type: "expense", category: "Housing", account: "Main Checking" },
              { id: 11, name: "Community Staking Deposit", amount: "-100 CVC", date: "Mar 15, 2025", time: "02:15 PM", type: "stake", category: "Community Fund", account: "Civic Wallet" },
              { id: 12, name: "Staking Rewards", amount: "+8.2 CVC", date: "Apr 1, 2025", time: "01:00 AM", type: "income", category: "Rewards", account: "Civic Wallet" },
            ].map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' :
                    transaction.type === 'expense' ? 'bg-red-100' : 
                    transaction.type === 'stake' ? 'bg-blue-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className={`h-5 w-5 text-green-500`} />
                    ) : transaction.type === 'expense' ? (
                      <ArrowDownRight className={`h-5 w-5 text-red-500`} />
                    ) : (
                      <CreditCard className={`h-5 w-5 text-blue-500`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date} • {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-500' : 
                    transaction.type === 'expense' ? 'text-red-500' : 'text-blue-500'
                  }`}>{transaction.amount}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.account}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardClientWrapper>
  )
} 