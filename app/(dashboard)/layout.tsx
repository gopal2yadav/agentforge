import { Sidebar } from '@/components/dashboard/sidebar';
import { SwarmStatusBar } from '@/components/dashboard/swarm-status';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <SwarmStatusBar />
          <div className="flex items-center gap-3 text-sm text-gray-500">Nexus AI</div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}