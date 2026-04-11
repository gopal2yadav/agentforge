'use client';
export default function AdminRevenuePage() {
  const invoices = [
    { customer: 'Michelle Bordelon', email: 'Michelle.Bordelon@la.gov', amount: 219, status: 'open', date: 'Apr 9, 2026', id: 'in_1TKf3k' },
    { customer: 'Sandra Ajugba', email: 'sandra.ajugba@bsci.com', amount: 179, status: 'open', date: 'Apr 7, 2026', id: 'in_1TKIdc' },
    { customer: 'Andres Duran', email: 'aduran@dimmitregional.com', amount: 169, status: 'paid', date: 'Apr 8, 2026', id: 'in_1TK1kK' },
    { customer: 'Margaret Curtis', email: 'mcurtis@concordhealthsystems.com', amount: 199, status: 'open', date: 'Apr 8, 2026', id: 'in_1TK1OJ' },
    { customer: 'Alex Morales', email: 'alexm@gmail.com', amount: 299, status: 'open', date: 'Apr 7, 2026', id: 'in_1TJwsj' },
    { customer: 'Katryn Farris', email: 'kfarris@ivycreekhealth.com', amount: 169, status: 'paid', date: 'Apr 6, 2026', id: 'in_1TJcnm' },
    { customer: 'SuJuan Johnson', email: 's.johnson@medflight.com', amount: 348, status: 'open', date: 'Apr 6, 2026', id: 'in_1TJcgV' },
    { customer: 'Tammy Boone', email: 'TammyB@appletonhousing.org', amount: 300, status: 'paid', date: 'Apr 5, 2026', id: 'in_1TJZNI' },
    { customer: 'Kasey Grimes', email: 'kgrimes@medcare-al.com', amount: 199, status: 'open', date: 'Apr 5, 2026', id: 'in_1TJWx6' },
  ];
  const paid = invoices.filter(i => i.status === 'paid');
  const open = invoices.filter(i => i.status === 'open');
  const totalPaid = paid.reduce((a, i) => a + i.amount, 0);
  const totalOpen = open.reduce((a, i) => a + i.amount, 0);
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center gap-2 mb-1"><span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-50 text-red-600">Admin</span><h1 className="text-2xl font-bold tracking-tight text-gray-900">Revenue & Invoices</h1></div>
      <p className="text-sm text-gray-500 mb-6">Track payments, invoices, and revenue across all customers</p>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-emerald-600 rounded-xl p-5 text-white shadow-lg"><div className="text-xs uppercase tracking-wider opacity-70">Collected</div><div className="text-2xl font-bold mt-1">{'$'}{totalPaid.toLocaleString()}</div><div className="text-xs opacity-70 mt-0.5">{paid.length} invoices</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Pending</div><div className="text-2xl font-bold text-amber-600 mt-1">{'$'}{totalOpen.toLocaleString()}</div><div className="text-[10px] text-gray-400 mt-0.5">{open.length} open invoices</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Revenue</div><div className="text-2xl font-bold text-gray-900 mt-1">{'$'}{(totalPaid + totalOpen).toLocaleString()}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Invoice</div><div className="text-2xl font-bold text-gray-900 mt-1">{'$'}{Math.round((totalPaid + totalOpen) / invoices.length)}</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"><h3 className="text-sm font-semibold text-gray-900">All Invoices</h3><a href="https://dashboard.stripe.com/acct_1R6PIVP1z8cb9V1y/invoices" target="_blank" className="text-xs text-indigo-600">Stripe Invoices</a></div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Customer</th>
            <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-400 uppercase">Email</th>
            <th className="px-4 py-2 text-right text-[10px] font-semibold text-gray-400 uppercase">Amount</th>
            <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-400 uppercase">Status</th>
            <th className="px-4 py-2 text-right text-[10px] font-semibold text-gray-400 uppercase">Date</th>
            <th className="px-4 py-2 text-right text-[10px] font-semibold text-gray-400 uppercase">Invoice ID</th>
          </tr></thead>
          <tbody>{invoices.map(inv => (
            <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{inv.customer}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{inv.email}</td>
              <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900">{'$'}{inv.amount}</td>
              <td className="px-4 py-3 text-center"><span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + (inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>{inv.status}</span></td>
              <td className="px-4 py-3 text-right text-xs text-gray-500">{inv.date}</td>
              <td className="px-4 py-3 text-right text-[9px] font-mono text-gray-400">{inv.id}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}