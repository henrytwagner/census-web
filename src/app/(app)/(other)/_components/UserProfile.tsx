// src/app/(app)/(other)/_components/Contact.tsx (or wherever this "future overview" lives)
"use client";

import { usePerson } from "@/app/(app)/contexts/person/PersonContext";

export default function Contact() {
    const { user, contact, linked, loading, error } = usePerson();

    if (loading) return <div className="p-6 text-text/70">Loading…</div>;
    if (error) return <div className="p-6 text-red-400">{error}</div>;

    const firstName = user?.profile?.firstName ?? contact?.firstName ?? "";
    const lastName = user?.profile?.lastName ?? contact?.lastName ?? "";
    const username = user?.username ? `@${user.username}` : undefined;

    const display = [firstName, lastName].filter(Boolean).join(" ")
        || username
        || "Unknown";

    return (
        <div className="flex flex-col h-full p-6 text-text">
            <h2 className="text-2xl mb-2">User Profile</h2>
            <p className="text-lg">Person: <span className="font-medium">{display}</span></p>
            <p className="text-sm text-text/60 mt-1">{linked ? "Linked" : "Not linked"}</p>
            {/* add your future widgets/cards here */}
        </div>
    );
}
