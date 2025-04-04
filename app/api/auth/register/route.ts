import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { name, email, phone, password, aadhaarNumber } = body;
    
    // Basic validation
    if (!name || !email || !phone || !password || !aadhaarNumber) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Check if aadhaar is already registered
    const existingAadhaar = await User.findOne({ aadhaarNumber });
    if (existingAadhaar) {
      return NextResponse.json(
        { success: false, message: 'This Aadhaar number is already registered' },
        { status: 409 }
      );
    }
    
    // In a real app, we would hash the password here
    // For simplicity, we're skipping that step
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password, // In production, use: await bcrypt.hash(password, 10)
      aadhaarNumber,
      socialCredit: {
        score: 100,
        lastUpdated: new Date().toISOString(),
        categories: {
          civic: 50,
          finance: 50,
          environment: 50,
          education: 50,
          health: 50,
          community: 50
        }
      }
    });
    
    // Create user data for response
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      socialCredit: newUser.socialCredit
    };
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully', 
        user: userData 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 