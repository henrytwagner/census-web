// ContactListContacts.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";   // <-- import hook
import PersonRow from "./PersonRow";
import Searchbar from "./Searchbar";

type UserDto = {
    id: string;
    username: string;
    email: string;
    phone: string;
    lastActive?: string; // ISO date string
    status?: string; // ISO date string
    profile: {
        firstName: string;
        lastName: string;
        bio?: string;
        profileImageUrl?: string;
    }
};

export default function ContactListContacts() {
    const [data, setData] = useState<UserDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();             // gives you the dynamic segments
    const orgID = params.orgId as string;   // assumes your route is like

    useEffect(() => {
        if (!orgID) return; // don’t fire until we actually have the ID

        let alive = true;
        (async () => {
            try {
                const res = await fetch(`/api/memberships/organization/${orgID}`, { cache: "no-store" });
                const txt = await res.text();
                if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
                const json = JSON.parse(txt) as UserDto[];
                if (alive) setData(json);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Failed to load contacts");
            }
        })();
        return () => {
            alive = false;
        };
    }, [orgID]);

    return (
        <>
            <Searchbar />

            {error ? null : data?.length
                ? data.map((c) => {
                    const username = c.username ? (c.username.startsWith("@") ? c.username : `@${c.username}`) : "@unknown";
                    const phone = c.phone ?? "—";
                    const email = c.email ?? "—";
                    const lastActive = c.lastActive
                        ? new Date(c.lastActive).toLocaleDateString()
                        : "—";
                    const status = c.status ?? "Active";
                    const statusColorClass = status === "Active" ? "text-green-600" : "text-gray-400";

                    return (
                        <PersonRow
                            key={c.id}
                            firstName={c.profile.firstName}
                            lastName={c.profile.lastName}
                            username={username}
                            phone={phone}
                            email={email}
                            lastActive={lastActive}
                            status={status}
                            statusColorClass={statusColorClass}
                        />
                    );
                })
                : <></>}
        </>
    );
}
