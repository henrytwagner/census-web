// src/app/(app)/(other)/c/[contactId]/layout.tsx  (Server Component)
import { PersonProvider } from "@/app/(app)/contexts/person/PersonContext";
import PersonFrame from "../../../../_components/person-frame.client";
import OrganizationSidebar from "./_components/Sidebar";
export default async function ContactLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ orgId: string, userId: string }>;
}) {
    const { orgId, userId } = await params; // Next 15: await params

    return (
        <PersonProvider userId={userId}>
            <PersonFrame Sidebar={OrganizationSidebar}>{children}</PersonFrame>
        </PersonProvider>
    );
}

