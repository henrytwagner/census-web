// src/app/(wherever)/_components/Tabbar.tsx
"use client";

import { useCallback } from "react";

type TabDef = {
  key: string;
  icon?: string;   // keep as text/emoji to match current markup
  label: string;
};

interface TabbarProps {
  tabs: TabDef[];
  activeKey: string;
  onChange: (key: string) => void;
}

export default function Tabbar({ tabs, activeKey, onChange }: TabbarProps) {
  const handleClick = useCallback((key: string) => () => onChange(key), [onChange]);

  return (
    <div className="flex flex-col items-start self-stretch">
      <div className="flex h-8 items-start self-stretch">

        {tabs.map((t, i) => {
          const isActive = t.key === activeKey;

          // classes copied exactly from your sample:
          // - active tab = first block’s classes
          // - inactive tab = second block’s classes
          const baseActive =
            "flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border-t border-t-border border-l border-l-border border-r border-r-border";
          const baseInactive =
            "flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border border-border";

          return (
            <div key={t.key} className="flex">
              <button
                type="button"
                onClick={handleClick(t.key)}
                className={isActive ? baseActive : baseInactive}
              >
                {t.icon && <p className="text-base not-italic font-normal">{t.icon}</p>}
                <p className="text-base not-italic font-normal text-nowrap">{t.label}</p>
              </button>

              {/* vertical divider between tabs, same as your sample */}
              {i < tabs.length - 1 && (
                <div className="flex w-0.5 justify-center items-center self-stretch border-b-1 border-b-border"></div>
              )}
            </div>
          );
        })}

        {/* "+" button block — preserved exactly */}
        <div className="flex py-1 px-3 justify-center items-center gap-2 self-stretch border-b border-b-border">
          <p className="text-xl not-italic font-normal">+</p>
        </div>

        {/* trailing full-width divider — preserved exactly */}
        <div className="flex w-full justify-center items-center self-stretch border-b border-b-border"></div>
      </div>
    </div>
  );
}
