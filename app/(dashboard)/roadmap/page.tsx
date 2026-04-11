export default function RoadmapPage() {
  const phases = [
    { quarter: 'Q2 2026', status: 'current', items: [
      { name: 'Real-time agent streaming', done: false, desc: 'Stream agent responses token-by-token' },
      { name: 'Neon Postgres integration', done: false, desc: 'Persistent data storage for agents, flows, and executions' },
      { name: 'Clerk production mode', done: false, desc: 'Switch from development to production auth keys' },
      { name: 'Multi-model playground', done: true, desc: 'Test same prompt across Claude, GPT-4o, and Llama side-by-side' },
      { name: '50+ page platform', done: true, desc: 'Complete SaaS with all CrewAI features and more' },
    ]},
    { quarter: 'Q3 2026', status: 'planned', items: [
      { name: 'Agent marketplace', done: false, desc: 'Community-built agents available for one-click install' },
      { name: 'Custom tool builder', done: false, desc: 'Create custom tools with Python or JavaScript' },
      { name: 'Multi-tenant workspaces', done: false, desc: 'Isolated workspaces per team or client' },
      { name: 'Mobile app', done: false, desc: 'iOS and Android apps for monitoring and quick actions' },
    ]},
    { quarter: 'Q4 2026', status: 'planned', items: [
      { name: 'Self-hosted option', done: false, desc: 'Docker image for on-premise deployment' },
      { name: 'Advanced RAG pipeline', done: false, desc: 'Chunking strategies, embedding models, hybrid search' },
      { name: 'Agent training', done: false, desc: 'Fine-tune agent behavior with feedback loops' },
      { name: 'Enterprise SSO (Okta/Azure)', done: false, desc: 'SAML and OIDC for enterprise customers' },
    ]},
  ];
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Roadmap</h1><p className="text-sm text-gray-500">What we are building and what is coming next</p></div>
      <div className="space-y-8">
        {phases.map(phase => (
          <div key={phase.quarter}>
            <div className="flex items-center gap-3 mb-4">
              <span className={'px-3 py-1 rounded-full text-xs font-bold ' + (phase.status === 'current' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500')}>{phase.quarter}</span>
              {phase.status === 'current' && <span className="text-xs text-indigo-600 font-medium">In Progress</span>}
            </div>
            <div className="space-y-2">
              {phase.items.map(item => (
                <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <span className={'mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ' + (item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400')}>{item.done ? '\u2713' : '\u25CB'}</span>
                  <div><div className={'text-sm font-medium ' + (item.done ? 'text-gray-900' : 'text-gray-700')}>{item.name}</div><div className="text-xs text-gray-400 mt-0.5">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}