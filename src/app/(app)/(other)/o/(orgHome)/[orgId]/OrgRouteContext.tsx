// src/app/(app)/o/[orgId]/OrgRouteContext.tsx
"use client";

import { createContext, useContext } from "react";

export type OrgInfo = {
  id: string;
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
};

type OrgRouteCtx = { orgId: string; org?: OrgInfo };

const Ctx = createContext<OrgRouteCtx | null>(null);

export function OrgProvider({ value, children }: { value: OrgRouteCtx; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrgRoute() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrgRoute must be used within <OrgProvider>");
  return ctx;
}
