import { DashboardWrapper } from "@/components/dashboard-wrapper"

export default function CivicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  )
} 