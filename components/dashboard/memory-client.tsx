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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Memory Explorer</h1>
          <p className="text-sm text-gray-500">{memories.length} memories stored</p>
        </div>
      </div>
      <div className="mb-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search memories..."
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors shadow-sm" />
      </div>
      <div className="space-y-3">
        {filtered.map((mem) => (
          <div key={mem.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{mem.scope}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400">importance: {Math.round(mem.importance * 100)}%</span>
                <span className="text-[10px] text-gray-400">{mem.accessCount} accesses</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{mem.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}