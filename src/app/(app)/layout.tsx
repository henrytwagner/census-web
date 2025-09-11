import { Header } from "@/app/(app)/_components/Header";
import { PersonViewProvider } from "@/app/(app)/contexts/view/PersonViewContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <PersonViewProvider>
            <div className="flex flex-col flex-start h-full">
                <Header />
                {children}
            </div>
        </PersonViewProvider>

    );
}
