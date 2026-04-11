'use client';
import { useState } from 'react';

const APPS = [
  { name: 'Slack', cat: 'Communication', tools: 7, status: 'available', desc: 'Send messages, manage channels' },
  { name: 'Gmail', cat: 'Communication', tools: 6, status: 'available', desc: 'Send and manage emails' },
  { name: 'Google Drive', cat: 'Storage', tools: 8, status: 'available', desc: 'Manage files and folders' },
  { name: 'Google Sheets', cat: 'Data', tools: 5, status: 'available', desc: 'Read and update spreadsheets' },
  { name: 'GitHub', cat: 'Developer', tools: 13, status: 'connected', desc: 'Manage repos, issues and PRs' },
  { name: 'HubSpot', cat: 'CRM', tools: 15, status: 'available', desc: 'Manage contacts and deals' },
  { name: 'Salesforce', cat: 'CRM', tools: 51, status: 'available', desc: 'Sync records and leads' },
  { name: 'Jira', cat: 'Project', tools: 13, status: 'available', desc: 'Track issues and projects' },
  { name: 'Stripe', cat: 'Payments', tools: 11, status: 'connected', desc: 'Manage payments and subs' },
  { name: 'Notion', cat: 'Productivity', tools: 3, status: 'available', desc: 'Manage workspace pages' },
  { name: 'Linear', cat: 'Project', tools: 13, status: 'available', desc: 'Bug tracking and sprints' },
  { name: 'MS Teams', cat: 'Communication', tools: 14, status: 'available', desc: 'Messages and meetings' },
  { name: 'Confluence', cat: 'Documents', tools: 10, status: 'available', desc: 'Sync documents and pages' },
  { name: 'Asana', cat: 'Project', tools: 12, status: 'available', desc: 'Tasks and project management' },
  { name: 'Zapier', cat: 'Automation', tools: 0, status: 'available', desc: 'Connect 5000+ apps' },
];

export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const filtered = APPS.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight mb-1">Tools & Integrations</h1><p className="text-sm text-[#6b6b8a]">Connect agents to 15+ apps and services</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">+ Custom Tool</button>
      </div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search integrations..." className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((app) => (
          <div key={app.name} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8] text-sm font-bold">{app.name.charAt(0)}</div>
                <div><div className="text-sm font-semibold">{app.name}</div><div className="text-[10px] text-[#4a4a5a]">{app.cat} · {app.tools} tools</div></div>
              </div>
              <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold uppercase " + (app.status === 'connected' ? 'bg-green-400/10 text-green-400' : 'bg-[#2a2a3d] text-[#6b6b8a]')}>{app.status}</span>
            </div>
            <p className="text-xs text-[#6b6b8a] mb-3">{app.desc}</p>
            <button className={"w-full py-2 rounded-lg text-xs font-semibold transition-colors " + (app.status === 'connected' ? 'border border-green-400/30 text-green-400' : 'border border-[#2a2a3d] text-[#6b6b8a] hover:text-white')}>{app.status === 'connected' ? 'Connected' : 'Connect'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
