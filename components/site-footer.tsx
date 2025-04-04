"use client"

import Link from "next/link"
import { Building, Github, Mail, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Building className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CivicChain Finance. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium"
          >
            Terms
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium"
          >
            Privacy
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
} 