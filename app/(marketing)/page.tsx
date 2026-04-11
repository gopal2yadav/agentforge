export const dynamic = 'force-dynamic';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { HeroSection } from '@/components/marketing/hero';
export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');
  return <div className="min-h-screen bg-nexus-900 text-nexus-100 overflow-hidden"><HeroSection/></div>;
}
