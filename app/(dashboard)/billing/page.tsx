'use client';
import { useState } from 'react';

const PLANS = [
  { name: 'Free', price: '$0', period: '/month', features: ['3 Agents', '100K tokens/mo', '1 Flow', 'Community support'], current: false, cta: 'Current Plan' },
  { name: 'Pro', price: '$49', period: '/month', features: ['25 Agents', '10M tokens/mo', '20 Flows', 'Priority support', 'Visual flow builder', 'API access', 'Webhooks', 'Knowledge base'], current: true, cta: 'Upgrade to Pro', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited agents', 'Unlimited tokens', 'Unlimited flows', 'Dedicated support', 'SSO / SAML', 'On-premise deployment', 'Custom SLA', 'Audit logs'], current: false, cta: 'Contact Sales' },
];

export default function BillingPage() {
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const res = await fetch('/api/billing/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) { setUpgrading(false); }
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your subscription and payment details</p>

      <div className="grid grid-cols-3 gap-6">
        {PLANS.map(plan => (
          <div key={plan.name} className={'bg-white border rounded-xl p-6 ' + (plan.highlight ? 'border-indigo-300 shadow-lg ring-1 ring-indigo-100' : 'border-gray-200')}>
            {plan.highlight && <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">Most Popular</div>}
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-sm text-gray-400">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500 text-xs">OK</span> {f}
                </li>
              ))}
            </ul>
            {plan.highlight ? (
              <button onClick={handleUpgrade} disabled={upgrading} className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{upgrading ? 'Redirecting to Stripe...' : plan.cta}</button>
            ) : plan.name === 'Enterprise' ? (
              <a href="mailto:gopal@aabhyasa.com" className="block w-full text-center px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-200">{plan.cta}</a>
            ) : (
              <div className="w-full text-center px-4 py-2.5 rounded-lg bg-gray-50 text-sm font-medium text-gray-400">{plan.cta}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}