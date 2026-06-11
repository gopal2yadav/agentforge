'use client';
import { useState } from 'react';
import Link from 'next/link';

const AGENTS = [
  { name: 'Nova', role: 'Research Analyst', color: '#22d3ee', grad: 'linear-gradient(135deg,#0891b2,#22d3ee)', goal: 'Research the mission topic and produce exactly 4 sharp bullet insights with concrete facts, numbers or angles. Be specific, no fluff. Under 90 words total.' },
  { name: 'Orion', role: 'Strategist', color: '#a78bfa', grad: 'linear-gradient(135deg,#6d28d9,#a78bfa)', goal: 'Turn the research handoff into a crisp 3-step action strategy. Number the steps 1-3, one line each plus one sub-detail. Under 90 words total.' },
  { name: 'Lyra', role: 'Creative Writer', color: '#f472b6', grad: 'linear-gradient(135deg,#be185d,#f472b6)', goal: 'Write a punchy, exciting pitch (under 70 words) based on the strategy handoff. End with one bold one-line tagline in quotes.' },
];

const PRESETS = [
  'Launch plan for a coffee subscription startup',
  'Win enterprise customers for an AI agents platform',
  'Viral LinkedIn post about multi-agent swarms',
  'Turn a law firm paperless in 90 days',
];

type Phase = 'idle' | 'thinking' | 'typing' | 'done';

export default function DemoPage() {
  const [topic, setTopic] = useState('');
  const [running, setRunning] = useState(false);
  const [outputs, setOutputs] = useState<string[]>(['', '', '']);
  const [phase, setPhase] = useState<Phase[]>(['idle', 'idle', 'idle']);
  const [log, setLog] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const addLog = (s: string) => setLog((l) => [...l, s]);
  const setPhaseAt = (i: number, v: Phase) => setPhase((p) => { const n = [...p]; n[i] = v; return n; });

  async function run(t: string) {
    const mission = t.trim();
    if (!mission || running) return;
    setTopic(mission);
    setRunning(true); setDone(false);
    setOutputs(['', '', '']); setPhase(['idle', 'idle', 'idle']); setLog([]);
    addLog('⚡ Swarm activated — mission: "' + mission + '"');
    let context = '';
    for (let i = 0; i < AGENTS.length; i++) {
      const a = AGENTS[i];
      setPhaseAt(i, 'thinking');
      addLog('🛰 ' + a.name + ' (' + a.role + ') is thinking…');
      const prompt = i === 0
        ? 'Mission topic: ' + mission + '\n\nYour task: ' + a.goal
        : 'Mission topic: ' + mission + '\n\nHandoff from the previous agent:\n' + context + '\n\nYour task: ' + a.goal;
      let reply = '';
      try {
        const res = await fetch('/api/playground', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent: { name: a.name, role: a.role, goal: a.goal, tools: [] }, messages: [{ role: 'user', content: prompt }] }),
        });
        const data = await res.json();
        reply = data.reply || data.error || 'No response generated.';
      } catch (e: any) {
        reply = 'Connection error: ' + e.message;
      }
      context = reply;
      setPhaseAt(i, 'typing');
      await new Promise<void>((resolve) => {
        let j = 0;
        const iv = setInterval(() => {
          j = Math.min(reply.length, j + 3);
          const slice = reply.slice(0, j);
          setOutputs((o) => { const n = [...o]; n[i] = slice; return n; });
          if (j >= reply.length) { clearInterval(iv); resolve(); }
        }, 12);
      });
      setPhaseAt(i, 'done');
      if (i < AGENTS.length - 1) addLog('🔁 ' + a.name + ' → ' + AGENTS[i + 1].name + ': handoff complete');
    }
    addLog('✅ Mission complete — 3 agents, 1 swarm, zero meetings.');
    setDone(true); setRunning(false);
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at top, #15102e 0%, #050510 60%)' }}>
      <nav className="flex items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>N</div>
          <span className="text-xl font-bold" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>Nexus</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Home</Link>
          <Link href="/pricing" className="text-sm text-indigo-300/60 hover:text-white transition-colors">Pricing</Link>
          <Link href="/sign-up" className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Get Started Free</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center pt-10 pb-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 mb-5">LIVE DEMO — real Claude AI, no mock data</div>
          <h1 className="text-5xl font-extrabold mb-4">Watch a swarm <span style={{ background: 'linear-gradient(90deg,#22d3ee,#a78bfa,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>think</span>.</h1>
          <p className="text-indigo-200/60 max-w-2xl mx-auto">Give 3 specialized AI agents a mission. Nova researches, Orion strategizes, Lyra writes — handing off to each other in real time.</p>
        </div>

        <div className="flex gap-3 max-w-2xl mx-auto mb-4">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') run(topic); }}
            placeholder="Type any mission… e.g. Grow a podcast to 10k listeners"
            className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-indigo-500/20 text-sm outline-none focus:border-indigo-400/60 placeholder:text-indigo-200/30"
            disabled={running}
          />
          <button onClick={() => run(topic)} disabled={running || !topic.trim()} className="px-7 py-3.5 rounded-xl text-sm font-semibold disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 24px rgba(99,102,241,0.35)' }}>
            {running ? 'Swarm running…' : 'Launch Swarm'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {PRESETS.map((p) => (
            <button key={p} onClick={() => run(p)} disabled={running} className="px-4 py-2 rounded-full text-xs text-indigo-200/70 border border-indigo-500/20 bg-white/[0.03] hover:bg-indigo-500/15 hover:text-white transition-colors disabled:opacity-40">
              {p}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-6 items-start">
          <div className="space-y-4">
            {AGENTS.map((a, i) => (
              <div key={a.name}>
                <div className="rounded-2xl p-5 border transition-all duration-500" style={{ borderColor: phase[i] === 'idle' ? 'rgba(99,102,241,0.12)' : a.color + '55', background: 'rgba(255,255,255,0.03)', boxShadow: phase[i] === 'thinking' || phase[i] === 'typing' ? '0 0 34px ' + a.color + '33' : 'none' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold" style={{ background: a.grad }}>
                      {a.name[0]}
                      {(phase[i] === 'thinking' || phase[i] === 'typing') && <span className="absolute inset-0 rounded-xl animate-ping" style={{ background: a.color, opacity: 0.25 }} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{a.name}</div>
                      <div className="text-xs" style={{ color: a.color }}>{a.role}</div>
                    </div>
                    <div className="text-xs text-indigo-200/50">
                      {phase[i] === 'idle' && 'standby'}
                      {phase[i] === 'thinking' && <span className="animate-pulse" style={{ color: a.color }}>thinking…</span>}
                      {phase[i] === 'typing' && <span style={{ color: a.color }}>responding</span>}
                      {phase[i] === 'done' && '✓ done'}
                    </div>
                  </div>
                  <div className="text-sm text-indigo-100/80 whitespace-pre-wrap leading-relaxed min-h-[20px]">
                    {outputs[i] || (phase[i] === 'thinking' ? '· · ·' : phase[i] === 'idle' ? 'Waiting for mission…' : '')}
                  </div>
                </div>
                {i < AGENTS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-5 transition-colors duration-500" style={{ background: phase[i] === 'done' ? AGENTS[i + 1].color : 'rgba(99,102,241,0.2)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 border border-indigo-500/15 bg-white/[0.02] md:sticky md:top-6">
            <div className="text-xs font-semibold text-indigo-300/70 mb-3 tracking-wider">SWARM LOG</div>
            <div className="space-y-2 text-xs text-indigo-200/60 max-h-80 overflow-y-auto">
              {log.length === 0 && <div className="text-indigo-200/30">Awaiting launch…</div>}
              {log.map((l, idx) => <div key={idx} className="leading-relaxed">{l}</div>)}
            </div>
          </div>
        </div>

        {done && (
          <div className="text-center mt-14 p-8 rounded-3xl border border-indigo-500/25" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(190,24,93,0.1))' }}>
            <h2 className="text-2xl font-bold mb-2">That was one swarm. Build unlimited ones.</h2>
            <p className="text-indigo-200/60 text-sm mb-6">Custom agents, visual flows, automations, public API — free to start.</p>
            <Link href="/sign-up" className="inline-block px-8 py-3.5 rounded-xl font-semibold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 30px rgba(99,102,241,0.45)' }}>Build your own swarm →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
