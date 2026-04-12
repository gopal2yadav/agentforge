'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;
    const stars: { x: number; y: number; r: number; b: number }[] = [];
    for (let i = 0; i < 200; i++) stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.3, b: Math.random() });
    let id: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 1, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const t = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * (s.b + 0.5));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * t, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165,180,252,' + (t * 0.7) + ')'; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    ctx.fillStyle = '#020108'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 2; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  const plans = [
    { name: 'Free', price: '$0', period: '/month', desc: 'Perfect for trying out Nexus', features: ['3 Agents', '100K tokens/mo', '1 Flow', '5 Executions/day', 'Community support'], cta: 'Get Started', href: '/sign-up' },
    { name: 'Pro', price: '$49', period: '/month', desc: 'For teams building production AI workflows', highlight: true, features: ['25 Agents', '10M tokens/mo', '20 Flows', 'Unlimited executions', 'Priority support', 'Visual flow builder', 'API access', 'Webhooks', 'Knowledge base', 'Code Sandbox'], cta: 'Start Pro Trial', href: '/api/billing/checkout' },
    { name: 'Enterprise', price: 'Custom', period: '', desc: 'For organizations with advanced requirements', features: ['Unlimited agents', 'Unlimited tokens', 'Unlimited flows', 'Dedicated support', 'SSO / SAML', 'On-premise deployment', 'Custom SLA', 'Audit logs', 'RBAC', 'Custom integrations'], cta: 'Contact Sales', href: 'mailto:gopal@aabhyasa.com' },
  ];

  return (
    <div className="relative min-h-screen" style={{ background: '#020108' }}>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>N</div>
          <span className="text-xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-indigo-300/70 hover:text-white transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>Get Started</Link>
        </div>
      </nav>
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>Simple, transparent pricing</h1>
          <p className="text-lg text-indigo-300/60">Start free. Scale as you grow. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className={'rounded-2xl p-8 relative ' + (plan.highlight ? '' : '')} style={{ background: plan.highlight ? 'rgba(99,102,241,0.08)' : 'rgba(15,15,35,0.6)', border: plan.highlight ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(99,102,241,0.15)', backdropFilter: 'blur(20px)', boxShadow: plan.highlight ? '0 0 40px rgba(99,102,241,0.15)' : 'none' }}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>Most Popular</div>}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-sm text-indigo-300/50 mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6"><span className="text-4xl font-bold text-white">{plan.price}</span><span className="text-sm text-indigo-300/40">{plan.period}</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-indigo-200/70">
                    <svg className="w-4 h-4 shrink-0" style={{ color: '#6ee7b7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href={plan.href} className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all" style={plan.highlight ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', boxShadow: '0 0 30px rgba(99,102,241,0.4)' } : { background: 'rgba(99,102,241,0.08)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}