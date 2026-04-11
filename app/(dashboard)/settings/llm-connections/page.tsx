'use client';
import { useState } from 'react';

const PROVIDERS = [
  { id: '1', name: 'Anthropic', models: 'claude-opus-4, claude-sonnet-4, claude-haiku-4.5', status: 'connected', usage: '45,200 tokens' },
  { id: '2', name: 'OpenAI', models: 'gpt-4o, gpt-4o-mini, o3-mini', status: 'connected', usage: '12,800 tokens' },
  { id: '3', name: 'Google AI', models: 'gemini-2.5-pro, gemini-2.5-flash', status: 'not_configured', usage: '0 tokens' },
  { id: '4', name: 'Meta (Ollama)', models: 'llama-3.3-70b, llama-3.3-8b', status: 'not_configured', usage: '0 tokens' },
  { id: '5', name: 'AWS Bedrock', models: 'claude-sonnet-4, titan-text', status: 'not_configured', usage: '0 tokens' },
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
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">+ Add Connection</button>
      </div>
      {showAdd && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="text-[10px] text-[#6b6b8a] uppercase block mb-1">Provider</label><select className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white"><option>Anthropic</option><option>OpenAI</option><option>Google AI</option><option>AWS Bedrock</option></select></div>
            <div><label className="text-[10px] text-[#6b6b8a] uppercase block mb-1">API Key</label><input type="password" placeholder="sk-..." className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white" /></div>
          </div>
          <div className="flex gap-2"><button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Save</button><button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button></div>
        </div>
      )}
      <div className="space-y-3">
        {PROVIDERS.map((p) => (
          <div key={p.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8] text-lg font-bold">{p.name.charAt(0)}</div>
                <div><div className="text-sm font-semibold">{p.name}</div><div className="text-[10px] text-[#6b6b8a]">{p.usage} this month</div></div>
              </div>
              <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + (p.status === 'connected' ? 'bg-green-400/10 text-green-400' : 'bg-[#2a2a3d] text-[#6b6b8a]')}>{p.status === 'connected' ? 'Connected' : 'Not configured'}</span>
            </div>
            <div className="text-[11px] font-mono text-[#6b6b8a]">{p.models}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
