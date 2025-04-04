import { NextResponse } from 'next/server';

// GET handler to retrieve user profile
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
    
    // In a real application, you would fetch user data from a database using the userId
    // For demo purposes, we'll just return mock user data
    const userData = {
      id: userId,
      name: "Sample User",
      email: "user@example.com",
      phone: "+919876543210",
      aadhaarVerified: true,
      location: "Mumbai, Maharashtra",
      profileComplete: true,
      socialCredit: 780,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      userData
    });
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching user profile" },
      { status: 500 }
    );
  }
}

// PUT handler to update user profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...updateData } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    
    // In a real application, you would update user data in a database
    // For demo purposes, we'll just return the updated data
    
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      userData: {
        id: userId,
        ...updateData,
        updatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating user profile" },
      { status: 500 }
    );
  }
} 