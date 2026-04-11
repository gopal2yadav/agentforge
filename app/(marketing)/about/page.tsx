import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-[1000px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div>
          <span className="text-base font-bold text-gray-900">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Get Started</Link>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">About Nexus</h1>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Nexus is an enterprise-grade AI agent orchestration platform built by Aabhyasa AI. 
          We help teams build, deploy, and manage autonomous AI agents that collaborate to solve complex tasks.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe AI agents should work together like high-performing teams. Nexus provides the infrastructure 
              to orchestrate multi-agent workflows, persistent memory, and real-time monitoring — all from a single platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What Makes Nexus Different</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-1">Multi-Model Support</div>
                <div className="text-xs text-gray-500">Works with Claude, GPT-4o, Gemini, Llama, and 25+ models across 5 providers.</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-1">Visual Workflow Builder</div>
                <div className="text-xs text-gray-500">Drag-and-drop DAG editor to design multi-agent pipelines without code.</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-1">Knowledge Base + RAG</div>
                <div className="text-xs text-gray-500">Upload documents and let agents reference your proprietary data.</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-1">40+ Integrations</div>
                <div className="text-xs text-gray-500">Connect Slack, GitHub, Salesforce, HubSpot, Jira, and more out of the box.</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Built By</h2>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="text-sm font-semibold text-gray-900">Aabhyasa AI</div>
              <div className="text-xs text-gray-500 mt-1">Founded by Gopal Yadav — building the future of autonomous AI systems.</div>
              <div className="flex items-center gap-4 mt-3">
                <a href="mailto:gopal@aabhyasa.com" className="text-xs text-indigo-600 hover:text-indigo-800">gopal@aabhyasa.com</a>
                <a href="https://github.com/gopal2yadav/agentforge" className="text-xs text-indigo-600 hover:text-indigo-800">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-12 text-center text-gray-400 text-xs">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-gray-900 transition-colors">Docs</Link>
            <Link href="/sign-up" className="hover:text-gray-900 transition-colors">Get Started</Link>
          </div>
          <p>Nexus AI Platform v2.2.0 &bull; Built by Aabhyasa AI</p>
        </div>
      </div>
    </div>
  );
}
