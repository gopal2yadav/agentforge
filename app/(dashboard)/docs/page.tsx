'use client';
import { useState } from 'react';

const ENDPOINTS = [
  { method: 'GET', path: '/api/agents', desc: 'List all agents from database', response: 'Agent[]' },
  { method: 'POST', path: '/api/agents', desc: 'Create a new agent', body: '{ name, role, goal, backstory, model, tools }', response: 'Agent' },
  { method: 'DELETE', path: '/api/agents?id=xxx', desc: 'Delete an agent by ID', response: '{ deleted: true }' },
  { method: 'POST', path: '/api/agents/run', desc: 'Execute an agent with real Claude AI', body: '{ agentId, prompt }', response: '{ reply, agent, model, usage }' },
  { method: 'GET', path: '/api/flows', desc: 'List all flows', response: 'Flow[]' },
  { method: 'POST', path: '/api/flows', desc: 'Create a new flow', body: '{ name, description, trigger, steps }', response: 'Flow' },
  { method: 'GET', path: '/api/crews', desc: 'List all crews', response: 'Crew[]' },
  { method: 'POST', path: '/api/crews', desc: 'Create a new crew', body: '{ name, config }', response: 'Crew' },
  { method: 'GET', path: '/api/automations', desc: 'List all automations', response: 'Automation[]' },
  { method: 'GET', path: '/api/stats', desc: 'Platform statistics', response: '{ agents, flows, crews, automations, totalRuns, tokensUsed }' },
  { method: 'GET', path: '/api/health', desc: 'Service health check', response: '{ status, services, version, timestamp }' },
  { method: 'POST', path: '/api/playground', desc: 'Multi-turn AI chat', body: '{ messages, model, agent }', response: '{ reply, model, usage }' },
  { method: 'GET', path: '/api/swarm', desc: 'List swarm templates', response: 'SwarmTemplate[]' },
  { method: 'POST', path: '/api/swarm', desc: 'Deploy a swarm', body: '{ swarmName }', response: '{ swarm, agents, crew }' },
  { method: 'GET', path: '/api/notifications', desc: 'Real-time notifications', response: '{ notifications, unread, total }' },
  { method: 'GET', path: '/api/billing/checkout', desc: 'Redirect to Stripe checkout', response: '307 Redirect' },
];

export default function DocsPage() {
  const [testing, setTesting] = useState<string | null>(null);
  const [result, setResult] = useState('');

  const testEndpoint = async (ep: typeof ENDPOINTS[0]) => {
    setTesting(ep.path);
    setResult('Loading...');
    try {
      const res = await fetch(ep.path);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2).substring(0, 1500));
    } catch (e: any) { setResult('Error: ' + e.message); }
    setTesting(null);
  };

  const methodColor = (m: string) => m === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : m === 'POST' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-red-500/20 text-red-400';

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">API Documentation</h1>
      <p className="text-sm text-indigo-300/50 mb-2">Live API reference — all endpoints are real and connected to your database</p>
      <p className="text-xs text-indigo-400/40 mb-6 font-mono">Base URL: https://agentforcecrew.com</p>

      <div className="space-y-2">
        {ENDPOINTS.map((ep, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={'px-2 py-0.5 rounded text-[9px] font-bold font-mono ' + methodColor(ep.method)}>{ep.method}</span>
                <span className="text-sm font-mono text-indigo-200/80">{ep.path}</span>
                <span className="text-xs text-indigo-300/40 hidden lg:inline">{ep.desc}</span>
              </div>
              {ep.method === 'GET' && (
                <button onClick={() => testEndpoint(ep)} disabled={testing === ep.path} className="px-3 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{testing === ep.path ? '...' : 'Try it'}</button>
              )}
            </div>
            {ep.body && <div className="px-4 pb-3 text-[10px] font-mono text-indigo-300/40">Body: {ep.body}</div>}
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-6 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(99,102,241,0.1)' }}>
          <div className="text-[10px] font-semibold text-indigo-400/50 uppercase tracking-wider mb-2">Response</div>
          <pre className="text-xs font-mono text-emerald-400/80 whitespace-pre-wrap overflow-auto max-h-64">{result}</pre>
        </div>
      )}
    </div>
  );
}