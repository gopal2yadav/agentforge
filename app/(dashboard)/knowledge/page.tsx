'use client';
import { useState } from 'react';

interface Doc { id: string; name: string; type: string; size: string; chunks: number; uploadedAt: string; }

export default function KnowledgePage() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: '1', name: 'Product Documentation.pdf', type: 'PDF', size: '2.4 MB', chunks: 156, uploadedAt: '2026-04-10' },
    { id: '2', name: 'API Reference.md', type: 'Markdown', size: '890 KB', chunks: 89, uploadedAt: '2026-04-11' },
    { id: '3', name: 'Company Handbook.docx', type: 'Word', size: '1.8 MB', chunks: 124, uploadedAt: '2026-04-12' },
  ]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setDocs(prev => [{ id: 'doc_' + Date.now(), name: 'New Document.pdf', type: 'PDF', size: '1.2 MB', chunks: 78, uploadedAt: new Date().toISOString().split('T')[0] }, ...prev]);
      setUploading(false);
    }, 2000);
  };

  const filtered = searchQuery ? docs.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())) : docs;

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Knowledge Base</h1>
          <p className="text-sm text-gray-500">{docs.length} documents | {docs.reduce((s, d) => s + d.chunks, 0)} chunks indexed</p>
        </div>
        <button onClick={handleUpload} disabled={uploading} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{uploading ? 'Uploading...' : 'Upload Document'}</button>
      </div>

      <div className="mb-6">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search documents..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="space-y-3">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{doc.type.substring(0, 3)}</div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.size} | {doc.chunks} chunks | Uploaded {doc.uploadedAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">Indexed</span>
                <button className="text-xs text-red-400 hover:text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}