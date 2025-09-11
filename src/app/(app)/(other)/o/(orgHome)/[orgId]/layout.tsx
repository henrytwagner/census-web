// src/app/(app)/(other)/o/[orgId]/layout.tsx
import Tabbar, { TabLink } from "@/app/(app)/_components/Tabbar";
import OrganizationHeader from "@/app/(app)/(other)/o/(orgHome)/[orgId]/_components/OrganizationHeader";
import { OrgProvider, OrgInfo } from "./OrgRouteContext";
import { headers, cookies } from "next/headers";

async function getOrg(base: string, orgId: string): Promise<OrgInfo | null> {
    const token = (await cookies()).get("ACCESS_TOKEN")?.value;
    const res = await fetch(`${base}/api/organizations/${orgId}`, {
        cache: "no-store", // or: next: { revalidate: 60 } if the data is public
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to load org ${orgId}: ${res.status}`);
    return res.json();
}

export default async function OrgLayout({
    children,
    params
}: {
    children: React.ReactNode;
    // 👇 note: params is a Promise here
    params: Promise<{ orgId: string }>;
}) {
    const { orgId } = await params;
    const base = process.env.BACKEND_URL || "http://localhost:3000";

    const org = await getOrg(base, orgId);

    return (
        <OrgProvider value={{ orgId, org: org ?? undefined }}>
            <main className="flex items-start w-full h-full bg-bg-dark">
                {/* Whole Page (Padded) */}
                <div className="overflow-scroll flex flex-1 w-full h-full px-40 pb-30 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                    {/* Header */}

                    <OrganizationHeader
                        name={org?.name ?? ""}
                        description={org?.description ?? ""}
                        imageUrl={org?.imageUrl ?? undefined}
                    />

                    {/* Tab Bar (no visual changes) */}
                    <Tabbar tabs={[
                        { key: "members", label: "Members", icon: "👥", href: `/o/${orgId}/members` },
                    ]} />

                    <div className="overflow-scroll flex flex-1 w-full flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                        {children}
                    </div>
                </div>
            </main>
        </OrgProvider>
    );
}
