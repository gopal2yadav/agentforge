import { NextResponse } from 'next/server';

// Only initialize Stripe if the key exists
const stripeKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }
  
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    
    // Process webhook
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Stripe webhook endpoint ready', configured: !!stripeKey });
}
