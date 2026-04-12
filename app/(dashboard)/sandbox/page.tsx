'use client';
import { useState } from 'react';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', template: '// JavaScript executes LIVE in your browser\nconst fibonacci = (n) => {\n  const seq = [0, 1];\n  for (let i = 2; i < n; i++) seq.push(seq[i-1] + seq[i-2]);\n  return seq;\n};\n\nconsole.log("Fibonacci(10):", fibonacci(10));\nconsole.log("Sum:", fibonacci(10).reduce((a, b) => a + b, 0));' },
  { id: 'python', name: 'Python (AI-powered)', template: '# Python runs via Claude AI — real code analysis\nimport statistics\n\ndata = [23, 45, 12, 67, 34, 89, 56, 78, 90, 11]\n\nprint(f"Data: {data}")\nprint(f"Mean: {statistics.mean(data):.2f}")\nprint(f"Median: {statistics.median(data):.2f}")\nprint(f"Std Dev: {statistics.stdev(data):.2f}")\nprint(f"Min: {min(data)}, Max: {max(data)}")' },
];

export default function SandboxPage() {
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  const switchLang = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    setLanguage(langId);
    setCode(lang?.template || '');
    setOutput('');
    setExecTime(null);
  };

  const runCode = async () => {
    setRunning(true); setOutput(''); setExecTime(null);
    const start = performance.now();

    if (language === 'javascript') {
      // REAL JavaScript execution in browser
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[ERROR] ' + args.map(a => String(a)).join(' ')),
        warn: (...args: any[]) => logs.push('[WARN] ' + args.map(a => String(a)).join(' ')),
        table: (data: any) => logs.push(JSON.stringify(data, null, 2)),
      };
      try {
        const fn = new Function('console', 'Math', 'Date', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Map', 'Set', 'Promise', 'setTimeout', code);
        const result = fn(mockConsole, Math, Date, JSON, Array, Object, String, Number, Boolean, RegExp, Map, Set, Promise, (fn: any, ms: number) => { fn(); });
        if (result !== undefined && logs.length === 0) logs.push(String(result));
        setOutput(logs.join('\n') || '(code executed — no output)');
      } catch (e: any) {
        setOutput('[Runtime Error]\n' + e.name + ': ' + e.message);
      }
      setExecTime(Math.round(performance.now() - start));
    } else {
      // Python: Use real Anthropic AI to execute and return output
      try {
        const res = await fetch('/api/playground', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Execute this Python code. Return ONLY the exact console output as if running in a Python interpreter. No explanations, no markdown, just the raw output. If there is an error, show the traceback exactly as Python would.\n\nCode:\n' + code }],
            model: 'claude-sonnet-4',
            agent: null
          })
        });
        const data = await res.json();
        setOutput(data.reply || data.error || 'No output');
        setExecTime(Math.round(performance.now() - start));
      } catch (e: any) {
        setOutput('[Error] ' + e.message);
      }
    }
    setRunning(false);
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Write ' + language + ' code for this task. Return ONLY the code — no explanations, no markdown code fences, no backticks, just pure executable code. Task: ' + aiPrompt }],
          model: 'claude-sonnet-4',
          agent: null
        })
      });
      const data = await res.json();
      if (data.reply) {
        let cleaned = data.reply.replace(/^```[a-z]*\n?/gm, '').replace(/```$/gm, '').trim();
        setCode(cleaned);
      }
    } catch (e) {}
    setGenerating(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Code Sandbox</h1>
          <p className="text-sm text-gray-500">{language === 'javascript' ? 'Real execution in your browser' : 'AI-powered Python execution via Claude'}</p>
        </div>
        <div className="flex items-center gap-3">
          {LANGUAGES.map(l => (
            <button key={l.id} onClick={() => switchLang(l.id)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ' + (language === l.id ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500')}>{l.name}</button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && generateWithAI()} placeholder="Describe code to generate with AI..." className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
        <button onClick={generateWithAI} disabled={generating || !aiPrompt.trim()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50">{generating ? 'Generating...' : 'AI Generate'}</button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Editor — {language}</span>
            <button onClick={runCode} disabled={running} className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50">{running ? 'Running...' : 'Run Code'}</button>
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)} className="flex-1 bg-gray-900 text-emerald-400 font-mono text-sm p-4 rounded-xl border border-gray-700 resize-none focus:outline-none focus:border-indigo-500 leading-relaxed" spellCheck={false} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Output</span>
              {execTime !== null && <span className="text-[10px] text-gray-400 font-mono">{execTime}ms</span>}
            </div>
            <button onClick={() => { setOutput(''); setExecTime(null); }} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <pre className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 font-mono overflow-auto whitespace-pre-wrap leading-relaxed">{output || 'Click "Run Code" to execute...'}</pre>
        </div>
      </div>
    </div>
  );
}