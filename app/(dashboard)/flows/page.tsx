import Link from 'next/link';

export default async function FlowsPage() {
  const flows = [
    { id: '1', name: 'Content Pipeline', description: 'Research → Write → Review → Publish', status: 'ACTIVE', totalRuns: 34, nodesCount: 4, updatedAt: new Date().toISOString() },
    { id: '2', name: 'Bug Triage', description: 'Analyze → Classify → Assign → Notify', status: 'DRAFT', totalRuns: 0, nodesCount: 5, updatedAt: new Date().toISOString() },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Agent Flows</h1>
          <p className="text-sm text-[#6b6b8a]">{flows.length} flows configured</p>
        </div>
        <Link href="/flows/editor" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + New Flow
        </Link>
      </div>
      <div className="space-y-3">
        {flows.map((flow) => (
          <Link key={flow.id} href="/flows/editor" className="block bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-semibold group-hover:text-[#6366f1] transition-colors">{flow.name}</div>
                <div className="text-xs text-[#6b6b8a] mt-1">{flow.description}</div>
                <div className="text-[11px] text-[#4a4a5a] mt-2">{flow.nodesCount} nodes · {flow.totalRuns} runs</div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${flow.status === 'ACTIVE' ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#6b6b8a]/20 text-[#6b6b8a]'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${flow.status === 'ACTIVE' ? 'bg-[#22c55e]' : 'bg-[#6b6b8a]'}`} />
                {flow.status.toLowerCase()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
