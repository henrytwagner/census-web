// ContactsTab.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";   // ✅ App Router hook
import Searchbar from "../../_components/Searchbar";
import ContactRow from "./ContactRow";

type ContactDto = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export default function ContactTab() {
    const [data, setData] = useState<ContactDto[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();                 // ✅ get router

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch("/api/contacts", { cache: "no-store" });
                const txt = await res.text();
                if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
                const json = JSON.parse(txt) as ContactDto[];
                if (alive) setData(json);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Failed to load contacts");
            }
        })();
        return () => { alive = false; };
    }, []);

    return (
        <>
            <Searchbar />

            {error ? null : data?.length
                ? data.map((c) => {
                    const phone = c.phone ?? "—";
                    const email = c.email ?? "—";

                    return (
                        <ContactRow
                            key={c.id}
                            firstName={c.firstName}
                            lastName={c.lastName}
                            phone={phone}
                            email={email}
                            onClick={() => router.push(`/c/${c.id}`)} // ← adjust path as needed
                        />
                    );
                })
                : <></>}
        </>
    );
}
