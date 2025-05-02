import { getServerSession } from "next-auth"; // Import for authentication
import { NextResponse } from "next/server"; // Next.js API response helper
import { authOptions } from "../../../lib/auth"; // Auth configuration
import clientPromise from "../../../lib/mongodb"; // MongoDB client
import { ObjectId } from "mongodb"; // MongoDB ObjectId type

// GET endpoint to fetch user's wishlist
export async function GET(request: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("VOLT_DB");
    
    // Find user's wishlist
    const wishlist = await db.collection("wishlists").findOne(
      { userId: session.user.id }
    );

    // Return wishlist items or empty array if no wishlist found
    return NextResponse.json(wishlist?.items || []);

  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

// POST endpoint to modify wishlist (add, remove, clear items)
export async function POST(request: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const { product, action } = await request.json();
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("VOLT_DB");
    
    // Find user's wishlist
    let wishlist = await db.collection("wishlists").findOne(
      { userId: session.user.id }
    );

    // Create new wishlist if it doesn't exist
    if (!wishlist) {
      const newWishlist = {
        userId: session.user.id,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("wishlists").insertOne(newWishlist);
      wishlist = await db.collection("wishlists").findOne({ userId: session.user.id });
    }

    // Handle different actions
    if (action === "add") {
      // Check if item already exists
      const existingItem = wishlist?.items?.find((item: any) => item.id === product.id);
      if (!existingItem) {
        // Add new item
        await db.collection("wishlists").updateOne(
          { userId: session.user.id },
          { $push: { items: product } }
        );
      }
    } else if (action === "remove") {
      // Remove item
      await db.collection("wishlists").updateOne(
        { userId: session.user.id },
        { $pull: { items: { id: product.id } } } as any
      );
    } else if (action === "clear") {
      // Clear all items
      await db.collection("wishlists").updateOne(
        { userId: session.user.id },
        { $set: { items: [] } }
      );
    }

    // Get updated wishlist
    const updatedWishlist = await db.collection("wishlists").findOne(
      { userId: session.user.id }
    );

    // Return updated items
    return NextResponse.json(updatedWishlist?.items || []);

  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json(
      { error: "Failed to update wishlist" },
      { status: 500 }
    );
  }
} 