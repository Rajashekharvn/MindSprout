import { ShellLayout } from "@/components/layout/ShellLayout";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function AppShell({ children }: { children: React.ReactNode }) {
    const user = await checkUser();

    if (!user) {
        redirect("/sign-in");
    }

    const streakCount = user ? user.streakCount : 0;

    return (
        <ShellLayout streakCount={streakCount}>
            {children}
        </ShellLayout>
    );
}
