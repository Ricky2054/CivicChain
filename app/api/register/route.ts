import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, aadhaarNumber } = body;
    
    // Validate required fields
    if (!name || !email || !password || !phone || !aadhaarNumber) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate Aadhaar number format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return NextResponse.json(
        { success: false, message: "Invalid Aadhaar number format" },
        { status: 400 }
      );
    }
    
    // In a real application, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user data in a database
    // 4. Generate authentication tokens
    
    // For demo purposes, we'll just return a success response with mock user data
    const userData = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      aadhaarVerified: true,
      role: "user",
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      userData
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 