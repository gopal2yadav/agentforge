import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default async function MonitoringPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const events = await db.swarmEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-display font-bold mb-1">Monitoring</h1>
      <p className="text-sm text-nexus-400 mb-6">Real-time traces & swarm events</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{label:'Events',value:events.length,color:'#6366f1'},{label:'Warnings',value:events.filter(e=>e.severity==='warning').length,color:'#f59e0b'},{label:'Critical',value:events.filter(e=>e.severity==='critical').length,color:'#ef4444'}].map((m,i)=>(
          <div key={i} className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl p-5">
            <div className="text-2xl font-bold" style={{color:m.color}}>{m.value}</div>
            <div className="text-xs text-nexus-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl">
        <div className="px-5 py-3 border-b border-nexus-700/30"><h3 className="text-sm font-semibold">Swarm Event Log</h3></div>
        {events.length===0?<div className="py-12 text-center text-nexus-500 text-sm">No events yet</div>:
        <div className="divide-y divide-nexus-700/20">
          {events.slice(0,20).map(e=>(
            <div key={e.id} className="px-5 py-3 flex items-center gap-4 text-sm">
              <span className={`w-2 h-2 rounded-full ${e.severity==='critical'?'bg-danger':e.severity==='warning'?'bg-amber':'bg-pulse'}`} />
              <span className="font-mono text-xs text-nexus-400 w-20">{e.agentName}</span>
              <span className="flex-1 text-nexus-300">{e.action.replace(/_/g,' ')}</span>
              <span className="text-xs text-nexus-500">{new Date(e.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}
