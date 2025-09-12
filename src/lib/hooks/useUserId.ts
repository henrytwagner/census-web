// src/app/hooks/useRouteUserId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteUserId(): string | undefined {
  const p = useParams();
  // next/navigation params are string|string[]|undefined
  const raw = (p as any)?.userId as string | undefined;
  return typeof raw === "string" ? raw : undefined;
}
