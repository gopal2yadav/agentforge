'use client';
import { useState } from 'react';

const METRICS = [
  { time: '00:00', requests: 120, errors: 2, latency: 180 },
  { time: '04:00', requests: 45, errors: 0, latency: 150 },
  { time: '08:00', requests: 280, errors: 5, latency: 220 },
  { time: '12:00', requests: 450, errors: 8, latency: 195 },
  { time: '16:00', requests: 380, errors: 3, latency: 210 },
  { time: '20:00', requests: 220, errors: 1, latency: 175 },
];

const ALERTS = [
  { id: '1', type: 'warning', message: 'Agent "Data Analyst" latency above 3s threshold', time: '2 hours ago' },
  { id: '2', type: 'info', message: 'Flow "Content Pipeline" completed successfully (34th run)', time: '4 hours ago' },
  { id: '3', type: 'error', message: 'Rate limit approaching for OpenAI API (85% used)', time: '6 hours ago' },
];

export default function MonitoringPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const maxReqs = Math.max(...METRICS.map(m => m.requests));

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Monitoring</h1>
          <p className="text-sm text-[#6b6b8a]">Real-time platform health and analytics</p>
        </div>
        <div className="flex gap-1 bg-[#14141f] border border-[#2a2a3d] rounded-lg p-0.5">
          {['1h', '6h', '24h', '7d'].map(r => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={'px-3 py-1.5 rounded-md text-xs font-medium transition-colors ' + (timeRange === r ? 'bg-[#6366f1] text-white' : 'text-[#6b6b8a] hover:text-white')}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Uptime', value: '99.97%', color: '#22c55e' },
          { label: 'Avg Latency', value: '195ms', color: '#6366f1' },
          { label: 'Error Rate', value: '0.3%', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
            <div className="text-[11px] text-[#6b6b8a] font-semibold uppercase tracking-wider">{s.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold mb-4">Request Volume ({timeRange})</h2>
        <div className="flex items-end gap-2 h-32">
          {METRICS.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[#6366f1]/20 rounded-t relative" style={{ height: (m.requests / maxReqs * 100) + '%' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1] to-[#818cf8] rounded-t" style={{ height: '100%' }} />
              </div>
              <span className="text-[9px] text-[#4a4a5a]">{m.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl">
        <div className="px-5 py-4 border-b border-[#2a2a3d]">
          <h2 className="text-sm font-semibold">Recent Alerts</h2>
        </div>
        <div className="divide-y divide-[#2a2a3d]">
          {ALERTS.map(a => (
            <div key={a.id} className="px-5 py-3 flex items-center gap-3">
              <span className={'w-2 h-2 rounded-full ' + (a.type === 'error' ? 'bg-red-400' : a.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400')} />
              <span className="text-sm flex-1">{a.message}</span>
              <span className="text-[11px] text-[#6b6b8a]">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}