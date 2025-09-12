// src/app/(app)/shared/person/PersonFrame.client.tsx
"use client";

import { useCallback, useId, useMemo, useState } from "react";
import clsx from "clsx";
import type { ComponentType } from "react";
import PersonPage from "@/app/(app)/(other)/_components/PersonPage";
import { useOptionalPersonView } from "@/app/(app)/contexts/view/useOptionalPersonView";

type PersonFrameProps<P extends object = Record<string, unknown>> = {
  Sidebar: ComponentType<P>;
  sidebarProps?: P;

  /** Fully controlled mode (overrides context/local) */
  open?: boolean;
  onOpenChange?: (next: boolean) => void;

  /** Uncontrolled fallback defaults */
  defaultOpen?: boolean;

  /** Layout */
  sidebarWidthClass?: string; // e.g. "w-50", "w-64"
  idPrefix?: string;

  children: React.ReactNode;
};

export default function PersonFrame<P extends object = Record<string, unknown>>({
  Sidebar,
  sidebarProps,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = true,
  sidebarWidthClass = "w-50",
  idPrefix = "person",
  children,
}: PersonFrameProps<P>) {
  const domId = `${idPrefix}-${useId()}`;
  const ctx = useOptionalPersonView();

  // extract only what we need from ctx
  const sidebarOpenCtx = ctx?.sidebarOpen;
  const setSidebarOpenCtx = ctx?.setSidebarOpen;

  // local state used only if neither controlled nor context values exist
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);

  const open = useMemo(() => {
    if (controlledOpen != null) return controlledOpen;   // 1) controlled
    if (sidebarOpenCtx != null) return sidebarOpenCtx;   // 2) context
    return uncontrolled;                                 // 3) local
  }, [controlledOpen, sidebarOpenCtx, uncontrolled]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (onOpenChange) return onOpenChange(next);        // 1) controlled
      if (setSidebarOpenCtx) return setSidebarOpenCtx(next); // 2) context
      setUncontrolled(next);                              // 3) local
    },
    [onOpenChange, setSidebarOpenCtx]
  );

  return (
    <main className="relative flex h-full w-full overflow-hidden bg-bg-dark">
      <button
        type="button"
        onClick={() => setOpen(!open)}
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
