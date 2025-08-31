// src/app/o/[orgId]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Tabbar from "../../_components/Tabbar";
import OrganizationHeader from "./_components/OrganizationHeader";
import OrganizationMembersPage from "./_components/OrganizationMembersTab";

type OrgDto = {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null; // your backend said icons are URLs
};

type TabPage = {
    key: string;
    icon?: string;
    label: string;
    component: React.ReactNode;
};

export default function Home() {
    const { orgId } = useParams() as { orgId: string };
    const [org, setOrg] = useState<OrgDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    // fetch org by id
    useEffect(() => {
        if (!orgId) return;
        let alive = true;

        (async () => {
            try {
                const res = await fetch(`/api/organizations/${orgId}`, { cache: "no-store" });
                const txt = await res.text();
                if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
                const json = JSON.parse(txt) as OrgDto;
                if (alive) setOrg(json);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Failed to load organization");
            }
        })();

        return () => { alive = false; };
    }, [orgId]);

    // tabs unchanged
    const tabs: TabPage[] = useMemo(
        () => [
            { key: "contacts", icon: "👤", label: "Contact", component: <OrganizationMembersPage /> },
        ],
        []
    );
    const [activeKey, setActiveKey] = useState<string>(tabs[0]?.key ?? "contacts");
    const activeComponent = tabs.find(t => t.key === activeKey)?.component ?? null;

    // fallbacks to avoid visual changes while loading
    const name = org?.name ?? "";
    const description = (org?.description ?? "") || "";
    const imageUrl = org?.imageUrl ?? undefined;

    return (
        <main className="flex items-start w-full h-full bg-bg-dark">
            {/* Whole Page (Padded) */}
            <div className="overflow-scroll flex flex-1 w-full h-full px-40 pb-30 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                {/* Header (now dynamic) */}
                <OrganizationHeader
                    name={name || " "}
                    description={description || " "}
                    imageUrl={imageUrl}
                />

                {/* Tab Bar (no visual changes) */}
                <Tabbar
                    tabs={tabs.map(({ key, icon, label }) => ({ key, icon, label }))}
                    activeKey={activeKey}
                    onChange={setActiveKey}
                />

                {/* Render the chosen page component below the tab bar */}
                {activeComponent}
            </div>
        </main>
    );
}
