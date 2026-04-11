'use client';
import { useState } from 'react';
export default function KnowledgePage() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const docs = [
    { name: 'Company Policies', type: 'PDF', chunks: 312, size: '2.8 MB', status: 'indexed', updated: '2 days ago' },
    { name: 'Sales Playbook', type: 'DOCX', chunks: 189, size: '1.2 MB', status: 'indexed', updated: '5 days ago' },
    { name: 'API Documentation', type: 'MD', chunks: 456, size: '890 KB', status: 'indexed', updated: '1 week ago' },
    { name: 'Product Roadmap', type: 'PDF', chunks: 78, size: '450 KB', status: 'processing', updated: '1 hour ago' },
  ];
  const handleUpload = () => { setUploading(true); setTimeout(() => { setUploading(false); setUploaded(true); setTimeout(() => setUploaded(false), 3000); }, 2000); };
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Knowledge Base</h1><p className="text-sm text-gray-500">{docs.length} documents &bull; {docs.reduce((a, d) => a + d.chunks, 0)} chunks indexed</p></div>
      </div>
      <div onClick={handleUpload} className={'border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all cursor-pointer ' + (uploading ? 'border-indigo-400 bg-indigo-50' : uploaded ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50')}>
        {uploading ? (<div><div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" /><div className="text-sm text-indigo-600 font-medium">Processing document...</div><div className="text-xs text-indigo-400 mt-1">Extracting text, chunking, generating embeddings</div></div>
        ) : uploaded ? (<div><div className="text-2xl mb-2">\u2713</div><div className="text-sm text-emerald-600 font-medium">Document uploaded and indexed!</div><div className="text-xs text-emerald-500 mt-1">142 chunks created &bull; Ready for RAG retrieval</div></div>
        ) : (<div><div className="text-2xl text-gray-300 mb-2">+</div><div className="text-sm text-gray-500">Click to upload documents</div><div className="text-xs text-gray-400 mt-1">Supports PDF, DOCX, TXT, CSV, MD &bull; Max 50MB</div></div>)}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Indexed Documents</h3></div>
        {docs.map((d, i) => (
          <div key={i} className={'px-5 py-3.5 flex items-center justify-between' + (i < docs.length - 1 ? ' border-b border-gray-100' : '') + ' hover:bg-gray-50 transition-colors'}>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold">{d.type}</div><div><div className="text-sm font-medium text-gray-900">{d.name}</div><div className="text-[10px] text-gray-400">{d.chunks} chunks &bull; {d.size} &bull; Updated {d.updated}</div></div></div>
            <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + (d.status === 'indexed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}