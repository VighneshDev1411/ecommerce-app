import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient; // Uncommented and properly typed
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Helper function to get database instance
const DB_NAME = "VOLT_DB"
export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME); // Explicit database name
}

export default clientPromise;