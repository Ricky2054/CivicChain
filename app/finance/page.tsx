"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircleDollarSign, TrendingUp, Wallet, CreditCard, LineChart, ArrowUpRight, ArrowDownRight, Users, Building, Landmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import apiService from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FinancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  const [opportunities, setOpportunities] = useState<any[]>([
    { 
      title: "Low-Interest Rural Development Loan", 
      institution: "National Bank for Agriculture",
      interestRate: "4.5%",
      maxAmount: "₹200,000",
      eligibility: "High",
      description: "Special loan program for rural entrepreneurs with minimal documentation requirements.",
      tag: "Featured" 
    },
    { 
      title: "Women Entrepreneur Fund", 
      institution: "Ministry of Finance",
      interestRate: "3.75%",
      maxAmount: "₹500,000",
      eligibility: "Medium",
      description: "Government-backed funding program for women-led businesses in rural and semi-urban areas.",
      tag: "Government" 
    },
    { 
      title: "Digital Small Business Loan", 
      institution: "Digital Finance Corp",
      interestRate: "6.25%",
      maxAmount: "₹300,000",
      eligibility: "High",
      description: "Fast approval digital loan for small business owners with minimal paperwork.",
      tag: "Quick Approval" 
    }
  ])
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr || userDataStr === "undefined") {
      // Set logged in state to false instead of redirecting
      setLoggedIn(false)
      setLoading(false)
      return
    }
    
    try {
      // Safely parse the JSON data with error handling
      let parsedData;
      try {
        parsedData = JSON.parse(userDataStr);
      } catch (parseError) {
        console.error("Invalid JSON in localStorage:", parseError);
        // Set logged in state to false instead of redirecting
        setLoggedIn(false)
        setLoading(false)
        return;
      }
      
      if (!parsedData || !parsedData.id) {
        console.error("User data is missing ID");
        // Set logged in state to false instead of redirecting
        setLoggedIn(false)
        setLoading(false)
        return;
      }
      
      setUserData(parsedData)
      
      // Fetch financial data
      fetchFinancialData(parsedData.id)
    } catch (error) {
      console.error("Error processing user data:", error)
      setLoggedIn(false)
      setLoading(false)
      toast({
        title: "Error",
        description: "Could not load your profile data",
        variant: "destructive"
      })
    }
  }, [toast])
  
  const fetchFinancialData = async (userId: string) => {
    try {
      setLoading(true)
      
      // Fetch accounts
      const accountsResponse = await apiService.finance.getAccounts(userId)
      if (accountsResponse.accounts) {
        setAccounts(accountsResponse.accounts)
      }
      
      // Fetch transactions
      const transactionsResponse = await apiService.finance.getTransactions(userId, 5, 0)
      if (transactionsResponse.transactions) {
        setTransactions(transactionsResponse.transactions)
      }
      
      // Fetch opportunities
      try {
        const opportunitiesResponse = await apiService.finance.getOpportunities(userId)
        if (opportunitiesResponse.opportunities) {
          setOpportunities(opportunitiesResponse.opportunities)
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error)
        // Keep using default opportunities if API fails
      }
    } catch (error) {
      console.error("Error fetching financial data:", error)
      toast({
        title: "Error",
        description: "Could not load your financial data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Financial Dashboard"
          text="Manage your financial assets, transactions, and opportunities"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading your financial data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  // Show login required state
  if (!loggedIn) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Financial Dashboard"
          text="Manage your financial assets, transactions, and opportunities"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>
                Please log in to access your financial information
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-muted-foreground text-sm">
                You need to be logged in to view your financial dashboard, accounts, and opportunities.
              </p>
              <div className="flex gap-4 justify-end">
                <Button variant="outline" asChild>
                  <Link href="/">Go to Home</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }
  
  // Calculate stats for cards
  const totalBalance = accounts.reduce((sum, account) => sum + (account.balanceRaw || 0), 0)
  const formattedTotalBalance = `₹${Math.abs(totalBalance).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
  
  const savings = accounts
    .filter(account => account.balanceRaw > 0 && account.type !== 'Loan')
    .reduce((sum, account) => sum + account.balanceRaw, 0)
  const formattedSavings = `₹${savings.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
  
  const loans = accounts
    .filter(account => account.balanceRaw < 0 || account.type === 'Loan')
    .reduce((sum, account) => sum + Math.abs(account.balanceRaw), 0)
  const formattedLoans = `₹${loans.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
  
  // Mock subsidy data
  const formattedSubsidies = "₹5,750.00"
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Financial Dashboard"
        text="Manage your financial assets, transactions, and opportunities"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedTotalBalance}</div>
            <p className="text-xs text-muted-foreground">across all accounts</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+2.5%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedSavings}</div>
            <p className="text-xs text-muted-foreground">in savings accounts</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+8.1%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loans</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedLoans}</div>
            <p className="text-xs text-muted-foreground">outstanding balance</p>
            <div className="mt-4 flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>-1.2%</span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subsidies</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedSubsidies}</div>
            <p className="text-xs text-muted-foreground">received this quarter</p>
            <div className="flex items-center justify-between mt-4">
              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">3 Active</Badge>
              <Badge variant="outline">2 Pending</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="accounts" className="mt-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Accounts</CardTitle>
              <CardDescription>View and manage your linked accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {accounts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No accounts found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accounts.map((account, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        <p className="text-sm text-muted-foreground">{account.institution} • {account.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">Account {account.accountNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{account.balance}</p>
                        <Badge variant="outline" className="mt-1">
                          {account.type === "Loan" ? "Due in 15 days" : "Active"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your last 5 financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                      <div>
                        <h3 className="font-medium">{transaction.description}</h3>
                        <p className="text-xs text-muted-foreground">{transaction.formattedDate} • {transaction.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transaction.amount.startsWith("+") ? "text-green-500" : ""}`}>
                          {transaction.amount}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="opportunities" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Opportunities</CardTitle>
              <CardDescription>Personalized recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {opportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.institution}</p>
                      </div>
                      <Badge>{opportunity.tag}</Badge>
                    </div>
                    
                    <p className="text-sm mt-2">{opportunity.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Interest Rate</p>
                        <p className="font-bold">{opportunity.interestRate}</p>
                      </div>
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Max Amount</p>
                        <p className="font-bold">{opportunity.maxAmount}</p>
                      </div>
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Eligibility</p>
                        <p className="font-bold">{opportunity.eligibility}</p>
                      </div>
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