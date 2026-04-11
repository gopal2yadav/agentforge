export default function ChangelogPage() {
  const releases = [
    { version: '2.5.2', date: 'Apr 11, 2026', type: 'minor', changes: ['Global Search across 37+ pages', 'Custom 404 page', 'XML Sitemap API (65 URLs)', 'Terms of Service and Careers pages'] },
    { version: '2.5.0', date: 'Apr 11, 2026', type: 'minor', changes: ['Data Pipelines (ETL management)', 'Custom Alerts with threshold notifications', 'OpenAPI 3.0.3 specification endpoint'] },
    { version: '2.4.1', date: 'Apr 11, 2026', type: 'patch', changes: ['Agent Testing Suite (6 automated test cases)', 'System Stats API', 'Token Usage & Costs page'] },
    { version: '2.4.0', date: 'Apr 11, 2026', type: 'minor', changes: ['Multi-Model Playground (side-by-side comparison)', 'Health API endpoint', 'Error Tracking with incident management'] },
    { version: '2.3.0', date: 'Apr 11, 2026', type: 'minor', changes: ['Agent Comparison table', 'Playground History', 'Workflow Marketplace (9 templates)', 'Comprehensive README'] },
    { version: '2.2.0', date: 'Apr 10, 2026', type: 'minor', changes: ['Security settings (2FA, SSO, sessions)', 'Rate Limits dashboard', 'Branding customization', 'Audit Log (compliance)'] },
    { version: '2.1.0', date: 'Apr 10, 2026', type: 'minor', changes: ['Usage Analytics with charts', 'Agent Templates (8 pre-built)', 'Activity Feed', 'Execution History'] },
    { version: '2.0.0', date: 'Apr 10, 2026', type: 'major', changes: ['Complete light theme migration', 'CrewAI-style agent creation', 'Crew Studio', '19 integrations', 'Stripe billing'] },
    { version: '1.0.0', date: 'Apr 9, 2026', type: 'major', changes: ['Initial platform launch', 'Dashboard, Agents, Flows', 'Clerk authentication', 'Vercel deployment'] },
  ];
  const typeColor = (t) => t === 'major' ? 'bg-indigo-100 text-indigo-700' : t === 'minor' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500';
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Changelog</h1><p className="text-sm text-gray-500">What's new in Nexus AI Agent Orchestration Platform</p></div>
      <div className="space-y-6">
        {releases.map(r => (
          <div key={r.version} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg font-bold text-gray-900">v{r.version}</span>
              <span className={'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ' + typeColor(r.type)}>{r.type}</span>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <div className="space-y-1.5">
              {r.changes.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-1 shrink-0">\u2022</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}