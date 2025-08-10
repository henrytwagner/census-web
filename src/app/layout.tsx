import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { getUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Census",
  description: "Census",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="font-semibold">Census</Link>

            {user ? (
              <nav className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm text-gray-700 hover:underline">Dashboard</Link>
                <Link href="/contacts" className="text-sm text-gray-700 hover:underline">Contacts</Link>
                <Link href="/organizations" className="text-sm text-gray-700 hover:underline">Organizations</Link>

                <span className="hidden text-sm text-gray-500 sm:inline">
                  Hi, {user.username}
                </span>

                <LogoutButton className="rounded bg-gray-900 px-3 py-1.5 text-sm text-white" />
              </nav>
            ) : (
              <nav className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-gray-700 hover:underline">Sign in</Link>
                <Link
                  href="/register"
                  className="rounded bg-gray-900 px-3 py-1.5 text-sm text-white"
                >
                  Create account
                </Link>
              </nav>
            )}
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
