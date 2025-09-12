// src/app/(app)/(other)/c/[contactId]/layout.tsx  (Server Component)
import PersonFrame from "../../../../_components/person-frame.client";
import OrganizationSidebar from "./_components/Sidebar";
export default async function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PersonFrame Sidebar={OrganizationSidebar}>{children}</PersonFrame>
    );
}

