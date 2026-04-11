'use client';
import { useState } from 'react';
export default function GuardrailsPage() {
  const [piiFilter, setPiiFilter] = useState(true);
  const [toxicFilter, setToxicFilter] = useState(true);
  const [hallucination, setHallucination] = useState(true);
  const [costLimit, setCostLimit] = useState(true);
  const rules = [
    { id: 'r1', name: 'PII Detection', desc: 'Automatically redact personal identifiable information from agent outputs (emails, phone numbers, SSNs)', enabled: piiFilter, toggle: setPiiFilter, severity: 'block', triggers: 142 },
    { id: 'r2', name: 'Toxicity Filter', desc: 'Block harmful, offensive, or inappropriate content in agent responses', enabled: toxicFilter, toggle: setToxicFilter, severity: 'block', triggers: 8 },
    { id: 'r3', name: 'Hallucination Guard', desc: 'Flag responses with low confidence scores or unverifiable claims', enabled: hallucination, toggle: setHallucination, severity: 'warn', triggers: 34 },
    { id: 'r4', name: 'Cost Threshold', desc: 'Alert when a single execution exceeds token or cost limits', enabled: costLimit, toggle: setCostLimit, severity: 'warn', triggers: 3 },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Guardrails</h1><p className="text-sm text-gray-500">Safety policies and content filters for your AI agents</p></div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Active Rules</div><div className="text-xl font-bold text-gray-900 mt-1">{rules.filter(r => r.enabled).length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Triggers (30d)</div><div className="text-xl font-bold text-amber-600 mt-1">{rules.reduce((a, r) => a + r.triggers, 0)}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Blocked</div><div className="text-xl font-bold text-red-600 mt-1">{rules.filter(r => r.severity === 'block').reduce((a, r) => a + r.triggers, 0)}</div></div>
      </div>
      <div className="space-y-3">
        {rules.map(r => (
          <div key={r.id} className={'bg-white border rounded-xl p-5 shadow-sm transition-all ' + (r.enabled ? 'border-gray-200' : 'border-gray-100 opacity-60')}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">{r.name}</span>
                <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ' + (r.severity === 'block' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600')}>{r.severity}</span>
              </div>
              <button onClick={() => r.toggle(!r.enabled)} className={'relative w-11 h-6 rounded-full transition-colors ' + (r.enabled ? 'bg-indigo-600' : 'bg-gray-200')}>
                <span className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ' + (r.enabled ? 'translate-x-5' : 'translate-x-0.5')} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">{r.desc}</p>
            <div className="text-[10px] text-gray-400">Triggered {r.triggers} times in the last 30 days</div>
          </div>
        ))}
      </div>
    </div>
  );
}