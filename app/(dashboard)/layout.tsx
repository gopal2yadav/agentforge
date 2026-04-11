import { Sidebar } from '@/components/dashboard/sidebar';
import { SwarmStatusBar } from '@/components/swarm/status-bar';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex bg-[#0a0a0f] text-[#e8e8f0] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[#1e1e2e] bg-[#0c0c14]/80 backdrop-blur-xl flex items-center justify-between px-6">
          <SwarmStatusBar />
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}