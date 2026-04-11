export const dynamic = 'force-dynamic';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserProfile } from '@clerk/nextjs';
import { db } from '@/lib/db';

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-display font-bold mb-1">Settings</h1>
      <p className="text-sm text-nexus-400 mb-6">Manage your account</p>
      <div className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold mb-4">Account Details</h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between"><span className="text-nexus-400">Plan</span><span className="font-bold">{user?.plan||'FREE'}</span></div>
          <div className="flex justify-between"><span className="text-nexus-400">Tokens</span><span className="font-bold">{((user?.tokensUsed||0)/1000).toFixed(0)}K / {((user?.tokensLimit||100000)/1000).toFixed(0)}K</span></div>
        </div>
      </div>
      <div className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl overflow-hidden">
        <UserProfile appearance={{ elements: { rootBox: 'w-full', cardBox: 'shadow-none w-full' } }} />
      </div>
    </div>
  );
}
