'use client';
import { useState } from 'react';
const INTEGRATIONS = [
  { name: 'Slack', desc: 'Send notifications, read channels, manage workflows', category: 'Communication', status: 'available', url: 'https://slack.com/oauth/v2/authorize', color: 'bg-purple-50 text-purple-600' },
  { name: 'Gmail', desc: 'Read, send, and manage email conversations', category: 'Communication', status: 'available', url: 'https://accounts.google.com/o/oauth2/auth', color: 'bg-red-50 text-red-600' },
  { name: 'GitHub', desc: 'Manage repos, PRs, issues, and CI/CD', category: 'Engineering', status: 'available', url: 'https://github.com/apps', color: 'bg-gray-100 text-gray-800' },
  { name: 'Google Drive', desc: 'Access and manage documents and files', category: 'Productivity', status: 'available', url: 'https://drive.google.com', color: 'bg-blue-50 text-blue-600' },
  { name: 'Salesforce', desc: 'CRM data, leads, opportunities, contacts', category: 'Sales', status: 'coming_soon', url: '#', color: 'bg-blue-50 text-blue-700' },
  { name: 'HubSpot', desc: 'Marketing, sales, and service automation', category: 'Marketing', status: 'coming_soon', url: '#', color: 'bg-orange-50 text-orange-600' },
  { name: 'Jira', desc: 'Project management and issue tracking', category: 'Engineering', status: 'available', url: 'https://id.atlassian.com', color: 'bg-blue-50 text-blue-600' },
  { name: 'Notion', desc: 'Docs, wikis, and knowledge management', category: 'Productivity', status: 'available', url: 'https://api.notion.com/v1/oauth/authorize', color: 'bg-gray-100 text-gray-800' },
  { name: 'Zapier', desc: 'Connect to 5000+ apps via Zapier webhooks', category: 'Automation', status: 'available', url: 'https://zapier.com/developer', color: 'bg-orange-50 text-orange-600' },
  { name: 'Stripe', desc: 'Payments, invoices, subscriptions', category: 'Finance', status: 'connected', url: 'https://dashboard.stripe.com', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Twilio', desc: 'SMS, voice, and messaging APIs', category: 'Communication', status: 'coming_soon', url: '#', color: 'bg-red-50 text-red-600' },
  { name: 'OpenAI', desc: 'GPT-4o, GPT-4o-mini model access', category: 'AI', status: 'connected', url: 'https://platform.openai.com', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Anthropic', desc: 'Claude Sonnet 4, Opus 4 model access', category: 'AI', status: 'connected', url: 'https://console.anthropic.com', color: 'bg-amber-50 text-amber-700' },
  { name: 'Airtable', desc: 'Spreadsheet-database for structured data', category: 'Productivity', status: 'available', url: 'https://airtable.com/oauth2/v1/authorize', color: 'bg-teal-50 text-teal-600' },
  { name: 'Linear', desc: 'Issue tracking and project management', category: 'Engineering', status: 'available', url: 'https://linear.app/oauth/authorize', color: 'bg-indigo-50 text-indigo-600' },
];
export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const [connecting, setConnecting] = useState('');
  const filtered = INTEGRATIONS.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const handleConnect = (intg: typeof INTEGRATIONS[0]) => {
    if (intg.status === 'coming_soon') return;
    if (intg.status === 'connected') { window.open(intg.url, '_blank'); return; }
    setConnecting(intg.name);
    setTimeout(() => {
      window.open(intg.url, '_blank');
      setConnecting('');
    }, 800);
  };
  const statusLabel = (s: string) => s === 'connected' ? 'Connected' : s === 'coming_soon' ? 'Coming Soon' : 'Connect';
  const statusStyle = (s: string) => s === 'connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : s === 'coming_soon' ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 cursor-pointer';
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Integrations</h1><p className="text-sm text-gray-500">{INTEGRATIONS.filter(i => i.status === 'connected').length} connected &bull; {INTEGRATIONS.length} available</p></div>
      </div>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search integrations..."
        className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-sm mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(intg => (
          <div key={intg.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className={'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ' + intg.color}>{intg.name.charAt(0)}</div>
              <div><div className="text-sm font-semibold text-gray-900">{intg.name}</div><div className="text-[10px] text-gray-400">{intg.category}</div></div>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">{intg.desc}</p>
            <button onClick={() => handleConnect(intg)} disabled={intg.status === 'coming_soon'}
              className={'w-full px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ' + statusStyle(intg.status)}>
              {connecting === intg.name ? 'Connecting...' : statusLabel(intg.status)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}