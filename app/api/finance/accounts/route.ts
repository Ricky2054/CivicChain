import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    
    // In a real application, you would fetch accounts from a database
    // For demo purposes, we'll return mock account data
    const accounts = [
      { 
        id: "acc_" + Math.random().toString(36).substr(2, 9),
        name: "Primary Savings", 
        balance: "₹8,259.54", 
        balanceRaw: 8259.54,
        accountNumber: "XXXX4271", 
        type: "Savings",
        institution: "State Bank of India",
        userId
      },
      { 
        id: "acc_" + Math.random().toString(36).substr(2, 9),
        name: "Fixed Deposit", 
        balance: "₹12,500.00", 
        balanceRaw: 12500.00,
        accountNumber: "XXXX7824", 
        type: "Deposit",
        institution: "HDFC Bank",
        userId
      },
      { 
        id: "acc_" + Math.random().toString(36).substr(2, 9),
        name: "Personal Loan", 
        balance: "₹32,500.00 (due)", 
        balanceRaw: -32500.00,
        accountNumber: "XXXX3956", 
        type: "Loan",
        institution: "SBI Bank",
        userId,
        dueDate: "2023-05-15"
      },
    ];
    
    // Calculate total balance
    const totalBalance = accounts.reduce((sum, account) => {
      return sum + (account.balanceRaw || 0);
    }, 0);
    
    return NextResponse.json({
      success: true,
      accounts,
      summary: {
        totalBalance,
        formattedTotalBalance: `₹${Math.abs(totalBalance).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`,
        netWorth: totalBalance > 0 ? totalBalance : 0,
        totalDebt: totalBalance < 0 ? Math.abs(totalBalance) : 0,
        accountCount: accounts.length
      }
    });
    
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching accounts" },
      { status: 500 }
    );
  }
} 