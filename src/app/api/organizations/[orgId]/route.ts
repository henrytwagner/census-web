// src/app/api/organizations/[orgId]/route.ts
import { cookies } from "next/headers";

const backend = process.env.BACKEND_URL || "http://localhost:8080";

export async function GET(
  _req: Request,
  context: { params: Promise<{ orgId: string }> }  
) {
  const { orgId } = await context.params;  
  const token = (await cookies()).get("ACCESS_TOKEN")?.value;

  const headers = new Headers({ Accept: "application/json" });
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const resp = await fetch(`${backend}/api/organizations/${orgId}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await resp.text();
  if (!resp.ok) {
    return new Response(text || "Org fetch failed", {
      status: resp.status,
      headers: { "content-type": resp.headers.get("content-type") ?? "text/plain" },
    });
  }

  return new Response(text, {
    status: 200,
    headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
  });
}
