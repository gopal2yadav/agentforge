'use client';
import { useState } from 'react';
const PROMPTS = [
  { id: '1', title: 'Market Research Brief', category: 'Research', prompt: 'Analyze the current market landscape for [INDUSTRY]. Include market size, growth rate, key players, emerging trends, and potential opportunities. Format as an executive brief.', uses: 234, rating: 4.8 },
  { id: '2', title: 'Code Review Checklist', category: 'Engineering', prompt: 'Review the following code for: 1) Security vulnerabilities 2) Performance issues 3) Best practices 4) Error handling 5) Code readability. Provide specific line-by-line feedback.', uses: 189, rating: 4.7 },
  { id: '3', title: 'Blog Post Draft', category: 'Content', prompt: 'Write a 1500-word blog post about [TOPIC]. Include an engaging introduction, 3-4 key sections with subheadings, relevant examples, and a compelling conclusion with a call to action.', uses: 156, rating: 4.6 },
  { id: '4', title: 'Customer Email Response', category: 'Support', prompt: 'Draft a professional, empathetic response to this customer complaint: [ISSUE]. Acknowledge their frustration, explain what happened, and offer a concrete resolution.', uses: 312, rating: 4.9 },
  { id: '5', title: 'Data Analysis Report', category: 'Data', prompt: 'Analyze this dataset and provide: 1) Summary statistics 2) Key trends 3) Anomalies or outliers 4) Actionable recommendations 5) Visualization suggestions.', uses: 98, rating: 4.5 },
  { id: '6', title: 'Competitor Analysis', category: 'Research', prompt: 'Compare [COMPANY] against its top 5 competitors across: pricing, features, market share, strengths, weaknesses, and strategic positioning. Present as a comparison matrix.', uses: 145, rating: 4.7 },
  { id: '7', title: 'Sprint Planning Summary', category: 'Project', prompt: 'Summarize the following sprint planning notes into: 1) Sprint goals 2) User stories with estimates 3) Dependencies 4) Risks 5) Team capacity assessment.', uses: 87, rating: 4.4 },
  { id: '8', title: 'SEO Content Brief', category: 'Marketing', prompt: 'Create an SEO content brief for the keyword [KEYWORD]. Include: target word count, H1/H2 structure, related keywords, search intent analysis, competitor content gaps, and recommended internal links.', uses: 201, rating: 4.8 },
];
const CATEGORIES = ['All', ...new Set(PROMPTS.map(p => p.category))];
export default function PromptLibraryPage() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');
  const filtered = PROMPTS.filter(p => (cat === 'All' || p.category === cat) && (!search || p.title.toLowerCase().includes(search.toLowerCase())));
  const copy = (id, text) => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(id); setTimeout(() => setCopied(''), 2000); };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Prompt Library</h1><p className="text-sm text-gray-500">Reusable prompt templates for your agents</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create Prompt</button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search prompts..." className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        {CATEGORIES.map(c => (<button key={c} onClick={() => setCat(c)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ' + (cat === c ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900')}>{c}</button>))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-gray-900">{p.title}</div>
              <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-gray-100 text-gray-500">{p.category}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{p.prompt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>{p.uses} uses</span>
                <span>{'\u2605'} {p.rating}</span>
              </div>
              <button onClick={() => copy(p.id, p.prompt)} className="px-3 py-1 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                {copied === p.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}