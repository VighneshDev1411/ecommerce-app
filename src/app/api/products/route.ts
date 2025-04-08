// app/api/products/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    await client.connect();
    const db = client.db("VOLT_DB");
    const productsCollection = db.collection("products");

    const products = await productsCollection
      .find({ category: category || "best_sellers" })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
