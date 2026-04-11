'use client';
import { useState } from 'react';
export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [showInvite, setShowInvite] = useState(false);
  const members = [
    { name: 'Gopal Yadav', email: 'gopal@aabhyasa.com', role: 'Owner', status: 'active', avatar: 'G', joined: 'Jan 2026' },
    { name: 'API Service', email: 'api@agentforcecrew.com', role: 'Admin', status: 'active', avatar: 'A', joined: 'Mar 2026' },
  ];
  const pending = [
    { email: 'dev@aabhyasa.com', role: 'Member', sentAt: '2 days ago' },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Team</h1><p className="text-sm text-gray-500">{members.length} members &bull; {pending.length} pending</p></div>
        <button onClick={() => setShowInvite(!showInvite)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Invite Member</button>
      </div>
      {showInvite && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Invite a team member</h3>
          <div className="flex gap-3">
            <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@company.com"
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
            <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
              <option value="admin">Admin</option><option value="member">Member</option><option value="viewer">Viewer</option>
            </select>
            <button onClick={() => { setShowInvite(false); setInviteEmail(''); }} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Send Invite</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Members</h3></div>
        {members.map(m => (
          <div key={m.email} className="px-5 py-4 flex items-center justify-between border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{m.avatar}</div>
              <div><div className="text-sm font-medium text-gray-900">{m.name}</div><div className="text-xs text-gray-400">{m.email}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Joined {m.joined}</span>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (m.role === 'Owner' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-600')}>{m.role}</span>
            </div>
          </div>
        ))}
      </div>
      {pending.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Invitations</h3></div>
          {pending.map(p => (
            <div key={p.email} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs font-bold">?</div>
                <div><div className="text-sm font-medium text-gray-900">{p.email}</div><div className="text-xs text-gray-400">Invited {p.sentAt}</div></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{p.role}</span>
                <button className="text-xs text-red-400 hover:text-red-600">Revoke</button>
                <button className="text-xs text-indigo-600 hover:text-indigo-800">Resend</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}