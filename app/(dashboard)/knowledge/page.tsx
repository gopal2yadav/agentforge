'use client';
import { useState } from 'react';

const SOURCES = [
  { id: '1', name: 'Product Documentation', type: 'pdf', chunks: 342, size: '4.2 MB', updated: '2 hours ago', status: 'indexed' },
  { id: '2', name: 'API Reference v2', type: 'markdown', chunks: 128, size: '1.8 MB', updated: '1 day ago', status: 'indexed' },
  { id: '3', name: 'Customer FAQ', type: 'csv', chunks: 89, size: '256 KB', updated: '3 days ago', status: 'indexed' },
  { id: '4', name: 'Sales Playbook 2026', type: 'pdf', chunks: 0, size: '8.1 MB', updated: 'Just now', status: 'processing' },
];

export default function KnowledgePage() {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Knowledge Base</h1>
          <p className="text-sm text-[#6b6b8a]">Upload documents for agents to reference via RAG</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">+ Upload Document</button>
      </div>
      {showUpload && (
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 border-dashed rounded-xl p-8 mb-4 text-center">
          <div className="text-3xl mb-3">\u2B06</div>
          <div className="text-sm font-semibold mb-1">Drop files here or click to browse</div>
          <div className="text-xs text-[#6b6b8a]">Supports PDF, Markdown, CSV, TXT, DOCX (max 50MB)</div>
          <div className="flex gap-2 justify-center mt-4">
            <button className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">Browse Files</button>
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Total Sources</div>
          <div className="text-2xl font-bold mt-1 text-white">{SOURCES.length}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Total Chunks</div>
          <div className="text-2xl font-bold mt-1 text-[#6366f1]">{SOURCES.reduce((a, s) => a + s.chunks, 0)}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Indexed</div>
          <div className="text-2xl font-bold mt-1 text-green-400">{SOURCES.filter(s => s.status === 'indexed').length}</div>
        </div>
      </div>
      <div className="space-y-3">
        {SOURCES.map((source) => (
          <div key={source.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8] text-[10px] font-bold uppercase">{source.type}</div>
                <div>
                  <div className="text-sm font-semibold">{source.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#6b6b8a]">{source.chunks} chunks</span>
                    <span className="text-[10px] text-[#6b6b8a]">{source.size}</span>
                    <span className="text-[10px] text-[#4a4a5a]">Updated {source.updated}</span>
                  </div>
                </div>
              </div>
              <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + (source.status === 'indexed' ? 'bg-green-400/10 text-green-400' : 'bg-amber-400/10 text-amber-400')}>{source.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}