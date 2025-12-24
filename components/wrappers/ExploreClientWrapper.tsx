"use client";

import useSWR from "swr";
import { ExploreView } from "@/components/explore/ExploreView";
import { Loader } from "@/components/ui/loader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ExploreClientWrapper() {
    const { data, error, isLoading } = useSWR("/api/explore", fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
    });

    if (error) return <div className="text-center p-10 text-red-500">Failed to load explore data.</div>;

    if (isLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader size="xl" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <main className="flex-1">
                <ExploreView
                    communityPaths={data.communityPaths}
                    myPublicPaths={data.myPublicPaths}
                />
            </main>
        </div>
    );
}
