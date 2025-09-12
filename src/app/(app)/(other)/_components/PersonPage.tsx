// src/app/(app)/_components/PersonPage.tsx
"use client";

import { useMemo, useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import Tabbar, { TabLink } from "@/app/(app)/_components/Tabbar";
import { usePersonView } from "@/app/(app)/contexts/view/PersonViewContext";
import { usePerson } from "@/lib/hooks/usePerson";
import Image from "next/image";

export default function PersonPage({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  
  const { scopeKey, getLastTab, setLastTab, makeBaseHref } = usePersonView();

  const {user, contact, linked, loading, error} = usePerson();


  const firstName = user?.profile?.firstName ?? contact?.firstName ?? "";
  const lastName  = user?.profile?.lastName  ?? contact?.lastName  ?? "";
  const username  = user?.username ? `@${user.username}` : undefined;
  const display   = [firstName, lastName].filter(Boolean).join(" ") || username || "Unknown";
  const avatar    = user?.profile?.profileImageUrl;
  const initials  = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  // Base path is scope-aware (e.g. /o/:orgId/:userId or /c/:contactId)
  const base = useMemo(() => {
    return makeBaseHref({ userId: user?.id, contactId: contact?.id });
  }, [makeBaseHref, user?.id, contact?.id]);

  // ✅ Build tabs purely from available data
  const tabs: TabLink[] = useMemo(() => {
    if (!base) return [];
    const list: TabLink[] = [];
    if (user?.id)    list.push({ key: "profile", label: "Profile", icon: "🙍", href: `${base}/profile` });
    if (contact?.id) list.push({ key: "contact", label: "Contact", icon: "👤", href: `${base}/contact` });
    return list;
  }, [base, user?.id, contact?.id]);

  // Defaults by scope (still respected)
  const defaultTabForScope = useMemo<"profile" | "contact">(() => {
    if (scopeKey.startsWith("o:")) return "profile"; // org view: default to profile
    if (scopeKey === "c")          return "contact"; // contact view: default to contact
    return "contact";
  }, [scopeKey]);

  // Keep tab stable across person changes within the same scope
  useEffect(() => {
    if (!base || tabs.length === 0) return;

    const last = getLastTab(scopeKey);
    const desired = last ?? defaultTabForScope;

    const availableKeys = new Set(tabs.map(t => t.key));
    const fallback = availableKeys.has(defaultTabForScope) ? defaultTabForScope : tabs[0]?.key;

    const target = availableKeys.has(desired) ? desired : fallback;
    if (!target) return;

    if (!pathname.startsWith(`${base}/${target}`)) {
      router.replace(`${base}/${target}`);
    }
  }, [base, tabs, pathname, router, scopeKey, getLastTab, defaultTabForScope]);

  if (loading) return <div className="text-text/70 text-sm p-6">Loading…</div>;
  if (error)   return <div className="text-red-400 text-sm p-6">{error}</div>;

  return (
    <div className="p-6 text-text">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 flex w-24 h-24 items-center justify-center rounded-full overflow-hidden text-white font-medium text-4xl">
          {avatar ? <Image src={avatar} alt={display} className="w-full h-full object-cover" /> : <span>{initials}</span>}
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
          <Tabbar
            tabs={tabs}
            onNavigate={(key) => setLastTab(key, scopeKey)} // persist selection for this scope
          />
        </div>
      )}

      {/* Tab content */}
      <div className="mt-6">{children}</div>
    </div>
  );
}
