// src/app/api/organizations/[orgId]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backend =
  process.env.BACKEND_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:8080";

export async function GET(
  _req: Request,
  ctx: { params: { orgId: string } }
) {
  const { orgId } = await ctx.params;

  const token = (await cookies()).get("ACCESS_TOKEN")?.value;
  const headers = new Headers({ Accept: "application/json" });
  if (token) headers.set("Authorization", `Bearer ${token}`);

  try {
    const resp = await fetch(`${backend}/api/organizations/${encodeURIComponent(orgId)}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const text = await resp.text();

    if (!resp.ok) {
      return new Response(text || "Organization fetch failed", {
        status: resp.status,
        headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
      });
    }

    return new Response(text, {
      status: 200,
      headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
    });
  } catch (e: unknown) {
    console.error("Organization BFF GET error:", e);
    const msg = e instanceof Error ? e.message : "Organization proxy error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
