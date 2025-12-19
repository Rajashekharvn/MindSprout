"use client";

import { useState } from "react";
import { User, Calendar, FileText, UserMinus, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserListDialog } from "@/components/UserListDialog";
import { CreatePathDialog } from "@/components/CreatePathDialog";
import { toggleFollow } from "@/lib/actions";
import { toast } from "sonner";

interface userProfile {
    firstName: string | null;
    lastName: string | null;
    id: string;
    createdAt: Date;
}

interface ProfileHeaderProps {
    user: userProfile;
    stats: {
        followers: number;
        following: number;
        paths: number;
        stars: number;
    };
    isFollowing: boolean;
    isOwnProfile: boolean;
}

export function ProfileHeader({ user, stats, isFollowing: initialIsFollowing, isOwnProfile }: ProfileHeaderProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followerCount, setFollowerCount] = useState(stats.followers);
    const [isLoading, setIsLoading] = useState(false);

    const handleFollow = async () => {
        setIsLoading(true);

        // Optimistic Updates
        const newIsFollowing = !isFollowing;
        setIsFollowing(newIsFollowing);
        setFollowerCount(prev => newIsFollowing ? prev + 1 : prev - 1);

        try {
            await toggleFollow(user.id);
        } catch (error) {
            // Revert on failure
            setIsFollowing(!newIsFollowing);
            setFollowerCount(prev => !newIsFollowing ? prev + 1 : prev - 1);
            toast.error("Failed to update follow status");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-zinc-800 shadow-xl shrink-0">
                {user.firstName?.[0] || "U"}
            </div>

            <div className="flex-1 text-center md:text-left space-y-4 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-2 text-sm">
                            <Calendar className="w-4 h-4" />
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {!isOwnProfile ? (
                        <Button
                            onClick={handleFollow}
                            disabled={isLoading}
                            variant={isFollowing ? "outline" : "default"}
                            className={isFollowing ? "border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : isFollowing ? (
                                <UserMinus className="w-4 h-4 mr-2" />
                            ) : (
                                <UserPlus className="w-4 h-4 mr-2" />
                            )}
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    ) : (
                        <CreatePathDialog />
                    )}
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-center md:justify-start gap-6 md:gap-12 pt-2 border-t border-slate-100 dark:border-zinc-800/50">
                    <UserListDialog
                        userId={user.id}
                        type="followers"
                        count={followerCount}
                        trigger={
                            <button className="text-center md:text-left hover:opacity-75 transition-opacity">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{followerCount}</p>
                                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">Followers</p>
                            </button>
                        }
                    />
                    <UserListDialog
                        userId={user.id}
                        type="following"
                        count={stats.following}
                        trigger={
                            <button className="text-center md:text-left hover:opacity-75 transition-opacity">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.following}</p>
                                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">Following</p>
                            </button>
                        }
                    />
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.paths}</p>
                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">Public Paths</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.stars}</p>
                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">Total Stars</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
