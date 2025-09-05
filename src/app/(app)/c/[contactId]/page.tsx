"use client";

import { useState, memo } from "react";
import clsx from "clsx";
import PersonPage from "../../_components/PersonPage";
import ContactSidebar from "./_components/Sidebar";

const MemoSidebar = memo(ContactSidebar);

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <main className="relative flex h-full w-full overflow-hidden bg-bg-dark">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="org-sidebar"
                className="absolute z-50 h-fit w-6 py-2 px-2"
            >
                {open ? "x" : "☰"}
            </button>

            {/* SIDEBAR: animate width; keep it in the flex flow */}
            <aside
                id="org-sidebar"
                className={clsx(
                    "z-40 h-full border-r border-border bg-bg-dark overflow-hidden",
                    // sits in the flex row, so it naturally pushes content
                    "transition-[width] duration-150",
                    open ? "w-50" : "w-0 border-r-0" // <-- no translate; width drives layout
                )}
                aria-hidden={!open}
            >
                {/* optional: slide the inner content for a nicer reveal */}
                <MemoSidebar />
            </aside>

            {/* CONTENT: flex-1 fills remaining space; no extra margins needed */}
            <section className="h-full flex-1">
                <PersonPage />
            </section>
        </main>
    );
}

