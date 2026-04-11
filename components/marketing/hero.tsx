'use client';
import Link from 'next/link';

const FEATURES = [
  { title: 'AI Agents', desc: 'Deploy autonomous agents powered by Claude, GPT-4o, and Llama', icon: '\u2699' },
  { title: 'Visual Flows', desc: 'Build multi-agent workflows with drag-and-drop DAG editor', icon: '\u21C4' },
  { title: 'Knowledge Base', desc: 'Upload documents and let agents reference your data', icon: '\u2603' },
  { title: 'Swarm Intelligence', desc: 'Agents collaborate, self-heal, and optimize autonomously', icon: '\u26A1' },
  { title: 'Traces & Debugging', desc: 'Full observability with step-by-step execution traces', icon: '\u2261' },
  { title: '40+ Integrations', desc: 'Connect Slack, GitHub, Salesforce, HubSpot, and more', icon: '\u2687' },
];

const STATS = [
  { value: '25+', label: 'AI Models Supported' },
  { value: '40+', label: 'Integrations' },
  { value: '99.97%', label: 'Uptime SLA' },
  { value: '<2s', label: 'Avg Latency' },
];

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-[#1e1e2e] px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center text-white text-sm font-bold">N</div>
          <span className="text-base font-bold">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-[#6b6b8a] hover:text-white transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors">Get Started</Link>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a3d] text-[11px] text-[#6b6b8a] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Platform v2.2 — Now with AI Builder
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Orchestrate AI Agents<br />
          <span className="text-[#6366f1]">That Think Together</span>
        </h1>
        <p className="text-lg text-[#6b6b8a] max-w-[600px] mx-auto mb-10">
          Build, deploy, and manage autonomous AI agent swarms. Visual workflow builder, persistent memory, and real-time monitoring.
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link href="/sign-up" className="px-8 py-3 rounded-lg bg-[#6366f1] text-white font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/25">Start Building Free</Link>
          <Link href="/sign-in" className="px-8 py-3 rounded-lg border border-[#2a2a3d] text-[#a0a0b8] font-semibold hover:text-white hover:border-[#3a3a4d] transition-colors">Sign In</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-[#6366f1]">{s.value}</div>
              <div className="text-xs text-[#6b6b8a] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left mb-20">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6 hover:border-[#6366f1]/20 transition-colors">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[#6b6b8a]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e1e2e] pt-8 text-center text-[#4a4a5a] text-xs">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/billing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/sign-up" className="hover:text-white transition-colors">Get Started</Link>
            <a href="https://github.com/gopal2yadav/agentforge" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:gopal@aabhyasa.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p>Built by Aabhyasa AI &bull; Powered by Nexus v2.2.0</p>
        </div>
      </div>
    </div>
  );
}