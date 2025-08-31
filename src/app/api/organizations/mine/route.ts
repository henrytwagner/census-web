// src/app/api/organizations/mine/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backend =
    process.env.BACKEND_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:8080";

export async function GET() {
    const token = (await cookies()).get("ACCESS_TOKEN")?.value;

    const headers = new Headers({ Accept: "application/json" });
    if (token) headers.set("Authorization", `Bearer ${token}`);

    try {
        // 1) who am I?
        const meResp = await fetch(`${backend}/api/auth/me`, {
            method: "GET",
            headers,
            cache: "no-store",
        });
        const meText = await meResp.text();
        if (!meResp.ok) {
            return new Response(meText || "Failed to resolve current user", {
                status: meResp.status,
                headers: { "content-type": meResp.headers.get("content-type") ?? "application/json" },
            });
        }
        let me: { id: string };
        try {
            me = JSON.parse(meText);
        } catch {
            return NextResponse.json({ error: "Unexpected /auth/me response" }, { status: 502 });
        }
        if (!me?.id) {
            return NextResponse.json({ error: "User id missing from /auth/me" }, { status: 502 });
        }

        // 2) fetch orgs for that user
        const orgResp = await fetch(`${backend}/api/memberships/user/${encodeURIComponent(me.id)}`, {
            method: "GET",
            headers,
            cache: "no-store",
        });
        const orgText = await orgResp.text();
        if (!orgResp.ok) {
            return new Response(orgText || "Failed to load organizations", {
                status: orgResp.status,
                headers: { "content-type": orgResp.headers.get("content-type") ?? "application/json" },
            });
        }

        return new Response(orgText, {
            status: 200,
            headers: { "content-type": orgResp.headers.get("content-type") ?? "application/json" },
        });
    } catch (e) {
        console.error("organizations/mine error:", e);
        const msg = e instanceof Error ? e.message : "Organizations proxy error";
        return NextResponse.json({ error: msg }, { status: 502 });
    }
}
