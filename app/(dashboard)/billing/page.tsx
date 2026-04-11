export const dynamic = 'force-dynamic';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { BillingClient } from '@/components/dashboard/billing-client';

export default async function BillingPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect('/sign-in');
  return <BillingClient plan={user.plan} tokensUsed={user.tokensUsed} tokensLimit={user.tokensLimit} />;
}
