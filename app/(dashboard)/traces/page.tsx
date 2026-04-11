'use client';
import { useState } from 'react';

const TRACES = [
  { id: 'tr_001', agent: 'Research Agent', prompt: 'Analyze Q1 market trends in EdTech', status: 'completed', totalTokens: 3200, latency: 1850, time: '15 min ago',
    steps: [
      { name: 'Input Processing', duration: 45, tokens: 120, status: 'done', detail: 'Parsed prompt, identified intent: market_analysis, sector: EdTech, period: Q1' },
      { name: 'Tool: web_search', duration: 1230, tokens: 0, status: 'done', detail: 'Query: "EdTech market Q1 2026 trends growth" — 8 results returned' },
      { name: 'Context Assembly', duration: 89, tokens: 1200, status: 'done', detail: 'Assembled 8 search results + 2 memory entries into context (1,200 tokens)' },
      { name: 'LLM Generation', duration: 420, tokens: 1880, status: 'done', detail: 'claude-sonnet-4 — 1,880 output tokens generated in 420ms' },
      { name: 'Output Formatting', duration: 66, tokens: 0, status: 'done', detail: 'Formatted as structured report with 3 sections, saved to memory' },
    ]},
  { id: 'tr_002', agent: 'Code Reviewer', prompt: 'Review PR #142: Add auth middleware', status: 'completed', totalTokens: 2800, latency: 2100, time: '1 hour ago',
    steps: [
      { name: 'Input Processing', duration: 38, tokens: 95, status: 'done', detail: 'Parsed PR reference, identified files: middleware/auth.ts, utils/token.ts' },
      { name: 'Tool: github_pr', duration: 890, tokens: 0, status: 'done', detail: 'Fetched PR #142 diff — 3 files changed, +142 -28 lines' },
      { name: 'Tool: code_analyzer', duration: 340, tokens: 0, status: 'done', detail: 'Static analysis: 0 errors, 3 warnings (unused import, any type, missing return type)' },
      { name: 'LLM Generation', duration: 780, tokens: 2705, status: 'done', detail: 'claude-sonnet-4 — Generated 3 review suggestions with code examples' },
      { name: 'Output Formatting', duration: 52, tokens: 0, status: 'done', detail: 'Formatted as PR review comment with inline suggestions' },
    ]},
  { id: 'tr_003', agent: 'Data Analyst', prompt: 'Process Q1 revenue CSV', status: 'failed', totalTokens: 450, latency: 30000, time: '3 hours ago',
    steps: [
      { name: 'Input Processing', duration: 42, tokens: 85, status: 'done', detail: 'Identified input type: CSV processing, output: insights report' },
      { name: 'Tool: csv_parser', duration: 1200, tokens: 0, status: 'done', detail: 'Parsed CSV: 1,240 rows x 8 columns, size: 890KB' },
      { name: 'LLM Generation', duration: 30000, tokens: 365, status: 'error', detail: 'ERROR: Connection timeout — OpenAI API (gpt-4o) unreachable after 30s. Retried 3 times.' },
    ]},
];

export default function TracesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const statusColor = (s: string) => s === 'completed' ? 'bg-emerald-50 text-emerald-600' : s === 'failed' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600';
  const stepColor = (s: string) => s === 'done' ? 'bg-emerald-500' : s === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Traces</h1>
        <p className="text-sm text-gray-500">Step-by-step execution debugging — click a trace to expand</p>
      </div>

      <div className="space-y-3">
        {TRACES.map(t => (
          <div key={t.id} className={'bg-white border rounded-xl shadow-sm transition-all ' + (expanded === t.id ? 'border-indigo-200 shadow-md' : 'border-gray-200')}>
            <div onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-xl">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">{t.agent.charAt(0)}</div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">{t.agent}</div>
                  <div className="text-xs text-gray-500 truncate">{t.prompt}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[10px] text-gray-400">{t.time}</span>
                <span className="text-[10px] text-gray-400">{t.totalTokens.toLocaleString()} tok</span>
                <span className="text-[10px] text-gray-400">{t.latency < 10000 ? t.latency + 'ms' : (t.latency / 1000).toFixed(0) + 's'}</span>
                <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + statusColor(t.status)}>{t.status}</span>
                <span className="text-gray-300 text-xs">{expanded === t.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === t.id && (
              <div className="px-5 pb-4 border-t border-gray-100">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-3 mb-2">Execution Steps</div>
                <div className="space-y-1">
                  {t.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <div className="flex flex-col items-center mt-1">
                        <div className={'w-2.5 h-2.5 rounded-full ' + stepColor(step.status)} />
                        {i < t.steps.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-900">{step.name}</span>
                          <div className="flex items-center gap-3 text-[10px] text-gray-400">
                            {step.tokens > 0 && <span>{step.tokens} tok</span>}
                            <span>{step.duration}ms</span>
                          </div>
                        </div>
                        <div className={'text-[11px] mt-0.5 ' + (step.status === 'error' ? 'text-red-600 font-mono' : 'text-gray-500')}>{step.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Trace ID: {t.id}</span>
                  <span>{t.steps.length} steps &bull; {t.steps.reduce((a, s) => a + s.duration, 0)}ms total</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
