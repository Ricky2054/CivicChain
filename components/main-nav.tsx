"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check if user is logged in
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData")
      setIsLoggedIn(!!userData)
    } catch (error) {
      console.error("Error checking login status:", error)
      setIsLoggedIn(false)
    }
    
    // Add event listener for login status changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData' || e.key === null) {
        try {
          const userData = localStorage.getItem("userData")
          setIsLoggedIn(!!userData)
        } catch (error) {
          console.error("Error checking login status:", error)
        }
      }
    }
    
    // Listen for custom event
    const handleAuthChange = () => {
      try {
        const userData = localStorage.getItem("userData")
        setIsLoggedIn(!!userData)
      } catch (error) {
        console.error("Error checking login status:", error)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('user-auth-change', handleAuthChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('user-auth-change', handleAuthChange)
    }
  }, [])
  
  // Create active route check
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }
  
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Zap className="h-5 w-5 text-primary" />
        <span className="font-bold text-lg">CivicChain</span>
      </Link>
      <nav className="flex items-center gap-6 md:gap-8 text-sm">
        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/finance"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/finance") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Finance
            </Link>
            <Link
              href="/civic"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/civic") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Civic
            </Link>
            <Link
              href="/community"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/community") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Community
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/") && !isActive("/signup") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                isActive("/about") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              About
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

