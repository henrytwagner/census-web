"use client";

import { useState } from "react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const username = String(formData.get("username") || "");
        const password = String(formData.get("password") || "");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        setLoading(false);
        if (res.ok) {
            const next = new URLSearchParams(window.location.search).get("next") || "/dashboard";
            window.location.href = next;
        } else {
            const msg = await res.text();
            setError(msg || "Login failed");
        }
    }

    return (
        <main className="mx-auto mt-24 max-w-sm p-6">
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <input name="username" placeholder="Username" className="w-full rounded border p-2" />
                <input name="password" type="password" placeholder="Password" className="w-full rounded border p-2" />
                <button
                    disabled={loading}
                    className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </main>
    );
}
