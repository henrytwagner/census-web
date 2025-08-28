import ContactList from "../_components/ContactList";

export default function Home() {
    return (
        <main className="flex items-start w-full h-full bg-bg-dark overflow-hidden">
            <ContactList type="contact"/>
        </main>
    );
}
