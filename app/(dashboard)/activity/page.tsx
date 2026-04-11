'use client';

const ACTIVITY = [
  { id: '1', type: 'agent_completed', title: 'Research Agent completed execution', detail: '"Analyze Q1 market trends in EdTech" - 3,200 tokens, 1.85s', time: '15 min ago', icon: '\u2713', color: 'text-emerald-600 bg-emerald-50' },
  { id: '2', type: 'deployment', title: 'New deployment ready', detail: 'v2.2.0 deployed to production — 4 serverless functions', time: '25 min ago', icon: '\u2191', color: 'text-blue-600 bg-blue-50' },
  { id: '3', type: 'agent_failed', title: 'Data Analyst failed', detail: 'Connection timeout: OpenAI API unreachable after 30s', time: '1 hour ago', icon: '\u2717', color: 'text-red-600 bg-red-50' },
  { id: '4', type: 'team', title: 'New team member joined', detail: 'api@agentforcecrew.com was added as Admin', time: '2 hours ago', icon: '\u002B', color: 'text-indigo-600 bg-indigo-50' },
  { id: '5', type: 'billing', title: 'Usage milestone reached', detail: 'Your account has used 45,200 tokens this month (0.45% of limit)', time: '3 hours ago', icon: '\u2605', color: 'text-amber-600 bg-amber-50' },
  { id: '6', type: 'agent_completed', title: 'Writer Agent completed execution', detail: '"Draft blog post: AI in Healthcare 2026" - 5,100 tokens, 2.4s', time: '4 hours ago', icon: '\u2713', color: 'text-emerald-600 bg-emerald-50' },
  { id: '7', type: 'webhook', title: 'Webhook delivered successfully', detail: 'POST https://api.example.com/callback — 200 OK (120ms)', time: '4 hours ago', icon: '\u21D2', color: 'text-purple-600 bg-purple-50' },
  { id: '8', type: 'flow_completed', title: 'Content Pipeline completed', detail: '4/4 agents executed successfully — 8,400 total tokens', time: '5 hours ago', icon: '\u21C4', color: 'text-emerald-600 bg-emerald-50' },
  { id: '9', type: 'agent_completed', title: 'Code Reviewer completed execution', detail: '"Review PR #142: Add auth middleware" — 3 suggestions', time: '6 hours ago', icon: '\u2713', color: 'text-emerald-600 bg-emerald-50' },
  { id: '10', type: 'knowledge', title: 'Knowledge base updated', detail: 'Sales Playbook synced — 312 chunks, 2.8MB', time: '8 hours ago', icon: '\u2603', color: 'text-blue-600 bg-blue-50' },
];

export default function ActivityPage() {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Activity</h1>
        <p className="text-sm text-gray-500">Recent events and notifications across your platform</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {ACTIVITY.map((a, i) => (
          <div key={a.id} className={"px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors" + (i < ACTIVITY.length - 1 ? " border-b border-gray-100" : "")}>
            <div className={"w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 " + a.color}>{a.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">{a.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{a.detail}</div>
            </div>
            <div className="text-[11px] text-gray-400 shrink-0 mt-1">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}