"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Trophy, Lock } from "lucide-react";

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpValue: number;
    condition: string;
}

interface TrophyRoomProps {
    achievements: Achievement[];
    userAchievements: string[]; // List of achievement IDs owned by user
}

export function TrophyRoom({ achievements, userAchievements }: TrophyRoomProps) {
    const ownedSet = new Set(userAchievements);

    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Trophy Room
                </CardTitle>
                <CardDescription>
                    Your collection of badges and milestones.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                    {achievements.map((achievement) => {
                        const isUnlocked = ownedSet.has(achievement.id);

                        return (
                            <TooltipProvider key={achievement.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={cn(
                                            "aspect-square rounded-xl flex flex-col items-center justify-center p-2 border-2 transition-all cursor-default",
                                            isUnlocked
                                                ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                                                : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60 grayscale"
                                        )}>
                                            <div className="text-3xl mb-1 filter drop-shadow-sm">
                                                {isUnlocked ? achievement.icon : "🔒"}
                                            </div>
                                            <span className="text-[10px] text-center font-medium leading-tight line-clamp-2">
                                                {achievement.name}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="text-xs max-w-[200px]">
                                            <p className="font-bold mb-1">{achievement.name}</p>
                                            <p className="text-slate-500 dark:text-slate-400 mb-1">{achievement.description}</p>
                                            <p className="text-amber-600 font-semibold">+{achievement.xpValue} XP</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
