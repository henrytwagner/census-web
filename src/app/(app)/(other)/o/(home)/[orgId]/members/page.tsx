// src/app/(app)/(other)/o/(home)/[orgId]/members/page.tsx
"use client";

import UserRow from "@/app/(app)/(other)/o/(home)/[orgId]/_components/UserRow";
import Searchbar from "@/app/(app)/_components/Searchbar";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRouteOrgId } from "@/lib/hooks/useOrgId";
import { useMembershipUsers } from "@/lib/hooks/useMembershipUsers";

export default function MembersPage() {
    const router = useRouter();
    const orgId = useRouteOrgId();
    const { memberships, loading, error } = useMembershipUsers(orgId);

    const rows = useMemo(() => {
        if (!memberships) return [];
        return memberships.map(m => {
            return {
                key: m.id,
                userId: m.user.id,
                firstName: m.user.firstName,
                lastName: m.user.lastName,
                username: m.user.username,
                email: m.user.email,
                phone: m.user.phone ?? "-",
                imageUrl: m.user.profileImageUrl ?? undefined,
            };
        });
    }, [memberships]);

    return (
        <>
            <Searchbar />

            {loading && <div className="text-text/70 text-sm">Loading members…</div>}
            {error && <div className="text-red-400 text-sm">{error}</div>}

            {rows.map(r => (
                <UserRow
                    key={r.key}
                    firstName={r.firstName}
                    lastName={r.lastName}
                    username={r.username}
                    email={r.email}
                    phone={r.phone}
                    imageUrl={r.imageUrl}
                    onClick={() => orgId && router.push(`/o/${orgId}/${r.userId}`)}
                />
            ))}
        </>
    );
}
