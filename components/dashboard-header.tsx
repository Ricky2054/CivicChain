"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 pb-8", className)}>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h1>
      {text && <p className="text-muted-foreground max-w-3xl">{text}</p>}
      {children}
    </div>
  )
}

