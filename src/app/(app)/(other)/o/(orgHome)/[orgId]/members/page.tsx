"use client";

import UserRow from "@/app/(app)/(other)/o/(orgHome)/[orgId]/_components/UserRow";
import Searchbar from "@/app/(app)/_components/Searchbar";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrg } from "@/app/(app)/contexts/org/OrgContext";

type UserProfileDto = {
    firstName?: string;
    lastName?: string;
    bio?: string;
    profileImageUrl?: string;
};

type UserDto = {
    id: string;
    username: string;
    email?: string;
    phone?: string;
    lastActive?: string;
    status?: string;
    profile?: UserProfileDto;
};

type MembershipDto = {
    id: string;
    role?: string;
    joinedAt?: string;
    user: UserDto;
};

function isMembershipArray(arr: unknown[]): arr is MembershipDto[] {
    return arr.length === 0 || typeof (arr[0] as any)?.user === "object";
}

export default function MembersPage() {
    const router = useRouter();
    const { orgId } = useOrg();

    const [users, setUsers] = useState<UserDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orgId) return;
        const ctrl = new AbortController();

        (async () => {
            try {
                const res = await fetch(`/api/memberships/organization/${orgId}`, {
                    cache: "no-store",
                    signal: ctrl.signal,
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(txt || `Failed: ${res.status}`);
                }

                const payload = await res.json();
                const list: unknown[] = Array.isArray(payload)
                    ? payload
                    : (payload?.items ?? payload?.content ?? payload?.data ?? []);

                if (!Array.isArray(list)) throw new Error("Unexpected memberships response");

                const nextUsers: UserDto[] = isMembershipArray(list)
                    ? (list as MembershipDto[]).map((m) => m.user)
                    : (list as UserDto[]);

                setUsers(nextUsers);
                setError(null);
            } catch (e) {
                if (ctrl.signal.aborted) return;
                setError(e instanceof Error ? e.message : "Failed to load users");
            }
        })();

        return () => ctrl.abort();
    }, [orgId]);

    const rows = useMemo(() => {
        if (!users) return [];
        return users.map((u) => {
            const username = u.username ? (u.username.startsWith("@") ? u.username : `@${u.username}`) : "@unknown";
            return {
                key: u.id,
                firstName: u.profile?.firstName ?? "",
                lastName: u.profile?.lastName ?? "",
                username,
                phone: u.phone ?? "—",
                email: u.email ?? "—",
                lastActive: u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—",
                status: u.status ?? "Active",
                imageUrl: u.profile?.profileImageUrl ?? undefined,
            };
        });
    }, [users]);

    return (
        <>
            <Searchbar />

            {error && <div className="text-red-400 text-sm">{error}</div>}

            {!users && !error && <div className="text-text/70 text-sm">Loading members…</div>}

            {rows.map((r) => (
                <UserRow
                    key={r.key}
                    firstName={r.firstName}
                    lastName={r.lastName}
                    username={r.username}
                    phone={r.phone}
                    email={r.email}
                    lastActive={r.lastActive}
                    status={r.status}
                    imageUrl={r.imageUrl}
                    onClick={() => router.push(`/o/${orgId}/${r.key}`)} // keep your detail route
                />
            ))}
        </>
    );
}
