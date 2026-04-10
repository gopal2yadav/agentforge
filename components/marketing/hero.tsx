'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Zap, GitBranch, Brain, ArrowRight, Sparkles, Shield, Activity } from 'lucide-react';

const FEATURES = [
  { icon: Bot, title: 'AI Agents', desc: 'Deploy autonomous agents powered by Claude, GPT-4o, and Llama', color: '#6366f1' },
  { icon: GitBranch, title: 'Visual Flows', desc: 'Build multi-agent workflows with drag-and-drop DAG editor', color: '#22c55e' },
  { icon: Brain, title: 'Persistent Memory', desc: 'Agents learn and remember across sessions with vector storage', color: '#ec4899' },
  { icon: Zap, title: 'Swarm Intelligence', desc: '6 persistent agents monitor, optimize, and self-heal 24/7', color: '#22d3ee' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 compliant, SSO, RBAC, and on-premise deployment', color: '#f59e0b' },
  { icon: Activity, title: 'Real-time Monitoring', desc: 'Full observability with traces, metrics, and cost tracking', color: '#ef4444' },
];

export function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#6366f108_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#22d3ee05_0%,_transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" /> Nexus AI Platform v2.0
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#6b6b8a]">Orchestrate AI Agents</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899]">That Think Together</span>
          </h1>
          <p className="text-lg text-[#6b6b8a] max-w-2xl mx-auto mb-10 leading-relaxed">
            Build, deploy, and manage autonomous AI agent swarms. Visual workflow builder, persistent memory, and real-time monitoring — all in one platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#6366f1] text-white font-semibold hover:bg-[#5558e6] transition-all shadow-2xl shadow-[#6366f1]/25 text-base">
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/sign-in" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#2a2a3d] text-[#a0a0b8] font-semibold hover:bg-[#14141f] transition-all text-base">
              Sign In
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-2xl p-6 hover:border-[#3a3a4d] transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color + '12' }}>
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6366f1] transition-colors">{f.title}</h3>
              <p className="text-sm text-[#6b6b8a] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center mt-20">
          <p className="text-sm text-[#4a4a5a]">Trusted by AI engineers building the future of autonomous systems</p>
        </motion.div>
      </div>
    </div>
  );
}
