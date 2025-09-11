// src/app/(app)/o/[orgId]/page.tsx
import { redirect } from "next/navigation";

export default async function OrgIndex({ params }: { params: Promise<{ orgId: string }> }) {
    const { orgId } = await params;   // 👈 must await
    redirect(`/o/${orgId}/members`);
}
