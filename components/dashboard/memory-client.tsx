'use client';

import { useState } from 'react';

interface Memory { id: string; scope: string; content: string; importance: number; accessCount: number; updatedAt: string; }

export function MemoryClient({ memories }: { memories: Memory[] }) {
  const [search, setSearch] = useState('');
  const filtered = memories.filter(m => m.content.toLowerCase().includes(search.toLowerCase()) || m.scope.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Memory Explorer</h1>
          <p className="text-sm text-[#6b6b8a]">{memories.length} memories stored</p>
        </div>
      </div>
      <div className="mb-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search memories..."
          className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1] transition-colors" />
      </div>
      <div className="space-y-3">
        {filtered.map((mem) => (
          <div key={mem.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#6366f1] bg-[#6366f1]/10 px-2 py-0.5 rounded uppercase">{mem.scope}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#6b6b8a]">importance: {Math.round(mem.importance * 100)}%</span>
                <span className="text-[10px] text-[#6b6b8a]">{mem.accessCount} accesses</span>
              </div>
            </div>
            <p className="text-sm text-[#a0a0b8] leading-relaxed">{mem.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}