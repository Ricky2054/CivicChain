import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import FinancialAccount from '@/models/FinancialAccount';

// GET - Fetch user transactions
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get parameters from query
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const accountId = searchParams.get('accountId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Build query
    const query: any = { userId };
    
    // Filter by account if provided
    if (accountId) {
      query.accountId = accountId;
    }
    
    // Fetch transactions with pagination
    const transactions = await Transaction.find(query)
      .sort({ transactionDate: -1 })
      .skip(offset)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Transaction.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      transactions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + transactions.length < total
      }
    });
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new transaction
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { 
      userId, 
      accountId, 
      type, 
      amount, 
      description, 
      category, 
      merchant, 
      location 
    } = body;
    
    // Validate required fields
    if (!userId || !accountId || !type || !amount || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if account exists
    const account = await FinancialAccount.findById(accountId);
    if (!account) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }
    
    // Check if account belongs to user
    if (account.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'Account does not belong to this user' },
        { status: 403 }
      );
    }
    
    // Create new transaction
    const newTransaction = await Transaction.create({
      userId,
      accountId,
      type,
      amount,
      currency: body.currency || account.currency || 'INR',
      description,
      category: category || 'Other',
      merchant: merchant || null,
      location: location || null,
      status: body.status || 'completed',
      transactionDate: body.transactionDate || new Date().toISOString()
    });
    
    // Update account balance
    const balanceChange = type === 'credit' ? amount : -amount;
    await FinancialAccount.findByIdAndUpdate(
      accountId,
      { 
        balance: account.balance + balanceChange
      }
    );
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Transaction created successfully', 
        transaction: newTransaction 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update transaction status
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { transactionId, status } = body;
    
    if (!transactionId || !status) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status
    const validStatuses = ['pending', 'completed', 'failed', 'reversed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status },
      { new: true }
    );
    
    if (!updatedTransaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Transaction updated successfully',
      transaction: updatedTransaction
    });
    
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Reverse transaction by updating status
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID is required' },
        { status: 400 }
      );
    }
    
    // Soft delete by marking as reversed
    const deletedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status: 'reversed' },
      { new: true }
    );
    
    if (!deletedTransaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Transaction reversed successfully'
    });
    
  } catch (error) {
    console.error('Error reversing transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 