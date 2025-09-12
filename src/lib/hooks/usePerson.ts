// lib/hooks/usePerson.ts
"use client";

import useSWR from "swr";
import { useRouteUserId } from "@/lib/hooks/useUserId";
import { useRouteContactId } from "@/lib/hooks/useContactId";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then(async (r) => {
    if (!r.ok) {
      const t = await r.text().catch(() => "");
      throw new Error(t || `Failed: ${r.status}`);
    }
    return r.json();
  });

type UserContactLinkDto = {
  user?: {
    id: string;
    username?: string;
    profile?: { firstName?: string; lastName?: string; profileImageUrl?: string };
  } | null;
  contact?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  } | null;
  meta: { linked: boolean; linkedAt?: string | null; isSelfLink?: boolean };
};

type UsePersonOpts = {
  userId?: string | null;
  contactId?: string | null;
};

export function usePerson(overrides: UsePersonOpts = {}) {
  // Route-derived IDs (defaults)
  const routeUserId = useRouteUserId();
  const routeContactId = useRouteContactId();

  // Final IDs (overrides win; otherwise use route)
  const userId = overrides.userId ?? routeUserId ?? undefined;
  const contactId = overrides.contactId ?? routeContactId ?? undefined;

  // Build key: prefer user, else contact, else null (SWR skip)
  const key =
    userId
      ? `/api/user-contact-links/by-user/${userId}`
      : contactId
      ? `/api/user-contact-links/by-contact/${contactId}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<UserContactLinkDto>(key, fetcher);

  return {
    user: data?.user ?? undefined,
    contact: data?.contact ?? undefined,
    linked: !!data?.meta?.linked,
    linkedAt: data?.meta?.linkedAt ?? null,
    isSelfLink: !!data?.meta?.isSelfLink,
    loading: isLoading,
    error: error?.message,
    refresh: () => mutate(), // refetch on demand
  };
}
