"use client";

import { FormEvent, useMemo, useState } from "react";
import { resourceCategories } from "@/lib/siteContent";

type Resource = {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string;
  address: string;
  notes: string;
};

const starterResources: Resource[] = [
  {
    id: "housing",
    name: "Housing Resource Placeholder",
    category: "Housing",
    phone: "",
    website: "",
    address: "",
    notes: "Add local housing contacts here.",
  },
];

export default function ResourceDatabase() {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>(starterResources);

  const filtered = useMemo(() => {
    const clean = query.toLowerCase();
    return resources.filter((resource) =>
      Object.values(resource).join(" ").toLowerCase().includes(clean),
    );
  }, [query, resources]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResources((current) => [
      {
        id: crypto.randomUUID(),
        name: String(data.get("name") || ""),
        category: String(data.get("category") || ""),
        phone: String(data.get("phone") || ""),
        website: String(data.get("website") || ""),
        address: String(data.get("address") || ""),
        notes: String(data.get("notes") || ""),
      },
      ...current,
    ]);
    event.currentTarget.reset();
  }

  return (
    <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-semibold text-ink">Add a resource</h2>
        {["name", "phone", "website", "address"].map((name) => (
          <label key={name} className="mt-4 block text-sm font-medium capitalize text-ink">
            {name}
            <input name={name} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
          </label>
        ))}
        <label className="mt-4 block text-sm font-medium text-ink">
          Category
          <select name="category" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
            {resourceCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium text-ink">
          Notes
          <textarea name="notes" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
        </label>
        <button className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
          Save resource
        </button>
      </form>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-semibold text-ink">Search resources</h2>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring mt-4 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
          placeholder="Search category, name, phone, notes..."
        />
        <div className="mt-4 grid gap-3">
          {filtered.map((resource) => (
            <article key={resource.id} className="rounded-lg border border-ink/10 bg-paper p-4">
              <h3 className="font-semibold text-ink">{resource.name}</h3>
              <p className="mt-1 text-sm text-ink/70">{resource.category}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-ink/70">{resource.notes}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a className="focus-ring rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink" href={`https://www.google.com/search?q=${encodeURIComponent(resource.name)}`} target="_blank" rel="noreferrer">
                  Google search
                </a>
                <a className="focus-ring rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink" href={`https://www.google.com/maps/search/${encodeURIComponent(resource.address || resource.name)}`} target="_blank" rel="noreferrer">
                  Maps search
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
