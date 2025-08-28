export default function Home() {
    return (
        // Whole Page (Padded)
        <div className="overflow-scroll flex flex-1 w-full h-full px-40 py-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            {/* Header */}
            <div className="flex items-center gap-4 self-stretch justify-between">
                <p className="text-4xl">Organizations</p>
                <div className="px-4 py-2 bg-blue-600 text-white font-bold items-center justify-center text-center rounded-lg">Create Org</div>
            </div>
            {/* Body */}
            Tile view of organizations
        </div>
    );
}
