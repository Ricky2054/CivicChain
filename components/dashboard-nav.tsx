"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Wallet,
  CircleDollarSign,
  LineChart,
  Shield,
  BadgeCheck,
  Trophy,
  Users,
  Building2,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
  external?: boolean
  label?: string
  children?: {
    title: string
    href: string
    disabled?: boolean
    external?: boolean
    label?: string
  }[]
}

const sidebarItems: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: <BarChart className="h-4 w-4" />,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: <LineChart className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Wallet",
        href: "/finance/wallet",
        icon: <Wallet className="h-4 w-4" />,
      },
      {
        title: "Transactions",
        href: "/finance/transactions",
        icon: <CircleDollarSign className="h-4 w-4" />,
      },
      {
        title: "Investments",
        href: "/finance/investments",
        icon: <LineChart className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Civic",
    items: [
      {
        title: "Social Credit",
        href: "/civic/social-credit",
        icon: <Shield className="h-4 w-4" />,
      },
      {
        title: "Engagement",
        href: "/civic/engagement",
        icon: <BadgeCheck className="h-4 w-4" />,
      },
      {
        title: "Rewards",
        href: "/civic/rewards",
        icon: <Trophy className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Leaderboard",
        href: "/community/leaderboard",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "DAO Governance",
        href: "/community/governance",
        icon: <Building2 className="h-4 w-4" />,
      },
    ],
  },
]

interface DashboardNavProps {
  className?: string
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname()
  
  return (
    <nav className={cn("flex w-full flex-col gap-4", className)}>
      {sidebarItems.map((section, i) => (
        <SidebarGroup key={i} className="px-1">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-2">
            {section.title}
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu>
              {section.items.map((item, j) => {
                const isActive = 
                  item.href === pathname || 
                  (item.href !== "/" && pathname?.startsWith(item.href || ""))
                
                return (
                  <SidebarMenuItem key={j}>
                    <Link href={item.href || "#"} passHref>
                      <SidebarMenuButton 
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "transition-colors",
                          isActive ? "bg-muted font-medium" : "hover:bg-muted/50",
                          item.disabled && "pointer-events-none opacity-60"
                        )}
                      >
                        {item.icon && <span className={cn("mr-2", isActive && "text-primary")}>{item.icon}</span>}
                        <span>{item.title}</span>
                        {item.label && (
                          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {item.label}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </Link>
                    {item.children && item.children.length > 0 && (
                      <SidebarMenuSub>
                        {item.children.map((child, k) => {
                          const isChildActive = child.href === pathname
                          
                          return (
                            <SidebarMenuSubItem key={k}>
                              <Link href={child.href} passHref>
                                <SidebarMenuSubButton 
                                  isActive={isChildActive}
                                  className={cn(
                                    "transition-colors",
                                    isChildActive ? "font-medium" : "hover:bg-muted/50",
                                    child.disabled && "pointer-events-none opacity-60"
                                  )}
                                >
                                  {child.title}
                                  {child.label && (
                                    <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                      {child.label}
                                    </span>
                                  )}
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  )
}

