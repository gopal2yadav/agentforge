'use client';
import { useState } from 'react';

const SOURCES = [
  { id: '1', name: 'Company Policies', type: 'PDF', docs: 12, chunks: 847, lastSync: '2 hours ago', status: 'synced', size: '4.2 MB' },
  { id: '2', name: 'Product Documentation', type: 'Markdown', docs: 34, chunks: 2103, lastSync: '1 hour ago', status: 'synced', size: '8.1 MB' },
  { id: '3', name: 'Customer FAQ', type: 'CSV', docs: 1, chunks: 156, lastSync: '30 min ago', status: 'synced', size: '245 KB' },
  { id: '4', name: 'Sales Playbook', type: 'DOCX', docs: 5, chunks: 312, lastSync: 'Syncing...', status: 'syncing', size: '2.8 MB' },
];

export default function KnowledgePage() {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Knowledge Base</h1>
          <p className="text-sm text-gray-500">Upload documents and data sources for your agents</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">+ Add Source</button>
      </div>
      {showUpload && (
        <div className="bg-white border-2 border-dashed border-indigo-200 rounded-xl p-8 mb-4 text-center">
          <div className="text-3xl mb-3 text-indigo-400">\u2191</div>
          <div className="text-sm font-semibold text-gray-900 mb-1">Upload Documents</div>
          <div className="text-xs text-gray-500 mb-4">Drag and drop PDF, DOCX, CSV, MD, or TXT files</div>
          <div className="flex items-center justify-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Browse Files</button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600">Connect URL</button>
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-400">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[{ l: 'Sources', v: SOURCES.length }, { l: 'Documents', v: SOURCES.reduce((a,s) => a+s.docs, 0) }, { l: 'Chunks', v: SOURCES.reduce((a,s) => a+s.chunks, 0).toLocaleString() }, { l: 'Total Size', v: '15.3 MB' }].map(m => (
          <div key={m.l} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider">{m.l}</div>
            <div className="text-2xl font-bold mt-1 text-gray-900">{m.v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {SOURCES.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">{s.type}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-gray-400">{s.docs} docs</span>
                    <span className="text-[10px] text-gray-400">{s.chunks.toLocaleString()} chunks</span>
                    <span className="text-[10px] text-gray-400">{s.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-gray-400">{s.lastSync}</span>
                <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold " + (s.status === 'synced' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700')}>{s.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}