import Link from 'next/link';
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-[800px] mx-auto">
        <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">N</div><span className="text-base font-bold text-gray-900">Nexus</span></Link>
      </nav>
      <div className="max-w-[700px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: April 11, 2026</p>
        <div className="prose prose-sm text-gray-600 space-y-6">
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h2><p className="text-sm text-gray-600 leading-relaxed">We collect information you provide directly: name, email, company name when you create an account. We also collect usage data including API calls, token usage, and agent execution logs to provide and improve our services.</p></div>
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2><p className="text-sm text-gray-600 leading-relaxed">We use your information to provide the Nexus platform, process payments, send important service updates, and improve our AI agent orchestration capabilities. We do not sell your personal data.</p></div>
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">3. Data Storage & Security</h2><p className="text-sm text-gray-600 leading-relaxed">Your data is stored securely on encrypted servers. We use industry-standard security measures including TLS encryption, access controls, and regular security audits. We are SOC 2 Type II compliant.</p></div>
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">4. Third-Party Services</h2><p className="text-sm text-gray-600 leading-relaxed">We use Clerk for authentication, Stripe for payment processing, and Vercel for hosting. Each of these services has their own privacy policies that govern their handling of your data.</p></div>
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">5. Your Rights</h2><p className="text-sm text-gray-600 leading-relaxed">You have the right to access, correct, or delete your personal data. You can export your data at any time from Settings. To request deletion, contact gopal@aabhyasa.com.</p></div>
          <div><h2 className="text-lg font-semibold text-gray-900 mb-2">6. Contact</h2><p className="text-sm text-gray-600 leading-relaxed">For privacy-related questions, contact us at gopal@aabhyasa.com or visit our Help & Feedback page.</p></div>
        </div>
      </div>
    </div>
  );
}