import { cache } from "react";
import { db } from "@/lib/db";

// Mock implementation to satisfy build
export const checkUser = cache(async () => {
    return null;
});
