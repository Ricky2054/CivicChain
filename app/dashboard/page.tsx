"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, MapPin, FileCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import apiService from "@/lib/api-service"
import { toast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [socialCredit, setSocialCredit] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr) {
      // Redirect to home if not logged in
      router.push("/")
      return
    }
    
    try {
      const parsedData = JSON.parse(userDataStr)
      setUserData(parsedData)
      
      // Fetch additional data after getting user info
      fetchUserData(parsedData.id)
    } catch (error) {
      console.error("Error parsing user data:", error)
      toast({
        title: "Error",
        description: "Could not load your profile data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [router])
  
  const fetchUserData = async (userId: string) => {
    try {
      // Fetch financial accounts
      const accountsResponse = await apiService.finance.getAccounts(userId)
      if (accountsResponse.success) {
        setAccounts(accountsResponse.accounts)
      }
      
      // Fetch recent transactions
      const transactionsResponse = await apiService.finance.getTransactions(userId, 5, 0)
      if (transactionsResponse.success) {
        setTransactions(transactionsResponse.transactions)
      }
      
      // Fetch social credit score
      const creditResponse = await apiService.civic.getSocialCredit(userId)
      if (creditResponse.success) {
        setSocialCredit(creditResponse.creditScore)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      toast({
        title: "Error",
        description: "Could not load some of your data. Please try again later.",
        variant: "destructive"
      })
    }
  }
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Dashboard"
        text="Welcome back! Here's an overview of your account."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData?.avatarUrl || "/placeholder.svg?height=64&width=64"} alt={userData?.name || "User"} />
                <AvatarFallback className="text-lg">
                  {userData?.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold">{userData?.name || "User"}</h3>
                <div className="text-sm text-muted-foreground flex flex-col gap-1">
                  {userData?.email && <span>{userData.email}</span>}
                  {userData?.phone && (
                    <div className="flex items-center gap-1">
                      <UserRound className="h-3 w-3" />
                      <span>{userData.phone}</span>
                    </div>
                  )}
                  {userData?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{typeof userData.location === 'string' ? userData.location : userData.location.address || `${userData.location.city}, ${userData.location.state}`}</span>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="mt-1 text-xs inline-flex items-center">
                  <FileCheck className="h-3 w-3 mr-1" />
                  <span>{userData?.aadhaarVerified ? "Verified" : "Pending Verification"}</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Community Score</CardTitle>
            <CardDescription>Your current civic engagement level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-muted-foreground/20 stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                  <circle 
                    className="text-primary stroke-current" 
                    strokeWidth="10" 
                    strokeLinecap="round" 
                    strokeDasharray={`${((socialCredit?.score || 0) / 10) * 2.51} 251.2`} 
                    strokeDashoffset="0" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{socialCredit?.score || "--"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="col-span-4" accounts={accounts} />
        <RecentActivity className="col-span-3" transactions={transactions} />
      </div>
    </DashboardShell>
  )
} 