import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { getRecommendations } from "@/lib/ai-actions";

export async function GET() {
    const user = await checkUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const rawPaths = await db.learningPath.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                updatedAt: "desc", // Sort by recently updated
            },
            include: {
                resources: {
                    select: {
                        isCompleted: true
                    }
                }
            }
        });

        // Transform data to include counts
        const paths = rawPaths.map((path) => ({
            ...path,
            _count: {
                resources: path.resources.length
            },
            completedCount: path.resources.filter((r) => r.isCompleted).length
        }));

        // Analytics Data Fetching
        const quizAttempts = await db.quizAttempt.findMany({
            where: { userId: user.id },
            include: {
                quiz: {
                    select: {
                        path: {
                            select: { title: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to last 50 for performance
        });

        const completedResources = await db.resource.findMany({
            where: {
                path: { userId: user.id },
                isCompleted: true
            },
            select: {
                id: true,
                updatedAt: true,
                path: {
                    select: {
                        title: true,
                        category: true
                    }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        // Fetch Goals
        const goals = await db.goal.findMany({
            where: { userId: user.id, isCompleted: false },
            orderBy: { createdAt: 'desc' },
            take: 3
        });

        // Fetch AI Recommendations
        const recommendations = await getRecommendations();

        return NextResponse.json({
            paths,
            analytics: {
                quizAttempts: quizAttempts.map(q => ({
                    ...q,
                    quiz: { path: { title: q.quiz.path.title } }
                })),
                completedResources
            },
            goals,
            recommendations
        });
    } catch (error) {
        console.error("Dashboard API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
