import { NextResponse } from "next/server";

const backend = process.env.BACKEND_URL;
const springHealthPath = "/actuator/health";

export async function GET() {
    if (!backend) {
        return NextResponse.json({ status: "DOWN", error: "BACKEND_URL is not configured" }, { status: 500 });
    }

    try {
        const resp = await fetch(`${backend}${springHealthPath}`, {
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        const text = await resp.text();
        return new NextResponse(text, {
            status: resp.status,
            headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
        });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Proxy error";
        return NextResponse.json({ status: 503, error: msg });
    }
}
