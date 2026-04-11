export default function SettingsPage() {
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your account and platform configuration</p>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Account</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Email</span><span className="text-sm text-gray-900">gopal@aabhyasa.com</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Plan</span><span className="text-sm font-semibold text-indigo-600">Pro</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-gray-500">Member since</span><span className="text-sm text-gray-900">April 2026</span></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">API Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Default Model</span><span className="text-sm font-mono text-gray-900">claude-sonnet-4</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Rate Limit</span><span className="text-sm text-gray-900">5,000 calls/day</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Token Limit</span><span className="text-sm text-gray-900">10M tokens/month</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-gray-500">Endpoint</span><span className="text-sm font-mono text-indigo-600">agentforcecrew.com/api</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/settings/api-keys" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all block group">
            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">API Keys</div>
            <div className="text-xs text-gray-500">Create and manage keys for programmatic access</div>
          </a>
          <a href="/settings/webhooks" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all block group">
            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">Webhooks</div>
            <div className="text-xs text-gray-500">Configure real-time event notifications</div>
          </a>
          <a href="/settings/llm-connections" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all block group">
            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">LLM Connections</div>
            <div className="text-xs text-gray-500">Manage AI model provider API keys</div>
          </a>
          <a href="/settings/team" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all block group">
            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">Team</div>
            <div className="text-xs text-gray-500">Manage team members and permissions</div>
          </a>
        </div>
        <div className="bg-white border border-red-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium text-gray-900">Delete Account</div><div className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</div></div>
            <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}