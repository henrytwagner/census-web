interface SearchbarProps {
  align?: "left" | "center"; // defaults to left
}

export default function Searchbar({ align = "left" }: SearchbarProps) {
  return (
    <div
      className={`flex h-6 p-1 items-center flex-shrink-0 w-full bg-bg rounded-full gap-1.5 text-text-muted ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <p className="text-xs not-italic font-normal">O</p>
      <p className="text-xs not-italic font-normal">Search</p>
    </div>
  );
}
