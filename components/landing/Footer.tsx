"use client";

import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-slate-200 py-14 text-center text-sm text-slate-500">
      <div className="mb-4 flex items-center justify-center gap-2">
        <BrainCircuit className="h-5 w-5 text-indigo-600" />
        <span className="font-semibold tracking-wide text-slate-900">
          MindSprout
        </span>
      </div>
      <p>© 2025 MindSprout. Built for House of EdTech.</p>
    </footer>
  );
}
