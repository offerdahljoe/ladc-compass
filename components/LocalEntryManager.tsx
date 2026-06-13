"use client";

import { FormEvent, useMemo, useState } from "react";
import Field from "@/components/Field";
import { useLocalEntries } from "@/lib/useLocalEntries";

export type EntryField = {
  name: string;
  label: string;
  type?: "text" | "date" | "number" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
};

type LocalEntryManagerProps = {
  storageKey: string;
  fields: EntryField[];
  emptyLabel: string;
  titleField?: string;
  afterEntries?: (entries: Record<string, string>[]) => React.ReactNode;
};

export default function LocalEntryManager({
  storageKey,
  fields,
  emptyLabel,
  titleField,
  afterEntries,
}: LocalEntryManagerProps) {
  const blank = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, ""])),
    [fields],
  );
  const { entries, addEntry, removeEntry, clearEntries } =
    useLocalEntries<Record<string, string>>(storageKey);
  const [draft, setDraft] = useState<Record<string, string>>(blank);

  function updateDraft(name: string, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addEntry(draft);
    setDraft(blank);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        onSubmit={submit}
        className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
      >
        <h3 className="text-xl font-semibold text-ink">Add an entry</h3>
        <p className="mt-2 text-sm text-ink/65">
          Entries save to cloud when signed in, otherwise to this browser.
        </p>
        <div className="mt-4 grid gap-4">
          {fields.map((field) => (
            <Field
              key={field.name}
              {...field}
              value={draft[field.name] ?? ""}
              onChange={updateDraft}
            />
          ))}
        </div>
        <button
          type="submit"
          className="focus-ring mt-5 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Save locally
        </button>
      </form>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-ink">Saved entries</h3>
          {entries.length > 0 ? (
            <button
              type="button"
              onClick={clearEntries}
              className="focus-ring rounded-md border border-clay/35 px-3 py-2 text-sm font-semibold text-clay hover:bg-clay/10"
            >
              Clear all
            </button>
          ) : null}
        </div>
        {afterEntries ? afterEntries(entries) : null}
        <div className="mt-4 grid gap-3">
          {entries.length === 0 ? (
            <p className="rounded-lg border border-dashed border-ink/20 bg-paper p-4 text-sm text-ink/70">
              {emptyLabel}
            </p>
          ) : (
            entries.map((entry, index) => (
              <article
                key={entry.id ?? index}
                className="rounded-lg border border-ink/10 bg-paper p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-ink">
                    {titleField && entry[titleField]
                      ? entry[titleField]
                      : `Entry ${index + 1}`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="focus-ring rounded-md px-2 py-1 text-sm font-semibold text-clay hover:bg-clay/10"
                  >
                    Delete
                  </button>
                </div>
                <dl className="mt-3 grid gap-2 text-sm text-ink/75">
                  {fields
                    .filter((field) => entry[field.name])
                    .map((field) => (
                      <div key={field.name}>
                        <dt className="font-semibold text-ink">{field.label}</dt>
                        <dd className="whitespace-pre-wrap">{entry[field.name]}</dd>
                      </div>
                    ))}
                </dl>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
