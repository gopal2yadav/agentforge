'use client';
import { useRouter } from 'next/navigation';

const TEMPLATES = [
  { id: 't1', name: 'Research Assistant', desc: 'Conducts web research, analyzes sources, and generates comprehensive reports', model: 'claude-sonnet-4', tools: ['web_search', 'summarizer', 'document_reader'], category: 'Research', popular: true },
  { id: 't2', name: 'Code Reviewer', desc: 'Reviews pull requests, checks for bugs, security issues, and suggests improvements', model: 'claude-sonnet-4', tools: ['github_pr', 'code_analyzer', 'linter'], category: 'Engineering', popular: true },
  { id: 't3', name: 'Content Writer', desc: 'Creates blog posts, social media content, and marketing copy', model: 'gpt-4o', tools: ['web_search', 'text_generator', 'seo_analyzer'], category: 'Marketing', popular: true },
  { id: 't4', name: 'Data Analyst', desc: 'Processes CSV/SQL data, generates insights, and creates visualizations', model: 'claude-sonnet-4', tools: ['sql_query', 'csv_parser', 'chart_generator'], category: 'Data', popular: false },
  { id: 't5', name: 'Customer Support', desc: 'Handles support tickets, answers FAQs, and escalates complex issues', model: 'gpt-4o-mini', tools: ['knowledge_base', 'ticket_manager', 'email_sender'], category: 'Support', popular: false },
  { id: 't6', name: 'Email Drafter', desc: 'Composes professional emails, follow-ups, and outreach sequences', model: 'claude-sonnet-4', tools: ['email_sender', 'contact_lookup', 'calendar'], category: 'Productivity', popular: false },
  { id: 't7', name: 'Meeting Summarizer', desc: 'Transcribes meetings, extracts action items, and sends follow-up notes', model: 'gpt-4o', tools: ['transcriber', 'summarizer', 'slack_notifier'], category: 'Productivity', popular: false },
  { id: 't8', name: 'SEO Optimizer', desc: 'Analyzes pages for SEO, suggests improvements, and tracks keyword rankings', model: 'gpt-4o-mini', tools: ['web_scraper', 'seo_analyzer', 'keyword_tracker'], category: 'Marketing', popular: false },
];

const CATEGORIES = ['All', ...new Set(TEMPLATES.map(t => t.category))];

export default function TemplatesPage() {
  const router = useRouter();
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agent Templates</h1>
        <p className="text-sm text-gray-500">Pre-built agents to get started quickly</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group relative">
            {t.popular && <div className="absolute -top-2 right-4 px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold uppercase rounded-full">Popular</div>}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{t.name.charAt(0)}</div>
              <div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.name}</div>
                <div className="text-[10px] text-gray-400">{t.category} &bull; {t.model}</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{t.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {t.tools.map(tool => (<span key={tool} className="px-2 py-0.5 rounded text-[9px] font-mono bg-gray-50 text-gray-500 border border-gray-100">{tool}</span>))}
            </div>
            <button onClick={() => router.push('/agents/create')}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}