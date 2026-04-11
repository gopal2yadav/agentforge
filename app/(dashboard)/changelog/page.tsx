export default function ChangelogPage() {
  const releases = [
    { version: 'v2.2.0', date: 'April 11, 2026', title: 'AI Builder & Light Theme', changes: [
      'AI Builder: describe what you want to automate, AI creates the pipeline',
      'Complete light theme redesign: white backgrounds, clean typography',
      'Crew Studio: visual drag-and-drop workflow editor',
      'Deployments page: track production and preview deploys',
      'Agent Templates: 8 pre-built agents to quick-start',
      'Usage Analytics: token charts and agent breakdown',
      'Activity Feed: real-time notification center',
      'Knowledge Base: upload documents for RAG',
      'Getting Started onboarding flow',
    ]},
    { version: 'v2.1.0', date: 'April 10, 2026', title: 'CrewAI Feature Parity', changes: [
      'Tools & Integrations: 19 app connectors (Slack, GitHub, Salesforce...)',
      'Traces: step-by-step execution debugging',
      'LLM Connections: manage Anthropic, OpenAI, Google AI, Meta, AWS keys',
      'Environment Variables: secret management with scopes',
      'Automations: trigger-based workflow execution',
      'Sectioned sidebar (BUILD / DATA / OBSERVE / MANAGE)',
    ]},
    { version: 'v2.0.0', date: 'April 9, 2026', title: 'Platform Launch', changes: [
      'Dashboard with real-time metrics and execution table',
      'Agent CRUD with model selector (5 LLMs)',
      'Visual flow editor with React Flow DAG',
      'Memory explorer with search and importance scores',
      'API Playground for interactive agent testing',
      'Billing with Stripe: Free / Pro ($49/mo) / Enterprise',
      'Clerk authentication with SSO and phone verification',
      'Settings: API keys, webhooks, team management',
      'Monitoring: uptime, latency, error rate tracking',
      'Logs: searchable activity log with severity filters',
    ]},
  ];

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Changelog</h1>
        <p className="text-sm text-gray-500">What's new in Nexus AI Platform</p>
      </div>
      <div className="space-y-8">
        {releases.map(r => (
          <div key={r.version} className="relative pl-6 border-l-2 border-indigo-200">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white" />
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">{r.version}</span>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{r.title}</h3>
            <ul className="space-y-1.5">
              {r.changes.map((c, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">\u2022</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}