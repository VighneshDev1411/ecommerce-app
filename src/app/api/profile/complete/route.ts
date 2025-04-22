// app/api/profile/complete/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../lib/auth";
// import { AuthOptions } from "next-auth";

import clientPromise from "../../../../lib/mongodb";

// app/api/profile/complete/route.ts
export async function POST(request: Request) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
  
      const client = await clientPromise;
      const db = client.db("VOLT_DB");
      
      // Validate input
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
      }
  
      const profileData = await request.json();
  
      // Update profile
      const result = await db.collection("users_profile").updateOne(
        { userId: session.user.id },
        { 
          $set: { 
            ...profileData,
            profileComplete: true,
            updatedAt: new Date() 
          } 
        },
        { upsert: true }
      );
  
      return NextResponse.json(
        { success: true, updated: result.modifiedCount },
        { status: 200, 
          headers: { 'Content-Type': 'application/json' } }
      );
  
    } catch (error) {
      console.error("Profile completion error:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500,
          headers: { 'Content-Type': 'application/json' } }
      );
    }
  }