import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    const client = await clientPromise;
    const db = client.db("VOLT_DB");

    // Get the item from wishlist
    const wishlist = await db.collection("wishlists").findOne(
      { userId: session.user.id }
    );

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 }
      );
    }

    const item = wishlist.items.find((item: any) => item.id === productId);

    if (!item) {
      return NextResponse.json(
        { error: "Item not found in wishlist" },
        { status: 404 }
      );
    }

    // Add item to cart
    const cart = await db.collection("carts").findOne(
      { userId: session.user.id }
    );

    if (!cart) {
      const newCart = {
        userId: session.user.id,
        items: [{ ...item, quantity: 1 }],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("carts").insertOne(newCart);
    } else {
      const existingItem = cart.items.find((item: any) => item.id === productId);
      if (existingItem) {
        await db.collection("carts").updateOne(
          { userId: session.user.id, "items.id": productId },
          { $inc: { "items.$.quantity": 1 } }
        );
      } else {
        await db.collection("carts").updateOne(
          { userId: session.user.id },
          { $push: { items: { ...item, quantity: 1 } } }
        );
      }
    }

    // Remove item from wishlist
    await db.collection("wishlists").updateOne(
      { userId: session.user.id },
      { $pull: { items: { id: productId } } } as any
    );

    // Get updated wishlist
    const updatedWishlist = await db.collection("wishlists").findOne(
      { userId: session.user.id }
    );

    return NextResponse.json(updatedWishlist?.items || []);
  } catch (error) {
    console.error("Error moving item to cart:", error);
    return NextResponse.json(
      { error: "Failed to move item to cart" },
      { status: 500 }
    );
  }
} 