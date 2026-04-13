import { ClerkProvider } from '@clerk/nextjs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen cosmic-bg">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent)', animation: 'shooting-star 8s linear infinite', animationDelay: '2s' }} />
        <div style={{ position: 'absolute', top: '30%', width: '150px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)', animation: 'shooting-star 12s linear infinite', animationDelay: '6s' }} />
        <div style={{ position: 'absolute', top: '60%', width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)', animation: 'shooting-star 15s linear infinite', animationDelay: '10s' }} />
      </div>
      <div className="flex relative z-10">
        <aside className="w-56 min-h-screen cosmic-sidebar sticky top-0 flex flex-col py-5 px-3">
          <a href="/dashboard" className="flex items-center gap-2.5 px-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">N</div>
            <span className="text-lg font-bold glow-text">Nexus</span>
          </a>
          <div className="text-[9px] font-semibold text-indigo-400/50 uppercase tracking-[0.2em] px-3 mb-2">Build</div>
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'AI Builder', href: '/builder' },
            { label: 'Flow Builder', href: '/flow-builder' },
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Studio', href: '/studio' },
            { label: 'Agents', href: '/agents' },
            { label: 'Templates', href: '/templates' },
            { label: 'Flows', href: '/flows' },
            { label: 'Automations', href: '/automations' },
            { label: 'Playground', href: '/playground' },
            { label: 'Sandbox', href: '/sandbox' },
          ].map(item => (
            <a key={item.label} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 transition-all">{item.label}</a>
          ))}
          <div className="text-[9px] font-semibold text-indigo-400/50 uppercase tracking-[0.2em] px-3 mb-2 mt-4">Data</div>
          {[
            { label: 'Knowledge', href: '/knowledge' },
            { label: 'Memory', href: '/memory' },
            { label: 'Integrations', href: '/integrations' },
          ].map(item => (
            <a key={item.label} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 transition-all">{item.label}</a>
          ))}
          <div className="text-[9px] font-semibold text-indigo-400/50 uppercase tracking-[0.2em] px-3 mb-2 mt-4">Observe</div>
          {[
            { label: 'Analytics', href: '/analytics' },
            { label: 'Activity', href: '/activity' },
            { label: 'Monitoring', href: '/monitoring' },
            { label: 'Usage', href: '/usage' },
            { label: 'Logs', href: '/logs' },
            { label: 'Traces', href: '/traces' },
          ].map(item => (
            <a key={item.label} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 transition-all">{item.label}</a>
          ))}
          <div className="text-[9px] font-semibold text-indigo-400/50 uppercase tracking-[0.2em] px-3 mb-2 mt-4">Account</div>
          {[
            { label: 'Settings', href: '/settings' },
            { label: 'Billing', href: '/billing' },
            { label: 'Docs', href: '/docs' },
            { label: 'Profile', href: '/profile' },
          ].map(item => (
            <a key={item.label} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 transition-all">{item.label}</a>
          ))}
          <div className="mt-auto px-3 pt-4 border-t border-indigo-500/10">
            <div className="text-[10px] text-indigo-400/40">Nexus v2.9.0</div>
          </div>
        </aside>
        <main className="flex-1 p-6 min-h-screen">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-indigo-300/60">Swarm operational</span>
              <span className="text-[11px] text-indigo-400/40">|</span>
              <span className="text-[11px] text-indigo-300/60">Universe mode</span>
            </div>
            <span className="text-[11px] text-indigo-400/40 font-mono">agentforcecrew.com</span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}