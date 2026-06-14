"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { contentPages } from "@/lib/siteContent";

export default function TopSearch() {
  const [query, setQuery] = useState("");
  const [googleQuery, setGoogleQuery] = useState("");
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

  function searchGoogle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = googleQuery.trim();
    if (!clean) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(clean)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.65fr)] lg:items-end">
        <label className="block text-sm font-medium text-ink">
          LADC Compass search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
            placeholder="Search ASAM, progress notes, confidentiality, resources..."
          />
        </label>
        <form onSubmit={searchGoogle} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block text-sm font-medium text-ink">
            Google search
            <input
              value={googleQuery}
              onChange={(event) => setGoogleQuery(event.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
              placeholder="Search the web..."
            />
          </label>
          <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Google
          </button>
        </form>
      </div>
      {results.length > 0 ? (
        <div className="absolute left-4 right-4 top-24 mx-auto grid max-w-5xl gap-1 rounded-lg border border-ink/10 bg-white p-2 shadow-soft lg:top-20">
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
