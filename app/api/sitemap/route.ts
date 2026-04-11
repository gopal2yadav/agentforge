import { NextResponse } from 'next/server';
export async function GET() {
  const base = 'https://agentforcecrew.com';
  const pages = ['/', '/pricing', '/docs', '/docs/api', '/docs/sdk', '/about', '/contact', '/privacy', '/terms', '/careers',
    '/dashboard', '/builder', '/studio', '/agents', '/agents/create', '/flows', '/flows/create', '/flows/editor',
    '/automations', '/playground', '/playground/multi', '/playground/history', '/templates', '/marketplace',
    '/knowledge', '/memory', '/integrations', '/pipelines',
    '/traces', '/deployments', '/monitoring', '/logs', '/analytics', '/activity', '/history', '/status', '/notifications',
    '/scheduled', '/changelog', '/compare', '/benchmarks', '/prompts', '/usage', '/errors', '/versions', '/testing', '/alerts',
    '/billing', '/settings', '/settings/security', '/settings/branding', '/settings/api-keys', '/settings/webhooks',
    '/settings/rate-limits', '/settings/llm-connections', '/settings/env-vars', '/settings/audit-log', '/settings/export',
    '/settings/team', '/settings/webhook-log', '/profile', '/calculator', '/getting-started', '/feedback', '/roadmap', '/search',
  ];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(p => '  <url><loc>' + base + p + '</loc><changefreq>weekly</changefreq></url>'),
    '</urlset>',
  ].join('\n');
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}