"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g orion-ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-[-1]" />
      <div className="fixed inset-0 scanlines pointer-events-none z-[-1]" />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-[#484847]/15 px-6 py-4 flex justify-between items-center max-w-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#9cff93]" data-icon="terminal">
            terminal
          </span>
          <h1 className="text-xl font-bold tracking-tighter text-[#9cff93] font-headline">ORION</h1>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            className="text-[#9cff93] font-headline text-xs uppercase tracking-widest hover:bg-[#131313] hover:text-[#00fc40] transition-colors duration-200"
            href="#"
          >
            FEATURES
          </Link>
          <Link
            className="text-white font-headline text-xs uppercase tracking-widest hover:bg-[#131313] hover:text-[#00fc40] transition-colors duration-200"
            href="/docs"
          >
            DOCS
          </Link>
          <Link
            className="text-white font-headline text-xs uppercase tracking-widest hover:bg-[#131313] hover:text-[#00fc40] transition-colors duration-200"
            href="#"
          >
            COMMUNITY
          </Link>
        </nav>
        <Link href="/sign-in">
          <button className="bg-primary text-on-primary font-label text-xs font-bold tracking-widest px-6 py-2 scale-95 active:opacity-80 transition-all hover:shadow-[0_0_15px_rgba(156,255,147,0.5)]">
            LOGIN
          </button>
        </Link>
      </header>

      <main className="relative pt-24">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/20 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-label text-on-surface-variant tracking-[0.2em] uppercase">
                SYSTEM STATUS: ONLINE
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-bold text-on-background tracking-tight leading-none">
              The AI Architect for your <span className="text-primary italic">Terminal.</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-light">
              Build, search, and automate with Orion. The most powerful CLI agent built for developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/sign-up">
                <button className="bg-primary text-on-primary font-label font-bold py-4 px-10 text-sm tracking-widest hover:shadow-[0_0_30px_rgba(156,255,147,0.4)] transition-all active:scale-95">
                  GET STARTED
                </button>
              </Link>
              <Link href="/docs">
                <button className="bg-surface-container-low text-on-surface border border-outline-variant/30 font-label font-bold py-4 px-10 text-sm tracking-widest hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-xs">book</span> VIEW DOCS
                </button>
              </Link>
            </div>
            
            {/* Terminal Visual */}
            <div className="mt-20 w-full max-w-3xl mx-auto aspect-video bg-[#111111] border border-outline-variant/30 terminal-glow relative overflow-hidden rounded-lg shadow-2xl">
              <div className="h-10 bg-[#2d2d2d] flex items-center px-4 relative">
                <div className="flex gap-2 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[11px] font-mono text-[#888888] tracking-widest">
                    orion — terminal — 80x24
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 text-left font-mono text-[13px] md:text-[14px] leading-relaxed">
                <div className="flex gap-3 mb-4">
                  <span className="text-[#9cff93] font-bold">~/workspace ❯</span>
                  <span className="text-gray-100">orion wakeup</span>
                </div>
                
                <div className="text-gray-400 ml-1 mb-4 flex items-center gap-2">
                  <span className="text-[#00e5ff]">✔</span>
                  <span>Fetching User Information... Done</span>
                </div>
                
                <div className="text-[#9cff93] whitespace-pre-wrap ml-1 mb-4">
                  Welcome back, Developer!
                </div>
                
                <div className="flex gap-2 items-center text-gray-100">
                  <span className="text-gray-400">◇</span>
                  <span>Select an option:</span>
                </div>
                
                <div className="ml-[0.3rem] pl-4 py-2 flex flex-col gap-1.5">
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00e5ff] text-lg leading-none">●</span>
                    <span className="text-gray-100">Chat</span>
                    <span className="text-gray-500 ml-1">Simple chat with AI</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600 text-lg leading-none">○</span>
                    <span className="text-gray-300">Tool Calling</span>
                    <span className="text-gray-600 ml-1">Chat with tools (Search, Code)</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600 text-lg leading-none">○</span>
                    <span className="text-gray-300">Agentic Mode</span>
                    <span className="text-gray-600 ml-1">Advanced AI agent (Soon)</span>
                  </div>
                </div>
                
                <div className="flex gap-2 items-center ml-5 mt-1 text-gray-600">
                  <div className="w-2.5 h-[1.1rem] bg-[#9cff93] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 bg-surface-container-lowest relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold tracking-tight">Build and Execute with AI</h2>
              <p className="text-on-surface-variant text-lg">
                AI tools for writing, searching, and running code from your command line.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-background border border-outline-variant/20 p-8 space-y-6 hover:bg-surface-container-low transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="forum">
                  forum
                </span>
                <h3 className="text-xl font-headline font-bold text-on-surface">AI Assistant</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Context-aware chat for debugging and code navigation
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-background border border-outline-variant/20 p-8 space-y-6 hover:bg-surface-container-low transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="search">
                  search
                </span>
                <h3 className="text-xl font-headline font-bold text-on-surface">Web Search</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Retrieve up-to-date documentation and technical references
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-background border border-outline-variant/20 p-8 space-y-6 hover:bg-surface-container-low transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="code_blocks">
                  code_blocks
                </span>
                <h3 className="text-xl font-headline font-bold text-on-surface">Code Generation</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Generate and modify code using structured prompts
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-background border border-outline-variant/20 p-8 space-y-6 hover:bg-surface-container-low transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="construction">
                  construction
                </span>
                <h3 className="text-xl font-headline font-bold text-on-surface">Tool Execution</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Run local commands and interact with system APIs
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 flex flex-col items-center">
          <div className="max-w-4xl w-full bg-surface-container-low border border-outline-variant/20 p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]" data-icon="terminal">
                terminal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-surface">
              Ready to build faster?
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Join the league of developers architecting the future from their command line. Orion is open for early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 z-10 relative">
              <Link href="/device">
                <button className="bg-primary hover:bg-primary-fixed-dim text-on-primary font-label font-bold py-4 px-10 text-sm tracking-widest flex items-center justify-center gap-3 group transition-colors">
                  <span className="material-symbols-outlined text-lg" data-icon="login">
                    login
                  </span>
                  DEVICE LOGIN
                </button>
              </Link>
              <button 
                onClick={handleCopy} 
                className="bg-background w-56 text-on-surface border border-outline-variant/30 font-label font-bold py-4 text-sm tracking-widest hover:border-primary transition-colors"
               >
                {copied ? "COPIED TO CLIPBOARD!" : "INSTALL VIA NPM"}
              </button>
            </div>
            <div className="pt-10 flex items-center justify-center gap-6 text-on-surface-variant font-mono text-[10px] tracking-widest uppercase">
              <span>Version 1.1.2</span>
              <span className="w-1 h-1 bg-outline-variant rounded-full" />
              <span>Stable Release</span>
              <span className="w-1 h-1 bg-outline-variant rounded-full" />
              <span>Open Source</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] border-t border-[#484847]/15 px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6 w-full relative z-10">
        <div className="text-[#767575] font-headline text-xs uppercase tracking-widest">
          © 2026 ORION_V.1.1.2
        </div>
        <div className="flex gap-8">
          <a className="text-[#767575] hover:text-white transition-colors font-headline text-xs uppercase tracking-widest" href="#">
            GITHUB
          </a>
          <a className="text-[#767575] hover:text-white transition-colors font-headline text-xs uppercase tracking-widest" href="#">
            DOCS
          </a>
          <a className="text-[#767575] hover:text-white transition-colors font-headline text-xs uppercase tracking-widest" href="#">
            DISCORD
          </a>
        </div>
        <div className="flex items-center gap-2 text-[#9cff93]">
          <span className="material-symbols-outlined text-sm" data-icon="bolt">
            bolt
          </span>
          <span className="font-headline text-[10px] tracking-widest uppercase">
            Latency: 12ms
          </span>
        </div>
      </footer>
    </>
  )
}
