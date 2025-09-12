// src/app/(app)/hooks/useMembershipUsers.ts
"use client";

import { useEffect, useState } from "react";

export type UserSummaryDto = {
    id: string;
    username: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
};

export type MembershipDto = {
    id: string;
    role?: string;
    joinedAt: string;
    user: UserSummaryDto;
};

export function useMembershipUsers(orgId?: string) {
    const [memberships, setMemberships] = useState<MembershipDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(!!orgId);

    useEffect(() => {
        if (!orgId) return;
        const ctrl = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`/api/memberships/organization/${orgId}`, {
                    cache: "no-store",
                    signal: ctrl.signal,
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(txt || `Failed: ${res.status}`);
                }

                const payload: MembershipDto[] = await res.json();
                console.log(payload);
                setMemberships(payload);
            } catch (e) {
                if (!ctrl.signal.aborted) {
                    setError(e instanceof Error ? e.message : "Failed to load memberships");
                    setMemberships(null);
                }
            } finally {
                if (!ctrl.signal.aborted) setLoading(false);
            }
        })();

        return () => ctrl.abort();
    }, [orgId]);

    return { memberships, loading, error };
}
