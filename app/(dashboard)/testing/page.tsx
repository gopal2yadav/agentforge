'use client';
import { useState } from 'react';
const TEST_CASES = [
  { id: 't1', name: 'Basic Prompt Response', agent: 'Research Agent', input: 'What is EdTech?', expected: 'Should define EdTech with key examples', status: 'passed', latency: 1240, tokens: 890 },
  { id: 't2', name: 'Complex Analysis', agent: 'Research Agent', input: 'Compare top 5 EdTech companies by revenue', expected: 'Table with company names, revenue, growth rates', status: 'passed', latency: 3100, tokens: 4200 },
  { id: 't3', name: 'Code Review Quality', agent: 'Code Reviewer', input: 'Review: function add(a,b){return a+b}', expected: 'Suggest type annotations and error handling', status: 'passed', latency: 1800, tokens: 1500 },
  { id: 't4', name: 'Error Handling', agent: 'Data Analyst', input: 'Process invalid CSV: %%%corrupted%%%', expected: 'Should return graceful error message', status: 'failed', latency: 890, tokens: 200 },
  { id: 't5', name: 'Tool Usage', agent: 'Research Agent', input: 'Search latest AI news today', expected: 'Should invoke web_search tool', status: 'passed', latency: 2400, tokens: 3100 },
  { id: 't6', name: 'Max Token Limit', agent: 'Writer Agent', input: 'Write a 10000 word essay', expected: 'Should truncate at token limit gracefully', status: 'warning', latency: 8200, tokens: 8192 },
];
export default function TestingPage() {
  const [running, setRunning] = useState(false);
  const passed = TEST_CASES.filter(t => t.status === 'passed').length;
  const failed = TEST_CASES.filter(t => t.status === 'failed').length;
  const warns = TEST_CASES.filter(t => t.status === 'warning').length;
  const statusStyle = (s) => s === 'passed' ? 'bg-emerald-50 text-emerald-600' : s === 'failed' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600';
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agent Testing Suite</h1><p className="text-sm text-gray-500">Automated test cases for agent quality assurance</p></div>
        <button onClick={() => { setRunning(true); setTimeout(() => setRunning(false), 2000); }} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">{running ? 'Running Tests...' : 'Run All Tests'}</button>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total</div><div className="text-xl font-bold text-gray-900 mt-1">{TEST_CASES.length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Passed</div><div className="text-xl font-bold text-emerald-600 mt-1">{passed}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Failed</div><div className="text-xl font-bold text-red-600 mt-1">{failed}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Warnings</div><div className="text-xl font-bold text-amber-600 mt-1">{warns}</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {TEST_CASES.map((t, i) => (
          <div key={t.id} className={'px-5 py-4 flex items-start justify-between' + (i < TEST_CASES.length - 1 ? ' border-b border-gray-100' : '') + ' hover:bg-gray-50 transition-colors'}>
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center gap-2 mb-1"><span className="text-sm font-medium text-gray-900">{t.name}</span><span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{t.id}</span></div>
              <div className="text-xs text-gray-500 mb-1"><span className="text-indigo-600 font-medium">{t.agent}</span> &bull; Input: <span className="font-mono">{t.input}</span></div>
              <div className="text-[10px] text-gray-400">Expected: {t.expected}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[10px] text-gray-400">{t.tokens} tok</span>
              <span className="text-[10px] text-gray-400">{t.latency}ms</span>
              <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + statusStyle(t.status)}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Pass rate: {Math.round((passed / TEST_CASES.length) * 100)}%</span>
        <span>Last run: 15 min ago</span>
      </div>
    </div>
  );
}