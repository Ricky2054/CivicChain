"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Coins, ArrowUpRight, DollarSign, TrendingUp, PiggyBank, History, Building, BookOpen, Leaf } from "lucide-react"
import apiService from "@/lib/api-service"
import { toast } from "@/components/ui/use-toast"

export default function CommunityStakingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stakingData, setStakingData] = useState<any>(null)
  const [userStakes, setUserStakes] = useState<any[]>([])
  const [stakingHistory, setStakingHistory] = useState<any[]>([])
  const [selectedPool, setSelectedPool] = useState<any>(null)
  const [stakeAmount, setStakeAmount] = useState<number>(0)
  const [actionType, setActionType] = useState<'stake' | 'unstake'>('stake')
  const [submitting, setSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("userData")
    
    if (!userDataStr) {
      // Redirect to home if not logged in
      router.push("/")
      return
    }
    
    try {
      const userData = JSON.parse(userDataStr)
      fetchStakingData(userData.id)
    } catch (error) {
      console.error("Error parsing user data:", error)
      toast({
        title: "Error",
        description: "Could not load your profile data",
        variant: "destructive"
      })
    }
  }, [router])
  
  const fetchStakingData = async (userId: string) => {
    try {
      setLoading(true)
      
      // Fetch staking data
      const response = await apiService.community.getStaking(userId)
      if (response) {
        setStakingData(response)
        if (response.userStakes) {
          setUserStakes(response.userStakes)
        }
        if (response.history) {
          setStakingHistory(response.history)
        }
      }
    } catch (error) {
      console.error("Error fetching staking data:", error)
      toast({
        title: "Error",
        description: "Could not load your staking data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  const openStakeDialog = (pool: any, type: 'stake' | 'unstake') => {
    setSelectedPool(pool)
    setActionType(type)
    setStakeAmount(0)
    setDialogOpen(true)
  }
  
  const handleStakeSubmit = async () => {
    if (!selectedPool || !stakeAmount || stakeAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive"
      })
      return
    }
    
    const userDataStr = localStorage.getItem("userData")
    if (!userDataStr) {
      toast({
        title: "Error",
        description: "You must be logged in to stake tokens",
        variant: "destructive"
      })
      return
    }
    
    try {
      setSubmitting(true)
      const userData = JSON.parse(userDataStr)
      
      // Call the API to stake
      const response = await fetch('/api/community/staking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData.id,
          poolId: selectedPool.id,
          amount: stakeAmount,
          action: actionType
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update local state
        if (actionType === 'stake') {
          // Add to user stakes or update existing stake
          const existingStakeIndex = userStakes.findIndex(stake => stake.poolId === selectedPool.id)
          
          if (existingStakeIndex >= 0) {
            // Update existing stake
            const updatedStakes = [...userStakes]
            const currentAmount = parseInt(updatedStakes[existingStakeIndex].amount.split(' ')[0])
            const newAmount = currentAmount + stakeAmount
            
            updatedStakes[existingStakeIndex] = {
              ...updatedStakes[existingStakeIndex],
              amount: `${newAmount} CVC`,
              yield: (parseFloat(updatedStakes[existingStakeIndex].yield) + parseFloat(data.newStake.yield)).toFixed(1) + ' CVC'
            }
            
            setUserStakes(updatedStakes)
          } else {
            // Add new stake
            setUserStakes([...userStakes, data.newStake])
          }
        } else {
          // Handle unstake - reduce amount or remove from stakes
          const existingStakeIndex = userStakes.findIndex(stake => stake.poolId === selectedPool.id)
          
          if (existingStakeIndex >= 0) {
            const updatedStakes = [...userStakes]
            const currentAmount = parseInt(updatedStakes[existingStakeIndex].amount.split(' ')[0])
            const newAmount = currentAmount - stakeAmount
            
            if (newAmount <= 0) {
              // Remove stake entirely
              updatedStakes.splice(existingStakeIndex, 1)
            } else {
              // Update with reduced amount
              updatedStakes[existingStakeIndex] = {
                ...updatedStakes[existingStakeIndex],
                amount: `${newAmount} CVC`,
                yield: (parseFloat(updatedStakes[existingStakeIndex].yield) - parseFloat(data.newStake.yield)).toFixed(1) + ' CVC'
              }
            }
            
            setUserStakes(updatedStakes)
          }
        }
        
        // Add transaction to history
        setStakingHistory([data.transaction, ...stakingHistory])
        
        // Update balance
        if (stakingData) {
          setStakingData({
            ...stakingData,
            userBalance: data.userBalance
          })
        }
        
        // Close dialog and show success message
        setDialogOpen(false)
        toast({
          title: actionType === 'stake' ? "Stake Successful" : "Unstake Successful",
          description: data.message,
        })
      } else {
        toast({
          title: "Transaction Failed",
          description: data.error || "Could not process your request",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Staking error:", error)
      toast({
        title: "Error",
        description: "An error occurred while processing your transaction",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  const getPoolIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'infrastructure':
        return <Building className="h-5 w-5" />
      case 'education':
        return <BookOpen className="h-5 w-5" />
      case 'environment':
        return <Leaf className="h-5 w-5" />
      default:
        return <Coins className="h-5 w-5" />
    }
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Show loading state
  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Community Staking"
          text="Stake your tokens and contribute to community initiatives"
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading your staking data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community Staking"
        text="Stake your tokens and contribute to community initiatives"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData?.totalStaked}</div>
            <p className="text-xs text-muted-foreground">{stakingData?.totalStakedUSD}</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>{stakingData?.growthRate}</span>
              <span className="text-xs text-muted-foreground ml-1">weekly growth</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Yield</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData?.estAnnualYield}</div>
            <p className="text-xs text-muted-foreground">Annual percentage yield</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                Compounding
              </Badge>
              <Badge variant="outline" className="text-xs">
                No Lock Period
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Fund</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData?.communityFund}</div>
            <p className="text-xs text-muted-foreground">Total community pool</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              <div className="h-2 rounded-full bg-green-500" />
              <div className="h-2 rounded-full bg-blue-500" />
              <div className="h-2 rounded-full bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData?.userBalance}</div>
            <p className="text-xs text-muted-foreground">Available for staking</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="pools" className="mt-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="pools">Staking Pools</TabsTrigger>
          <TabsTrigger value="my-stakes">My Stakes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pools" className="mt-4 space-y-4">
          {stakingData?.pools.map((pool: any) => (
            <Card key={pool.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {getPoolIcon(pool.category)}
                      </div>
                      <CardTitle>{pool.name}</CardTitle>
                    </div>
                    <CardDescription>{pool.description}</CardDescription>
                  </div>
                  <Badge className="px-2.5 py-0.5">APY: {pool.apy}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                    <p className="font-medium">{pool.totalStaked}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-medium">{pool.participants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="outline" className="mt-1">{pool.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Stake</p>
                    <p className="font-medium">
                      {userStakes.find(stake => stake.poolId === pool.id)?.amount || "0 CVC"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end border-t pt-4">
                {userStakes.find(stake => stake.poolId === pool.id) && (
                  <Button 
                    variant="outline" 
                    onClick={() => openStakeDialog(pool, 'unstake')}
                  >
                    Unstake
                  </Button>
                )}
                <Button onClick={() => openStakeDialog(pool, 'stake')}>
                  Stake CVC
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="my-stakes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Stakes</CardTitle>
              <CardDescription>
                Overview of your active stakes across all community pools
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userStakes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="bg-muted p-3 rounded-full">
                    <Coins className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Active Stakes</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    You don't have any active stakes at the moment.
                    Stake your CVC tokens to earn rewards and support community initiatives.
                  </p>
                  <Button className="mt-4" onClick={() => document.querySelector('[data-value="pools"]')?.click()}>
                    View Staking Pools
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  {userStakes.map((stake, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{stake.poolName}</h3>
                          <p className="text-sm text-muted-foreground">Staked for {stake.daysStaked} days</p>
                        </div>
                        <Badge>APY: {stake.yieldRate}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Amount Staked</p>
                          <p className="font-medium">{stake.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Yield</p>
                          <p className="font-medium text-green-600">{stake.yield}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Portfolio %</p>
                          <p className="font-medium">{stake.percentage}%</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const pool = stakingData?.pools.find((p: any) => p.id === stake.poolId)
                            openStakeDialog(pool, 'unstake')
                          }}
                        >
                          Unstake
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            const pool = stakingData?.pools.find((p: any) => p.id === stake.poolId)
                            openStakeDialog(pool, 'stake')
                          }}
                        >
                          Add More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Record of your staking activities and rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stakingHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="bg-muted p-3 rounded-full">
                    <History className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Transaction History</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    You don't have any staking transactions yet.
                    Start staking to see your transaction history here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stakingHistory.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'stake' ? 'bg-blue-100 dark:bg-blue-900' : 
                          transaction.type === 'reward' ? 'bg-green-100 dark:bg-green-900' : 
                          'bg-yellow-100 dark:bg-yellow-900'
                        }`}>
                          {transaction.type === 'stake' ? 
                            <Coins className="h-4 w-4 text-blue-700 dark:text-blue-300" /> : 
                            transaction.type === 'reward' ? 
                            <DollarSign className="h-4 w-4 text-green-700 dark:text-green-300" /> : 
                            <ArrowUpRight className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === 'stake' ? 'Stake' : 
                             transaction.type === 'reward' ? 'Reward' : 'Unstake'}
                          </p>
                          <p className="text-sm text-muted-foreground">{transaction.pool}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === 'reward' ? 'text-green-600' : ''}`}>
                          {transaction.type === 'unstake' ? '-' : '+'}{transaction.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Staking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'stake' ? 'Stake CVC Tokens' : 'Unstake CVC Tokens'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'stake' 
                ? `Stake your CVC tokens in the ${selectedPool?.name} pool to earn rewards` 
                : `Unstake your CVC tokens from the ${selectedPool?.name} pool`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Pool</span>
              <span className="text-sm">{selectedPool?.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm font-medium">APY</span>
              <span className="text-sm">{selectedPool?.apy}</span>
            </div>
            
            {actionType === 'unstake' && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Stake</span>
                <span className="text-sm">
                  {userStakes.find(stake => stake.poolId === selectedPool?.id)?.amount || "0 CVC"}
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="amount">
                {actionType === 'stake' ? 'Amount to Stake' : 'Amount to Unstake'}
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
                <Button variant="outline" onClick={() => {
                  if (actionType === 'stake') {
                    const availableBalance = parseInt(stakingData?.userBalance.split(' ')[0] || '0')
                    setStakeAmount(availableBalance)
                  } else {
                    const currentStake = userStakes.find(stake => stake.poolId === selectedPool?.id)
                    if (currentStake) {
                      setStakeAmount(parseInt(currentStake.amount.split(' ')[0]))
                    }
                  }
                }}>
                  Max
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {actionType === 'stake' 
                  ? `Available balance: ${stakingData?.userBalance}` 
                  : `Max unstake: ${userStakes.find(stake => stake.poolId === selectedPool?.id)?.amount || "0 CVC"}`}
              </p>
            </div>
            
            {actionType === 'stake' && stakeAmount > 0 && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Estimated Annual Yield</p>
                <p className="text-lg font-bold text-green-600">
                  {(stakeAmount * (parseFloat(selectedPool?.apy) / 100)).toFixed(2)} CVC
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStakeSubmit} disabled={submitting || stakeAmount <= 0}>
              {submitting ? (
                <>
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-background rounded-full" />
                  Processing...
                </>
              ) : (
                actionType === 'stake' ? 'Stake Tokens' : 'Unstake Tokens'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
} 