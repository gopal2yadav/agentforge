import { AgentsClient } from '@/components/agents/agents-client';

const DEMO_AGENTS = [
  { id: '1', name: 'Research Agent', description: 'Autonomous web research and summarization', model: 'claude-sonnet-4-20250514', provider: 'ANTHROPIC', status: 'ACTIVE', totalRuns: 142, successCount: 138, avgLatencyMs: 1850, updatedAt: new Date().toISOString() },
  { id: '2', name: 'Code Reviewer', description: 'Reviews PRs and suggests improvements', model: 'claude-sonnet-4-20250514', provider: 'ANTHROPIC', status: 'IDLE', totalRuns: 89, successCount: 85, avgLatencyMs: 2100, updatedAt: new Date().toISOString() },
  { id: '3', name: 'Data Analyst', description: 'Processes CSV data and generates insights', model: 'gpt-4o', provider: 'OPENAI', status: 'ACTIVE', totalRuns: 67, successCount: 61, avgLatencyMs: 3200, updatedAt: new Date().toISOString() },
];

export default async function AgentsPage() {
  return <AgentsClient agents={DEMO_AGENTS} plan="PRO" />;
}
