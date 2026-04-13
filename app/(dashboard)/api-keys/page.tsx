'use client';
import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  calls: number;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [copied, setCopied] = useState('');

  const generateKey = () => {
    if (!newKeyName.trim()) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'nxs_';
    for (let i = 0; i < 40; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    const newKey: ApiKey = {
      id: 'key-' + Date.now(),
      name: newKeyName.trim(),
      key,
      created: new Date().toISOString(),
      lastUsed: null,
      calls: 0,
    };
    setKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
    setShowCreate(false);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">API Keys</h1>
          <p className="text-sm text-indigo-300/50">Manage API keys for external access to Nexus agents</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{showCreate ? 'Cancel' : '+ New Key'}</button>
      </div>

      <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-sm text-indigo-300/70 mb-2">Use API keys to call Nexus agents from your own applications.</p>
        <div className="p-3 rounded-lg font-mono text-[11px]" style={{ background: 'rgba(0,0,0,0.3)', color: '#6ee7b7' }}>
          curl -X POST https://agentforcecrew.com/api/v1/run <br />
          {'  '}-H &quot;Content-Type: application/json&quot; <br />
          {'  '}-d &apos;{'{'}&quot;prompt&quot;: &quot;Analyze Q4 revenue&quot;, &quot;agent_name&quot;: &quot;Financial Analyst&quot;{'}'}&apos;
        </div>
      </div>

      {showCreate && (
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-3">Create API Key</div>
          <div className="flex gap-2">
            <input type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Key name (e.g. Production, Staging)" className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} />
            <button onClick={generateKey} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Generate</button>
          </div>
        </div>
      )}

      {keys.length === 0 && !showCreate ? (
        <div className="text-center py-16 rounded-xl" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <h3 className="text-lg font-semibold mb-1">No API keys yet</h3>
          <p className="text-sm text-indigo-300/50 mb-4">Create an API key to call Nexus agents from your apps</p>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Create First Key</button>
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map(k => (
            <div key={k.id} className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">{k.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-indigo-300/40">{k.calls} calls</span>
                  <button onClick={() => setKeys(prev => prev.filter(key => key.id !== k.id))} className="text-[10px]" style={{ color: '#f87171' }}>Revoke</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-1.5 rounded font-mono text-[11px] truncate" style={{ background: 'rgba(0,0,0,0.2)', color: '#a5b4fc' }}>{k.key}</div>
                <button onClick={() => copyKey(k.key)} className="px-3 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{copied === k.key ? 'Copied!' : 'Copy'}</button>
              </div>
              <div className="flex gap-4 text-[10px] text-indigo-300/30 mt-2">
                <span>Created: {new Date(k.created).toLocaleDateString()}</span>
                <span>Last used: {k.lastUsed ? new Date(k.lastUsed).toLocaleString() : 'Never'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}