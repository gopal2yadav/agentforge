import Link from 'next/link';
export const dynamic = 'force-dynamic';

const PLANS = [
  { name: 'Free', price: '$0', period: '/month', desc: 'Perfect for trying out Nexus', features: ['3 Agents', '100K tokens/mo', '1 Flow', '5 Executions/day', 'Community support'], cta: 'Get Started', ctaHref: '/sign-up', popular: false },
  { name: 'Pro', price: '$49', period: '/month', desc: 'For teams building production AI workflows', features: ['25 Agents', '10M tokens/mo', '20 Flows', 'Unlimited executions', 'Priority support', 'Visual flow builder', 'API access', 'Webhooks', 'Knowledge base', '40+ Integrations'], cta: 'Start Pro Trial', ctaHref: 'https://buy.stripe.com/4gMfZj6DO4zVa0u9pnbsc04', popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For organizations with advanced requirements', features: ['Unlimited agents', 'Unlimited tokens', 'Unlimited flows', 'Dedicated support', 'SSO / SAML', 'On-premise deployment', 'Custom SLA', 'Audit logs', 'RBAC', 'SOC2 compliance'], cta: 'Contact Sales', ctaHref: 'mailto:gopal@aabhyasa.com', popular: false },
];

const FAQ = [
  { q: 'Can I switch plans anytime?', a: 'Yes, upgrade or downgrade at any time. Changes take effect on your next billing cycle.' },
  { q: 'What happens if I exceed my token limit?', a: 'Your agents will pause until the next billing cycle. You can upgrade your plan for more tokens.' },
  { q: 'Do you offer a free trial?', a: 'Yes! The Pro plan comes with a 14-day free trial. No credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and wire transfers for Enterprise plans.' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div>
          <span className="text-base font-bold text-gray-900">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-gray-500 hover:text-gray-900">Sign In</Link>
          <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Get Started</Link>
        </div>
      </nav>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-500">Start free. Scale as you grow. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PLANS.map(plan => (
            <div key={plan.name} className={"bg-white border rounded-2xl p-8 relative " + (plan.popular ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-gray-200')}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[11px] font-bold uppercase rounded-full tracking-wider">Most Popular</div>}
              <div className="text-lg font-bold text-gray-900 mb-1">{plan.name}</div>
              <div className="text-sm text-gray-500 mb-4">{plan.desc}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (<li key={f} className="flex items-center gap-2.5 text-sm text-gray-600"><span className="text-emerald-500 text-xs font-bold">\u2713</span>{f}</li>))}
              </ul>
              <a href={plan.ctaHref} className={"block w-full px-4 py-3 rounded-xl text-sm font-semibold text-center transition-colors " + (plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200' : 'border border-gray-200 text-gray-700 hover:bg-gray-50')}>{plan.cta}</a>
            </div>
          ))}
        </div>
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <div key={item.q} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-2">{item.q}</div>
                <div className="text-sm text-gray-500">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <Link href="/sign-up" className="hover:text-gray-900">Get Started</Link>
            <a href="https://github.com/gopal2yadav/agentforge" className="hover:text-gray-900">GitHub</a>
            <a href="mailto:gopal@aabhyasa.com" className="hover:text-gray-900">Contact</a>
          </div>
          <p>Built by Aabhyasa AI \u2022 Powered by Nexus v2.2.0</p>
        </div>
      </div>
    </div>
  );
}