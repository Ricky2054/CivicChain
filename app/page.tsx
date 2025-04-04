import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { CivicEngagement } from "@/components/civic-engagement"
import { SocialCreditScore } from "@/components/social-credit-score"
import { FinancialInsights } from "@/components/financial-insights"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { BlockchainActivity } from "@/components/blockchain-activity"

export const metadata: Metadata = {
  title: "Dashboard | CivicChain Finance",
  description: "Decentralized financial ecosystem with social credit and civic rewards",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back, Alex. Your financial and civic data at a glance." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SocialCreditScore className="lg:col-span-1" />
        <FinancialInsights className="lg:col-span-2" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="lg:col-span-4" />
        <RecentActivity className="lg:col-span-3" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <CivicEngagement className="lg:col-span-4" />
        <CommunityLeaderboard className="lg:col-span-3" />
      </div>
      <BlockchainActivity className="mb-6" />
    </DashboardShell>
  )
}

