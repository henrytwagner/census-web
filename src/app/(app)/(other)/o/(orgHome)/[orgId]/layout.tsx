"use client";

// src/app/(app)/(other)/o/[orgId]/layout.tsx
import { OrgProvider } from "@/app/(app)/contexts/org/OrgContext";
import Tabbar, { TabLink } from "@/app/(app)/_components/Tabbar";
import OrganizationHeader from "./_components/OrganizationHeader";

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;

  const tabs: TabLink[] = [
    { key: "members", label: "Members", icon: "👥", href: `/o/${orgId}/members` },
    { key: "overview", label: "Overview", icon: "📄", href: `/o/${orgId}/overview` },
    { key: "calendar", label: "Calendar", icon: "📅", href: `/o/${orgId}/calendar` },
  ];

  return (
    <OrgProvider value={{ orgId }}>
      <main className="flex items-start w-full h-full bg-bg-dark justify-center">
        <div className="overflow-scroll flex flex-1 w-full h-full max-w-300 px-40 pb-30 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
          {/* If OrganizationHeader only needs orgId, let it fetch itself */}
          <OrganizationHeader />
          <Tabbar tabs={tabs} />
          <div className="overflow-scroll flex flex-1 w-full flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            {children}
          </div>
        </div>
      </main>
    </OrgProvider>
  );
}
