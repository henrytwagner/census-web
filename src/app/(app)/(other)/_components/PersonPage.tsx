// src/app/(app)/_components/PersonPage.tsx
"use client";

import { useMemo, PropsWithChildren } from "react";
import Tabbar, { TabLink } from "@/app/(app)/_components/Tabbar";
import { usePerson } from "@/app/(app)/contexts/person/PersonContext";

export default function PersonPage({ children }: PropsWithChildren) {
  const { user, contact, linked, loading, error } = usePerson();

  const firstName = user?.profile?.firstName ?? contact?.firstName ?? "";
  const lastName = user?.profile?.lastName ?? contact?.lastName ?? "";
  const username = user?.username ? `@${user.username}` : undefined;
  const display = [firstName, lastName].filter(Boolean).join(" ") || username || "Unknown";
  const avatar = user?.profile?.profileImageUrl;
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  // prefer contact route, fallback user route
  const base = useMemo(() => {
    if (contact?.id) return `/c/${contact.id}`;
    if (user?.id) return `/u/${user.id}`;
    return null;
  }, [contact?.id, user?.id]);

  const tabs: TabLink[] = useMemo(() => {
    if (!base) return [];
    const list: TabLink[] = [];
    if (user?.id) list.push({ key: "profile", label: "Profile", icon: "🙍", href: `${base}/profile` });
    if (contact?.id) list.push({ key: "contact", label: "Contact", icon: "👤", href: `${base}/contact` });
    // list.push({ key: "notes", label: "Notes", icon: "📝", href: `${base}/notes` });
    return list;
  }, [base, user?.id, contact?.id]);

  if (loading) return <div className="text-text/70 text-sm p-6">Loading…</div>;
  if (error) return <div className="text-red-400 text-sm p-6">{error}</div>;

  return (
    <div className="p-6 text-text">
      {/* Header */}
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

      {/* Tabs */}
      {base && tabs.length > 0 && (
        <div className="mt-6">
          <Tabbar tabs={tabs} />
        </div>
      )}

      {/* 👇 tab content renders here */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
