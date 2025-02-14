import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import User from '@/mongodb/model/Users';

export async function GET(req: Request) {
    try {
        await connectDb();
        const users = await User.find({});
    
        return NextResponse.json(users, { status: 200 });
      } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      } finally {
        await disconnectDb();
      }
    }