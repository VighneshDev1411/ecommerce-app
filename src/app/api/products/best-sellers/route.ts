// app/api/products/best-sellers/route.ts
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("VOLT_DB");
    const products = await db
      .collection("products")
      .find({ category: "best_sellers" })
      .toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
