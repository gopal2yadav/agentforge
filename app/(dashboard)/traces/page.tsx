'use client';
import { useState } from 'react';
const TRACES = [
  { id: 'tr_001', agent: 'Research Agent', prompt: 'Analyze Q1 market trends', status: 'completed', tokens: 3200, latency: 1850, time: '15 min ago', steps: [{ name: 'web_search', ms: 1230, tok: 0, ok: true, info: '8 results returned' }, { name: 'LLM Generation', ms: 420, tok: 1880, ok: true, info: 'claude-sonnet-4' }, { name: 'Output', ms: 66, tok: 0, ok: true, info: 'Structured report' }] },
  { id: 'tr_002', agent: 'Code Reviewer', prompt: 'Review PR #142', status: 'completed', tokens: 2800, latency: 2100, time: '1 hour ago', steps: [{ name: 'github_pr', ms: 890, tok: 0, ok: true, info: '+142 -28 lines' }, { name: 'code_analyzer', ms: 340, tok: 0, ok: true, info: '3 warnings' }, { name: 'LLM Generation', ms: 780, tok: 2705, ok: true, info: '3 suggestions' }] },
  { id: 'tr_003', agent: 'Data Analyst', prompt: 'Process Q1 revenue CSV', status: 'failed', tokens: 450, latency: 30000, time: '3 hours ago', steps: [{ name: 'csv_parser', ms: 1200, tok: 0, ok: true, info: '1,240 rows parsed' }, { name: 'LLM Generation', ms: 30000, tok: 365, ok: false, info: 'Timeout: OpenAI API 30s' }] },
];
export default function TracesPage() {
  const [exp, setExp] = useState<string | null>(null);
  const sc = (s: string) => s === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600';
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Traces</h1><p className="text-sm text-gray-500">Click to expand execution steps</p></div>
      <div className="space-y-3">{TRACES.map(t => (
        <div key={t.id} className={'bg-white border rounded-xl shadow-sm transition-all ' + (exp === t.id ? 'border-indigo-200 shadow-md' : 'border-gray-200')}>
          <div onClick={() => setExp(exp === t.id ? null : t.id)} className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 flex-1 min-w-0"><div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{t.agent.charAt(0)}</div><div><div className="text-sm font-medium text-gray-900">{t.agent}</div><div className="text-xs text-gray-500 truncate">{t.prompt}</div></div></div>
            <div className="flex items-center gap-4 shrink-0"><span className="text-[10px] text-gray-400">{t.time}</span><span className="text-[10px] text-gray-400">{t.tokens} tok</span><span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + sc(t.status)}>{t.status}</span></div>
          </div>
          {exp === t.id && (
            <div className="px-5 pb-4 border-t border-gray-100 pt-3">
              <div className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Steps</div>
              {t.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="flex flex-col items-center mt-1"><div className={'w-2.5 h-2.5 rounded-full ' + (s.ok ? 'bg-emerald-500' : 'bg-red-500')} />{i < t.steps.length - 1 && <div className="w-px h-6 bg-gray-200 mt-1" />}</div>
                  <div className="flex-1"><div className="flex justify-between"><span className="text-xs font-medium text-gray-900">{s.name}</span><span className="text-[10px] text-gray-400">{s.ms}ms{s.tok > 0 ? ' / ' + s.tok + ' tok' : ''}</span></div><div className={'text-[11px] mt-0.5 ' + (s.ok ? 'text-gray-500' : 'text-red-600 font-mono')}>{s.info}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}</div>
    </div>
  );
}