'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function OnboardingPage() {
  const [completed, setCompleted] = useState([true, true, false, false, false, false]);
  const toggle = (i) => { const n = [...completed]; n[i] = !n[i]; setCompleted(n); };
  const steps = [
    { title: 'Create your account', desc: 'Sign up with Google SSO or email', link: '/sign-up', done: true },
    { title: 'Connect an LLM provider', desc: 'Add your Anthropic, OpenAI, or other API key', link: '/settings/llm-connections', done: true },
    { title: 'Create your first agent', desc: 'Define a role, goal, backstory, and tools', link: '/agents/create', done: false },
    { title: 'Run a test in the Playground', desc: 'Test your agent with a sample prompt', link: '/playground', done: false },
    { title: 'Build a multi-agent flow', desc: 'Chain agents together into a pipeline', link: '/flows/create', done: false },
    { title: 'Set up monitoring', desc: 'Enable traces and error tracking', link: '/traces', done: false },
  ];
  const pct = Math.round((completed.filter(Boolean).length / steps.length) * 100);
  return (
    <div className="max-w-[700px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Getting Started</h1><p className="text-sm text-gray-500">Complete these steps to set up your platform</p></div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-900">{completed.filter(Boolean).length} of {steps.length} completed</span>
          <span className="text-sm font-bold text-indigo-600">{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{width: pct + '%'}} /></div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className={'bg-white border rounded-xl p-4 flex items-center gap-4 transition-all ' + (completed[i] ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 hover:border-indigo-200')}>
            <button onClick={() => toggle(i)} className={'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ' + (completed[i] ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 hover:border-indigo-500')}>
              {completed[i] && <span className="text-xs">\u2713</span>}
            </button>
            <div className="flex-1 min-w-0">
              <div className={'text-sm font-medium ' + (completed[i] ? 'text-gray-400 line-through' : 'text-gray-900')}>{step.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{step.desc}</div>
            </div>
            {!completed[i] && <Link href={step.link} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium shrink-0">Start</Link>}
          </div>
        ))}
      </div>
    </div>
  );
}