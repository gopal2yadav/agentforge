'use client';
import { useState, useEffect } from 'react';

const INTEGRATIONS = [
  { name: 'Anthropic', desc: 'Claude Sonnet 4, Opus 4 — powers the AI Playground and Agent Run', category: 'AI', envKey: 'ai', setupUrl: 'https://console.anthropic.com/settings/keys', color: 'bg-amber-50 text-amber-700', webhookUrl: '/api/playground' },
  { name: 'Stripe', desc: 'Payments, subscriptions, invoices — powers billing and checkout', category: 'Payments', envKey: 'payments', setupUrl: 'https://dashboard.stripe.com/apikeys', color: 'bg-indigo-50 text-indigo-600', webhookUrl: '/api/webhooks/stripe' },
  { name: 'Clerk', desc: 'Authentication, user management, sign-in/sign-up flows', category: 'Auth', envKey: 'auth', setupUrl: 'https://dashboard.clerk.com', color: 'bg-violet-50 text-violet-600', webhookUrl: '/api/webhooks/clerk' },
  { name: 'Neon Postgres', desc: 'Serverless Postgres — stores agents, flows, crews, automations', category: 'Database', envKey: 'database', setupUrl: 'https://console.neon.tech', color: 'bg-emerald-50 text-emerald-600', webhookUrl: null },
  { name: 'Slack', desc: 'Send notifications, read channels, manage workflows', category: 'Communication', envKey: null, setupUrl: 'https://api.slack.com/apps', color: 'bg-purple-50 text-purple-600', webhookUrl: '/api/webhooks/slack', steps: ['Create a Slack App at api.slack.com/apps', 'Enable Bot Token Scopes: chat:write, channels:read', 'Install to workspace and copy Bot Token', 'Add SLACK_BOT_TOKEN to Vercel env vars'] },
  { name: 'GitHub', desc: 'Manage repos, PRs, issues, and CI/CD pipelines', category: 'Engineering', envKey: null, setupUrl: 'https://github.com/settings/developers', color: 'bg-gray-100 text-gray-800', webhookUrl: '/api/webhooks/github', steps: ['Create OAuth App at github.com/settings/developers', 'Set callback URL to agentforcecrew.com/api/auth/github/callback', 'Copy Client ID and Client Secret', 'Add GITHUB_CLIENT_ID and GITHUB_SECRET to Vercel env vars'] },
  { name: 'Gmail', desc: 'Read, send, and manage email conversations', category: 'Communication', envKey: null, setupUrl: 'https://console.cloud.google.com/apis/credentials', color: 'bg-red-50 text-red-600', webhookUrl: null, steps: ['Enable Gmail API in Google Cloud Console', 'Create OAuth 2.0 credentials', 'Set redirect URI to agentforcecrew.com/api/auth/google/callback', 'Add GOOGLE_CLIENT_ID and GOOGLE_SECRET to Vercel env vars'] },
  { name: 'Google Drive', desc: 'Access and manage documents and files', category: 'Productivity', envKey: null, setupUrl: 'https://console.cloud.google.com/apis/credentials', color: 'bg-blue-50 text-blue-600', webhookUrl: null, steps: ['Enable Drive API in Google Cloud Console', 'Use same OAuth credentials as Gmail', 'Add drive.readonly scope to your OAuth consent screen'] },
  { name: 'Jira', desc: 'Project management and issue tracking', category: 'Engineering', envKey: null, setupUrl: 'https://developer.atlassian.com/console/myapps/', color: 'bg-blue-50 text-blue-600', webhookUrl: '/api/webhooks/jira', steps: ['Create app at developer.atlassian.com', 'Add OAuth 2.0 authorization', 'Set callback to agentforcecrew.com/api/auth/jira/callback', 'Add JIRA_CLIENT_ID and JIRA_SECRET to Vercel env vars'] },
  { name: 'Notion', desc: 'Docs, wikis, and knowledge management', category: 'Productivity', envKey: null, setupUrl: 'https://www.notion.so/my-integrations', color: 'bg-gray-100 text-gray-800', webhookUrl: null, steps: ['Create integration at notion.so/my-integrations', 'Copy Internal Integration Token', 'Add NOTION_TOKEN to Vercel env vars', 'Share target pages with the integration'] },
  { name: 'Zapier', desc: 'Connect to 5000+ apps via Zapier webhooks', category: 'Automation', envKey: null, setupUrl: 'https://zapier.com/app/developer', color: 'bg-orange-50 text-orange-600', webhookUrl: '/api/webhooks/zapier', steps: ['Create a Zap with Webhook trigger', 'Point it to agentforcecrew.com/api/webhooks/zapier', 'Configure actions in Zapier dashboard'] },
  { name: 'Replit', desc: 'Cloud code execution sandbox for agents', category: 'Engineering', envKey: null, setupUrl: 'https://replit.com', color: 'bg-blue-50 text-blue-700', webhookUrl: null, steps: ['Built-in! Use the Code Sandbox page', 'Agents can execute Python/JS code', 'No API key needed for sandbox mode'] },
  { name: 'OpenAI', desc: 'GPT-4o, GPT-4o-mini model access', category: 'AI', envKey: null, setupUrl: 'https://platform.openai.com/api-keys', color: 'bg-emerald-50 text-emerald-700', webhookUrl: null, steps: ['Get API key from platform.openai.com', 'Add OPENAI_API_KEY to Vercel env vars', 'Select GPT models in Playground'] },
  { name: 'Airtable', desc: 'Spreadsheet-database for structured data', category: 'Productivity', envKey: null, setupUrl: 'https://airtable.com/developers/web/guides/personal-access-tokens', color: 'bg-teal-50 text-teal-600', webhookUrl: null, steps: ['Generate Personal Access Token at airtable.com', 'Add AIRTABLE_TOKEN to Vercel env vars'] },
  { name: 'Linear', desc: 'Issue tracking and project management', category: 'Engineering', envKey: null, setupUrl: 'https://linear.app/settings/api', color: 'bg-indigo-50 text-indigo-600', webhookUrl: '/api/webhooks/linear', steps: ['Create API key at linear.app/settings/api', 'Add LINEAR_API_KEY to Vercel env vars'] },
];

export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const [health, setHealth] = useState<any>(null);
  const [expandedSetup, setExpandedSetup] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => { fetch('/api/health').then(r => r.json()).then(setHealth).catch(() => {}); }, []);

  const getStatus = (intg: any) => {
    if (intg.envKey && health?.services?.[intg.envKey]?.status === 'configured') return 'connected';
    if (intg.envKey && health?.services?.[intg.envKey]?.status === 'connected') return 'connected';
    if (!intg.envKey && intg.name === 'Replit') return 'connected';
    if (!intg.envKey) return 'setup_required';
    return 'not_configured';
  };

  const categories = ['All', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))];
  const filtered = INTEGRATIONS.filter(i => {
    if (filter !== 'All' && i.category !== filter) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const connectedCount = INTEGRATIONS.filter(i => getStatus(i) === 'connected').length;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Integrations</h1>
          <p className="text-sm text-gray-500">{connectedCount} connected | {INTEGRATIONS.length} available</p>
        </div>
        <span className={'px-3 py-1.5 rounded-full text-xs font-semibold ' + (health?.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{health?.status === 'healthy' ? 'Platform Healthy' : 'Loading...'}</span>
      </div>

      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search integrations..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 mb-4" />

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ' + (filter === c ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(intg => {
          const status = getStatus(intg);
          return (
            <div key={intg.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className={'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ' + intg.color}>{intg.name.charAt(0)}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{intg.name}</div>
                  <div className="text-[10px] text-gray-400">{intg.category}</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{intg.desc}</p>

              {intg.webhookUrl && status === 'connected' && (
                <div className="mb-3 bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-gray-400 mb-0.5">Webhook URL</div>
                  <div className="text-[11px] font-mono text-indigo-600 truncate">agentforcecrew.com{intg.webhookUrl}</div>
                </div>
              )}

              {status === 'connected' ? (
                <a href={intg.setupUrl} target="_blank" rel="noopener" className="block w-full text-center px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">Connected | Manage</a>
              ) : (
                <button onClick={() => setExpandedSetup(expandedSetup === intg.name ? null : intg.name)} className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50">Connect</button>
              )}

              {expandedSetup === intg.name && status !== 'connected' && intg.steps && (
                <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                  <div className="text-xs font-semibold text-indigo-700 mb-2">Setup Steps</div>
                  <ol className="space-y-1.5 text-[11px] text-gray-600 list-decimal list-inside">
                    {intg.steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                  <a href={intg.setupUrl} target="_blank" rel="noopener" className="mt-2 inline-block text-[11px] text-indigo-600 font-semibold hover:underline">Open {intg.name} Dashboard</a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}