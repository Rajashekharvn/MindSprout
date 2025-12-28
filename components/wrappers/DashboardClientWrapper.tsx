"use client";

import { DashboardView } from "@/components/dashboard/DashboardView";

interface DashboardClientWrapperProps {
    user: any;
    paths: any[];
    analytics: any;
    goals: any[];
    recommendations: any[];
    gamification: {
        achievements: any[];
        userAchievementIds: string[];
        leaderboard: any[];
    };
}

export function DashboardClientWrapper({ user, paths, analytics, goals, recommendations, gamification }: DashboardClientWrapperProps) {
    return (
        <DashboardView
            user={user}
            paths={paths}
            analytics={analytics}
            goals={goals}
            recommendations={recommendations}
            gamification={gamification}
        />
    );
}
