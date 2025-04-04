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
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col w-full">
        <header className="sticky top-0 z-40 border-b bg-background w-full">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <MainNav />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex-1 flex w-full h-[calc(100vh-4rem)]">
          <Sidebar variant="inset" className="hidden md:block">
            <SidebarHeader className="flex h-[60px] items-center border-b px-6">
              <span className="font-bold">CivicChain Finance</span>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav />
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">A</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">Verified DID</p>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="w-full">
            <main className="flex w-full flex-1 flex-col overflow-auto p-4 md:p-6">
              <div className={cn("flex flex-1 flex-col gap-4 max-w-7xl mx-auto w-full", className)}>{children}</div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

