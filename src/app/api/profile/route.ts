import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../../auth.config"; // Adjust path if needed
import clientPromise from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      gender,
      weight,
      weightGoal,
      allergen,
      dietaryPreference,
      height,
      fitnessGoal,
    } = await req.json();

    const client = await clientPromise;
    const db = client.db("VOLT_DB");

    // Insert profile data
    await db.collection("users_profile").insertOne({
      email: session.user.email,
      gender,
      weight,
      weightGoal,
      allergen,
      dietaryPreference,
      height,
      fitnessGoal,
      createdAt: new Date(),
    });

    // ✅ Update 'users' collection to mark profile as completed
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          hasProfile: true,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Profile saved successfully" });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ message: "Failed to save profile" }, { status: 500 });
  }
}
