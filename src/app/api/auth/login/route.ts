// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

const backend =
    process.env.BACKEND_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:8080"; // safe fallback for dev

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const resp = await fetch(`${backend}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const text = await resp.text();

        // Pass through backend errors as-is (don't turn them into 500s)
        if (!resp.ok) {
            return new Response(text || JSON.stringify({ error: "Login failed" }), {
                status: resp.status,
                headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
            });
        }

        // Parse JSON only on success
        let token: string | undefined;
        try {
            const data = JSON.parse(text) as { token?: string };
            token = data.token;
        } catch {
            // backend didn't return JSON; treat as error
            return NextResponse.json({ error: "Unexpected backend response" }, { status: 502 });
        }
        if (!token) {
            return NextResponse.json({ error: "Token missing from backend" }, { status: 502 });
        }

        // Set cookie on the response object (recommended for Route Handlers)
        const res = NextResponse.json({ ok: true });
        res.cookies.set("ACCESS_TOKEN", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });
        return res;
    } catch (e: unknown) {
        console.error("Login route error:", e);
        const msg = e instanceof Error ? e.message : "Login proxy error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}