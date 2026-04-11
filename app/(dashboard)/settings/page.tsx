import Link from 'next/link';
export default function SettingsPage() {
  const sections = [
    { title: 'Account', items: [
      { name: 'General', desc: 'Email, plan, and profile settings', href: '/settings' },
      { name: 'Team', desc: 'Manage members and permissions', href: '/settings/team' },
      { name: 'Security', desc: '2FA, SSO, sessions, and compliance', href: '/settings/security' },
      { name: 'Branding', desc: 'Customize logo, colors, and theme', href: '/settings/branding' },
    ]},
    { title: 'Developer', items: [
      { name: 'API Keys', desc: 'Create and manage API access tokens', href: '/settings/api-keys' },
      { name: 'Webhooks', desc: 'Configure event notification endpoints', href: '/settings/webhooks' },
      { name: 'Rate Limits', desc: 'Monitor API usage and quotas', href: '/settings/rate-limits' },
      { name: 'LLM Connections', desc: 'Manage AI model provider API keys', href: '/settings/llm-connections' },
      { name: 'Env Variables', desc: 'Manage secrets and configuration', href: '/settings/env-vars' },
    ]},
    { title: 'Data & Compliance', items: [
      { name: 'Audit Log', desc: 'Track all actions for compliance', href: '/settings/audit-log' },
      { name: 'Export / Import', desc: 'Backup and restore configurations', href: '/settings/export' },
    ]},
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your account, integrations, and platform configuration</p>
      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.title}>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map(item => (
                <Link key={item.href} href={item.href} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group block">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white border border-red-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-semibold text-red-600 mb-2">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div><div className="text-sm font-medium text-gray-900">Delete Account</div><div className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data</div></div>
          <button className="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}