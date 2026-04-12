'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TEMPLATES = [
  { id: '1', name: 'Research Assistant', role: 'Senior Research Analyst', goal: 'Find, analyze, and summarize information from multiple sources', backstory: 'Expert researcher with 10 years of experience in data analysis and report writing', tools: ['web_search', 'summarizer', 'document_reader'], category: 'Research' },
  { id: '2', name: 'Code Reviewer', role: 'Principal Software Engineer', goal: 'Review code for bugs, security issues, and best practices', backstory: 'Staff engineer with deep expertise in code quality, security, and architecture', tools: ['code_analyzer', 'github_pr', 'linter'], category: 'Engineering' },
  { id: '3', name: 'Content Writer', role: 'Senior Content Strategist', goal: 'Create engaging blog posts, articles, and marketing copy', backstory: 'Published author and content strategist with expertise in SEO and audience engagement', tools: ['web_search', 'document_reader', 'summarizer'], category: 'Marketing' },
  { id: '4', name: 'Data Analyst', role: 'Lead Data Scientist', goal: 'Analyze datasets and generate actionable business insights', backstory: 'PhD in Statistics with 8 years of industry experience in ML and data visualization', tools: ['csv_parser', 'chart_generator', 'sql_query'], category: 'Analytics' },
  { id: '5', name: 'Customer Support', role: 'Senior Support Specialist', goal: 'Resolve customer issues quickly and empathetically', backstory: 'Customer success expert with deep product knowledge and communication skills', tools: ['email_sender', 'slack_notifier', 'summarizer'], category: 'Support' },
  { id: '6', name: 'DevOps Engineer', role: 'Senior DevOps Engineer', goal: 'Monitor, deploy, and optimize infrastructure', backstory: 'Cloud infrastructure expert with certifications in AWS, GCP, and Kubernetes', tools: ['code_analyzer', 'slack_notifier', 'calendar'], category: 'Engineering' },
  { id: '7', name: 'Sales Assistant', role: 'Sales Development Rep', goal: 'Qualify leads and schedule meetings with prospects', backstory: 'Top-performing SDR with expertise in outbound sales and CRM management', tools: ['email_sender', 'calendar', 'web_search'], category: 'Sales' },
  { id: '8', name: 'Project Manager', role: 'Senior Project Manager', goal: 'Coordinate tasks, track progress, and manage timelines', backstory: 'PMP certified with 12 years of experience managing cross-functional teams', tools: ['slack_notifier', 'calendar', 'email_sender'], category: 'Management' },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [installing, setInstalling] = useState<string | null>(null);
  const [installed, setInstalled] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(TEMPLATES.map(t => t.category)))];

  const handleInstall = async (template: typeof TEMPLATES[0]) => {
    setInstalling(template.id);
    try {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: template.name, role: template.role, goal: template.goal, backstory: template.backstory, tools: template.tools }),
      });
      setInstalled(prev => [...prev, template.id]);
      setTimeout(() => setInstalling(null), 500);
    } catch (e) { setInstalling(null); }
  };

  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Templates</h1>
          <p className="text-sm text-gray-500">{TEMPLATES.length} pre-built agent templates</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ' + (filter === c ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[15px] font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-gray-100 text-gray-600">{t.category}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">{t.goal}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {t.tools.map(tool => <span key={tool} className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-50 text-indigo-600">{tool}</span>)}
            </div>
            {installed.includes(t.id) ? (
              <button disabled className="w-full px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">Installed</button>
            ) : (
              <button onClick={() => handleInstall(t)} disabled={installing === t.id} className="w-full px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50">{installing === t.id ? 'Installing...' : 'Use Template'}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}