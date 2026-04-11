'use client';
import { useState } from 'react';
export default function ExportPage() {
  const [exporting, setExporting] = useState(false);
  const configs = [
    { name: 'All Agents', desc: '3 agent configurations with tools, models, and system prompts', size: '4.2 KB', items: 3 },
    { name: 'All Flows', desc: '2 workflow pipelines with trigger configs and agent steps', size: '2.8 KB', items: 2 },
    { name: 'Environment Variables', desc: '5 env vars (values will be masked)', size: '0.5 KB', items: 5 },
    { name: 'Webhook Endpoints', desc: '2 webhook configs with event subscriptions', size: '0.3 KB', items: 2 },
    { name: 'LLM Connections', desc: '5 provider configs (API keys will be excluded)', size: '0.8 KB', items: 5 },
  ];
  const handleExport = () => { setExporting(true); setTimeout(() => { setExporting(false); alert('Configuration exported as nexus-config.json'); }, 1500); };
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Export & Import</h1><p className="text-sm text-gray-500">Backup, share, or migrate your platform configuration</p></div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Export</h3>
          <p className="text-xs text-gray-500 mb-4">Download all agent configs, flows, and settings as JSON</p>
          <button onClick={handleExport} disabled={exporting} className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">
            {exporting ? 'Exporting...' : 'Export Configuration'}
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Import</h3>
          <p className="text-xs text-gray-500 mb-4">Upload a previously exported JSON configuration file</p>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-indigo-300 transition-colors cursor-pointer">
            <div className="text-gray-400 text-sm">Drop JSON file here or click to browse</div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Exportable Resources</h3></div>
        {configs.map((c, i) => (
          <div key={i} className={'px-5 py-3.5 flex items-center justify-between' + (i < configs.length - 1 ? ' border-b border-gray-100' : '')}>
            <div><div className="text-sm font-medium text-gray-900">{c.name}</div><div className="text-[11px] text-gray-400 mt-0.5">{c.desc}</div></div>
            <div className="flex items-center gap-4 text-xs text-gray-400"><span>{c.items} items</span><span>{c.size}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}