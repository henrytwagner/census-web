// src/app/(app)/hooks/useContacts.ts
"use client";

import { useEffect, useState } from "react";

export type ContactSummaryDto = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    profileImageUrl?: string;
};

export function useContacts() {
    const [contacts, setContacts] = useState<ContactSummaryDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const ctrl = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("/api/contacts", {
                    cache: "no-store",
                    signal: ctrl.signal,
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(txt || `Failed: ${res.status}`);
                }

                const payload: ContactSummaryDto[] = await res.json();
                setContacts(payload);
            } catch (e) {
                if (!ctrl.signal.aborted) {
                    setError(e instanceof Error ? e.message : "Failed to load contacts");
                    setContacts(null);
                }
            } finally {
                if (!ctrl.signal.aborted) setLoading(false);
            }
        })();

        return () => ctrl.abort();
    }, []);

    return { contacts, loading, error };
}
