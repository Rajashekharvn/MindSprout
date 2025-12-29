"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Crown, Medal } from "lucide-react";

interface LeaderboardUser {
    id: string;
    firstName: string | null;
    lastName: string | null;
    image?: string; // We might need to handle avatars later if not in user model
    xp: number; // This would be the weekly XP ideally
}

interface LeaderboardProps {
    users: LeaderboardUser[];
    currentUserId: string;
}

export function Leaderboard({ users, currentUserId }: LeaderboardProps) {
    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    Weekly Leaderboard
                </CardTitle>
                <CardDescription>
                    Top learners this week.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0 flex-1 overflow-y-auto min-h-0">
                <div className="space-y-1">
                    {users.map((user, index) => {
                        const rank = index + 1;
                        const isCurrentUser = user.id === currentUserId;

                        let rankIcon = null;
                        if (rank === 1) rankIcon = <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />;
                        else if (rank === 2) rankIcon = <Medal className="w-4 h-4 text-slate-400 fill-slate-400" />;
                        else if (rank === 3) rankIcon = <Medal className="w-4 h-4 text-amber-700 fill-amber-700" />;

                        return (
                            <div
                                key={user.id}
                                className={cn(
                                    "flex items-center px-4 py-3 gap-3 transition-colors",
                                    isCurrentUser ? "bg-slate-50 dark:bg-slate-800/50 border-l-4 border-l-primary" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                                )}
                            >
                                <div className="w-6 font-bold text-slate-400 text-center flex justify-center">
                                    {rankIcon || <span className="text-sm">{rank}</span>}
                                </div>
                                <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback className="text-xs">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className={cn("text-sm font-medium truncate", isCurrentUser && "text-primary")}>
                                        {user.firstName || "Anonymous"} {user.lastName}
                                        {isCurrentUser && " (You)"}
                                    </p>
                                </div>
                                <div className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-600 dark:text-slate-300">
                                    {user.xp} XP
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
