import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Sidebar } from '@/components/dashboard/sidebar';
import { SwarmStatusBar } from '@/components/swarm/status-bar';

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  return (
    <div className="h-screen flex bg-nexus-900 text-nexus-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-nexus-700/50 bg-nexus-800/50 backdrop-blur-xl flex items-center justify-between px-6">
          <SwarmStatusBar />
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
