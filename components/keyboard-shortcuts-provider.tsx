"use client";

import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Command, Keyboard, Search, Home, Compass, User, Settings, ArrowLeft } from "lucide-react";

export function KeyboardShortcutsProvider() {
    const [isOpen, setIsOpen] = useState(false);

    useKeyboardShortcuts({
        onToggleHelp: () => setIsOpen((prev) => !prev),
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Keyboard className="w-5 h-5 text-indigo-500" />
                        Keyboard Shortcuts
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <ShortcutItem
                            icon={<Search className="w-4 h-4" />}
                            label="Search"
                            keys={["Ctrl", "K"]}
                        />
                        <ShortcutItem
                            icon={<Home className="w-4 h-4" />}
                            label="Go to Dashboard"
                            keys={["Ctrl", "H"]}
                        />
                        <ShortcutItem
                            icon={<Compass className="w-4 h-4" />}
                            label="Explore"
                            keys={["Ctrl", "E"]}
                        />
                        <ShortcutItem
                            icon={<User className="w-4 h-4" />}
                            label="Profile"
                            keys={["Ctrl", "P"]}
                        />
                        <ShortcutItem
                            icon={<Settings className="w-4 h-4" />}
                            label="Settings"
                            keys={["Ctrl", "S"]}
                        />
                        <ShortcutItem
                            icon={<ArrowLeft className="w-4 h-4" />}
                            label="Go Back/Dashboard"
                            keys={["Ctrl", "B"]}
                        />
                        <div className="border-t border-slate-100 dark:border-slate-800 my-2" />
                        <ShortcutItem
                            icon={<span className="font-bold text-xs">?</span>}
                            label="Toggle Shortcuts"
                            keys={["Shift", "?"]}
                        />
                    </div>
                </div>
                <div className="flex justify-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                        Press <Kbd>Esc</Kbd> to close
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ShortcutItem({ icon, label, keys }: { icon: React.ReactNode, label: string, keys: string[] }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 dark:text-slate-500">{icon}</span>
                <span>{label}</span>
            </div>
            <div className="flex items-center gap-1">
                {keys.map((key) => (
                    <Kbd key={key}>{key}</Kbd>
                ))}
            </div>
        </div>
    );
}

function Kbd({ children }: { children: React.ReactNode }) {
    return (
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 opacity-100">
            {children}
        </kbd>
    );
}
