'use client';
import { useState, useEffect } from 'react';

export function SwarmStatusBar() {
  const [status, setStatus] = useState('operational');
  const [agents, setAgents] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => Math.max(4, Math.min(8, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[11px] text-[#6b6b8a]">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span>Swarm {status}</span>
      </div>
      <span className="text-[#2a2a3d]">|</span>
      <span>{agents} agents active</span>
    </div>
  );
}