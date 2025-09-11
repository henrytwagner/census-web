// src/app/(app)/shared/person/PersonContext.tsx
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type UserSummary = {
    id: string;
    username: string;
    email?: string;
    profile?: { firstName?: string; lastName?: string; profileImageUrl?: string };
};

export type ContactSummary = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
};

export type UserContactLinkMeta = {
    linked: boolean;
    linkedAt?: string | null;
    isSelfLink?: boolean;
};

export type UserContactLinkDto = {
    user?: UserSummary | null;
    contact?: ContactSummary | null;
    meta: UserContactLinkMeta;
};

type PersonState = {
    user?: UserSummary;
    contact?: ContactSummary;
    linked: boolean;
    linkedAt?: string | null;
    isSelfLink?: boolean;
    loading: boolean;
    error?: string;
};

type PersonCtx = PersonState & {
    // current selection
    selectedUserId?: string;
    selectedContactId?: string;
    // UI actions
    setPersonByUserId: (id: string) => void;
    setPersonByContactId: (id: string) => void;
    refresh: () => void;
};

const Ctx = createContext<PersonCtx | null>(null);

export function usePerson() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("usePerson must be used within <PersonProvider>");
    return ctx;
}

/**
 * PersonProvider
 * - You may pass initial userId/contactId from route params.
 * - The provider stores the current selection internally and refetches when it changes.
 * - Priority rule: if both are set, we fetch by userId (you can invert if you prefer).
 */
export function PersonProvider({
    userId,
    contactId,
    children,
}: {
    userId?: string;
    contactId?: string;
    children: React.ReactNode;
}) {
    // internal selection (seeded from props)
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>(userId);
    const [selectedContactId, setSelectedContactId] = useState<string | undefined>(contactId);

    const [state, setState] = useState<PersonState>({ loading: true, linked: false });
    const [nonce, setNonce] = useState(0); // bump to force manual refresh

    // public setters
    const setPersonByUserId = useCallback((id: string) => {
        setSelectedUserId(id);
        setSelectedContactId(undefined);
    }, []);

    const setPersonByContactId = useCallback((id: string) => {
        setSelectedContactId(id);
        setSelectedUserId(undefined);
    }, []);

    const refresh = useCallback(() => setNonce((n) => n + 1), []);

    // compute which endpoint to call
    const endpoint = useMemo(() => {
        if (selectedUserId) return `/api/user-contact-links/by-user/${selectedUserId}`;
        if (selectedContactId) return `/api/user-contact-links/by-contact/${selectedContactId}`;
        return undefined;
    }, [selectedUserId, selectedContactId]);

    useEffect(() => {
        let abort = false;

        async function run() {
            if (!endpoint) {
                setState({
                    loading: false,
                    linked: false,
                    error: "No userId or contactId provided",
                });
                return;
            }

            setState((s) => ({ ...s, loading: true, error: undefined }));

            try {
                // If you’re using BFF routes, no headers needed here.
                const res = await fetch(endpoint, { cache: "no-store" });
                if (!res.ok) {
                    const msg = await res.text().catch(() => "");
                    throw new Error(msg || `Failed: ${res.status}`);
                }
                const json = (await res.json()) as UserContactLinkDto;
                if (abort) return;

                setState({
                    user: json.user ?? undefined,
                    contact: json.contact ?? undefined,
                    linked: !!json.meta?.linked,
                    linkedAt: json.meta?.linkedAt ?? null,
                    isSelfLink: json.meta?.isSelfLink ?? false,
                    loading: false,
                });
            } catch (e) {
                if (abort) return;
                setState({
                    loading: false,
                    linked: false,
                    error: e instanceof Error ? e.message : "Failed to resolve user/contact link",
                });
            }
        }

        run();
        return () => {
            abort = true;
        };
    }, [endpoint, nonce]);

    const value: PersonCtx = {
        ...state,
        selectedUserId,
        selectedContactId,
        setPersonByUserId,
        setPersonByContactId,
        refresh,
    };

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
