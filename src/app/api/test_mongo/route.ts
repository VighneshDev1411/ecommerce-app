// app/api/test/route.ts
import { getDb } from '../../../lib/mongodb';

export async function GET() {
  const db = await getDb();
  await db.collection('VOLT_DB').insertOne({ timestamp: new Date() });
  return Response.json({ 
    dbName: db.databaseName,
    collections: await db.listCollections().toArray()
  });
}