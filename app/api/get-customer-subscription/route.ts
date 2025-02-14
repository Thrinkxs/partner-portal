// app/api/subscriptions-by-referral/route.ts
import { NextResponse } from 'next/server';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';
import Subscription from '@/mongodb/model/Subscriptions';
import User from '@/mongodb/model/Users';

export async function GET(req: Request) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const referralPartner = searchParams.get('referralPartner');

    if (!referralPartner) {
      return NextResponse.json({ error: 'referralPartner is required' }, { status: 400 });
    }

    const users = await User.find({ referralPartner });

    if (users.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const userIds = users.map(user => user._id);

    const subscriptions = await Subscription.find({ user: { $in: userIds } }).populate('user');

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await disconnectDb();
  }
}