// OrganizationSidebar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Searchbar from "@/app/(app)/_components/Searchbar";
import { usePerson } from "@/app/(app)/contexts/person/PersonContext";

type OrgDto = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
};

type MemberDto = {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  status?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    profileImageUrl?: string;
  };
};

const FALLBACK_ORG_ID = "22c0f117-9054-4b9c-b562-45f3d45ebf7e";

export default function OrganizationSidebar() {
  const router = useRouter();
  const routeParams = useParams() as { orgId?: string };
  const orgId = routeParams.orgId || FALLBACK_ORG_ID;

  const [org, setOrg] = useState<OrgDto | null>(null);
  const [data, setData] = useState<MemberDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { setPersonByUserId } = usePerson(); // 👈 from PersonContext

  // fetch org header data
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/organizations/${orgId}`, { cache: "no-store" });
        const txt = await res.text();
        if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
        const json = JSON.parse(txt) as OrgDto;
        if (alive) setOrg(json);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "Failed to load organization");
      }
    })();
    return () => { alive = false; };
  }, [orgId]);

  // fetch members list
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/memberships/organization/${orgId}`, { cache: "no-store" });
        const txt = await res.text();
        if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
        const payload = JSON.parse(txt);
        const list: unknown = Array.isArray(payload)
          ? payload
          : payload?.items ?? payload?.users ?? payload?.members ?? [];
        if (!Array.isArray(list)) throw new Error("Unexpected memberships response");
        if (alive) setData(list as MemberDto[]);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "Failed to load members");
      }
    })();
    return () => { alive = false; };
  }, [orgId]);

  // group members by initial
  const grouped = useMemo(() => {
    const items = (data ?? []).map((m) => ({
      id: m.id,
      firstName: m.profile?.firstName ?? "",
      lastName: m.profile?.lastName ?? "",
      status: m.status ?? "Active",
    }));

    items.sort((a, b) => {
      const ln = a.lastName.localeCompare(b.lastName, undefined, { sensitivity: "base" });
      if (ln !== 0) return ln;
      return a.firstName.localeCompare(b.firstName, undefined, { sensitivity: "base" });
    });

    const map = new Map<string, typeof items>();
    for (const it of items) {
      const raw = it.lastName?.trim()?.[0] || it.firstName?.trim()?.[0] || "#";
      const letter = /[A-Za-z]/.test(raw) ? raw.toUpperCase() : "#";
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(it);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [data]);

  // click handler: update context + navigate
  const onMemberClick = (memberId: string) => {
    setPersonByUserId(memberId);          // 👈 update PersonContext
    router.push(`/o/${orgId}/${memberId}`); // 👈 navigate to detail page
  };

  return (
    <div className="flex w-50 h-full px-2 pb-8 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border overflow-hidden">
      <div className="flex justify-between items-start self-stretch text-text">
        <div className="py-2 w-2.5" />
        <div className="flex flex-col items-center gap-2">
          <div className="bg-red-600 h-16 w-16 rounded-b-2xl">
            {org?.imageUrl && (
              <img
                src={org.imageUrl}
                alt={`${org.name} logo`}
                className="w-full h-full object-cover rounded-b-2xl"
              />
            )}
          </div>
          <p className="text-s not-italic font-normal">{org?.name ?? ""}</p>
        </div>
        <div className="py-2">
          <p className="text-s not-italic font-normal">+</p>
        </div>
      </div>

      <Searchbar />

      <div className="flex flex-col items-start self-stretch overflow-scroll">
        {error ? null : grouped.map(([letter, members]) => (
          <div key={letter} className="contents">
            <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
              <p className="text-xs not-italic font-normal">{letter}</p>
            </div>

            {members.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onMemberClick(m.id)}
                className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch justify-between text-left hover:bg-bg-light/50 focus:bg-bg-light/60 focus:outline-none"
              >
                <div className="flex items-center gap-0.5">
                  <p className="text-xs not-italic font-normal">{m.firstName}</p>
                  <p className="text-xs not-italic font-bold">{m.lastName}</p>
                </div>
                <div className="h-2 w-2 bg-green-600 rounded-full" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
