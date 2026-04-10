'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Memory { id: string; scope: string; content: string; importance: number; accessCount: number; updatedAt: string; }

export function MemoryClient({ memories }: { memories: Memory[] }) {
  const [q, setQ] = useState('');
  const filtered = q ? memories.filter(m=>m.content.toLowerCase().includes(q.toLowerCase())) : memories;
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-display font-bold mb-1">Memory Explorer</h1>
      <p className="text-sm text-nexus-400 mb-6">Browse agent knowledge</p>
      <div className="flex items-center gap-2 px-4 py-3 bg-nexus-800/40 border border-nexus-700/30 rounded-xl mb-5">
        <Search className="w-4 h-4 text-nexus-500"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search memories..." className="flex-1 bg-transparent text-sm text-nexus-100 outline-none"/>
        {q&&<button onClick={()=>setQ('')}><X className="w-4 h-4 text-nexus-500"/></button>}
      </div>
      {filtered.length===0?(<div className="text-center py-16 text-nexus-500"><Brain className="w-12 h-12 mx-auto mb-4 opacity-30"/><p className="text-sm">No memories yet</p></div>):(
      <div className="space-y-3">{filtered.map((m,i)=><motion.div key={m.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl p-5"><div className="flex justify-between mb-3"><span className="font-mono text-xs text-electric bg-electric/8 px-2 py-1 rounded">{m.scope}</span><div className="text-[11px] text-nexus-500">{m.importance>0.8?'ðŸŸ¡':'ðŸŸ '} {(m.importance*100).toFixed(0)}% | {m.accessCount} hits</div></div><p className="text-sm text-nexus-200">{m.content}</p></motion.div>)}</div>)}
    </div>
  );
}
