import type { Metadata } from "next"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
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
    <DashboardClientWrapper
      heading="Dashboard"
      text="Welcome to your CivicChain Finance dashboard"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
        <CivicEngagement />
        <SocialCreditScore />
        <FinancialInsights />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivity className="lg:col-span-2" />
        <CommunityLeaderboard />
      </div>

      <BlockchainActivity />
    </DashboardClientWrapper>
  )
}

