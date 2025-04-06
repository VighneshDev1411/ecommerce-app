import { getServerSession } from "next-auth";
import { authConfig } from "../../../../auth.config";
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ 
      email: session.user.email 
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return only necessary user data (exclude sensitive fields)
    const { password, ...userData } = user;
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}