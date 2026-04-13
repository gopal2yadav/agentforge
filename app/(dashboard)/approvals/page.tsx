'use client';
import { useState } from 'react';

interface ApprovalItem {
  id: string;
  agent: string;
  action: string;
  details: string;
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const SAMPLE_APPROVALS: ApprovalItem[] = [
  { id: '1', agent: 'Email Marketer', action: 'Send email campaign', details: 'Ready to send "Product Launch" email to 2,450 subscribers', risk: 'high', status: 'pending', createdAt: new Date().toISOString() },
  { id: '2', agent: 'Content Creator', action: 'Publish blog post', details: '"10 AI Trends for 2026" — 2,400 words, SEO optimized', risk: 'medium', status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', agent: 'Lead Qualifier', action: 'Update CRM records', details: 'Qualify and update 15 new leads from webhook', risk: 'low', status: 'pending', createdAt: new Date(Date.now() - 7200000).toISOString() },
];

export default function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>(SAMPLE_APPROVALS);
  const [filter, setFilter] = useState('all');

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i));
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);
  const pendingCount = items.filter(i => i.status === 'pending').length;

  const riskColors = {
    low: { bg: 'rgba(16,185,129,0.1)', text: '#6ee7b7', border: 'rgba(16,185,129,0.2)' },
    medium: { bg: 'rgba(245,158,11,0.1)', text: '#fcd34d', border: 'rgba(245,158,11,0.2)' },
    high: { bg: 'rgba(239,68,68,0.1)', text: '#f87171', border: 'rgba(239,68,68,0.2)' },
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Approvals</h1>
          <p className="text-sm text-indigo-300/50">Human-in-the-loop — review and approve agent actions before execution</p>
        </div>
        {pendingCount > 0 && (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' }}>{pendingCount} pending</span>
        )}
      </div>

      <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-sm text-indigo-300/70">When agents attempt high-risk actions (sending emails, publishing content, modifying data), they pause and wait for your approval. This ensures <strong style={{ color: '#a5b4fc' }}>enterprise-grade governance</strong> and compliance.</p>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all" style={filter === f ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' } : { color: 'rgba(148,163,184,0.6)', border: '1px solid rgba(99,102,241,0.1)' }}>{f} {f === 'pending' && pendingCount > 0 ? '(' + pendingCount + ')' : ''}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 rounded-xl text-sm text-indigo-300/40" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>No items in this category</div>
        ) : filtered.map(item => (
          <div key={item.id} className="rounded-xl p-5 transition-all" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid ' + (item.status === 'pending' ? 'rgba(245,158,11,0.2)' : item.status === 'approved' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)') }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>{item.agent.charAt(0)}</div>
                <div>
                  <div className="text-sm font-semibold">{item.action}</div>
                  <div className="text-xs text-indigo-300/50">{item.agent}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold" style={{ background: riskColors[item.risk].bg, color: riskColors[item.risk].text, border: '1px solid ' + riskColors[item.risk].border }}>{item.risk} risk</span>
                {item.status === 'pending' ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleAction(item.id, 'approved')} className="px-3 py-1.5 rounded text-[10px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Approve</button>
                    <button onClick={() => handleAction(item.id, 'rejected')} className="px-3 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>Reject</button>
                  </div>
                ) : (
                  <span className="px-3 py-1.5 rounded text-[10px] font-semibold capitalize" style={{ color: item.status === 'approved' ? '#6ee7b7' : '#f87171' }}>{item.status}</span>
                )}
              </div>
            </div>
            <div className="text-xs text-indigo-300/60 mb-1">{item.details}</div>
            <div className="text-[10px] text-indigo-300/30">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}