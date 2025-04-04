import type { Metadata } from "next"
import Link from "next/link"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircleDollarSign, CreditCard, ArrowDownUp, Plus, Wallet as WalletIcon, Shield, Banknote, History, ExternalLink, QrCode, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Wallet | CivicChain Finance",
  description: "Manage your digital assets and accounts",
}

export default function WalletPage() {
  return (
    <DashboardClientWrapper
      heading="Wallet"
      text="Manage your digital assets, traditional accounts, and CivicChain tokens"
    >
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main balance card */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-5 w-5 text-primary" />
                <span>Main Balance</span>
              </CardTitle>
              <CardDescription>Available across all accounts</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold">$12,456.78</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 2.5%</span> from last month
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Plus className="mr-1 h-4 w-4" /> Add
                  </Button>
                  <Button size="sm">
                    <ArrowDownUp className="mr-1 h-4 w-4" /> Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 pb-0">
              <div className="flex justify-between w-full items-center">
                <span className="text-sm text-muted-foreground">Monthly spending limit: $5,000.00</span>
                <div className="w-32">
                  <Progress value={35} className="h-2" />
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* CVC Tokens card */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                <span>CVC Tokens</span>
                <Badge variant="outline" className="ml-2 text-xs">Civic Rewards</Badge>
              </CardTitle>
              <CardDescription>Your civic engagement rewards</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold">550 CVC</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Value: <span className="font-medium">$1,897.50</span> ($3.45/CVC)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <QrCode className="mr-1 h-4 w-4" /> Receive
                  </Button>
                  <Button size="sm">
                    <ArrowDownUp className="mr-1 h-4 w-4" /> Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 pb-0">
              <div className="flex justify-between w-full items-center">
                <span className="text-sm text-muted-foreground">30-day growth</span>
                <span className="text-sm text-green-500 font-medium">+45 CVC (+5.2%)</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Accounts Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your financial accounts</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" />
                <span>Add Account</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bank" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
                <TabsTrigger value="crypto">Crypto Wallets</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bank" className="space-y-4">
                {[
                  { 
                    id: 1, 
                    name: "Main Checking", 
                    type: "Checking Account", 
                    balance: "$8,456.78", 
                    institution: "First National Bank",
                    accountNumber: "******4589",
                    connected: true
                  },
                  { 
                    id: 2, 
                    name: "Savings", 
                    type: "Savings Account", 
                    balance: "$3,450.00", 
                    institution: "First National Bank",
                    accountNumber: "******7823",
                    connected: true
                  },
                  { 
                    id: 3, 
                    name: "Emergency Fund", 
                    type: "Savings Account", 
                    balance: "$5,250.00", 
                    institution: "Credit Union",
                    accountNumber: "******1278",
                    connected: true
                  },
                ].map(account => (
                  <div key={account.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Banknote className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.institution} • {account.accountNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{account.balance}</p>
                        <p className="text-xs text-muted-foreground">Current Balance</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="crypto" className="space-y-4">
                {[
                  { 
                    id: 1, 
                    name: "Civic Wallet", 
                    type: "CVC Wallet", 
                    balance: "550 CVC ($1,897.50)", 
                    address: "cvc1q8v...3efg",
                    connected: true
                  },
                  { 
                    id: 2, 
                    name: "Ethereum", 
                    type: "ETH Wallet", 
                    balance: "1.24 ETH ($2,356.80)", 
                    address: "0x742d...f5e7",
                    connected: true
                  },
                ].map(wallet => (
                  <div key={wallet.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CircleDollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{wallet.name}</p>
                        <p className="text-sm text-muted-foreground">{wallet.type} • {wallet.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{wallet.balance}</p>
                        <p className="text-xs text-muted-foreground">Current Balance</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="cards" className="space-y-4">
                {[
                  { 
                    id: 1, 
                    name: "Primary Credit Card", 
                    type: "Visa", 
                    balance: "$1,245.30", 
                    lastFour: "4589",
                    expiryDate: "05/27",
                    connected: true
                  },
                  { 
                    id: 2, 
                    name: "Rewards Card", 
                    type: "Mastercard", 
                    balance: "$567.42", 
                    lastFour: "9823",
                    expiryDate: "11/25",
                    connected: true
                  },
                ].map(card => (
                  <div key={card.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{card.name}</p>
                        <p className="text-sm text-muted-foreground">{card.type} •••• {card.lastFour} • Exp: {card.expiryDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-red-500">{card.balance}</p>
                        <p className="text-xs text-muted-foreground">Current Balance</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Recent wallet transactions</CardDescription>
              </div>
              <Link href="/finance/transactions">
                <Button variant="outline" size="sm">
                  <History className="mr-1 h-4 w-4" />
                  <span>View All</span>
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  name: "Coffee Shop", 
                  amount: "-$4.50", 
                  date: "Today, 08:45 AM", 
                  account: "Main Checking",
                  type: "expense"
                },
                { 
                  id: 2, 
                  name: "Salary Deposit", 
                  amount: "+$3,450.00", 
                  date: "Yesterday, 06:00 AM", 
                  account: "Main Checking",
                  type: "income"
                },
                { 
                  id: 3, 
                  name: "Grocery Store", 
                  amount: "-$78.25", 
                  date: "Apr 2, 2025, 02:30 PM", 
                  account: "Main Checking",
                  type: "expense"
                },
                { 
                  id: 4, 
                  name: "CVC Token Reward", 
                  amount: "+25 CVC", 
                  date: "Apr 1, 2025, 12:00 PM", 
                  account: "Civic Wallet",
                  type: "reward"
                },
                { 
                  id: 5, 
                  name: "Electric Bill", 
                  amount: "-$145.30", 
                  date: "Mar 30, 2025, 03:15 PM", 
                  account: "Main Checking",
                  type: "expense"
                },
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-600' :
                      transaction.type === 'expense' ? 'bg-red-100 text-red-600' :
                      'bg-indigo-100 text-indigo-600'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowDownUp className="h-4 w-4" />
                      ) : transaction.type === 'expense' ? (
                        <CreditCard className="h-4 w-4" />
                      ) : (
                        <Shield className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'income' || transaction.type === 'reward' ? 'text-green-500' : 
                      'text-red-500'
                    }`}>{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.account}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full justify-center">
              <Link href="/finance/transactions">
                <Button variant="link" className="gap-1">
                  <span>View All Transactions</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardClientWrapper>
  )
} 