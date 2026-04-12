'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GettingStartedPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/health').then(r => r.json()), fetch('/api/stats').then(r => r.json())])
      .then(([h, s]) => { setHealth(h); setStats(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const steps = [
    { title: 'Create your first agent', desc: 'Define an AI agent with a role, goal, and tools', done: (stats?.agents || 0) > 0, href: '/agents/create', count: stats?.agents },
    { title: 'Build a workflow', desc: 'Chain agents together in a multi-step flow', done: (stats?.flows || 0) > 0, href: '/flows/create', count: stats?.flows },
    { title: 'Deploy a swarm', desc: 'Launch a team of specialized agents', done: (stats?.crews || 0) > 0, href: '/builder', count: stats?.crews },
    { title: 'Test in Playground', desc: 'Chat with your agents using real Claude AI', done: (stats?.totalRuns || 0) > 0, href: '/playground', count: stats?.totalRuns },
    { title: 'Connect Anthropic AI', desc: 'Add your ANTHROPIC_API_KEY for real AI responses', done: health?.services?.ai?.status === 'configured', href: '/settings' },
    { title: 'Connect Stripe', desc: 'Add STRIPE_SECRET_KEY for payment processing', done: health?.services?.payments?.status === 'configured', href: '/settings' },
    { title: 'Try Code Sandbox', desc: 'Write and run code with AI assistance', done: false, href: '/sandbox' },
    { title: 'Explore integrations', desc: 'Connect Slack, GitHub, Gmail, and more', done: false, href: '/integrations' },
  ];

  const completedCount = steps.filter(s => s.done).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Getting Started</h1>
      <p className="text-sm text-indigo-300/50 mb-6">Complete these steps to set up your Nexus platform</p>

      <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">{completedCount} of {steps.length} complete</span>
          <span className="text-sm font-bold" style={{ color: '#a5b4fc' }}>{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: progress + '%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <Link key={i} href={step.href} className="block rounded-xl p-5 transition-all hover:translate-y-[-1px]" style={{ background: step.done ? 'rgba(16,185,129,0.05)' : 'rgba(15,15,35,0.6)', border: '1px solid ' + (step.done ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.15)') }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ' + (step.done ? '' : '')} style={{ background: step.done ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)', color: step.done ? '#6ee7b7' : '#a5b4fc' }}>
                  {step.done ? 'OK' : (i + 1)}
                </div>
                <div>
                  <div className={'text-sm font-semibold ' + (step.done ? 'line-through opacity-60' : '')}>{step.title}</div>
                  <div className="text-xs text-indigo-300/50">{step.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {step.count !== undefined && <span className="text-xs font-mono text-indigo-400/40">{step.count}</span>}
                {step.done ? (
                  <span className="text-[10px] font-semibold" style={{ color: '#6ee7b7' }}>Done</span>
                ) : (
                  <span className="text-[10px] font-semibold text-indigo-400/50">Start</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}