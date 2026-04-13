'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const FEATURES = [
  { title: 'Visual Flow Builder', desc: 'Drag-and-drop canvas to build agent workflows. 5 node types, save to database.', href: '/flow-builder', icon: 'F' },
  { title: 'Agent Marketplace', desc: '6 industry templates with 19 pre-built agents. Legal, Healthcare, Finance, Sales.', href: '/marketplace', icon: 'M' },
  { title: 'AI Playground', desc: 'Multi-turn conversations with Claude Sonnet 4. Full conversation memory.', href: '/playground', icon: 'P' },
  { title: 'Swarm Intelligence', desc: 'Deploy teams of specialized agents. 5 swarm templates with 17 agents.', href: '/builder', icon: 'S' },
  { title: 'Code Sandbox', desc: 'Write and run JavaScript live. AI generates Python code from prompts.', href: '/sandbox', icon: 'C' },
  { title: 'Public API', desc: 'Call agents from your apps. POST to /api/v1/run with agent name and prompt.', href: '/docs', icon: 'A' },
  { title: 'Webhook Triggers', desc: 'Auto-trigger agents from Stripe, GitHub, Slack events.', href: '/integrations', icon: 'W' },
  { title: 'Scheduled Runs', desc: 'Cron jobs for agents. Daily reports, weekly summaries, auto monitoring.', href: '/scheduled', icon: 'T' },
  { title: 'Human Approvals', desc: 'Enterprise governance. Agents pause for human review.', href: '/approvals', icon: 'H' },
  { title: 'Embeddable Widget', desc: 'Add AI chat to your website. One-line embed code.', href: '/embed', icon: 'E' },
  { title: 'API Key Management', desc: 'Generate keys for external access. Track usage per key.', href: '/api-keys', icon: 'K' },
  { title: 'Real-time Monitoring', desc: 'Auto-refresh health checks. DB latency, uptime tracking.', href: '/monitoring', icon: 'R' },
];

const INDUSTRIES = [
  { name: 'Legal', agents: 3, desc: 'Contract analysis, risk assessment, summaries' },
  { name: 'Healthcare', agents: 3, desc: 'Patient intake, insurance, symptom triage' },
  { name: 'Finance', agents: 3, desc: 'Financial analysis, KPI tracking, forecasting' },
  { name: 'Marketing', agents: 4, desc: 'Topic research, blog writing, SEO, social' },
  { name: 'Sales', agents: 3, desc: 'Lead qualification, outreach, CRM updates' },
  { name: 'DevOps', agents: 3, desc: 'Alert monitoring, incident response, postmortems' },
];

const ENTERPRISE = [
  { t: 'Human-in-the-Loop', d: 'Agents pause for approval' },
  { t: 'API Key Management', d: 'Generate and revoke tokens' },
  { t: 'Scheduled Automation', d: 'Cron jobs with run-now' },
  { t: 'Real-time Monitoring', d: '30s health check cycle' },
  { t: 'Stripe Payments', d: 'Built-in billing system' },
  { t: 'Clerk Authentication', d: 'Secure SSO sign-in' },
  { t: 'Deployment History', d: 'Track every version' },
  { t: 'Audit Changelog', d: 'Full change history' },
];

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const stars: { x: number; y: number; r: number; s: number; c: string }[] = [];
    const cols = ['#e0e7ff','#c7d2fe','#a5b4fc','#818cf8','#c4b5fd'];
    for (let i = 0; i < 400; i++) stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.8+0.3, s: Math.random()*0.4+0.1, c: cols[Math.floor(Math.random()*cols.length)] });
    let id: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = '#020108'; ctx.fillRect(0,0,canvas.width,canvas.height);
      stars.forEach(st => { const t = 0.5+0.5*Math.sin(Date.now()*0.001*st.s+st.x); ctx.beginPath(); ctx.arc(st.x,st.y,st.r*t,0,Math.PI*2); ctx.fillStyle=st.c; ctx.globalAlpha=t*0.7; ctx.fill(); ctx.globalAlpha=1; st.y-=st.s*0.2; if(st.y<-5){st.y=window.innerHeight+5;st.x=Math.random()*canvas.width;} });
      id = requestAnimationFrame(draw);
    };
    ctx.fillStyle='#020108'; ctx.fillRect(0,0,canvas.width,canvas.height); draw();
    return () => cancelAnimationFrame(id);
  }, []);

  const apiCode = 'curl -X POST https://agentforcecrew.com/api/v1/run \\\n  -H "Content-Type: application/json" \\\n  -d \'{"prompt": "Analyze Q4 revenue", "agent_name": "Financial Analyst"}\''; 

  return (
    <div className="relative min-h-screen" style={{ background: '#020108' }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 0 }} />
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>N</div><span className="text-xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>Nexus</span></div>
        <div className="flex items-center gap-6"><a href="#features" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Features</a><a href="#marketplace" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Marketplace</a><Link href="/pricing" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Pricing</Link><Link href="/sign-in" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Sign In</Link><Link href="/sign-up" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>Get Started Free</Link></div>
      </nav>
      <section className="relative z-10 flex flex-col items-center px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-xs text-indigo-300">v2.9 | 32 Agents | 21 APIs | 38 Pages | Universe Mode</span></div>
          <h1 className="text-7xl font-bold leading-tight mb-6"><span className="text-white" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>Orchestrate AI Agents</span><br /><span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>That Think Together</span></h1>
          <p className="text-lg text-indigo-200/60 max-w-2xl mx-auto mb-10 leading-relaxed">Build, deploy, and manage autonomous AI agent swarms. Visual workflow builder, code sandbox, marketplace, public API, and enterprise governance ÃÂ¢ÃÂÃÂ all powered by Claude Sonnet 4.</p>
          <div className="flex items-center gap-4 justify-center mb-12"><Link href="/sign-up" className="px-8 py-4 rounded-xl text-base font-semibold text-white hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>Start Building Free</Link><Link href="/docs" className="px-8 py-4 rounded-xl text-base font-semibold text-indigo-200/80 hover:text-white transition-all" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>View API Docs</Link></div>
          <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">{[{v:'38+',l:'Pages'},{v:'21+',l:'APIs'},{v:'19',l:'Templates'},{v:'6',l:'Industries'},{v:'<2s',l:'Latency'}].map(s => (<div key={s.l} className="text-center"><div className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div><div className="text-[10px] text-indigo-300/40 mt-1">{s.l}</div></div>))}</div>
        </div>
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)', filter: 'blur(60px)' }} />
      </section>
      <div style={{ background: "#020108", position: "relative", zIndex: 1 }}>
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-white mb-3">Everything you need to build AI agents</h2><p className="text-indigo-200/50 max-w-xl mx-auto">From visual workflow builder to enterprise governance.</p></div>
        <div className="grid grid-cols-3 gap-4">{FEATURES.map(feat => (<Link key={feat.title} href={feat.href} className="rounded-xl p-5 transition-all hover:translate-y-[-2px] group" style={{ background: 'rgba(15,15,35,0.5)', border: '1px solid rgba(99,102,241,0.12)', backdropFilter: 'blur(12px)' }}><div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }}>{feat.icon}</div><div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{feat.title}</div></div><p className="text-xs text-indigo-200/50 leading-relaxed">{feat.desc}</p></Link>))}</div>
      </section>
      <section id="marketplace" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-white mb-3">Agent Marketplace</h2><p className="text-indigo-200/50">Pre-built AI agent teams for every industry.</p></div>
        <div className="grid grid-cols-3 gap-4">{INDUSTRIES.map(ind => (<Link key={ind.name} href="/marketplace" className="rounded-xl p-6 transition-all hover:translate-y-[-2px]" style={{ background: 'rgba(15,15,35,0.5)', border: '1px solid rgba(99,102,241,0.12)', backdropFilter: 'blur(12px)' }}><div className="flex items-center justify-between mb-3"><span className="text-lg font-bold text-white">{ind.name}</span><span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }}>{ind.agents} agents</span></div><p className="text-xs text-indigo-200/50">{ind.desc}</p></Link>))}</div>
      </section>
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-white mb-3">Developer-First API</h2><p className="text-indigo-200/50">Call any agent from your apps with a single POST request.</p></div>
        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}><pre className="font-mono text-sm leading-relaxed" style={{ color: '#6ee7b7' }}>{apiCode}</pre></div>
      </section>
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-white mb-3">Enterprise Ready</h2><p className="text-indigo-200/50">Governance, compliance, and security built in.</p></div>
        <div className="grid grid-cols-4 gap-4">{ENTERPRISE.map(i => (<div key={i.t} className="rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.4)', border: '1px solid rgba(99,102,241,0.1)' }}><div className="text-sm font-semibold text-white mb-1">{i.t}</div><div className="text-[11px] text-indigo-200/50">{i.d}</div></div>))}</div>
      </section>
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to orchestrate?</h2>
        <p className="text-indigo-200/50 mb-8">Join companies using Nexus to build intelligent AI systems.</p>
        <div className="flex items-center gap-4 justify-center"><Link href="/sign-up" className="px-8 py-4 rounded-xl text-base font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>Start Building Free</Link><Link href="/pricing" className="px-8 py-4 rounded-xl text-base font-semibold text-indigo-200/80" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>View Pricing</Link></div>
      </section>
      </div>
      <footer className="relative z-10 border-t px-8 py-8" style={{ borderColor: 'rgba(99,102,241,0.1)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>N</div><span className="text-sm font-bold text-indigo-300/60">Nexus</span><span className="text-xs text-indigo-400/30 ml-2">v2.9.0 | by MSA</span></div>
          <div className="flex items-center gap-6 text-xs text-indigo-400/40"><Link href="/docs">API Docs</Link><Link href="/changelog">Changelog</Link><Link href="/pricing">Pricing</Link><a href="mailto:gopal@aabhyasa.com">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
