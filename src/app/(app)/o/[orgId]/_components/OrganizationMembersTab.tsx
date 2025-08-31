// OrganizationMembersPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Searchbar from "../../../_components/Searchbar";
import UserRow from "./UserRow";

type UserDto = {
    id: string;
    username: string;
    email: string;
    phone: string;
    lastActive?: string;
    status?: string;
    profile: {
        firstName?: string;
        lastName?: string;
        bio?: string;
        profileImageUrl?: string;
    };
};

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
                const json = JSON.parse(txt) as UserDto[];
                if (alive) setData(json);
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
                ? data.map((c) => {
                    const username = c.username ? (c.username.startsWith("@") ? c.username : `@${c.username}`) : "@unknown";
                    const phone = c.phone ?? "—";
                    const email = c.email ?? "—";
                    const lastActive = c.lastActive ? new Date(c.lastActive).toLocaleDateString() : "—";
                    const status = c.status ?? "Active";

                    return (
                        <UserRow
                            key={c.id}
                            firstName={c.profile?.firstName ?? ""}
                            lastName={c.profile?.lastName ?? ""}
                            username={username}
                            phone={phone}
                            email={email}
                            lastActive={lastActive}
                            status={status}
                            imageUrl={c.profile?.profileImageUrl ?? undefined}
                            onClick={() => router.push(`/o/${orgID}/${c.id}`)}
                        />
                    );
                })
                : <></>}
        </>
    );
}
