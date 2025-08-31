import Searchbar from "../../../../_components/Searchbar";

export default function OrganizationSidebar() {
    return (
        <div className="flex w-50 h-full px-2 pb-8 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border overflow-hidden">
            <div className="flex justify-between items-start self-stretch text-text">
                <div className="py-2">
                    <p className="text-s not-italic font-normal">←</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-red-600 h-16 w-16 rounded-b-2xl"></div>
                    <p className="text-s not-italic font-normal">NCHS Swim & Dive</p>
                </div>
                <div className="py-2">
                    <p className="text-s not-italic font-normal">+</p>
                </div>
            </div>
            <Searchbar />
            <div className="flex flex-col items-start self-stretch overflow-scroll">
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">A</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch justify-between">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Grace</p>
                        <p className="text-xs not-italic font-bold">Anderson</p>
                    </div>
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">B</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch justify-between">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Andrew</p>
                        <p className="text-xs not-italic font-bold">Baker</p>
                    </div>
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                    <p className="text-xs not-italic font-normal">W</p>
                </div>
                <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch justify-between">
                    <div className="flex items-center gap-0.5">
                        <p className="text-xs not-italic font-normal">Henry</p>
                        <p className="text-xs not-italic font-bold">Wagner</p>
                    </div>
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
