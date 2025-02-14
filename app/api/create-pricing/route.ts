import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Pricing from '@/mongodb/model/Pricing';

export async function POST(req: Request) {
    try {
      await connectDb();
      const { vehicle,
        name,
        description,
        monthlyRate } = await req.json();
  
      // Create a new pricing instance
      const newPricing = new Pricing({
        vehicle,
        name,
        description,
        monthlyRate
      });
  
      // Save the pricing record to the database
      const savedPricing = await newPricing.save();
  
      return NextResponse.json({
        message: 'Pricing record created successfully',
        pricing: savedPricing,
      }, { status: 201 }); // Return 201 Created status
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await disconnectDb(); // Ensure disconnectDb is called as a function
    }
  }