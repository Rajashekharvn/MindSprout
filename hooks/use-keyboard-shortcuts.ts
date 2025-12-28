"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";

interface UseKeyboardShortcutsProps {
    onToggleHelp?: () => void;
}

export function useKeyboardShortcuts({ onToggleHelp }: UseKeyboardShortcutsProps = {}) {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if inside an input or textarea
            if (
                document.activeElement instanceof HTMLInputElement ||
                document.activeElement instanceof HTMLTextAreaElement ||
                (document.activeElement as HTMLElement)?.isContentEditable
            ) {
                return;
            }

            // ?: Toggle Help Dialog (Shift + /)
            if (e.key === "?" && onToggleHelp) {
                e.preventDefault();
                onToggleHelp();
            }

            // Ctrl/Cmd + K: Focus Search (Navigate to Dashboard and focus search)
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                router.push("/dashboard?focus=search");
            }

            // Ctrl/Cmd + H: Go Home/Dashboard
            if ((e.ctrlKey || e.metaKey) && e.key === "h") {
                e.preventDefault();
                router.push("/dashboard");
                showToast.success("Navigated to Dashboard");
            }

            // Ctrl/Cmd + E: Explore
            if ((e.ctrlKey || e.metaKey) && e.key === "e") {
                e.preventDefault();
                router.push("/explore");
                showToast.success("Navigated to Explore");
            }

            // Ctrl/Cmd + P: Profile
            if ((e.ctrlKey || e.metaKey) && e.key === "p") {
                e.preventDefault();
                router.push("/dashboard/profile");
                showToast.success("Navigated to Profile");
            }

            // Ctrl/Cmd + S: Settings
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                router.push("/dashboard/settings");
                showToast.success("Navigated to Settings");
            }

            // Ctrl/Cmd + B: Back (or Dashboard fallback)
            // Implementation choice: Go to dashboard as "base" or use router.back()
            // Using router.back() might be more intuitive for "Back", but "B for Base/Dashboard" is also valid.
            // Let's stick to consistent navigation for now: Dashboard seems to be the main hub.
            // Actually, let's use router.back() if we want history, but the user request implied "where needed".
            // Let's make Ctrl+B go to Dashboard for now to match the pattern or maybe "Books"?
            // Let's skip Ctrl+B for now unless clearly defined, or map it to something useful.
            // The plan said "Navigate Back (or Dashboard)". Let's make it Dashboard for consistency if H is taken or specific.
            // Actually, let's just stick to the plan: Ctrl+B -> Dashboard (as an alternative or specifically "Back to Base")
            if ((e.ctrlKey || e.metaKey) && e.key === "b") {
                e.preventDefault();
                router.push("/dashboard");
                showToast.success("Navigated to Dashboard");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router, onToggleHelp]);
}
