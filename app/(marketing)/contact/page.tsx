'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('demo');
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { if (name && email) { setSent(true); } };
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div><span className="text-base font-bold text-gray-900">Nexus</span></Link>
        <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Get Started</Link>
      </nav>
      <div className="max-w-[600px] mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Get in Touch</h1>
        <p className="text-gray-500 text-center mb-8">Request a demo, ask a question, or discuss enterprise pricing</p>
        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">\u2713</div>
            <div className="text-lg font-semibold text-emerald-700 mb-1">Message Sent!</div>
            <div className="text-sm text-emerald-600">We will get back to you within 24 hours.</div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex gap-2 mb-5">
              {['demo', 'enterprise', 'question', 'partnership'].map(t => (
                <button key={t} onClick={() => setType(t)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ' + (type === t ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900')}>{t}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email" className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
            </div>
            <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company (optional)" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 mb-3" />
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="How can we help?" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-4" />
            <button onClick={handleSubmit} disabled={!name || !email} className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">Send Message</button>
          </div>
        )}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <a href="mailto:gopal@aabhyasa.com" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors"><div className="text-sm font-semibold text-gray-900">Email</div><div className="text-[10px] text-gray-400 mt-0.5">gopal@aabhyasa.com</div></a>
          <a href="https://github.com/gopal2yadav/agentforge" className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors"><div className="text-sm font-semibold text-gray-900">GitHub</div><div className="text-[10px] text-gray-400 mt-0.5">Open Source</div></a>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="text-sm font-semibold text-gray-900">Response</div><div className="text-[10px] text-gray-400 mt-0.5">Within 24 hours</div></div>
        </div>
      </div>
    </div>
  );
}