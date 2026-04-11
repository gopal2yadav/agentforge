'use client';
import { useState } from 'react';
const MODELS = [
  { name: 'Claude Sonnet 4', inP: 0.003, outP: 0.015 },
  { name: 'Claude Opus 4', inP: 0.015, outP: 0.075 },
  { name: 'GPT-4o', inP: 0.005, outP: 0.015 },
  { name: 'GPT-4o Mini', inP: 0.00015, outP: 0.0006 },
];
export default function CalculatorPage() {
  const [mi, setMi] = useState(0);
  const [ag, setAg] = useState(3);
  const [rpd, setRpd] = useState(50);
  const [at, setAt] = useState(3000);
  const m = MODELS[mi];
  const dTok = ag * rpd * at;
  const dCost = dTok / 1000 * ((m.inP + m.outP) / 2);
  const mCost = dCost * 30;
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Cost Calculator</h1><p className="text-sm text-gray-500">Estimate monthly costs based on usage</p></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Configuration</h3>
          <div className="mb-4"><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Model</label>
            <select value={mi} onChange={e => setMi(Number(e.target.value))} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900">{MODELS.map((m, i) => <option key={i} value={i}>{m.name}</option>)}</select></div>
          <div className="mb-4"><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>Active Agents</span><span className="text-indigo-600">{ag}</span></label>
            <input type="range" min="1" max="25" value={ag} onChange={e => setAg(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
          <div className="mb-4"><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>Runs/Day/Agent</span><span className="text-indigo-600">{rpd}</span></label>
            <input type="range" min="1" max="500" value={rpd} onChange={e => setRpd(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
          <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>Avg Tokens/Run</span><span className="text-indigo-600">{at.toLocaleString()}</span></label>
            <input type="range" min="500" max="20000" step="500" value={at} onChange={e => setAt(Number(e.target.value))} className="w-full accent-indigo-600" /></div>
        </div>
        <div className="space-y-4">
          <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Est. Monthly Cost</div>
            <div className="text-4xl font-bold">{'$'}{mCost.toFixed(2)}</div>
            <div className="text-sm opacity-70 mt-1">{'$'}{dCost.toFixed(2)}/day</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Daily tokens</span><span className="font-mono text-gray-900">{dTok.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Monthly tokens</span><span className="font-mono text-gray-900">{((dTok * 30) / 1000000).toFixed(1)}M</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Runs/month</span><span className="font-mono text-gray-900">{(ag * rpd * 30).toLocaleString()}</span></div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-xs text-amber-800">{mCost < 49 ? 'Fits within Pro plan ($49/mo).' : 'Consider Enterprise for volume discounts.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}