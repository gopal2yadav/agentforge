'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Bot, GitBranch, Brain, Activity, Settings, CreditCard, Sparkles } from 'lucide-react';

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/agents', icon: Bot, label: 'Agents' },
  { href: '/flows', icon: GitBranch, label: 'Flows' },
  { href: '/memory', icon: Brain, label: 'Memory' },
  { href: '/monitoring', icon: Activity, label: 'Monitoring' },
  { href: '/billing', icon: CreditCard, label: 'Billing' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const p = usePathname();
  return (
    <aside className="w-[220px] bg-nexus-800/30 border-r border-nexus-700/30 flex flex-col shrink-0">
      <div className="h-14 flex items-center px-5 border-b border-nexus-700/30">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-electric to-plasma flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white"/>
          </div>
          <span className="font-display font-bold text-[15px]">Nexus</span>
        </Link>
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {NAV.map(item=>{const act=p===item.href||p.startsWith(item.href+'/');return <Link key={item.href} href={item.href} className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium',act?'bg-electric/10 text-electric':'text-nexus-400 hover:bg-nexus-700/30')}><item.icon className="w-[18px] h-[18px]"/>{item.label}</Link>;})}
      </nav>
      <div className="p-3 border-t border-nexus-700/30">
        <div className="rounded-xl bg-gradient-to-br from-electric/5 to-plasma/5 border border-electric/10 p-3">
          <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-pulse animate-pulse"/><span className="text-[11px] font-semibold text-nexus-300 uppercase">Swarm Active</span></div>
          <div className="text-[11px] text-nexus-400">6 agents · 0 issues</div>
        </div>
      </div>
    </aside>
  );
}
