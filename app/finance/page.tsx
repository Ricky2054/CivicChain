import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircleDollarSign, TrendingUp, Wallet, CreditCard, LineChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Finance | CivicChain Finance",
  description: "View your financial status, transactions and investments",
}

export default function FinancePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Finance Dashboard" text="Manage your wallet, transactions, and investments in one place." />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,456.78</div>
                <p className="text-xs text-muted-foreground">+$1,245.23 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,350.00</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investment Returns</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8.15%</div>
                <p className="text-xs text-muted-foreground">YTD portfolio performance</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: "Coffee Shop", amount: "-$4.50", date: "Today", type: "expense", icon: <ArrowDownRight className="h-4 w-4 text-red-500" /> },
                  { id: 2, name: "Salary Deposit", amount: "+$3,450.00", date: "Yesterday", type: "income", icon: <ArrowUpRight className="h-4 w-4 text-green-500" /> },
                  { id: 3, name: "Grocery Store", amount: "-$78.25", date: "Apr 2, 2025", type: "expense", icon: <ArrowDownRight className="h-4 w-4 text-red-500" /> },
                  { id: 4, name: "Dividend Payment", amount: "+$32.40", date: "Apr 1, 2025", type: "income", icon: <ArrowUpRight className="h-4 w-4 text-green-500" /> },
                  { id: 5, name: "Electric Bill", amount: "-$145.30", date: "Mar 30, 2025", type: "expense", icon: <ArrowDownRight className="h-4 w-4 text-red-500" /> },
                ].map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
                <CardDescription>Your portfolio allocation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: "Stocks", allocation: "45%", value: "$5,630.25", change: "+5.2%" },
                  { id: 2, name: "Bonds", allocation: "25%", value: "$3,110.45", change: "+1.3%" },
                  { id: 3, name: "Real Estate", allocation: "15%", value: "$1,840.75", change: "+3.7%" },
                  { id: 4, name: "Crypto", allocation: "10%", value: "$1,245.33", change: "+12.5%" },
                  { id: 5, name: "Cash", allocation: "5%", value: "$630.00", change: "0%" },
                ].map(investment => (
                  <div key={investment.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{investment.name}</p>
                      <p className="text-xs text-muted-foreground">{investment.allocation} of portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{investment.value}</p>
                      <p className="text-xs text-green-500">{investment.change}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
              <CardDescription>Manage your digital assets and accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Connected Accounts</h3>
                  {[
                    { id: 1, name: "Main Checking", type: "Bank Account", balance: "$8,456.78", institution: "First National Bank" },
                    { id: 2, name: "Savings", type: "Bank Account", balance: "$3,450.00", institution: "First National Bank" },
                    { id: 3, name: "Investment", type: "Brokerage", balance: "$12,456.78", institution: "Civic Investments" },
                    { id: 4, name: "Civic Wallet", type: "Crypto Wallet", balance: "550 CVC", institution: "CivicChain" },
                  ].map(account => (
                    <div key={account.id} className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.type} • {account.institution}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{account.balance}</p>
                        <p className="text-xs text-muted-foreground">Current Balance</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Your Civic Tokens</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <CircleDollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">CVC Token</p>
                          <p className="text-sm text-muted-foreground">Current value: $3.45</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">550 CVC</p>
                        <p className="text-sm text-muted-foreground">$1,897.50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
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
                ].map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        transaction.type === 'income' ? 'bg-green-100' :
                        transaction.type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
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
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
} 