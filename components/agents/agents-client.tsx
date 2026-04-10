'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Plus, Play, Pause, Settings2, Trash2, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent { id: string; name: string; description: string | null; model: string; provider: string; status: string; totalRuns: number; successCount: number; avgLatencyMs: number; updatedAt: string; }

const STATUS: Record<string, { bg: string; text: string; dot: string }> = {
  ACTIVE: { bg: 'bg-[#22c55e]/10', text: 'text-[#22c55e]', dot: 'bg-[#22c55e]' },
  IDLE: { bg: 'bg-[#6b6b8a]/20', text: 'text-[#6b6b8a]', dot: 'bg-[#6b6b8a]' },
  ERROR: { bg: 'bg-[#ef4444]/10', text: 'text-[#ef4444]', dot: 'bg-[#ef4444]' },
  PAUSED: { bg: 'bg-amber-500/10', text: 'text-amber-500', dot: 'bg-amber-500' },
};

const MODELS: Record<string, { color: string }> = {
  'claude-sonnet-4-20250514': { color: '#6366f1' },
  'gpt-4o': { color: '#22c55e' },
  'gpt-4o-mini': { color: '#22d3ee' },
  'llama-3.3-70b': { color: '#f59e0b' },
};

export function AgentsClient({ agents, plan }: { agents: Agent[]; plan: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const limit = plan === 'FREE' ? 3 : plan === 'PRO' ? 25 : 999;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight mb-1">My Agents</h1><p className="text-sm text-[#6b6b8a]">{agents.length} of {limit} agents</p></div>
        <button onClick={() => setShowCreate(true)} disabled={agents.length >= limit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20 disabled:opacity-50">
          <Plus className="w-4 h-4" /> Create Agent
        </button>
      </div>

      {agents.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-[#14141f]/30 border border-[#2a2a3d] border-dashed rounded-2xl">
          <Bot className="w-14 h-14 mx-auto mb-4 text-[#3a3a4d]" />
          <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
          <p className="text-sm text-[#6b6b8a] mb-6 max-w-sm mx-auto">Create your first AI agent to start automating tasks</p>
          <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold">
            <Plus className="w-4 h-4" /> Create Your First Agent
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {agents.map((agent, i) => {
            const s = STATUS[agent.status] || STATUS.IDLE;
            const mc = MODELS[agent.model]?.color || '#6366f1';
            const successRate = agent.totalRuns > 0 ? ((agent.successCount / agent.totalRuns) * 100).toFixed(0) : '—';
            return (
              <motion.div key={agent.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: mc + '15' }}>
                      <Bot className="w-5 h-5" style={{ color: mc }} />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold group-hover:text-[#6366f1] transition-colors">{agent.name}</div>
                      <div className="text-xs text-[#6b6b8a] flex items-center gap-3 mt-0.5">
                        <span>{agent.model.split('-').slice(0,2).join('-')}</span>
                        <span>{agent.totalRuns} runs</span>
                        <span>{successRate}% success</span>
                        <span>{agent.avgLatencyMs}ms avg</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize', s.bg, s.text)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
                      {agent.status.toLowerCase()}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-[#2a2a3d]"><Play className="w-3.5 h-3.5 text-[#22c55e]" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-[#2a2a3d]"><Settings2 className="w-3.5 h-3.5 text-[#6b6b8a]" /></button>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6b6b8a] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
