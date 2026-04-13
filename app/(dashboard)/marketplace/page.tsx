'use client';
import { useState } from 'react';

const MARKETPLACE = [
  { id: 'legal', name: 'Legal Document Review', industry: 'Legal', desc: 'Analyze contracts, extract clauses, flag risks, and generate summaries', agents: [
    { name: 'Contract Analyzer', role: 'Senior Legal Analyst', goal: 'Extract key clauses, obligations, and risk factors from legal documents', backstory: 'Former BigLaw associate with 10 years reviewing M&A and SaaS contracts', tools: ['document_reader', 'summarizer'] },
    { name: 'Risk Assessor', role: 'Legal Risk Officer', goal: 'Identify potential legal risks, compliance issues, and red flags', backstory: 'Compliance director at a Fortune 500 who built risk assessment frameworks', tools: ['document_reader', 'web_search'] },
    { name: 'Summary Writer', role: 'Legal Writer', goal: 'Produce clear executive summaries of legal documents for non-lawyers', backstory: 'Legal journalist who translates complex legalese into plain English', tools: ['summarizer', 'document_reader'] },
  ], price: 'Free', downloads: 847, rating: 4.9 },
  { id: 'healthcare', name: 'Patient Intake Automation', industry: 'Healthcare', desc: 'Process patient forms, verify insurance, triage symptoms, and schedule appointments', agents: [
    { name: 'Intake Processor', role: 'Medical Admin', goal: 'Process and validate patient intake forms accurately', backstory: 'Healthcare admin with 15 years managing patient records across hospital systems', tools: ['document_reader', 'csv_parser'] },
    { name: 'Insurance Verifier', role: 'Benefits Specialist', goal: 'Verify insurance coverage and pre-authorization requirements', backstory: 'Insurance specialist who processed 50K+ claims with 99.5% accuracy', tools: ['web_search', 'email_sender'] },
    { name: 'Triage Assistant', role: 'Clinical Triage Nurse', goal: 'Assess symptom severity and recommend appropriate care level', backstory: 'ER triage nurse with clinical decision support expertise', tools: ['summarizer', 'slack_notifier'] },
  ], price: 'Free', downloads: 623, rating: 4.8 },
  { id: 'finance', name: 'Financial Analysis Suite', industry: 'Finance', desc: 'Analyze financial statements, generate reports, track KPIs, and forecast trends', agents: [
    { name: 'Financial Analyst', role: 'Senior Financial Analyst', goal: 'Analyze financial statements and identify trends, anomalies, and opportunities', backstory: 'CFA charterholder with 12 years at top investment banks analyzing public and private companies', tools: ['csv_parser', 'chart_generator', 'sql_query'] },
    { name: 'KPI Tracker', role: 'Business Intelligence Analyst', goal: 'Monitor key performance indicators and alert on significant changes', backstory: 'Built real-time KPI dashboards for 3 unicorn startups', tools: ['csv_parser', 'chart_generator', 'slack_notifier'] },
    { name: 'Forecast Modeler', role: 'Quantitative Analyst', goal: 'Build financial forecasts and scenario models', backstory: 'PhD in Economics, built prediction models at hedge funds managing $5B+', tools: ['csv_parser', 'chart_generator', 'code_analyzer'] },
  ], price: 'Free', downloads: 1203, rating: 4.9 },
  { id: 'marketing', name: 'Content Marketing Engine', industry: 'Marketing', desc: 'Research topics, write blog posts, optimize for SEO, and schedule social media', agents: [
    { name: 'Topic Researcher', role: 'Content Strategist', goal: 'Research trending topics and identify high-value content opportunities', backstory: 'Content strategist who grew organic traffic from 0 to 5M monthly visits', tools: ['web_search', 'summarizer'] },
    { name: 'Blog Writer', role: 'Senior Content Writer', goal: 'Write engaging, SEO-optimized blog posts and articles', backstory: 'Published author with 500+ articles generating 20M+ page views', tools: ['web_search', 'document_reader', 'summarizer'] },
    { name: 'SEO Optimizer', role: 'Technical SEO Specialist', goal: 'Optimize content for search engines with keywords, meta tags, and structure', backstory: 'SEO consultant who ranked 100+ pages on Google page 1', tools: ['web_search', 'code_analyzer'] },
    { name: 'Social Scheduler', role: 'Social Media Manager', goal: 'Create and schedule social media posts across platforms', backstory: 'Social media manager who grew audiences to 500K+ across Twitter, LinkedIn, Instagram', tools: ['summarizer', 'email_sender'] },
  ], price: 'Free', downloads: 2156, rating: 4.7 },
  { id: 'sales', name: 'Sales Pipeline Automation', industry: 'Sales', desc: 'Qualify leads, personalize outreach, follow up, and update CRM', agents: [
    { name: 'Lead Qualifier', role: 'Sales Development Rep', goal: 'Score and qualify inbound leads based on ICP criteria', backstory: 'Top SDR who qualified 200+ leads/month with 45% conversion rate', tools: ['web_search', 'csv_parser', 'email_sender'] },
    { name: 'Outreach Writer', role: 'Sales Copywriter', goal: 'Write personalized cold emails and follow-up sequences', backstory: 'Sales copywriter whose templates achieved 35% open rates and 8% reply rates', tools: ['web_search', 'email_sender', 'summarizer'] },
    { name: 'CRM Updater', role: 'Sales Operations', goal: 'Keep CRM records accurate and pipeline stages updated', backstory: 'RevOps leader who built automated CRM workflows at 5 SaaS companies', tools: ['csv_parser', 'slack_notifier'] },
  ], price: 'Free', downloads: 1847, rating: 4.8 },
  { id: 'devops', name: 'DevOps Incident Response', industry: 'Engineering', desc: 'Monitor alerts, diagnose issues, coordinate response, and write postmortems', agents: [
    { name: 'Alert Monitor', role: 'SRE Engineer', goal: 'Monitor system alerts and classify severity levels', backstory: 'Site reliability engineer at AWS who maintained 99.999% uptime', tools: ['slack_notifier', 'code_analyzer'] },
    { name: 'Incident Commander', role: 'Incident Manager', goal: 'Coordinate incident response and communicate status updates', backstory: 'Led incident response at Google, managed 500+ P0/P1 incidents', tools: ['slack_notifier', 'email_sender', 'summarizer'] },
    { name: 'Postmortem Writer', role: 'Technical Writer', goal: 'Write clear, actionable postmortem reports with root cause analysis', backstory: 'Technical writer who created the incident postmortem template used by 200+ teams', tools: ['summarizer', 'document_reader'] },
  ], price: 'Free', downloads: 934, rating: 4.9 },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [installing, setInstalling] = useState<string | null>(null);
  const [installed, setInstalled] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const industries = ['All', ...Array.from(new Set(MARKETPLACE.map(m => m.industry)))];
  const filtered = MARKETPLACE.filter(m => {
    if (filter !== 'All' && m.industry !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.industry.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const installTemplate = async (template: typeof MARKETPLACE[0]) => {
    setInstalling(template.id);
    try {
      for (const agent of template.agents) {
        await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: agent.name, role: agent.role, goal: agent.goal, backstory: agent.backstory, tools: agent.tools, model: 'claude-sonnet-4' }),
        });
      }
      await fetch('/api/crews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: template.name, config: { agents: template.agents.map(a => a.name), process: 'sequential', industry: template.industry } }),
      });
      setInstalled(prev => [...prev, template.id]);
    } catch (e) {}
    setInstalling(null);
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Agent Marketplace</h1>
          <p className="text-sm text-indigo-300/50">{MARKETPLACE.length} industry templates | {MARKETPLACE.reduce((s, m) => s + m.agents.length, 0)} pre-built agents</p>
        </div>
      </div>

      <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-sm text-indigo-300/70">Install pre-built agent teams by industry. Each template creates specialized agents and organizes them into a crew. Agents are powered by <strong style={{ color: '#a5b4fc' }}>Claude Sonnet 4</strong> and execute with real AI.</p>
      </div>

      <div className="flex gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="flex-1 px-4 py-2.5 rounded-xl text-sm" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.2)', color: '#e0e7ff' }} />
        <div className="flex gap-2">
          {industries.map(ind => (
            <button key={ind} onClick={() => setFilter(ind)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={filter === ind ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' } : { background: 'transparent', color: 'rgba(148,163,184,0.6)', border: '1px solid rgba(99,102,241,0.1)' }}>{ind}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(template => {
          const isInstalled = installed.includes(template.id);
          const isInstalling = installing === template.id;
          const isExpanded = expanded === template.id;

          return (
            <div key={template.id} className="rounded-xl overflow-hidden transition-all" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[15px] font-semibold">{template.name}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>{template.industry}</span>
                    </div>
                    <p className="text-xs text-indigo-300/50">{template.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-indigo-300/40">{template.downloads.toLocaleString()} installs</div>
                      <div className="text-[10px]" style={{ color: '#fcd34d' }}>{'*'.repeat(Math.round(template.rating))} {template.rating}</div>
                    </div>
                    {isInstalled ? (
                      <span className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.2)' }}>Installed</span>
                    ) : (
                      <button onClick={() => installTemplate(template)} disabled={isInstalling} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{isInstalling ? 'Installing...' : 'Install (' + template.agents.length + ' agents)'}</button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {template.agents.map(a => (
                      <span key={a.name} className="px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(99,102,241,0.08)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.1)' }}>{a.name}</span>
                    ))}
                  </div>
                  <button onClick={() => setExpanded(isExpanded ? null : template.id)} className="text-[10px] text-indigo-400/50 ml-auto shrink-0">{isExpanded ? 'Hide' : 'Details'}</button>
                </div>
              </div>
              {isExpanded && (
                <div className="px-5 pb-5 space-y-2" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                  {template.agents.map(a => (
                    <div key={a.name} className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="font-semibold text-xs mb-1">{a.name} — {a.role}</div>
                      <div className="text-[10px] text-indigo-300/50 mb-1">{a.goal}</div>
                      <div className="flex gap-1">{a.tools.map(t => <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono" style={{ background: 'rgba(99,102,241,0.08)', color: '#818cf8' }}>{t}</span>)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}