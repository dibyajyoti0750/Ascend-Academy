"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/course-list/${encodeURIComponent(query)}`);
  };

  return (
    <form className="w-full" onSubmit={onSearch}>
      <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-border bg-background/70 px-3 sm:h-12 sm:gap-3 sm:rounded-2xl sm:px-4">
        <Search className="size-4 shrink-0 text-muted-foreground sm:size-5" />

        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:text-base"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="flex shrink-0 items-center justify-center text-muted-foreground transition hover:text-foreground"
          >
            <X className="size-4 sm:size-5" />
          </button>
        )}
      </div>
    </form>
  );
}
