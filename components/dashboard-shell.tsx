"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [userData, setUserData] = useState<{ name: string } | null>(null)
  
  useEffect(() => {
    try {
      const userDataStr = localStorage.getItem("userData")
      if (userDataStr) {
        const data = JSON.parse(userDataStr)
        setUserData(data)
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }, [])
  
  // Extract initials from name
  const initials = userData?.name
    ? userData.name.split(" ").map(n => n[0]).join("")
    : "U"
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col w-full bg-background/95">
        <header className="sticky top-0 z-40 border-b bg-background/95 w-full">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <MainNav />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex-1 flex w-full h-[calc(100vh-4rem)]">
          <Sidebar variant="static" className="w-64 md:block border-r">
            <SidebarHeader className="flex h-[60px] items-center border-b px-6">
              <span className="font-bold">CivicChain Finance</span>
            </SidebarHeader>
            <SidebarContent className="py-2">
              <DashboardNav />
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{initials}</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{userData?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 overflow-auto">
            <main className="flex w-full flex-1 flex-col p-5 md:p-8">
              <div className={cn("flex flex-1 flex-col gap-6 max-w-7xl mx-auto w-full", className)}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

