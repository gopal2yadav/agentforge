'use client';
import { useState } from 'react';
import Link from 'next/link';
const ALL_PAGES = [
  { name: 'Dashboard', path: '/dashboard', section: 'BUILD', desc: 'Main dashboard with stats and quick actions' },
  { name: 'AI Builder', path: '/builder', section: 'BUILD', desc: 'Describe what you want to automate with natural language' },
  { name: 'Crew Studio', path: '/studio', section: 'BUILD', desc: 'Visual drag-and-drop workflow editor' },
  { name: 'Agents', path: '/agents', section: 'BUILD', desc: 'Create and manage AI agents with roles and tools' },
  { name: 'Create Agent', path: '/agents/create', section: 'BUILD', desc: 'New agent with role, goal, backstory, and tools' },
  { name: 'Flows', path: '/flows', section: 'BUILD', desc: 'Multi-agent workflow pipelines' },
  { name: 'Create Flow', path: '/flows/create', section: 'BUILD', desc: 'Design a new multi-agent pipeline' },
  { name: 'Flow Editor', path: '/flows/editor', section: 'BUILD', desc: 'Visual DAG editor for flow pipelines' },
  { name: 'Automations', path: '/automations', section: 'BUILD', desc: 'Event-triggered agent workflows' },
  { name: 'Playground', path: '/playground', section: 'BUILD', desc: 'Test agents interactively' },
  { name: 'Multi-Model', path: '/playground/multi', section: 'BUILD', desc: 'Compare models side-by-side' },
  { name: 'Templates', path: '/templates', section: 'BUILD', desc: '8 pre-built agent templates' },
  { name: 'Marketplace', path: '/marketplace', section: 'BUILD', desc: '9 workflow templates ready to install' },
  { name: 'Knowledge Base', path: '/knowledge', section: 'DATA', desc: 'Upload documents for RAG retrieval' },
  { name: 'Memory', path: '/memory', section: 'DATA', desc: 'Agent memory explorer with importance scoring' },
  { name: 'Integrations', path: '/integrations', section: 'DATA', desc: '19 app integrations (Slack, Gmail, GitHub, etc.)' },
  { name: 'Data Pipelines', path: '/pipelines', section: 'DATA', desc: 'ETL pipelines feeding data to agents' },
  { name: 'Traces', path: '/traces', section: 'OBSERVE', desc: 'Step-by-step execution debugging' },
  { name: 'Monitoring', path: '/monitoring', section: 'OBSERVE', desc: 'Real-time health metrics' },
  { name: 'Analytics', path: '/analytics', section: 'OBSERVE', desc: 'Token usage charts and breakdowns' },
  { name: 'Logs', path: '/logs', section: 'OBSERVE', desc: 'Agent execution logs (terminal view)' },
  { name: 'Activity', path: '/activity', section: 'OBSERVE', desc: 'Recent platform events feed' },
  { name: 'History', path: '/history', section: 'OBSERVE', desc: 'Full execution history with search' },
  { name: 'Errors', path: '/errors', section: 'OBSERVE', desc: 'Error tracking and incidents' },
  { name: 'Alerts', path: '/alerts', section: 'OBSERVE', desc: 'Threshold-based notifications' },
  { name: 'Compare', path: '/compare', section: 'OBSERVE', desc: 'Agent performance comparison table' },
  { name: 'Benchmarks', path: '/benchmarks', section: 'OBSERVE', desc: 'P50/P95/P99 latency tracking' },
  { name: 'Usage & Costs', path: '/usage', section: 'OBSERVE', desc: 'Token usage by month and provider' },
  { name: 'Testing Suite', path: '/testing', section: 'OBSERVE', desc: 'Automated agent test cases' },
  { name: 'Billing', path: '/billing', section: 'MANAGE', desc: 'Stripe billing and plan management' },
  { name: 'Settings', path: '/settings', section: 'MANAGE', desc: 'Platform configuration hub' },
  { name: 'Security', path: '/settings/security', section: 'MANAGE', desc: '2FA, SSO, sessions, compliance' },
  { name: 'API Keys', path: '/settings/api-keys', section: 'MANAGE', desc: 'Generate access tokens' },
  { name: 'Webhooks', path: '/settings/webhooks', section: 'MANAGE', desc: 'Event notification endpoints' },
  { name: 'Team', path: '/settings/team', section: 'MANAGE', desc: 'Manage members and permissions' },
  { name: 'Profile', path: '/profile', section: 'MANAGE', desc: 'Account info and preferences' },
  { name: 'Audit Log', path: '/settings/audit-log', section: 'MANAGE', desc: 'Compliance action tracking' },
  { name: 'Feedback', path: '/feedback', section: 'MANAGE', desc: 'Help, FAQ, and support' },
];
export default function SearchPage() {
  const [q, setQ] = useState('');
  const filtered = q.trim() ? ALL_PAGES.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()) || p.section.toLowerCase().includes(q.toLowerCase())) : ALL_PAGES;
  const sections = [...new Set(filtered.map(p => p.section))];
  const sectionColor = (s) => s === 'BUILD' ? 'text-indigo-600 bg-indigo-50' : s === 'DATA' ? 'text-purple-600 bg-purple-50' : s === 'OBSERVE' ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50';
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Search</h1><p className="text-sm text-gray-500">Find any page, feature, or setting across the platform</p></div>
      <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search pages, features, settings..." autoFocus
        className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-sm mb-6" />
      <div className="text-xs text-gray-400 mb-4">{filtered.length} results</div>
      {sections.map(section => (
        <div key={section} className="mb-6">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{section}</h2>
          <div className="space-y-1">
            {filtered.filter(p => p.section === section).map(p => (
              <Link key={p.path} href={p.path} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className={'px-2 py-0.5 rounded text-[8px] font-bold uppercase ' + sectionColor(p.section)}>{p.section}</span>
                  <div><div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{p.name}</div><div className="text-[11px] text-gray-400">{p.desc}</div></div>
                </div>
                <span className="text-xs text-gray-300 font-mono group-hover:text-gray-500 transition-colors">{p.path}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}