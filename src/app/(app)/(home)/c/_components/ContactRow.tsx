// ContactRow.tsx
import Image from 'next/image';

interface ContactRowProps {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    imageUrl?: string;
    onClick?: () => void;           // 👈 added

}

export default function ContactRow({
    firstName,
    lastName,
    phone,
    email,
    imageUrl,
    onClick,
}: ContactRowProps) {
    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex flex-row items-center gap-4 self-stretch justify-between"
            role="button"            // a11y; no visual change
            tabIndex={0}             // focusable via keyboard
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick();
                }
            }}>
            <div className="flex flex-row items-center gap-4 self-stretch">
                <div className="bg-gray-700 flex w-12 h-12 items-center justify-center rounded-full overflow-hidden text-white font-medium">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>
                <div className="flex flex-col justify-center items-start g-2 self-stretch">
                    <p className="text-lg text-text not-italic font-normal">
                        {firstName} <span className="font-bold">{lastName}</span>
                    </p>
                </div>
            </div>

            <p className="text-sm text-muted not-italic font-normal">{phone}</p>
            <p className="text-sm text-muted not-italic font-normal">{email}</p>
        </div>
    );
}
