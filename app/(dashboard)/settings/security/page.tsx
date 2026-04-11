'use client';
import { useState } from 'react';
export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('24h');
  const sessions = [
    { id: '1', device: 'Chrome on macOS', ip: '49.36.xx.xx', location: 'Prayagraj, IN', lastActive: 'Now', current: true },
    { id: '2', device: 'Mobile Safari on iOS', ip: '49.36.xx.xx', location: 'Prayagraj, IN', lastActive: '2 hours ago', current: false },
  ];
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Security</h1><p className="text-sm text-gray-500">Manage authentication, sessions, and access controls</p></div>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div><div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div><div className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</div></div>
              <button onClick={() => setTwoFactor(!twoFactor)} className={'relative w-11 h-6 rounded-full transition-colors ' + (twoFactor ? 'bg-indigo-600' : 'bg-gray-200')}>
                <span className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ' + (twoFactor ? 'translate-x-5' : 'translate-x-0.5')} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div><div className="text-sm font-medium text-gray-900">SSO / SAML</div><div className="text-xs text-gray-400 mt-0.5">Enterprise single sign-on via Google, Okta, or Azure AD</div></div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">Configured</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div><div className="text-sm font-medium text-gray-900">IP Allowlist</div><div className="text-xs text-gray-400 mt-0.5">Restrict API access to specific IP addresses</div></div>
              <button onClick={() => setIpWhitelist(!ipWhitelist)} className={'relative w-11 h-6 rounded-full transition-colors ' + (ipWhitelist ? 'bg-indigo-600' : 'bg-gray-200')}>
                <span className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ' + (ipWhitelist ? 'translate-x-5' : 'translate-x-0.5')} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div><div className="text-sm font-medium text-gray-900">Session Timeout</div><div className="text-xs text-gray-400 mt-0.5">Automatically log out after inactivity</div></div>
              <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700">
                <option value="1h">1 hour</option><option value="8h">8 hours</option><option value="24h">24 hours</option><option value="7d">7 days</option><option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={'w-2 h-2 rounded-full ' + (s.current ? 'bg-emerald-500' : 'bg-gray-300')} />
                  <div><div className="text-sm font-medium text-gray-900">{s.device}{s.current && <span className="ml-2 text-[10px] text-emerald-600 font-semibold">Current</span>}</div><div className="text-xs text-gray-400">{s.ip} &bull; {s.location} &bull; {s.lastActive}</div></div>
                </div>
                {!s.current && <button className="text-xs text-red-500 hover:text-red-700">Revoke</button>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Compliance</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100"><div className="text-lg font-bold text-emerald-600">SOC 2</div><div className="text-[10px] text-gray-400 mt-1">Type II Compliant</div></div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100"><div className="text-lg font-bold text-emerald-600">GDPR</div><div className="text-[10px] text-gray-400 mt-1">EU Data Protection</div></div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100"><div className="text-lg font-bold text-emerald-600">HIPAA</div><div className="text-[10px] text-gray-400 mt-1">Healthcare Ready</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}