import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("VOLT_DB");


    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);

 
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isNewUser: true
    });


    await db.collection("users_profile").insertOne({
      userId: result.insertedId.toString(), 
      email,
      name, 
      profileComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
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