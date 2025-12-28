import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const LEVELS = [
    { level: 1, xp: 0 },
    { level: 2, xp: 100 },
    { level: 3, xp: 300 },
    { level: 4, xp: 600 },
    { level: 5, xp: 1000 },
    { level: 6, xp: 1500 },
    { level: 7, xp: 2100 },
    { level: 8, xp: 2800 },
    { level: 9, xp: 3600 },
    { level: 10, xp: 4500 }, // Max level for now
];

export async function awardXp(userId: string, amount: number) {
    try {
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) return;

        const newXp = user.xp + amount;
        let newLevel = user.level;

        // Check for level up
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (newXp >= LEVELS[i].xp) {
                newLevel = Math.max(newLevel, LEVELS[i].level);
                break;
            }
        }

        await db.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                level: newLevel,
            },
        });

        // Revalidate to show new XP/Level in UI
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Error awarding XP:", error);
    }
}

export async function checkAchievements(userId: string, trigger: 'QUIZ_COMPLETED' | 'RESOURCE_COMPLETED' | 'STREAK_UPDATE') {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                achievements: { select: { achievementId: true } },
                quizAttempt: { orderBy: { createdAt: 'desc' }, take: 10 },
            }
        });
        if (!user) return;

        const ownedAchievementIds = new Set(user.achievements.map(ua => ua.achievementId));
        const allAchievements = await db.achievement.findMany();

        const newAchievements = [];

        for (const achievement of allAchievements) {
            if (ownedAchievementIds.has(achievement.id)) continue;

            let earned = false;

            switch (achievement.condition) {
                case 'STREAK_7':
                    if (user.streakCount >= 7) earned = true;
                    break;
                case 'PERFECT_SCORE':
                    // Check if the LATEST quiz attempt was perfect
                    // This is a simplification; ideally pass the specific attempt
                    if (trigger === 'QUIZ_COMPLETED' && user.quizAttempt.length > 0 && user.quizAttempt[0].score === user.quizAttempt[0].totalQuestions) {
                        earned = true;
                    }
                    break;
                case 'NIGHT_OWL':
                    const hour = new Date().getHours();
                    if (hour >= 22 || hour < 4) earned = true;
                    break;
                case 'EARLY_BIRD':
                    const morningHour = new Date().getHours();
                    if (morningHour >= 4 && morningHour < 7) earned = true;
                    break;
                case 'QUIZ_MASTER_10':
                    if (user.quizAttempt.length >= 10) earned = true;
                    break;
            }

            if (earned) {
                newAchievements.push(achievement);
            }
        }

        // Award new achievements
        for (const achievement of newAchievements) {
            await db.userAchievement.create({
                data: {
                    userId,
                    achievementId: achievement.id,
                }
            });
            // Bonus XP for achievement
            await awardXp(userId, achievement.xpValue);
        }

        if (newAchievements.length > 0) {
            revalidatePath("/dashboard");
        }

        return newAchievements;

    } catch (error) {
        console.error("Error checking achievements:", error);
        return [];
    }
}
