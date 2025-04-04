import type { Metadata } from "next"
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  CircleDollarSign,
  BarChart4,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Globe,
  Loader2,
  RefreshCw,
  Plus,
  Info
} from "lucide-react"

export const metadata: Metadata = {
  title: "Investments | CivicChain Finance",
  description: "Manage your investment portfolio and track performance",
}

export default function InvestmentsPage() {
  return (
    <DashboardClientWrapper
      heading="Investments"
      text="Track and manage your investment portfolio"
    >
      <div className="grid gap-6">
        {/* Portfolio Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,456.78</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  8.15%
                </span>
                <span className="text-xs text-muted-foreground ml-2">YTD Return</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,354.25</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  $845.30
                </span>
                <span className="text-xs text-muted-foreground ml-2">Last 30 days</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Civic Impact</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  12%
                </span>
                <span className="text-xs text-muted-foreground ml-2">From last quarter</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dividend Yield</CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  0.3%
                </span>
                <span className="text-xs text-muted-foreground ml-2">From last quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Portfolio Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Portfolio Overview</CardTitle>
                <CardDescription>Asset allocation and performance</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Investment
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="allocation" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="allocation">Allocation</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="allocation" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Asset allocation visualization would go here */}
                  <div className="flex items-center justify-center rounded-md border p-8 h-64">
                    <div className="flex flex-col items-center text-center">
                      <PieChart className="h-10 w-10 mb-2 text-muted-foreground" />
                      <p className="font-medium">Asset Allocation Chart</p>
                      <p className="text-sm text-muted-foreground">Visualization of your portfolio</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { id: 1, name: "Stocks", allocation: "45%", value: "$5,630.25", change: "+5.2%" },
                      { id: 2, name: "Bonds", allocation: "25%", value: "$3,110.45", change: "+1.3%" },
                      { id: 3, name: "Real Estate", allocation: "15%", value: "$1,840.75", change: "+3.7%" },
                      { id: 4, name: "Crypto", allocation: "10%", value: "$1,245.33", change: "+12.5%" },
                      { id: 5, name: "Cash", allocation: "5%", value: "$630.00", change: "0%" },
                    ].map(asset => (
                      <div key={asset.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            asset.id === 1 ? 'bg-blue-500' :
                            asset.id === 2 ? 'bg-green-500' :
                            asset.id === 3 ? 'bg-yellow-500' :
                            asset.id === 4 ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}></div>
                          <p className="font-medium">{asset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{asset.value}</p>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-muted-foreground">{asset.allocation}</span>
                            <span className="text-xs text-green-500">{asset.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="flex items-center justify-center rounded-md border p-8 h-64">
                  <div className="flex flex-col items-center text-center">
                    <LineChart className="h-10 w-10 mb-2 text-muted-foreground" />
                    <p className="font-medium">Performance Chart</p>
                    <p className="text-sm text-muted-foreground">Visualization of your portfolio growth</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-4">Performance by Period</h3>
                    <div className="space-y-2">
                      {[
                        { period: "1 Month", return: "+2.1%" },
                        { period: "3 Months", return: "+4.5%" },
                        { period: "YTD", return: "+8.15%" },
                        { period: "1 Year", return: "+12.7%" },
                        { period: "Since Inception", return: "+24.3%" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-sm">{item.period}</span>
                          <span className="text-sm text-green-500">{item.return}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-4">Top Performers</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Tech ETF", ticker: "TECH", return: "+18.5%" },
                        { name: "Green Energy", ticker: "GREN", return: "+15.2%" },
                        { name: "CVC Token", ticker: "CVC", return: "+12.5%" },
                        { name: "Healthcare", ticker: "HLTH", return: "+10.1%" },
                        { name: "Financials", ticker: "FIN", return: "+7.8%" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <div>
                            <span className="text-sm">{item.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">({item.ticker})</span>
                          </div>
                          <span className="text-sm text-green-500">{item.return}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <div className="space-y-4">
                  {[
                    { 
                      id: 1, 
                      transaction: "Buy", 
                      asset: "Green Energy ETF", 
                      ticker: "GREN", 
                      amount: "$500.00", 
                      date: "Apr 2, 2025",
                      shares: "5.25",
                      price: "$95.23",
                      type: "buy"
                    },
                    { 
                      id: 2, 
                      transaction: "Dividend", 
                      asset: "Dividend ETF", 
                      ticker: "DIVD", 
                      amount: "$32.40", 
                      date: "Apr 1, 2025",
                      shares: "",
                      price: "",
                      type: "dividend"
                    },
                    { 
                      id: 3, 
                      transaction: "Sell", 
                      asset: "Tech Stock", 
                      ticker: "TECH", 
                      amount: "$750.50", 
                      date: "Mar 25, 2025",
                      shares: "3.00",
                      price: "$250.16",
                      type: "sell"
                    },
                    { 
                      id: 4, 
                      transaction: "Buy", 
                      asset: "Civic Token", 
                      ticker: "CVC", 
                      amount: "$500.00", 
                      date: "Mar 15, 2025",
                      shares: "172.41",
                      price: "$2.90",
                      type: "buy"
                    },
                    { 
                      id: 5, 
                      transaction: "Deposit", 
                      asset: "Cash", 
                      ticker: "", 
                      amount: "$2,000.00", 
                      date: "Mar 10, 2025",
                      shares: "",
                      price: "",
                      type: "deposit"
                    },
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          transaction.type === 'buy' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'sell' ? 'bg-red-100 text-red-600' :
                          transaction.type === 'dividend' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {transaction.type === 'buy' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : transaction.type === 'sell' ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : transaction.type === 'dividend' ? (
                            <CircleDollarSign className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.transaction}: {transaction.asset}</p>
                          <div className="flex items-center">
                            {transaction.ticker && (
                              <Badge variant="outline" className="mr-2 text-xs">{transaction.ticker}</Badge>
                            )}
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        {transaction.shares && (
                          <p className="text-xs text-muted-foreground">
                            {transaction.shares} shares @ {transaction.price}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* ESG Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Civic Impact Investing</CardTitle>
            <CardDescription>Environmental, Social, and Governance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ESG Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Environmental Impact</h3>
                  <span className="text-sm font-medium">85/100</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">Your portfolio is 75% invested in environmentally sustainable companies.</p>
              </div>
              
              {/* Social Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Social Impact</h3>
                  <span className="text-sm font-medium">72/100</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground">Your investments support companies with strong social responsibility practices.</p>
              </div>
              
              {/* Governance Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Governance Quality</h3>
                  <span className="text-sm font-medium">78/100</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">Your portfolio companies have strong governance and management practices.</p>
              </div>
            </div>
            
            <div className="mt-6 rounded-md border p-4 bg-primary/5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Civic Impact Bonus</h3>
                  <p className="text-xs text-muted-foreground">Your strong civic engagement score qualifies you for reduced fees (0.15% vs standard 0.25%) on all CivicChain investment products.</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              Improve Your Civic Impact
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardClientWrapper>
  )
} 