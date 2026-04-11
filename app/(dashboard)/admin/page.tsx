'use client';
import Link from 'next/link';
export default function AdminPage() {
  const stats = [
    { label: 'Total Customers', value: '20', change: '+3 this week', color: 'text-gray-900' },
    { label: 'Paid Invoices', value: '3', change: '$63,700 collected', color: 'text-emerald-600' },
    { label: 'Open Invoices', value: '6', change: '$144,300 pending', color: 'text-amber-600' },
    { label: 'MRR', value: '$5,308', change: '+12% vs last month', color: 'text-indigo-600' },
  ];
  const recentCustomers = [
    { name: 'Kristin Gibson', email: 'kristin.gibson@labcorp.com', company: 'LabCorp', status: 'active', joined: 'Apr 10, 2026' },
    { name: 'Michelle Bordelon', email: 'Michelle.Bordelon@la.gov', company: 'State of Louisiana', status: 'invoice_pending', joined: 'Apr 9, 2026' },
    { name: 'Kristin Buschjost', email: 'kristinbuschjost@cmfcaa.com', company: 'CMFCAA', status: 'active', joined: 'Apr 8, 2026' },
    { name: 'Mariann Horgan', email: 'mhorgan@indecon.com', company: 'Indecon', status: 'active', joined: 'Apr 7, 2026' },
    { name: 'Sandra Ajugba', email: 'sandra.ajugba@bsci.com', company: 'Boston Scientific', status: 'invoice_pending', joined: 'Apr 7, 2026' },
  ];
  const recentPayments = [
    { customer: 'Andres Duran', email: 'aduran@dimmitregional.com', amount: 169, status: 'paid', date: 'Apr 8, 2026' },
    { customer: 'Katryn Farris', email: 'kfarris@ivycreekhealth.com', amount: 169, status: 'paid', date: 'Apr 6, 2026' },
    { customer: 'Tammy Boone', email: 'TammyB@appletonhousing.org', amount: 300, status: 'paid', date: 'Apr 5, 2026' },
  ];
  const statusStyle = (s) => s === 'active' ? 'bg-emerald-50 text-emerald-600' : s === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600';
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-50 text-red-600">Admin</span><h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1></div>
          <p className="text-sm text-gray-500">Customer management, revenue, and platform administration</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/customers" className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900">All Customers</Link>
          <Link href="/admin/revenue" className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900">Revenue</Link>
          <a href="https://dashboard.stripe.com/acct_1R6PIVP1z8cb9V1y" target="_blank" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Stripe Dashboard</a>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider">{s.label}</div>
            <div className={'text-xl font-bold mt-1 ' + s.color}>{s.value}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.change}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"><h3 className="text-sm font-semibold text-gray-900">Recent Customers</h3><Link href="/admin/customers" className="text-xs text-indigo-600">View all</Link></div>
          {recentCustomers.map((c, i) => (
            <div key={i} className={'px-5 py-3 flex items-center justify-between' + (i < recentCustomers.length - 1 ? ' border-b border-gray-100' : '')}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{c.name.charAt(0)}</div>
                <div><div className="text-sm font-medium text-gray-900">{c.name}</div><div className="text-[10px] text-gray-400">{c.email}</div></div>
              </div>
              <div className="text-right"><span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + statusStyle(c.status)}>{c.status.replace('_', ' ')}</span><div className="text-[10px] text-gray-400 mt-0.5">{c.joined}</div></div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"><h3 className="text-sm font-semibold text-gray-900">Recent Payments</h3><Link href="/admin/revenue" className="text-xs text-indigo-600">View all</Link></div>
          {recentPayments.map((p, i) => (
            <div key={i} className={'px-5 py-3 flex items-center justify-between' + (i < recentPayments.length - 1 ? ' border-b border-gray-100' : '')}>
              <div><div className="text-sm font-medium text-gray-900">{p.customer}</div><div className="text-[10px] text-gray-400">{p.email}</div></div>
              <div className="text-right"><div className="text-sm font-bold text-emerald-600">{'$'}{p.amount.toFixed(2)}</div><div className="text-[10px] text-gray-400">{p.date}</div></div>
            </div>
          ))}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <div className="flex justify-between text-xs"><span className="text-gray-400">Total collected</span><span className="font-bold text-gray-900">{'$'}637.00</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}