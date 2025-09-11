// src/app/api/user-contact-links/by-user/[userId]/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const backend =
  process.env.BACKEND_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:8080";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ userId: string }> }   // ⇐ params is a Promise
) {
  const { userId } = await ctx.params; 
  const token = (await cookies()).get("ACCESS_TOKEN")?.value;

  try {
    const headers = new Headers({ Accept: "application/json" });
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const resp = await fetch(
      `${backend}/api/user-contact-links/by-user/${userId}`,
      { method: "GET", headers, cache: "no-store" }
    );

    const body = await resp.text();
    return new Response(body, {
      status: resp.status,
      headers: {
        "content-type":
          resp.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error("BFF by-user error:", e);
    const msg = e instanceof Error ? e.message : "Proxy error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
