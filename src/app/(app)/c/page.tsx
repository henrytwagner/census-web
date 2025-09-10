"use client";

import { useState, useMemo } from "react";
import ContactHeader from "./_components/ContactHeader";
import Tabbar from "../_components/Tabbar";
import ContactTab from "./_components/ContactsTab";

type TabPage = {
    key: string;
    icon?: string;
    label: string;
    component: React.ReactNode;
};

export default function Home() {
    // define tabs (label/icon + component)
    const tabs: TabPage[] = useMemo(
        () => [
            { key: "contacts", icon: "👤", label: "Contact", component: <ContactTab /> },
            // { key: "contacts", icon: "👤", label: "Contact", component: <ContactTab /> }, // ANDREW - replace tab names, creat new component with a tab

        ],
        []
    );

    const [activeKey, setActiveKey] = useState<string>(tabs[0]?.key ?? "contacts");
    const activeComponent = tabs.find(t => t.key === activeKey)?.component ?? null;

    return (
        <main className="flex items-start w-full h-full bg-bg-dark">
            {/* Whole Page (Padded) */}
            <div className="overflow-scroll flex flex-1 w-full h-full px-40 pb-30 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                {/* Header */}

                <ContactHeader
                    name="Contacts"
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
