import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const jar = await cookies();
    jar.set({
        name: "ACCESS_TOKEN",
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    });
    return NextResponse.json({ ok: true });
}
