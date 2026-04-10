import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headers = { 'svix-id': req.headers.get('svix-id')||'', 'svix-timestamp': req.headers.get('svix-timestamp')||'', 'svix-signature': req.headers.get('svix-signature')||'' };
  let event;
  try { event = new Webhook(process.env.CLERK_WEBHOOK_SECRET||'').verify(body, headers); }
  catch { return NextResponse.json({ error: 'Invalid' }, { status: 400 }); }
  if (event.type === 'user.created' || event.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    await db.user.upsert({ where: { clerkId: id }, create: { clerkId: id, email: email_addresses?.[0]?.email_address||'', name: [first_name,last_name].filter(Boolean).join(' ')||'User', imageUrl: image_url }, update: { email: email_addresses?.[0]?.email_address||'', name: [first_name,last_name].filter(Boolean).join(' ')||'User', imageUrl: image_url } });
  }
  if (event.type === 'user.deleted') await db.user.deleteMany({ where: { clerkId: event.data.id } });
  return NextResponse.json({ received: true });
}
