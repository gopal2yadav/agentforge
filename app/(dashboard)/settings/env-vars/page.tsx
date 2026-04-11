'use client';
import { useState } from 'react';

const VARS = [
  { key: 'ANTHROPIC_API_KEY', value: 'sk-ant-...8f2a', scope: 'production', updated: '2 hours ago' },
  { key: 'OPENAI_API_KEY', value: 'sk-proj-...c4d1', scope: 'production', updated: '1 day ago' },
  { key: 'WEBHOOK_SECRET', value: 'whsec_...b7e3', scope: 'all', updated: '3 days ago' },
  { key: 'DATABASE_URL', value: 'postgresql://...', scope: 'production', updated: '5 days ago' },
];

export default function EnvVarsPage() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Environment Variables</h1>
          <p className="text-sm text-[#6b6b8a]">Manage secrets and configuration for your agents</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">+ Add Variable</button>
      </div>
      {showAdd && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="text-[10px] text-[#6b6b8a] uppercase block mb-1">Key</label><input type="text" placeholder="MY_SECRET" className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white font-mono" /></div>
            <div><label className="text-[10px] text-[#6b6b8a] uppercase block mb-1">Value</label><input type="password" placeholder="Enter value..." className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white" /></div>
          </div>
          <div className="flex gap-2"><button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Save</button><button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button></div>
        </div>
      )}
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a3d] grid grid-cols-4 text-[10px] font-semibold text-[#6b6b8a] uppercase tracking-wider"><span>Key</span><span>Value</span><span>Scope</span><span>Updated</span></div>
        {VARS.map((v) => (
          <div key={v.key} className="px-5 py-3.5 border-b border-[#2a2a3d] last:border-0 grid grid-cols-4 items-center text-sm">
            <span className="font-mono text-xs font-semibold text-white">{v.key}</span>
            <span className="font-mono text-xs text-[#6b6b8a]">{v.value}</span>
            <span className="text-[10px] text-[#6b6b8a] bg-[#1a1a2e] px-2 py-0.5 rounded w-fit">{v.scope}</span>
            <span className="text-xs text-[#4a4a5a]">{v.updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
