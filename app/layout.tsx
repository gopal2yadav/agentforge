import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexus — AI Agent Orchestration Platform',
  description: 'Build, orchestrate, and deploy autonomous AI agents that collaborate to solve complex tasks.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#0c0a1a',
          colorInputBackground: '#0f0f23',
          colorInputText: '#e0e7ff',
          borderRadius: '12px',
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
        </head>
        <body style={{ background: '#020108', color: '#e0e7ff', fontFamily: "'Satoshi', 'General Sans', -apple-system, sans-serif" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}