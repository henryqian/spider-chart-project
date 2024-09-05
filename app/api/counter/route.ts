// app/api/counter/route.ts
import { incrementPageViews, getPageViews } from '../../../utils/db'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const count = await getPageViews();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching page views' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const count = await incrementPageViews();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Error increasing page views' }, { status: 500 });
  }
}
