'use client';
import { useRouter } from 'next/navigation';
const WORKFLOWS = [
  { id: '1', name: 'Content Pipeline', desc: 'Research a topic, draft content, review quality, and publish across channels', agents: 3, category: 'Marketing', installs: 2340, rating: 4.8 },
  { id: '2', name: 'Lead Qualification', desc: 'Score inbound leads, enrich company data, and route to the right sales rep', agents: 2, category: 'Sales', installs: 1890, rating: 4.7 },
  { id: '3', name: 'PR Review Bot', desc: 'Analyze code changes, check for bugs and security issues, post review comments', agents: 2, category: 'Engineering', installs: 3120, rating: 4.9 },
  { id: '4', name: 'Customer Onboarding', desc: 'Welcome new users, personalize setup, schedule check-in calls', agents: 3, category: 'Support', installs: 1560, rating: 4.6 },
  { id: '5', name: 'Competitor Monitor', desc: 'Track competitor pricing, features, and news — deliver weekly digest', agents: 2, category: 'Research', installs: 980, rating: 4.5 },
  { id: '6', name: 'Invoice Processor', desc: 'Extract data from invoices, validate against POs, route for approval', agents: 2, category: 'Finance', installs: 1240, rating: 4.7 },
  { id: '7', name: 'Meeting Summarizer', desc: 'Transcribe meetings, extract action items, send Slack summaries', agents: 2, category: 'Productivity', installs: 2780, rating: 4.8 },
  { id: '8', name: 'Bug Triage', desc: 'Categorize GitHub issues, assign priority, suggest fixes, notify team', agents: 3, category: 'Engineering', installs: 1670, rating: 4.6 },
  { id: '9', name: 'SEO Auditor', desc: 'Crawl pages, analyze keywords, check meta tags, generate improvement report', agents: 2, category: 'Marketing', installs: 890, rating: 4.4 },
];
export default function MarketplacePage() {
  const router = useRouter();
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Workflow Marketplace</h1><p className="text-sm text-gray-500">Pre-built agent workflows ready to deploy</p></div>
        <button onClick={() => router.push('/flows/create')} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Publish Your Workflow</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORKFLOWS.map(w => (
          <div key={w.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{w.category}</span>
              <div className="flex items-center gap-1 text-xs text-amber-500">{'\u2605'} {w.rating}</div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{w.name}</h3>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{w.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>{w.agents} agents</span>
                <span>{w.installs.toLocaleString()} installs</span>
              </div>
              <button onClick={() => router.push('/flows/create')} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors">Install</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}