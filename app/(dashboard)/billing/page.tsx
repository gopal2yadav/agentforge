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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Billing</h1>
        <p className="text-sm text-gray-500">Manage your subscription and payment</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div key={plan.name} className={"bg-white border rounded-xl p-6 relative shadow-sm " + (plan.popular ? 'border-indigo-400 shadow-indigo-100' : 'border-gray-200')}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Popular</div>}
            <div className="text-lg font-bold text-gray-900 mb-1">{plan.name}</div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-sm text-gray-400">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500 text-xs">\u2713</span> {f}
                </li>
              ))}
            </ul>
            {plan.current ? (
              <div className="w-full px-4 py-2.5 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-semibold text-center bg-indigo-50">Current Plan</div>
            ) : plan.name === 'Enterprise' ? (
              <a href="mailto:gopal@aabhyasa.com" className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold text-center hover:bg-gray-50 transition-colors">Contact Sales</a>
            ) : (
              <a href="https://buy.stripe.com/4gMfZj6DO4zVa0u9pnbsc04" className="block w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-700 transition-colors shadow-sm">Upgrade</a>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Usage This Month</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><div className="text-[11px] text-gray-400 uppercase tracking-wider">Tokens Used</div><div className="text-xl font-bold text-gray-900 mt-1">45,200</div><div className="text-[11px] text-gray-400">of 10,000,000</div></div>
          <div><div className="text-[11px] text-gray-400 uppercase tracking-wider">API Calls</div><div className="text-xl font-bold text-gray-900 mt-1">1,247</div><div className="text-[11px] text-gray-400">of 5,000/day</div></div>
          <div><div className="text-[11px] text-gray-400 uppercase tracking-wider">Executions</div><div className="text-xl font-bold text-gray-900 mt-1">47</div><div className="text-[11px] text-gray-400">unlimited</div></div>
        </div>
      </div>
    </div>
  );
}