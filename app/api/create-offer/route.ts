import { NextResponse } from "next/server";
import { connectDb, disconnectDb } from "@/mongodb/config/dbconfig";
import Offer from "@/mongodb/model/Offer";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { vehicle, pricings, defaultPricing } = await req.json();

    // Create a new offer instance
    const newOffer = new Offer({
      vehicle,
      pricings,
      defaultPricing,
    });

    // Save the offer to the database
    const savedOffer = await newOffer.save();

    return NextResponse.json(
      {
        message: "Offer created successfully",
        offer: savedOffer,
      },
      { status: 201 }
    ); // Return 201 Created status
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await disconnectDb(); // Ensure disconnectDb is called as a function
  }
}
