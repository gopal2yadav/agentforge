'use client';
import Link from 'next/link';
export default function PlaygroundHistoryPage() {
  const sessions = [
    { id: 's1', agent: 'Research Agent', prompt: 'Analyze Q1 EdTech market trends', response: 'Key trend: AI tutoring adoption +340% YoY...', tokens: 3200, time: '15 min ago' },
    { id: 's2', agent: 'Code Reviewer', prompt: 'Review this auth middleware implementation', response: '3 suggestions: const usage, error handling, cleanup', tokens: 2800, time: '1 hour ago' },
    { id: 's3', agent: 'Writer Agent', prompt: 'Draft blog post about AI in Healthcare 2026', response: 'Report draft: 2,400 words, 3 sections with citations...', tokens: 5100, time: '2 hours ago' },
    { id: 's4', agent: 'Data Analyst', prompt: 'Process Q1 revenue CSV and show trends', response: 'Error: Connection timeout after 30s', tokens: 450, time: '3 hours ago' },
    { id: 's5', agent: 'Research Agent', prompt: 'GDPR compliance requirements for SaaS companies', response: 'Article 5 principles: lawfulness, fairness, transparency...', tokens: 5800, time: '5 hours ago' },
  ];
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Playground History</h1><p className="text-sm text-gray-500">Your saved playground sessions</p></div>
        <Link href="/playground" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">New Session</Link>
      </div>
      <div className="space-y-3">
        {sessions.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{s.agent.charAt(0)}</div>
                <span className="text-sm font-semibold text-gray-900">{s.agent}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{s.tokens.toLocaleString()} tokens</span>
                <span>{s.time}</span>
              </div>
            </div>
            <div className="mb-2"><span className="text-xs text-gray-400">Prompt:</span><div className="text-sm text-gray-700 mt-0.5">{s.prompt}</div></div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100"><span className="text-xs text-gray-400">Response:</span><div className="text-xs text-gray-600 mt-0.5 font-mono">{s.response}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}