import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";

const categoryToCollectionMap: Record<string, string> = {
  "protein-supplements": "whey_protein",
  "vitamins-minerals": "vitamins",
  "pre-workout-energy": "preworkout",
  "weight-management": "weight",
  "amino-acids-bcaas": "amino_acids",
  "sleep-recovery": "sleep",
  "womens-health": "women_health",
  "wellness-immunity": "immunity",
};

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const db = await getDb();
  const collectionName = categoryToCollectionMap[params.category];
  
  if (!collectionName) {
    return NextResponse.json({ error: `❌ No collection mapped for category: ${params.category}` }, { status: 404 });
  }

  const collection = db.collection(collectionName);
  const products = await collection.find().toArray();

  return NextResponse.json(products.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.Name,
    price: doc.Price,
    rating: doc.Rating,
    discount: doc.Discount,
    image: doc.image,
  })));
}