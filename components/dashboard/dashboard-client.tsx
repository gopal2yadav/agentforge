'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, GitBranch, Zap, Activity, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardClientProps {
  user: { name: string; plan: string; tokensUsed: number; tokensLimit: number };
  stats: { agents: number; flows: number; executions: number; tokensToday: number };
  recentExecutions: Array<{ id: string; agentName: string; status: string; tokensUsed: number; latencyMs: number; startedAt: string }>;
}

const statusIcon = (s: string) => {
  if (s === 'COMPLETED') return <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />;
  if (s === 'FAILED') return <XCircle className="w-3.5 h-3.5 text-[#ef4444]" />;
  if (s === 'RUNNING') return <Loader2 className="w-3.5 h-3.5 text-[#6366f1] animate-spin" />;
  return <Clock className="w-3.5 h-3.5 text-[#6b6b8a]" />;
};

function MetricCard({ icon: Icon, label, value, color, trend, delay }: { icon: any; label: string; value: string | number; color: string; trend?: number; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
      className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '15' }}><Icon className="w-5 h-5" style={{ color }} /></div>
        {trend !== undefined && (
          <span className={cn('text-xs font-semibold flex items-center gap-0.5', trend > 0 ? 'text-[#22c55e]' : 'text-[#ef4444]')}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight mb-1">{value}</div>
      <div className="text-xs text-[#6b6b8a]">{label}</div>
    </motion.div>
  );
}

export function DashboardClient({ user, stats, recentExecutions }: DashboardClientProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(t); }, []);
  const greeting = time.getHours() < 12 ? 'Good morning' : time.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const pct = Math.min((user.tokensUsed / user.tokensLimit) * 100, 100);

  return (
    <div className="max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">{greeting}, {user.name.split(' ')[0]}</h1>
        <p className="text-sm text-[#6b6b8a]">{stats.agents} agents active · {stats.executions} runs today · {user.plan} plan</p>
      </motion.div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard icon={Bot} label="Active Agents" value={stats.agents} color="#6366f1" trend={12} delay={0} />
        <MetricCard icon={GitBranch} label="Active Flows" value={stats.flows} color="#22c55e" trend={8} delay={0.08} />
        <MetricCard icon={Zap} label="API Calls Today" value={stats.executions} color="#ec4899" trend={15} delay={0.16} />
        <MetricCard icon={Activity} label="Tokens Today" value={(stats.tokensToday / 1000).toFixed(1) + 'K'} color="#22d3ee" trend={-3} delay={0.24} />
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold mb-3">Recent Executions</h3>
        {recentExecutions.length === 0 ? (
          <div className="text-center py-8 text-[#6b6b8a] text-sm">No executions yet. Create an agent to get started.</div>
        ) : (
          <div className="space-y-1">{recentExecutions.map((exec, i) => (
            <motion.div key={exec.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#1a1a2e] transition-colors">
              {statusIcon(exec.status)}
              <span className="text-[13px] font-medium flex-1">{exec.agentName}</span>
              <span className="text-[11px] font-mono text-[#6b6b8a]">{exec.tokensUsed.toLocaleString()} tok</span>
              <span className="text-[11px] font-mono text-[#6b6b8a]">{exec.latencyMs}ms</span>
            </motion.div>
          ))}</div>
        )}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
        <div className="flex justify-between text-xs mb-2"><span className="text-[#6b6b8a]">Token Usage</span><span className="font-mono text-[#a0a0b8]">{(user.tokensUsed/1000).toFixed(0)}K / {(user.tokensLimit/1000).toFixed(0)}K</span></div>
        <div className="h-2 bg-[#2a2a3d] rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: pct > 80 ? '#ef4444' : '#6366f1' }} initial={{ width: 0 }} animate={{ width: pct + '%' }} transition={{ duration: 1 }} />
        </div>
        <div className="text-[11px] text-[#6b6b8a] mt-1">{pct.toFixed(0)}% used this billing period</div>
      </motion.div>
    </div>
  );
}
