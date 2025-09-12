// src/lib/hooks/useOrgId.ts
"use client";
import { useParams } from "next/navigation";

export function useRouteOrgId() {
    const params = useParams<{ orgId?: string }>();
    return typeof params.orgId === "string" ? params.orgId : undefined;
}
