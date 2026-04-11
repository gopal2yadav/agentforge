'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { name: 'Dashboard', href: '/dashboard', icon: '\u2302' },
  { name: 'Agents', href: '/agents', icon: '\u2699' },
  { name: 'Flows', href: '/flows', icon: '\u2194' },
  { name: 'Memory', href: '/memory', icon: '\u2601' },
  { name: 'Playground', href: '/playground', icon: '\u25B6' },
  { name: 'Monitoring', href: '/monitoring', icon: '\u2261' },
  { name: 'Billing', href: '/billing', icon: '\u2605' },
  { name: 'Settings', href: '/settings', icon: '\u2638' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 h-full bg-[#0c0c14] border-r border-[#1e1e2e] flex flex-col">
      <div className="p-4 border-b border-[#1e1e2e]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6366f1] flex items-center justify-center text-white text-xs font-bold">N</div>
          <span className="text-sm font-bold tracking-tight">Nexus</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href || (pathname && pathname.startsWith(item.href + '/'));
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${active ? 'bg-[#6366f1]/15 text-white font-medium' : 'text-[#6b6b8a] hover:text-white hover:bg-[#1a1a2e]'}`}>
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[#1e1e2e]">
        <div className="px-3 py-2 text-[10px] text-[#4a4a5a]">Nexus v2.1.0</div>
      </div>
    </aside>
  );
}