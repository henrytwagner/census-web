// src/app/(app)/(other)/o/[orgId]/_components/OrganizationHeader.tsx
"use client";
import { useOrg } from "@/lib/hooks/useOrg";
import { useRouteOrgId } from "@/lib/hooks/useOrgId";
import Image from "next/image";

export default function OrganizationHeader() {
    const orgId = useRouteOrgId()
    const { org } = useOrg(orgId);

    const name = org?.name ?? "";
    const description = org?.description ?? "";
    const imageUrl = org?.imageUrl;

    if (!orgId) return null; // or a tiny fallback

    return (
        <div className="flex items-center gap-4 self-stretch justify-between">
            <div className="flex h-fit w-full items-center self-stretch justify-between">
                <div className="flex flex-col justify-center items-start gap-2 self-stretch">
                    <p className="text-4xl text-text not-italic font-normal">{name}</p>
                    <p className="text-base text-muted">{description}</p>
                </div>
                <div>
                    <div className="bg-red-700 flex w-32 h-32 items-center rounded-b-4xl overflow-hidden">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={`${name} logo`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white mx-auto">No Image</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
