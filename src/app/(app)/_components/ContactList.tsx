import Tabbar from "./Tabbar";

export default function ContactList() {
    return (
        // Whoel Page (Padded)
        <div className="flex flex-1 w-full h-full px-40 pb-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            {/* Header */}
            <div className="flex items-center gap-4 self-stretch justify-between">
                <div className="flex h-fit w-full items-center self-stretch justify-between">
                    <div className="flex flex-col justify-center items-start g-2 self-stretch">
                        <p className="text-4xl text-text not-italic font-normal">NCHS Swim & Dive</p>
                        <p className="text-base text-muted">Naperville Centrals Premier Swim & Dive Team</p>
                    </div>
                    <div>
                        <div className="bg-red-700 flex w-32 h-32 items-center rounded-b-4xl"></div>
                    </div>
                </div>
            </div>
            {/* Potentially a card carosel with notifications are action items or something */}
            {/* Tab Bar */}
            <Tabbar />
        </div>
    );
}
