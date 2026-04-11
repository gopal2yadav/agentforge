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
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div>
          <span className="text-base font-bold text-gray-900">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Get Started</Link>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-[11px] text-gray-500 mb-6 bg-gray-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Platform v2.2 — Now with AI Builder
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-gray-900">
          Orchestrate AI Agents<br />
          <span className="text-indigo-600">That Think Together</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-[600px] mx-auto mb-10">
          Build, deploy, and manage autonomous AI agent swarms. Visual workflow builder, persistent memory, and real-time monitoring.
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link href="/sign-up" className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Start Building Free</Link>
          <Link href="/sign-in" className="px-8 py-3 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:text-gray-900 hover:border-gray-300 transition-colors">Sign In</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-indigo-600">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left mb-20">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 hover:shadow-md transition-all">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="text-base font-semibold mb-2 text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-xs">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/billing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/sign-up" className="hover:text-gray-900 transition-colors">Get Started</Link>
            <a href="https://github.com/gopal2yadav/agentforge" className="hover:text-gray-900 transition-colors">GitHub</a>
            <a href="mailto:gopal@aabhyasa.com" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
          <p>Built by Aabhyasa AI \u2022 Powered by Nexus v2.2.0</p>
        </div>
      </div>
    </div>
  );
}