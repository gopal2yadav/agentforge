'use client';
import { useState, useEffect } from 'react';

interface SwarmTemplate { name: string; agents: { name: string; role: string; goal: string; backstory: string; tools: string[] }[] }

export default function BuilderPage() {
  const [swarms, setSwarms] = useState<SwarmTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState<string | null>(null);
  const [deployed, setDeployed] = useState<string[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [expandedSwarm, setExpandedSwarm] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/swarm').then(r => r.json()).then(d => { setSwarms(d); setLoading(false); }).catch(() => setLoading(false));
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  const deploySwarm = async (swarmName: string) => {
    setDeploying(swarmName);
    try {
      const res = await fetch('/api/swarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swarmName })
      });
      const data = await res.json();
      if (data.swarm) {
        setDeployed(prev => [...prev, swarmName]);
        const statsRes = await fetch('/api/stats');
        setStats(await statsRes.json());
      }
    } catch (e) {}
    setDeploying(null);
  };

  const categoryColors: Record<string, string> = {
    'Research': 'bg-blue-50 text-blue-700 border-blue-200',
    'Engineering': 'bg-gray-100 text-gray-800 border-gray-300',
    'Marketing': 'bg-pink-50 text-pink-700 border-pink-200',
    'Support': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Data': 'bg-violet-50 text-violet-700 border-violet-200',
  };

  const getCategory = (name: string) => {
    if (name.includes('Research')) return 'Research';
    if (name.includes('Dev')) return 'Engineering';
    if (name.includes('Marketing')) return 'Marketing';
    if (name.includes('Customer')) return 'Support';
    if (name.includes('Data')) return 'Data';
    return 'Research';
  };

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading swarm templates...</p></div>;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">AI Builder</h1>
          <p className="text-sm text-gray-500">Deploy intelligent agent swarms with one click</p>
        </div>
        {stats && (
          <div className="flex gap-3">
            <div className="text-center px-4 py-2 bg-white border border-gray-200 rounded-lg"><div className="text-lg font-bold text-indigo-600">{stats.agents}</div><div className="text-[10px] text-gray-400">Agents</div></div>
            <div className="text-center px-4 py-2 bg-white border border-gray-200 rounded-lg"><div className="text-lg font-bold text-emerald-600">{stats.crews}</div><div className="text-[10px] text-gray-400">Crews</div></div>
            <div className="text-center px-4 py-2 bg-white border border-gray-200 rounded-lg"><div className="text-lg font-bold text-gray-900">{stats.totalRuns}</div><div className="text-[10px] text-gray-400">Runs</div></div>
          </div>
        )}
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-indigo-700">Each swarm deploys multiple specialized AI agents that work together as a crew. Agents are powered by <strong>Claude Sonnet 4</strong> and execute with real AI when you run them.</p>
      </div>

      <div className="space-y-4">
        {swarms.map(swarm => {
          const cat = getCategory(swarm.name);
          const isDeployed = deployed.includes(swarm.name);
          const isDeploying = deploying === swarm.name;
          const isExpanded = expandedSwarm === swarm.name;

          return (
            <div key={swarm.name} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg font-bold">{swarm.agents.length}</div>
                    <div>
                      <div className="text-[15px] font-semibold text-gray-900">{swarm.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={'px-2 py-0.5 rounded text-[9px] font-semibold border ' + (categoryColors[cat] || '')}>{cat}</span>
                        <span className="text-[11px] text-gray-400">{swarm.agents.length} agents</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setExpandedSwarm(isExpanded ? null : swarm.name)} className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-gray-300">{isExpanded ? 'Hide' : 'View'} Agents</button>
                    {isDeployed ? (
                      <span className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-200">Deployed</span>
                    ) : (
                      <button onClick={() => deploySwarm(swarm.name)} disabled={isDeploying} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{isDeploying ? 'Deploying...' : 'Deploy Swarm'}</button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {swarm.agents.map(a => (
                    <div key={a.name} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 text-[9px] font-bold">{a.name.charAt(0)}</div>
                      <span className="text-[11px] text-gray-700 font-medium">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                  <div className="space-y-3">
                    {swarm.agents.map(a => (
                      <div key={a.name} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                            <div className="text-xs text-gray-500">{a.role}</div>
                          </div>
                          <div className="flex gap-1">{a.tools.map(t => <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-50 text-indigo-600">{t}</span>)}</div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1"><strong>Goal:</strong> {a.goal}</p>
                        <p className="text-xs text-gray-400"><strong>Background:</strong> {a.backstory}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}