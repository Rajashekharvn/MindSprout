import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import { DashboardClientWrapper } from "@/components/wrappers/DashboardClientWrapper";
import { db } from "@/lib/db";
import { getRecommendations } from "@/lib/ai-actions";

export default async function DashboardPage() {
  const user = await checkUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Parallel Data Fetching
  const [rawPaths, quizAttempts, completedResources, goals, recommendations] = await Promise.all([
    // 1. Fetch Paths
    db.learningPath.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        resources: {
          select: { isCompleted: true }
        }
      }
    }),
    // 2. Fetch Quiz Attempts
    db.quizAttempt.findMany({
      where: { userId: user.id },
      include: {
        quiz: {
          select: {
            path: { select: { title: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    }),
    // 3. Fetch Completed Resources
    db.resource.findMany({
      where: {
        path: { userId: user.id },
        isCompleted: true
      },
      select: {
        id: true,
        updatedAt: true,
        path: {
          select: { title: true, category: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    }),
    // 4. Fetch Goals
    db.goal.findMany({
      where: { userId: user.id, isCompleted: false },
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    // 5. Fetch Recommendations
    getRecommendations()
  ]);

  // Transform Data
  const paths = rawPaths.map((path) => ({
    ...path,
    _count: {
      resources: path.resources.length
    },
    completedCount: path.resources.filter((r) => r.isCompleted).length
  }));

  const formattedQuizAttempts = quizAttempts.map(q => ({
    ...q,
    quiz: { path: { title: q.quiz.path.title } }
  }));

  return (
    <div className="space-y-8">
      <DashboardClientWrapper
        user={user}
        paths={paths}
        analytics={{
          quizAttempts: formattedQuizAttempts,
          completedResources
        }}
        goals={goals}
        recommendations={recommendations}
      />
    </div>
  );
}
