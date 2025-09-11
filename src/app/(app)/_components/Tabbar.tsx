// src/app/(wherever)/_components/Tabbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export type TabLink = {
  key: string;
  label: string;
  icon?: string;       // emoji/text icon
  href: string;        // internal route (e.g. "/c", "/o")
  prefetch?: boolean;  // defaults to Next.js default
  replace?: boolean;   // rarely needed; for non-history navigation
};

export default function Tabbar({ tabs }: { tabs: TabLink[] }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const baseActive =
    "flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border-t border-t-border border-l border-l-border border-r border-r-border";
  const baseInactive =
    "flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border border-border";

  return (
    <div className="flex flex-col items-start self-stretch" role="tablist" aria-label="Sections">
      <div className="flex h-8 items-start self-stretch">
        {tabs.map((t, i) => {
          const active = isActive(t.href);
          return (
            <div key={t.key} className="flex">
              <Link
                href={t.href}
                prefetch={t.prefetch}
                replace={t.replace}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.key}`}
                tabIndex={active ? 0 : -1}
                className={clsx(active ? baseActive : baseInactive)}
              >
                {t.icon && <span className="text-base">{t.icon}</span>}
                <span className="text-base text-nowrap">{t.label}</span>
              </Link>

              {/* vertical divider between tabs, preserved from your design */}
              {i < tabs.length - 1 && (
                <div className="flex w-0.5 justify-center items-center self-stretch border-b border-b-border" />
              )}
            </div>
          );
        })}

        {/* "+" block and trailing divider, preserved */}
        <div className="flex py-1 px-3 justify-center items-center gap-2 self-stretch border-b border-b-border">
          <span className="text-xl">+</span>
        </div>
        <div className="flex w-full justify-center items-center self-stretch border-b border-b-border" />
      </div>
    </div>
  );
}
