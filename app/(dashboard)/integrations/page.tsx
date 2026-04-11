'use client';
import { useState } from 'react';

const TOOLS = [
  { name: 'Slack', category: 'Communication', desc: 'Send notifications and manage channels', tools: 7, status: 'available', icon: 'S' },
  { name: 'Google Gmail', category: 'Communication', desc: 'Send, receive, and manage emails', tools: 6, status: 'available', icon: 'G' },
  { name: 'Google Drive', category: 'Storage', desc: 'Access and manage files and folders', tools: 8, status: 'available', icon: 'D' },
  { name: 'Google Sheets', category: 'Data', desc: 'Create and update spreadsheets', tools: 5, status: 'available', icon: 'S' },
  { name: 'GitHub', category: 'Development', desc: 'Manage issues, PRs, and releases', tools: 13, status: 'connected', icon: 'G' },
  { name: 'Jira', category: 'Project Management', desc: 'Sync issues and manage projects', tools: 13, status: 'available', icon: 'J' },
  { name: 'Salesforce', category: 'CRM', desc: 'Sync records, contacts, and leads', tools: 51, status: 'available', icon: 'S' },
  { name: 'HubSpot', category: 'CRM', desc: 'Manage contacts, deals, and companies', tools: 15, status: 'available', icon: 'H' },
  { name: 'Notion', category: 'Productivity', desc: 'Access workspace data and comments', tools: 3, status: 'available', icon: 'N' },
  { name: 'Stripe', category: 'Payments', desc: 'Manage customers and subscriptions', tools: 11, status: 'connected', icon: 'S' },
  { name: 'Linear', category: 'Project Management', desc: 'Manage issues, projects, and sprints', tools: 13, status: 'available', icon: 'L' },
  { name: 'Asana', category: 'Project Management', desc: 'Manage tasks, projects, and teams', tools: 12, status: 'available', icon: 'A' },
  { name: 'Microsoft Teams', category: 'Communication', desc: 'Send messages and create meetings', tools: 14, status: 'available', icon: 'T' },
  { name: 'Snowflake', category: 'Data', desc: 'Access data and run SQL queries via MCP', tools: 1, status: 'available', icon: 'S' },
  { name: 'Databricks', category: 'Data', desc: 'Query data with SQL and vector search', tools: 4, status: 'available', icon: 'D' },
];

const CATEGORIES = ['All', ...new Set(TOOLS.map(t => t.category))];

export default function IntegrationsPage() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = TOOLS.filter(t => {
    if (cat !== 'All' && t.category !== cat) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Tools & Integrations</h1>
        <p className="text-sm text-gray-500">Connect apps and services to your AI agents</p>
      </div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search integrations..."
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-64 shadow-sm" />
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors " + (cat === c ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-900')}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(t => (
          <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{t.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.name}</div>
                  <div className="text-[10px] text-gray-400">{t.category}</div>
                </div>
              </div>
              {t.status === 'connected' ? (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700">Connected</span>
              ) : (
                <button className="px-3 py-1 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors">Connect</button>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{t.desc}</p>
            <div className="text-[10px] text-gray-400">{t.tools} tools available</div>
          </div>
        ))}
      </div>
    </div>
  );
}