"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <div className="relative">
                {/* Outer Glow */}
                <div className={cn(
                    "absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse rounded-full",
                    sizeClasses[size]
                )} />

                {/* Spinner */}
                <Loader2 className={cn(
                    "animate-spin text-indigo-600 dark:text-indigo-400",
                    sizeClasses[size]
                )} />
            </div>
            {size === "xl" && (
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                    Loading...
                </p>
            )}
        </div>
    );
}

export function FullPageLoader() {
    return (
        <div className="fixed inset-0 bg-slate-50/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader size="xl" />
        </div>
    );
}
