
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import { ExploreClientWrapper } from "@/components/wrappers/ExploreClientWrapper";

export default async function ExplorePage() {
    const user = await checkUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return <ExploreClientWrapper />;
}
