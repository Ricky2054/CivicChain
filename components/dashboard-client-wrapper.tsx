"use client"

import React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

interface DashboardClientWrapperProps {
  heading: string
  text?: string
  children: React.ReactNode
}

export function DashboardClientWrapper({
  heading,
  text,
  children
}: DashboardClientWrapperProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading={heading} text={text} />
      {children}
    </DashboardShell>
  )
} 