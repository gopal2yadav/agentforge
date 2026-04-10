'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, X } from 'lucide-react';

interface Memory { id: string; scope: string; content: string; importance: number; accessCount: number; updatedAt: string; }

export function MemoryClient({ memories }: { memories: Memory[] }) {
  const [query, setQuery] = useState('');
  const filtered = query ? memories.filter(m => m.content.toLowerCase().includes(query.toLowerCase())) : memories;
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Memory Explorer</h1>
      <p className="text-sm text-[#6b6b8a] mb-6">Browse agent knowledge</p>
      <div className="flex items-center gap-2 px-4 py-3 bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl mb-5">
        <Search className="w-4 h-4 text-[#6b6b8a]" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search memories..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#6b6b8a]" />
        {query && <button onClick={() => setQuery('')}><X className="w-4 h-4 text-[#6b6b8a]" /></button>}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#6b6b8a]">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No memories yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
              <div className="flex justify-between mb-3">
                <span className="font-mono text-xs text-[#6366f1] bg-[#6366f1]/8 px-2 py-1 rounded">{m.scope}</span>
                <div className="text-[11px] text-[#6b6b8a]">{(m.importance * 100).toFixed(0)}% | {m.accessCount} hits</div>
              </div>
              <p className="text-sm text-[#e0e0e8]">{m.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
