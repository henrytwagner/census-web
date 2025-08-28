export default function PersonRow() {
    return (
        <div className="flex flex-row items-center gap-4 self-stretch">
            <div className="bg-gray-700 flex w-12 h-12 items-center rounded-full"></div>
            <div className="flex flex-col justify-center items-start g-2 self-stretch">
                <p className="text-lg text-text not-italic font-normal">Jane Doe</p>
                <p className="text-sm text-muted not-italic font-normal">@janedoe</p>
            </div>
        </div>
    );
}
