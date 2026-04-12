'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FlowsPage() {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/flows').then(r => r.json()).then(d => { setFlows(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this flow?')) return;
    await fetch('/api/flows?id=' + id, { method: 'DELETE' });
    setFlows(flows.filter((fl: any) => fl.id !== id));
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Flows</h1>
          <p className="text-sm text-gray-500">{flows.length} workflows configured</p>
        </div>
        <Link href="/flows/create" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Flow</Link>
      </div>
      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading flows...</p></div>
      ) : flows.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="text-4xl mb-3">\u{1F504}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No flows yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create multi-agent workflows to automate tasks</p>
          <Link href="/flows/create" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Flow</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {flows.map((fl: any) => (
            <div key={fl.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-sm font-bold">\u{1F504}</div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">{fl.name}</div>
                    <div className="text-xs text-gray-500">{fl.description || 'No description'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-gray-100 text-gray-600">{fl.trigger || 'Manual'}</span>
                  <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (fl.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{fl.status}</span>
                  <button onClick={() => handleDelete(fl.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{Array.isArray(fl.steps) ? fl.steps.length : 0} steps</span>
                <span>{fl.runs || 0} runs</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}