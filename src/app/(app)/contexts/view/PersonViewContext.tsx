// src/app/(app)/contexts/view/PersonViewContext.tsx
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

type LastTabMap = Record<string, string | undefined>;

export type PersonViewState = {
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Scoping
  scopeKey: string;

  // Tab memory
  getLastTab: (scope?: string) => string | undefined;
  setLastTab: (tabKey: string, scope?: string) => void;

  /**
   * Build a base href for the current scope.
   * - Org scope:  `/o/[orgId]/[userId]`  (if userId) OR `/o/[orgId]/contacts/[contactId]` (if you support it)
   * - Contact scope: `/c/[contactId]`
   * - No `/u` fallback (you don't have that route)
   */
  makeBaseHref: (ids: { userId?: string | null; contactId?: string | null }) => string | null;
};

const Ctx = createContext<PersonViewState | null>(null);

// (optional) export for debugging
export const __internalCtx = Ctx;

/** Figure out which scope we are in, based on the URL path. */
function computeScopeKey(pathname: string): string {
  // /c/[contactId]/...     -> "c"
  // /o/[orgId]/...         -> `o:${orgId}`
  // (no /u; you don't use it)
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "c") return "c";
  if (parts[0] === "o" && parts[1]) return `o:${parts[1]}`;
  return "global";
}

const LS_KEYS = {
  sidebar: "person.sidebarOpen",
  lastTabs: "person.lastTabs", // JSON of { [scopeKey]: tabKey }
};

export function PersonViewProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scopeKey = useMemo(() => computeScopeKey(pathname), [pathname]);

  // ---- sidebar (persisted) ----
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(true);
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEYS.sidebar);
    if (raw != null) setSidebarOpenState(raw === "1");
  }, []);
  const setSidebarOpen = useCallback((open: boolean) => {
    setSidebarOpenState(open);
    localStorage.setItem(LS_KEYS.sidebar, open ? "1" : "0");
  }, []);

  // ---- last tab per scope (persisted) ----
  const [lastTabs, setLastTabs] = useState<LastTabMap>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.lastTabs);
      if (raw) setLastTabs(JSON.parse(raw));
    } catch {}
  }, []);
  const persistLastTabs = useCallback((next: LastTabMap) => {
    setLastTabs(next);
    try {
      localStorage.setItem(LS_KEYS.lastTabs, JSON.stringify(next));
    } catch {}
  }, []);

  const getLastTab = useCallback(
    (scope?: string) => lastTabs[scope ?? scopeKey],
    [lastTabs, scopeKey]
  );

  const setLastTab = useCallback(
    (tabKey: string, scope?: string) => {
      const key = scope ?? scopeKey;
      persistLastTabs({ ...lastTabs, [key]: tabKey });
    },
    [lastTabs, persistLastTabs, scopeKey]
  );

  // ---- base href builder (org/contacts only) ----
  const makeBaseHref = useCallback(
    (ids: { userId?: string | null; contactId?: string | null }): string | null => {
      const { userId, contactId } = ids || {};
      if (scopeKey.startsWith("o:")) {
        const orgId = scopeKey.slice(2);
        if (userId) return `/o/${orgId}/${userId}`;                      // org-user route
        // Uncomment if you add org-scoped contact pages:
        // if (contactId) return `/o/${orgId}/contacts/${contactId}`;
        return null;
      }
      if (scopeKey === "c") {
        return contactId ? `/c/${contactId}` : null;                      // contact route
      }
      // global/unknown: fall back to contact if present
      return contactId ? `/c/${contactId}` : null;
    },
    [scopeKey]
  );

  const value = useMemo<PersonViewState>(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      scopeKey,
      getLastTab,
      setLastTab,
      makeBaseHref,
    }),
    [sidebarOpen, setSidebarOpen, scopeKey, getLastTab, setLastTab, makeBaseHref]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Strict hook: throws if the provider isn’t mounted. */
export function usePersonView() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePersonView must be used inside <PersonViewProvider>");
  return ctx;
}

/** Optional hook: returns `null` if the provider isn’t mounted. */
export function useOptionalPersonView() {
  return useContext(Ctx);
}
