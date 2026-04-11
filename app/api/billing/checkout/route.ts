import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRO_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://agentforcecrew.com';
    
    if (!stripeKey || stripeKey.includes('placeholder')) {
      return NextResponse.json({ 
        error: 'Stripe not configured. Please add your STRIPE_SECRET_KEY to Vercel environment variables.',
        configUrl: 'https://dashboard.stripe.com/apikeys'
      }, { status: 503 });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' as any });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: appUrl + '/dashboard?upgraded=true',
      cancel_url: appUrl + '/billing?cancelled=true',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Billing] Checkout error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
