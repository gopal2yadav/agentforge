'use client';
import { useState } from 'react';

const ENDPOINTS = [
  { method: 'GET', path: '/api/agents', desc: 'List all agents', auth: true, response: '[{ "id": "1", "name": "Research Agent", "status": "ACTIVE" }]' },
  { method: 'POST', path: '/api/agents', desc: 'Create a new agent', auth: true, body: '{ "name": "My Agent", "model": "claude-sonnet-4", "systemPrompt": "You are..." }', response: '{ "id": "4", "name": "My Agent", "status": "ACTIVE" }' },
  { method: 'POST', path: '/api/agents/run', desc: 'Execute an agent with a prompt', auth: true, body: '{ "agentId": "1", "prompt": "Analyze market trends" }', response: '{ "result": "...", "tokensUsed": 3200, "latencyMs": 1850 }' },
  { method: 'GET', path: '/api/flows', desc: 'List all flows', auth: true, response: '[{ "id": "1", "name": "Content Pipeline", "status": "active" }]' },
  { method: 'POST', path: '/api/flows', desc: 'Create a new flow', auth: true, body: '{ "name": "My Flow", "nodes": [...], "edges": [...] }', response: '{ "id": "3", "name": "My Flow" }' },
  { method: 'GET', path: '/api/swarm', desc: 'Swarm health check', auth: false, response: '{ "status": "operational", "agents": 7, "uptime": "99.97%" }' },
];

export default function ApiDocsPage() {
  const [expanded, setExpanded] = useState(null);
  const methodColor = (m) => m === 'GET' ? 'bg-emerald-50 text-emerald-700' : m === 'POST' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700';

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">API Documentation</h1>
        <p className="text-sm text-gray-500">RESTful API for programmatic access to Nexus agents and flows</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Base URL</h3>
        <code className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-lg text-indigo-600 border border-gray-100">https://agentforcecrew.com</code>
        <div className="mt-3 text-xs text-gray-500">All API requests require an API key in the Authorization header:<br/>
          <code className="font-mono text-gray-600">Authorization: Bearer nx_prod_YOUR_KEY</code>
        </div>
      </div>
      <div className="space-y-3">
        {ENDPOINTS.map((ep, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + methodColor(ep.method)}>{ep.method}</span>
                <span className="text-sm font-mono text-gray-700">{ep.path}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{ep.desc}</span>
                {ep.auth && <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-600">Auth</span>}
                <span className="text-gray-300">{expanded === i ? '\u25B2' : '\u25BC'}</span>
              </div>
            </button>
            {expanded === i && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                {ep.body && (
                  <div>
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Request Body</div>
                    <pre className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-700 font-mono overflow-x-auto">{ep.body}</pre>
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Response</div>
                  <pre className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-700 font-mono overflow-x-auto">{ep.response}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Rate Limits</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-400 text-xs">Free</span><div className="font-medium text-gray-900">100 req/day</div></div>
          <div><span className="text-gray-400 text-xs">Pro</span><div className="font-medium text-indigo-600">5,000 req/day</div></div>
          <div><span className="text-gray-400 text-xs">Enterprise</span><div className="font-medium text-gray-900">Unlimited</div></div>
        </div>
      </div>
    </div>
  );
}