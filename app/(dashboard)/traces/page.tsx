'use client';
import { useState } from 'react';

const TRACES = [
  { id: 't1', crew: 'Content Pipeline', status: 'completed', duration: '4.2s', tokens: 8400, steps: 4, startedAt: '2026-04-11 07:34' },
  { id: 't2', crew: 'Bug Triage', status: 'failed', duration: '2.1s', tokens: 2800, steps: 3, startedAt: '2026-04-11 07:33' },
  { id: 't3', crew: 'Data Analysis', status: 'completed', duration: '5.8s', tokens: 12400, steps: 3, startedAt: '2026-04-11 07:25' },
  { id: 't4', crew: 'Lead Enrichment', status: 'completed', duration: '3.1s', tokens: 5200, steps: 2, startedAt: '2026-04-11 07:20' },
];

export default function TracesPage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Traces</h1>
        <p className="text-sm text-[#6b6b8a]">Detailed execution traces for debugging and optimization</p>
      </div>
      <div className="space-y-3">
        {TRACES.map((t) => (
          <div key={t.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={"w-2.5 h-2.5 rounded-full " + (t.status === 'completed' ? 'bg-green-400' : 'bg-red-400')} />
                <div>
                  <div className="text-sm font-semibold">{t.crew}</div>
                  <div className="text-[11px] text-[#6b6b8a]">{t.startedAt} · {t.steps} steps</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-[#6b6b8a]">
                <span>{t.duration}</span>
                <span>{t.tokens.toLocaleString()} tokens</span>
                <span className={"px-2 py-0.5 rounded-full text-[10px] font-semibold " + (t.status === 'completed' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400')}>{t.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
