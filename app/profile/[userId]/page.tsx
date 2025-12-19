import { getUserProfile } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ExploreCard } from "@/components/ExploreCard";
import { UserListDialog } from "@/components/UserListDialog";
import { CreatePathDialog } from "@/components/CreatePathDialog";
import { User, Users, FileText, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";

interface ProfilePageProps {
    params: Promise<{ userId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { userId } = await params;

    // Fetch profile data
    const profile = await getUserProfile(userId);
    if (!profile) return notFound();

    const { user, stats, paths, isFollowing } = profile;
    const currentUser = await checkUser();
    const isOwnProfile = currentUser?.id === user.id;

    // Check which paths current user already has
    let myPathIds = new Set<string>();
    if (currentUser) {
        const myPaths = await db.learningPath.findMany({
            where: { userId: currentUser.id },
            select: { clonedFromId: true, id: true }
        });
        myPaths.forEach(p => {
            if (p.clonedFromId) myPathIds.add(p.clonedFromId);
        });
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="p-4 md:p-8">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Header Card (Client Component for Optimistic UI) */}
                    <ProfileHeader
                        user={user}
                        stats={stats}
                        isFollowing={isFollowing}
                        isOwnProfile={isOwnProfile}
                    />

                    {/* Content Grid */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            Public Learning Paths
                        </h2>

                        {paths.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paths.map((path: any) => (
                                    <ExploreCard
                                        key={path.id}
                                        path={path}
                                        hasPath={myPathIds.has(path.id)}
                                        isOwner={isOwnProfile}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
                                <p className="text-slate-500">No public learning paths yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
