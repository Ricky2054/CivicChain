"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, CheckCircle, Clock, ExternalLink, Lock, FileText, AlertCircle, Fingerprint } from "lucide-react"

interface BlockchainActivityProps {
  className?: string
}

const transactions = [
  {
    id: "0x8a3d...5e1f",
    type: "Smart Contract",
    description: "Social Credit Score Update",
    status: "Confirmed",
    time: "2 hours ago",
    block: 15482930,
  },
  {
    id: "0x7b2c...9d4a",
    type: "Transaction",
    description: "Reward Distribution",
    status: "Confirmed",
    time: "Yesterday",
    block: 15482845,
  },
  {
    id: "0x3f1a...7c2b",
    type: "Identity",
    description: "DID Verification",
    status: "Confirmed",
    time: "3 days ago",
    block: 15481932,
  },
  {
    id: "0x9e4d...2b1c",
    type: "DAO",
    description: "Governance Vote",
    status: "Pending",
    time: "Just now",
    block: null,
  },
]

const smartContracts = [
  {
    id: "0x1d2e...8f3a",
    name: "SocialCreditScore",
    description: "Manages social credit scoring and updates",
    interactions: 245,
    lastUpdated: "2 hours ago",
    verified: true,
  },
  {
    id: "0x4c5d...2e1f",
    name: "RewardDistribution",
    description: "Handles reward distribution based on scores",
    interactions: 189,
    lastUpdated: "Yesterday",
    verified: true,
  },
  {
    id: "0x7a8b...3c4d",
    name: "CivicEngagement",
    description: "Tracks and verifies civic participation",
    interactions: 132,
    lastUpdated: "3 days ago",
    verified: true,
  },
  {
    id: "0x2b3c...9d8e",
    name: "IdentityVerification",
    description: "Manages decentralized identity verification",
    interactions: 78,
    lastUpdated: "1 week ago",
    verified: true,
  },
]

export function BlockchainActivity({ className }: BlockchainActivityProps) {
  return (
    <Card className={cn("mt-4", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Blockchain Activity</CardTitle>
            <CardDescription>Transparent record of all blockchain interactions</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Tamper-Proof</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="zero-knowledge">Zero-Knowledge Proofs</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{tx.description}</h4>
                          <Badge variant="outline" className="ml-2">
                            {tx.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {tx.id}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {tx.time}
                          {tx.block && <span className="ml-2">Block: {tx.block}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge
                          variant={tx.status === "Confirmed" ? "default" : "outline"}
                          className="flex items-center"
                        >
                          {tx.status === "Confirmed" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {tx.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View on Explorer</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="smart-contracts">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {smartContracts.map((contract) => (
                  <div key={contract.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{contract.name}</h4>
                          {contract.verified && (
                            <Badge variant="outline" className="ml-2 text-emerald-500 border-emerald-500">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{contract.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <p>ID: {contract.id}</p>
                          <span className="mx-2">•</span>
                          <p>Interactions: {contract.interactions}</p>
                          <span className="mx-2">•</span>
                          <p>Updated: {contract.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Contract</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View on Explorer</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="zero-knowledge">
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Zero-Knowledge Identity Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Your identity has been verified without exposing personal data. The blockchain only stores
                      cryptographic proofs of your verification.
                    </p>
                    <div className="flex items-center pt-2">
                      <Badge variant="outline" className="mr-2 flex items-center">
                        <CheckCircle className="mr-1 h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500">Verified</span>
                      </Badge>
                      <Badge variant="outline" className="mr-2 flex items-center">
                        <Fingerprint className="mr-1 h-3 w-3" />
                        <span>DID: did:civic:0x3f1a...7c2b</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Financial Privacy Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Your financial data is protected using zero-knowledge proofs. Third parties can verify your
                      creditworthiness without accessing your actual financial history.
                    </p>
                    <div className="flex items-center pt-2">
                      <Badge variant="outline" className="mr-2 flex items-center">
                        <Lock className="mr-1 h-3 w-3 text-primary" />
                        <span>Privacy Preserved</span>
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Verification History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="w-full md:w-auto">Learn More About Zero-Knowledge Proofs</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

