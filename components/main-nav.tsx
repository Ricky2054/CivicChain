import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span className="font-bold hidden md:inline-block">CivicChain</span>
      </Link>
      <nav className="flex items-center gap-4 md:gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground font-medium"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/finance"
          className={cn(
            "transition-colors hover:text-foreground/80 text-muted-foreground"
          )}
        >
          Finance
        </Link>
        <Link
          href="/civic"
          className={cn(
            "transition-colors hover:text-foreground/80 text-muted-foreground"
          )}
        >
          Civic Engagement
        </Link>
        <Link
          href="/community"
          className={cn(
            "transition-colors hover:text-foreground/80 text-muted-foreground hidden sm:block"
          )}
        >
          Community
        </Link>
      </nav>
    </div>
  )
}

