import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("VOLT_DB");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isNewUser: true // Flag to identify first-time users
    });

    // Create empty profile in users_profile collection
    await db.collection("users_profile").insertOne({
      userId: result.insertedId.toString(), // Using the user's _id as reference
      email, // Store email in profile as well
      name, // Store name in profile as well
      profileComplete: false, // Flag to track if profile is complete
      createdAt: new Date(),
      updatedAt: new Date(),
      // Other profile fields can be initialized as empty/null
      gender: "",
      weight: "",
      weightGoal: "",
      allergen: "",
      dietaryPreference: "",
      height: "",
      fitnessGoal: "",
    });

    return NextResponse.json(
      { 
        message: "User created successfully",
        userId: result.insertedId.toString(),
        isNewUser: true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering user" },
      { status: 500 }
    );
  }
}