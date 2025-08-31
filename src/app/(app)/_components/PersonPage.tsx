import { useMemo, useState } from "react";
import Tabbar from "./Tabbar";
import OrganizationMembersPage from "../o/[orgId]/_components/OrganizationMembersPage";

type TabPage = {
    key: string;
    icon?: string;
    label: string;
    component: React.ReactNode;
};

export default function ContactPage() {
    // define tabs (label/icon + component)
    const tabs: TabPage[] = useMemo(
        () => [
            { key: "contacts", icon: "👤", label: "Contact", component: <OrganizationMembersPage /> },
        ],
        []
    );

    const [activeKey, setActiveKey] = useState<string>(tabs[0]?.key ?? "contacts");
    const activeComponent = tabs.find(t => t.key === activeKey)?.component ?? null;

    const firstName = "Henry";
    const lastName = "Wagner";
    const imageUrl = undefined; // or provide a URL to test the image rendering
    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex flex-1 w-full h-full px-40 py-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            <div className="flex items-center gap-4 self-stretch">
                {/* Profile Photo*/}
                <div className="bg-gray-700 flex w-24 h-24 items-center justify-center rounded-full overflow-hidden text-white font-medium text-4xl">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>  
                {/* -------------*/}
                <div className="flex flex-col justify-center items-start">
                    <p className="text-4xl not-italic font-normal text-text">Henry Wagner</p>
                    <p className="text-2xl not-italic font-normal text-text-muted">@htwags</p>
                </div>
            </div>
            <Tabbar
                tabs={tabs.map(({ key, icon, label }) => ({ key, icon, label }))}
                activeKey={activeKey}
                onChange={setActiveKey}
            />        </div>
    );
}
