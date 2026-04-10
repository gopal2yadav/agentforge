'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const SWARM_AGENTS = [
  { name: 'Monitor', color: '#22c55e', status: 'scanning' },
  { name: 'Coordinator', color: '#6366f1', status: 'routing' },
  { name: 'Debugger', color: '#f59e0b', status: 'idle' },
  { name: 'Optimizer', color: '#22d3ee', status: 'analyzing' },
  { name: 'Improver', color: '#ec4899', status: 'idle' },
  { name: 'Security', color: '#ef4444', status: 'watching' },
];

export function SwarmStatusBar() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setActiveIdx(p => (p+1) % SWARM_AGENTS.length), 3000); return () => clearInterval(t); }, []);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {SWARM_AGENTS.map((a,i)=><div key={a.name} className={cn('w-1.5 h-1.5 rounded-full transition-all',i===activeIdx?'ss-150':'opacity-60')} style={{backgroundColor:a.color,boxShadow:i===activeIdx?`0 0 8px ${a.color}60`:'none'}} title={`${a.name}: ${a.status}`}/>)}
      </div>
      <span className="text-[11px] text-nexus-400 font-mono"><span className="text-nexus-300">{SWARM_AGENTS[activeIdx].name}</span>{' · '}{SWARM_AGENTS[activeIdx].status}</span>
    </div>
  );
}
