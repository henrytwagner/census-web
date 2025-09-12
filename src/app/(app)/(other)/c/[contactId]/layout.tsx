// src/app/(app)/(other)/c/[contactId]/layout.tsx  (Server Component)
import ContactFrame from "@/app/(app)/(other)/_components/person-frame.client";
import PersonFrame from "@/app/(app)/(other)/_components/person-frame.client";
import ContactSidebar from "@/app/(app)/(other)/c/[contactId]/_components/Sidebar";
export default async function ContactLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ contactId: string }>;
}) {
    const { contactId } = await params; // Next 15: await params

    return (
        <PersonFrame Sidebar={ContactSidebar}>{children}</PersonFrame>
    );
}

