import { MemoryClient } from '@/components/dashboard/memory-client';

const DEMO_MEMORIES = [
  { id: '1', scope: 'research', content: 'User prefers concise summaries with bullet points. Academic sources preferred over blogs.', importance: 0.92, accessCount: 34, updatedAt: new Date().toISOString() },
  { id: '2', scope: 'coding', content: 'Project uses TypeScript with strict mode. Prefers functional components with hooks over class components.', importance: 0.88, accessCount: 28, updatedAt: new Date().toISOString() },
  { id: '3', scope: 'general', content: 'User timezone is IST (UTC+5:30). Prefers responses in English. Works in AI/ML domain.', importance: 0.75, accessCount: 15, updatedAt: new Date().toISOString() },
  { id: '4', scope: 'writing', content: 'Tone should be professional but approachable. Avoid jargon unless technical audience is specified.', importance: 0.81, accessCount: 22, updatedAt: new Date().toISOString() },
];

export default async function MemoryPage() {
  return <MemoryClient memories={DEMO_MEMORIES} />;
}
