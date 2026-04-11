'use client';
import { useState } from 'react';
export default function FeedbackPage() {
  const [type, setType] = useState('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { if (message.trim()) { setSubmitted(true); setMessage(''); } };
  const faqs = [
    { q: 'How do I create my first agent?', a: 'Go to Agents > + New Agent, or use the AI Builder to describe what you want to automate.' },
    { q: 'How do I connect an LLM provider?', a: 'Go to Settings > LLM Connections and add your API key for Anthropic, OpenAI, or other providers.' },
    { q: 'What is the token limit on the Pro plan?', a: 'The Pro plan includes 10M tokens/month. You can track usage in the Analytics page.' },
    { q: 'How do I set up webhooks?', a: 'Go to Settings > Webhooks > + Add Endpoint. You can subscribe to events like agent.completed.' },
    { q: 'Can I export my agent configurations?', a: 'Yes, go to Settings > Export/Import to download all configs as JSON.' },
  ];
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Help & Feedback</h1><p className="text-sm text-gray-500">Get support or share your thoughts</p></div>
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center mb-6">
          <div className="text-2xl mb-2">\u2713</div>
          <div className="text-sm font-semibold text-emerald-700">Thank you! We received your {type}.</div>
          <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-emerald-600 hover:text-emerald-800">Send another</button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex gap-2 mb-4">
            {['feedback', 'bug', 'feature', 'question'].map(t => (
              <button key={t} onClick={() => setType(t)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ' + (type === t ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900')}>{t}</button>
            ))}
          </div>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder={'Describe your ' + type + '...'}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-3" />
          <button onClick={handleSubmit} disabled={!message.trim()} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">Submit</button>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Frequently Asked Questions</h3></div>
        {faqs.map((faq, i) => (
          <div key={i} className={'px-5 py-4' + (i < faqs.length - 1 ? ' border-b border-gray-100' : '')}>
            <div className="text-sm font-medium text-gray-900 mb-1">{faq.q}</div>
            <div className="text-xs text-gray-500">{faq.a}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <a href="mailto:gopal@aabhyasa.com" className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center hover:border-indigo-200 transition-colors">
          <div className="text-sm font-semibold text-gray-900">Email</div>
          <div className="text-[10px] text-gray-400 mt-0.5">gopal@aabhyasa.com</div>
        </a>
        <a href="https://github.com/gopal2yadav/agentforge/issues" className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center hover:border-indigo-200 transition-colors">
          <div className="text-sm font-semibold text-gray-900">GitHub Issues</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Report bugs & requests</div>
        </a>
        <a href="/docs" className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center hover:border-indigo-200 transition-colors">
          <div className="text-sm font-semibold text-gray-900">Documentation</div>
          <div className="text-[10px] text-gray-400 mt-0.5">API reference & guides</div>
        </a>
      </div>
    </div>
  );
}