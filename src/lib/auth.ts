import "server-only";
import { cookies } from "next/headers";

export type Me = { id: string; username: string; email: string; roles?: string[] };

export async function getUser(): Promise<Me | null> {
    const token = (await cookies()).get("ACCESS_TOKEN")?.value;
    if (!token) return null;

    const backend = process.env.BACKEND_URL; // e.g., http://localhost:8080
    if (!backend) throw new Error("BACKEND_URL not configured");

    // Call Spring directly; let Spring validate JWT
    const resp = await fetch(`${backend}/api/auth/me`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!resp.ok) {
        // 401 means token missing/expired/invalid
        return null;
    }
    return (await resp.json()) as Me;
}
