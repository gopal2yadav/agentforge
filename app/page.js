'use client';
import { useState, useEffect, useRef } from "react";

// ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// NEXUS AI PLATFORM â Complete Customer Experience
// ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

// âââ PART 1: LANDING PAGE âââââââââââââââââââââââââââââââââ


const H = {
  bg: "#09090b",
  surface: "rgba(255,255,255,0.03)",
  surfaceHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  text: "#fafafa",
  textMuted: "#a1a1aa",
  textDim: "#71717a",
  accent: "#6366f1",
  accentLight: "#818cf8",
  accentGlow: "rgba(99,102,241,0.25)",
  green: "#22c55e",
  amber: "#f59e0b",
  cyan: "#06b6d4",
  pink: "#ec4899",
  font: "'Instrument Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
  display: "'Playfair Display', Georgia, serif",
};

const HomePage = ({ onEnterApp }) => {
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % 4), 4000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: "ð¤", title: "Autonomous Agents", desc: "Deploy AI agents that think, plan, and execute complex tasks independently. Each agent has its own role, tools, and memory.", color: H.accent },
    { icon: "ð", title: "Flow Orchestration", desc: "Build multi-agent workflows with visual DAG editor. Chain agents with conditional routing, HITL checkpoints, and persistence.", color: H.cyan },
    { icon: "ð§ ", title: "Cognitive Memory", desc: "Agents learn and remember across sessions. Semantic search, importance scoring, and scoped knowledge graphs built-in.", color: H.pink },
    { icon: "â¡", title: "Real-time Monitoring", desc: "Watch your agents work in real-time. Full execution traces, token usage, latency metrics, and alerting out of the box.", color: H.green },
  ];

  const pricing = [
    { name: "Starter", price: "$0", period: "/month", desc: "For individuals exploring AI agents", features: ["3 agents", "1,000 API calls/mo", "100K tokens", "Community support", "Basic memory"], cta: "Get Started Free", popular: false },
    { name: "Pro", price: "$49", period: "/month", desc: "For teams building production workflows", features: ["25 agents", "50,000 API calls/mo", "10M tokens", "Priority support", "Full memory + persistence", "Visual flow builder", "Team collaboration"], cta: "Start Pro Trial", popular: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For organizations at scale", features: ["Unlimited agents", "Unlimited API calls", "Custom token limits", "24/7 dedicated support", "SSO + RBAC", "On-prem deployment", "SLA guarantee", "Custom integrations"], cta: "Contact Sales", popular: false },
  ];

  const stats = [
    { value: "50M+", label: "Agent Runs" },
    { value: "12K+", label: "Teams" },
    { value: "99.9%", label: "Uptime" },
    { value: "<200ms", label: "Avg Latency" },
  ];

  const testimonials = [
    { quote: "Nexus replaced our entire data pipeline team's manual work. Our agents now process 10x more data with zero errors.", author: "Sarah Chen", role: "VP Engineering, DataCorp", avatar: "SC" },
    { quote: "The flow builder is incredible. We went from idea to production multi-agent workflow in under an hour.", author: "Marcus Rivera", role: "CTO, ScaleAI Labs", avatar: "MR" },
    { quote: "Memory persistence across sessions changed everything. Our support agents actually learn from every interaction.", author: "Priya Patel", role: "Head of AI, TechFlow", avatar: "PP" },
  ];

  return (
    <div style={{ background: H.bg, color: H.text, fontFamily: H.font, minHeight: "100vh", overflow: "hidden" }}>
      {/* ââ Navbar ââ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 50 ? "rgba(9,9,11,0.85)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrollY > 50 ? `1px solid ${H.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${H.accent}, ${H.pink})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: H.display, fontWeight: 700, fontSize: 16, color: "#fff",
          }}>N</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Nexus</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Features", "Pricing", "Docs", "Blog"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: H.textMuted, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = H.text}
              onMouseLeave={e => e.currentTarget.style.color = H.textMuted}
            >{item}</a>
          ))}
          <button onClick={onEnterApp} style={{
            padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
            background: H.accent, color: "#fff", fontSize: 13.5, fontWeight: 600, fontFamily: H.font,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = H.accentLight; e.currentTarget.style.boxShadow = `0 0 24px ${H.accentGlow}`; }}
          onMouseLeave={e => { e.currentTarget.style.background = H.accent; e.currentTarget.style.boxShadow = "none"; }}
          >Dashboard â</button>
        </div>
      </nav>

      {/* ââ Hero ââ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 40px 80px", overflow: "hidden" }}>
        {/* Animated gradient orb */}
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${H.accent}30 0%, ${H.pink}15 40%, transparent 70%)`,
          filter: "blur(80px)", top: "10%", left: "50%", transform: "translateX(-50%)",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${H.cyan}20 0%, transparent 60%)`,
          filter: "blur(60px)", bottom: "10%", right: "15%",
          animation: "float 10s ease-in-out infinite reverse",
        }} />
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${H.text} 1px, transparent 1px), linear-gradient(90deg, ${H.text} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            borderRadius: 20, border: `1px solid ${H.border}`, background: H.surface,
            fontSize: 13, color: H.textMuted, marginBottom: 28,
            animation: "fadeUp 0.6s ease both",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: H.green, animation: "pulse 2s infinite" }} />
            Now in public beta â 12,000+ teams building with Nexus
          </div>

          <h1 style={{
            fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em",
            marginBottom: 24, animation: "fadeUp 0.6s ease 0.1s both",
          }}>
            AI Agents That<br />
            <span style={{
              background: `linear-gradient(135deg, ${H.accentLight}, ${H.cyan}, ${H.pink})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Actually Work</span>
          </h1>

          <p style={{
            fontSize: 20, lineHeight: 1.7, color: H.textMuted, maxWidth: 580, margin: "0 auto 40px",
            animation: "fadeUp 0.6s ease 0.2s both",
          }}>
            Build, orchestrate, and deploy autonomous AI agents that collaborate to solve complex tasks. From research to code review to customer support.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", animation: "fadeUp 0.6s ease 0.3s both" }}>
            <button onClick={onEnterApp} style={{
              padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${H.accent}, ${H.accentLight})`,
              color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: H.font,
              boxShadow: `0 4px 24px ${H.accentGlow}`, transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${H.accentGlow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 24px ${H.accentGlow}`; }}
            >Start Building Free â</button>
            <button style={{
              padding: "14px 32px", borderRadius: 12, border: `1px solid ${H.border}`,
              background: H.surface, color: H.text, fontSize: 16, fontWeight: 600,
              fontFamily: H.font, cursor: "pointer", backdropFilter: "blur(10px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = H.accentLight}
            onMouseLeave={e => e.currentTarget.style.borderColor = H.border}
            >Watch Demo</button>
          </div>

          {/* Code snippet preview */}
          <div style={{
            marginTop: 60, background: "rgba(0,0,0,0.5)", border: `1px solid ${H.border}`,
            borderRadius: 16, padding: "20px 28px", textAlign: "left", maxWidth: 560, margin: "60px auto 0",
            backdropFilter: "blur(20px)", animation: "fadeUp 0.6s ease 0.4s both",
          }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
            </div>
            <pre style={{ fontFamily: H.mono, fontSize: 13, lineHeight: 1.8, margin: 0, overflow: "hidden" }}>
              <span style={{ color: H.textDim }}>{"// Deploy an agent in 3 lines"}</span>{"\n"}
              <span style={{ color: "#c084fc" }}>const</span> agent = nexus.<span style={{ color: "#67e8f9" }}>createAgent</span>({"{"}
              {"\n  "}name: <span style={{ color: "#fbbf24" }}>"Research Analyst"</span>,
              {"\n  "}model: <span style={{ color: "#fbbf24" }}>"claude-sonnet-4-6"</span>,
              {"\n  "}tools: [<span style={{ color: "#fbbf24" }}>"web_search"</span>, <span style={{ color: "#fbbf24" }}>"arxiv"</span>]
              {"\n"}{"}"});{"\n"}
              <span style={{ color: "#c084fc" }}>const</span> result = <span style={{ color: "#c084fc" }}>await</span> agent.<span style={{ color: "#67e8f9" }}>run</span>(<span style={{ color: "#fbbf24" }}>"Analyze Q1 trends"</span>);
            </pre>
          </div>
        </div>
      </section>

      {/* ââ Stats Bar ââ */}
      <section style={{ borderTop: `1px solid ${H.border}`, borderBottom: `1px solid ${H.border}`, padding: "40px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "0 20px",
              borderRight: i < 3 ? `1px solid ${H.border}` : "none",
            }}>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: H.textDim, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ââ Features ââ */}
      <section id="features" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything you need to build<br />
            <span style={{ color: H.accentLight }}>production AI agents</span>
          </h2>
          <p style={{ fontSize: 18, color: H.textMuted, maxWidth: 600, margin: "0 auto" }}>
            A complete platform for creating, orchestrating, and deploying autonomous AI agents at any scale.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => setActiveFeature(i)} style={{
              padding: 32, borderRadius: 16, cursor: "pointer",
              border: `1px solid ${i === activeFeature ? f.color + "40" : H.border}`,
              background: i === activeFeature ? `${f.color}08` : H.surface,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { if (i !== activeFeature) e.currentTarget.style.background = H.surfaceHover; }}
            onMouseLeave={e => { if (i !== activeFeature) e.currentTarget.style.background = H.surface; }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: H.textMuted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ââ Pricing ââ */}
      <section id="pricing" style={{ padding: "100px 40px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 18, color: H.textMuted }}>Start free. Scale as you grow. No hidden fees.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
            {pricing.map((plan, i) => (
              <div key={i} style={{
                padding: 36, borderRadius: 20,
                border: `1px solid ${plan.popular ? H.accent + "50" : H.border}`,
                background: plan.popular ? `linear-gradient(180deg, ${H.accent}10 0%, transparent 50%)` : H.surface,
                position: "relative", transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    padding: "4px 16px", borderRadius: 20, background: H.accent,
                    color: "#fff", fontSize: 12, fontWeight: 700,
                  }}>Most Popular</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: H.textDim, marginBottom: 20 }}>{plan.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em" }}>{plan.price}</span>
                  <span style={{ fontSize: 16, color: H.textDim }}>{plan.period}</span>
                </div>
                <button onClick={onEnterApp} style={{
                  width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
                  cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: H.font,
                  background: plan.popular ? H.accent : "transparent",
                  color: plan.popular ? "#fff" : H.text,
                  outline: plan.popular ? "none" : `1.5px solid ${H.border}`,
                  transition: "all 0.2s", marginBottom: 24,
                }}>{plan.cta}</button>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: H.textMuted }}>
                      <span style={{ color: H.green, fontSize: 16 }}>â</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ Testimonials ââ */}
      <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Loved by engineering teams
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: 32, borderRadius: 16, border: `1px solid ${H.border}`,
              background: H.surface, transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = H.accent + "40"}
            onMouseLeave={e => e.currentTarget.style.borderColor = H.border}
            >
              <p style={{ fontSize: 15, lineHeight: 1.7, color: H.textMuted, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `linear-gradient(135deg, ${H.accent}, ${H.pink})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff",
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: H.textDim }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ââ CTA ââ */}
      <section style={{
        padding: "80px 40px", margin: "0 40px 60px", borderRadius: 24,
        background: `linear-gradient(135deg, ${H.accent}15, ${H.pink}10)`,
        border: `1px solid ${H.accent}20`, textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${H.accent}20, transparent)`,
          filter: "blur(60px)", top: "-20%", right: "10%",
        }} />
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, position: "relative" }}>
          Ready to build with AI agents?
        </h2>
        <p style={{ fontSize: 18, color: H.textMuted, marginBottom: 32, position: "relative" }}>
          Join 12,000+ teams already building the future.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            style={{
              padding: "14px 20px", borderRadius: 12, border: `1px solid ${H.border}`,
              background: "rgba(0,0,0,0.3)", color: H.text, fontSize: 15, width: 300,
              fontFamily: H.font, outline: "none", backdropFilter: "blur(10px)",
            }} />
          <button onClick={onEnterApp} style={{
            padding: "14px 28px", borderRadius: 12, border: "none", cursor: "pointer",
            background: H.accent, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: H.font,
          }}>Get Started</button>
        </div>
      </section>

      {/* ââ Footer ââ */}
      <footer style={{ borderTop: `1px solid ${H.border}`, padding: "60px 40px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${H.accent}, ${H.pink})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H.display, fontWeight: 700, fontSize: 14, color: "#fff" }}>N</div>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Nexus AI</span>
            </div>
            <p style={{ fontSize: 14, color: H.textDim, lineHeight: 1.6, maxWidth: 280 }}>
              Build, orchestrate, and deploy autonomous AI agents for any workflow.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Agents", "Flows", "Memory"] },
            { title: "Developers", links: ["Documentation", "API Reference", "SDK", "Examples", "Status"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: H.text, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.title}</div>
              {col.links.map(link => (
                <div key={link} style={{ fontSize: 14, color: H.textDim, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = H.text}
                  onMouseLeave={e => e.currentTarget.style.color = H.textDim}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", borderTop: `1px solid ${H.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", fontSize: 13, color: H.textDim }}>
          <span>Â© 2026 Nexus AI, Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map(s => (
              <span key={s} style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = H.text}
                onMouseLeave={e => e.currentTarget.style.color = H.textDim}
              >{s}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-30px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
};




// âââ PART 2: CUSTOMER PORTAL ââââââââââââââââââââââââââââââ


// âââ DESIGN TOKENS (Light Customer Theme) ââââââââââââââââââââ
const T = {
  bg: "#f8f7f4",
  surface: "#ffffff",
  surfaceHover: "#fafaf8",
  elevated: "#f2f1ee",
  border: "#e8e6e1",
  borderActive: "#2d5bf0",
  text: "#1a1a1a",
  textMuted: "#6b6966",
  textDim: "#9e9b96",
  accent: "#2d5bf0",
  accentGlow: "rgba(45,91,240,0.15)",
  accentSoft: "rgba(45,91,240,0.06)",
  accentDark: "#1e3fb0",
  green: "#16a34a",
  greenSoft: "rgba(22,163,74,0.08)",
  amber: "#d97706",
  amberSoft: "rgba(217,119,6,0.08)",
  red: "#dc2626",
  redSoft: "rgba(220,38,38,0.08)",
  cyan: "#0891b2",
  cyanSoft: "rgba(8,145,178,0.08)",
  violet: "#7c3aed",
  violetSoft: "rgba(124,58,237,0.08)",
  font: "'Instrument Sans', 'DM Sans', sans-serif",
  mono: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  display: "'Playfair Display', 'Georgia', serif",
  radius: "12px",
  radiusLg: "16px",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  shadowLg: "0 4px 24px rgba(0,0,0,0.08)",
};

const statusColor = (s) => ({ active: T.green, running: T.green, completed: T.green, healthy: T.green, idle: T.textDim, paused: T.amber, waiting: T.amber, error: T.red, stopped: T.textDim }[s] || T.textDim);
const statusBg = (s) => ({ active: T.greenSoft, running: T.greenSoft, completed: T.greenSoft, healthy: T.greenSoft, idle: T.elevated, paused: T.amberSoft, waiting: T.amberSoft, error: T.redSoft, stopped: T.elevated }[s] || T.elevated);

// âââ GLOBAL STYLES âââââââââââââââââââââââââââââââââââââââââââ
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body, #root { height:100%; background:${T.bg}; color:${T.text}; font-family:${T.font}; -webkit-font-smoothing:antialiased; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:3px; }
    input, select, textarea, button { font-family:inherit; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    @keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    ::selection { background: ${T.accentSoft}; color: ${T.accent}; }
  `}</style>
);

// âââ ICONS âââââââââââââââââââââââââââââââââââââââââââââââââââ
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    agents: <><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></>,
    flows: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    play: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    memory: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    billing: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    bar: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    terminal: <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// âââ MOCK DATA âââââââââââââââââââââââââââââââââââââââââââââââ

// ─── AUTH PAGE ───────────────────────────────────────────────
const AuthPage = ({ mode, onSwitch, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isSignUp = mode === "signup";
  const handleSubmit = async () => {
    setLoading(true); setError(null);
    try {
      const url = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
      const body = isSignUp ? { name, email, password } : { email, password };
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok) { setError(data.error); setLoading(false); return; }
      window.localStorage?.setItem('nexus_token', data.token);
      onSuccess(data.user);
    } catch(e) { setError('Connection failed'); setLoading(false); }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#fafafa", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(80px)", top: "5%", left: "30%" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 60%)", filter: "blur(60px)", bottom: "15%", right: "20%" }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "#fff" }}>N</div>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Nexus</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>{isSignUp ? "Create your account" : "Welcome back"}</h1>
          <p style={{ fontSize: 15, color: "#a1a1aa" }}>{isSignUp ? "Start building AI agents in minutes" : "Sign in to your Nexus dashboard"}</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
          {error && <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#f87171", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>{error}</div>}
          {isSignUp && <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Full Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", color: "#fafafa", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} /></div>}
          <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Email</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" type="email" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", color: "#fafafa", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} /></div>
          <div style={{ marginBottom: 24 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 6 }}>Password</label><input value={password} onChange={e => setPassword(e.target.value)} placeholder={isSignUp ? "Min 6 characters" : "Your password"} type="password" onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", color: "#fafafa", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} /></div>
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", cursor: loading ? "wait" : "pointer", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}>{loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}</button>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#a1a1aa" }}>{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}<span onClick={onSwitch} style={{ color: "#818cf8", fontWeight: 600, cursor: "pointer" }}>{isSignUp ? "Sign in" : "Sign up"}</span></p>
      </div>
    </div>
  );
};

const USER = { name: "Gopal Yadav", email: "gopal@nexusai.dev", plan: "Pro", avatar: "GY" };

const MY_AGENTS = [
  { id: "a1", name: "Research Assistant", role: "Deep Research & Analysis", status: "active", model: "claude-sonnet-4-6", runs: 142, successRate: 98.2, avgTime: "3.2s", lastRun: "2 min ago", color: T.accent },
  { id: "a2", name: "Code Reviewer", role: "Automated Code Review", status: "active", model: "claude-opus-4-6", runs: 87, successRate: 99.1, avgTime: "5.8s", lastRun: "8 min ago", color: T.cyan },
  { id: "a3", name: "Content Generator", role: "Blog & Social Content", status: "idle", model: "claude-sonnet-4-6", runs: 53, successRate: 96.5, avgTime: "4.1s", lastRun: "2h ago", color: T.violet },
  { id: "a4", name: "Data Analyst", role: "SQL & Visualization", status: "active", model: "claude-haiku-4-5", runs: 215, successRate: 97.8, avgTime: "1.4s", lastRun: "30s ago", color: T.green },
  { id: "a5", name: "Customer Support Bot", role: "Ticket Triage & Response", status: "error", model: "claude-sonnet-4-6", runs: 340, successRate: 94.3, avgTime: "2.1s", lastRun: "15 min ago", color: T.amber },
  { id: "a6", name: "QA Tester", role: "Test Generation & Validation", status: "paused", model: "claude-haiku-4-5", runs: 28, successRate: 100, avgTime: "0.9s", lastRun: "1d ago", color: T.red },
];

const MY_FLOWS = [
  { id: "f1", name: "Research â Summarize â Publish", status: "running", agents: 3, runs: 47, lastRun: "Running now", successRate: 96, steps: ["Research", "Validate", "Summarize", "Format", "Publish"], currentStep: 3 },
  { id: "f2", name: "PR Review Pipeline", status: "active", agents: 2, runs: 89, lastRun: "5 min ago", successRate: 99, steps: ["Fetch PR", "Analyze", "Review", "Comment"], currentStep: 4 },
  { id: "f3", name: "Daily Report Generator", status: "completed", agents: 4, runs: 30, lastRun: "Today 6:00 AM", successRate: 100, steps: ["Collect", "Analyze", "Generate", "Email"], currentStep: 4 },
  { id: "f4", name: "Lead Qualification", status: "waiting", agents: 2, runs: 12, lastRun: "1h ago", successRate: 83, steps: ["Ingest", "Score", "Route", "Notify"], currentStep: 2 },
  { id: "f5", name: "Bug Triage Automation", status: "error", agents: 3, runs: 8, lastRun: "30 min ago", successRate: 75, steps: ["Parse", "Classify", "Assign", "Respond"], currentStep: 2 },
];

const USAGE_DATA = { tokensUsed: "4.2M", tokensLimit: "10M", apiCalls: 1247, costThisMonth: "$32.40", costLastMonth: "$28.10", daysLeft: 21 };

const API_KEYS = [
  { id: "k1", name: "Production", prefix: "nx-prod-...8f2a", created: "Jan 15, 2026", lastUsed: "2 min ago", status: "active" },
  { id: "k2", name: "Staging", prefix: "nx-stg-...3b71", created: "Feb 3, 2026", lastUsed: "1h ago", status: "active" },
  { id: "k3", name: "Development", prefix: "nx-dev-...c9e4", created: "Mar 20, 2026", lastUsed: "3d ago", status: "active" },
];

// âââ REUSABLE COMPONENTS âââââââââââââââââââââââââââââââââââââ
const StatusPill = ({ status }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px",
    borderRadius: 20, fontSize: 11.5, fontWeight: 600,
    background: statusBg(status), color: statusColor(status),
    textTransform: "capitalize",
  }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor(status), animation: (status === "running" || status === "active") ? "pulse 2s infinite" : "none" }} />
    {status}
  </span>
);

const Card = ({ children, style, onClick, hover = true }) => (
  <div onClick={onClick} style={{
    background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusLg,
    padding: 24, transition: "all 0.25s ease", boxShadow: T.shadow,
    cursor: onClick ? "pointer" : "default", ...style,
  }}
  onMouseEnter={e => { if (hover && onClick) { e.currentTarget.style.borderColor = T.borderActive; e.currentTarget.style.boxShadow = T.shadowLg; e.currentTarget.style.transform = "translateY(-2px)"; } }}
  onMouseLeave={e => { if (hover && onClick) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = "translateY(0)"; } }}
  >{children}</div>
);

const Btn = ({ children, variant = "primary", size = "md", icon, onClick, style }) => {
  const p = variant === "primary", g = variant === "ghost", d = variant === "danger";
  const sz = size === "sm" ? { padding: "7px 14px", fontSize: 12.5 } : size === "lg" ? { padding: "13px 28px", fontSize: 15 } : { padding: "10px 20px", fontSize: 13.5 };
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 7, border: "none",
      borderRadius: 10, fontFamily: T.font, fontWeight: 600, cursor: "pointer",
      transition: "all 0.2s",
      background: p ? T.accent : d ? T.red : g ? "transparent" : T.elevated,
      color: p || d ? "#fff" : T.text,
      outline: g ? `1.5px solid ${T.border}` : "none",
      ...sz, ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = p ? "0 4px 16px rgba(45,91,240,0.3)" : d ? "0 4px 16px rgba(220,38,38,0.2)" : "none"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >{icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}{children}</button>
  );
};

const ProgressBar = ({ value, max, color = T.accent, height = 6 }) => (
  <div style={{ height, background: T.elevated, borderRadius: height, overflow: "hidden", width: "100%" }}>
    <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: height, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
  </div>
);

const MetricCard = ({ label, value, sub, icon, color = T.accent, trend }) => (
  <Card hover={false}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={20} color={color} />
      </div>
      {trend && <span style={{ fontSize: 12, fontWeight: 600, color: trend > 0 ? T.green : T.red }}>{trend > 0 ? "â" : "â"} {Math.abs(trend)}%</span>}
    </div>
    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: T.font, letterSpacing: "-0.02em", marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 13, color: T.textMuted }}>{label}</div>
    {sub && <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>{sub}</div>}
  </Card>
);

// âââ SIDEBAR âââââââââââââââââââââââââââââââââââââââââââââââââ
const NAV = [
  { id: "dashboard", icon: "home", label: "Overview" },
  { id: "agents", icon: "cpu", label: "My Agents" },
  { id: "flows", icon: "flows", label: "My Flows" },
  { id: "memory", icon: "memory", label: "Memory" },
  { id: "usage", icon: "bar", label: "Usage" },
  { id: "keys", icon: "key", label: "API Keys" },
];

const Sidebar = ({ active, onNav }) => (
  <aside style={{
    width: 240, background: T.surface, borderRight: `1px solid ${T.border}`,
    display: "flex", flexDirection: "column", flexShrink: 0, height: "100%",
  }}>
    <div style={{ padding: "20px 20px 24px", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T.display, fontWeight: 700, fontSize: 16, color: "#fff",
        }}>N</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>Nexus</div>
          <div style={{ fontSize: 11, color: T.textDim, fontWeight: 500 }}>AI Platform</div>
        </div>
      </div>
    </div>

    <nav style={{ padding: "12px 10px", flex: 1 }}>
      {NAV.map(item => {
        const a = active === item.id;
        return (
          <button key={item.id} onClick={() => onNav(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
            background: a ? T.accentSoft : "transparent",
            color: a ? T.accent : T.textMuted,
            fontSize: 13.5, fontWeight: a ? 600 : 500, fontFamily: T.font,
            transition: "all 0.15s", marginBottom: 2,
          }}
          onMouseEnter={e => { if (!a) e.currentTarget.style.background = T.elevated; }}
          onMouseLeave={e => { if (!a) e.currentTarget.style.background = a ? T.accentSoft : "transparent"; }}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        );
      })}
    </nav>

    <div style={{ padding: "16px", borderTop: `1px solid ${T.border}` }}>
      <button onClick={() => onNav("settings")} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
        background: active === "settings" ? T.accentSoft : "transparent",
        color: active === "settings" ? T.accent : T.textMuted,
        fontSize: 13.5, fontWeight: 500, fontFamily: T.font, transition: "all 0.15s",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: T.font,
        }}>{USER.avatar}</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{USER.name}</div>
          <div style={{ fontSize: 11, color: T.textDim }}>{USER.plan} Plan</div>
        </div>
      </button>
    </div>
  </aside>
);

// âââ TOP BAR âââââââââââââââââââââââââââââââââââââââââââââââââ
const TopBar = ({ title, subtitle }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 32px", borderBottom: `1px solid ${T.border}`, background: T.surface,
  }}>
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 2 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13.5, color: T.textMuted }}>{subtitle}</p>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
        cursor: "pointer",
      }}>
        <Icon name="search" size={15} color={T.textDim} />
        <span style={{ fontSize: 13, color: T.textDim }}>Search...</span>
        <span style={{ fontSize: 10, fontFamily: T.mono, color: T.textDim, background: T.surface, padding: "2px 6px", borderRadius: 4, border: `1px solid ${T.border}` }}>âK</span>
      </div>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: T.elevated, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
        <Icon name="bell" size={16} color={T.textMuted} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: T.red, border: `2px solid ${T.surface}` }} />
      </div>
    </div>
  </div>
);

// âââ DASHBOARD PAGE ââââââââââââââââââââââââââââââââââââââââââ
const DashboardPage = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const greeting = time.getHours() < 12 ? "Good morning" : time.getHours() < 18 ? "Good afternoon" : "Good evening";
  const activeAgents = MY_AGENTS.filter(a => a.status === "active").length;
  const runningFlows = MY_FLOWS.filter(f => f.status === "running").length;

  return (
    <div>
      <TopBar title={`${greeting}, ${USER.name.split(" ")[0]}`} subtitle={`${activeAgents} agents active Â· ${runningFlows} flows running`} />
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Active Agents", value: activeAgents, icon: "cpu", color: T.accent, trend: 12, sub: `of ${MY_AGENTS.length} total` },
            { label: "Flows Running", value: runningFlows, icon: "flows", color: T.green, trend: 8, sub: `${MY_FLOWS.filter(f => f.status === "completed").length} completed today` },
            { label: "API Calls Today", value: USAGE_DATA.apiCalls.toLocaleString(), icon: "zap", color: T.violet, trend: 15, sub: "Avg 89/hr" },
            { label: "Cost This Month", value: USAGE_DATA.costThisMonth, icon: "billing", color: T.amber, trend: -3, sub: `${USAGE_DATA.daysLeft} days remaining` },
          ].map((m, i) => (
            <div key={i} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
              <MetricCard {...m} />
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
          <Card hover={false} style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>Recent Agent Runs</h3>
              <span style={{ fontSize: 12, color: T.accent, fontWeight: 600, cursor: "pointer" }}>View all â</span>
            </div>
            {MY_AGENTS.slice(0, 4).map((a, i) => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                borderBottom: i < 3 ? `1px solid ${T.border}` : "none",
                animation: `slideIn 0.3s ease ${i * 0.06}s both`,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: a.color }}>{a.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: T.textDim }}>{a.lastRun}</div>
                </div>
                <StatusPill status={a.status} />
              </div>
            ))}
          </Card>

          <Card hover={false} style={{ animation: "fadeUp 0.5s ease 0.35s both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>Active Flows</h3>
              <span style={{ fontSize: 12, color: T.accent, fontWeight: 600, cursor: "pointer" }}>View all â</span>
            </div>
            {MY_FLOWS.slice(0, 4).map((f, i) => (
              <div key={f.id} style={{
                padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none",
                animation: `slideIn 0.3s ease ${i * 0.06}s both`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{f.name}</div>
                  <StatusPill status={f.status} />
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {f.steps.map((step, si) => (
                    <div key={si} style={{
                      flex: 1, height: 4, borderRadius: 2,
                      background: si < f.currentStep ? T.green : si === f.currentStep && f.status === "running" ? T.accent : T.elevated,
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: T.textDim, marginTop: 6 }}>{f.agents} agents Â· {f.runs} runs Â· {f.successRate}% success</div>
              </div>
            ))}
          </Card>
        </div>

        <Card hover={false} style={{ animation: "fadeUp 0.5s ease 0.4s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Token Usage</h3>
            <span style={{ fontSize: 13, fontFamily: T.mono, color: T.textMuted }}>{USAGE_DATA.tokensUsed} / {USAGE_DATA.tokensLimit}</span>
          </div>
          <ProgressBar value={4.2} max={10} color={T.accent} height={8} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: T.textDim }}>
            <span>42% used this billing period</span>
            <span>{USAGE_DATA.daysLeft} days remaining</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// âââ AGENTS PAGE âââââââââââââââââââââââââââââââââââââââââââââ
const AgentsPage = () => {
  const [selected, setSelected] = useState(null);
  const agent = selected ? MY_AGENTS.find(a => a.id === selected) : null;

  return (
    <div>
      <TopBar title="My Agents" subtitle={`${MY_AGENTS.length} agents configured`} />
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "Active", "Idle", "Error"].map(f => (
              <button key={f} style={{
                padding: "7px 14px", borderRadius: 8, border: `1px solid ${f === "All" ? T.borderActive : T.border}`,
                background: f === "All" ? T.accentSoft : "transparent",
                color: f === "All" ? T.accent : T.textMuted,
                fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: T.font,
              }}>{f}</button>
            ))}
          </div>
          <Btn icon="plus" size="sm">Create Agent</Btn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {MY_AGENTS.map((a, i) => (
              <Card key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)}
                style={{ borderColor: a.id === selected ? T.borderActive : T.border, animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${a.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: a.color }}>{a.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{a.name}</div>
                      <div style={{ fontSize: 12.5, color: T.textMuted }}>{a.role}</div>
                    </div>
                  </div>
                  <StatusPill status={a.status} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Runs", value: a.runs },
                    { label: "Success", value: `${a.successRate}%` },
                    { label: "Avg Time", value: a.avgTime },
                  ].map(m => (
                    <div key={m.label} style={{ textAlign: "center", padding: "10px 0", background: T.elevated, borderRadius: 8 }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{m.value}</div>
                      <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: T.textDim, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 11 }}>{a.model}</span>
                  <span>Last run: {a.lastRun}</span>
                </div>
              </Card>
            ))}
          </div>

          {agent && (
            <Card hover={false} style={{ alignSelf: "flex-start", position: "sticky", top: 20, animation: "slideIn 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>Agent Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted }}><Icon name="x" size={16} /></button>
              </div>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${agent.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: agent.color, marginBottom: 16 }}>{agent.name[0]}</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{agent.name}</div>
              <div style={{ fontSize: 14, color: T.textMuted, marginBottom: 20 }}>{agent.role}</div>
              {[
                ["Model", agent.model], ["Status", agent.status], ["Total Runs", agent.runs],
                ["Success Rate", `${agent.successRate}%`], ["Avg Response", agent.avgTime], ["Last Run", agent.lastRun],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13.5 }}>
                  <span style={{ color: T.textMuted }}>{l}</span>
                  <span style={{ fontWeight: 600, fontFamily: l === "Model" ? T.mono : T.font, fontSize: l === "Model" ? 12 : 13.5 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <Btn size="sm" style={{ flex: 1 }}>Configure</Btn>
                <Btn variant="ghost" size="sm" icon="terminal">Logs</Btn>
                <Btn variant="ghost" size="sm" icon="play">Run</Btn>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// âââ FLOWS PAGE ââââââââââââââââââââââââââââââââââââââââââââââ
const FlowsPage = () => (
  <div>
    <TopBar title="My Flows" subtitle="Automated multi-agent workflows" />
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Btn icon="plus" size="sm">Create Flow</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {MY_FLOWS.map((f, i) => (
          <Card key={f.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="flows" size={20} color={T.accent} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 12.5, color: T.textDim }}>{f.agents} agents Â· {f.runs} total runs Â· Last: {f.lastRun}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <StatusPill status={f.status} />
                <Btn variant="ghost" size="sm" icon={f.status === "running" ? "pause" : "play"} />
                <Btn variant="ghost" size="sm" icon="eye" />
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {f.steps.map((step, si) => (
                <div key={si} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: si < f.currentStep ? T.greenSoft : si === f.currentStep && f.status === "running" ? T.accentSoft : T.elevated,
                    color: si < f.currentStep ? T.green : si === f.currentStep && f.status === "running" ? T.accent : T.textDim,
                    border: `1px solid ${si < f.currentStep ? T.green + "20" : si === f.currentStep && f.status === "running" ? T.accent + "20" : T.border}`,
                  }}>{step}</div>
                  {si < f.steps.length - 1 && <span style={{ color: T.textDim, fontSize: 10 }}>â</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 20, fontSize: 12.5, color: T.textMuted }}>
              <span>Success Rate: <strong style={{ color: f.successRate >= 95 ? T.green : f.successRate >= 80 ? T.amber : T.red }}>{f.successRate}%</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// âââ MEMORY PAGE âââââââââââââââââââââââââââââââââââââââââââââ
const MemoryPage = () => {
  const [query, setQuery] = useState("");
  const memories = [
    { scope: "/customers/analysis", content: "Enterprise customers prefer quarterly reviews with ROI data and competitive benchmarks included.", importance: 0.94, ago: "5m ago" },
    { scope: "/code/best-practices", content: "React 19 concurrent features improve perceived performance by 40% on complex dashboards.", importance: 0.88, ago: "22m ago" },
    { scope: "/research/market", content: "AI agent market projected $12.4B by 2028, with orchestration platforms growing at 34% CAGR.", importance: 0.91, ago: "1h ago" },
    { scope: "/support/patterns", content: "Most common support ticket: API rate limiting. Solution: implement exponential backoff with jitter.", importance: 0.72, ago: "3h ago" },
  ];
  const filtered = query ? memories.filter(m => m.content.toLowerCase().includes(query.toLowerCase()) || m.scope.includes(query)) : memories;

  return (
    <div>
      <TopBar title="Memory Explorer" subtitle="Browse your agents' learned knowledge" />
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, marginBottom: 24, boxShadow: T.shadow }}>
          <Icon name="search" size={18} color={T.textDim} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search memories by content, scope, or keyword..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: T.text, fontFamily: T.font, fontSize: 14 }} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDim }}><Icon name="x" size={14} /></button>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((m, i) => (
            <Card key={i} style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, background: T.accentSoft, padding: "3px 10px", borderRadius: 6 }}>{m.scope}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ProgressBar value={m.importance} max={1} color={m.importance > 0.85 ? T.green : T.amber} height={4} />
                  <span style={{ fontSize: 11, fontFamily: T.mono, color: T.textDim, minWidth: 32 }}>{(m.importance * 100).toFixed(0)}%</span>
                  <span style={{ fontSize: 11, color: T.textDim }}>{m.ago}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: T.text }}>{m.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// âââ USAGE PAGE ââââââââââââââââââââââââââââââââââââââââââââââ
const UsagePage = () => {
  const dailyUsage = [18, 32, 28, 45, 52, 38, 41, 55, 62, 48, 39, 58, 67, 54, 42, 71, 63, 49, 56, 74, 68, 51, 45, 78, 72, 59, 63, 82, 76, 61];
  const maxUsage = Math.max(...dailyUsage);

  return (
    <div>
      <TopBar title="Usage & Billing" subtitle="Monitor your resource consumption" />
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Tokens Used", value: USAGE_DATA.tokensUsed, icon: "zap", color: T.accent, sub: `of ${USAGE_DATA.tokensLimit} limit` },
            { label: "API Calls", value: USAGE_DATA.apiCalls.toLocaleString(), icon: "flows", color: T.violet, sub: "This billing period" },
            { label: "This Month", value: USAGE_DATA.costThisMonth, icon: "billing", color: T.green, sub: `Last month: ${USAGE_DATA.costLastMonth}` },
            { label: "Days Left", value: USAGE_DATA.daysLeft, icon: "clock", color: T.amber, sub: "In billing period" },
          ].map((m, i) => (
            <div key={i} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
              <MetricCard {...m} />
            </div>
          ))}
        </div>

        <Card hover={false} style={{ marginBottom: 20, animation: "fadeUp 0.5s ease 0.3s both" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Daily API Calls (Last 30 Days)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
            {dailyUsage.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v / maxUsage) * 100}%`, minWidth: 6,
                background: i === dailyUsage.length - 1 ? T.accent : `${T.accent}40`,
                borderRadius: 3, transition: "height 0.3s ease",
              }}
              title={`Day ${i + 1}: ${v} calls`}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: T.textDim }}>
            <span>30 days ago</span><span>Today</span>
          </div>
        </Card>

        <Card hover={false} style={{ animation: "fadeUp 0.5s ease 0.35s both" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Plan Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 4 }}>Current Plan</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>Pro</div>
              <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>$49/month Â· Renews Apr 30</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 8 }}>Token Budget</div>
              <ProgressBar value={4.2} max={10} color={T.accent} height={8} />
              <div style={{ fontSize: 12, color: T.textDim, marginTop: 6 }}>4.2M / 10M tokens (42%)</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <Btn size="sm">Upgrade Plan</Btn>
            <Btn variant="ghost" size="sm">View Invoices</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

// âââ API KEYS PAGE âââââââââââââââââââââââââââââââââââââââââââ
const KeysPage = () => {
  const [copied, setCopied] = useState(null);
  const handleCopy = (id) => { setCopied(id); setTimeout(() => setCopied(null), 2000); };

  return (
    <div>
      <TopBar title="API Keys" subtitle="Manage authentication for your integrations" />
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: T.textMuted, maxWidth: 500 }}>
            Use API keys to authenticate requests to the Nexus Platform API. Keep your keys secure and rotate them regularly.
          </p>
          <Btn icon="plus" size="sm">Create Key</Btn>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {API_KEYS.map((k, i) => (
            <Card key={k.id} hover={false} style={{ animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="key" size={20} color={T.accent} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{k.name}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 13, color: T.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
                      {k.prefix}
                      <button onClick={() => handleCopy(k.id)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: copied === k.id ? T.green : T.textDim, transition: "color 0.2s",
                        display: "flex", alignItems: "center",
                      }}>
                        <Icon name={copied === k.id ? "check" : "copy"} size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: T.textDim }}>Created {k.created}</div>
                    <div style={{ fontSize: 12, color: T.textDim }}>Last used {k.lastUsed}</div>
                  </div>
                  <StatusPill status={k.status} />
                  <Btn variant="danger" size="sm">Revoke</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card hover={false} style={{ marginTop: 24, background: T.elevated, border: "none", animation: "fadeUp 0.5s ease 0.3s both" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Quick Start</h3>
          <div style={{ fontFamily: T.mono, fontSize: 12.5, lineHeight: 1.8, color: T.textMuted, background: T.surface, padding: 16, borderRadius: 10, border: `1px solid ${T.border}` }}>
            <div style={{ color: T.textDim }}>{"// Install the SDK"}</div>
            <div><span style={{ color: T.green }}>npm install</span> @nexus-ai/sdk</div>
            <div style={{ color: T.textDim, marginTop: 8 }}>{"// Initialize"}</div>
            <div><span style={{ color: T.violet }}>import</span> {"{ Nexus }"} <span style={{ color: T.violet }}>from</span> <span style={{ color: T.amber }}>'@nexus-ai/sdk'</span></div>
            <div><span style={{ color: T.violet }}>const</span> nexus = <span style={{ color: T.violet }}>new</span> <span style={{ color: T.cyan }}>Nexus</span>({'{'}apiKey: {'}'}<span style={{ color: T.amber }}>process.env.NEXUS_API_KEY</span>{' }'})</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// âââ SETTINGS PAGE âââââââââââââââââââââââââââââââââââââââââââ
const SettingsPage = ({ onSignOut }) => {
  const [tab, setTab] = useState("profile");
  return (
    <div>
      <TopBar title="Settings" subtitle="Manage your account and preferences" />
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: `1px solid ${T.border}`, paddingBottom: 2 }}>
          {[["profile", "Profile"], ["notifications", "Notifications"], ["team", "Team"], ["security", "Security"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: "10px 18px", border: "none",
              borderBottom: `2px solid ${id === tab ? T.accent : "transparent"}`,
              background: "transparent", color: id === tab ? T.accent : T.textMuted,
              fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: T.font, transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {tab === "profile" && (
          <Card hover={false} style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: "#fff",
              }}>{USER.avatar}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{USER.name}</div>
                <div style={{ fontSize: 14, color: T.textMuted }}>{USER.email}</div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.accent, background: T.accentSoft, padding: "3px 10px", borderRadius: 6 }}>{USER.plan} Plan</span>
                </div>
              </div>
            </div>
            {[
              ["Display Name", USER.name],
              ["Email", USER.email],
              ["Organization", "Nexus AI Labs"],
              ["Timezone", "Asia/Kolkata (IST)"],
              ["Language", "English"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 500 }}>{value}</div>
                </div>
                <span style={{ fontSize: 12.5, color: T.accent, fontWeight: 600, cursor: "pointer" }}>Edit</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              <Btn size="sm">Save Changes</Btn>
              <Btn variant="ghost" size="sm" icon="logout" onClick={onSignOut}>Sign Out</Btn>
            </div>
          </Card>
        )}

        {tab === "notifications" && (
          <Card hover={false} style={{ maxWidth: 600 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Notification Preferences</h3>
            {[
              ["Flow Completions", "Get notified when a flow run finishes", true],
              ["Agent Errors", "Alert when an agent encounters an error", true],
              ["Usage Alerts", "Warn when approaching token limits", true],
              ["Weekly Reports", "Summary of agent activity and costs", false],
              ["Marketing Updates", "Product news and feature announcements", false],
            ].map(([title, desc, enabled]) => (
              <div key={title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: T.textMuted }}>{desc}</div>
                </div>
                <div style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer",
                  background: enabled ? T.accent : T.elevated,
                  padding: 2, transition: "background 0.2s",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 10, background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    transform: enabled ? "translateX(20px)" : "translateX(0)",
                    transition: "transform 0.2s",
                  }} />
                </div>
              </div>
            ))}
          </Card>
        )}

        {tab === "team" && (
          <Card hover={false} style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Team Members</h3>
              <Btn size="sm" icon="plus">Invite</Btn>
            </div>
            {[
              { name: "Gopal Yadav", email: "gopal@nexusai.dev", role: "Owner", avatar: "GY" },
              { name: "Priya Sharma", email: "priya@nexusai.dev", role: "Admin", avatar: "PS" },
              { name: "Alex Chen", email: "alex@nexusai.dev", role: "Developer", avatar: "AC" },
            ].map(member => (
              <div key={member.email} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff",
                }}>{member.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{member.name}</div>
                  <div style={{ fontSize: 12.5, color: T.textMuted }}>{member.email}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.textMuted, background: T.elevated, padding: "4px 10px", borderRadius: 6 }}>{member.role}</span>
              </div>
            ))}
          </Card>
        )}

        {tab === "security" && (
          <Card hover={false} style={{ maxWidth: 600 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Security Settings</h3>
            {[
              ["Password", "Last changed 30 days ago", "Change"],
              ["Two-Factor Auth", "Enabled via authenticator app", "Manage"],
              ["Active Sessions", "3 devices currently signed in", "View"],
              ["Login History", "Last login: Today 8:30 AM from Lucknow, IN", "View"],
            ].map(([title, desc, action]) => (
              <div key={title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: T.textMuted }}>{desc}</div>
                </div>
                <span style={{ fontSize: 12.5, color: T.accent, fontWeight: 600, cursor: "pointer" }}>{action}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <Btn variant="danger" size="sm">Delete Account</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// âââ APP ROOT ââââââââââââââââââââââââââââââââââââââââââââââââ
const PAGES = {
  dashboard: DashboardPage,
  agents: AgentsPage,
  flows: FlowsPage,
  memory: MemoryPage,
  usage: UsagePage,
  keys: KeysPage,
  settings: SettingsPage,
};

const NexusCustomerPortal = ({ onGoHome, onSignOut }) => {
  const [page, setPage] = useState("dashboard");
  const PageComp = PAGES[page] || DashboardPage;
  const pageProps = page === "settings" ? { onSignOut } : {};

  return (
    <>
      <GlobalStyles />
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar active={page} onNav={setPage} />
        <main style={{ flex: 1, overflow: "auto", background: T.bg }}>
          <PageComp {...pageProps} />
        </main>
      </div>
    </>
  );
}


// âââ APP ROOT âââââââââââââââââââââââââââââââââââââââââââââ
export default function App() {
  const [view, setView] = useState("home");
  const [authMode, setAuthMode] = useState("signin");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage?.getItem('nexus_token') : null;
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(r => r.json())
        .then(data => { if (data.user) { setUser(data.user); setView("app"); } setAuthLoading(false); })
        .catch(() => { window.localStorage?.removeItem('nexus_token'); setAuthLoading(false); });
    } else { setAuthLoading(false); }
  }, []);

  const handleSignOut = () => { window.localStorage?.removeItem('nexus_token'); setUser(null); setView("home"); };
  const handleAuthSuccess = (u) => { setUser(u); setView("app"); };

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#fafafa", fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 auto 16px", animation: "pulse 2s infinite" }}>N</div>
        <div style={{ fontSize: 14, color: "#71717a" }}>Loading...</div>
      </div>
    </div>
  );

  if (view === "auth") return <AuthPage mode={authMode} onSwitch={() => setAuthMode(authMode === "signin" ? "signup" : "signin")} onSuccess={handleAuthSuccess} />;
  if (view === "app") return <NexusCustomerPortal onGoHome={() => setView("home")} onSignOut={handleSignOut} />;
  return <HomePage onEnterApp={() => setView("auth")} />;
}
