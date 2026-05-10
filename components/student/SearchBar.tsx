import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3">
      <Search className="size-5 shrink-0 text-muted-foreground" />

      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-sm text-muted-foreground cursor-pointer"
        >
          <X />
        </button>
      )}
    </div>
  );
}
