'use client';

const CHANGELOG = [
  { version: '2.9.0', date: 'Apr 13, 2026', title: 'Enterprise Features', changes: [
    { type: 'feat', text: 'Visual Flow Builder — drag-and-drop workflow canvas with 5 node types' },
    { type: 'feat', text: 'Agent Marketplace — 6 industry templates with 19 pre-built agents' },
    { type: 'feat', text: 'Public API /api/v1/run — external developers can call agents programmatically' },
    { type: 'feat', text: 'Webhook Triggers — auto-process events from Stripe, GitHub, Slack' },
    { type: 'feat', text: 'Scheduled Runs — cron jobs for automated agent execution' },
    { type: 'feat', text: 'Human-in-the-Loop Approvals — enterprise governance with risk levels' },
    { type: 'feat', text: 'API Key Management — generate, copy, and revoke API keys' },
    { type: 'feat', text: 'Embeddable Chat Widget — add AI agents to any website' },
  ]},
  { version: '2.8.0', date: 'Apr 12, 2026', title: 'Universe Theme + Real AI', changes: [
    { type: 'design', text: 'Universe Theme — animated stars, nebulae, glass morphism, cosmic sidebar' },
    { type: 'feat', text: 'Multi-turn AI Playground with full conversation history via Claude Sonnet 4' },
    { type: 'feat', text: 'Code Sandbox with real JS execution + AI Python' },
    { type: 'feat', text: '5 Intelligent Swarm Templates with 17 specialized agents' },
    { type: 'feat', text: 'Dynamic Integrations page with webhook URLs and setup steps' },
    { type: 'feat', text: 'Real-time Monitoring with auto-refresh health checks' },
    { type: 'fix', text: 'Zero demo data — all pages show only real database content' },
  ]},
  { version: '2.5.0', date: 'Apr 12, 2026', title: 'Core Platform', changes: [
    { type: 'feat', text: 'Agent CRUD with Neon Postgres database' },
    { type: 'feat', text: 'Flow and Crew management' },
    { type: 'feat', text: 'Stripe payment integration' },
    { type: 'feat', text: 'Clerk authentication' },
    { type: 'feat', text: '8 pre-built agent templates' },
    { type: 'feat', text: 'Real Anthropic Claude API integration' },
  ]},
  { version: '2.0.0', date: 'Apr 12, 2026', title: 'Infrastructure Rebuild', changes: [
    { type: 'feat', text: 'Complete Vercel + Neon + Clerk + Stripe stack' },
    { type: 'feat', text: 'Prisma ORM with schema for Agents, Flows, Crews, Automations' },
    { type: 'feat', text: 'Custom domain agentforcecrew.com' },
    { type: 'fix', text: 'Fixed Stripe webhook crash handling' },
    { type: 'fix', text: 'Fixed Clerk middleware for API routes' },
  ]},
];

export default function ChangelogPage() {
  const typeColors: Record<string, any> = {
    feat: { bg: 'rgba(99,102,241,0.1)', text: '#a5b4fc', border: 'rgba(99,102,241,0.2)' },
    fix: { bg: 'rgba(16,185,129,0.1)', text: '#6ee7b7', border: 'rgba(16,185,129,0.2)' },
    design: { bg: 'rgba(139,92,246,0.1)', text: '#c4b5fd', border: 'rgba(139,92,246,0.2)' },
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Changelog</h1>
      <p className="text-sm text-indigo-300/50 mb-8">Platform updates and new features</p>
      <div className="space-y-8">
        {CHANGELOG.map(release => (
          <div key={release.version}>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-lg text-sm font-bold font-mono" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>v{release.version}</span>
              <span className="text-xs text-indigo-300/40">{release.date}</span>
              <span className="text-sm font-semibold">{release.title}</span>
            </div>
            <div className="rounded-xl p-5 space-y-2" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              {release.changes.map((change, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase shrink-0 mt-0.5" style={{ background: typeColors[change.type]?.bg, color: typeColors[change.type]?.text, border: '1px solid ' + typeColors[change.type]?.border }}>{change.type}</span>
                  <span className="text-xs text-indigo-200/70">{change.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}