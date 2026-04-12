import { NextResponse } from 'next/server';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/4gMfZj6DO4zVa0u9pnbsc04';

export async function POST() {
  return NextResponse.json({ url: STRIPE_PAYMENT_LINK });
}

export async function GET() {
  return NextResponse.redirect(STRIPE_PAYMENT_LINK);
}