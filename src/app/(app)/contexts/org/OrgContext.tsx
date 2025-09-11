// src/app/(app)/contexts/org/OrgContext.tsx
"use client";

import { createContext, useContext } from "react";

export type OrgInfo = {
    id: string;
    name?: string;
    description?: string | null;
    imageUrl?: string | null;
};

type OrgCtx = { orgId: string; org?: OrgInfo };

const OrgContext = createContext<OrgCtx | null>(null);

export function OrgProvider({ value, children }: { value: OrgCtx; children: React.ReactNode }) {
    // important: provider value is a plain object (no promises)
    return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrg() {
    const ctx = useContext(OrgContext);
    if (!ctx) throw new Error("useOrg must be used within <OrgProvider>");
    return ctx;
}
