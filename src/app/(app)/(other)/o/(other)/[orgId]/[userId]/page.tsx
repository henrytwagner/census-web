// src/app/(app)/(other)/c/[contactId]/page.tsx
import { redirect } from "next/navigation";

export default async function ContactIndex({
  params,
}: { params: Promise<{ orgId: string, userId: string }> }) {
  const { orgId, userId } = await params;
  redirect(`/o/${orgId}/${userId}/profile`);
}
