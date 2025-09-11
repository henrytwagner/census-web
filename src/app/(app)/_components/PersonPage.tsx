// src/app/(app)/_components/PersonPage.tsx
"use client";

import { useMemo } from "react";
import Tabbar, { TabLink } from "@/app/(app)/_components/Tabbar";
import { usePerson } from "@/app/(app)/contexts/person/PersonContext";

// import { useOptionalOrgRoute } from "..."; // if/when you reintroduce org context

export default function PersonPage() {
  const { user, contact, linked, loading, error } = usePerson();

  const firstName = user?.profile?.firstName ?? contact?.firstName ?? "";
  const lastName  = user?.profile?.lastName  ?? contact?.lastName  ?? "";
  const username  = user?.username ? `@${user.username}` : undefined;
  const display   = [firstName, lastName].filter(Boolean).join(" ") || username || "Unknown";
  const avatar    = user?.profile?.profileImageUrl;
  const initials  = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  // Always call hooks (even if loading/error)
  const base = useMemo(() => {
    if (contact?.id) return `/c/${contact.id}`;
    if (user?.id)    return `/u/${user.id}`; // fallback if you add user-only routes
    return null;
  }, [contact?.id, user?.id]);

  const tabs: TabLink[] = useMemo(() => {
    if (!base) return [];
    return [
      { key: "profile",  label: "Profile",       icon: "🙍", href: `${base}/profile` },
      { key: "links",    label: "Relationships", icon: "🔗", href: `${base}/links` },
      { key: "activity", label: "Activity",      icon: "📈", href: `${base}/activity` },
      { key: "notes",    label: "Notes",         icon: "📝", href: `${base}/notes` },
    ];
  }, [base]);

  // Now render different states
  if (loading) return <div className="text-text/70 text-sm p-6">Loading…</div>;
  if (error)   return <div className="text-red-400 text-sm p-6">{error}</div>;

  return (
    <div className="p-6 text-text">
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 flex w-24 h-24 items-center justify-center rounded-full overflow-hidden text-white font-medium text-4xl">
          {avatar ? <img src={avatar} alt={display} className="w-full h-full object-cover" /> : <span>{initials}</span>}
        </div>
        <div className="flex flex-col">
          <p className="text-2xl">{display}</p>
          {username && <p className="opacity-70">{username}</p>}
          <p className="opacity-50 text-sm">{linked ? "Linked" : "Not linked"}</p>
        </div>
      </div>

      {base && tabs.length > 0 && (
        <div className="mt-6">
          <Tabbar tabs={tabs} />
        </div>
      )}
    </div>
  );
}
