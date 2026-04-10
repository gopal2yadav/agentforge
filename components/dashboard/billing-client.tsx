'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  { name: 'Starter', price: '$0', period: '/mo', icon: Zap, color: '#6b6b8a', features: ['3 agents', '100K tokens/mo', '50 API/day'] },
  { name: 'Pro', price: '$49', period: '/mo', icon: Crown, color: '#6366f1', popular: true, features: ['25 agents', '10M tokens/mo', '5K API/day', 'All models'] },
  { name: 'Enterprise', price: 'Custom', period: '', icon: Building2, color: '#22d3ee', features: ['Unlimited', 'SSO', 'On-prem', 'SLA'] },
];

export function BillingClient({ plan, tokensUsed, tokensLimit }: { plan: string; tokensUsed: number; tokensLimit: number }) {
  const [loading, setLoading] = useState(false);
  const pct = Math.min((tokensUsed/tokensLimit)*100, 100);
  const handleUpgrade = async () => { setLoading(true); try { const r=await fetch('/api/billing/checkout',{method:'POST'}); const{url}=await r.json(); if(url) window.location.href=url; } finally { setLoading(false); } };
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-display font-bold mb-1">Billing</h1>
      <p className="text-sm text-nexus-400 mb-6">Manage subscription & usage</p>
      <div className="bg-nexus-800/40 border border-nexus-700/30 rounded-xl p-6 mb-6">
        <div className="flex justify-between mb-4"><div><div className="text-sm text-nexus-400">Plan</div><div className="text-2xl font-bold">{plan}</div></div><div className="text-right"><div className="text-sm text-nexus-400">Tokens</div><div className="font-mono font-bold">{(tokensUsed/1000).toFixed(0)}K / {(tokensLimit/1000).toFixed(0)}K</div></div></div>
        <div className="h-2.5 bg-nexus-700/30 rounded-full overflow-hidden"><motion.div className="h-full rounded-full bg-electric" initial={{width:0}} animate={{width:`${pct}%`}}/></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {PLANS.map((p,i)=>{ const cur=plan===p.name.toUpperCase()||(plan==='FREE'&&p.name==='Starter'); return (
          <motion.div key={p.name} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className={cn('bg-nexus-800/40 border rounded-xl p-6',p.popular?'border-electric/40':'border-nexus-700/30')}>
            <p.icon className="w-5 h-5 mb-3" style={{color:p.color}}/>
            <div className="font-bold mb-1">{p.name}</div>
            <div className="mb-4"><span className="text-3xl font-bold">{p.price}</span><span className="text-nexus-500">{p.period}</span></div>
            <button onClick={p.name==='Pro'?handleUpgrade:undefined} disabled={cur||loading} className={cn('w-full py-2 rounded-lg text-sm font-semibold mb-4',cur?'bg-nexus-700/30 text-nexus-500':p.popular?'bg-electric text-white':'border border-nexus-600/30 text-nexus-300')}>{cur?'Current':p.name==='Pro'?'Upgrade':'Contact'}</button>
            {p.features.map(f=><div key={f} className="flex items-center gap-2 text-xs text-nexus-400 mb-1"><Check className="w-3 h-3 text-pulse"/>{f}</div>)}
          </motion.div>);})}
      </div>
    </div>
  );
}
