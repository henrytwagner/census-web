import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backend =
  process.env.BACKEND_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:8080"; // safe fallback for dev

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { username, email, password }
    const resp = await fetch(`${backend}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    const text = await resp.text();
    if (!resp.ok) {
      return new NextResponse(text || JSON.stringify({ error: "Registration failed" }), {
        status: resp.status,
        headers: { "content-type": resp.headers.get("content-type") ?? "application/json" },
      });
    }

    // Spring returns { token: "..." }
    const { token } = JSON.parse(text) as { token: string };

    // Set HttpOnly cookie
    (await cookies()).set({
      name: "ACCESS_TOKEN",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Register proxy error" }, { status: 500 });
  }
}
