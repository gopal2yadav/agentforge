'use client';
import { useState } from 'react';

export default function EnvVarsPage() {
  const [vars] = useState([
    { key: 'OPENAI_API_KEY', value: 'sk-proj-...a8f2', scope: 'production', masked: true },
    { key: 'ANTHROPIC_API_KEY', value: 'sk-ant-...c4d1', scope: 'all', masked: true },
    { key: 'DATABASE_URL', value: 'postgresql://...', scope: 'production', masked: true },
    { key: 'SLACK_WEBHOOK_URL', value: 'https://hooks.slack.com/...', scope: 'all', masked: true },
    { key: 'LOG_LEVEL', value: 'info', scope: 'development', masked: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Environment Variables</h1>
          <p className="text-sm text-[#6b6b8a]">Manage secrets and configuration for your agents</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Add Variable
        </button>
      </div>
      {showAdd && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input placeholder="KEY_NAME" className="bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-[#4a4a5a]" />
            <input placeholder="value" className="bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white placeholder-[#4a4a5a]" />
            <select className="bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-3 py-2 text-sm text-white">
              <option>all</option><option>production</option><option>development</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Save</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a3d] grid grid-cols-4 text-[10px] font-semibold text-[#6b6b8a] uppercase tracking-wider">
          <span>Key</span><span>Value</span><span>Scope</span><span>Actions</span>
        </div>
        {vars.map(v => (
          <div key={v.key} className="px-5 py-3.5 border-b border-[#2a2a3d] last:border-0 grid grid-cols-4 items-center">
            <span className="text-sm font-mono font-medium">{v.key}</span>
            <span className="text-sm font-mono text-[#6b6b8a]">{v.masked ? v.value.substring(0, 8) + '****' : v.value}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#6366f1]/10 text-[#818cf8] w-fit">{v.scope}</span>
            <div className="flex gap-2">
              <button className="text-[11px] text-[#6b6b8a] hover:text-white">Edit</button>
              <button className="text-[11px] text-red-400/60 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}