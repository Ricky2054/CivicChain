import type { Metadata } from "next"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { CivicEngagement } from "@/components/civic-engagement"
import { SocialCreditScore } from "@/components/social-credit-score"
import { FinancialInsights } from "@/components/financial-insights"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { BlockchainActivity } from "@/components/blockchain-activity"
import { Separator } from "@/components/ui/separator"

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
      {/* Key Metrics Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Key Metrics</h2>
        <p className="text-sm text-muted-foreground">Track your performance across all key areas</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <Overview className="col-span-full lg:col-span-2 h-[400px]" />
        <CivicEngagement className="h-[200px] md:h-auto" />
        <SocialCreditScore className="h-[200px] md:h-auto" />
        <FinancialInsights className="md:col-span-2 lg:col-span-2 h-[250px] md:h-auto" />
      </div>
      
      <Separator className="my-8" />
      
      {/* Activity & Community Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Activity & Community</h2>
        <p className="text-sm text-muted-foreground">Recent transactions and community engagement</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <RecentActivity className="lg:col-span-2 h-[350px] md:h-auto" />
        <CommunityLeaderboard className="h-[350px] md:h-auto" />
      </div>
      
      <Separator className="my-8" />
      
      {/* Blockchain Activity Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Blockchain Activity</h2>
        <p className="text-sm text-muted-foreground">View your on-chain transactions and smart contract interactions</p>
      </div>
      
      <div className="mt-4">
        <BlockchainActivity className="h-[300px] md:h-auto" />
      </div>
    </DashboardClientWrapper>
  )
}

