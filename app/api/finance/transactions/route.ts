import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    
    // Mock transactions data
    const allTransactions = [
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Grocery Store", 
        amount: "-₹1,250.32", 
        amountRaw: -1250.32,
        date: "2023-04-12",
        formattedDate: "12 Apr 2023",
        category: "Essentials",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Salary Credit", 
        amount: "+₹45,000.00", 
        amountRaw: 45000.00,
        date: "2023-04-01",
        formattedDate: "01 Apr 2023",
        category: "Income",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Electricity Bill", 
        amount: "-₹1,875.00", 
        amountRaw: -1875.00,
        date: "2023-03-29",
        formattedDate: "29 Mar 2023",
        category: "Utilities",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Loan Payment", 
        amount: "-₹4,500.00", 
        amountRaw: -4500.00,
        date: "2023-03-25",
        formattedDate: "25 Mar 2023",
        category: "Loans",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Restaurant", 
        amount: "-₹850.75", 
        amountRaw: -850.75,
        date: "2023-03-20",
        formattedDate: "20 Mar 2023",
        category: "Dining",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Mobile Recharge", 
        amount: "-₹499.00", 
        amountRaw: -499.00,
        date: "2023-03-18",
        formattedDate: "18 Mar 2023",
        category: "Utilities",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Movie Tickets", 
        amount: "-₹750.00", 
        amountRaw: -750.00,
        date: "2023-03-15",
        formattedDate: "15 Mar 2023",
        category: "Entertainment",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Medical Checkup", 
        amount: "-₹1,200.00", 
        amountRaw: -1200.00,
        date: "2023-03-10",
        formattedDate: "10 Mar 2023",
        category: "Healthcare",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Internet Bill", 
        amount: "-₹999.00", 
        amountRaw: -999.00,
        date: "2023-03-05",
        formattedDate: "05 Mar 2023",
        category: "Utilities",
        status: "Completed",
        accountId: "acc_123456789"
      },
      { 
        id: "txn_" + Math.random().toString(36).substr(2, 9),
        description: "Previous Month Salary", 
        amount: "+₹45,000.00", 
        amountRaw: 45000.00,
        date: "2023-03-01",
        formattedDate: "01 Mar 2023",
        category: "Income",
        status: "Completed",
        accountId: "acc_123456789"
      }
    ];
    
    // Paginate the transactions
    const paginatedTransactions = allTransactions.slice(offset, offset + limit);
    
    // Summary data
    const totalIncome = allTransactions
      .filter(t => t.amountRaw > 0)
      .reduce((sum, t) => sum + t.amountRaw, 0);
      
    const totalExpense = allTransactions
      .filter(t => t.amountRaw < 0)
      .reduce((sum, t) => sum + Math.abs(t.amountRaw), 0);
    
    return NextResponse.json({
      success: true,
      transactions: paginatedTransactions,
      pagination: {
        total: allTransactions.length,
        limit,
        offset,
        hasMore: offset + limit < allTransactions.length
      },
      summary: {
        totalIncome,
        formattedTotalIncome: `₹${totalIncome.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`,
        totalExpense,
        formattedTotalExpense: `₹${totalExpense.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`,
        netCashflow: totalIncome - totalExpense
      }
    });
    
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching transactions" },
      { status: 500 }
    );
  }
} 