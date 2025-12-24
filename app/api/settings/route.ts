import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";

export async function GET() {
    const user = await checkUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(user);
}
