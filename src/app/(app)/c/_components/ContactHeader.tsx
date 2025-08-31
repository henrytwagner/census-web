interface ContactHeaderProps {
    name: string;
    imageUrl?: string;
}

export default function ContactHeader({ name, imageUrl }: ContactHeaderProps) {
    return (
        <div className="flex items-center gap-4 self-stretch justify-between">
            <div className="flex h-fit w-full items-center self-stretch justify-between">
                <div className="flex flex-col justify-center items-start g-2 self-stretch">
                    <p className="text-4xl text-text not-italic font-normal">{name}</p>
                </div>
                <div>
                    <div className="bg-blue-700 flex w-32 h-32 items-center rounded-b-4xl">{imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`${name} logo`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white mx-auto">No Image</span>
                    )}</div>
                </div>
            </div>
        </div>
    )
}
