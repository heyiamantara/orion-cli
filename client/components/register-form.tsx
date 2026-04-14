"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function RegisterForm() {
  const [loadingProvider, setLoadingProvider] = useState<"github" | "email" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onGithubRegister = async () => {
    setLoadingProvider("github");
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard"
    });
    setLoadingProvider(null);
  };

  const onEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProvider("email");
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: email.split('@')[0],
      callbackURL: "/dashboard"
    });
    
    if (error) {
      alert("Registration failed: " + error.message);
    }
    setLoadingProvider(null);
  };

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 selection:text-white antialiased h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Top Nav (Replaced Orion Cloud to match Login logic) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">ORION</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-on-surface-variant font-medium tracking-wider uppercase bg-surface-container px-2 py-1 rounded">
              Latency: 12ms
            </span>
          </div>
        </div>
      </nav>

      <main 
        className="w-full flex-grow flex flex-col items-center justify-center p-4 pt-20 pb-16"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(156, 255, 147, 0.02) 1px, transparent 0)', backgroundSize: '32px 32px' }}
      >
        {/* Main Form Container */}
        <div className="w-full max-w-md">
          <header className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Connection Secure</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Create Account
            </h1>
            <p className="text-on-surface-variant text-xs">
              Set up your developer identity and provision your node.
            </p>
          </header>

          <div 
            className="bg-surface-container-low p-6 rounded-xl shadow-[0_0_20px_rgba(156,255,147,0.15)] border border-white/5" 
          >
            <form className="space-y-4" onSubmit={onEmailRegister}>
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  User Identifier
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors text-base">
                    alternate_email
                  </span>
                  <input 
                    className="w-full bg-surface-container border border-white/10 focus:border-primary/50 text-on-surface rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-on-surface-variant/30 text-sm" 
                    placeholder="user@orion-system.local" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Token Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Access Token
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors text-base">
                    key
                  </span>
                  <input 
                    className="w-full bg-surface-container border border-white/10 focus:border-primary/50 text-on-surface rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-on-surface-variant/30 text-sm" 
                    placeholder="••••••••••••" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button 
                  type="button"
                  onClick={onGithubRegister}
                  className="w-full bg-white text-black font-bold text-sm tracking-wide py-3 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingProvider !== null}
                >
                  <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
                  {loadingProvider === "github" ? "Connecting..." : "Continue with GitHub"}
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest leading-none">
                    <span className="bg-surface-container-low px-2 text-on-surface-variant">
                      OR MANUAL
                    </span>
                  </div>
                </div>

                <button className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-primary/10 active:scale-[0.98] tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={loadingProvider !== null}>
                  {loadingProvider === "email" ? "Provisioning..." : "Create Account"}
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 text-center mt-6">
                <p className="text-xs text-on-surface-variant">
                  Already have a node?
                  <Link className="text-primary font-medium hover:underline ml-1" href="/sign-in">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
          


        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-background border-t border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-[10px] text-on-surface-variant font-medium tracking-wide">
            © 2026 Orion Systems.
          </div>
          <div className="flex gap-6">
            <Link className="text-[10px] text-on-surface-variant hover:text-primary font-bold uppercase tracking-widest transition-colors" href="#">Docs</Link>
            <Link className="text-[10px] text-on-surface-variant hover:text-primary font-bold uppercase tracking-widest transition-colors" href="#">API Ref</Link>
            <Link className="text-[10px] text-on-surface-variant hover:text-primary font-bold uppercase tracking-widest transition-colors" href="#">Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
