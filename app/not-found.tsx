import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-sm text-gray-500 mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex justify-center gap-3">
          <Link href="/dashboard" className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Go to Dashboard</Link>
          <Link href="/" className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900">Home</Link>
        </div>
      </div>
    </div>
  );
}