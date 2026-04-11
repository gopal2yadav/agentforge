'use client';
import { useState } from 'react';
export default function BrandingPage() {
  const [name, setName] = useState('Nexus');
  const [primary, setPrimary] = useState('#4f46e5');
  const [logo, setLogo] = useState('N');
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Branding</h1><p className="text-sm text-gray-500">Customize the look and feel of your platform</p></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">General</h3>
            <div className="mb-4"><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Platform Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500" /></div>
            <div className="mb-4"><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Primary Color</label>
              <div className="flex items-center gap-3"><input type="color" value={primary} onChange={e => setPrimary(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                <input type="text" value={primary} onChange={e => setPrimary(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-gray-700 w-28" /></div></div>
            <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Logo Icon Letter</label>
              <input type="text" value={logo} onChange={e => setLogo(e.target.value.charAt(0))} maxLength={1} className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 w-20 text-center font-bold focus:outline-none focus:border-indigo-500" /></div>
          </div>
          <button className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Save Branding</button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: primary}}>{logo}</div>
              <span className="text-sm font-bold text-gray-900">{name}</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 rounded-full w-3/4" style={{backgroundColor: primary, opacity: 0.2}} />
              <div className="h-2 rounded-full bg-gray-200 w-full" />
              <div className="h-2 rounded-full bg-gray-200 w-1/2" />
            </div>
            <button className="mt-4 px-4 py-2 rounded-lg text-white text-xs font-semibold" style={{backgroundColor: primary}}>Primary Button</button>
          </div>
          <div className="mt-4 text-[11px] text-gray-400">This preview shows how your branding will appear across the platform.</div>
        </div>
      </div>
    </div>
  );
}