import { cache } from "react";
import { cookies } from "next/headers";

// Mock implementation to satisfy build
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    xp: number;
    streakCount: number;
    userId: string;
}

export const checkUser = cache(async (): Promise<User | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return null;
    }

    try {
        let baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/auth";
        if (baseUrl.endsWith('/auth')) {
            baseUrl = baseUrl.substring(0, baseUrl.length - 5);
        }
        if (baseUrl.endsWith('/')) {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }
        const apiUrl = `${baseUrl}/users/me`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            cache: 'no-store' // Ensure fresh data
        });

        if (!response.ok) {
            console.error("Failed to fetch user:", response.status, response.statusText);
            return null;
        }

        const backendUser = await response.json();

        // Map Backend User to Frontend User Interface
        // Backend: { id, name, email, ... }
        // Frontend: { id, firstName, lastName, ... }

        const fullName = backendUser.name || "Guest User";
        const [firstName, ...lastNameParts] = fullName.split(' ');
        const lastName = lastNameParts.join(' ');

        return {
            id: backendUser.id,
            firstName: firstName || "Guest",
            lastName: lastName || "",
            email: backendUser.email,
            xp: 100, // Default for now
            streakCount: 1, // Default for now
            userId: backendUser.id
        };
    } catch (error) {
        console.error("Error fetching user from backend:", error);
        return null;
    }
});
