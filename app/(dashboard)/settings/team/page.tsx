'use client';

export default function TeamPage() {
  const members = [
    { id: '1', name: 'Gopal Yadav', email: 'gopal@aabhyasa.com', role: 'Owner', avatar: 'G', joined: 'Apr 2026', status: 'active' },
    { id: '2', name: 'API Service', email: 'api@agentforcecrew.com', role: 'Admin', avatar: 'A', joined: 'Apr 2026', status: 'active' },
  ];

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Team</h1>
          <p className="text-sm text-[#6b6b8a]">Manage team members and permissions</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Invite Member
        </button>
      </div>
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
        {members.map((m, i) => (
          <div key={m.id} className={"px-5 py-4 flex items-center justify-between" + (i < members.length - 1 ? " border-b border-[#2a2a3d]" : "")}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#6366f1]/15 flex items-center justify-center text-[#818cf8] text-sm font-bold">{m.avatar}</div>
              <div>
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-[11px] text-[#6b6b8a]">{m.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#6b6b8a]">Joined {m.joined}</span>
              <span className={"px-2.5 py-0.5 rounded-full text-[10px] font-semibold " + (m.role === 'Owner' ? 'bg-[#6366f1]/15 text-[#818cf8]' : 'bg-[#2a2a3d] text-[#a0a0b8]')}>{m.role}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-3">Roles</h3>
        <div className="space-y-2 text-xs text-[#6b6b8a]">
          <div><span className="text-white font-medium">Owner</span> — Full access. Can manage billing, team, and all resources.</div>
          <div><span className="text-white font-medium">Admin</span> — Can manage agents, flows, and API keys. Cannot manage billing.</div>
          <div><span className="text-white font-medium">Member</span> — Can view and run agents. Cannot create or modify.</div>
          <div><span className="text-white font-medium">Viewer</span> — Read-only access to dashboards and monitoring.</div>
        </div>
      </div>
    </div>
  );
}