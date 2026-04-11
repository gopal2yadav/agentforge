'use client';
import { useState } from 'react';

const TRACES = [
  { id: 'tr_1', crew: 'Research Pipeline', status: 'completed', startedAt: '2026-04-11 07:41:35', duration: '4.2s', tokens: 8400, cost: '$0.042',
    steps: [
      { agent: 'Research Agent', action: 'search_web', input: 'Q1 2026 market trends EdTech', output: 'Found 12 relevant sources...', duration: '1.2s', tokens: 2100 },
      { agent: 'Research Agent', action: 'analyze_content', input: 'Summarize findings from sources', output: 'Key trend: AI tutoring adoption +340% YoY...', duration: '1.8s', tokens: 3200 },
      { agent: 'Writer Agent', action: 'draft_report', input: 'Create executive summary', output: 'Report draft: 2,400 words, 3 sections...', duration: '1.2s', tokens: 3100 },
    ]},
  { id: 'tr_2', crew: 'Code Review Flow', status: 'completed', startedAt: '2026-04-11 07:28:12', duration: '2.1s', tokens: 2800, cost: '$0.014',
    steps: [
      { agent: 'Code Reviewer', action: 'analyze_pr', input: 'PR #142: Add auth middleware', output: '3 suggestions: const usage, error handling, cleanup', duration: '1.5s', tokens: 1900 },
      { agent: 'Code Reviewer', action: 'post_review', input: 'Submit review to GitHub', output: 'Review posted successfully', duration: '0.6s', tokens: 900 },
    ]},
  { id: 'tr_3', crew: 'Data Analysis', status: 'failed', startedAt: '2026-04-11 07:15:22', duration: '30.4s', tokens: 450, cost: '$0.002',
    steps: [
      { agent: 'Data Analyst', action: 'connect_source', input: 'Connect to PostgreSQL', output: 'Connection timeout after 30s', duration: '30.0s', tokens: 450 },
    ]},
];

export default function TracesPage() {
  const [expanded, setExpanded] = useState(null);
  const statusStyle = (s) => s === 'completed' ? 'bg-emerald-50 text-emerald-700' : s === 'failed' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700';

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Traces</h1>
        <p className="text-sm text-gray-500">Inspect agent execution traces and step-by-step reasoning</p>
      </div>
      <div className="space-y-3">
        {TRACES.map(trace => (
          <div key={trace.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button onClick={() => setExpanded(expanded === trace.id ? null : trace.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className={"px-2 py-0.5 rounded-full text-[10px] font-semibold " + statusStyle(trace.status)}>{trace.status}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{trace.crew}</div>
                  <div className="text-[11px] text-gray-400">{trace.startedAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[11px] text-gray-400">
                <span>{trace.duration}</span>
                <span>{trace.tokens.toLocaleString()} tokens</span>
                <span>{trace.cost}</span>
                <span>{expanded === trace.id ? '\u25B2' : '\u25BC'}</span>
              </div>
            </button>
            {expanded === trace.id && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-gray-50">
                {trace.steps.map((step, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Step {i + 1}</span>
                        <span className="text-xs font-semibold text-gray-900">{step.agent}</span>
                        <span className="text-[10px] font-mono text-gray-400">{step.action}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span>{step.duration}</span>
                        <span>{step.tokens} tok</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-1"><span className="text-gray-400">Input:</span> {step.input}</div>
                    <div className="text-xs text-gray-700"><span className="text-gray-400">Output:</span> {step.output}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}