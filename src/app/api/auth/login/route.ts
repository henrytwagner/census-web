import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backend = process.env.BACKEND_URL!;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const resp = await fetch(`${backend}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(body),
        });

        const text = await resp.text();
        if (!resp.ok) {
            return new NextResponse(text || JSON.stringify({ error: "Login failed" }), {
                status: resp.status,
                headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
            });
        }

        const data = JSON.parse(text) as { token: string };
        (await cookies()).set({
            name: "ACCESS_TOKEN",
            value: data.token,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return NextResponse.json({ ok: true });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Login proxy error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
