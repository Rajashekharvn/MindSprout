import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";

export async function GET() {
    const user = await checkUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const userPaths = await db.learningPath.findMany({
            where: {
                userId: user.id
            },
            select: {
                id: true,
                clonedFromId: true
            }
        });

        const excludedPathIds = new Set(userPaths.map((p) => p.id));
        userPaths.forEach((p) => {
            if (p.clonedFromId) excludedPathIds.add(p.clonedFromId);
        });

        const myPublicPaths = await db.learningPath.findMany({
            where: {
                userId: user.id,
                isPublic: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: { resources: true, stars: true }
                },
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                stars: {
                    where: { userId: user.id },
                    select: { id: true }
                }
            }
        });

        const communityPaths = await db.learningPath.findMany({
            where: {
                isPublic: true,
                id: {
                    notIn: Array.from(excludedPathIds)
                },
                user: {
                    isPrivate: false
                }
            },

            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: { resources: true, stars: true }
                },
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                stars: {
                    where: { userId: user.id },
                    select: { id: true }
                }
            }
        });

        // Transform to include isStarred
        const processPaths = (paths: any[]) => paths.map(path => ({
            ...path,
            isStarred: path.stars.length > 0
        }));

        return NextResponse.json({
            myPublicPaths: processPaths(myPublicPaths),
            communityPaths: processPaths(communityPaths)
        });

    } catch (error) {
        console.error("Explore API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
