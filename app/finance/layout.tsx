import { DashboardWrapper } from "@/components/dashboard-wrapper"

export default function FinanceLayout({
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