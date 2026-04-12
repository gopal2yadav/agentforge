'use client';
import { useState } from 'react';

const LANGUAGES = [
  { id: 'python', name: 'Python', ext: '.py', template: '# Write your Python code here\nimport json\n\ndef analyze_data(data):\n    return {\n        "count": len(data),\n        "summary": "Analysis complete"\n    }\n\nresult = analyze_data([1, 2, 3, 4, 5])\nprint(json.dumps(result, indent=2))' },
  { id: 'javascript', name: 'JavaScript', ext: '.js', template: '// Write your JavaScript code here\nconst analyzeData = (data) => {\n  return {\n    count: data.length,\n    average: data.reduce((a, b) => a + b, 0) / data.length,\n    summary: "Analysis complete"\n  };\n};\n\nconst result = analyzeData([10, 20, 30, 40, 50]);\nconsole.log(JSON.stringify(result, null, 2));' },
  { id: 'typescript', name: 'TypeScript', ext: '.ts', template: '// Write your TypeScript code here\ninterface AnalysisResult {\n  count: number;\n  mean: number;\n  label: string;\n}\n\nconst analyze = (data: number[]): AnalysisResult => ({\n  count: data.length,\n  mean: data.reduce((a, b) => a + b, 0) / data.length,\n  label: "Analysis complete"\n});\n\nconsole.log(analyze([5, 10, 15, 20]));' },
];

export default function SandboxPage() {
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const switchLang = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    setLanguage(langId);
    setCode(lang?.template || '');
    setOutput('');
  };

  const runCode = async () => {
    setRunning(true); setOutput('Running...');
    try {
      // Simulate code execution (sandboxed)
      if (language === 'javascript' || language === 'typescript') {
        const logs: string[] = [];
        const mockConsole = { log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')) };
        try {
          const fn = new Function('console', code);
          fn(mockConsole);
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (e: any) { setOutput('Error: ' + e.message); }
      } else {
        // For Python, use AI to simulate execution
        const res = await fetch('/api/playground', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Execute this Python code and show ONLY the output, nothing else. If there are errors, show the error. Code:\n\n' + code, model: 'claude-sonnet-4', agent: null })
        });
        const data = await res.json();
        setOutput(data.reply || 'No output');
      }
    } catch (e: any) { setOutput('Error: ' + e.message); }
    setRunning(false);
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Generate ' + language + ' code for this task. Return ONLY the code, no explanations, no markdown fences. Task: ' + aiPrompt, model: 'claude-sonnet-4', agent: null })
      });
      const data = await res.json();
      if (data.reply) setCode(data.reply);
    } catch (e) {}
    setGenerating(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Code Sandbox</h1>
          <p className="text-sm text-gray-500">Write, run, and test code — powered by AI</p>
        </div>
        <div className="flex items-center gap-3">
          {LANGUAGES.map(l => (
            <button key={l.id} onClick={() => switchLang(l.id)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ' + (language === l.id ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500')}>{l.name}</button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && generateWithAI()} placeholder="Describe code to generate with AI (e.g. 'Sort a list of users by age')..." className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
        <button onClick={generateWithAI} disabled={generating || !aiPrompt.trim()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50">{generating ? 'Generating...' : 'AI Generate'}</button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Editor</span>
            <button onClick={runCode} disabled={running} className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50">{running ? 'Running...' : 'Run Code'}</button>
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)} className="flex-1 bg-gray-900 text-emerald-400 font-mono text-sm p-4 rounded-xl border border-gray-700 resize-none focus:outline-none focus:border-indigo-500" spellCheck={false} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Output</span>
            <button onClick={() => setOutput('')} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <pre className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 font-mono overflow-auto whitespace-pre-wrap">{output || 'Click "Run Code" to see output...'}</pre>
        </div>
      </div>
    </div>
  );
}