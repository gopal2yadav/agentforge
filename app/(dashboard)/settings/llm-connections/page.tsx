'use client';
import { useState } from 'react';

const PROVIDERS = [
  { id: 'anthropic', name: 'Anthropic', models: ['claude-opus-4-20250514', 'claude-sonnet-4-20250514', 'claude-haiku-4-5-20251001'], status: 'connected', color: '#d97706' },
  { id: 'openai', name: 'OpenAI', models: ['gpt-4o', 'gpt-4o-mini', 'o1', 'o3-mini'], status: 'not_configured', color: '#10b981' },
  { id: 'google', name: 'Google AI', models: ['gemini-2.5-pro', 'gemini-2.5-flash'], status: 'not_configured', color: '#3b82f6' },
  { id: 'meta', name: 'Meta', models: ['llama-3.3-70b', 'llama-3.3-8b'], status: 'not_configured', color: '#8b5cf6' },
  { id: 'aws', name: 'AWS Bedrock', models: ['claude-3-opus', 'claude-3-sonnet', 'titan-express'], status: 'not_configured', color: '#f59e0b' },
];

export default function LLMConnectionsPage() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">LLM Connections</h1>
          <p className="text-sm text-[#6b6b8a]">Manage your language model API connections</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Add Connection
        </button>
      </div>
      {showAdd && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-5 mb-4">
          <div className="text-sm font-semibold mb-3">Add LLM Connection</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-[#6b6b8a] uppercase tracking-wider mb-1 block">Provider</label>
              <select className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white">
                <option>Anthropic</option><option>OpenAI</option><option>Google AI</option><option>Meta</option><option>AWS Bedrock</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#6b6b8a] uppercase tracking-wider mb-1 block">API Key</label>
              <input type="password" placeholder="sk-..." className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white placeholder-[#4a4a5a]" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Save Connection</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {PROVIDERS.map(p => (
          <div key={p.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: p.color + '20', color: p.color }}>{p.name.charAt(0)}</div>
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[10px] text-[#6b6b8a]">{p.models.length} models available</div>
                </div>
              </div>
              {p.status === 'connected' ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-green-400/10 text-green-400">Connected</span>
              ) : (
                <button className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-[#2a2a3d] text-[#6b6b8a] hover:border-[#6366f1] hover:text-white transition-colors">Configure</button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.models.map(m => (
                <span key={m} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0a0a0f] text-[#6b6b8a] border border-[#1e1e2e]">{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}