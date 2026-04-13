'use client';
import { useState } from 'react';

export default function EmbedPage() {
  const [agentName, setAgentName] = useState('');
  const [theme, setTheme] = useState('dark');
  const [position, setPosition] = useState('bottom-right');
  const [copied, setCopied] = useState(false);

  const embedCode = '<script src="https://agentforcecrew.com/embed.js" data-agent="' + agentName + '" data-theme="' + theme + '" data-position="' + position + '"></script>';
  const apiExample = 'fetch("https://agentforcecrew.com/api/v1/run", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({\n    agent_name: "' + (agentName || 'Your Agent') + '",\n    prompt: "User question here"\n  })\n})';

  const copyCode = (code: string) => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Embed Agent</h1>
      <p className="text-sm text-indigo-300/50 mb-6">Add an AI chat widget to your website — powered by your Nexus agents</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="text-sm font-semibold mb-4">Configure Widget</div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Agent Name</label>
                <input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="e.g. Customer Support" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} />
              </div>
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Theme</label>
                <div className="flex gap-2">
                  {['dark', 'light'].map(t => (
                    <button key={t} onClick={() => setTheme(t)} className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all" style={theme === t ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' } : { color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(99,102,241,0.1)' }}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-indigo-300/40 block mb-1">Position</label>
                <div className="flex gap-2">
                  {['bottom-right', 'bottom-left'].map(p => (
                    <button key={p} onClick={() => setPosition(p)} className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all" style={position === p ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' } : { color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(99,102,241,0.1)' }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Embed Code</div>
              <button onClick={() => copyCode(embedCode)} className="text-[10px]" style={{ color: '#a5b4fc' }}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <div className="p-3 rounded-lg font-mono text-[10px] leading-relaxed overflow-x-auto" style={{ background: 'rgba(0,0,0,0.3)', color: '#6ee7b7' }}>{embedCode}</div>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">API Integration</div>
              <button onClick={() => copyCode(apiExample)} className="text-[10px]" style={{ color: '#a5b4fc' }}>Copy</button>
            </div>
            <pre className="p-3 rounded-lg font-mono text-[10px] leading-relaxed overflow-x-auto whitespace-pre" style={{ background: 'rgba(0,0,0,0.3)', color: '#93c5fd' }}>{apiExample}</pre>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Preview</div>
          <div className="rounded-xl overflow-hidden relative" style={{ background: theme === 'dark' ? '#0a0a1a' : '#f8f9fa', border: '1px solid rgba(99,102,241,0.15)', height: '500px' }}>
            <div className="p-4">
              <div className="w-full h-8 rounded-lg mb-3" style={{ background: theme === 'dark' ? 'rgba(99,102,241,0.1)' : '#e5e7eb' }} />
              <div className="w-3/4 h-4 rounded mb-2" style={{ background: theme === 'dark' ? 'rgba(99,102,241,0.08)' : '#e5e7eb' }} />
              <div className="w-1/2 h-4 rounded" style={{ background: theme === 'dark' ? 'rgba(99,102,241,0.06)' : '#e5e7eb' }} />
            </div>
            <div className={'absolute ' + (position === 'bottom-right' ? 'right-4 bottom-4' : 'left-4 bottom-4')}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg cursor-pointer" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>N</div>
            </div>
            <div className={'absolute ' + (position === 'bottom-right' ? 'right-4 bottom-20' : 'left-4 bottom-20')} style={{ width: '300px' }}>
              <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: theme === 'dark' ? 'rgba(15,15,35,0.95)' : '#fff', border: '1px solid ' + (theme === 'dark' ? 'rgba(99,102,241,0.2)' : '#e5e7eb') }}>
                <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                  <div className="text-white text-sm font-semibold">{agentName || 'Nexus AI'}</div>
                  <div className="text-indigo-200 text-[10px]">Powered by agentforcecrew.com</div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="p-2 rounded-lg text-xs" style={{ background: theme === 'dark' ? 'rgba(99,102,241,0.08)' : '#f3f4f6', color: theme === 'dark' ? '#a5b4fc' : '#4f46e5' }}>Hello! How can I help you today?</div>
                  <div className="flex gap-2"><input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 rounded-lg text-xs" style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : '#f9fafb', border: '1px solid ' + (theme === 'dark' ? 'rgba(99,102,241,0.1)' : '#e5e7eb'), color: theme === 'dark' ? '#e0e7ff' : '#111' }} readOnly /><button className="px-3 py-2 rounded-lg text-xs text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Send</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}