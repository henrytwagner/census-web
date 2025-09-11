// src/app/(app)/(other)/c/[contactId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, memo } from "react";
import clsx from "clsx";
import ContactSidebar from "./_components/Sidebar";
import PersonPage from "@/app/(app)/_components/PersonPage";
import { PersonProvider } from "@/app/(app)/contexts/person/PersonContext";

const MemoSidebar = memo(ContactSidebar);

export default function ContactDetailPage() {
  const { contactId } = useParams() as { contactId: string };
  const [open, setOpen] = useState(true);

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

      <aside
        id="org-sidebar"
        className={clsx(
          "z-40 h-full border-r border-border bg-bg-dark overflow-hidden transition-[width] duration-150",
          open ? "w-50" : "w-0 border-r-0"
        )}
        aria-hidden={!open}
      >
        <PersonProvider>
          {/* Sidebar needs the provider to call usePerson() */}
          <MemoSidebar />
        </PersonProvider>
      </aside>

      <section className="h-full flex-1">
        <PersonProvider contactId={contactId}>
          <PersonPage />
        </PersonProvider>
      </section>
    </main>
  );
}
