// lib/fetchProducts.ts

import { getDb } from "./mongodb";

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



export async function fetchProducts(category: string) {
  const db = await getDb();

  const collectionName = categoryToCollectionMap[category];
  if (!collectionName) {
    throw new Error(`❌ No collection mapped for category: ${category}`);
  }

  const collection = db.collection(collectionName);
  const products = await collection.find().toArray();

  return products.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.Name,
    price: doc.Price,
    rating: doc.Rating,
    discount: doc.Discount,
    image: doc.image,
  }));
}
