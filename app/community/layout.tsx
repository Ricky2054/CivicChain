import { DashboardWrapper } from "@/components/dashboard-wrapper"

export default function CommunityLayout({
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