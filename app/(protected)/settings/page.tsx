import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { SettingsClientWrapper } from "@/components/wrappers/SettingsClientWrapper";

export default async function SettingsPage() {
    const user = await checkUser();

    if (!user) {
        redirect("/login");
    }

    return <SettingsClientWrapper />;
}
