import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Vehicle from '@/mongodb/model/Vehicle';

// Fetch all vehicles
export async function GET(req: Request) {
  try {
    await connectDb();

    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find({});

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await disconnectDb(); // Ensure disconnectDb is called as a function
  }
}
