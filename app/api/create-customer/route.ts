import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import User from '@/mongodb/model/Users';
export async function POST(req: Request) {
  try {
    await connectDb()
    let { firstName, lastName, email, phoneNumber, referralPartner } = await req.json();

    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        referralPartner,
      });
  
      const savedUser = await newUser.save();

      return NextResponse.json({
        message: 'User created successfully',
        user: savedUser,
      }, { status: 201 });
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  finally{
    await disconnectDb
  }
}
