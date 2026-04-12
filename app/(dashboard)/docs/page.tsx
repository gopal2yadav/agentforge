'use client';
import { useState } from 'react';

const API_DOCS = [
  { method: 'GET', path: '/api/agents', desc: 'List all agents from database', response: '[{ id, name, role, goal, backstory, model, tools, status, runs, createdAt }]' },
  { method: 'POST', path: '/api/agents', desc: 'Create a new agent', body: '{ name, role, goal, backstory, model, tools }', response: '{ id, name, role, ... }' },
  { method: 'DELETE', path: '/api/agents?id=xxx', desc: 'Delete an agent by ID', response: '{ deleted: true }' },
  { method: 'POST', path: '/api/agents/run', desc: 'Execute agent with real Claude AI', body: '{ agentId, prompt }', response: '{ reply, agent, model, usage }' },
  { method: 'GET', path: '/api/flows', desc: 'List all flows', response: '[{ id, name, description, trigger, steps, status, runs }]' },
  { method: 'POST', path: '/api/flows', desc: 'Create a new flow', body: '{ name, description, trigger, steps }', response: '{ id, name, ... }' },
  { method: 'DELETE', path: '/api/flows?id=xxx', desc: 'Delete a flow', response: '{ deleted: true }' },
  { method: 'GET', path: '/api/crews', desc: 'List all crews', response: '[{ id, name, config, status }]' },
  { method: 'POST', path: '/api/crews', desc: 'Create a crew', body: '{ name, config }', response: '{ id, name, ... }' },
  { method: 'GET', path: '/api/automations', desc: 'List automations', response: '[{ id, name, trigger, agent, status }]' },
  { method: 'POST', path: '/api/automations', desc: 'Create automation', body: '{ name, trigger, agent }', response: '{ id, name, ... }' },
  { method: 'GET', path: '/api/stats', desc: 'Platform statistics', response: '{ agents, flows, crews, automations, totalRuns, tokensUsed, plan, status }' },
  { method: 'GET', path: '/api/health', desc: 'Service health check', response: '{ status, services: { database, api, auth, payments, ai }, version }' },
  { method: 'POST', path: '/api/playground', desc: 'Multi-turn AI conversation', body: '{ messages, model, agent }', response: '{ reply, model, usage }' },
  { method: 'GET', path: '/api/swarm', desc: 'List swarm templates', response: '[{ name, agents: [{ name, role, goal, backstory, tools }] }]' },
  { method: 'POST', path: '/api/swarm', desc: 'Deploy a swarm', body: '{ swarmName }', response: '{ swarm, agents, crew, agentIds }' },
  { method: 'GET', path: '/api/notifications', desc: 'Get notifications', response: '{ notifications, unread, total }' },
  { method: 'GET', path: '/api/billing/checkout', desc: 'Redirect to Stripe checkout', response: 'Redirects to buy.stripe.com' },
  { method: 'GET', path: '/api/db-init', desc: 'Database table counts', response: '{ success, tables: { Agent, Flow, Crew, Automation } }' },
];

  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState('');
  const methodColors: Record<string, string> = { GET: '#6ee7b7', POST: '#a5b4fc', DELETE: '#f87171', PUT: '#fcd34d' };

  const filtered = filter ? API_DOCS.filter(d => d.path.includes(filter) || d.desc.toLowerCase().includes(filter.toLowerCase())) : API_DOCS;

  const copyCode = (text: string) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(''), 2000); };

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">API Documentation</h1>
      <p className="text-sm text-indigo-300/50 mb-2">{API_DOCS.length} endpoints | Base URL: agentforcecrew.com</p>
      <p className="text-xs text-indigo-300/40 mb-6">All endpoints return real data from Neon Postgres. AI endpoints use real Anthropic Claude Sonnet 4.</p>

      <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter endpoints..." className="w-full px-4 py-3 rounded-xl text-sm mb-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.2)', color: '#e0e7ff' }} />

      <div className="space-y-3">
        {filtered.map((ep, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono" style={{ color: methodColors[ep.method] || '#a5b4fc', background: 'rgba(0,0,0,0.3)' }}>{ep.method}</span>
                <span className="text-sm font-mono" style={{ color: '#c7d2fe' }}>{ep.path}</span>
              </div>
              <button onClick={() => copyCode('fetch("https://agentforcecrew.com' + ep.path + '"' + (ep.method === 'POST' ? ', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(' + (ep.body || '{}') + ') }' : '') + ')')} className="text-[10px] text-indigo-400/50 hover:text-indigo-300">{copied.includes(ep.path) ? 'Copied!' : 'Copy'}</button>
            </div>
            <div className="px-4 pb-3">
              <div className="text-xs text-indigo-300/60 mb-2">{ep.desc}</div>
              {ep.body && <div className="text-[10px] font-mono p-2 rounded mb-1" style={{ background: 'rgba(0,0,0,0.2)', color: '#93a3bf' }}>Body: {ep.body}</div>}
              <div className="text-[10px] font-mono p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)', color: '#6ee7b7' }}>Response: {ep.response}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}