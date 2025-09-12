// app/(app)/o/[orgId]/page.tsx (server)
import { redirect } from "next/navigation";
export default function OrgIndex({ params }: { params: Promise<{ orgId: string }> }) {
  return params.then(({ orgId }) => redirect(`/o/${orgId}/members`));
}
