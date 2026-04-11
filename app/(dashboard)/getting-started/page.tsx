'use client';
import Link from 'next/link';

const STEPS = [
  { num: 1, title: 'Create Your First Agent', desc: 'Configure an AI agent with a role, goal, and tools', href: '/agents/create', done: true },
  { num: 2, title: 'Test in Playground', desc: 'Send a prompt and see your agent respond in real-time', href: '/playground', done: true },
  { num: 3, title: 'Build a Flow', desc: 'Connect multiple agents into a visual workflow pipeline', href: '/flows/create', done: false },
  { num: 4, title: 'Upload Knowledge', desc: 'Add documents so your agents can reference your data', href: '/knowledge', done: false },
  { num: 5, title: 'Connect Integrations', desc: 'Link Slack, GitHub, or Salesforce to your agents', href: '/integrations', done: false },
  { num: 6, title: 'Set Up Automations', desc: 'Trigger workflows automatically from external events', href: '/automations', done: false },
  { num: 7, title: 'Monitor & Trace', desc: 'View execution traces and track performance metrics', href: '/traces', done: false },
  { num: 8, title: 'Invite Your Team', desc: 'Add team members with role-based access controls', href: '/settings/team', done: false },
];

export default function OnboardingPage() {
  const completed = STEPS.filter(s => s.done).length;
  const pct = Math.round((completed / STEPS.length) * 100);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Getting Started with Nexus</h1>
        <p className="text-sm text-gray-500">Follow these steps to set up your AI agent platform</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">{completed} of {STEPS.length} steps completed</span>
          <span className="text-sm text-indigo-600 font-medium">{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: pct + '%' }} />
        </div>
      </div>
      <div className="space-y-3">
        {STEPS.map(step => (
          <Link key={step.num} href={step.href}
            className={"flex items-center gap-4 bg-white border rounded-xl p-5 shadow-sm transition-all " + (step.done ? 'border-emerald-200 hover:border-emerald-300' : 'border-gray-200 hover:border-indigo-200 hover:shadow-md')}>
            <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 " + (step.done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400')}>
              {step.done ? '\u2713' : step.num}
            </div>
            <div className="flex-1">
              <div className={"text-sm font-semibold " + (step.done ? 'text-emerald-700 line-through' : 'text-gray-900')}>{step.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{step.desc}</div>
            </div>
            <span className="text-gray-300 text-lg">\u2192</span>
          </Link>
        ))}
      </div>
    </div>
  );
}