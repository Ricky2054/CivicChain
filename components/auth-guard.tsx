"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
  // Array of paths that should be publicly accessible
  publicPaths?: string[]
}

export function AuthGuard({ 
  children, 
  publicPaths = ["/", "/about", "/signup", "/signup/profile", "/signup/location"] 
}: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check if the user is logged in
    try {
      const userData = localStorage.getItem("userData")
      const isLoggedIn = !!userData
      setIsAuthenticated(isLoggedIn)
      
      // If not logged in and trying to access a protected route, redirect to home
      if (!isLoggedIn && !publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
        router.push("/")
      }
    } catch (error) {
      console.error("Error checking authentication status:", error)
      setIsAuthenticated(false)
      router.push("/")
    }
  }, [pathname, router, publicPaths])
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }
  
  // If trying to access protected route while not authenticated, don't render children
  if (!isAuthenticated && !publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
    return null
  }
  
  // Otherwise, render children (either public route or authenticated user)
  return <>{children}</>
} 