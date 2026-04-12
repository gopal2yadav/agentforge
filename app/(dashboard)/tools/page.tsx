'use client';
import { useState, useEffect } from 'react';

export default function ToolsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => { setAgents(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false)); }, []);

  // Build tool usage map from real agent data
  const toolMap: Record<string, { count: number; agents: string[] }> = {};
  agents.forEach(a => (a.tools || []).forEach((t: string) => {
    if (!toolMap[t]) toolMap[t] = { count: 0, agents: [] };
    toolMap[t].count++;
    if (toolMap[t].agents.length < 5) toolMap[t].agents.push(a.name);
  }));

  const tools = Object.entries(toolMap).sort((a, b) => b[1].count - a[1].count);
  const totalTools = tools.length;

  const toolDescriptions: Record<string, string> = {
    web_search: 'Search the web for real-time information',
    document_reader: 'Read and extract content from documents',
    summarizer: 'Summarize long text into key points',
    code_analyzer: 'Analyze code for bugs, quality, and patterns',
    github_pr: 'Create and review GitHub pull requests',
    linter: 'Check code style and enforce best practices',
    sql_query: 'Execute SQL queries against databases',
    csv_parser: 'Parse and analyze CSV/spreadsheet data',
    chart_generator: 'Create charts and data visualizations',
    email_sender: 'Compose and send professional emails',
    slack_notifier: 'Send notifications to Slack channels',
    calendar: 'Manage calendar events and scheduling',
  };

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Tools</h1>
      <p className="text-sm text-indigo-300/50 mb-6">{totalTools} unique tools used across {agents.length} agents</p>

      <div className="grid grid-cols-2 gap-4">
        {tools.map(([name, data]) => (
          <div key={name} className="rounded-xl p-5 transition-all hover:translate-y-[-1px]" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono font-semibold" style={{ color: '#a5b4fc' }}>{name}</span>
              <span className="text-xs font-semibold" style={{ color: '#6ee7b7' }}>{data.count} agents</span>
            </div>
            <p className="text-xs text-indigo-300/50 mb-3">{toolDescriptions[name] || 'Custom tool'}</p>
            <div className="flex flex-wrap gap-1">
              {data.agents.map(a => (
                <span key={a} className="px-2 py-0.5 rounded text-[8px]" style={{ background: 'rgba(99,102,241,0.08)', color: '#818cf8' }}>{a}</span>
              ))}
              {data.count > 5 && <span className="text-[8px] text-indigo-400/40">+{data.count - 5} more</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}