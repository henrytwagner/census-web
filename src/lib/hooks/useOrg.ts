// src/app/hooks/useOrg.ts
"use client";
import useSWR from "swr";
import { jsonFetcher } from "@/lib/fetcher";

export type OrgInfo = {
  id: string;
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
};

/**
 * If you don’t pass orgId, the hook is idle (no request).
 * It uses your BFF route so cookies/auth are handled server-side.
 */
export function useOrg(orgId?: string) {
  const key = orgId ? `/api/organizations/${orgId}` : null;
  const { data, error, isLoading, mutate } = useSWR<OrgInfo>(key, jsonFetcher, {
    // optional tuning:
    dedupingInterval: 10_000,
    revalidateOnFocus: false,
  });

  return {
    org: data,
    loading: Boolean(orgId) && isLoading,
    error: error?.message as string | undefined,
    refresh: () => mutate(),
  };
}
