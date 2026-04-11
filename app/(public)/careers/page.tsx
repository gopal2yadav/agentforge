export default function CareersPage() {
  const openings = [
    { title: 'Senior Full-Stack Engineer', team: 'Engineering', location: 'Remote (India)', type: 'Full-time', desc: 'Build and scale our Next.js platform with TypeScript, Prisma, and serverless infrastructure.' },
    { title: 'ML/AI Engineer', team: 'AI', location: 'Remote', type: 'Full-time', desc: 'Design and implement multi-agent orchestration algorithms, RAG pipelines, and tool-use systems.' },
    { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time', desc: 'Create beautiful, intuitive interfaces for complex AI workflows. Figma expertise required.' },
    { title: 'Developer Relations', team: 'Growth', location: 'Remote', type: 'Full-time', desc: 'Build our developer community through content, demos, and open-source contributions.' },
  ];
  return (
    <div className="max-w-[800px] mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">Join Nexus</h1>
        <p className="text-base text-gray-500 max-w-md mx-auto">Help us build the future of AI agent orchestration. We are a small, ambitious team working on hard problems.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm"><div className="text-2xl font-bold text-indigo-600">100%</div><div className="text-xs text-gray-400 mt-1">Remote</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm"><div className="text-2xl font-bold text-indigo-600">Equity</div><div className="text-xs text-gray-400 mt-1">For all employees</div></div>
      </div>
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Open Positions</h2>
      <div className="space-y-3">
        {openings.map(job => (
          <a key={job.title} href="mailto:gopal@aabhyasa.com" className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all block group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[15px] font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{job.type}</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{job.team}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">{job.desc}</p>
            <div className="text-[10px] text-gray-400">{job.location}</div>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Don't see a fit? Send us your resume at <a href="mailto:gopal@aabhyasa.com" className="text-indigo-600 hover:text-indigo-800 font-medium">gopal@aabhyasa.com</a></p>
      </div>
    </div>
  );
}