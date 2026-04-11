export default function SettingsPage() {
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
      <p className="text-sm text-[#6b6b8a] mb-8">Manage your account and platform configuration</p>
      <div className="space-y-6">
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6">
          <h3 className="text-base font-semibold mb-4">Account</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-[#2a2a3d]"><span className="text-sm text-[#6b6b8a]">Email</span><span className="text-sm">gopal@aabhyasa.com</span></div>
            <div className="flex justify-between items-center py-2 border-b border-[#2a2a3d]"><span className="text-sm text-[#6b6b8a]">Plan</span><span className="text-sm font-semibold text-[#6366f1]">Pro</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-[#6b6b8a]">Member since</span><span className="text-sm">April 2026</span></div>
          </div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6">
          <h3 className="text-base font-semibold mb-4">API Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-[#2a2a3d]"><span className="text-sm text-[#6b6b8a]">Default Model</span><span className="text-sm font-mono">claude-sonnet-4</span></div>
            <div className="flex justify-between items-center py-2 border-b border-[#2a2a3d]"><span className="text-sm text-[#6b6b8a]">Rate Limit</span><span className="text-sm">5,000 calls/day</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-[#6b6b8a]">Token Limit</span><span className="text-sm">10M tokens/month</span></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a href="/settings/api-keys" className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#6366f1]/30 transition-colors block">
            <div className="text-sm font-semibold mb-1">API Keys</div>
            <div className="text-xs text-[#6b6b8a]">Manage keys for programmatic access</div>
          </a>
          <a href="/settings/webhooks" className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#6366f1]/30 transition-colors block">
            <div className="text-sm font-semibold mb-1">Webhooks</div>
            <div className="text-xs text-[#6b6b8a]">Configure event notifications</div>
          </a>
        </div>
      </div>
    </div>
  );
}