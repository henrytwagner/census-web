import Tabbar from "./Tabbar";

export default function ContactPage() {
    return (
        <div className="flex flex-1 w-full h-full px-22 py-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            <div className="flex items-center gap-4 self-stretch">
                {/* Profile Photo*/}
                <div className="flex w-24 h-24 justify-end items-center rounded-full bg-blue-500"></div>
                {/* -------------*/}
                <div className="flex flex-col justify-center items-start">
                    <p className="text-4xl not-italic font-normal text-text">Henry Wagner</p>
                    <p className="text-2xl not-italic font-normal text-text-muted">@htwags</p>
                </div>
            </div>
            <Tabbar />
        </div>
    );
}
