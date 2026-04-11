'use client';
import { useState } from 'react';
export default function ToolsBuilderPage() {
  const tools = [
    { id: 'web_search', name: 'Web Search', type: 'built-in', desc: 'Search the web for real-time information', agents: 2, calls: 1240 },
    { id: 'github_pr', name: 'GitHub PR Reader', type: 'built-in', desc: 'Read pull request details, diffs, and comments', agents: 1, calls: 89 },
    { id: 'sql_query', name: 'SQL Query', type: 'built-in', desc: 'Execute read-only SQL queries on connected databases', agents: 1, calls: 67 },
    { id: 'slack_send', name: 'Slack Notifier', type: 'integration', desc: 'Send messages to Slack channels and threads', agents: 2, calls: 340 },
    { id: 'email_draft', name: 'Email Drafter', type: 'integration', desc: 'Draft and send emails via connected email accounts', agents: 1, calls: 98 },
    { id: 'csv_parser', name: 'CSV Parser', type: 'built-in', desc: 'Parse and analyze CSV files with column mapping', agents: 1, calls: 45 },
    { id: 'custom_api', name: 'Custom API Call', type: 'custom', desc: 'Make authenticated HTTP requests to any API endpoint', agents: 0, calls: 0 },
  ];
  const typeColor = (t) => t === 'built-in' ? 'bg-indigo-50 text-indigo-600' : t === 'integration' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600';
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Tools & Functions</h1><p className="text-sm text-gray-500">Built-in tools, integrations, and custom functions available to agents</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create Tool</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Tools</div><div className="text-xl font-bold text-gray-900 mt-1">{tools.length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Tool Calls (30d)</div><div className="text-xl font-bold text-indigo-600 mt-1">{tools.reduce((a, t) => a + t.calls, 0).toLocaleString()}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Custom</div><div className="text-xl font-bold text-amber-600 mt-1">{tools.filter(t => t.type === 'custom').length}</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {tools.map((t, i) => (
          <div key={t.id} className={'px-5 py-4 flex items-center justify-between' + (i < tools.length - 1 ? ' border-b border-gray-100' : '') + ' hover:bg-gray-50 transition-colors'}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 text-xs font-mono font-bold border border-gray-100">{t.name.substring(0, 2).toUpperCase()}</div>
              <div><div className="text-sm font-medium text-gray-900">{t.name}</div><div className="text-[11px] text-gray-400">{t.desc}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-400">{t.agents} agents</span>
              <span className="text-[10px] text-gray-400">{t.calls.toLocaleString()} calls</span>
              <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + typeColor(t.type)}>{t.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}