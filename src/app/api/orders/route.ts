import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import clientPromise from "../../../lib/mongodb";

export async function GET(request: Request) {
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
    
    const orders = await db.collection("orders")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB ObjectId to string for the frontend
    const formattedOrders = orders.map(order => ({
      ...order,
      id: order._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { items, total, paymentMethod } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items in order" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("VOLT_DB");

    const order = {
      userId: session.user.id,
      items,
      total,
      status: "pending",
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    // Clear the user's cart after successful order
    await db.collection("carts").updateOne(
      { userId: session.user.id },
      { $set: { items: [] } }
    );

    return NextResponse.json({ 
      ...order,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
} 