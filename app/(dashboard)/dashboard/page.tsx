import { DashboardClient } from '@/components/dashboard/dashboard-client';

const DEMO_USER = { name: 'Gopal Yadav', plan: 'PRO', tokensUsed: 45200, tokensLimit: 10000000 };
const DEMO_STATS = { agents: 3, flows: 2, executions: 47, tokensToday: 12500 };
const DEMO_EXECUTIONS = [
  { id: '1', agentName: 'Research Agent', status: 'COMPLETED', tokensUsed: 3200, latencyMs: 1850, startedAt: new Date().toISOString() },
  { id: '2', agentName: 'Writer Agent', status: 'COMPLETED', tokensUsed: 5100, latencyMs: 2400, startedAt: new Date().toISOString() },
  { id: '3', agentName: 'Code Reviewer', status: 'RUNNING', tokensUsed: 1800, latencyMs: 920, startedAt: new Date().toISOString() },
  { id: '4', agentName: 'Data Analyst', status: 'FAILED', tokensUsed: 450, latencyMs: 350, startedAt: new Date().toISOString() },
];

export default async function DashboardPage() {
  // TODO: Replace with real data when database is connected
  // const { userId } = await auth();
  // const user = await db.user.findUnique({ where: { clerkId: userId } });

  return <DashboardClient user={DEMO_USER} stats={DEMO_STATS} recentExecutions={DEMO_EXECUTIONS} />;
}
