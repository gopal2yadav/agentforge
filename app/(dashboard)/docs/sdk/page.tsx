'use client';
import { useState } from 'react';
export default function DocsSDKPage() {
  const [copied, setCopied] = useState('');
  const copy = (id, text) => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(id); setTimeout(() => setCopied(''), 2000); };
  const examples = [
    { id: 'install', title: 'Installation', lang: 'bash', code: 'npm install @nexus/sdk\n# or\nyarn add @nexus/sdk' },
    { id: 'init', title: 'Initialize Client', lang: 'typescript', code: "import { NexusClient } from '@nexus/sdk';\n\nconst nexus = new NexusClient({\n  apiKey: process.env.NEXUS_API_KEY,\n  baseUrl: 'https://agentforcecrew.com/api',\n});" },
    { id: 'run', title: 'Run an Agent', lang: 'typescript', code: "const result = await nexus.agents.run({\n  agentId: 'research-agent',\n  prompt: 'Analyze Q1 market trends in EdTech',\n  model: 'claude-sonnet-4',\n});\n\nconsole.log(result.output);\nconsole.log('Tokens:', result.usage.totalTokens);" },
    { id: 'flow', title: 'Execute a Flow', lang: 'typescript', code: "const flow = await nexus.flows.execute({\n  flowId: 'content-pipeline',\n  input: { topic: 'AI in Healthcare 2026' },\n  waitForCompletion: true,\n});\n\nflow.steps.forEach(step => {\n  console.log(step.agent, step.status, step.tokens);\n});" },
    { id: 'webhook', title: 'Register Webhook', lang: 'typescript', code: "await nexus.webhooks.create({\n  url: 'https://your-app.com/api/nexus-events',\n  events: ['agent.completed', 'agent.failed', 'flow.completed'],\n  secret: 'whsec_your_webhook_secret',\n});" },
    { id: 'curl', title: 'cURL Example', lang: 'bash', code: "curl -X POST https://agentforcecrew.com/api/agents/run \\\n  -H 'Authorization: Bearer YOUR_API_KEY' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"agentId\": \"research-agent\",\n    \"prompt\": \"Analyze market trends\"\n  }'" },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">SDK Reference</h1><p className="text-sm text-gray-500">Integrate Nexus into your applications with the TypeScript SDK</p></div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"><div className="text-lg font-bold text-gray-900">TypeScript</div><div className="text-[10px] text-gray-400 mt-0.5">Primary SDK</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"><div className="text-lg font-bold text-gray-900">REST API</div><div className="text-[10px] text-gray-400 mt-0.5">Any language</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"><div className="text-lg font-bold text-gray-900">Webhooks</div><div className="text-[10px] text-gray-400 mt-0.5">Event-driven</div></div>
      </div>
      <div className="space-y-4">
        {examples.map(ex => (
          <div key={ex.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2"><span className="text-sm font-semibold text-gray-900">{ex.title}</span><span className="text-[9px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{ex.lang}</span></div>
              <button onClick={() => copy(ex.id, ex.code)} className="text-[11px] text-gray-400 hover:text-indigo-600 transition-colors">{copied === ex.id ? 'Copied!' : 'Copy'}</button>
            </div>
            <pre className="px-5 py-4 text-xs font-mono text-gray-700 bg-gray-50 overflow-x-auto whitespace-pre-wrap leading-relaxed">{ex.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}