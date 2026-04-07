"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   AgentForge — Self-Hosted Agentic AI Platform
   Deployed on Vercel with secure server-side API key
   ═══════════════════════════════════════════════════════════ */

// ─── LocalStorage DB (persists across sessions) ────────────
const DB = {
  get(key) {
    try { const v = localStorage.getItem(`af_${key}`); return v ? JSON.parse(v) : null; }
    catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(`af_${key}`, JSON.stringify(val)); } catch {}
  },
  del(key) {
    try { localStorage.removeItem(`af_${key}`); } catch {}
  },
};

// ─── API Call (goes through our secure /api/agent route) ───
async function callLLM(messages, system, tools) {
  const body = { messages };
  if (system) body.system = system;
  if (tools?.length) body.tools = tools;

  const res = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
  return data;
}

// ─── Tool Definitions ──────────────────────────────────────
const TOOL_DEFS = [
  { name: "web_search", description: "Search the web for current information.", input_schema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
  { name: "store_memory", description: "Store a key-value pair in persistent memory that survives across runs.", input_schema: { type: "object", properties: { key: { type: "string" }, value: { type: "string" } }, required: ["key", "value"] } },
  { name: "recall_memory", description: "Retrieve a value from persistent memory by key.", input_schema: { type: "object", properties: { key: { type: "string" } }, required: ["key"] } },
  { name: "create_note", description: "Save a note or report.", input_schema: { type: "object", properties: { title: { type: "string" }, content: { type: "string" } }, required: ["title", "content"] } },
  { name: "get_current_time", description: "Get the current date and time.", input_schema: { type: "object", properties: {} } },
  { name: "math_calculate", description: "Evaluate a mathematical expression.", input_schema: { type: "object", properties: { expression: { type: "string" } }, required: ["expression"] } },
];

function executeTool(name, input, agentId) {
  switch (name) {
    case "web_search":
      return `[Search results for "${input.query}"] Note: For live web search, integrate a search API. The agent will reason using its training knowledge about "${input.query}".`;
    case "store_memory": {
      const mem = DB.get(`mem_${agentId}`) || {};
      mem[input.key] = input.value;
      DB.set(`mem_${agentId}`, mem);
      return `Stored "${input.key}" in persistent memory.`;
    }
    case "recall_memory": {
      const m = DB.get(`mem_${agentId}`) || {};
      return m[input.key] ? `Memory[${input.key}] = ${m[input.key]}` : `No memory for key "${input.key}"`;
    }
    case "create_note":
      return `Note saved: "${input.title}"`;
    case "get_current_time":
      return new Date().toLocaleString();
    case "math_calculate":
      try {
        const r = Function('"use strict"; return (' + input.expression.replace(/[^0-9+\-*/().%\s]/g, "") + ")")();
        return `${input.expression} = ${r}`;
      } catch { return "Invalid expression"; }
    default:
      return `Unknown tool: ${name}`;
  }
}

// ─── Agent Runner ──────────────────────────────────────────
async function runAgent(agent, inputData, onStep) {
  const steps = [];
  const t0 = Date.now();
  let tokens = 0;

  const sys = `You are an autonomous AI agent named "${agent.name}".

YOUR GOAL:
${agent.goal}
${agent.instructions ? `\nINSTRUCTIONS:\n${agent.instructions}` : ""}

BEHAVIOR:
- Work step by step toward your goal.
- Use available tools when needed.
- Store important findings in memory using store_memory.
- When done, respond with a clear summary.
- Be concise and action-oriented.`;

  const toolDefs = TOOL_DEFS.filter((t) => agent.tools.includes(t.name));
  let msgs = [{ role: "user", content: `Begin working on your goal.${inputData ? "\n\nInput:\n" + JSON.stringify(inputData) : ""}` }];

  for (let i = 0; i < 10; i++) {
    onStep({ type: "thinking", step: i + 1 });

    const res = await callLLM(msgs, sys, toolDefs.length ? toolDefs : undefined);
    tokens += (res.usage?.input_tokens || 0) + (res.usage?.output_tokens || 0);

    let text = "";
    let hasTools = false;
    const toolBlocks = [];

    for (const b of res.content) {
      if (b.type === "text") text += b.text;
      else if (b.type === "tool_use") {
        hasTools = true;
        onStep({ type: "tool", name: b.name, input: b.input, step: i + 1 });
        const result = executeTool(b.name, b.input, agent.id);
        steps.push({ step: i + 1, action: `tool:${b.name}`, arguments: b.input, result, timestamp: new Date().toISOString() });
        toolBlocks.push({ type: "tool_result", tool_use_id: b.id, content: result });
      }
    }

    if (!hasTools) {
      steps.push({ step: i + 1, action: "final_response", result: text, timestamp: new Date().toISOString() });
      onStep({ type: "done", output: text });
      return { status: "success", output: text, steps, tokens, duration: ((Date.now() - t0) / 1000).toFixed(1) };
    }

    // Build next messages with proper tool_use/tool_result format
    const assistantContent = [];
    for (const b of res.content) {
      if (b.type === "text" && b.text) assistantContent.push({ type: "text", text: b.text });
      else if (b.type === "tool_use") assistantContent.push(b);
    }

    msgs.push({ role: "assistant", content: assistantContent });
    msgs.push({ role: "user", content: toolBlocks });
  }

  return { status: "max_iterations", output: "Reached max iterations.", steps, tokens, duration: ((Date.now() - t0) / 1000).toFixed(1) };
}

// ─── Helpers ───────────────────────────────────────────────
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const TEMPLATES = [
  { name: "Research Assistant", icon: "🔍", goal: "Research a given topic thoroughly. Find key facts, recent developments, and expert opinions. Produce a clear, well-organized summary.", instructions: "Start by searching. Organize into sections. Store key findings in memory.", tools: ["web_search", "store_memory", "recall_memory", "create_note"] },
  { name: "Daily Planner", icon: "📅", goal: "Create a structured daily plan based on tasks and priorities I provide. Allocate time blocks and suggest optimal order.", instructions: "Check current time. Create time blocks. Use math for calculations. Store plan in memory.", tools: ["get_current_time", "math_calculate", "store_memory", "create_note"] },
  { name: "Writing Coach", icon: "✍️", goal: "Improve writing by analyzing text, suggesting edits, checking structure, and providing constructive feedback.", instructions: "Read text carefully. Identify strengths and weaknesses. Store feedback patterns in memory.", tools: ["store_memory", "recall_memory", "create_note"] },
  { name: "Data Analyst", icon: "📊", goal: "Analyze provided data or numbers. Calculate statistics, identify trends, and produce an analytical report.", instructions: "Use math_calculate for computations. Store key metrics. Create structured report.", tools: ["math_calculate", "store_memory", "recall_memory", "create_note"] },
  { name: "Learning Tutor", icon: "🎓", goal: "Act as a personal tutor. Explain concepts, create practice problems, and track progress across sessions.", instructions: "Recall previous sessions. Adapt difficulty. Store mastered topics. Create exercises.", tools: ["web_search", "store_memory", "recall_memory", "create_note", "math_calculate"] },
  { name: "Brainstorm Partner", icon: "💡", goal: "Generate creative ideas for a given challenge using lateral thinking and diverse perspectives. Rank ideas by feasibility.", instructions: "Explore from multiple angles. Generate 10+ ideas. Evaluate each. Store promising ideas.", tools: ["web_search", "store_memory", "create_note"] },
];

// ─── Theme ─────────────────────────────────────────────────
const T = {
  bg: "#0c0f14", sf: "#13171f", sfh: "#1a1f2b", bd: "#1e2533", bdl: "#2a3245",
  tx: "#e8ecf4", tm: "#7a849a", td: "#4a5268",
  ac: "#4f8ff7", acd: "#1a3366",
  gn: "#34d399", gnd: "#0d3328",
  rd: "#f87171", rdd: "#3b1515",
  am: "#fbbf24", amd: "#3b2f08",
};
const FN = "'DM Sans', sans-serif";
const MN = "'IBM Plex Mono', monospace";

// ─── UI Components ─────────────────────────────────────────
const Badge = ({ status, sm }) => {
  const m = { idle: [T.gnd, T.gn, "#065f46"], running: [T.acd, T.ac, "#1e40af"], success: [T.gnd, T.gn, "#065f46"], failed: [T.rdd, T.rd, "#991b1b"], error: [T.rdd, T.rd, "#991b1b"], max_iterations: [T.amd, T.am, "#92400e"] };
  const [bg, fg, br] = m[status] || m.idle;
  return <span style={{ padding: sm ? "2px 7px" : "3px 10px", borderRadius: 20, fontSize: sm ? 10 : 11, fontWeight: 600, background: bg, color: fg, border: `1px solid ${br}`, textTransform: "uppercase", letterSpacing: .6, fontFamily: MN, whiteSpace: "nowrap" }}>{status === "running" ? "● " : ""}{status === "max_iterations" ? "MAXITER" : status}</span>;
};

const Btn = ({ children, onClick, v = "primary", disabled, style: s }) => {
  const vs = { primary: [T.ac, "#fff", "none"], ghost: ["transparent", T.tm, `1px solid ${T.bd}`], danger: [T.rdd, T.rd, `1px solid #55222244`], success: ["#062e1d", T.gn, `1px solid #06543488`] };
  const [bg, fg, br] = vs[v];
  return <button onClick={onClick} disabled={disabled} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: FN, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1, display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: fg, border: br, transition: "all .15s", ...s }}>{children}</button>;
};

const Inp = ({ label, ...p }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && <label style={{ color: T.tm, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .8, fontFamily: MN }}>{label}</label>}
    <input {...p} style={{ padding: "10px 12px", background: T.bg, border: `1px solid ${T.bd}`, borderRadius: 8, color: T.tx, fontSize: 14, fontFamily: FN, outline: "none", width: "100%", boxSizing: "border-box", ...(p.style || {}) }} />
  </div>
);

const TxA = ({ label, ...p }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && <label style={{ color: T.tm, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .8, fontFamily: MN }}>{label}</label>}
    <textarea {...p} style={{ padding: "10px 12px", background: T.bg, border: `1px solid ${T.bd}`, borderRadius: 8, color: T.tx, fontSize: 14, fontFamily: FN, outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.5, ...(p.style || {}) }} />
  </div>
);

const Card = ({ children, style: s, onClick, hv }) => (
  <div onClick={onClick} style={{ background: T.sf, border: `1px solid ${T.bd}`, borderRadius: 12, padding: 20, cursor: onClick ? "pointer" : "default", transition: "all .15s", ...s }}
    onMouseEnter={e => { if (hv) { e.currentTarget.style.borderColor = T.bdl; e.currentTarget.style.background = T.sfh; } }}
    onMouseLeave={e => { if (hv) { e.currentTarget.style.borderColor = T.bd; e.currentTarget.style.background = T.sf; } }}>{children}</div>
);

// ─── Create Agent Modal ─────────────────────────────────────
function CreateModal({ onClose, onCreated, template }) {
  const [form, setForm] = useState({ name: template?.name || "", goal: template?.goal || "", instructions: template?.instructions || "", tools: template?.tools || ["store_memory", "recall_memory"] });
  const [saving, setSaving] = useState(false);
  const all = TOOL_DEFS.map(t => t.name);
  const tog = t => setForm(f => ({ ...f, tools: f.tools.includes(t) ? f.tools.filter(x => x !== t) : [...f.tools, t] }));

  const save = () => {
    if (!form.name.trim() || !form.goal.trim()) return;
    setSaving(true);
    const agent = { ...form, id: uid(), status: "idle", runs: 0, created: new Date().toISOString() };
    const agents = DB.get("agents") || [];
    agents.push(agent);
    DB.set("agents", agents);
    onCreated(agent);
    setSaving(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div style={{ width: 560, maxHeight: "88vh", overflow: "auto", padding: 28, background: T.sf, borderRadius: 16, border: `1px solid ${T.bd}` }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ color: T.tx, margin: 0, fontSize: 20, fontWeight: 700 }}>New Agent</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.td, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Inp label="Name" placeholder="My Agent" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TxA label="Goal" placeholder="What should this agent accomplish?" rows={3} value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} />
          <TxA label="Instructions (optional)" placeholder="Specific steps..." rows={3} value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} />
          <div>
            <label style={{ color: T.tm, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: .8, fontFamily: MN, marginBottom: 6, display: "block" }}>Tools</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {all.map(t => (
                <button key={t} onClick={() => tog(t)} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontFamily: MN, border: `1px solid ${form.tools.includes(t) ? T.ac : T.bd}`, background: form.tools.includes(t) ? T.acd : "transparent", color: form.tools.includes(t) ? T.ac : T.td, cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <Btn v="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={save} disabled={saving || !form.name.trim() || !form.goal.trim()} style={{ flex: 2 }}>{saving ? "Creating..." : "Create Agent"}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Agent Detail View ──────────────────────────────────────
function AgentView({ agent, onBack, onUpdate }) {
  const [running, setRunning] = useState(false);
  const [inputText, setInputText] = useState("");
  const [live, setLive] = useState([]);
  const [execs, setExecs] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [memory, setMemory] = useState({});

  useEffect(() => {
    setExecs(DB.get(`execs_${agent.id}`) || []);
    setMemory(DB.get(`mem_${agent.id}`) || {});
  }, [agent.id]);

  const run = async () => {
    setRunning(true); setLive([]);
    const inp = inputText.trim() ? { user_input: inputText.trim() } : null;
    try {
      const result = await runAgent(agent, inp, s => setLive(p => [...p, s]));
      const exec = { id: uid(), timestamp: new Date().toISOString(), status: result.status, output: result.output, steps: result.steps, tokens: result.tokens, duration: result.duration, input: inp };
      const list = DB.get(`execs_${agent.id}`) || [];
      list.unshift(exec);
      if (list.length > 50) list.length = 50;
      DB.set(`execs_${agent.id}`, list);
      setExecs(list);
      const agents = DB.get("agents") || [];
      const idx = agents.findIndex(a => a.id === agent.id);
      if (idx >= 0) { agents[idx].runs = (agents[idx].runs || 0) + 1; agents[idx].status = result.status === "success" ? "idle" : "error"; agents[idx].lastRun = new Date().toISOString(); DB.set("agents", agents); onUpdate(agents[idx]); }
      setMemory(DB.get(`mem_${agent.id}`) || {});
    } catch (err) { setLive(p => [...p, { type: "error", message: err.message }]); }
    setRunning(false);
  };

  const del = () => { const agents = (DB.get("agents") || []).filter(a => a.id !== agent.id); DB.set("agents", agents); DB.del(`execs_${agent.id}`); DB.del(`mem_${agent.id}`); onBack(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: T.tm, cursor: "pointer", fontSize: 18 }}>←</button>
        <h2 style={{ color: T.tx, margin: 0, fontSize: 20, fontWeight: 700, flex: 1 }}>{agent.name}</h2>
        <Badge status={running ? "running" : agent.status} />
        <Btn v="danger" onClick={del} style={{ fontSize: 12, padding: "6px 12px" }}>Delete</Btn>
      </div>

      <Card>
        <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Goal</div>
        <div style={{ color: T.tx, fontSize: 14, lineHeight: 1.6 }}>{agent.goal}</div>
        {agent.instructions && <>
          <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1, marginTop: 12, marginBottom: 6 }}>Instructions</div>
          <div style={{ color: T.tm, fontSize: 13, lineHeight: 1.5 }}>{agent.instructions}</div>
        </>}
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {agent.tools?.map(t => <span key={t} style={{ padding: "3px 8px", background: T.acd, border: `1px solid ${T.ac}33`, borderRadius: 4, color: T.ac, fontSize: 11, fontFamily: MN }}>{t}</span>)}
        </div>
      </Card>

      <Card style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Inp label="Input (optional)" placeholder="Add context for this run..." value={inputText} onChange={e => setInputText(e.target.value)} />
        <Btn v="success" onClick={run} disabled={running} style={{ alignSelf: "flex-start" }}>{running ? "⏳ Running..." : "▶ Run Agent"}</Btn>
      </Card>

      {live.length > 0 && (
        <Card>
          <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{running ? "● Live" : "✓ Done"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 400, overflow: "auto" }}>
            {live.map((s, i) => (
              <div key={i} style={{ padding: "8px 12px", borderRadius: 6, fontSize: 12, fontFamily: MN, background: s.type === "error" ? T.rdd : T.bg, border: `1px solid ${s.type === "error" ? "#55222244" : T.bd}` }}>
                {s.type === "thinking" && <span style={{ color: T.ac }}>🧠 Step {s.step} — Thinking...</span>}
                {s.type === "tool" && <span style={{ color: T.am }}>🔧 Step {s.step} — {s.name}({JSON.stringify(s.input).slice(0, 80)})</span>}
                {s.type === "done" && <><span style={{ color: T.gn }}>✓ Done</span><div style={{ color: T.tx, marginTop: 6, whiteSpace: "pre-wrap", fontSize: 13, fontFamily: FN, lineHeight: 1.6 }}>{s.output}</div></>}
                {s.type === "error" && <span style={{ color: T.rd }}>✕ {s.message}</span>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {Object.keys(memory).length > 0 && (
        <Card>
          <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Memory ({Object.keys(memory).length})</div>
          {Object.entries(memory).map(([k, v]) => (
            <div key={k} style={{ padding: "6px 10px", background: T.bg, borderRadius: 4, fontSize: 12, fontFamily: MN, marginBottom: 3 }}>
              <span style={{ color: T.ac }}>{k}</span><span style={{ color: T.td }}> = </span><span style={{ color: T.tm }}>{String(v).slice(0, 120)}</span>
            </div>
          ))}
        </Card>
      )}

      {execs.length > 0 && (
        <Card>
          <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>History ({execs.length})</div>
          {execs.slice(0, 15).map(ex => (
            <div key={ex.id} onClick={() => setExpanded(expanded === ex.id ? null : ex.id)} style={{ padding: "10px 12px", background: T.bg, borderRadius: 8, border: `1px solid ${T.bd}`, cursor: "pointer", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
                <Badge status={ex.status} sm />
                <span style={{ color: T.tm, fontFamily: MN, flex: 1 }}>{ex.tokens} tok · {ex.duration}s · {ex.steps?.length || 0} steps</span>
                <span style={{ color: T.td, fontSize: 11, fontFamily: MN }}>{new Date(ex.timestamp).toLocaleString()}</span>
              </div>
              {expanded === ex.id && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.bd}` }}>
                  {ex.output && <div style={{ color: T.tx, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 10 }}>{ex.output}</div>}
                  {ex.steps?.map((st, si) => (
                    <div key={si} style={{ padding: "6px 10px", background: T.sf, borderRadius: 4, marginBottom: 3, fontSize: 11, fontFamily: MN }}>
                      <span style={{ color: T.ac }}>Step {st.step}</span> → <span style={{ color: T.am }}>{st.action}</span>
                      {st.result && <div style={{ color: T.td, marginTop: 2, whiteSpace: "pre-wrap" }}>{String(st.result).slice(0, 200)}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────
export default function App() {
  const [agents, setAgents] = useState([]);
  const [view, setView] = useState("home");
  const [sel, setSel] = useState(null);
  const [tmpl, setTmpl] = useState(null);

  useEffect(() => { setAgents(DB.get("agents") || []); }, []);

  const openAgent = a => { setSel(a); setView("agent"); };
  const openCreate = t => { setTmpl(t || null); setView("create"); };
  const goHome = () => { setAgents(DB.get("agents") || []); setView("home"); setSel(null); };
  const onCreated = a => { setAgents(p => [...p, a]); setSel(a); setView("agent"); };
  const onUpdate = u => { setAgents(p => p.map(a => a.id === u.id ? u : a)); setSel(u); };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: FN, color: T.tx }}>
      <style>{`*{box-sizing:border-box;margin:0}button:hover{filter:brightness(1.1)}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:${T.bd};border-radius:3px}`}</style>

      <div style={{ borderBottom: `1px solid ${T.bd}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, background: T.sf }}>
        <div onClick={goHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: -.5 }}>AgentForge</span>
        </div>
        <span style={{ fontSize: 11, color: T.td, fontFamily: MN, padding: "2px 8px", background: T.bg, borderRadius: 4 }}>v1.0</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: T.td, fontSize: 12, fontFamily: MN }}>{agents.length} agent{agents.length !== 1 ? "s" : ""}</span>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px" }}>
        {view === "agent" && sel && <AgentView agent={sel} onBack={goHome} onUpdate={onUpdate} />}

        {view === "home" && <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
            {[
              { l: "Agents", v: agents.length, c: T.ac },
              { l: "Active", v: agents.filter(a => a.status === "idle").length, c: T.gn },
              { l: "Total Runs", v: agents.reduce((s, a) => s + (a.runs || 0), 0), c: T.am },
            ].map(s => (
              <Card key={s.l} style={{ padding: 14 }}>
                <div style={{ color: T.td, fontSize: 10, fontFamily: MN, textTransform: "uppercase", letterSpacing: 1 }}>{s.l}</div>
                <div style={{ color: s.c, fontSize: 26, fontWeight: 800, marginTop: 2 }}>{s.v}</div>
              </Card>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ color: T.tx, fontSize: 16, fontWeight: 700 }}>Your Agents</h3>
            <Btn onClick={() => openCreate()}>+ New Agent</Btn>
          </div>

          {agents.length === 0 ? (
            <Card style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div>
              <div style={{ color: T.tm, fontSize: 14, marginBottom: 20 }}>No agents yet. Pick a template below or create from scratch.</div>
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {agents.map(a => (
                <Card key={a.id} hv onClick={() => openAgent(a)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${T.acd}, #2a1a4a)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {TEMPLATES.find(t => t.name === a.name)?.icon || "🤖"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: T.tx, fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                    <div style={{ color: T.td, fontSize: 12, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.goal}</div>
                  </div>
                  <span style={{ color: T.td, fontSize: 11, fontFamily: MN }}>{a.runs || 0} runs</span>
                  <Badge status={a.status || "idle"} sm />
                </Card>
              ))}
            </div>
          )}

          <h3 style={{ color: T.tx, fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Templates</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
            {TEMPLATES.map(t => (
              <Card key={t.name} hv onClick={() => openCreate(t)} style={{ cursor: "pointer", padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{t.icon}</span>
                  <span style={{ color: T.tx, fontSize: 14, fontWeight: 700 }}>{t.name}</span>
                </div>
                <div style={{ color: T.td, fontSize: 12, lineHeight: 1.5 }}>{t.goal.slice(0, 90)}...</div>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {t.tools.slice(0, 3).map(tool => <span key={tool} style={{ padding: "2px 6px", background: T.bg, borderRadius: 3, fontSize: 10, color: T.td, fontFamily: MN }}>{tool}</span>)}
                  {t.tools.length > 3 && <span style={{ fontSize: 10, color: T.td, fontFamily: MN }}>+{t.tools.length - 3}</span>}
                </div>
              </Card>
            ))}
          </div>
        </>}
      </div>

      {view === "create" && <CreateModal onClose={goHome} onCreated={onCreated} template={tmpl} />}
    </div>
  );
}
