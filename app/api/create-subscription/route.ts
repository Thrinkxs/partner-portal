import { NextResponse } from "next/server";
import { connectDb, disconnectDb } from "@/mongodb/config/dbconfig";
import Subscription from "@/mongodb/model/Subscriptions";

export async function POST(req: Request) {
  try {
    await connectDb();
    const {
      user,
      offer,
      status,
      duration,
      location,
      selectedPricingObject,
      startDate,
      endDate,
    } = await req.json();

    const newSubscription = new Subscription({
      user,
      offer,
      status,
      duration,
      location,
      selectedPricingObject,
      startDate,
      endDate,
    });

    const savedSubscription = await newSubscription.save();

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription: savedSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await disconnectDb();
  }
}
