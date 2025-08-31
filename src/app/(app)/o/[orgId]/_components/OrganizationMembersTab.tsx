// OrganizationMembersPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Searchbar from "../../../_components/Searchbar";
import UserRow from "./UserRow";

// Shapes we expect from the memberships endpoint
type UserProfileDto = {
    firstName?: string;
    lastName?: string;
    bio?: string;
    profileImageUrl?: string;
};

type UserDto = {
    id: string;
    username: string;
    email: string;
    phone: string;
    lastActive?: string;
    status?: string;
    profile: UserProfileDto;
};

type MembershipDto = {
    id: string;              // membership id
    role?: string;
    joinedAt?: string;
    user: UserDto;           // ← the actual user we want to render
};

// tolerate both raw users [] and memberships [] from backend
function isMembershipArray(arr: unknown[]): arr is MembershipDto[] {
    return arr.length === 0 || typeof (arr[0] as any)?.user === "object";
}

export default function OrganizationMembersPage() {
    const [data, setData] = useState<UserDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const orgID = params.orgId as string;
    const router = useRouter();

    useEffect(() => {
        if (!orgID) return;
        let alive = true;

        (async () => {
            try {
                const res = await fetch(`/api/memberships/organization/${orgID}`, { cache: "no-store" });
                const txt = await res.text();
                if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);

                const payload = JSON.parse(txt);

                // unwrap possible wrappers: array OR {items|content|data}
                const list: unknown[] = Array.isArray(payload)
                    ? payload
                    : (payload?.items ?? payload?.content ?? payload?.data ?? []);

                if (!Array.isArray(list)) throw new Error("Unexpected memberships response");

                const users: UserDto[] = isMembershipArray(list)
                    ? (list as MembershipDto[]).map(m => m.user)
                    : (list as UserDto[]);

                if (alive) setData(users);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Failed to load users");
            }
        })();

        return () => { alive = false; };
    }, [orgID]);

    return (
        <>
            <Searchbar />

            {error ? null : data?.length
                ? data.map((u) => {
                    const username =
                        u.username ? (u.username.startsWith("@") ? u.username : `@${u.username}`) : "@unknown";
                    const phone = u.phone ?? "—";
                    const email = u.email ?? "—";
                    const lastActive = u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—";
                    const status = u.status ?? "Active";

                    return (
                        <UserRow
                            key={u.id}
                            firstName={u.profile?.firstName ?? ""}
                            lastName={u.profile?.lastName ?? ""}
                            username={username}
                            phone={phone}
                            email={email}
                            lastActive={lastActive}
                            status={status}
                            imageUrl={u.profile?.profileImageUrl ?? undefined}
                            onClick={() => router.push(`/o/${orgID}/${u.id}`)}
                        />
                    );
                })
                : <></>}
        </>
    );
}
