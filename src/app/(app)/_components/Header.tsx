// Header.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrganizationDto = {
    id: string;
    name: string;
    imageUrl?: string | null;  // ⬅️ backend-provided icon URL
};

export const Header = () => {
    const router = useRouter();
    const [orgs, setOrgs] = useState<OrganizationDto[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);     // NEW: sidebar open/close state


    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch("/api/organizations/mine", { cache: "no-store" });
                const txt = await res.text();
                if (!res.ok) throw new Error(txt || `Failed: ${res.status}`);
                const payload = JSON.parse(txt);
                const list: OrganizationDto[] = Array.isArray(payload)
                    ? payload
                    : payload?.items ?? payload?.data ?? [];
                if (!Array.isArray(list)) throw new Error("Unexpected organizations response");
                if (alive) setOrgs(list);
            } catch (e) {
                if (alive) setErr(e instanceof Error ? e.message : "Failed to load organizations");
            }
        })();
        return () => { alive = false; };
    }, []);

    const palette = ["bg-amber-500", "bg-pink-500", "bg-green-500", "bg-blue-500", "bg-red-500"];
    const zClasses = ["z-50", "z-40", "z-30", "z-20", "z-10"];

    return (
        <header className="flex p-2 justify-between items-center bg-bg-dark border-b border-b-border">
            <div className="flex items-center flex-shrink-0 gap-2 w-[300px]">
                {/* Write box → /c */}
                <div
                    className="flex w-8 h-8 items-center flex-shrink-0 rounded-lg bg-white cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push("/c")}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/c"); } }}
                    title="Compose"
                ></div>

                <div className="w-[1px] h-8 bg-border"></div>

                {/* Org badges (same wrapper/classes, now image-aware) */}
                <div className="flex w-24 justify-between items-center flex-shrink-0">
                    {orgs.map((org, idx) => {
                        const color = palette[idx % palette.length];
                        const z = zClasses[idx % zClasses.length];
                        const overlap = idx === 0 ? "" : "-ml-3";
                        const hasImage = !!org.imageUrl;

                        return (
                            <div
                                key={org.id}
                                className={`w-8 h-8 flex-shrink-0 rounded-lg ${overlap} ${z} cursor-pointer ${hasImage ? "" : color} overflow-hidden`}
                                role="button"
                                tabIndex={0}
                                title={org.name}
                                onClick={() => router.push(`/o/${org.id}`)}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(`/o/${org.id}`); } }}
                            >
                                {hasImage && (
                                    <img
                                        src={org.imageUrl as string}
                                        alt={`${org.name} logo`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Center search pill — unchanged */}
            <div className="flex h-6 p-1 justify-center items-center flex-shrink-0 w-90 bg-bg rounded-full gap-1.5 text-text-muted">
                <p className="text-xs not-italic font-normal">􀊫</p>
                <p className="text-xs not-italic font-normal">Search</p>
            </div>

            {/* Right menu/avatar — now toggles sidebar & links to /p */}
            <div className="flex w-[300px] justify-end items-center gap-2.5 flex-shrink-0 text-text">
                <button
                    className="text-xl not-italic font-normal rounded-lg px-2 py-1 hover:bg-bg"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(true)}
                >
                    ☰
                </button>
                {/* Need to change to link to /p{ProfileID} */}
                <button
                    aria-label="Open profile"
                    onClick={() => router.push('/p')}
                    className="flex w-8 h-8 flex-col justify-center items-center flex-shrink-0 rounded-full bg-blue-700 text-[#fff]"
                >
                    HW
                </button>
            </div>




            {/* Return for Sidebar overlay + panel */}
            {menuOpen && (
                <>
                    {/* Backdrop */}
                    <button
                        aria-label="Close sidebar"
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-40 bg-black/40"
                    />

                    {/* NOT Functioning Panel */}
                    <aside className="fixed right-0 top-0 z-50 h-screen w-[320px] max-w-[85vw] bg-bg text-text border-l border-border shadow-2xl flex flex-col">
                        <div className="p-4 border-b border-border flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">HW</div>
                            <div className="leading-tight">
                                <div className="font-semibold">Name</div>
                                <div className="text-text-muted text-sm">@username</div>
                            </div>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="ml-auto rounded-lg px-2 py-1 text-sm text-text-muted hover:bg-bg-dark/50"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="p-2">
                            <a className="block px-3 py-2 rounded-lg hover:bg-bg-dark" href="/preferences">Preferences</a>
                            <a className="block px-3 py-2 rounded-lg hover:bg-bg-dark" href="/">Home</a>
                        </nav>

                        <div className="mt-auto p-4">
                            <button className="text-left px-3 py-2 rounded-lg hover:bg-bg-dark w-full">
                                Logout
                            </button>
                        </div>
                    </aside>
                </>
            )}
        </header>
    );
};
