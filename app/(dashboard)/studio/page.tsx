'use client';
import { useState } from 'react';

const DEMO_CREW = {
  name: 'Content Pipeline',
  agents: [
    { id: 'a1', name: 'Researcher', role: 'Research Analyst', model: 'claude-sonnet-4' },
    { id: 'a2', name: 'Writer', role: 'Content Writer', model: 'claude-sonnet-4' },
    { id: 'a3', name: 'Editor', role: 'Quality Editor', model: 'gpt-4o' },
  ],
  tasks: [
    { id: 't1', name: 'Research Topic', agent: 'Researcher', output: 'Research report with sources' },
    { id: 't2', name: 'Write Draft', agent: 'Writer', output: 'First draft of content' },
    { id: 't3', name: 'Review & Polish', agent: 'Editor', output: 'Final polished content' },
  ],
};

export default function StudioPage() {
  const [crew] = useState(DEMO_CREW);
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Crew Studio</h1>
          <p className="text-sm text-gray-500">Design and configure multi-agent crews visually</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-900">Import YAML</button>
          <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Crew</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">C</div>
          <div>
            <div className="text-lg font-bold text-gray-900">{crew.name}</div>
            <div className="text-xs text-gray-400">{crew.agents.length} agents \u00B7 {crew.tasks.length} tasks \u00B7 Sequential process</div>
          </div>
        </div>

        <div className="flex gap-2 mb-4 border-b border-gray-100">
          {['agents', 'tasks', 'config'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={"px-4 py-2 text-sm font-medium border-b-2 transition-colors " + (activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600')}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'agents' && (
          <div className="space-y-3">
            {crew.agents.map((agent, i) => (
              <div key={agent.id} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">{i + 1}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{agent.name}</div>
                    <div className="text-[11px] text-gray-400">{agent.role} \u00B7 {agent.model}</div>
                  </div>
                </div>
                <button className="text-xs text-gray-400 hover:text-indigo-600">Edit</button>
              </div>
            ))}
            <button className="w-full py-3 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:text-indigo-600 hover:border-indigo-300">+ Add Agent</button>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {crew.tasks.map((task, i) => (
              <div key={task.id} className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Task {i + 1}</span>
                    <span className="text-sm font-semibold text-gray-900">{task.name}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Agent: {task.agent}</span>
                </div>
                <div className="text-xs text-gray-500">Expected output: {task.output}</div>
              </div>
            ))}
            <button className="w-full py-3 border border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:text-indigo-600 hover:border-indigo-300">+ Add Task</button>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Process Type</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                  <option>Sequential</option><option>Hierarchical</option><option>Parallel</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Memory</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                  <option>Enabled</option><option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Max RPM</label>
                <input type="number" defaultValue={10} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Verbose</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                  <option>True</option><option>False</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Pipeline Preview</h3>
        <div className="flex items-center gap-3">
          {crew.tasks.map((task, i) => (
            <div key={task.id} className="flex items-center gap-3">
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 text-center min-w-[140px]">
                <div className="text-xs font-semibold text-indigo-700">{task.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{task.agent}</div>
              </div>
              {i < crew.tasks.length - 1 && <span className="text-gray-300 text-lg">\u2192</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}