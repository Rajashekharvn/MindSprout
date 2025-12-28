"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AppearanceSettings() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    }

    return (
        <div className="space-y-4">
            <div className="space-y-1 mb-4">
                <h3 className="font-medium">Theme Preferences</h3>
                <p className="text-sm text-muted-foreground">
                    Select the theme for your dashboard.
                </p>
            </div>
            <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => setTheme(value)}
                className="grid max-w-2xl grid-cols-3 gap-8 pt-2"
            >
                <div>
                    <Label className="flex flex-col gap-2 [&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <RadioGroupItem value="light" className="sr-only" />
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent hover:bg-accent transition-all">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                            </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                            <span className="flex items-center justify-center gap-2">
                                <Sun className="h-4 w-4" /> Light
                            </span>
                        </span>
                    </Label>
                </div>
                <div>
                    <Label className="flex flex-col gap-2 [&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <RadioGroupItem value="dark" className="sr-only" />
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground transition-all">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                            </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                            <span className="flex items-center justify-center gap-2">
                                <Moon className="h-4 w-4" /> Dark
                            </span>
                        </span>
                    </Label>
                </div>
                <div>
                    <Label className="flex flex-col gap-2 [&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <RadioGroupItem value="system" className="sr-only" />
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground transition-all">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                            </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                            <span className="flex items-center justify-center gap-2">
                                <Monitor className="h-4 w-4" /> System
                            </span>
                        </span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}
