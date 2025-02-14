// app/api/get-customer-by-id/route.ts
import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import User from '@/mongodb/model/Users';

export async function GET(req: Request) {
  try {
    await connectDb();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id'); 

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch a specific user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await disconnectDb(); 
  }
}