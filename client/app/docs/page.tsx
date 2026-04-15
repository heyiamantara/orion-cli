"use client";

import React from 'react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary/30 selection:text-white antialiased">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary">terminal</span>
            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">ORION</h1>
          </Link>
          <Link href="/" className="text-sm text-on-surface hover:text-primary transition-colors flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Return to Terminal
          </Link>
        </div>
      </nav>

      <div className="flex pt-14 h-screen overflow-hidden">
        {/* Sidebar */}
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
                <li><a href="#authentication" className="hover:text-primary transition-colors">Authentication</a></li>
                <li><a href="#commands" className="hover:text-primary transition-colors">Commands</a></li>
                <li><a href="#modes" className="hover:text-primary transition-colors">Execution Modes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-headline uppercase tracking-widest text-[11px] opacity-50">Advanced</h3>
              <ul className="space-y-3 font-light text-sm text-on-surface-variant">
                <li><a href="#tools" className="hover:text-primary transition-colors">Tool Configuration</a></li>
                <li><a href="#configuration" className="hover:text-primary transition-colors">Local Configuration</a></li>
                <li><a href="#contributing" className="hover:text-primary transition-colors">Contributing</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto p-8 lg:p-16 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-20 pb-32">

            {/* Introduction */}
            <header id="introduction" className="space-y-6 border-b border-white/5 pb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/20 rounded-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-label text-on-surface-variant tracking-[0.2em] uppercase">Version 1.2.3 — Stable</span>
              </div>
              <h1 className="text-5xl font-headline font-bold text-on-background tracking-tight">Orion Documentation</h1>
              <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                Orion is a command-line AI agent built for developers. It provides an interactive terminal interface powered by Google Gemini, enabling conversational AI, tool-assisted code execution, and structured application generation, all from your shell.
              </p>
              <p className="text-base text-on-surface-variant font-light leading-relaxed">
                This document covers installation, authentication, available commands, execution modes, and advanced configuration. It is intended for developers who want to integrate Orion into their daily engineering workflow.
              </p>
            </header>

            {/* Features */}
            <section id="features" className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Features</h2>
                <p className="text-on-surface-variant font-light">A summary of what Orion provides out of the box.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">chat</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Conversational AI</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Stream responses from Google Gemini directly in your terminal. Supports multi-turn conversations with persistent conversation IDs across sessions.
                  </p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">handyman</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Tool-Assisted Execution</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Enables Orion to invoke registered tools such as Google Search, Code Execution, and URL Context analysis. Tools are toggled per session and resolved at runtime.
                  </p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Application Generation</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Agentic mode uses structured output generation to scaffold complete, production-ready applications from a single natural language description, including all files and setup commands.
                  </p>
                </div>
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">security</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Device Authorization</h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Uses the OAuth 2.0 Device Authorization Grant flow. Tokens are stored locally at <code className="text-primary bg-primary/10 px-1 rounded text-xs">~/.orion/token.json</code> and include expiry tracking with automatic session validation.
                  </p>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="space-y-6 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Installation</h2>
                <p className="text-on-surface-variant font-light">
                  Orion is distributed as a global npm package. Node.js 18 or later is required.
                </p>
              </div>
              <div className="bg-[#111111] border border-white/10 p-6 rounded-lg font-mono text-sm flex justify-between items-center shadow-xl">
                <span className="text-[#9cff93]">npm install -g orion-ai</span>
              </div>
              <p className="text-sm text-on-surface-variant font-light">
                Once installed, the <code className="text-primary bg-primary/10 px-1 rounded text-xs">orion</code> binary will be available globally. You can verify the installation by running:
              </p>
              <div className="bg-[#111111] border border-white/10 p-6 rounded-lg font-mono text-sm shadow-xl space-y-2">
                <div className="flex gap-4">
                  <span className="text-[#9cff93]">~/workspace ❯</span>
                  <span className="text-gray-300">orion --version</span>
                </div>
                <div className="text-gray-500 pl-1">1.2.3</div>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-4">
                <span className="material-symbols-outlined text-primary mt-0.5 text-[18px]">info</span>
                <p className="text-sm text-on-surface-variant font-light">
                  On some systems, global npm installs require elevated permissions. If you encounter an <code className="text-primary bg-primary/10 px-1 rounded text-xs">EACCES</code> error, either run the command with <code className="text-primary bg-primary/10 px-1 rounded text-xs">sudo</code> or configure a user-level npm prefix to avoid permission issues.
                </p>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="space-y-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Authentication</h2>
                <p className="text-on-surface-variant font-light">
                  Orion uses the OAuth 2.0 Device Authorization Grant to authenticate your terminal session against the Orion cloud backend. This flow does not require you to enter credentials directly in the terminal.
                </p>
              </div>

              <div className="space-y-6 pl-4 border-l-2 border-white/10">
                <div className="space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono">1</span>
                    Initiate Login
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light pl-9 leading-relaxed">
                    Run the login command from any directory. Orion will contact the authorization server and retrieve a device code.
                  </p>
                  <div className="ml-9 bg-[#111111] border border-white/10 p-4 rounded-lg font-mono text-sm text-gray-300 shadow-lg">
                    orion login
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono">2</span>
                    Authorize in Browser
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light pl-9 leading-relaxed">
                    The terminal will display a verification URL and a short user code. Open the URL in your browser (Orion can open it automatically) and enter the code to authorize the device. The CLI polls the server at a configurable interval and resumes automatically once authorization is confirmed.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono">3</span>
                    Token Storage
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light pl-9 leading-relaxed">
                    Upon successful authorization, the access token, refresh token, token type, and expiry timestamp are written to <code className="text-primary bg-primary/10 px-1 rounded text-xs">~/.orion/token.json</code>. This file is read on every subsequent command to validate the session. Tokens within 5 minutes of expiry are treated as expired.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-white font-semibold">Additional Auth Commands</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-mono border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant text-left">
                        <th className="px-4 py-3 font-medium border-b border-white/10">Command</th>
                        <th className="px-4 py-3 font-medium border-b border-white/10">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                        <td className="px-4 py-3 text-primary">orion login</td>
                        <td className="px-4 py-3 text-on-surface-variant font-sans font-light">Initiates the device authorization flow and stores the resulting token locally.</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                        <td className="px-4 py-3 text-primary">orion logout</td>
                        <td className="px-4 py-3 text-on-surface-variant font-sans font-light">Clears the stored token from <code className="text-primary bg-primary/10 px-1 rounded text-xs">~/.orion/token.json</code> and ends the current session.</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="px-4 py-3 text-primary">orion whoami</td>
                        <td className="px-4 py-3 text-on-surface-variant font-sans font-light">Fetches and displays the authenticated user's name, email, and account ID from the server.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Commands */}
            <section id="commands" className="space-y-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Commands</h2>
                <p className="text-on-surface-variant font-light">
                  All Orion commands are invoked via the <code className="text-primary bg-primary/10 px-1 rounded text-xs">orion</code> binary. Run <code className="text-primary bg-primary/10 px-1 rounded text-xs">orion --help</code> at any time to see available commands and options.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <code className="text-primary font-mono text-base">orion wakeup</code>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">Primary Entry Point</span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Authenticates the session by reading the stored token, fetches the current user profile from the server, and presents an interactive mode selection prompt. This is the main command used to start an AI session.
                  </p>
                  <div className="bg-[#111111] border border-white/10 p-4 rounded-lg font-mono text-sm shadow-lg space-y-2">
                    <div className="flex gap-4"><span className="text-[#9cff93]">~/workspace ❯</span><span className="text-gray-300">orion wakeup</span></div>
                    <div className="text-gray-500 pl-1">Fetching User Information... Done</div>
                    <div className="text-[#9cff93] pl-1">Welcome back, Developer!</div>
                    <div className="text-gray-400 pl-1">Select an option: Chat / Tool Calling / Agentic Mode</div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg space-y-3">
                  <code className="text-primary font-mono text-base">orion login [--server-url &lt;url&gt;] [--client-id &lt;id&gt;]</code>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Starts the device authorization flow. Accepts optional overrides for the server URL and OAuth client ID, which is useful when pointing Orion at a self-hosted backend instance.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg space-y-3">
                  <code className="text-primary font-mono text-base">orion logout</code>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Prompts for confirmation and then removes the locally stored token file, effectively ending the authenticated session.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-white/5 p-6 rounded-lg space-y-3">
                  <code className="text-primary font-mono text-base">orion whoami</code>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    Validates the current token and prints the authenticated user's display name, email address, and unique account ID. Exits with an error if the session is expired or not found.
                  </p>
                </div>
              </div>
            </section>

            {/* Execution Modes */}
            <section id="modes" className="space-y-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Execution Modes</h2>
                <p className="text-on-surface-variant font-light">
                  After running <code className="text-primary bg-primary/10 px-1 rounded text-xs">orion wakeup</code>, you are presented with three execution modes via an interactive prompt. Each mode is designed for a different class of task.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <div className="flex gap-4">
                    <div className="mt-1"><span className="material-symbols-outlined text-blue-500">forum</span></div>
                    <div className="space-y-2">
                      <h4 className="text-white font-bold">Chat Mode</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        A standard multi-turn conversational interface. Responses are streamed token-by-token from the Orion backend and rendered with Markdown formatting directly in the terminal. Conversation state is maintained via a server-side conversation ID, allowing context to persist across multiple exchanges within the same session.
                      </p>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Best suited for: code explanation, debugging assistance, documentation lookup, and general engineering questions that do not require system interaction.
                      </p>
                      <p className="text-sm text-gray-500 font-light">
                        Type <code className="text-primary bg-primary/10 px-1 rounded text-xs">exit</code> or press <code className="text-primary bg-primary/10 px-1 rounded text-xs">Ctrl+C</code> to end the session.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="flex gap-4">
                    <div className="mt-1"><span className="material-symbols-outlined text-primary">handyman</span></div>
                    <div className="space-y-2">
                      <h4 className="text-white font-bold">Tool Calling Mode</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Extends the conversational interface with access to registered system tools. In this mode, the model can invoke tools mid-response to retrieve real-time information or execute code before formulating its final answer.
                      </p>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Available tools include Google Search for live web results, Code Execution for running Python computations, and URL Context for analyzing specific web pages. Tools are enabled and resolved at session start.
                      </p>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Best suited for: tasks requiring up-to-date information, numerical computation, or analysis of external resources.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                  <div className="flex gap-4">
                    <div className="mt-1"><span className="material-symbols-outlined text-orange-400">smart_toy</span></div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-bold">Agentic Mode</h4>
        
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        A deep-reasoning mode where Orion autonomously plans and executes multi-step tasks from a single high-level instruction. The agent uses structured output generation to scaffold complete applications, including all source files, configuration, and setup commands, written directly to your working directory.
                      </p>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        The generation pipeline uses a Zod-validated schema to ensure every output includes a folder name, file tree, complete file contents, and an ordered list of setup commands. No placeholders or incomplete stubs are produced.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tool Configuration */}
            <section id="tools" className="space-y-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Tool Configuration</h2>
                <p className="text-on-surface-variant font-light">
                  Orion's tool system is built on top of the AI SDK's tool interface and backed by Google Generative AI's native tool capabilities. Tools are registered in the tool configuration and resolved lazily at runtime to avoid initialization errors.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-left">
                      <th className="px-4 py-3 font-medium border-b border-white/10 font-mono">Tool ID</th>
                      <th className="px-4 py-3 font-medium border-b border-white/10">Name</th>
                      <th className="px-4 py-3 font-medium border-b border-white/10">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 font-mono text-primary text-xs">google_search</td>
                      <td className="px-4 py-3 font-light">Google Search</td>
                      <td className="px-4 py-3 text-on-surface-variant font-light">Retrieves live search results from Google. Useful for current events, documentation, and real-time technical references.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 font-mono text-primary text-xs">code_execution</td>
                      <td className="px-4 py-3 font-light">Code Execution</td>
                      <td className="px-4 py-3 text-on-surface-variant font-light">Generates and executes Python code in a sandboxed environment. Suitable for calculations, data processing, and verifiable computations.</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 font-mono text-primary text-xs">url_context</td>
                      <td className="px-4 py-3 font-light">URL Context</td>
                      <td className="px-4 py-3 text-on-surface-variant font-light">Fetches and analyzes the content of up to 20 URLs per request. Useful for summarizing documentation pages or extracting information from specific web resources.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-4">
                <span className="material-symbols-outlined text-primary mt-0.5 text-[18px]">info</span>
                <p className="text-sm text-on-surface-variant font-light">
                  All tools are disabled by default. They are enabled programmatically per session in Tool Calling Mode. Requires <code className="text-primary bg-primary/10 px-1 rounded text-xs">@ai-sdk/google</code> version 2.0 or later.
                </p>
              </div>
            </section>

            {/* Local Configuration */}
            <section id="configuration" className="space-y-6 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Local Configuration</h2>
                <p className="text-on-surface-variant font-light">
                  Orion stores all local state in the <code className="text-primary bg-primary/10 px-1 rounded text-xs">~/.orion/</code> directory in your home folder. This directory is created automatically on first use.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-left">
                      <th className="px-4 py-3 font-medium border-b border-white/10">File</th>
                      <th className="px-4 py-3 font-medium border-b border-white/10">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 font-mono text-primary text-xs">~/.orion/token.json</td>
                      <td className="px-4 py-3 text-on-surface-variant font-light">Stores the OAuth access token, refresh token, token type, expiry timestamp, and creation date. Managed automatically by the login and logout commands.</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 font-mono text-primary text-xs">~/.orion/config.json</td>
                      <td className="px-4 py-3 text-on-surface-variant font-light">General key-value configuration store for user preferences and runtime settings. Read and written via the internal config API.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contributing */}
            <section id="contributing" className="space-y-6 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-semibold text-white tracking-tight">Contributing</h2>
                <p className="text-on-surface-variant font-light">
                  Orion is open source. Contributions, bug reports, and feature requests are welcome via the project's GitHub repository.
                </p>
              </div>
              <div className="space-y-4 text-sm text-on-surface-variant font-light leading-relaxed">
                <p>Before submitting a pull request, ensure the following:</p>
                <ul className="space-y-2 pl-4 border-l-2 border-white/10">
                  <li className="pl-4">All new CLI commands are registered in <code className="text-primary bg-primary/10 px-1 rounded text-xs">server/src/cli/main.js</code> via <code className="text-primary bg-primary/10 px-1 rounded text-xs">program.addCommand()</code>.</li>
                  <li className="pl-4">Authentication logic follows the existing token storage pattern in <code className="text-primary bg-primary/10 px-1 rounded text-xs">server/src/cli/commands/auth/login.js</code>.</li>
                  <li className="pl-4">New tools are registered in <code className="text-primary bg-primary/10 px-1 rounded text-xs">server/src/config/tool.config.js</code> with a unique <code className="text-primary bg-primary/10 px-1 rounded text-xs">id</code>, <code className="text-primary bg-primary/10 px-1 rounded text-xs">name</code>, and lazy <code className="text-primary bg-primary/10 px-1 rounded text-xs">getTool()</code> factory.</li>
                  <li className="pl-4">Code follows the existing ESM module format with named exports.</li>
                </ul>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
