"use client";

import HomeHeader from "@/app/(app)/_components/HomeHeader";
import Tabbar from "@/app/(app)/_components/Tabbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // define tabs (label/icon + component)

    return (
        <main className="flex w-full h-full bg-bg-dark justify-center">
            {/* Whole Page (Padded) */}
            {/* IDEA - justify-start and go split screun calendar view */}
            <div className="overflow-scroll flex flex-1 w-full h-full px-40 max-w-300 pb-30 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                {/* Header */}
                <HomeHeader
                    name="Census"
                />

                {/* Tab Bar (no visual changes) */}
                <Tabbar
                    tabs={[
                        { key: "contacts", label: "Contacts", icon: "👤", href: "/c" }, // route
                        { key: "orgs", label: "Organizations", icon: "🏢", href: "/o" },
                        { key: "cal", label: "Calendars", icon: "📅", href: "/cal" },
                        { key: "rem", label: "Reminders", icon: "⏰", href: "/r" },
                        { key: "profile", label: "Profile", icon: "🙍", href: "/p" },
                    ]}
                />

                <div className="overflow-scroll flex flex-1 w-full flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                    {children}
                </div>
            </div>
        </main>
    );
}
