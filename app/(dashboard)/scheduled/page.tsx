'use client';
import { useState, useEffect } from 'react';

const SCHEDULE_OPTIONS = [
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every 6 hours', cron: '0 */6 * * *' },
  { label: 'Daily at 9 AM', cron: '0 9 * * *' },
  { label: 'Daily at midnight', cron: '0 0 * * *' },
  { label: 'Monday at 9 AM', cron: '0 9 * * 1' },
  { label: 'First of month', cron: '0 9 1 * *' },
];

interface ScheduledJob {
  id: string;
  agentName: string;
  prompt: string;
  schedule: string;
  cron: string;
  enabled: boolean;
  lastRun: string | null;
  nextRun: string;
}

export default function ScheduledPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<ScheduledJob[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newJob, setNewJob] = useState({ agentName: '', prompt: '', schedule: SCHEDULE_OPTIONS[4].label, cron: SCHEDULE_OPTIONS[4].cron });
  const [running, setRunning] = useState<string | null>(null);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => setAgents(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  const createJob = () => {
    if (!newJob.agentName || !newJob.prompt) return;
    const now = new Date();
    const job: ScheduledJob = {
      id: 'job-' + Date.now(),
      agentName: newJob.agentName,
      prompt: newJob.prompt,
      schedule: newJob.schedule,
      cron: newJob.cron,
      enabled: true,
      lastRun: null,
      nextRun: new Date(now.getTime() + 3600000).toISOString(),
    };
    setJobs(prev => [job, ...prev]);
    setNewJob({ agentName: '', prompt: '', schedule: SCHEDULE_OPTIONS[4].label, cron: SCHEDULE_OPTIONS[4].cron });
    setShowCreate(false);
  };

  const runNow = async (job: ScheduledJob) => {
    setRunning(job.id);
    try {
      await fetch('/api/v1/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_name: job.agentName, prompt: job.prompt }),
      });
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, lastRun: new Date().toISOString() } : j));
    } catch (e) {}
    setRunning(null);
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Scheduled Runs</h1>
          <p className="text-sm text-indigo-300/50">Schedule agents to run automatically on a cron schedule</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{showCreate ? 'Cancel' : '+ New Schedule'}</button>
      </div>

      {showCreate && (
        <div className="rounded-xl p-5 mb-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Create Scheduled Job</div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] text-indigo-300/40 block mb-1">Agent</label>
              <select value={newJob.agentName} onChange={e => setNewJob({ ...newJob, agentName: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }}>
                <option value="">Select agent...</option>
                {agents.map(a => <option key={a.id} value={a.name}>{a.name} ({a.role})</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-indigo-300/40 block mb-1">Schedule</label>
              <select value={newJob.schedule} onChange={e => { const opt = SCHEDULE_OPTIONS.find(s => s.label === e.target.value); if (opt) setNewJob({ ...newJob, schedule: opt.label, cron: opt.cron }); }} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }}>
                {SCHEDULE_OPTIONS.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-[10px] text-indigo-300/40 block mb-1">Prompt (what should the agent do each run?)</label>
            <textarea value={newJob.prompt} onChange={e => setNewJob({ ...newJob, prompt: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(99,102,241,0.1)', color: '#e0e7ff' }} placeholder="e.g. Generate a daily summary of all active agents and their status..." />
          </div>
          <div className="flex gap-2">
            <button onClick={createJob} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Create Schedule</button>
            <div className="text-[10px] text-indigo-300/30 self-center font-mono">{newJob.cron}</div>
          </div>
        </div>
      )}

      {jobs.length === 0 && !showCreate ? (
        <div className="text-center py-16 rounded-xl" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-4xl mb-3" style={{ color: '#a5b4fc' }}>-</div>
          <h3 className="text-lg font-semibold mb-1">No scheduled runs yet</h3>
          <p className="text-sm text-indigo-300/50 mb-4">Schedule agents to run automatically at set intervals</p>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Create First Schedule</button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid ' + (job.enabled ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.15)') }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={'w-3 h-3 rounded-full ' + (job.enabled ? 'bg-emerald-400' : 'bg-gray-500')} style={{ boxShadow: job.enabled ? '0 0 8px rgba(16,185,129,0.5)' : 'none' }} />
                  <div>
                    <div className="text-sm font-semibold">{job.agentName}</div>
                    <div className="text-[10px] text-indigo-300/40 font-mono">{job.cron} | {job.schedule}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => runNow(job)} disabled={running === job.id} className="px-3 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{running === job.id ? 'Running...' : 'Run Now'}</button>
                  <button onClick={() => setJobs(prev => prev.map(j => j.id === job.id ? { ...j, enabled: !j.enabled } : j))} className="px-3 py-1.5 rounded text-[10px] font-semibold" style={{ background: job.enabled ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: job.enabled ? '#6ee7b7' : '#f87171', border: '1px solid ' + (job.enabled ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)') }}>{job.enabled ? 'Enabled' : 'Disabled'}</button>
                  <button onClick={() => setJobs(prev => prev.filter(j => j.id !== job.id))} className="px-3 py-1.5 rounded text-[10px] font-semibold" style={{ color: '#f87171' }}>Delete</button>
                </div>
              </div>
              <div className="text-xs text-indigo-300/50 mb-1">{job.prompt}</div>
              <div className="flex gap-4 text-[10px] text-indigo-300/30">
                <span>Last: {job.lastRun ? new Date(job.lastRun).toLocaleString() : 'Never'}</span>
                <span>Next: {new Date(job.nextRun).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}