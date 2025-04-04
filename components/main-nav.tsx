import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  
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
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80 font-medium",
            isActive("/") ? "text-foreground" : "text-muted-foreground"
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
          Civic Engagement
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
      </nav>
    </div>
  )
}

