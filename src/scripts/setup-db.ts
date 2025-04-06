import clientPromise from "../lib/mongodb";

async function setupDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("accounts").createIndex(
      { provider: 1, providerAccountId: 1 },
      { unique: true }
    );
    await db.collection("sessions").createIndex(
      { sessionToken: 1 },
      { unique: true }
    );

    console.log("Database indexes created successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    process.exit(0);
  }
}

setupDatabase();