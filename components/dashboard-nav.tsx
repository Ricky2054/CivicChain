"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Activity,
  Building2,
  CircleDollarSign,
  CreditCard,
  FileBarChart2,
  HomeIcon,
  LayoutDashboard,
  LineChart,
  UserCheck,
  UsersRound,
  Wallet,
  Vote,
  Award,
  Heart,
  Users,
  Building,
  HandCoins
} from "lucide-react"

interface NavProps {
  isCollapsed: boolean
}

export function DashboardNav({ isCollapsed }: NavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard"
    },
    {
      label: "Analytics",
      icon: Activity,
      href: "/analytics",
      active: pathname === "/analytics"
    },
    {
      label: "Finance",
      icon: CircleDollarSign,
      active: pathname.includes("/finance"),
      href: "/finance",
      subItems: [
        {
          label: "Wallet",
          icon: Wallet,
          href: "/finance/wallet",
          active: pathname === "/finance/wallet"
        },
        {
          label: "Transactions",
          icon: CreditCard,
          href: "/finance/transactions",
          active: pathname === "/finance/transactions"
        },
        {
          label: "Investments",
          icon: LineChart,
          href: "/finance/investments",
          active: pathname === "/finance/investments"
        },
        {
          label: "Community Staking",
          icon: HandCoins,
          href: "/finance/community-staking",
          active: pathname === "/finance/community-staking"
        }
      ]
    },
    {
      label: "Civic",
      icon: UserCheck,
      active: pathname.includes("/civic"),
      href: "/civic",
      subItems: [
        {
          label: "Social Credit",
          icon: Award,
          href: "/civic/social-credit",
          active: pathname === "/civic/social-credit"
        },
        {
          label: "Engagement",
          icon: Heart,
          href: "/civic/engagement",
          active: pathname === "/civic/engagement"
        },
        {
          label: "Rewards",
          icon: FileBarChart2,
          href: "/civic/rewards",
          active: pathname === "/civic/rewards"
        }
      ]
    },
    {
      label: "Community",
      icon: UsersRound,
      active: pathname.includes("/community"),
      href: "/community",
      subItems: [
        {
          label: "Leaderboard",
          icon: LineChart,
          href: "/community/leaderboard",
          active: pathname === "/community/leaderboard"
        },
        {
          label: "Governance",
          icon: Vote,
          href: "/community/governance",
          active: pathname === "/community/governance"
        }
      ]
    },
    {
      label: "API Test",
      icon: Activity,
      href: "/api-test",
      active: pathname === "/api-test"
    }
  ]

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {routes.map((route, index) =>
          route.subItems ? (
            <div key={index}>
              <Link
                href={route.href}
                className={cn(
                  buttonVariants({ variant: route.active ? "default" : "ghost", size: "sm" }),
                  "justify-start mb-1",
                  isCollapsed && "justify-center"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {!isCollapsed && <span>{route.label}</span>}
              </Link>
              {!isCollapsed && route.active && (
                <div className="ml-4 mb-2 grid gap-1">
                  {route.subItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: item.active ? "secondary" : "ghost", size: "sm" }),
                        "justify-start px-2 py-1.5 text-xs h-8"
                      )}
                    >
                      <item.icon className="mr-2 h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              href={route.href}
              className={cn(
                buttonVariants({ variant: route.active ? "default" : "ghost", size: "sm" }),
                "justify-start",
                isCollapsed && "justify-center"
              )}
            >
              <route.icon className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}

