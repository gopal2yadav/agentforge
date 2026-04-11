'use client';
import { useState } from 'react';
export default function ProfilePage() {
  const [name, setName] = useState('Gopal Yadav');
  const [email] = useState('gopal@aabhyasa.com');
  const [role] = useState('Owner');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSlack, setNotifSlack] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="max-w-[700px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Profile</h1><p className="text-sm text-gray-500">Manage your account information and preferences</p></div>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">G</div>
            <div><div className="text-base font-semibold text-gray-900">{name}</div><div className="text-xs text-gray-400">{email}</div><div className="mt-1"><span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-600 uppercase">{role}</span></div></div>
          </div>
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500" /></div>
            <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
              <input type="email" value={email} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed" /></div>
            <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Timezone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900">
                <option>Asia/Kolkata (IST)</option><option>America/New_York (EST)</option><option>America/Los_Angeles (PST)</option><option>Europe/London (GMT)</option><option>UTC</option>
              </select></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div><div className="text-sm font-medium text-gray-900">Email Notifications</div><div className="text-xs text-gray-400 mt-0.5">Receive agent completion alerts, error reports, and billing updates</div></div>
              <button onClick={() => setNotifEmail(!notifEmail)} className={'relative w-11 h-6 rounded-full transition-colors ' + (notifEmail ? 'bg-indigo-600' : 'bg-gray-200')}>
                <span className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ' + (notifEmail ? 'translate-x-5' : 'translate-x-0.5')} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div><div className="text-sm font-medium text-gray-900">Slack Notifications</div><div className="text-xs text-gray-400 mt-0.5">Forward alerts to your connected Slack workspace</div></div>
              <button onClick={() => setNotifSlack(!notifSlack)} className={'relative w-11 h-6 rounded-full transition-colors ' + (notifSlack ? 'bg-indigo-600' : 'bg-gray-200')}>
                <span className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ' + (notifSlack ? 'translate-x-5' : 'translate-x-0.5')} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">{saved ? 'Saved!' : 'Save Changes'}</button>
          {saved && <span className="text-xs text-emerald-600">Profile updated successfully</span>}
        </div>
      </div>
    </div>
  );
}