'use client';
import { useState } from 'react';
const INTEGRATIONS = [
  { name: 'Slack', desc: 'Send notifications, read channels, manage workflows', category: 'Communication', status: 'setup_required', setupUrl: 'https://api.slack.com/apps', color: 'bg-purple-50 text-purple-600' },
  { name: 'Gmail', desc: 'Read, send, and manage email conversations', category: 'Communication', status: 'setup_required', setupUrl: 'https://console.cloud.google.com/apis/credentials', color: 'bg-red-50 text-red-600' },
  { name: 'GitHub', desc: 'Manage repos, PRs, issues, and CI/CD', category: 'Engineering', status: 'setup_required', setupUrl: 'https://github.com/settings/developers', color: 'bg-gray-100 text-gray-800' },
  { name: 'Google Drive', desc: 'Access and manage documents and files', category: 'Productivity', status: 'setup_required', setupUrl: 'https://console.cloud.google.com/apis/credentials', color: 'bg-blue-50 text-blue-600' },
  { name: 'Salesforce', desc: 'CRM data, leads, opportunities, contacts', category: 'Sales', status: 'coming_soon', setupUrl: '#', color: 'bg-blue-50 text-blue-700' },
  { name: 'HubSpot', desc: 'Marketing, sales, and service automation', category: 'Marketing', status: 'coming_soon', setupUrl: '#', color: 'bg-orange-50 text-orange-600' },
  { name: 'Jira', desc: 'Project management and issue tracking', category: 'Engineering', status: 'setup_required', setupUrl: 'https://developer.atlassian.com/console/myapps/', color: 'bg-blue-50 text-blue-600' },
  { name: 'Notion', desc: 'Docs, wikis, and knowledge management', category: 'Productivity', status: 'setup_required', setupUrl: 'https://www.notion.so/my-integrations', color: 'bg-gray-100 text-gray-800' },
  { name: 'Zapier', desc: 'Connect to 5000+ apps via Zapier webhooks', category: 'Automation', status: 'setup_required', setupUrl: 'https://zapier.com/app/developer', color: 'bg-orange-50 text-orange-600' },
  { name: 'Stripe', desc: 'Payments, invoices, subscriptions', category: 'Finance', status: 'connected', setupUrl: 'https://dashboard.stripe.com', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Twilio', desc: 'SMS, voice, and messaging APIs', category: 'Communication', status: 'coming_soon', setupUrl: '#', color: 'bg-red-50 text-red-600' },
  { name: 'OpenAI', desc: 'GPT-4o, GPT-4o-mini model access', category: 'AI', status: 'connected', setupUrl: 'https://platform.openai.com', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Anthropic', desc: 'Claude Sonnet 4, Opus 4 model access', category: 'AI', status: 'connected', setupUrl: 'https://console.anthropic.com', color: 'bg-amber-50 text-amber-700' },
  { name: 'Airtable', desc: 'Spreadsheet-database for structured data', category: 'Productivity', status: 'setup_required', setupUrl: 'https://airtable.com/developers/web/guides/personal-access-tokens', color: 'bg-teal-50 text-teal-600' },
  { name: 'Linear', desc: 'Issue tracking and project management', category: 'Engineering', status: 'setup_required', setupUrl: 'https://linear.app/settings/api', color: 'bg-indigo-50 text-indigo-600' },
];
export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const [showSetup, setShowSetup] = useState('');
  const filtered = INTEGRATIONS.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const handleConnect = (intg) => {
    if (intg.status === 'coming_soon') return;
    if (intg.status === 'connected') { window.open(intg.setupUrl, '_blank'); return; }
    setShowSetup(showSetup === intg.name ? '' : intg.name);
  };
  const btnLabel = (s) => s === 'connected' ? 'Connected \u2713' : s === 'coming_soon' ? 'Coming Soon' : 'Connect';
  const btnStyle = (s) => s === 'connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : s === 'coming_soon' ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 cursor-pointer';
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
              className={'w-full px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ' + btnStyle(intg.status)}>
              {btnLabel(intg.status)}
            </button>
            {showSetup === intg.name && intg.status === 'setup_required' && (
              <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                <div className="text-xs font-semibold text-indigo-700 mb-2">Setup Required</div>
                <p className="text-[11px] text-indigo-600 mb-2">To connect {intg.name}, you need to create an OAuth app and add its credentials to your Nexus settings.</p>
                <div className="space-y-1.5 text-[11px] text-gray-600">
                  <div>1. <a href={intg.setupUrl} target="_blank" rel="noopener" className="text-indigo-600 underline">Create an app on {intg.name}</a></div>
                  <div>2. Copy the Client ID and Client Secret</div>
                  <div>3. Go to <a href="/settings/integrations" className="text-indigo-600 underline">Settings &rarr; Integrations</a> and paste them</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}