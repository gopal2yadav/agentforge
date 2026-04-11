'use client';

export function BillingClient() {
  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/billing/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || 'Checkout unavailable');
    } catch { alert('Failed to connect'); }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Billing</h1>
      <p className="text-sm text-[#6b6b8a] mb-8">Manage your subscription</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6">
          <div className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2">Free</div>
          <div className="text-3xl font-bold mb-1">$0<span className="text-sm text-[#6b6b8a] font-normal">/mo</span></div>
          <div className="text-xs text-[#6b6b8a] mb-4">3 agents, 100K tokens/mo</div>
          <div className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-center text-sm text-[#6b6b8a]">Current Plan</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#6366f1]/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#6366f1] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
          <div className="text-xs font-semibold text-[#818cf8] uppercase tracking-wider mb-2">Pro</div>
          <div className="text-3xl font-bold mb-1">$49<span className="text-sm text-[#6b6b8a] font-normal">/mo</span></div>
          <div className="text-xs text-[#6b6b8a] mb-4">25 agents, 10M tokens/mo</div>
          <button onClick={handleUpgrade} className="w-full px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}