'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const AGENTS = {
  '1': { name: 'Research Agent', role: 'Senior Research Analyst', goal: 'Conduct thorough research and provide actionable insights', backstory: 'Expert analyst with 10+ years of experience in market research and competitive intelligence.', model: 'claude-sonnet-4-20250514', provider: 'Anthropic', status: 'ACTIVE', totalRuns: 142, successRate: 97.2, avgLatency: 1850, tokensTotal: 456000, tools: ['web_search', 'document_reader', 'summarizer'] },
  '2': { name: 'Code Reviewer', role: 'Senior Software Engineer', goal: 'Review code for quality, security, and best practices', backstory: 'Experienced engineer who has reviewed thousands of PRs across multiple tech stacks.', model: 'claude-sonnet-4-20250514', provider: 'Anthropic', status: 'IDLE', totalRuns: 89, successRate: 95.5, avgLatency: 2100, tokensTotal: 267000, tools: ['github_pr', 'code_analyzer', 'linter'] },
  '3': { name: 'Data Analyst', role: 'Data Science Lead', goal: 'Process data and generate actionable insights', backstory: 'PhD in Statistics with expertise in time-series analysis and ML-based forecasting.', model: 'gpt-4o', provider: 'OpenAI', status: 'ACTIVE', totalRuns: 67, successRate: 91.0, avgLatency: 3200, tokensTotal: 201000, tools: ['sql_query', 'chart_generator', 'csv_parser'] },
};

const RUNS = [
  { id: 'r1', prompt: 'Analyze Q1 market trends in EdTech', status: 'completed', tokens: 3200, latency: 1850, time: '15 min ago' },
  { id: 'r2', prompt: 'Compare competitors in AI tutoring space', status: 'completed', tokens: 4100, latency: 2300, time: '1 hour ago' },
  { id: 'r3', prompt: 'Summarize investor report for Series B', status: 'completed', tokens: 2800, latency: 1600, time: '3 hours ago' },
  { id: 'r4', prompt: 'Research GDPR compliance requirements', status: 'failed', tokens: 450, latency: 30000, time: '5 hours ago' },
];

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agent = AGENTS[params.id as string] || AGENTS['1'];
  const statusColor = (s: string) => s === 'completed' ? 'bg-emerald-50 text-emerald-600' : s === 'failed' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600';

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/agents" className="hover:text-gray-900 transition-colors">Agents</Link>
        <span>/</span>
        <span className="text-gray-900">{agent.name}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg font-bold">{agent.name.charAt(0)}</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{agent.name}</h1>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/playground" className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">Test Agent</Link>
          <span className={"px-3 py-1 rounded-full text-[11px] font-semibold " + (agent.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{agent.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Runs</div><div className="text-xl font-bold text-gray-900 mt-1">{agent.totalRuns}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Success Rate</div><div className="text-xl font-bold text-emerald-600 mt-1">{agent.successRate}%</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Latency</div><div className="text-xl font-bold text-gray-900 mt-1">{(agent.avgLatency / 1000).toFixed(1)}s</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Tokens</div><div className="text-xl font-bold text-gray-900 mt-1">{(agent.tokensTotal / 1000).toFixed(0)}K</div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Configuration</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Model</span><span className="font-mono text-gray-600">{agent.model}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Provider</span><span className="text-gray-900">{agent.provider}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Goal</span><span className="text-gray-600 text-right max-w-[60%]">{agent.goal}</span></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Tools ({agent.tools.length})</h3>
          <div className="flex flex-wrap gap-2">
            {agent.tools.map(t => (<span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-gray-50 text-gray-600 border border-gray-100">{t}</span>))}
          </div>
          <p className="text-xs text-gray-400 mt-3">{agent.backstory}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100"><h2 className="text-sm font-semibold text-gray-900">Recent Runs</h2></div>
        <div className="divide-y divide-gray-100">
          {RUNS.map(run => (
            <div key={run.id} className="px-5 py-3 flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-sm text-gray-900 truncate">{run.prompt}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{run.time}</div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[11px] text-gray-400">{run.tokens.toLocaleString()} tok</span>
                <span className="text-[11px] text-gray-400">{run.latency < 10000 ? run.latency + 'ms' : (run.latency/1000).toFixed(0) + 's'}</span>
                <span className={"px-2 py-0.5 rounded-full text-[10px] font-semibold " + statusColor(run.status)}>{run.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}