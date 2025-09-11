import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backend = process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  const token = (await cookies()).get("ACCESS_TOKEN")?.value;
  const headers = new Headers({ Accept: "application/json" });
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const resp = await fetch(`${backend}/api/organizations/${params.orgId}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await resp.text();
  if (!resp.ok) {
    return new Response(text || "Org fetch failed", { status: resp.status });
  }
  return new Response(text, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
