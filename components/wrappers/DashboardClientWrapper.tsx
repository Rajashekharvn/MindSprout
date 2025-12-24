"use client";

import useSWR from "swr";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { Loader } from "@/components/ui/loader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DashboardClientWrapperProps {
    user: any;
}

export function DashboardClientWrapper({ user }: DashboardClientWrapperProps) {
    const { data, error, isLoading } = useSWR("/api/dashboard", fetcher, {
        revalidateOnFocus: false, // Don't revalidate when tab is focused, keeps it stable
        dedupingInterval: 60000, // Cache for 1 minute
    });

    if (error) return <div className="text-center p-10 text-red-500">Failed to load dashboard data.</div>;

    if (isLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader size="xl" />
            </div>
        );
    }

    return (
        <DashboardView
            user={user}
            paths={data.paths}
            analytics={data.analytics}
            goals={data.goals}
            recommendations={data.recommendations}
        />
    );
}
