import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Mock authentication - in a real app, you would validate against a database
    if (email && password) {
      // Mock user data
      const userData = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        avatar: null,
        role: "user",
        createdAt: new Date().toISOString()
      };
      
      return NextResponse.json({ 
        success: true, 
        message: "Authentication successful",
        userData
      });
    }
    
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
    
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication" },
      { status: 500 }
    );
  }
} 