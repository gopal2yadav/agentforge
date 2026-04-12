'use client';
import { useState } from 'react';

export default function DocsPage() {
  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState('');

  const API_DOCS = [
    { method: 'GET', path: '/api/agents', desc: 'List all agents' },
    { method: 'POST', path: '/api/agents', desc: 'Create a new agent' },
    { method: 'DELETE', path: '/api/agents?id=xxx', desc: 'Delete an agent' },
    { method: 'POST', path: '/api/agents/run', desc: 'Execute agent with real Claude AI' },
    { method: 'GET', path: '/api/flows', desc: 'List all flows' },
    { method: 'POST', path: '/api/flows', desc: 'Create a new flow' },
    { method: 'GET', path: '/api/crews', desc: 'List all crews' },
    { method: 'POST', path: '/api/crews', desc: 'Create a crew' },
    { method: 'GET', path: '/api/automations', desc: 'List automations' },
    { method: 'POST', path: '/api/automations', desc: 'Create automation' },
    { method: 'GET', path: '/api/stats', desc: 'Platform statistics' },
    { method: 'GET', path: '/api/health', desc: 'Service health check' },
    { method: 'POST', path: '/api/playground', desc: 'Multi-turn AI conversation' },
    { method: 'GET', path: '/api/swarm', desc: 'List swarm templates' },
    { method: 'POST', path: '/api/swarm', desc: 'Deploy a swarm' },
    { method: 'GET', path: '/api/notifications', desc: 'Get notifications' },
    { method: 'GET', path: '/api/billing/checkout', desc: 'Redirect to Stripe' },
    { method: 'GET', path: '/api/db-init', desc: 'Database table counts' },
  ];

  const mc: Record<string, string> = { GET: '#6ee7b7', POST: '#a5b4fc', DELETE: '#f87171' };
  const filtered = filter ? API_DOCS.filter(d => d.path.includes(filter) || d.desc.toLowerCase().includes(filter.toLowerCase())) : API_DOCS;

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">API Documentation</h1>
      <p className="text-sm text-indigo-300/50 mb-6">{API_DOCS.length} endpoints | All return real data</p>
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter endpoints..." className="w-full px-4 py-3 rounded-xl text-sm mb-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.2)', color: '#e0e7ff' }} />
      <div className="space-y-3">
        {filtered.map((ep, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono" style={{ color: mc[ep.method] || '#a5b4fc', background: 'rgba(0,0,0,0.3)' }}>{ep.method}</span>
              <span className="text-sm font-mono" style={{ color: '#c7d2fe' }}>{ep.path}</span>
            </div>
            <div className="text-xs text-indigo-300/60">{ep.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}