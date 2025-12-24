import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { SettingsClientWrapper } from "@/components/SettingsClientWrapper";

export default async function SettingsPage() {
    const user = await checkUser();

    if (!user) {
        redirect("/sign-in");
    }

    return <SettingsClientWrapper />;
}
