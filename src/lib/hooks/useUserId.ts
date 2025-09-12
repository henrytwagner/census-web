// src/lib/hooks/useUserId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteUserId() {
  const params = useParams<{ userId?: string }>();
  return typeof params.userId === "string" ? params.userId : undefined;
}
