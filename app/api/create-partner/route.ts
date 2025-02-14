import { NextResponse } from "next/server";
import { connectDb, disconnectDb } from "@/mongodb/config/dbconfig";
import Partner from "@/mongodb/model/Partner";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { name } = await req.json();

    const newPartner = new Partner({
      name,
    });

    const savedPartner = await newPartner.save();
    return NextResponse.json(
      {
        message: "Partner created successfully",
        partner: savedPartner,
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
