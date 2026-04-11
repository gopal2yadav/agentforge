'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { title: 'BUILD', items: [
    { name: 'Dashboard', href: '/dashboard', icon: '\u2302' },
    { name: 'AI Builder', href: '/builder', icon: '\u2728' },
    { name: 'Studio', href: '/studio', icon: '\u2610' },
    { name: 'Agents', href: '/agents', icon: '\u2699' },
    { name: 'Flows', href: '/flows', icon: '\u21C4' },
    { name: 'Automations', href: '/automations', icon: '\u26A1' },
    { name: 'Playground', href: '/playground', icon: '\u25B6' },
  ]},
  { title: 'DATA', items: [
    { name: 'Knowledge', href: '/knowledge', icon: '\u2603' },
    { name: 'Memory', href: '/memory', icon: '\u2601' },
    { name: 'Integrations', href: '/integrations', icon: '\u2687' },
  ]},
  { title: 'OBSERVE', items: [
    { name: 'Traces', href: '/traces', icon: '\u2261' },
    { name: 'Deployments', href: '/deployments', icon: '\u2191' },
    { name: 'Monitoring', href: '/monitoring', icon: '\u2616' },
    { name: 'Logs', href: '/logs', icon: '\u2263' },
  ]},
  { title: 'MANAGE', items: [
    { name: 'Billing', href: '/billing', icon: '\u2605' },
    { name: 'Settings', href: '/settings', icon: '\u2638' },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">N</div>
          <span className="text-sm font-bold tracking-tight text-gray-900">Nexus</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-3">
            <div className="px-3 py-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em]">{section.title}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href || (pathname || '').startsWith(item.href + '/');
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] transition-colors ${active ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                    <span className="text-sm">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-gray-100 text-[10px] text-gray-400">Nexus v2.2.0</div>
    </aside>
  );
}