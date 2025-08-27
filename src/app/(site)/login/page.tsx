"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/lib/schemas";
import { normalizeAuthError } from "@/lib/errors";

export default function LoginPage() {
    const [formError, setFormError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (values: LoginForm) => {
        setFormError(null);
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (res.ok) {
            const next = new URLSearchParams(window.location.search).get("next") || "/c";
            window.location.href = next;
            return;
        }

        const raw = await res.text();
        const fieldErrors = normalizeAuthError(raw);

        // map specific fields if present (e.g., invalid credentials)
        (["username", "password"] as const).forEach((k) => {
            if (fieldErrors[k]) setError(k, { type: "server", message: fieldErrors[k] });
        });

        if (fieldErrors.form) setFormError(fieldErrors.form);
        else if (!Object.keys(fieldErrors).length) setFormError("Login failed");
    };

    return (
        <main className="mx-auto mt-24 max-w-sm p-6">
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                <div>
                    <input {...register("username")} placeholder="Username" className="w-full rounded border p-2" />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                </div>
                <div>
                    <input {...register("password")} type="password" placeholder="Password" className="w-full rounded border p-2" />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
                <button disabled={isSubmitting} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60">
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
            </form>
            <p className="mt-4 text-sm text-gray-600">
                Need an account? <a href="/register" className="text-gray-900 underline">Create one</a>
            </p>
        </main>
    );
}
