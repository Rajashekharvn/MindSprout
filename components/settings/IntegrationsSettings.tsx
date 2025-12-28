"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
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
    const { user, isLoaded } = useUser();

    // Simulations for Calendar (until we have real OAuth clients)
    const [simulatedConnections, setSimulatedConnections] = useState({
        googleCalendar: false,
        outlookCalendar: false,
        linkedin: false,
    });

    const [settings, setSettings] = useState({
        autoSchedule: true,
        autoPostCertifications: true,
    });

    const [loadingAction, setLoadingAction] = useState<string | null>(null);

    // --- Real GitHub Integration ---
    const githubAccount = user?.externalAccounts.find((a) => a.provider === "github");
    const isGithubConnected = !!githubAccount;

    const handleConnectGithub = async () => {
        if (!user) return;
        setLoadingAction("github");
        try {
            const resource = await user.createExternalAccount({
                strategy: "oauth_github",
                redirectUrl: typeof window !== "undefined" ? window.location.href : "/dashboard/settings",
            });

            if (resource.verification?.externalVerificationRedirectURL) {
                window.location.href = resource.verification.externalVerificationRedirectURL.toString();
            }
        } catch (error: any) {
            console.error("GitHub Connect Error:", error);
            toast.error(error.message || "Failed to initiate GitHub connection");
            setLoadingAction(null);
        }
    };

    const handleDisconnectGithub = async () => {
        if (!githubAccount) return;
        setLoadingAction("github");
        try {
            await githubAccount.destroy();
            toast.success("Disconnected from GitHub");
            // Auto-refresh handled by Clerk, but we clear loading
        } catch (error: any) {
            toast.error("Failed to disconnect GitHub");
            console.error(error);
        } finally {
            setLoadingAction(null);
        }
    };
    // -------------------------------

    const handleSimulatedConnect = (key: keyof typeof simulatedConnections) => {
        setLoadingAction(key);
        // Simulate API call
        setTimeout(() => {
            setSimulatedConnections(prev => ({ ...prev, [key]: true }));
            toast.success(`Successfully connected to ${key.replace(/([A-Z])/g, ' $1').trim()}`);
            setLoadingAction(null);
        }, 1500);
    };

    const handleSimulatedDisconnect = (key: keyof typeof simulatedConnections) => {
        setSimulatedConnections(prev => ({ ...prev, [key]: false }));
        toast.info(`Disconnected from ${key.replace(/([A-Z])/g, ' $1').trim()}`);
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success("Preference updated");
    };

    if (!isLoaded) return <div>Loading settings...</div>;

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
                    isConnected={simulatedConnections.googleCalendar}
                    onConnect={() => handleSimulatedConnect("googleCalendar")}
                    onDisconnect={() => handleSimulatedDisconnect("googleCalendar")}
                    isLoading={loadingAction === "googleCalendar"}
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
                    isConnected={simulatedConnections.outlookCalendar}
                    onConnect={() => handleSimulatedConnect("outlookCalendar")}
                    onDisconnect={() => handleSimulatedDisconnect("outlookCalendar")}
                    isLoading={loadingAction === "outlookCalendar"}
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
                    isConnected={isGithubConnected}
                    onConnect={handleConnectGithub}
                    onDisconnect={handleDisconnectGithub}
                    isLoading={loadingAction === "github"}
                >
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="display-badge-github" className="text-sm font-medium">Display Verified Skills Badge</Label>
                            {isGithubConnected && (
                                <p className="text-xs text-muted-foreground">Connected as {githubAccount?.username || "user"}</p>
                            )}
                        </div>
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
                    isConnected={simulatedConnections.linkedin}
                    onConnect={() => handleSimulatedConnect("linkedin")}
                    onDisconnect={() => handleSimulatedDisconnect("linkedin")}
                    isLoading={loadingAction === "linkedin"}
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
