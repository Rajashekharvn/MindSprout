import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import { DashboardClientWrapper } from "@/components/wrappers/DashboardClientWrapper";

export default async function DashboardPage() {
  const user = await checkUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-8">
      <DashboardClientWrapper user={user} />
    </div>
  );
}
