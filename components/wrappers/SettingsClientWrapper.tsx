"use client";

import useSWR from "swr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { DeleteAccountSection } from "@/components/settings/DeleteAccountSection";
import { PrivacySection } from "@/components/settings/PrivacySection";
import { DataExportSection } from "@/components/settings/DataExportSection";
import { SettingsSkeleton } from "@/components/ui/skeletons";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SettingsClientWrapper() {
    const { data: user, error, isLoading } = useSWR("/api/settings", fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
    });

    if (error) return <div className="text-center p-10 text-red-500">Failed to load settings.</div>;

    if (isLoading) {
        return <SettingsSkeleton />;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto py-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-lg h-auto">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Profile</TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Integrations</TabsTrigger>
                    <TabsTrigger value="appearance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Appearance</TabsTrigger>
                    <TabsTrigger value="privacy" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Privacy</TabsTrigger>
                    <TabsTrigger value="account" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm rounded-md transition-all text-xs md:text-sm">Account</TabsTrigger>
                </TabsList>

                {/* PROFILE TAB */}
                <TabsContent value="profile" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Update your personal information, bio, and study goals.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProfileForm
                                user={{
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    bio: user.bio,
                                    dailyGoal: user.dailyGoal
                                }}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* NOTIFICATIONS TAB */}
                <TabsContent value="notifications" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Choose what communications you want to receive.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <NotificationSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* INTEGRATIONS TAB */}
                <TabsContent value="integrations" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription>
                                Connect your favorite tools to supercharge your learning.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <IntegrationsSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* APPEARANCE TAB */}
                <TabsContent value="appearance" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the look and feel of the application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AppearanceSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PRIVACY TAB */}
                <TabsContent value="privacy" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Privacy</CardTitle>
                            <CardDescription>
                                Manage your public visibility and data settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PrivacySection isPrivate={user.isPrivate} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ACCOUNT TAB */}
                <TabsContent value="account" className="mt-6">
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Manage your account access and data.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <DataExportSection />
                            <DeleteAccountSection />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
