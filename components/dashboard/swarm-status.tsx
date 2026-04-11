'use client';
import { useState, useEffect } from 'react';

export function SwarmStatusBar() {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const check = async () => {
      try {
        const r = await fetch('/api/swarm');
        if (r.ok) setStatus('active');
      } catch { setStatus('offline'); }
    };
    check();
    const interval = setInterval(check, 300000);
    return () => clearInterval(interval);
  }, []);
  const color = status === 'active' ? 'bg-emerald-500' : status === 'offline' ? 'bg-red-400' : 'bg-amber-400';
  return (
    <div className="flex items-center gap-2 text-[11px] text-gray-500">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      Swarm {status === 'active' ? 'operational' : status}
      <span className="text-gray-300">|</span>
      <span>7 agents active</span>
    </div>
  );
}