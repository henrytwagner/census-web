"use client"

import { useState } from "react";
import PersonPage from "./PersonPage";
import ContactSidebar from "./ContactSidebar";

export const Contact = () => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <>
            <button
                onClick={() => setSidebar(!sidebar)}
                className={sidebar ? "absolute top-12 left-50 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 " : "absolute top-12 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 "}
            >
                {sidebar ? "✕" : "☰"}
            </button>
            {sidebar && (<ContactSidebar />)}
            <PersonPage />
        </>
    );
}
