import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Subscription from '@/mongodb/model/Subscriptions';


export async function GET(req: Request) {
try {
    await connectDb();
    const subscriptions = await Subscription.find({});

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await disconnectDb(); 
  }
}