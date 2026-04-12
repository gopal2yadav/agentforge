'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [agents, setAgents] = useState<any[]>([]);
  const [flows, setFlows] = useState<any[]>([]);
  const [crews, setCrews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agents').then(r => r.json()),
      fetch('/api/flows').then(r => r.json()),
      fetch('/api/crews').then(r => r.json()),
    ]).then(([a, f, c]) => {
      setAgents(Array.isArray(a) ? a : []);
      setFlows(Array.isArray(f) ? f : []);
      setCrews(Array.isArray(c) ? c : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const q = query.toLowerCase();
  const filteredAgents = q ? agents.filter(a => a.name.toLowerCase().includes(q) || a.role?.toLowerCase().includes(q) || a.goal?.toLowerCase().includes(q)) : [];
  const filteredFlows = q ? flows.filter(f => f.name.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q)) : [];
  const filteredCrews = q ? crews.filter(c => c.name.toLowerCase().includes(q)) : [];
  const totalResults = filteredAgents.length + filteredFlows.length + filteredCrews.length;

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Search</h1>
      <p className="text-sm text-indigo-300/50 mb-6">Search across {agents.length} agents, {flows.length} flows, and {crews.length} crews</p>

      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search agents, flows, crews..." className="w-full px-5 py-4 rounded-xl text-base mb-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.2)', color: '#e0e7ff', backdropFilter: 'blur(12px)' }} autoFocus />

      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : !q ? (
        <div className="text-center py-12 text-indigo-300/40 text-sm">Type to search your platform data...</div>
      ) : totalResults === 0 ? (
        <div className="text-center py-12 text-indigo-300/40 text-sm">No results for "{query}"</div>
      ) : (
        <div className="space-y-6">
          {filteredAgents.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-indigo-400/50 uppercase tracking-wider mb-3">Agents ({filteredAgents.length})</div>
              <div className="space-y-2">{filteredAgents.map(a => (
                <Link key={a.id} href={'/playground?agent=' + encodeURIComponent(a.name)} className="block rounded-xl p-4 transition-all hover:translate-y-[-1px]" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div className="font-semibold text-sm">{a.name}</div>
                  <div className="text-xs text-indigo-300/50">{a.role} | {(a.tools||[]).length} tools | {a.runs || 0} runs</div>
                </Link>
              ))}</div>
            </div>
          )}
          {filteredFlows.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-indigo-400/50 uppercase tracking-wider mb-3">Flows ({filteredFlows.length})</div>
              <div className="space-y-2">{filteredFlows.map(fl => (
                <div key={fl.id} className="rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div className="font-semibold text-sm">{fl.name}</div>
                  <div className="text-xs text-indigo-300/50">{fl.description || 'No description'} | {fl.trigger}</div>
                </div>
              ))}</div>
            </div>
          )}
          {filteredCrews.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-indigo-400/50 uppercase tracking-wider mb-3">Crews ({filteredCrews.length})</div>
              <div className="space-y-2">{filteredCrews.map(c => (
                <div key={c.id} className="rounded-xl p-4" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-indigo-300/50">{c.config?.agents?.length || 0} agents | {c.config?.process || 'sequential'}</div>
                </div>
              ))}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}