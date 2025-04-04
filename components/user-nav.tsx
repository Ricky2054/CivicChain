"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Settings, KeyRound, LogOut, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function UserNav() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    try {
      const userDataStr = localStorage.getItem("userData")
      if (userDataStr && userDataStr !== "undefined") {
        setUserData(JSON.parse(userDataStr))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    } finally {
      setLoading(false)
    }
  }, [])
  
  const handleLogout = () => {
    try {
      localStorage.removeItem("userData")
      
      // Trigger login status update in header
      if (window.updateLoginStatus) {
        window.updateLoginStatus()
      }
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
        variant: "default",
      })
      
      // Redirect to home
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }
  
  if (loading) {
    return (
      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }
  
  if (!userData) {
    return null
  }
  
  // Extract initials from name
  const initials = userData.name
    ? userData.name.split(" ").map((n: string) => n[0]).join("")
    : "U"
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border-2 border-primary/10">
            <AvatarImage 
              src={userData.avatarUrl || "/placeholder.svg?height=36&width=36"} 
              alt={userData.name || "User"} 
            />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData.email || "No email"}</p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-xs flex items-center gap-1 text-emerald-500 border-emerald-200 px-2">
                <Shield className="h-3 w-3" />
                <span>Verified</span>
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/security")}>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// For TypeScript global interface
declare global {
  interface Window {
    updateLoginStatus?: () => void;
  }
}

