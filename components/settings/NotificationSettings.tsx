"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export function NotificationSettings() {
    const [settings, setSettings] = useState({
        emailUpdates: true,
        marketingEmails: false,
        securityAlerts: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            toast.success("Notification preferences updated");
            return newState;
        });
        // In a real app, you would call a server action here to persist changes
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-slate-50/50 dark:bg-black/20 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-indigo-500" />
                    <div className="space-y-0.5">
                        <Label className="text-base font-medium">Email Updates</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive daily digests and course progress updates.
                        </p>
                    </div>
                </div>
                <Switch
                    checked={settings.emailUpdates}
                    onCheckedChange={() => handleToggle("emailUpdates")}
                />
            </div>

            <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-slate-50/50 dark:bg-black/20 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <Bell className="mt-1 h-5 w-5 text-indigo-500" />
                    <div className="space-y-0.5">
                        <Label className="text-base font-medium">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive emails about new features and special offers.
                        </p>
                    </div>
                </div>
                <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={() => handleToggle("marketingEmails")}
                />
            </div>

            <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-slate-50/50 dark:bg-black/20 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <ShieldAlert className="mt-1 h-5 w-5 text-indigo-500" />
                    <div className="space-y-0.5">
                        <Label className="text-base font-medium">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                            Get notified about new sign-ins and suspicious activity.
                        </p>
                    </div>
                </div>
                <Switch
                    checked={settings.securityAlerts}
                    onCheckedChange={() => handleToggle("securityAlerts")}
                    disabled // Enforce security alerts
                />
            </div>
        </div>
    );
}
