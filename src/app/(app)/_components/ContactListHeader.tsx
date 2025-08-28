export default function ContactListHeader() {

    const type = "organization"; // "contact" | "organization"


    if (type === "contact") {
        return (
            <div className="flex items-center gap-4 self-stretch justify-between">
                <div className="flex h-fit w-full items-center self-stretch justify-between">
                    <div className="flex flex-col justify-center items-start g-2 self-stretch">
                        {/* IDEA: Could say contacts with or without tab bar here or have it say
                         census and have contacts be a sub tab*/}
                         {/* IDEA: maybe could be the hub of users own info - e.g. a page of contacts, calendar, their own public profile */}
                        <p className="text-5xl text-text not-italic font-normal">Contacts</p>
                    </div>
                    <div>
                        <div className="bg-blue-500 flex w-32 h-32 items-center rounded-b-4xl"></div>
                    </div>
                </div>
            </div>
        )
    } else if (type === "organization") {
        return (
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
        )
    }
}
