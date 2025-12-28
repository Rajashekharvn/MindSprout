"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle2, Github, Linkedin, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface IntegrationCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    isConnected: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
    isLoading: boolean;
    children?: React.ReactNode;
}

function IntegrationCard({
    title,
    description,
    icon,
    isConnected,
    onConnect,
    onDisconnect,
    isLoading,
    children
}: IntegrationCardProps) {
    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-slate-50/50 dark:bg-black/20 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-100 dark:border-slate-700">
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{title}</h3>
                            {isConnected && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 gap-1 pl-1 pr-2 h-5 text-xs">
                                    <CheckCircle2 className="h-3 w-3" /> Connected
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                    </div>
                </div>
                <Button
                    variant={isConnected ? "outline" : "default"}
                    size="sm"
                    onClick={isConnected ? onDisconnect : onConnect}
                    disabled={isLoading}
                    className="min-w-[100px]"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isConnected ? (
                        "Disconnect"
                    ) : (
                        "Connect"
                    )}
                </Button>
            </div>
            {isConnected && children && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    {children}
                </div>
            )}
        </div>
    );
}

export function IntegrationsSettings() {
    const [connections, setConnections] = useState({
        googleCalendar: false,
        outlookCalendar: false,
        github: false,
        linkedin: false,
    });

    const [settings, setSettings] = useState({
        autoSchedule: true,
        autoPostCertifications: true,
    });

    const [loading, setLoading] = useState<string | null>(null);

    const handleConnect = (key: keyof typeof connections) => {
        setLoading(key);
        // Simulate API call
        setTimeout(() => {
            setConnections(prev => ({ ...prev, [key]: true }));
            toast.success(`Successfully connected to ${key.replace(/([A-Z])/g, ' $1').trim()}`);
            setLoading(null);
        }, 1500);
    };

    const handleDisconnect = (key: keyof typeof connections) => {
        setConnections(prev => ({ ...prev, [key]: false }));
        toast.info(`Disconnected from ${key.replace(/([A-Z])/g, ' $1').trim()}`);
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success("Preference updated");
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Calendar Sync</h3>
                    <p className="text-sm text-muted-foreground mt-1">Sync your study schedule with your personal calendar.</p>
                </div>

                <IntegrationCard
                    title="Google Calendar"
                    description="Automatically add study blocks to your Google Calendar."
                    icon={<Calendar className="h-6 w-6 text-red-500" />}
                    isConnected={connections.googleCalendar}
                    onConnect={() => handleConnect("googleCalendar")}
                    onDisconnect={() => handleDisconnect("googleCalendar")}
                    isLoading={loading === "googleCalendar"}
                >
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-schedule-google" className="text-sm font-medium">Auto-schedule Study Blocks</Label>
                        <Switch
                            id="auto-schedule-google"
                            checked={settings.autoSchedule}
                            onCheckedChange={() => toggleSetting("autoSchedule")}
                        />
                    </div>
                </IntegrationCard>

                <IntegrationCard
                    title="Outlook Calendar"
                    description="Sync study sessions with your Outlook Calendar."
                    icon={<Calendar className="h-6 w-6 text-blue-500" />}
                    isConnected={connections.outlookCalendar}
                    onConnect={() => handleConnect("outlookCalendar")}
                    onDisconnect={() => handleDisconnect("outlookCalendar")}
                    isLoading={loading === "outlookCalendar"}
                >
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-schedule-outlook" className="text-sm font-medium">Auto-schedule Study Blocks</Label>
                        <Switch
                            id="auto-schedule-outlook"
                            checked={settings.autoSchedule}
                            onCheckedChange={() => toggleSetting("autoSchedule")}
                        />
                    </div>
                </IntegrationCard>
            </div>

            <div className="space-y-4">
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Social Connections</h3>
                    <p className="text-sm text-muted-foreground mt-1">Share your achievements and display your skills.</p>
                </div>

                <IntegrationCard
                    title="GitHub"
                    description="Link your GitHub to verify coding skills and activity."
                    icon={<Github className="h-6 w-6" />}
                    isConnected={connections.github}
                    onConnect={() => handleConnect("github")}
                    onDisconnect={() => handleDisconnect("github")}
                    isLoading={loading === "github"}
                >
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="display-badge-github" className="text-sm font-medium">Display Verified Skills Badge</Label>
                        <Switch
                            id="display-badge-github"
                            checked={true}
                            disabled
                        />
                    </div>
                </IntegrationCard>

                <IntegrationCard
                    title="LinkedIn"
                    description="Auto-post certifications when you complete a path."
                    icon={<Linkedin className="h-6 w-6 text-blue-600" />}
                    isConnected={connections.linkedin}
                    onConnect={() => handleConnect("linkedin")}
                    onDisconnect={() => handleDisconnect("linkedin")}
                    isLoading={loading === "linkedin"}
                >
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-post-linkedin" className="text-sm font-medium">Auto-post Certifications</Label>
                        <Switch
                            id="auto-post-linkedin"
                            checked={settings.autoPostCertifications}
                            onCheckedChange={() => toggleSetting("autoPostCertifications")}
                        />
                    </div>
                </IntegrationCard>
            </div>
        </div>
    );
}
