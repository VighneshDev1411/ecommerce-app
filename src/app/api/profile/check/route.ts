// app/api/profiles/check/route.ts
import { getDb } from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const profile = await db
      .collection('users_profile')
      .findOne({ userId });

    return NextResponse.json(
      { hasProfile: !!profile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}