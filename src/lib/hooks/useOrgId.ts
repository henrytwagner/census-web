// src/app/hooks/useRouteOrgId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteOrgId(): string | undefined {
  const p = useParams();
  // next/navigation params are string|string[]|undefined
  const raw = (p as any)?.orgId as string | undefined;
  return typeof raw === "string" ? raw : undefined;
}
