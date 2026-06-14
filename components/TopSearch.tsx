"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { contentPages } from "@/lib/siteContent";

export default function TopSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return contentPages
      .filter((page) =>
        [page.title, page.section, page.summary, ...page.tags]
          .join(" ")
          .toLowerCase()
          .includes(clean),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur">
      <label className="mx-auto block max-w-3xl text-sm font-medium text-ink">
        Global search
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
          placeholder="Search ASAM, progress notes, confidentiality, resources..."
        />
      </label>
      {results.length > 0 ? (
        <div className="absolute left-4 right-4 top-20 mx-auto grid max-w-3xl gap-1 rounded-lg border border-ink/10 bg-white p-2 shadow-soft">
          {results.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              onClick={() => setQuery("")}
              className="focus-ring rounded-md px-3 py-2 text-sm text-ink hover:bg-paper"
            >
              <strong>{page.title}</strong>
              <span className="ml-2 text-ink/55">{page.section}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
