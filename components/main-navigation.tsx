"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface MainNavigationProps {
  links?: {
    title: string
    href: string
    label?: string
  }[]
}

export function MainNavigation({ links }: MainNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  
  const defaultLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Finance",
      href: "/finance",
    },
    {
      title: "Governance",
      href: "/governance",
    },
    {
      title: "About",
      href: "/about",
    },
  ]

  const navigationLinks = links || defaultLinks

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navigationLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#E41D20] px-1.5 py-0.5 text-xs text-white">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function MobileNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Define navigation links with hierarchical structure
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Finance",
      href: "/finance",
      children: [
        {
          title: "Dashboard",
          href: "/finance/dashboard",
        },
        {
          title: "Community Staking",
          href: "/finance/community-staking",
        },
        {
          title: "Transactions",
          href: "/finance/transactions",
        }
      ]
    },
    {
      title: "Governance",
      href: "/governance",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Account",
      children: [
        {
          title: "Sign Up",
          href: "/signup",
        },
        {
          title: "Profile",
          href: "/profile",
        },
      ]
    }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {links.map((item) =>
              item.children ? (
                <div key={item.title} className="flex flex-col space-y-3 pt-4">
                  <h4 className="font-medium">{item.title}</h4>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "transition-colors hover:text-foreground/80 text-sm ml-2",
                        pathname === child.href
                          ? "text-foreground"
                          : "text-foreground/60"
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
} 