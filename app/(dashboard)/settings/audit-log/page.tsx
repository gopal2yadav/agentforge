'use client';
import { useState } from 'react';
const EVENTS = [
  { id: '1', action: 'agent.created', actor: 'Gopal Yadav', target: 'Research Agent', ip: '49.36.xx.xx', time: '10 min ago' },
  { id: '2', action: 'api_key.generated', actor: 'Gopal Yadav', target: 'Production Key', ip: '49.36.xx.xx', time: '25 min ago' },
  { id: '3', action: 'flow.executed', actor: 'System', target: 'Content Pipeline', ip: 'internal', time: '1 hour ago' },
  { id: '4', action: 'team.member_invited', actor: 'Gopal Yadav', target: 'api@agentforcecrew.com', ip: '49.36.xx.xx', time: '2 hours ago' },
  { id: '5', action: 'settings.updated', actor: 'Gopal Yadav', target: 'Default Model', ip: '49.36.xx.xx', time: '3 hours ago' },
  { id: '6', action: 'agent.executed', actor: 'API', target: 'Code Reviewer', ip: '52.14.xx.xx', time: '4 hours ago' },
  { id: '7', action: 'webhook.delivered', actor: 'System', target: 'https://api.example.com/callback', ip: 'internal', time: '4 hours ago' },
  { id: '8', action: 'billing.plan_changed', actor: 'Gopal Yadav', target: 'Free -> Pro', ip: '49.36.xx.xx', time: '1 day ago' },
  { id: '9', action: 'knowledge.uploaded', actor: 'Gopal Yadav', target: 'Company Policies (12 docs)', ip: '49.36.xx.xx', time: '1 day ago' },
  { id: '10', action: 'user.signed_in', actor: 'Gopal Yadav', target: 'SSO (Google)', ip: '49.36.xx.xx', time: '1 day ago' },
];
const actionColor = (a: string) => {
  if (a.includes('created') || a.includes('uploaded')) return 'text-emerald-600 bg-emerald-50';
  if (a.includes('executed') || a.includes('delivered')) return 'text-blue-600 bg-blue-50';
  if (a.includes('updated') || a.includes('changed')) return 'text-amber-600 bg-amber-50';
  if (a.includes('deleted') || a.includes('removed')) return 'text-red-600 bg-red-50';
  return 'text-gray-600 bg-gray-50';
};
export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const filtered = EVENTS.filter(e => !search || e.action.includes(search.toLowerCase()) || e.actor.toLowerCase().includes(search.toLowerCase()) || e.target.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Audit Log</h1><p className="text-sm text-gray-500">Track all actions across your organization</p></div>
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900">Export CSV</button>
      </div>
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by action, actor, or target..."
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          <span>Action</span><span>Actor</span><span>Target</span><span>IP</span><span>Time</span>
        </div>
        {filtered.map(e => (
          <div key={e.id} className="px-5 py-3 border-b border-gray-100 last:border-0 grid grid-cols-5 items-center text-sm hover:bg-gray-50 transition-colors">
            <span className={'px-2 py-0.5 rounded text-[10px] font-mono font-semibold w-fit ' + actionColor(e.action)}>{e.action}</span>
            <span className="text-gray-900 text-xs">{e.actor}</span>
            <span className="text-gray-500 text-xs truncate">{e.target}</span>
            <span className="text-gray-400 text-xs font-mono">{e.ip}</span>
            <span className="text-gray-400 text-xs">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}