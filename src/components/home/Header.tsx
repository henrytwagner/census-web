export const Header = () => {
    return (
        <header className="flex p-2 justify-between items-center bg-bg-dark border-b border-b-border">
            <div className="flex items-center flex-shrink-0 gap-2 w-[300px]">
                <div className="flex w-8 h-8 items-center flex-shrink-0 rounded-lg bg-white"></div>
                <div className="w-[1px] h-8 bg-border"></div>
                <div className="flex w-24 justify-between items-center flex-shrink-0">
                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-amber-500 z-50"></div>
                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-pink-500 -ml-3 z-40"></div>
                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-green-500 -ml-3 z-30"></div>
                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-blue-500 -ml-3 z-20"></div>
                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-500 -ml-3 z-10"></div>
                </div>
            </div>
            <div className="flex h-6 p-1 justify-center items-center flex-shrink-0 w-90 bg-bg rounded-full gap-1.5 text-text-muted">
                <p className="text-xs not-italic font-normal">􀊫</p>
                <p className="text-xs not-italic font-normal">Search</p>
            </div>
            <div className="flex w-[300px] justify-end items-center gap-2.5 flex-shrink-0 text-text">
                <p className="text-xl not-italic font-normal">􀊫</p>
                <div className="flex w-8 h-8 flex-col justify-center items-center flex-shrink-0 rounded-full bg-blue-700 text-c-white">HW</div>
            </div>
        </header>
    );
}

