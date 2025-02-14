import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Pricing from '@/mongodb/model/Pricing';

export async function GET(req: Request) {
    try {
      await connectDb();
  
      // Fetch all pricing records from the database
      const pricingRecords = await Pricing.find({});
  
      return NextResponse.json(pricingRecords, { status: 200 });
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await disconnectDb(); // Ensure disconnectDb is called as a function
    }
  }