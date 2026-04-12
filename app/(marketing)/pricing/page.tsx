export default function PricingPage() {
  const plans = [
    { name: 'Free', price: '$0', period: '/month', desc: 'Perfect for trying out Nexus', features: ['3 Agents', '100K tokens/mo', '1 Flow', '5 Executions/day', 'Community support'], cta: 'Get Started', href: '/sign-up' },
    { name: 'Pro', price: '$49', period: '/month', desc: 'For teams building production AI workflows', highlight: true, features: ['25 Agents', '10M tokens/mo', '20 Flows', 'Unlimited executions', 'Priority support', 'Visual flow builder', 'API access', 'Webhooks', 'Knowledge base', 'Code Sandbox'], cta: 'Start Pro Trial', href: '/api/billing/checkout' },
    { name: 'Enterprise', price: 'Custom', period: '', desc: 'For organizations with advanced requirements', features: ['Unlimited agents', 'Unlimited tokens', 'Unlimited flows', 'Dedicated support', 'SSO / SAML', 'On-premise deployment', 'Custom SLA', 'Audit logs', 'RBAC', 'Custom integrations'], cta: 'Contact Sales', href: 'mailto:gopal@aabhyasa.com' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <a href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div><span className="text-lg font-bold text-gray-900">Nexus</span></a>
        <div className="flex items-center gap-4"><a href="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">Sign In</a><a href="/sign-up" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Get Started</a></div>
      </nav>
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-500">Start free. Scale as you grow. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className={'bg-white border rounded-2xl p-8 ' + (plan.highlight ? 'border-indigo-300 shadow-xl ring-1 ring-indigo-100 relative' : 'border-gray-200')}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">Most Popular</div>}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6"><span className="text-4xl font-bold text-gray-900">{plan.price}</span><span className="text-sm text-gray-400">{plan.period}</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href={plan.href} className={'block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ' + (plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'border border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-indigo-600')}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}