import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backend =
    process.env.BACKEND_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:8080";

export async function GET(
    _req: Request,
) {
    const token = (await cookies()).get("ACCESS_TOKEN")?.value;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const headers = new Headers({ Accept: "application/json" });
        if (token) headers.set("Authorization", `Bearer ${token}`);

        const resp = await fetch(`${backend}/api/contacts`, {
            method: "GET",
            headers,            // ✅ concrete Headers
            cache: "no-store",
        });

        const text = await resp.text();

        if (!resp.ok) {
            return new Response(text || "Contacts fetch failed", {
                status: resp.status,
                headers: {
                    "content-type": resp.headers.get("content-type") ?? "application/json",
                },
            });
        }

        return new Response(text, {
            status: 200,
            headers: {
                "content-type": resp.headers.get("content-type") ?? "application/json",
            },
        });
    } catch (e: unknown) {
        console.error("Contacts BFF GET error:", e);
        const msg = e instanceof Error ? e.message : "Contacts proxy error";
        return NextResponse.json({ error: msg }, { status: 502 });
    }
}
