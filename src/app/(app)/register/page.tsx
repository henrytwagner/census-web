"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm: z.string(),
    })
    .refine((v) => v.password === v.confirm, {
        message: "Passwords do not match",
        path: ["confirm"],
    });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const onSubmit = async (values: FormValues) => {
        setServerError(null);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        });

        if (res.ok) {
            window.location.href = "/dashboard";
        } else {
            const msg = await res.text();
            setServerError(msg || "Registration failed");
        }
    };

    return (
        <main className="mx-auto mt-16 max-w-md p-6">
            <h1 className="text-2xl font-semibold">Create your account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                    <input
                        {...register("username")}
                        placeholder="Username"
                        className="w-full rounded border p-2"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div>
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full rounded border p-2"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="w-full rounded border p-2"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <input
                        {...register("confirm")}
                        type="password"
                        placeholder="Confirm password"
                        className="w-full rounded border p-2"
                    />
                    {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm.message}</p>}
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                    {isSubmitting ? "Creating account..." : "Create account"}
                </button>

                {serverError && <p className="text-sm text-red-600">{serverError}</p>}
            </form>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-gray-900 underline">Sign in</a>
            </p>
        </main>
    );
}
