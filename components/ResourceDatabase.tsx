"use client";

import { FormEvent, useMemo, useState } from "react";
import { resourceCategories } from "@/lib/siteContent";
import { useLocalEntries } from "@/lib/useLocalEntries";

type Resource = {
  id?: string;
  category: string;
  favorite?: boolean;
  organization: string;
  contactNames: string;
  phone: string;
  phoneExt: string;
  alternatePhone: string;
  fax: string;
  email: string;
  website: string;
  address: string;
  eligibility: string;
  services: string;
  referralSteps: string;
  hours: string;
  whyUseful: string;
  notes: string;
};

type CustomCategory = {
  id?: string;
  name: string;
};

const starterResources: Resource[] = [
  {
    id: "starter-crisis",
    category: "Crisis Resources",
    favorite: true,
    organization: "988 Suicide & Crisis Lifeline",
    contactNames: "24/7 crisis support",
    phone: "988",
    phoneExt: "",
    alternatePhone: "",
    fax: "",
    email: "",
    website: "https://988lifeline.org/",
    address: "Phone, text, and chat support",
    eligibility: "Anyone experiencing suicidal thoughts, emotional distress, substance use crisis, or concern for another person.",
    services: "Crisis support, safety support, connection to local crisis resources.",
    referralSteps: "Client can call or text 988 directly. Use emergency services for immediate life-threatening danger.",
    hours: "24/7",
    whyUseful: "Useful for crisis planning, safety conversations, and immediate support when risk concerns are present.",
    notes: "Use for crisis planning and client education. Not a replacement for emergency response when imminent danger is present.",
  },
  {
    id: "starter-samhsa",
    category: "MAT Programs",
    favorite: true,
    organization: "SAMHSA Treatment Locator",
    contactNames: "FindTreatment.gov",
    phone: "1-800-662-HELP",
    phoneExt: "",
    alternatePhone: "1-800-487-4889 TTY",
    fax: "",
    email: "",
    website: "https://findtreatment.gov/",
    address: "National treatment locator",
    eligibility: "People seeking substance use or mental health treatment resources.",
    services: "Search for treatment programs, MOUD/MAT providers, mental health services, and crisis supports.",
    referralSteps: "Search by location, service type, payment options, and treatment need.",
    hours: "Online 24/7",
    whyUseful: "Useful when a client needs treatment options, MOUD/MAT referrals, or verified program information.",
    notes: "Good starting point when local resource information needs to be verified.",
  },
];

const blankResource: Omit<Resource, "id"> = {
  category: resourceCategories[0],
  favorite: false,
  organization: "",
  contactNames: "",
  phone: "",
  phoneExt: "",
  alternatePhone: "",
  fax: "",
  email: "",
  website: "",
  address: "",
  eligibility: "",
  services: "",
  referralSteps: "",
  hours: "",
  whyUseful: "",
  notes: "",
};

const fieldGroups = [
  [
    ["organization", "Organization / place name"],
    ["contactNames", "Contact name(s)"],
    ["phone", "Phone"],
    ["phoneExt", "Ext"],
    ["alternatePhone", "Alternate phone"],
    ["fax", "Fax"],
  ],
  [
    ["email", "Email"],
    ["website", "Website"],
    ["address", "Address"],
    ["hours", "Hours"],
    ["whyUseful", "Why useful / when to use"],
    ["eligibility", "Eligibility / who it serves"],
    ["services", "Services provided"],
    ["referralSteps", "Referral steps"],
    ["notes", "Additional notes"],
  ],
] as const;

function textValue(resource: Resource) {
  return Object.values(resource).join(" ").toLowerCase();
}

export default function ResourceDatabase() {
  const resourceStore = useLocalEntries<Resource>("ladc-resource-directory");
  const categoryStore = useLocalEntries<CustomCategory>("ladc-resource-categories");
  const [draft, setDraft] = useState<Omit<Resource, "id">>(blankResource);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...resourceCategories,
          ...categoryStore.entries.map((category) => category.name).filter(Boolean),
        ]),
      ).sort(),
    [categoryStore.entries],
  );

  const allResources = useMemo(
    () => [...resourceStore.entries, ...starterResources],
    [resourceStore.entries],
  );

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return allResources.filter((resource) => {
      const categoryMatch =
        selectedCategory === "All Resources" || resource.category === selectedCategory;
      const queryMatch = !clean || textValue(resource).includes(clean);
      return categoryMatch && queryMatch;
    });
  }, [allResources, query, selectedCategory]);

  function updateDraft(name: keyof Omit<Resource, "id">, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function submitResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.organization.trim()) return;
    resourceStore.addEntry(draft);
    setDraft({ ...blankResource, category: draft.category });
    setShowForm(false);
  }

  function toggleFavorite(resource: Resource) {
    if (!resource.id || starterResources.some((item) => item.id === resource.id)) return;
    resourceStore.updateEntry(resource.id, { ...resource, favorite: !resource.favorite });
  }

  function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = newCategory.trim();
    if (!clean || categories.includes(clean)) return;
    categoryStore.addEntry({ name: clean });
    setSelectedCategory(clean);
    setDraft((current) => ({ ...current, category: clean }));
    setNewCategory("");
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_auto] xl:items-end">
          <label className="block text-sm font-semibold text-ink">
            Category
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm">
              <option>All Resources</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold text-ink">
            Search resources
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm" placeholder="Search name, phone, services, notes..." />
          </label>
          <button type="button" onClick={() => setShowForm((value) => !value)} className="focus-ring rounded-lg bg-lagoon px-5 py-3 text-sm font-semibold text-white hover:bg-ink">
            Add Resource
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <form onSubmit={addCategory} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Add a category</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">Create categories such as Tribal Resources, Veterans, Domestic Violence, Clothing, Childcare, or local county services.</p>
          <div className="mt-4 flex gap-2">
            <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} className="focus-ring min-w-0 flex-1 rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="New category name" />
            <button className="focus-ring rounded-md border border-lagoon/30 px-4 py-2 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white">Add</button>
          </div>
        </form>

        {showForm ? (
          <form onSubmit={submitResource} className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">Add resource contact information</h2>
            <label className="mt-4 block text-sm font-medium text-ink">
              Category
              <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {fieldGroups.flat().map(([name, label]) => (
                <label key={name} className="block text-sm font-medium text-ink">
                  {label}
                  {["eligibility", "services", "referralSteps", "notes"].includes(name) ? (
                    <textarea value={draft[name]} onChange={(event) => updateDraft(name, event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
                  ) : (
                    <input value={draft[name]} onChange={(event) => updateDraft(name, event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
                  )}
                </label>
              ))}
            </div>
            <button className="focus-ring mt-5 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">Save resource</button>
          </form>
        ) : (
          <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">Selected category</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{selectedCategory}</p>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Showing {filtered.length} resource{filtered.length === 1 ? "" : "s"}. Add resources with full contact details, then filter here during case management or referral planning.
            </p>
          </section>
        )}
      </section>

      <section className="grid gap-4">
        {filtered.map((resource) => (
          <article key={resource.id ?? resource.organization} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">{resource.favorite ? "Favorite | " : ""}{resource.category}</p>
                <h2 className="mt-1 text-2xl font-semibold text-ink">{resource.organization}</h2>
                {resource.contactNames ? <p className="mt-2 text-sm text-ink/70">Contact: {resource.contactNames}</p> : null}
              </div>
              {resourceStore.entries.some((entry) => entry.id === resource.id) ? (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => toggleFavorite(resource)} className="focus-ring rounded-md border border-lagoon/30 px-3 py-2 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white">
                    {resource.favorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <button type="button" onClick={() => resourceStore.removeEntry(resource.id)} className="focus-ring rounded-md border border-clay/30 px-3 py-2 text-sm font-semibold text-clay hover:bg-clay hover:text-white">
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-ink/72 md:grid-cols-2 xl:grid-cols-3">
              {resource.phone ? <p><strong>Phone:</strong> {resource.phone}{resource.phoneExt ? ` ext. ${resource.phoneExt}` : ""}</p> : null}
              {resource.alternatePhone ? <p><strong>Alt phone:</strong> {resource.alternatePhone}</p> : null}
              {resource.fax ? <p><strong>Fax:</strong> {resource.fax}</p> : null}
              {resource.email ? <p><strong>Email:</strong> {resource.email}</p> : null}
              {resource.hours ? <p><strong>Hours:</strong> {resource.hours}</p> : null}
              {resource.address ? <p><strong>Address:</strong> {resource.address}</p> : null}
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-ink/72 lg:grid-cols-2">
              {resource.whyUseful ? <p><strong>Why useful:</strong> {resource.whyUseful}</p> : null}
              {resource.services ? <p><strong>Services:</strong> {resource.services}</p> : null}
              {resource.eligibility ? <p><strong>Eligibility:</strong> {resource.eligibility}</p> : null}
              {resource.referralSteps ? <p><strong>Referral steps:</strong> {resource.referralSteps}</p> : null}
              {resource.notes ? <p><strong>Notes:</strong> {resource.notes}</p> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.website ? (
                <a className="focus-ring rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink hover:text-lagoon" href={resource.website} target="_blank" rel="noreferrer">Website</a>
              ) : null}
              <a className="focus-ring rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink hover:text-lagoon" href={`https://www.google.com/search?q=${encodeURIComponent(resource.organization)}`} target="_blank" rel="noreferrer">Google search</a>
              <a className="focus-ring rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink hover:text-lagoon" href={`https://www.google.com/maps/search/${encodeURIComponent(resource.address || resource.organization)}`} target="_blank" rel="noreferrer">Maps search</a>
              {resource.email ? <a className="focus-ring rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink hover:text-lagoon" href={`mailto:${resource.email}`}>Email</a> : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
