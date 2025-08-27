export default function ContactList() {
    return (
        <div className="flex w-50 h-full p-2 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border">
            <div className="flex justify-between items-start self-stretch text-text">
                <p className="text-s not-italic font-normal">←</p>
                <p className="text-s not-italic font-normal">Contacts</p>
                <p className="text-s not-italic font-normal">+</p>
            </div>
            <div className="flex h-6 p-1 justify-start items-center flex-shrink-0 w-full bg-bg rounded-full gap-1.5 text-text-muted">
                <p className="text-xs not-italic font-normal">􀊫</p>
                <p className="text-xs not-italic font-normal">Search</p>
            </div>
            <div className="flex flex-col items-start self-stretch">
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">A</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Grace</p>
                        <p className="text-xs not-italic font-bold">Anderson</p>
                    </div>
                </div>
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">B</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Andrew</p>
                        <p className="text-xs not-italic font-bold">Baker</p>
                    </div>
                </div>
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">W</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Henry</p>
                        <p className="text-xs not-italic font-bold">Wagner</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
