export default function Tabbar() {
    {/* TODO: make tabs inputs into component */}
    return (
        <div className="flex flex-col items-start self-stretch">
            <div className="flex h-8 items-start self-stretch">
                <div className="flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border-t border-t-border border-l border-l-border border-r border-r-border">
                    <p className="text-base not-italic font-normal">👤</p>
                    <p className="text-base not-italic font-normal">Contact</p>
                </div>
                <div className="flex w-0.5 justify-center items-center self-stretch border-b-1 border-b-border"></div>
                <div className="flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border border-border">
                    <p className="text-base not-italic font-normal">􀉪</p>
                    <p className="text-base not-italic font-normal text-nowrap">Public Profile</p>
                </div>
                <div className="flex py-1 px-3 justify-center items-center gap-2 self-stretch border-b border-b-border">
                    <p className="text-xl not-italic font-normal">+</p>
                </div>
                <div className="flex w-full justify-center items-center self-stretch border-b border-b-border"></div>
            </div>
        </div>
    );
}
