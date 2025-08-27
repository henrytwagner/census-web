import { Header } from "@/app/(app)/_components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-start h-full">
            <Header />
            {children}
        </div>
    );
}
