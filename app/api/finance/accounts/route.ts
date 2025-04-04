import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FinancialAccount from '@/models/FinancialAccount';
import mongoose from 'mongoose';

// GET - Fetch user accounts
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch accounts for user
    const accounts = await FinancialAccount.find({ userId, isActive: true });
    
    return NextResponse.json({
      success: true,
      accounts
    });
    
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new account
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { 
      userId, 
      name, 
      type, 
      accountNumber, 
      balance, 
      currency, 
      institution 
    } = body;
    
    // Validate required fields
    if (!userId || !name || !type || !accountNumber || !institution) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if account with this number already exists
    const existingAccount = await FinancialAccount.findOne({ accountNumber });
    if (existingAccount) {
      return NextResponse.json(
        { success: false, message: 'Account with this number already exists' },
        { status: 409 }
      );
    }
    
    // Create new account
    const newAccount = await FinancialAccount.create({
      userId,
      name,
      type,
      accountNumber,
      balance: balance || 0,
      currency: currency || 'INR',
      institution,
      isActive: true,
      isVerified: false
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Account created successfully', 
        account: newAccount 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update account
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { accountId, ...updateData } = body;
    
    if (!accountId) {
      return NextResponse.json(
        { success: false, message: 'Account ID is required' },
        { status: 400 }
      );
    }
    
    // Remove fields that shouldn't be updated directly
    delete updateData.userId;
    delete updateData.accountNumber;
    
    // Update the account
    const updatedAccount = await FinancialAccount.findByIdAndUpdate(
      accountId,
      updateData,
      { new: true }
    );
    
    if (!updatedAccount) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Account updated successfully',
      account: updatedAccount
    });
    
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Deactivate an account
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get('accountId');
    
    if (!accountId) {
      return NextResponse.json(
        { success: false, message: 'Account ID is required' },
        { status: 400 }
      );
    }
    
    // Instead of deleting, mark as inactive
    const deactivatedAccount = await FinancialAccount.findByIdAndUpdate(
      accountId,
      { isActive: false },
      { new: true }
    );
    
    if (!deactivatedAccount) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Account deactivated successfully'
    });
    
  } catch (error) {
    console.error('Error deactivating account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 