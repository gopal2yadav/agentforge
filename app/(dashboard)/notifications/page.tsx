'use client';
import { useState } from 'react';

const NOTIFICATIONS = [
  { id: '1', type: 'success', title: 'Agent execution completed', body: 'Research Agent finished "Analyze Q1 market trends" — 3,200 tokens, 1.85s', time: '5 min ago', read: false },
  { id: '2', type: 'info', title: 'New deployment live', body: 'v2.2.0 deployed to production successfully — 4 serverless functions', time: '20 min ago', read: false },
  { id: '3', type: 'error', title: 'Agent execution failed', body: 'Data Analyst: Connection timeout — OpenAI API unreachable after 30s', time: '1 hour ago', read: false },
  { id: '4', type: 'info', title: 'Team member joined', body: 'api@agentforcecrew.com was added as Admin to your workspace', time: '2 hours ago', read: true },
  { id: '5', type: 'warning', title: 'Rate limit approaching', body: 'Code Reviewer agent is at 80% of daily API call limit (4,012 / 5,000)', time: '3 hours ago', read: true },
  { id: '6', type: 'success', title: 'Flow pipeline completed', body: 'Content Pipeline: 4/4 agents executed — 8,400 total tokens used', time: '4 hours ago', read: true },
  { id: '7', type: 'success', title: 'Webhook delivered', body: 'POST https://api.example.com/callback — 200 OK (120ms)', time: '4 hours ago', read: true },
  { id: '8', type: 'info', title: 'Knowledge base synced', body: 'Sales Playbook updated: 312 chunks processed, 2.8MB indexed', time: '6 hours ago', read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const typeStyle = (t: string) => {
    if (t === 'success') return 'bg-emerald-50 text-emerald-600';
    if (t === 'error') return 'bg-red-50 text-red-600';
    if (t === 'warning') return 'bg-amber-50 text-amber-600';
    return 'bg-blue-50 text-blue-600';
  };

  const typeIcon = (t: string) => {
    if (t === 'success') return '\u2713';
    if (t === 'error') return '\u2717';
    if (t === 'warning') return '\u26A0';
    return '\u2139';
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Notifications</h1>
          <p className="text-sm text-gray-500">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {['all', 'unread'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors " + (filter === f ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-900')}>
                {f}{f === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Mark all read</button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-gray-400 text-sm">No notifications to show</div>
        ) : (
          filtered.map((n, i) => (
            <div key={n.id} className={"px-5 py-4 flex items-start gap-4 transition-colors " + (!n.read ? 'bg-indigo-50/30' : 'hover:bg-gray-50') + (i < filtered.length - 1 ? ' border-b border-gray-100' : '')}>
              <div className={"w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 " + typeStyle(n.type)}>{typeIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={"text-sm font-medium " + (!n.read ? 'text-gray-900' : 'text-gray-700')}>{n.title}</span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{n.body}</div>
              </div>
              <div className="text-[11px] text-gray-400 shrink-0 mt-1">{n.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
