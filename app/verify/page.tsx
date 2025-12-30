import { VerifyForm } from "@/components/auth/VerifyForm";
import { Suspense } from "react";

export default function VerifyPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <Suspense>
                <VerifyForm />
            </Suspense>
        </div>
    );
}
