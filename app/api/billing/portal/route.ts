import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const customerId = body.customerId;
    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
    }
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json({
        url: 'https://billing.stripe.com/p/login/test_placeholder',
        message: 'Stripe not configured — using placeholder portal URL',
      });
    }
    return NextResponse.json({ url: 'https://billing.stripe.com/p/session/' + customerId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}