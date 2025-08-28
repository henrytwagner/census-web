import ContactListContacts from "./ContactListContacts";
import ContactListHeader from "./ContactListHeader";
import ContactSidebar from "./ContactSidebar";
import Tabbar from "./Tabbar";

export default function ContactList() {
    return (
        // Whoel Page (Padded)
        <div className="flex flex-1 w-full h-full px-40 pb-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
            {/* Header */}
            <ContactListHeader />
            {/* Potentially a card carosel with notifications are action items or something */}
            {/* Tab Bar */}
            <Tabbar />
            <ContactListContacts />
        </div>
    );
}
