// src/app/(app)/shared/person/PersonFrame.client.tsx
"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import type { ComponentType } from "react";
import PersonPage from "@/app/(app)/(other)/_components/PersonPage";

type PersonFrameProps<P extends object = {}> = {
  /** Sidebar React component (can be memoized by the caller) */
  Sidebar: ComponentType<P>;
  /** Props to pass to the Sidebar */
  sidebarProps?: P;
  /** Start open/closed */
  defaultOpen?: boolean;
  /** Tailwind width class when open */
  sidebarWidthClass?: string; // e.g. "w-50", "w-64"
  /** Id prefix for aria-controls/id uniqueness */
  idPrefix?: string;
  /** Tab content (children rendered under PersonPage tabs) */
  children: React.ReactNode;
};

export default function PersonFrame<P extends object = {}>({
  Sidebar,
  sidebarProps,
  defaultOpen = true,
  sidebarWidthClass = "w-50",
  idPrefix = "person",
  children,
}: PersonFrameProps<P>) {
  const [open, setOpen] = useState(defaultOpen);
  const domId = `${idPrefix}-${useId()}`;

  return (
    <main className="relative flex h-full w-full overflow-hidden bg-bg-dark">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${domId}-sidebar`}
        className="absolute z-50 h-fit w-6 py-2 px-2"
      >
        {open ? "x" : "☰"}
      </button>

      <aside
        id={`${domId}-sidebar`}
        className={clsx(
          "z-40 h-full border-r border-border bg-bg-dark overflow-hidden transition-[width] duration-150",
          open ? sidebarWidthClass : "w-0 border-r-0"
        )}
        aria-hidden={!open}
      >
        <Sidebar {...(sidebarProps as P)} />
      </aside>

      <section className="h-full flex-1">
        <PersonPage>{children}</PersonPage>
      </section>
    </main>
  );
}
