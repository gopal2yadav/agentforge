'use client';
import { useState } from 'react';
const NODES = [
  { id: 'n1', type: 'trigger', name: 'Start', x: 50, y: 30, desc: 'Flow trigger' },
  { id: 'n2', type: 'agent', name: 'Research Agent', x: 50, y: 120, desc: 'Gather data from sources' },
  { id: 'n3', type: 'agent', name: 'Writer Agent', x: 50, y: 210, desc: 'Draft content from research' },
  { id: 'n4', type: 'condition', name: 'Quality Check', x: 50, y: 300, desc: 'Score >= 0.8 ?' },
  { id: 'n5', type: 'agent', name: 'Reviewer Agent', x: 50, y: 390, desc: 'Final review and publish' },
];
export default function FlowEditorPage() {
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const handleRun = () => {
    setRunning(true); setRunResult(null);
    setTimeout(() => {
      setRunning(false);
      setRunResult({ status: 'completed', duration: '4.2s', tokens: 3840, output: 'Flow completed successfully. 5/5 steps executed.' });
    }, 3000);
  };
  const nodeColor = (t) => t === 'trigger' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : t === 'condition' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-indigo-200 text-gray-900';
  const sel = selected ? NODES.find(n => n.id === selected) : null;
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-xl font-bold text-gray-900">Flow Editor</h1><p className="text-xs text-gray-400">Content Pipeline &bull; 5 nodes</p></div>
        <div className="flex gap-2">
          <button onClick={handleRun} disabled={running} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 shadow-sm">{running ? 'Running...' : 'Run Flow'}</button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Save</button>
        </div>
      </div>
      {runResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-emerald-600 font-bold">\u2713</span><span className="text-sm text-emerald-700 font-medium">{runResult.output}</span></div>
          <span className="text-xs text-emerald-600">{runResult.duration} &bull; {runResult.tokens} tokens</span>
        </div>
      )}
      {running && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-indigo-600 font-medium">Executing flow steps...</span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[500px]">
          <div className="space-y-2">
            {NODES.map((node, i) => (
              <div key={node.id}>
                <div onClick={() => setSelected(node.id)}
                  className={'px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ' + nodeColor(node.type) + (selected === node.id ? ' ring-2 ring-indigo-400 shadow-md' : ' hover:shadow-sm')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{node.type}</span>
                      <span className="text-sm font-semibold">{node.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{node.id}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{node.desc}</div>
                </div>
                {i < NODES.length - 1 && <div className="flex justify-center py-1"><div className="w-px h-4 bg-gray-300" /><span className="text-gray-300 text-xs ml-1">\u2193</span></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{sel ? 'Node Properties' : 'Select a Node'}</h3>
          {sel ? (
            <div className="space-y-3">
              <div><span className="text-[10px] text-gray-400 uppercase">Name</span><div className="text-sm font-medium text-gray-900">{sel.name}</div></div>
              <div><span className="text-[10px] text-gray-400 uppercase">Type</span><div className="text-sm text-gray-700">{sel.type}</div></div>
              <div><span className="text-[10px] text-gray-400 uppercase">Description</span><div className="text-sm text-gray-700">{sel.desc}</div></div>
              <div><span className="text-[10px] text-gray-400 uppercase">Node ID</span><div className="text-xs font-mono text-gray-400">{sel.id}</div></div>
              {sel.type === 'agent' && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400 uppercase">Model</span>
                  <div className="text-sm text-indigo-600">claude-sonnet-4</div>
                  <span className="text-[10px] text-gray-400 uppercase mt-2 block">Max Tokens</span>
                  <div className="text-sm text-gray-700">4096</div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">Click on a node in the canvas to see its properties and configuration.</p>
          )}
        </div>
      </div>
    </div>
  );
}