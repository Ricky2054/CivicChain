"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface DashboardWrapperProps {
  children: ReactNode
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check if the user is logged in
    try {
      const userData = localStorage.getItem("userData")
      const isLoggedIn = !!userData
      setIsAuthenticated(isLoggedIn)
      
      if (!isLoggedIn) {
        router.push("/")
      }
    } catch (error) {
      console.error("Error checking authentication status:", error)
      setIsAuthenticated(false)
      router.push("/")
    }
  }, [router])
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }
  
  // If not authenticated, don't render anything (should be redirected)
  if (!isAuthenticated) {
    return null
  }
  
  // User is authenticated, render children
  return <>{children}</>
} 