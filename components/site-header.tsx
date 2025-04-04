"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ArrowRight, LogIn, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription, 
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

// Add TypeScript declaration for our global function
declare global {
  interface Window {
    updateLoginStatus?: () => void;
  }
}

export function SiteHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check if user is on the specified path
  const isActive = (path: string) => pathname === path
  
  // Custom event for localStorage changes
  const storageEventName = 'user-auth-change';
  
  // Function to check login status
  const checkLoginStatus = () => {
    try {
      const userDataExists = !!localStorage.getItem("userData");
      setIsLoggedIn(userDataExists);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };
  
  // Create a custom event emitter for login status changes
  const emitLoginEvent = () => {
    window.dispatchEvent(new Event(storageEventName));
  };
  
  // Add this function to window to allow other components to trigger login checks
  useEffect(() => {
    // @ts-ignore
    window.updateLoginStatus = emitLoginEvent;
    
    return () => {
      // @ts-ignore
      delete window.updateLoginStatus;
    };
  }, []);
  
  // Check login status whenever localStorage might change
  useEffect(() => {
    // Initial check
    checkLoginStatus();
    
    // Listen for storage events (when localStorage changes in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData' || e.key === null) {
        checkLoginStatus();
      }
    };
    
    // Listen for our custom event (when localStorage changes in current tab)
    const handleAuthChange = () => {
      checkLoginStatus();
    };
    
    // Handle route changes (recheck auth status on navigation)
    const handleRouteChange = () => {
      checkLoginStatus();
    };
    
    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(storageEventName, handleAuthChange);
    document.addEventListener('visibilitychange', checkLoginStatus); // Check when tab becomes visible
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(storageEventName, handleAuthChange);
      document.removeEventListener('visibilitychange', checkLoginStatus);
    };
  }, [pathname]); // Re-run when route changes
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl inline-block">CivicChain</span>
          </Link>
          
          {/* Desktop navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive("/") && "bg-accent text-accent-foreground"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive("/about") && "bg-accent text-accent-foreground"
                  )}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={
                  pathname.startsWith("/services") ? "bg-accent text-accent-foreground" : ""
                }>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Financial Inclusion
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Access essential financial services designed for all citizens, 
                            regardless of socioeconomic background.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Direct Benefits</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track and receive government subsidies directly.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Microloans</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access small, low-interest loans for personal growth.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Community Projects</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Participate in and fund local development initiatives.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile menu trigger */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>CivicChain Finance</SheetTitle>
              <SheetDescription>
                Building trust through transparency
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-md hover:bg-accent",
                  isActive("/") && "bg-accent text-accent-foreground font-medium"
                )}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-md hover:bg-accent",
                  isActive("/about") && "bg-accent text-accent-foreground font-medium"
                )}
              >
                About
              </Link>
              <p className="px-4 py-2 font-medium">Services</p>
              <Link 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 pl-8 rounded-md hover:bg-accent text-muted-foreground"
              >
                Direct Benefits
              </Link>
              <Link 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 pl-8 rounded-md hover:bg-accent text-muted-foreground"
              >
                Microloans
              </Link>
              <Link 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 pl-8 rounded-md hover:bg-accent text-muted-foreground"
              >
                Community Projects
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Right side with sign up and theme toggle */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* Sign up / Account button */}
          {isLoggedIn ? (
            <Button asChild>
              <Link href="/dashboard">
                My Account
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/signup" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign Up</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
} 