// src/app/(app)/(other)/o/[orgId]/[userId]/_components/Sidebar.tsx
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Searchbar from "@/app/(app)/_components/Searchbar";
import { useRouteOrgId } from "@/lib/hooks/useOrgId"
import { useOrg } from "@/lib/hooks/useOrg";
import { useMembershipUsers } from "@/lib/hooks/useMembershipUsers";
import Image from "next/image";


export default function OrganizationSidebar() {
  const router = useRouter();
  const orgId = useRouteOrgId();
  const { org } = useOrg(orgId); // header bits
  const { memberships, error } = useMembershipUsers(orgId);


  const grouped = useMemo(() => {
    const items = (memberships ?? []).map((m) => ({
      id: m.user.id,
      firstName: m.user.firstName ?? "",
      lastName: m.user.lastName ?? "",
      // status: m.status ?? "Active",
    }));
    items.sort((a, b) => {
      const ln = a.lastName.localeCompare(b.lastName, undefined, { sensitivity: "base" });
      return ln !== 0 ? ln : a.firstName.localeCompare(b.firstName, undefined, { sensitivity: "base" });
    });
    const map = new Map<string, typeof items>();
    for (const it of items) {
      const raw = it.lastName?.trim()?.[0] || it.firstName?.trim()?.[0] || "#";
      const letter = /[A-Za-z]/.test(raw) ? raw.toUpperCase() : "#";
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(it);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [memberships]);

  const onMemberClick = (memberId: string) => {
    if (!orgId) return;
    router.push(`/o/${orgId}/${memberId}`);
  };

  return (
    <div className="flex w-50 h-full px-2 pb-8 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border overflow-hidden">
      <div className="flex justify-between items-start self-stretch text-text">
        <div className="py-2 w-2.5" />
        <div className="flex flex-col items-center gap-2">
          <div className="bg-red-600 h-16 w-16 rounded-b-2xl overflow-hidden">
            {org?.imageUrl && (
              <Image src={org.imageUrl} alt={`${org.name} logo`} className="w-full h-full object-cover" />
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
