import React from 'react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary/30 selection:text-white antialiased">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">ORION</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-on-surface hover:text-primary transition-colors flex items-center gap-2 font-mono">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Return to Terminal
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex pt-14 h-screen overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 h-full overflow-y-auto border-r border-white/5 bg-background p-6 hidden md:block">
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-4 font-headline uppercase tracking-widest text-[11px] opacity-50">Getting Started</h3>
              <ul className="space-y-3 font-light text-sm text-on-surface-variant">
                <li><a href="#introduction" className="hover:text-primary transition-colors">Introduction</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#installation" className="hover:text-primary transition-colors">Installation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-headline uppercase tracking-widest text-[11px] opacity-50">Core Concepts</h3>
              <ul className="space-y-3 font-light text-sm text-on-surface-variant">
                <li><a href="#authentication" className="hover:text-primary transition-colors">Setup & Auth</a></li>
                <li><a href="#usage" className="hover:text-primary transition-colors">Usage & Commands</a></li>
                <li><a href="#modes" className="hover:text-primary transition-colors">Execution Modes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-headline uppercase tracking-widest text-[11px] opacity-50">Advanced</h3>
              <ul className="space-y-3 font-light text-sm text-on-surface-variant">
                <li><a href="#configuration" className="hover:text-primary transition-colors">Configuration API</a></li>
                <li><a href="#contributing" className="hover:text-primary transition-colors">Contributing</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto p-8 lg:p-16 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-20 pb-32">
            
            <header id="introduction" className="space-y-6 border-b border-white/5 pb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/20 rounded-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-label text-on-surface-variant tracking-[0.2em] uppercase">
                  VERSION 1.1.1
                </span>
              </div>
              <h1 className="text-5xl font-headline font-bold text-on-background tracking-tight">
                Orion AI Documentation
              </h1>
              <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                The ultimate AI Architect for your terminal. A powerful command-line agent built for modern engineering workflows.
              </p>
            </header>

            <section id="features" className="space-y-8">
              <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">🚀 Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">chat</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Conversational CLI</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">Chat with an intelligent agent directly inside your terminal using your keyboard.</p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">code_blocks</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Agentic Execution</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">Orion acts natively to read files, analyze directory structures, and invoke system commands securely.</p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">security</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Secure Device Linking</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">OAuth-based device authorization linked directly to your isolated workspace cloud.</p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">speed</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Gemini Powered</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">Leverages advanced LLM inference to generate exact system commands quickly.</p>
                </div>
              </div>
            </section>

            <section id="installation" className="space-y-6">
              <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">📦 Installation</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Since Orion AI is published to npm, you can install it globally to make it accessible anywhere on your system.
              </p>
              <div className="bg-[#111111] border border-white/10 p-6 rounded-lg font-mono text-sm flex justify-between items-center group shadow-xl">
                <span className="text-[#9cff93]">npm install -g orion-ai</span>
                <button className="w-8 h-8 rounded hover:bg-white/5 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-gray-500 group-hover:text-primary text-[18px]">content_copy</span>
                </button>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-4 mt-4">
                <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                <p className="text-sm text-on-surface-variant font-light">Depending on your system configuration, you might need to run this command with `sudo` or configure your npm prefix if you encounter EACCES permission errors.</p>
              </div>
            </section>

            <section id="authentication" className="space-y-8 border-t border-white/5 pt-10">
              <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">🔑 Setup & Authentication</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Before deploying Orion on your machine, you must initialize your session. Orion securely pairs your device with your main account.
              </p>
              <div className="space-y-6 pl-4 border-l-2 border-white/10">
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">1</span>
                    Login via CLI
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light pl-9">Run the initialization command from any directory.</p>
                  <div className="ml-9 mt-2 bg-[#111111] border border-white/10 p-4 rounded-lg font-mono text-sm text-gray-300 inline-block shadow-lg">
                    orion login
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">2</span>
                    Authorize Device
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light pl-9">
                    You will receive a unique link and code in your terminal. Open the link in your browser and authorize the terminal with your account. Once linked, the CLI will automatically resume.
                  </p>
                </div>
              </div>
            </section>

            <section id="usage" className="space-y-6 border-t border-white/5 pt-10">
              <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">💻 Usage & Commands</h2>
              <p className="text-on-surface-variant font-light text-lg">
                Initialize the standard AI loop. This launches an interactive session where you can converse with Orion seamlessly over multiple steps.
              </p>
              <div className="bg-[#111111] border border-white/10 p-6 rounded-lg font-mono text-sm text-gray-300 shadow-xl space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-[#9cff93]">~/workspace ❯</span>
                  <span>orion wakeup</span>
                </div>
              </div>
            </section>

            <section id="modes" className="space-y-8">
              <h3 className="text-2xl font-headline font-semibold text-white tracking-tight">Execution Modes</h3>
              <p className="text-on-surface-variant font-light">
                Once initialized, Orion will prompt you to select an interaction mode natively using <code className="bg-surface-container px-2 py-0.5 rounded text-primary text-sm">@clack/prompts</code>.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-blue-500">forum</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Chat Mode</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Standard informational chat that streams responses natively in your terminal. Best for quick coding questions, explanation of concepts, and text generation without modifying your local system.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-primary">handyman</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Tool Calling Mode</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Action-oriented mode where Orion utilizes system scripts and environment tools. The AI can execute <code className="text-primary bg-primary/10 px-1 rounded">run_command</code> tools, grep your repository, and implement code directly.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden group opacity-60">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-orange-400">smart_toy</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Agentic Mode (Coming Soon)</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">Deep-reasoning mode where Orion plans out sequential multi-step tasks autonomously. Provide a high level instruction and step back while it architects the solution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
