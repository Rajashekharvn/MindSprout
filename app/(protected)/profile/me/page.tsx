"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyProfileRedirect() {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            router.push(`/profile/${userId}`);
        } else {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="flex h-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
    );
}
