// SidebarSheet.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function AppOptionsSidebar({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const pathname = usePathname();

    // Close on route change
    useEffect(() => { onClose(); /* eslint-disable-next-line */ }, [pathname]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <button
                aria-label="Close sidebar"
                onClick={onClose}
                className={[
                    'fixed inset-0 z-[60] bg-black/40 transition-opacity',
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            />

            {/* Panel */}
            <aside
                aria-hidden={!open}
                className={[
                    'fixed right-0 top-0 z-[70] h-screen w-[320px] max-w-[85vw]',
                    'bg-bg text-text border-l border-border',
                    'shadow-2xl transition-transform duration-200',
                    open ? 'translate-x-0' : 'translate-x-full',
                    'flex flex-col',
                ].join(' ')}
            >
                {/* Not functioning */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                    <img
                        src="/avatar.png"
                        alt=""
                        className="w-10 h-10 rounded-full object-cover bg-blue-700"
                    />
                    <div className="leading-tight">
                        <div className="font-semibold">Name</div>
                        <div className="text-text-muted text-sm">@username</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-auto rounded-lg px-2 py-1 text-sm text-text-muted hover:bg-bg-dark/50"
                    >
                        ✕
                    </button>
                </div>

                {/* Not functioning */}
                <nav className="p-2">
                    <Link className="block px-3 py-2 rounded-lg hover:bg-bg-dark" href="/preferences">
                        Preferences
                    </Link>
                    <Link className="block px-3 py-2 rounded-lg hover:bg-bg-dark" href="/">
                        Home
                    </Link>
                </nav>


                {/* Not functioning */}
                <div className="mt-auto p-4">
                    <button className="text-left px-3 py-2 rounded-lg hover:bg-bg-dark w-full">
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
