// ContactSidebar.tsx
"use client";

import Searchbar from "@/app/(app)/_components/Searchbar";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useContacts } from "@/lib/hooks/useContacts";

type ContactDto = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
};

export default function ContactSidebar() {

    const router = useRouter();
    const { contacts, loading, error } = useContacts()

    const grouped = useMemo(() => {
        const m = new Map<string, ContactDto[]>();
        const items = (contacts ?? []).slice().sort((a, b) => {
            const la = (a.lastName || "").localeCompare(b.lastName || "", undefined, { sensitivity: "base" });
            if (la !== 0) return la;
            return (a.firstName || "").localeCompare(b.firstName || "", undefined, { sensitivity: "base" });
        });

        for (const c of items) {
            const raw = c.lastName?.trim()?.[0] || c.firstName?.trim()?.[0] || "#";
            const key = /[A-Za-z]/.test(raw) ? raw.toUpperCase() : "#";
            if (!m.has(key)) m.set(key, []);
            m.get(key)!.push(c);
        }

        return Array.from(m.entries()).sort(([a], [b]) => a.localeCompare(b));
    }, [contacts]);

    // Row click handler
    const onRowClick = (c: ContactDto) => {
        router.push(`/c/${c.id}`);       // reflect selection in URL
    };

    return (
        <div className="flex w-50 h-full p-2 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border overflow-hidden">
            <div className="flex justify-between items-start self-stretch text-text">
                <p className="w-2.5 text-s not-italic font-normal"></p>
                <p className="text-s not-italic font-normal">Contacts</p>
                <p className="text-s not-italic font-normal">+</p>
            </div>

            <Searchbar />

            <div className="flex flex-col items-start self-stretch overflow-scroll">
                {error ? null : grouped.map(([letter, contacts]) => (
                    <div key={letter} className="contents">
                        <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                            <p className="text-xs not-italic font-normal">{letter}</p>
                        </div>

                        {contacts.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => onRowClick(c)}
                                className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch justify-between text-left hover:bg-bg-light/50 focus:bg-bg-light/60 focus:outline-none"
                            >
                                <div className="flex items-center gap-0.5">
                                    <p className="text-xs not-italic font-normal">{c.firstName}</p>
                                    <p className="text-xs not-italic font-bold">{c.lastName}</p>
                                </div>
                                {/* you can add a small status dot or chevron here if desired */}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
