'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; r: number; speed: number; brightness: number; color: string }[] = [];
    const colors = ['#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#c4b5fd', '#a78bfa', '#f0abfc', '#93c5fd'];

    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.3,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 1, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * star.speed + star.brightness * 10);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = twinkle * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        star.y -= star.speed * 0.3;
        if (star.y < -5) { star.y = canvas.height + 5; star.x = Math.random() * canvas.width; }
      });

      // Nebula glow
      const t = Date.now() * 0.0001;
      const grd = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(t) * 100, canvas.height * 0.4 + Math.cos(t) * 50, 50,
        canvas.width * 0.3 + Math.sin(t) * 100, canvas.height * 0.4 + Math.cos(t) * 50, 400
      );
      grd.addColorStop(0, 'rgba(99, 102, 241, 0.03)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grd2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(t * 1.3) * 80, canvas.height * 0.6 + Math.sin(t * 1.3) * 60, 30,
        canvas.width * 0.7 + Math.cos(t * 1.3) * 80, canvas.height * 0.6 + Math.sin(t * 1.3) * 60, 350
      );
      grd2.addColorStop(0, 'rgba(139, 92, 246, 0.025)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#020108';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#020108' }}>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold" style={{ boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>N</div>
          <span className="text-xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>Nexus</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm text-indigo-300/70 hover:text-white transition-colors">Pricing</Link>
          <Link href="/sign-in" className="text-sm text-indigo-300/70 hover:text-white transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-indigo-300">Platform v2.8 | 32 Agents Active | Universe Mode</span>
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-6">
            <span className="text-white" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>Orchestrate AI Agents</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none' }}>That Think Together</span>
          </h1>

          <p className="text-lg text-indigo-200/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build, deploy, and manage autonomous AI agent swarms. Visual workflow builder, persistent memory, real-time monitoring, and a universe of intelligent agents at your command.
          </p>

          <div className="flex items-center gap-4 justify-center mb-16">
            <Link href="/sign-up" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(139,92,246,0.2)' }}>
              Start Building Free
            </Link>
            <Link href="/sign-in" className="px-8 py-4 rounded-xl text-base font-semibold text-indigo-200/80 transition-all hover:text-white" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '25+', label: 'AI Models' },
              { value: '40+', label: 'Integrations' },
              { value: '99.97%', label: 'Uptime SLA' },
              { value: '<2s', label: 'Avg Latency' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                <div className="text-xs text-indigo-300/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)', filter: 'blur(80px)', animation: 'nebula-drift 30s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent)', filter: 'blur(50px)', animation: 'nebula-drift 45s ease-in-out infinite reverse' }} />
      </div>
    </div>
  );
}