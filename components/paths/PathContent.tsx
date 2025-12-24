"use client";

import { useOptimistic } from "react";
import { ResourceCard } from "@/components/paths/ResourceCard";
import { AddResourceDialog } from "@/components/paths/AddResourceDialog";
import { deleteResource } from "@/lib/actions";
import { PathHero } from "@/components/paths/PathHero";
import { QuizHistory } from "@/components/quiz/QuizHistory";
import { Layout, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define Resource Type (matching ResourceCard's expectation)
type Resource = {
    id: string;
    title: string;
    url: string | null;
    content: string | null;
    type: string;
    isCompleted: boolean;
    pathId: string;
    summary: string | null;
    // ...
    quiz?: {
        id: string;
        questions: any;
    } | null;
    flashcards?: any[];
};

type Path = {
    id: string;
    title: string;
    description: string | null;
    category: string | null;
    difficulty: string | null;
    isPublic: boolean;
    userId: string;
    user?: {
        firstName: string | null;
        lastName: string | null;
    };
    resources: Resource[];
    quiz?: any;
    flashcards?: any;
    _count?: {
        resources: number;
        stars?: number;
    };
};

type Action =
    | { type: "ADD"; resource: Resource }
    | { type: "DELETE"; id: string };

export function PathContent({
    initialPath,
    quizHistory = []  // Default to empty array
}: {
    initialPath: Path;
    quizHistory?: any[]; // Using any[] for now to match passed data
}) {
    const [optimisticResources, setOptimisticResources] = useOptimistic(
        initialPath.resources,
        (state: Resource[], action: Action) => {
            switch (action.type) {
                case "ADD":
                    return [action.resource, ...state];
                case "DELETE":
                    return state.filter(r => r.id !== action.id);
                default:
                    return state;
            }
        }
    );

    const handleAddOptimistic = (newResource: Resource) => {
        setOptimisticResources({ type: "ADD", resource: newResource });
    };

    const handleDelete = async (resourceId: string) => {
        // 1. Optimistic Update (Immediate)
        setOptimisticResources({ type: "DELETE", id: resourceId });

        // 2. Server Action (Background)
        try {
            await deleteResource(resourceId, initialPath.id);
        } catch (error) {
            console.error("Failed to delete resource:", error);
        }
    };

    // Construct an optimistic path object to pass to PathHero
    const optimisticPath = {
        ...initialPath,
        resources: optimisticResources
    };

    return (
        <div className="min-h-screen">
            {/* 1. Hero Component with Optimistic Data */}
            <PathHero path={optimisticPath} backLink="/dashboard" />

            {/* 2. Tabbed Interface */}
            <Tabs defaultValue="curriculum" className="space-y-8">
                <TabsList className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 p-1 rounded-xl h-auto w-full md:w-fit grid grid-cols-2 md:inline-flex no-export">
                    <TabsTrigger value="curriculum" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm rounded-lg px-4 py-2.5">
                        <Layout className="w-4 h-4" /> Curriculum
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm rounded-lg px-4 py-2.5">
                        <BarChart3 className="w-4 h-4" /> Performance
                    </TabsTrigger>
                </TabsList>

                {/* TAB: Curriculum (Resources) */}
                <TabsContent value="curriculum" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    {/* Main Feed */}
                    <div className="w-full space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Learning Modules</h2>
                            <div className="no-export">
                                <AddResourceDialog
                                    pathId={initialPath.id}
                                    onAddOptimistic={handleAddOptimistic}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {optimisticResources.length === 0 ? (
                                <div className="p-12 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl text-center bg-white/50 dark:bg-zinc-900/30">
                                    <div className="max-w-md mx-auto space-y-2">
                                        <h3 className="text-lg font-medium text-slate-900 dark:text-foreground">Start your journey</h3>
                                        <p className="text-slate-500 dark:text-muted-foreground">Add your first resource to build this path.</p>
                                    </div>
                                </div>
                            ) : (
                                optimisticResources.map((resource, index) => (
                                    <div key={resource.id} className="relative pl-8 md:pl-0 group printable-module">
                                        {/* Connecting Line (Desktop) */}
                                        {index !== optimisticResources.length - 1 && (
                                            <div className="hidden md:block absolute left-8 top-16 bottom-0 w-0.5 bg-slate-200 dark:bg-zinc-800 -z-10 group-last:hidden" />
                                        )}

                                        <div className="md:pl-16 relative">
                                            {/* Number Badge */}
                                            <div className={`absolute left-0 top-6 hidden md:flex w-10 h-10 rounded-full items-center justify-center font-bold text-sm border-4 border-slate-50 dark:border-black z-10 transition-colors ${resource.isCompleted
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white dark:bg-zinc-800 text-slate-400 border-slate-100 dark:border-zinc-700'}`}>
                                                {index + 1}
                                            </div>
                                            <ResourceCard
                                                resource={resource}
                                                onDelete={() => handleDelete(resource.id)}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* TAB: Performance (Analytics) */}
                <TabsContent value="performance" className="focus-visible:outline-none focus-visible:ring-0">
                    {optimisticResources.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                            <QuizHistory history={quizHistory} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-200">
                            <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No Data Yet</h3>
                            <p>Complete resources and take quizzes to see your performance metrics here.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
