
// app/api/offers/route.ts
import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Offer from '@/mongodb/model/Offer';


export async function GET(req: Request) {
    try {
      await connectDb();
  
      // Fetch all offers from the database
      const offers = await Offer.find({});
  
      return NextResponse.json(offers, { status: 200 });
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await disconnectDb(); // Ensure disconnectDb is called as a function
    }
  }