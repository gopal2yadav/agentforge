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
          <h1 className="text-2xl font-bold tracking-tight mb-1">Knowledge Base</h1>
          <p className="text-sm text-[#6b6b8a]">Upload documents and data sources for your agents to reference</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Add Source
        </button>
      </div>
      {showUpload && (
        <div className="bg-[#14141f]/40 border border-dashed border-[#6366f1]/40 rounded-xl p-8 mb-4 text-center">
          <div className="text-3xl mb-3">\u2191</div>
          <div className="text-sm font-semibold mb-1">Upload Documents</div>
          <div className="text-xs text-[#6b6b8a] mb-4">Drag and drop PDF, DOCX, CSV, MD, or TXT files</div>
          <div className="flex items-center justify-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Browse Files</button>
            <button className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Connect URL</button>
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Sources</div>
          <div className="text-2xl font-bold mt-1">{SOURCES.length}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Documents</div>
          <div className="text-2xl font-bold mt-1">{SOURCES.reduce((a, s) => a + s.docs, 0)}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Chunks</div>
          <div className="text-2xl font-bold mt-1">{SOURCES.reduce((a, s) => a + s.chunks, 0).toLocaleString()}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Total Size</div>
          <div className="text-2xl font-bold mt-1">15.3 MB</div>
        </div>
      </div>
      <div className="space-y-3">
        {SOURCES.map(s => (
          <div key={s.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[10px] font-bold text-[#6366f1]">{s.type}</div>
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#6b6b8a]">{s.docs} docs</span>
                    <span className="text-[10px] text-[#6b6b8a]">{s.chunks.toLocaleString()} chunks</span>
                    <span className="text-[10px] text-[#6b6b8a]">{s.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[#4a4a5a]">{s.lastSync}</span>
                <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold " + (s.status === 'synced' ? 'bg-green-400/10 text-green-400' : 'bg-blue-400/10 text-blue-400')}>{s.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}