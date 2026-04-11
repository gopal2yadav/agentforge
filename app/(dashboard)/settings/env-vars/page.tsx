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
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Environment Variables</h1><p className="text-sm text-gray-500">Manage secrets and configuration for your agents</p></div>
        <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Add Variable</button>
      </div>
      {showAdd && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input placeholder="KEY_NAME" className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono placeholder-gray-400" />
            <input placeholder="value" className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400" />
            <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"><option>all</option><option>production</option><option>development</option></select>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Save</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-4 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"><span>Key</span><span>Value</span><span>Scope</span><span>Actions</span></div>
        {vars.map(v => (
          <div key={v.key} className="px-5 py-3.5 border-b border-gray-100 last:border-0 grid grid-cols-4 items-center">
            <span className="text-sm font-mono font-medium text-gray-900">{v.key}</span>
            <span className="text-sm font-mono text-gray-400">{v.masked ? v.value.substring(0, 8) + '****' : v.value}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 w-fit">{v.scope}</span>
            <div className="flex gap-2"><button className="text-[11px] text-gray-400 hover:text-gray-900">Edit</button><button className="text-[11px] text-red-400 hover:text-red-600">Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}