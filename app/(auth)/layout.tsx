export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-nexus-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] blur-[80px] top-[5%] left-[25%] animate-float" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_60%)] blur-[60px] bottom-[10%] right-[15%] animate-float" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
