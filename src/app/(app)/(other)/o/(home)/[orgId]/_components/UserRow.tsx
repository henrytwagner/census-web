import Image from "next/image";

// UserRow.tsx
interface UserRowProps {
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    imageUrl?: string;
    onClick?: () => void;           // 👈 added
}

export default function UserRow({
    firstName,
    lastName,
    username,
    phone,
    email,
    imageUrl,
    onClick,
}: UserRowProps) {
    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
    // const isActive = String(status).toLowerCase() === "active";

    return (
        <div
            className="flex flex-row items-center gap-4 self-stretch justify-between"
            role="button"            // a11y; no visual change
            tabIndex={0}             // focusable via keyboard
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="flex flex-row items-center gap-4 self-stretch">
                <div className="bg-gray-700 flex w-12 h-12 items-center justify-center rounded-full overflow-hidden text-white font-medium">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={`${firstName ?? ""} ${lastName ?? ""}`} className="w-full h-full object-cover" />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>
                <div className="flex flex-col justify-center items-start g-2 self-stretch">
                    <p className="text-lg text-text not-italic font-normal">
                        {firstName} <span className="font-bold">{lastName}</span>
                    </p>
                    <p className="text-sm text-muted not-italic font-normal">{username}</p>
                </div>
            </div>

            <p className="text-sm text-muted not-italic font-normal">{phone}</p>
            <p className="text-sm text-muted not-italic font-normal">{email}</p>

            {/* <div className="flex items-center gap-2.5">
                <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`}></div>
                <div className={`${isActive ? "text-green-500" : "text-red-500"} text-sm not-italic font-normal`}>{status}</div>
            </div> */}
        </div>
    );
}
