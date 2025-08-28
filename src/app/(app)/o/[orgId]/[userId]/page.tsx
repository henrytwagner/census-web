"use client";

import PersonPage from "@/app/(app)/_components/PersonPage";
import ContactSidebar from "@/app/(app)/_components/ContactSidebar";
import { useState } from "react";
import OrganizationSidebar from "@/app/(app)/_components/OrganizationSidebar";

export default function Home() {
    const [sidebar, setSidebar] = useState(true);


    return (
        <main className="flex items-start w-full h-full bg-bg-dark overflow-hidden">
            <button
                onClick={() => setSidebar(!sidebar)}
                className={sidebar ? "absolute top-12 left-50 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 " : "absolute top-12 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 "}
            >
                {sidebar ? "✕" : "☰"}
            </button>
            {sidebar && (<OrganizationSidebar />)}
            <PersonPage />
        </main>
    );
}
