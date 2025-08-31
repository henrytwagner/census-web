// PersonRow.tsx
interface PersonRowProps {
    firstName: string;
    lastName: string;
    username: string;        // e.g. "@janedoe"
    phone: string;
    email: string;
    lastActive: string;    // e.g. "10/12/2023" (formatted upstream)
    status: "Active" | "Inactive" | string;
    statusColorClass?: string; // tailwind color class for the dot/text (optional)
}

export default function PersonRow({
    firstName,
    lastName,
    username,
    phone,
    email,
    lastActive,
    status,
}: PersonRowProps) {
    return (
        <div className="flex flex-row items-center gap-4 self-stretch justify-between">
            <div className="flex flex-row items-center gap-4 self-stretch">
                <div className="bg-gray-700 flex w-12 h-12 items-center rounded-full"></div>
                <div className="flex flex-col justify-center items-start g-2 self-stretch">
                    <p className="text-lg text-text not-italic font-normal">{firstName} <span className="font-bold">{lastName}</span></p>
                    <p className="text-sm text-muted not-italic font-normal">{username}</p>
                </div>
            </div>

            <p className="text-sm text-muted not-italic font-normal">{phone}</p>
            <p className="text-sm text-muted not-italic font-normal">{email}</p>
            <p className="text-sm text-muted not-italic font-normal">{lastActive}</p>

            <div className="flex items-center gap-2.5">
                <div className={`h-2 w-2 rounded-full ${status == "active" ? "bg-green-500" : "bg-red-500"}`}></div>
                <div className={`${status == "active" ? "text-green-500" : "text-red-500"} text-sm not-italic font-normal`}>{status}</div>
            </div>
        </div>
    );
}
