'use client';
import { useState } from 'react';

export default function ApiKeysPage() {
  const [keys] = useState([
    { id: 'key_1', name: 'Production Key', prefix: 'nx_prod_...a8f2', created: '2026-03-15', lastUsed: '2 hours ago', status: 'active' },
    { id: 'key_2', name: 'Development Key', prefix: 'nx_dev_...c4d1', created: '2026-04-01', lastUsed: '5 min ago', status: 'active' },
    { id: 'key_3', name: 'CI/CD Pipeline', prefix: 'nx_ci_...b7e3', created: '2026-04-08', lastUsed: 'Never', status: 'inactive' },
  ]);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">API Keys</h1>
          <p className="text-sm text-[#6b6b8a]">Manage your API keys for programmatic access</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Create Key
        </button>
      </div>
      {showCreate && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-5 mb-4">
          <div className="text-sm font-semibold mb-3">Create New API Key</div>
          <input type="text" placeholder="Key name (e.g., Production)" className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1] mb-3" />
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Generate</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a3d] grid grid-cols-5 text-[10px] font-semibold text-[#6b6b8a] uppercase tracking-wider">
          <span>Name</span><span>Key</span><span>Created</span><span>Last Used</span><span>Status</span>
        </div>
        {keys.map((key) => (
          <div key={key.id} className="px-5 py-4 border-b border-[#2a2a3d] last:border-0 grid grid-cols-5 items-center text-sm">
            <span className="font-medium">{key.name}</span>
            <span className="font-mono text-xs text-[#6b6b8a]">{key.prefix}</span>
            <span className="text-[#6b6b8a] text-xs">{key.created}</span>
            <span className="text-[#6b6b8a] text-xs">{key.lastUsed}</span>
            <span className={"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold w-fit " + (key.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/20 text-gray-400')}>
              <span className={"w-1.5 h-1.5 rounded-full " + (key.status === 'active' ? 'bg-green-400' : 'bg-gray-400')} />
              {key.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-2">Quick Start</h3>
        <pre className="bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg p-4 text-xs text-[#a0a0b8] overflow-x-auto">
{String.raw`curl -X POST https://agentforcecrew.com/api/agents/run \
  -H "Authorization: Bearer nx_prod_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"agentId": "1", "prompt": "Analyze this data"}'`}
        </pre>
      </div>
    </div>
  );
}