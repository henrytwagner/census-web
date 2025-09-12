// src/lib/hooks/useContactId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteContactId() {
  const params = useParams<{ contactId?: string }>();
  return typeof params.contactId === "string" ? params.contactId : undefined;
}
