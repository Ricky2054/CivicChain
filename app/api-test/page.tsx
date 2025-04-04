"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

// Define all API endpoints to test
const API_ENDPOINTS = [
  { name: "Finance Accounts", url: "/api/finance/accounts", params: { userId: "test-user-id" } },
  { name: "Finance Transactions", url: "/api/finance/transactions", params: { userId: "test-user-id", limit: 5, offset: 0 } },
  { name: "Finance Opportunities", url: "/api/finance/opportunities", params: { userId: "test-user-id" } },
  { name: "Civic Social Credit", url: "/api/civic/social-credit", params: { userId: "test-user-id" } },
  { name: "Civic Engagement", url: "/api/civic/engagement", params: { userId: "test-user-id" } },
  { name: "Community Staking", url: "/api/community/staking", params: { userId: "test-user-id" } },
  { name: "Community Leaderboard", url: "/api/community/leaderboard", params: {} },
]

interface ApiTestResult {
  endpoint: string
  status: "success" | "error" | "pending" | "not-tested"
  responseTime: number
  data: any
  error?: string
}

export default function ApiTestPage() {
  const [results, setResults] = useState<ApiTestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("summary")
  
  // Test a single API endpoint
  const testEndpoint = async (endpoint: typeof API_ENDPOINTS[0]): Promise<ApiTestResult> => {
    const startTime = performance.now()
    try {
      // Build URL with query parameters
      const queryParams = new URLSearchParams(endpoint.params).toString()
      const url = `${endpoint.url}?${queryParams}`
      
      const response = await fetch(url)
      const endTime = performance.now()
      
      if (!response.ok) {
        return {
          endpoint: endpoint.name,
          status: "error",
          responseTime: Math.round(endTime - startTime),
          data: null,
          error: `Status: ${response.status} ${response.statusText}`
        }
      }
      
      const data = await response.json()
      return {
        endpoint: endpoint.name,
        status: "success",
        responseTime: Math.round(endTime - startTime),
        data
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        endpoint: endpoint.name,
        status: "error",
        responseTime: Math.round(endTime - startTime),
        data: null,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }
  
  // Run all API tests
  const runAllTests = async () => {
    setIsLoading(true)
    setResults(API_ENDPOINTS.map(endpoint => ({
      endpoint: endpoint.name,
      status: "pending",
      responseTime: 0,
      data: null
    })))
    
    const testResults = await Promise.all(
      API_ENDPOINTS.map(endpoint => testEndpoint(endpoint))
    )
    
    setResults(testResults)
    setIsLoading(false)
  }
  
  // Get status summary
  const getSummary = () => {
    const totalTests = results.length
    const successful = results.filter(r => r.status === "success").length
    const failed = results.filter(r => r.status === "error").length
    const pending = results.filter(r => r.status === "pending").length
    
    return { totalTests, successful, failed, pending }
  }
  
  // Get status badge
  const getStatusBadge = (status: ApiTestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Success</Badge>
      case "error":
        return <Badge className="bg-red-500"><XCircle className="h-3 w-3 mr-1" /> Error</Badge>
      case "pending":
        return <Badge className="bg-yellow-500"><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Testing</Badge>
      default:
        return <Badge variant="outline"><AlertTriangle className="h-3 w-3 mr-1" /> Not Tested</Badge>
    }
  }
  
  // Format JSON for display
  const formatJSON = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch (e) {
      return "Unable to format data"
    }
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="API Test Suite"
        text="Test and monitor all API endpoints in one place"
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <Button onClick={runAllTests} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests
              </>
            ) : (
              "Run All Tests"
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {results.length > 0 && (
            <>
              <Badge variant="outline" className="gap-1">
                Total: {getSummary().totalTests}
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 gap-1">
                <CheckCircle className="h-3 w-3" /> {getSummary().successful}
              </Badge>
              <Badge variant="outline" className="bg-red-500/10 text-red-600 gap-1">
                <XCircle className="h-3 w-3" /> {getSummary().failed}
              </Badge>
            </>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="results">Detailed Results</TabsTrigger>
          <TabsTrigger value="metamask">MetaMask Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>API Status Overview</CardTitle>
              <CardDescription>Status of all API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No tests have been run yet. Click "Run All Tests" to begin.
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result.endpoint} className="flex items-center justify-between p-2 rounded-md border">
                      <div>
                        <div className="font-medium">{result.endpoint}</div>
                        {result.error && (
                          <div className="text-xs text-red-500 mt-1">{result.error}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {result.status === "success" && (
                          <div className="text-xs text-muted-foreground">
                            {result.responseTime}ms
                          </div>
                        )}
                        {getStatusBadge(result.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results">
          <div className="space-y-4">
            {results.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  No tests have been run yet. Click "Run All Tests" to begin.
                </CardContent>
              </Card>
            ) : (
              results.map((result) => (
                <Card key={result.endpoint}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{result.endpoint}</CardTitle>
                      {getStatusBadge(result.status)}
                    </div>
                    <CardDescription>
                      Response time: {result.responseTime}ms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {result.error ? (
                      <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-md">
                        <div className="font-medium">Error:</div>
                        <div className="text-sm">{result.error}</div>
                      </div>
                    ) : (
                      <pre className="p-4 bg-muted rounded-md overflow-auto text-xs">
                        {formatJSON(result.data)}
                      </pre>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="metamask">
          <MetaMaskIntegration />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function MetaMaskIntegration() {
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    // Check if MetaMask is installed
    const checkMetaMask = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        setHasMetaMask(true)
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          setAccount(accounts[0] || null)
          if (accounts.length === 0) {
            setConnected(false)
            setBalance(null)
          } else if (connected) {
            fetchBalance(accounts[0])
          }
        })
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })
        
        // Get current network
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' })
          setNetworkName(chainId)
        } catch (error) {
          console.error("Error getting chain ID:", error)
        }
      } else {
        setHasMetaMask(false)
      }
    }
    
    checkMetaMask()
  }, [])
  
  const setNetworkName = (chainId: string) => {
    const networks: {[key: string]: string} = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
    }
    
    setNetwork(networks[chainId] || `Chain ID: ${chainId}`)
  }
  
  const connectMetaMask = async () => {
    if (!window.ethereum) return
    
    setIsLoading(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
      setConnected(true)
      await fetchBalance(accounts[0])
      
      // Get current chain
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setNetworkName(chainId)
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const fetchBalance = async (address: string) => {
    try {
      const balanceHex = await window.ethereum.request({ 
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
      
      // Convert from wei to ether
      const balanceInWei = parseInt(balanceHex, 16)
      const balanceInEther = balanceInWei / 1e18
      setBalance(balanceInEther.toFixed(4))
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }
  
  // Helper to format ethereum addresses
  const formatAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
  
  if (hasMetaMask === null) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }
  
  if (hasMetaMask === false) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>MetaMask Not Installed</CardTitle>
          <CardDescription>Please install MetaMask to use blockchain features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
            <p>MetaMask is required for blockchain functionality in CivicChain Finance.</p>
            <Button asChild>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Install MetaMask
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>MetaMask Integration</CardTitle>
        <CardDescription>Connect your Ethereum wallet to access blockchain features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!connected ? (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
              <img 
                src="/metamask-fox.svg" 
                alt="MetaMask Logo" 
                className="h-24 w-24" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg';
                }}
              />
              <p className="text-center">Connect your MetaMask wallet to access CivicChain Finance blockchain features</p>
              <Button onClick={connectMetaMask} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect MetaMask"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-md">
                <div>
                  <div className="text-sm font-medium">Connected Account</div>
                  <div className="text-xs text-muted-foreground">
                    {account}
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600">
                  Connected
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm font-medium mb-1">Network</div>
                  <div className="text-lg font-bold">{network}</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="text-sm font-medium mb-1">Balance</div>
                  <div className="text-lg font-bold">{balance} ETH</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Integration Status</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    MetaMask detected and connected
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Account access granted
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Balance retrieved successfully
                  </li>
                </ul>
              </div>
              
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh Connection
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Extend the window object with ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
} 