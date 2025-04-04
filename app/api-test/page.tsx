"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import apiService from "@/lib/api-service"
import { CheckCircle, XCircle, AlertCircle, PlayCircle, Clock, RefreshCw } from "lucide-react"

interface ApiTestResult {
  endpoint: string
  status: "success" | "error" | "pending" | "not-tested"
  responseTime: number
  data: any
  error?: string
}

// Group API endpoints by category
const API_ENDPOINTS = {
  auth: ["login", "register"],
  finance: ["accounts", "transactions", "opportunities"],
  civic: ["social-credit", "engagement"],
  community: ["staking", "leaderboard"]
}

export default function ApiTestPage() {
  const [results, setResults] = useState<Record<string, ApiTestResult>>({})
  const [activeTab, setActiveTab] = useState<string>("auth")
  const [isTestingAll, setIsTestingAll] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("")
  
  useEffect(() => {
    // Set the API base URL
    setApiBaseUrl(window.location.origin)
    
    // Try to get a user ID from localStorage for testing
    try {
      const userDataStr = localStorage.getItem("userData")
      if (userDataStr && userDataStr !== "undefined") {
        const userData = JSON.parse(userDataStr)
        if (userData && userData.id) {
          setUserId(userData.id)
        }
      } else {
        // Use a default user ID for testing when no user is logged in
        setUserId("test-user-123")
      }
    } catch (error) {
      console.error("Error getting user ID:", error)
      // Use a default user ID for testing when there's an error
      setUserId("test-user-123")
    }
  }, [])
  
  // Run a single test and update the results
  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    // Set the test to pending
    setResults((prev) => ({
      ...prev,
      [testName]: {
        endpoint: testName,
        status: "pending",
        responseTime: 0,
        data: null
      }
    }))
    
    try {
      const startTime = performance.now()
      const response = await testFunction()
      const endTime = performance.now()
      
      setResults((prev) => ({
        ...prev,
        [testName]: {
          endpoint: testName,
          status: "success",
          responseTime: Math.round(endTime - startTime),
          data: response
        }
      }))
    } catch (error) {
      console.error(`Error testing ${testName}:`, error)
      
      setResults((prev) => ({
        ...prev,
        [testName]: {
          endpoint: testName,
          status: "error",
          responseTime: 0,
          data: null,
          error: error instanceof Error ? error.message : String(error)
        }
      }))
    }
  }
  
  // Run all tests in sequence
  const runAllTests = async () => {
    setIsTestingAll(true)
    
    await testLogin()
    await testRegister()
    await testFinanceAccounts()
    await testFinanceTransactions()
    await testFinanceOpportunities()
    await testSocialCredit()
    await testCivicEngagement()
    await testCommunityStaking()
    await testCommunityLeaderboard()
    
    setIsTestingAll(false)
  }
  
  // Individual test functions
  const testLogin = async () => {
    return runTest("login", async () => {
      return await apiService.auth.login("test@example.com", "password")
    })
  }
  
  const testRegister = async () => {
    return runTest("register", async () => {
      return await apiService.auth.register({
        name: "Test User",
        email: "new@example.com",
        phone: "+91 98765 43210",
        password: "password",
        aadhaarNumber: "123456789012"
      })
    })
  }
  
  const testFinanceAccounts = async () => {
    return runTest("accounts", async () => {
      return await apiService.finance.getAccounts(userId || "user-123")
    })
  }
  
  const testFinanceTransactions = async () => {
    return runTest("transactions", async () => {
      return await apiService.finance.getTransactions(userId || "user-123")
    })
  }
  
  const testFinanceOpportunities = async () => {
    return runTest("opportunities", async () => {
      return await apiService.finance.getOpportunities(userId || "user-123")
    })
  }
  
  const testSocialCredit = async () => {
    return runTest("social-credit", async () => {
      return await apiService.user.getSocialCredit(userId || "user-123")
    })
  }
  
  const testCivicEngagement = async () => {
    return runTest("engagement", async () => {
      return await apiService.civic.getEngagement(userId || "user-123")
    })
  }
  
  const testCommunityStaking = async () => {
    return runTest("staking", async () => {
      return await apiService.community.getStaking(userId || "user-123")
    })
  }
  
  const testCommunityLeaderboard = async () => {
    return runTest("leaderboard", async () => {
      return await apiService.community.getLeaderboard()
    })
  }
  
  // Helper to display status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="mr-1 h-3 w-3" />
            Success
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="animate-pulse">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            Not Tested
          </Badge>
        )
    }
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">API Endpoint Tester</h1>
        <Button 
          onClick={runAllTests} 
          disabled={isTestingAll}
          className="flex items-center gap-2"
        >
          {isTestingAll ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Testing All Endpoints...
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              Test All Endpoints
            </>
          )}
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
          <CardDescription>Settings for API testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">User ID for Testing</p>
              <p className="text-sm text-muted-foreground">
                {userId || "No user ID found in localStorage. Using default 'test-user-123'."}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">API Base URL</p>
              <p className="text-sm text-muted-foreground">{apiBaseUrl || "Loading..."}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">API Categories</h2>
          <div className="space-y-2">
            {Object.keys(API_ENDPOINTS).map((category) => {
              // Calculate success rate for category
              const endpoints = API_ENDPOINTS[category as keyof typeof API_ENDPOINTS]
              const testedCount = endpoints.filter(
                endpoint => results[endpoint]?.status === "success" || results[endpoint]?.status === "error"
              ).length
              const successCount = endpoints.filter(
                endpoint => results[endpoint]?.status === "success"
              ).length
              
              const progressPercent = testedCount > 0 
                ? Math.round((successCount / testedCount) * 100) 
                : 0
              
              return (
                <Card 
                  key={category}
                  className={`cursor-pointer hover:bg-muted/50 ${activeTab === category ? 'border-primary' : ''}`} 
                  onClick={() => setActiveTab(category)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium capitalize">{category}</p>
                      <Badge variant="outline">
                        {successCount}/{endpoints.length}
                      </Badge>
                    </div>
                    <Progress value={progressPercent} className="h-1" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{activeTab} API Endpoints</CardTitle>
              <CardDescription>
                Test and view results for {activeTab} services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {API_ENDPOINTS[activeTab as keyof typeof API_ENDPOINTS].map((endpoint) => {
                  const result = results[endpoint] || {
                    endpoint,
                    status: "not-tested",
                    responseTime: 0,
                    data: null
                  }
                  
                  // Determine which test function to use
                  let testFunction
                  switch (endpoint) {
                    case "login":
                      testFunction = testLogin
                      break
                    case "register":
                      testFunction = testRegister
                      break
                    case "accounts":
                      testFunction = testFinanceAccounts
                      break
                    case "transactions":
                      testFunction = testFinanceTransactions
                      break
                    case "opportunities":
                      testFunction = testFinanceOpportunities
                      break
                    case "social-credit":
                      testFunction = testSocialCredit
                      break
                    case "engagement":
                      testFunction = testCivicEngagement
                      break
                    case "staking":
                      testFunction = testCommunityStaking
                      break
                    case "leaderboard":
                      testFunction = testCommunityLeaderboard
                      break
                  }
                  
                  return (
                    <div key={endpoint} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{endpoint}</h3>
                          <p className="text-sm text-muted-foreground">
                            Endpoint: /api/{activeTab}/{endpoint}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {result.status === "success" && (
                            <Badge variant="outline" className="bg-muted">
                              {result.responseTime}ms
                            </Badge>
                          )}
                          {getStatusBadge(result.status)}
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          onClick={testFunction}
                          disabled={result.status === "pending" || isTestingAll}
                        >
                          {result.status === "pending" ? (
                            <>
                              <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <PlayCircle className="mr-2 h-3 w-3" />
                              Test Endpoint
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {(result.status === "success" || result.status === "error") && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-1">
                            {result.status === "success" ? "Response" : "Error"}:
                          </p>
                          <ScrollArea className="h-48 rounded-md border p-2">
                            <pre className="text-xs">
                              {result.status === "success" 
                                ? JSON.stringify(result.data, null, 2) 
                                : result.error
                              }
                            </pre>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">MetaMask Integration Test</h2>
        <Card>
          <CardContent className="p-6">
            <MetaMaskIntegration />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetaMaskIntegration() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [networkName, setNetworkName] = useState<string>("")
  const [balance, setBalance] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    
    // Only run after component is mounted to avoid SSR issues
    if (typeof window !== 'undefined') {
      checkMetaMask()
    }
  }, [])
  
  const checkMetaMask = async () => {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined') {
      const { ethereum } = window as any
      
      if (ethereum && ethereum.isMetaMask) {
        setIsMetaMaskInstalled(true)
        
        // Listen for account changes
        ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccountAddress(accounts[0])
            fetchBalance(accounts[0])
          } else {
            setIsConnected(false)
            setAccountAddress(null)
            setBalance(null)
          }
        })
        
        // Listen for chain changes
        ethereum.on('chainChanged', (newChainId: string) => {
          setChainId(newChainId)
          setNetworkName(getNetworkName(newChainId))
        })
        
        // Check if already connected
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setIsConnected(true)
            setAccountAddress(accounts[0])
            
            const chainId = await ethereum.request({ method: 'eth_chainId' })
            setChainId(chainId)
            setNetworkName(getNetworkName(chainId))
            
            fetchBalance(accounts[0])
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error)
        }
      }
    }
  }
  
  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case '0x1':
        return 'Ethereum Mainnet'
      case '0x5':
        return 'Goerli Testnet'
      case '0xaa36a7':
        return 'Sepolia Testnet'
      case '0x89':
        return 'Polygon Mainnet'
      case '0x13881':
        return 'Mumbai Testnet'
      default:
        return `Unknown Network (${chainId})`
    }
  }
  
  const connectMetaMask = async () => {
    try {
      if (typeof window === 'undefined') return
      
      const { ethereum } = window as any
      
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        
        if (accounts.length > 0) {
          setIsConnected(true)
          setAccountAddress(accounts[0])
          
          const chainId = await ethereum.request({ method: 'eth_chainId' })
          setChainId(chainId)
          setNetworkName(getNetworkName(chainId))
          
          fetchBalance(accounts[0])
        }
      } else {
        alert('Please install MetaMask to connect!')
      }
    } catch (error: any) {
      console.error('Error connecting to MetaMask:', error?.message || 'Unknown error')
      
      // Handle common MetaMask errors with user-friendly messages
      if (error?.code === 4001) {
        // User rejected the request
        alert('Connection rejected. Please approve the MetaMask connection request to continue.')
      } else if (error?.code === -32002) {
        // Request already pending
        alert('A connection request is already pending. Please check your MetaMask extension.')
      } else {
        // Generic error
        alert(`Failed to connect to MetaMask: ${error?.message || 'Unknown error'}`)
      }
    }
  }
  
  const fetchBalance = async (address: string) => {
    if (typeof window === 'undefined') return
    
    try {
      const { ethereum } = window as any
      
      if (ethereum) {
        const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
        
        // Convert from wei to eth
        const ethBalance = parseInt(balance, 16) / 1e18
        setBalance(ethBalance.toFixed(4))
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
      setBalance(null)
    }
  }
  
  const formatAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
  
  // If not mounted yet (during SSR), show a loading state
  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">MetaMask Status</h3>
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3 animate-pulse" />
            Loading...
          </Badge>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">MetaMask Status</h3>
        {isMetaMaskInstalled ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="mr-1 h-3 w-3" />
            Installed
          </Badge>
        ) : (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Not Installed
          </Badge>
        )}
      </div>
      
      {isMetaMaskInstalled && (
        <div className="space-y-4">
          {!isConnected ? (
            <Button onClick={connectMetaMask}>Connect MetaMask</Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connection Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                  Connected
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account</span>
                <span className="text-sm font-mono">{formatAddress(accountAddress)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network</span>
                <span className="text-sm">{networkName}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Balance</span>
                <span className="text-sm">{balance} ETH</span>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  MetaMask integration is working correctly. You can now implement blockchain transactions for the CivicChain platform.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {!isMetaMaskInstalled && (
        <div className="rounded-md border p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            MetaMask is not installed. To test Web3 functionality, please install the MetaMask extension in your browser.
          </p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => window.open('https://metamask.io/download.html', '_blank')}
          >
            Install MetaMask
          </Button>
        </div>
      )}
    </div>
  )
}

// Add MetaMask interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
} 