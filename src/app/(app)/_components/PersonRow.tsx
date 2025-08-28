export default function PersonRow() {
    return (
        <div className="flex flex-row items-center gap-4 self-stretch justify-between">
            <div className="flex flex-row items-center gap-4 self-stretch">
                <div className="bg-gray-700 flex w-12 h-12 items-center rounded-full"></div>
                <div className="flex flex-col justify-center items-start g-2 self-stretch">
                    <p className="text-lg text-text not-italic font-normal">Jane Doe</p>
                    <p className="text-sm text-muted not-italic font-normal">@janedoe</p>
                </div>
            </div>

            <p className="text-sm text-muted not-italic font-normal">+1 (331) 210-3011</p>
            <p className="text-sm text-muted not-italic font-normal">henrywagner1175@gmail.com</p>
            <p className="text-sm text-muted not-italic font-normal">10/12/2023</p>

            <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                <div className="text-green-600 text-sm not-italic font-normal">Active</div>
            </div>
        </div>
    );
}

