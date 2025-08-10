"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();
    const [pending, start] = useTransition();

    return (
        <button
            className={className}
            disabled={pending}
            onClick={() =>
                start(async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    // Send them to login and refresh server data
                    router.replace("/login");
                    router.refresh();
                })
            }
        >
            {pending ? "Signing out..." : "Sign out"}
        </button>
    );
}
