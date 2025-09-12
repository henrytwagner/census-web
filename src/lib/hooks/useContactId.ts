// src/app/hooks/useRouteContactId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteContactId(): string | undefined {
  const p = useParams();
  // next/navigation params are string|string[]|undefined
  const raw = (p as any)?.contactId as string | undefined;
  return typeof raw === "string" ? raw : undefined;
}
