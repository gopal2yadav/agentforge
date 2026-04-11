'use client';
import { useState } from 'react';
const CUSTOMERS = [
  { id: 'cus_UJJTkBRH', name: 'Kristin Gibson', email: 'kristin.gibson@labcorp.com', company: 'LabCorp', city: 'Cary, NC', plan: 'Pro', status: 'active', invoices: 1, totalPaid: 219 },
  { id: 'cus_UJHcg1cJ', name: 'Michelle Bordelon', email: 'Michelle.Bordelon@la.gov', company: 'State of Louisiana', city: 'Baton Rouge, LA', plan: 'Pro', status: 'pending', invoices: 1, totalPaid: 0 },
  { id: 'cus_UJ00d99s', name: 'Kristin Buschjost', email: 'kristinbuschjost@cmfcaa.com', company: 'CMFCAA', city: 'Jefferson City, MO', plan: 'Pro', status: 'active', invoices: 1, totalPaid: 169 },
  { id: 'cus_UIvpWX6W', name: 'Mariann Horgan', email: 'mhorgan@indecon.com', company: 'Indecon', city: 'Cambridge, MA', plan: 'Enterprise', status: 'active', invoices: 1, totalPaid: 299 },
  { id: 'cus_UIuS0tiS', name: 'Sandra Ajugba', email: 'sandra.ajugba@bsci.com', company: 'Boston Scientific', city: 'Boston, MA', plan: 'Pro', status: 'pending', invoices: 1, totalPaid: 0 },
  { id: 'cus_UIdgUZXA', name: 'Stephanie Moore', email: 'smoore@chsamerica.com', company: 'CHS America', city: 'Sarasota, FL', plan: 'Pro', status: 'active', invoices: 1, totalPaid: 169 },
  { id: 'cus_UId06v3J', name: 'Andres Duran', email: 'aduran@dimmitregional.com', company: 'Dimmit Regional', city: 'Carrizo Springs, TX', plan: 'Pro', status: 'paid', invoices: 1, totalPaid: 169 },
  { id: 'cus_UIcdMnTd', name: 'Margaret Curtis', email: 'mcurtis@concordhealthsystems.com', company: 'Concord Health', city: 'Bowling Green, KY', plan: 'Pro', status: 'pending', invoices: 1, totalPaid: 0 },
  { id: 'cus_UIDE16Op', name: 'Katryn Farris', email: 'kfarris@ivycreekhealth.com', company: 'Ivy Creek Health', city: 'Montgomery, AL', plan: 'Pro', status: 'paid', invoices: 1, totalPaid: 169 },
  { id: 'cus_UID6sQ2L', name: 'SuJuan Johnson', email: 's.johnson@medflight.com', company: 'MedFlight', city: 'Columbus, OH', plan: 'Enterprise', status: 'pending', invoices: 1, totalPaid: 0 },
  { id: 'cus_UI8NhTf1', name: 'Tammy Boone', email: 'TammyB@appletonhousing.org', company: 'Appleton Housing', city: 'Appleton, WI', plan: 'Enterprise', status: 'paid', invoices: 2, totalPaid: 300 },
  { id: 'cus_UI7BXumJ', name: 'Kasey Grimes', email: 'kgrimes@medcare-al.com', company: 'MedCare AL', city: 'Birmingham, AL', plan: 'Pro', status: 'pending', invoices: 1, totalPaid: 0 },
  { id: 'cus_UI79OXg1', name: 'Noreen Karim', email: 'nkarim@idtdna.com', company: 'IDT DNA', city: 'Coralville, IA', plan: 'Pro', status: 'active', invoices: 1, totalPaid: 179 },
];
export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filtered = CUSTOMERS.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase()) && !c.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const totalRevenue = CUSTOMERS.reduce((a, c) => a + c.totalPaid, 0);
  const statusStyle = (s) => s === 'paid' ? 'bg-emerald-50 text-emerald-600' : s === 'active' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600';
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 mb-1"><span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-50 text-red-600">Admin</span><h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Management</h1></div>
      <p className="text-sm text-gray-500 mb-6">{CUSTOMERS.length} customers &bull; {'$'}{totalRevenue.toLocaleString()} total revenue</p>
      <div className="flex items-center gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or company..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
          <option value="all">All Status</option><option value="paid">Paid</option><option value="active">Active</option><option value="pending">Pending</option>
        </select>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase">Customer</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase">Company</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase">Location</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase">Plan</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase">Paid</th>
            <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-400 uppercase">Status</th>
            <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-400 uppercase">ID</th>
          </tr></thead>
          <tbody>{filtered.map(c => (
            <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3"><div className="font-medium text-gray-900">{c.name}</div><div className="text-[10px] text-gray-400">{c.email}</div></td>
              <td className="px-4 py-3 text-gray-600 text-xs">{c.company}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{c.city}</td>
              <td className="px-4 py-3"><span className={'px-2 py-0.5 rounded text-[9px] font-semibold ' + (c.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-600')}>{c.plan}</span></td>
              <td className="px-4 py-3 text-right font-mono text-gray-900">{c.totalPaid > 0 ? '$' + c.totalPaid : '—'}</td>
              <td className="px-4 py-3 text-center"><span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + statusStyle(c.status)}>{c.status}</span></td>
              <td className="px-4 py-3 text-center text-[9px] font-mono text-gray-400">{c.id}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}