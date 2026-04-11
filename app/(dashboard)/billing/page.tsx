'use client';

const PLANS = [
  { name: 'Free', price: '$0', period: '/month', features: ['3 Agents', '100K tokens/mo', '1 Flow', 'Community support'], current: false },
  { name: 'Pro', price: '$49', period: '/month', features: ['25 Agents', '10M tokens/mo', '20 Flows', 'Priority support', 'Visual flow builder', 'API access', 'Webhooks'], current: true, popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited agents', 'Unlimited tokens', 'Unlimited flows', 'Dedicated support', 'SSO/SAML', 'On-premise', 'SLA'], current: false },
];

export default function BillingPage() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Billing</h1>
        <p className="text-sm text-[#6b6b8a]">Manage your subscription and payment</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div key={plan.name} className={"bg-[#14141f]/40 border rounded-xl p-6 relative " + (plan.popular ? 'border-[#6366f1]' : 'border-[#2a2a3d]')}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#6366f1] text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Popular</div>}
            <div className="text-lg font-bold mb-1">{plan.name}</div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-[#6b6b8a]">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#a0a0b8]">
                  <span className="text-green-400 text-xs">\u2713</span> {f}
                </li>
              ))}
            </ul>
            {plan.current ? (
              <div className="w-full px-4 py-2.5 rounded-lg border border-[#6366f1] text-[#6366f1] text-sm font-semibold text-center">Current Plan</div>
            ) : plan.name === 'Enterprise' ? (
              <a href="mailto:gopal@aabhyasa.com" className="block w-full px-4 py-2.5 rounded-lg border border-[#2a2a3d] text-white text-sm font-semibold text-center hover:bg-[#14141f] transition-colors">Contact Sales</a>
            ) : (
              <a href="https://buy.stripe.com/4gMfZj6DO4zVa0u9pnbsc04" className="block w-full px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold text-center hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">Upgrade</a>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-3">Usage This Month</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Tokens Used</div><div className="text-xl font-bold mt-1">45,200</div><div className="text-[11px] text-[#4a4a5a]">of 10,000,000</div></div>
          <div><div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">API Calls</div><div className="text-xl font-bold mt-1">1,247</div><div className="text-[11px] text-[#4a4a5a]">of 5,000/day</div></div>
          <div><div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Executions</div><div className="text-xl font-bold mt-1">47</div><div className="text-[11px] text-[#4a4a5a]">unlimited</div></div>
        </div>
      </div>
    </div>
  );
}