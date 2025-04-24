import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from "../../../lib/auth";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface CartItem {
  id: string;
  quantity: number;
  [key: string]: any;
}

interface CartDocument {
  _id?: ObjectId;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

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
    
    const cart = await db.collection("carts").findOne(
      { userId: session.user.id }
    );

    return NextResponse.json(cart?.items || []);

  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
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

    const { product, action } = await request.json();
    const client = await clientPromise;
    const db = client.db("VOLT_DB");
    
    let cart = await db.collection("carts").findOne(
      { userId: session.user.id }
    );

    if (!cart) {
      const newCart: CartDocument = {
        userId: session.user.id,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("carts").insertOne(newCart);
      cart = await db.collection("carts").findOne({ userId: session.user.id });
    }

    if (!cart) {
      return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
    }

    if (action === "add") {
      const existingItem = cart.items.find((item: any) => item.id === product.id);
      if (existingItem) {
        await db.collection("carts").updateOne(
          { userId: session.user.id, "items.id": product.id },
          { $inc: { "items.$.quantity": 1 } }
        );
      } else {
        await db.collection("carts").updateOne(
          { userId: session.user.id },
          { $push: { items: { ...product, quantity: 1 } } }
        );
      }
    } else if (action === "remove") {
      await db.collection("carts").updateOne(
        { userId: session.user.id },
        { $pull: { items: { id: product.id } } } as any
      );
    } else if (action === "update") {
      await db.collection("carts").updateOne(
        { userId: session.user.id, "items.id": product.id },
        { $set: { "items.$.quantity": product.quantity } }
      );
    } else if (action === "clear") {
      await db.collection("carts").updateOne(
        { userId: session.user.id },
        { $set: { items: [] } }
      );
    }

    const updatedCart = await db.collection("carts").findOne(
      { userId: session.user.id }
    );

    return NextResponse.json(updatedCart?.items || []);

  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
} 