'use client';
export default function TeamPage() {
  const members = [
    { id: '1', name: 'Gopal Yadav', email: 'gopal@aabhyasa.com', role: 'Owner', avatar: 'G', joined: 'Apr 2026' },
    { id: '2', name: 'API Service', email: 'api@agentforcecrew.com', role: 'Admin', avatar: 'A', joined: 'Apr 2026' },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Team</h1><p className="text-sm text-gray-500">Manage team members and permissions</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Invite Member</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {members.map((m, i) => (
          <div key={m.id} className={"px-5 py-4 flex items-center justify-between" + (i < members.length - 1 ? " border-b border-gray-100" : "")}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{m.avatar}</div>
              <div><div className="text-sm font-medium text-gray-900">{m.name}</div><div className="text-[11px] text-gray-400">{m.email}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Joined {m.joined}</span>
              <span className={"px-2.5 py-0.5 rounded-full text-[10px] font-semibold " + (m.role === 'Owner' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500')}>{m.role}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Roles</h3>
        <div className="space-y-2 text-xs text-gray-500">
          <div><span className="text-gray-900 font-medium">Owner</span> \u2014 Full access including billing and team management.</div>
          <div><span className="text-gray-900 font-medium">Admin</span> \u2014 Manage agents, flows, and API keys.</div>
          <div><span className="text-gray-900 font-medium">Member</span> \u2014 View and run agents.</div>
          <div><span className="text-gray-900 font-medium">Viewer</span> \u2014 Read-only access.</div>
        </div>
      </div>
    </div>
  );
}