import { NextResponse } from "next/server";
import { connectDb, disconnectDb } from "@/mongodb/config/dbconfig";
import Vehicle from "@/mongodb/model/Vehicle";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { vehicleMake, vehicleModel, coverImage, images } = await req.json();

    const newVehicle = new Vehicle({
      vehicleMake,
      vehicleModel,
      coverImage,
      images,
    });

    const savedVehicle = await newVehicle.save();

    return NextResponse.json(
      {
        message: "Vehicle created successfully",
        vehicle: savedVehicle,
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
