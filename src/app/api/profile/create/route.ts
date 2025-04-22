// app/api/profiles/create/route.ts
import { getDb } from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, ...profileData } = await request.json();
    const db = await getDb();
    
    // Check if profile already exists
    const existingProfile = await db
      .collection('users_profile')
      .findOne({ userId });
    
    if (existingProfile) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 400 }
      );
    }

    // Insert new profile
    const result = await db
      .collection('users_profile')
      .insertOne({
        userId,
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}