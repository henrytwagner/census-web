import { headers } from "next/headers";

type SpringHealth = { status: "UP" | "DOWN" } & Record<string, unknown>;

async function getHealth(): Promise<SpringHealth> {
    // Build an absolute URL to your Next server at runtime (works locally & in prod)
    const host = (await headers()).get("host");
    const protocol = process.env.VERCEL ? "https" : "http";
    const res = await fetch(`${protocol}://${host}/api/health`, {
        cache: "no-store", // always reflect live health
    });

    // Fallback if the proxy returns non-JSON on error
    const text = await res.text();
    try {
        return JSON.parse(text) as SpringHealth;
    } catch {
        return { status: "DOWN", error: text };
    }
}


type Me = { id: string; username: string; email: string };

async function getMe(): Promise<Me | null> {
    const h = headers();
    const host = (await h).get("host") || "localhost:3000";
    const protocol = process.env.VERCEL ? "https" : "http";

    // Forward the original request cookies to the BFF
    const cookie = (await h).get("cookie") ?? "";

    const res = await fetch(`${protocol}://${host}/api/auth/me`, {
        headers: { cookie },
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function DashboardPage() {
    const health = await getHealth();
    const isUp = health.status === "UP";
    const me = await getMe();


    return (
        <main className="p-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="mt-6 flex items-center gap-3">
                <span
                    className={`inline-flex h-3 w-3 rounded-full ${isUp ? "bg-green-500" : "bg-red-500"
                        }`}
                    aria-hidden
                />
                <span className="text-lg">
                    Spring API:{" "}
                    <strong className={isUp ? "text-green-600" : "text-red-600"}>
                        {isUp ? "UP" : "DOWN"}
                    </strong>
                </span>
            </div>

            {!isUp && health?.error ? (
                <pre className="mt-4 whitespace-pre-wrap rounded-md border bg-gray-50 p-3 text-sm text-gray-700">
                    {String(health.error)}
                </pre>
            ) : null}
            <p className="mt-2 text-gray-600">Logged in as: {me?.username}</p>

        </main>
    );
}
