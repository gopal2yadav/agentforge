import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Nexus — AI Agent Orchestration Platform',
  description: 'Build, orchestrate, and deploy autonomous AI agents that collaborate to solve complex tasks.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#0a0a0f',
          colorInputBackground: '#12121a',
          colorInputText: '#e8e8f0',
          borderRadius: '10px',
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#e8e8f0',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
