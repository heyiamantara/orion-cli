"use client"
import React, { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !data?.session && !data?.user) {
      router.push("/sign-in")
    }
  }, [data, isPending, router]);

  if (isPending || (!data?.session && !data?.user)) {
    return (
      <div className="h-screen overflow-hidden bg-background flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Connecting...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-background text-on-background font-body selection:bg-primary/30 selection:text-white antialiased flex flex-col">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">ORION</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.push("/sign-in"),
                  },
                })
              }
              className="text-[10px] text-primary hover:bg-primary/10 px-3 py-1.5 rounded border border-primary/20 font-bold tracking-widest uppercase transition-colors"
            >
              Terminate Session
            </button>
          </div>
        </div>
      </nav>

      <main 
        className="w-full flex-grow flex flex-col items-center justify-center p-4 pt-24 pb-16"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(156, 255, 147, 0.02) 1px, transparent 0)', backgroundSize: '32px 32px' }}
      >
        <div className="w-full max-w-md">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">System Online</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Command Center
            </h1>
            <p className="text-on-surface-variant text-xs">
              Welcome back to your provisioned node.
            </p>
          </header>

          <div className="bg-surface-container-low p-6 rounded-xl shadow-[0_0_20px_rgba(156,255,147,0.05)] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
            
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={data?.user?.image || "https://api.dicebear.com/9.x/bottts/svg?seed=" + data?.user?.id}
                  alt={data?.user?.name || "User"}
                  className="w-16 h-16 rounded bg-surface-container border border-white/10 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border border-surface-container-low animate-pulse"></div>
              </div>

              <div className="space-y-1 overflow-hidden w-full">
                <div className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
                  Node Identity
                </div>
                <h2 className="text-xl font-bold text-white truncate">
                  {data?.user?.name || "User"}
                </h2>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant bg-surface-container px-2 py-1 flex-wrap rounded w-fit mt-2">
                  <span className="material-symbols-outlined text-[14px]">mail</span>
                  <span className="truncate">{data?.user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-white/5 py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <div className="text-[10px] text-on-surface-variant font-medium tracking-wide">
            © 2026 Orion Systems.
          </div>
        </div>
      </footer>
    </div>
  )
}
