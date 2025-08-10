import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backend = process.env.BACKEND_URL!;

export async function GET() {
  const token = (await cookies()).get("ACCESS_TOKEN")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resp = await fetch(`${backend}/api/auth/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const text = await resp.text();
  return new NextResponse(text, {
    status: resp.status,
    headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
  });
}
