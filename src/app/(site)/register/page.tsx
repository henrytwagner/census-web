"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "@/lib/schemas";
import { normalizeAuthError } from "@/lib/errors";

export default function RegisterPage() {
    const [formError, setFormError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

    const onSubmit = async (values: RegisterForm) => {
        setFormError(null);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        });

        if (res.ok) {
            window.location.href = "/dashboard";
            return;
        }

        const raw = await res.text();
        const fieldErrors = normalizeAuthError(raw);

        // Push field errors into RHF
        (["username", "email", "password", "confirm"] as const).forEach((k) => {
            if (fieldErrors[k]) setError(k, { type: "server", message: fieldErrors[k] });
        });

        if (fieldErrors.form) setFormError(fieldErrors.form);
        else if (!Object.keys(fieldErrors).length) setFormError("Registration failed");
    };

    return (
        <main className="mx-auto mt-16 max-w-md p-6">
            <h1 className="text-2xl font-semibold">Create your account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                <div>
                    <input {...register("firstName")} placeholder="First Name" className="w-full rounded border p-2" />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                </div>

                <div>
                    <input {...register("lastName")} placeholder="Last Name" className="w-full rounded border p-2" />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                </div>

                <div>
                    <input {...register("username")} placeholder="Username" className="w-full rounded border p-2" />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div>
                    <input {...register("email")} placeholder="Email" className="w-full rounded border p-2" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <input {...register("password")} type="password" placeholder="Password" className="w-full rounded border p-2" />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <input {...register("confirm")} type="password" placeholder="Confirm password" className="w-full rounded border p-2" />
                    {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm.message}</p>}
                </div>

                <button disabled={isSubmitting} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60">
                    {isSubmitting ? "Creating account..." : "Create account"}
                </button>

                {formError && <p className="text-sm text-red-600">{formError}</p>}
            </form>
        </main>
    );
}
