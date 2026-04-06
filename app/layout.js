export const metadata = {
  title: "AgentForge - Agentic AI Platform",
  description: "Build, deploy, and manage persistent AI agents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#0c0f14" }}>{children}</body>
    </html>
  );
}
