'use client';
import { useState } from 'react';
const ENDPOINTS = [
  { method: 'GET', path: '/api/agents', desc: 'List all configured agents', response: '{\n  "agents": [\n    { "id": "1", "name": "Research Agent", "status": "ACTIVE" }\n  ]\n}' },
  { method: 'POST', path: '/api/agents/run', desc: 'Execute an agent with a prompt', body: '{\n  "agentId": "1",\n  "prompt": "Analyze market trends"\n}', response: '{\n  "executionId": "ex_001",\n  "status": "completed",\n  "tokens": 3200\n}' },
  { method: 'GET', path: '/api/flows', desc: 'List all workflow pipelines', response: '{\n  "flows": [\n    { "id": "1", "name": "Content Pipeline", "agents": 3 }\n  ]\n}' },
  { method: 'GET', path: '/api/swarm', desc: 'Health check for the swarm', response: '{\n  "status": "operational",\n  "activeAgents": 3,\n  "uptime": "99.9%"\n}' },
  { method: 'GET', path: '/api/notifications', desc: 'Get recent notifications', response: '{\n  "notifications": [...],\n  "unreadCount": 2\n}' },
  { method: 'GET', path: '/api/actions', desc: 'List available quick actions', response: '{\n  "actions": [...],\n  "version": "2.3.0"\n}' },
];
export default function ApiDocsPage() {
  const [expandedIdx, setExpandedIdx] = useState(0);
  const methodColor = (m) => m === 'GET' ? 'bg-emerald-50 text-emerald-600' : m === 'POST' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600';
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">API Reference</h1>
        <p className="text-sm text-gray-500">Complete REST API documentation with examples</p>
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <span className="text-xs text-gray-400">Base URL:</span>
          <code className="text-xs font-mono text-indigo-600">https://agentforcecrew.com</code>
        </div>
      </div>
      <div className="space-y-3">
        {ENDPOINTS.map((ep, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div onClick={() => setExpandedIdx(expandedIdx === i ? -1 : i)} className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={'px-2 py-0.5 rounded text-[10px] font-bold ' + methodColor(ep.method)}>{ep.method}</span>
                <code className="text-sm font-mono text-gray-900">{ep.path}</code>
              </div>
              <span className="text-xs text-gray-400">{ep.desc}</span>
            </div>
            {expandedIdx === i && (
              <div className="px-5 pb-4 space-y-3">
                <p className="text-xs text-gray-500">{ep.desc}</p>
                {ep.body && (<div><div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Request Body</div><pre className="bg-gray-900 text-amber-300 rounded-lg p-3 text-xs font-mono overflow-x-auto">{ep.body}</pre></div>)}
                <div><div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Response</div><pre className="bg-gray-900 text-emerald-400 rounded-lg p-3 text-xs font-mono overflow-x-auto">{ep.response}</pre></div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">cURL Example</div>
                  <code className="text-xs text-gray-700 font-mono">curl -H 'Authorization: Bearer YOUR_API_KEY' https://agentforcecrew.com{ep.path}</code>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}