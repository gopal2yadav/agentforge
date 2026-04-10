'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GitBranch, Plus, Bot, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Flow { id: string; name: string; description: string; status: string; nodeCount: number; agentCount: number; totalRuns: number; updatedAt: string; }

export function FlowsClient({ flows, plan }: { flows: Flow[]; plan: string }) {
  const router = useRouter();
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold mb-1">My Flows</h1><p className="text-sm text-nexus-400">Visual multi-agent workflows</p></div>
        <Link href="/flows/editor" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold"><Plus className="w-4 h-4"/>Create Flow</Link>
      </div>
      {flows.length===0?(<div className="text-center py-20 bg-nexus-800/30 border border-nexus-700/30 border-dashed rounded-2xl"><GitBranch className="w-14 h-14 mx-auto mb-4 text-nexus-600"/><h3 className="text-lg font-semibold mb-2">No flows yet</h3><Link href="/flows/editor" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold"><Plus className="w-4 h-4"/>Create First Flow</Link></div>):(
      <div className="space-y-3">{flows.map((f,i)=><motion.div key={f.id} initial={{opacity:0,y: 12}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}} onClick={()=>router.push(`/flows/editor?id=${f.id}`)} className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl p-5 hover:border-nexus-600/50 cursor-pointer group"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-11 h-11 rounded-xl bg-electric/10 flex items-center justify-center"><GitBranch className="w-5 h-5 text-electric"/></div><div><div className="text-[15px] font-semibold group-hover:text-electric">{f.name}</div><div className="text-xs text-nexus-500 flex gap-3"><span>{f.nodeCount} nodes</span><span><Bot className="w-3 h-3 inline"/> {f.agentCount}</span><span>{f.totalRuns} runs</span></div></div></div><ChevronRight className="w-4 h-4 text-nexus-500 opacity-0 group-hover:opacity-100"/></div></motion.div>)}</div>)}
    </div>
  );
}
