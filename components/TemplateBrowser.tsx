"use client";

import { useMemo, useState } from "react";
import { documentationTemplates } from "@/lib/content";

export default function TemplateBrowser() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(documentationTemplates[0].title);

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return documentationTemplates;
    return documentationTemplates.filter((template) =>
      [template.title, ...template.sections].some((value) =>
        value.toLowerCase().includes(clean),
      ),
    );
  }, [query]);

  const selected =
    filtered.find((template) => template.title === active) ?? filtered[0];

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-ink">Template browser</h3>
          <p className="mt-2 text-sm text-ink/70">
            Search templates, then use the checklist as a practice scaffold.
          </p>
        </div>
        <label className="text-sm font-medium text-ink lg:w-80">
          Search
          <input
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-paper px-3 py-2"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="DAP, discharge, group..."
          />
        </label>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filtered.map((template) => (
          <button
            key={template.title}
            type="button"
            onClick={() => setActive(template.title)}
            className={`focus-ring whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold ${
              selected?.title === template.title
                ? "border-lagoon bg-lagoon text-white"
                : "border-ink/10 bg-paper text-ink hover:border-lagoon"
            }`}
          >
            {template.title}
          </button>
        ))}
      </div>
      {selected ? (
        <div className="mt-5 rounded-lg border border-ink/10 bg-paper p-4">
          <h4 className="font-semibold text-ink">{selected.title}</h4>
          <div className="mt-3 grid gap-2">
            {selected.sections.map((section) => (
              <label key={section} className="flex gap-3 text-sm text-ink/75">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-lagoon" />
                <span>{section}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-lg border border-dashed border-ink/20 bg-paper p-4 text-sm text-ink/70">
          No templates match that search.
        </p>
      )}
    </section>
  );
}
