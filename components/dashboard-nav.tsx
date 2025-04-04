"use client"

import Link from "next/link"
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
  return (
    <nav className={cn("flex w-full flex-col gap-2", className)}>
      {sidebarItems.map((section, i) => (
        <SidebarGroup key={i}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item, j) => (
                <SidebarMenuItem key={j}>
                  <Link href={item.href || "#"} passHref>
                    <SidebarMenuButton isActive={item.href === "/"} tooltip={item.title}>
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <SidebarMenuSub>
                      {item.children.map((child, k) => (
                        <SidebarMenuSubItem key={k}>
                          <Link href={child.href} passHref>
                            <SidebarMenuSubButton isActive={false}>
                              {child.title}
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  )
}

