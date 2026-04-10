import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' });

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch (e) { return NextResponse.json({ error: 'Webhook error' }, { status: 400 }); }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    if (s.metadata?.userId) {
      await db.user.update({ where: { id: s.metadata.userId }, data: { plan: 'PRO', stripeCustomerId: s.customer, stripeSubscriptionId: s.subscription, tokensLimit: 10000000 } });
    }
  }
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const u = await db.user.findFirst({ where: { stripeSubscriptionId: sub.id } });
    if (u) await db.user.update({ where: { id: u.id }, data: { plan: 'FREE', stripeSubscriptionId: null, tokensLimit: 100000 } });
  }
  return NextResponse.json({ received: true });
}
