// src/app/(app)/(other)/c/[contactId]/layout.tsx  (Server Component)
import PersonFrame from "@/app/(app)/(other)/_components/person-frame.client";
import ContactSidebar from "@/app/(app)/(other)/c/[contactId]/_components/Sidebar";
export default async function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <PersonFrame Sidebar={ContactSidebar}>{children}</PersonFrame>
    );
}

