'use client';
import { useState } from 'react';
const EVENTS = [
  { id: 'evt_01', event: 'agent.completed', endpoint: 'https://api.example.com/webhook', status: 200, duration: 120, payload: '{"agent":"Research Agent","tokens":3200}', time: '5 min ago' },
  { id: 'evt_02', event: 'flow.completed', endpoint: 'https://api.example.com/webhook', status: 200, duration: 85, payload: '{"flow":"Content Pipeline","steps":4}', time: '15 min ago' },
  { id: 'evt_03', event: 'agent.failed', endpoint: 'https://api.example.com/webhook', status: 200, duration: 92, payload: '{"agent":"Data Analyst","error":"timeout"}', time: '1 hour ago' },
  { id: 'evt_04', event: 'agent.completed', endpoint: 'https://hooks.slack.com/services/T00/B00/xxx', status: 200, duration: 340, payload: '{"agent":"Writer Agent","tokens":5100}', time: '2 hours ago' },
  { id: 'evt_05', event: 'billing.limit_reached', endpoint: 'https://api.example.com/webhook', status: 200, duration: 110, payload: '{"usage":45200,"limit":100000}', time: '4 hours ago' },
  { id: 'evt_06', event: 'agent.completed', endpoint: 'https://hooks.slack.com/services/T00/B00/xxx', status: 504, duration: 30000, payload: '{"agent":"Code Reviewer"}', time: '6 hours ago' },
  { id: 'evt_07', event: 'team.member_added', endpoint: 'https://api.example.com/webhook', status: 200, duration: 78, payload: '{"email":"api@agentforcecrew.com","role":"admin"}', time: '1 day ago' },
];
export default function WebhookLogPage() {
  const [expandedId, setExpandedId] = useState('');
  const statusColor = (s) => s < 300 ? 'bg-emerald-50 text-emerald-600' : s < 500 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600';
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Webhook Event Log</h1><p className="text-sm text-gray-500">All delivered webhook events with payloads</p></div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">6 delivered</span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-50 text-red-600">1 failed</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {EVENTS.map((e, i) => (
          <div key={e.id} className={'border-b border-gray-100 last:border-0' + (expandedId === e.id ? ' bg-gray-50' : '')}>
            <div onClick={() => setExpandedId(expandedId === e.id ? '' : e.id)} className="px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-indigo-600 font-semibold">{e.event}</span>
                <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{e.endpoint}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-400">{e.duration < 10000 ? e.duration + 'ms' : (e.duration/1000).toFixed(0) + 's'}</span>
                <span className={'px-2 py-0.5 rounded-full text-[10px] font-semibold ' + statusColor(e.status)}>{e.status}</span>
                <span className="text-gray-400 w-20 text-right">{e.time}</span>
              </div>
            </div>
            {expandedId === e.id && (
              <div className="px-5 pb-3"><pre className="bg-gray-900 text-emerald-400 rounded-lg p-3 text-xs font-mono overflow-x-auto">{e.payload}</pre></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}