import { NextResponse } from "next/server";
import { connectDb, disconnectDb } from "@/mongodb/config/dbconfig";
import Partner from "@/mongodb/model/Partner";


export async function GET(req: Request) {
    try {
      await connectDb();

      const partners = await Partner.find({});
  
      return NextResponse.json(partners, { status: 200 });
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await disconnectDb();
    }
  }