import Link from 'next/link';

const FLOWS = [
  { id: '1', name: 'Content Pipeline', desc: 'Research > Write > Review > Publish', nodes: 4, status: 'active', lastRun: '15 min ago', runs: 47 },
  { id: '2', name: 'Code Review Flow', desc: 'Analyze PR > Review > Post Comments', nodes: 3, status: 'active', lastRun: '2 hours ago', runs: 89 },
  { id: '3', name: 'Lead Scoring', desc: 'Enrich > Score > Route to Sales', nodes: 3, status: 'paused', lastRun: '3 days ago', runs: 12 },
];

export default function FlowsPage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Flows</h1>
          <p className="text-sm text-gray-500">{FLOWS.length} multi-agent workflows configured</p>
        </div>
        <div className="flex gap-2">
          <Link href="/flows/create" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create Flow</Link>
          <Link href="/flows/editor" className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300">Open Editor</Link>
        </div>
      </div>
      <div className="space-y-3">
        {FLOWS.map(flow => (
          <div key={flow.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{flow.nodes}</div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">{flow.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{flow.desc}</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-gray-400">{flow.nodes} nodes</span>
                    <span className="text-[10px] text-gray-400">{flow.runs} runs</span>
                    <span className="text-[10px] text-gray-400">Last: {flow.lastRun}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/flows/editor" className="px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-500 hover:text-indigo-600 hover:border-indigo-200">Edit</Link>
                <span className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold " + (flow.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>
                  <span className={"w-1.5 h-1.5 rounded-full " + (flow.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />{flow.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}