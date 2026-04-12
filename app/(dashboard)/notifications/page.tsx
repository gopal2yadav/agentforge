'use client';
import { useState, useEffect } from 'react';

export default function NotificationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch('/api/notifications').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false)); }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const typeStyles: Record<string, string> = {
    success: 'border-emerald-500/30 bg-emerald-500/5',
    info: 'border-indigo-500/30 bg-indigo-500/5',
    warning: 'border-amber-500/30 bg-amber-500/5',
    error: 'border-red-500/30 bg-red-500/5',
  };
  const dotStyles: Record<string, string> = { success: 'bg-emerald-400', info: 'bg-indigo-400', warning: 'bg-amber-400', error: 'bg-red-400' };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Notifications</h1>
          <p className="text-sm text-indigo-300/50">{data?.unread || 0} unread | {data?.notifications?.length || 0} total</p>
        </div>
      </div>
      <div className="space-y-3">
        {(data?.notifications || []).map((n: any) => (
          <div key={n.id} className={'rounded-xl p-5 border-l-4 transition-all ' + (typeStyles[n.type] || typeStyles.info)} style={{ background: 'rgba(15,15,35,0.6)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={'w-2.5 h-2.5 rounded-full mt-1.5 ' + (dotStyles[n.type] || dotStyles.info)} />
                <div>
                  <div className="font-semibold text-sm">{n.title}</div>
                  <p className="text-xs text-indigo-300/60 mt-1">{n.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-indigo-400/40">{n.time}</span>
                {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.total && (
        <div className="mt-6 grid grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}><div className="text-lg font-bold" style={{ color: '#a5b4fc' }}>{data.total.agents}</div><div className="text-[10px] text-indigo-300/40">Agents</div></div>
          <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}><div className="text-lg font-bold" style={{ color: '#6ee7b7' }}>{data.total.flows}</div><div className="text-[10px] text-indigo-300/40">Flows</div></div>
          <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}><div className="text-lg font-bold" style={{ color: '#fcd34d' }}>{data.total.crews}</div><div className="text-[10px] text-indigo-300/40">Crews</div></div>
          <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}><div className="text-lg font-bold" style={{ color: '#c4b5fd' }}>{data.total.automations}</div><div className="text-[10px] text-indigo-300/40">Automations</div></div>
        </div>
      )}
    </div>
  );
}