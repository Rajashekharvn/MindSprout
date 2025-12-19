"use client";

import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-slate-200 dark:border-white/5 py-12 text-center text-sm text-slate-500">
      <div className="mb-6 flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10">
          <BrainCircuit className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
        </div>
        <span className="font-semibold tracking-wide text-zinc-900 dark:text-slate-300">
          MindSprout
        </span>
      </div>
      <p className="text-slate-600">© 2025 MindSprout. Built for House of EdTech.</p>
    </footer>
  );
}
