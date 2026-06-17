"use client";

import NavLink from "@/components/NavLink";
import { FormEvent, useMemo, useState } from "react";
import { contactLabel, contactsFromResources } from "@/lib/workspaceContacts";
import { useLocalEntries } from "@/lib/useLocalEntries";

type ResourceRow = {
  id?: string;
  organization?: string;
  contactNames?: string;
  name?: string;
  category?: string;
  phone?: string;
  email?: string;
};

type CommEntry = {
  id?: string;
  date: string;
  time: string;
  direction: "Outbound" | "Inbound" | "Attempted";
  method: "Phone" | "Email" | "In person" | "Video" | "Other";
  contactId: string;
  contactName: string;
  organization: string;
  purpose: string;
  summary: string;
  roiStatus: string;
  followUp: string;
  linkedResourceId: string;
  savedAt: string;
};

const storageKey = "ladc-communications-log";

const methodOptions = ["Phone", "Email", "In person", "Video", "Other"] as const;
const directionOptions = ["Outbound", "Inbound", "Attempted"] as const;

export default function CommunicationsLogPage() {
  const { entries, addEntry, removeEntry, cloudEnabled, syncing } = useLocalEntries<CommEntry>(storageKey);
  const { entries: resources } = useLocalEntries<ResourceRow>("ladc-resource-directory");
  const contacts = useMemo(() => contactsFromResources(resources), [resources]);
  const [filter, setFilter] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const contactId = String(data.get("contactId") || "");
    const contact = contacts.find((c) => c.id === contactId);
    await addEntry({
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      direction: String(data.get("direction") || "Outbound") as CommEntry["direction"],
      method: String(data.get("method") || "Phone") as CommEntry["method"],
      contactId,
      contactName: contact?.label ?? String(data.get("contactName") || ""),
      organization: contact?.organization ?? String(data.get("organization") || ""),
      purpose: String(data.get("purpose") || ""),
      summary: String(data.get("summary") || ""),
      roiStatus: String(data.get("roiStatus") || ""),
      followUp: String(data.get("followUp") || ""),
      linkedResourceId: String(data.get("linkedResourceId") || ""),
      savedAt: new Date().toLocaleString(),
    });
    form.reset();
  }

  const filtered = entries.filter((entry) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    return [entry.contactName, entry.organization, entry.purpose, entry.summary, entry.method]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <section className="grid gap-4">
      <div className="rounded-lg border border-lagoon/20 bg-white p-3 shadow-soft">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-lagoon">Communications Log</p>
        <p className="mt-1 text-xs text-ink/60">
          Track outreach and coordination outside progress notes. No PHI — use initials and role labels only.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <NavLink href="/smart-contacts/contacts" className="focus-ring rounded-md border border-lagoon/25 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10">
            Smart Contacts
          </NavLink>
          <NavLink href="/resource-library/library" className="focus-ring rounded-md border border-lagoon/25 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10">
            Resource Library
          </NavLink>
          <NavLink href="/client-workflow/workflow" className="focus-ring rounded-md border border-lagoon/25 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10">
            Client Workflow (SETC)
          </NavLink>
          <NavLink href="/" className="focus-ring rounded-md border border-lagoon/25 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10">
            Workspace Calendar
          </NavLink>
        </div>
        {cloudEnabled ? (
          <p className="mt-2 text-[11px] text-lagoon">{syncing ? "Syncing…" : "Cloud sync on"}</p>
        ) : (
          <p className="mt-2 text-[11px] text-ink/55">Sign in to sync this log across devices.</p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Log communication</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-ink">
              Date
              <input name="date" type="date" required className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" />
            </label>
            <label className="text-xs font-semibold text-ink">
              Time
              <input name="time" type="time" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" />
            </label>
            <label className="text-xs font-semibold text-ink">
              Direction
              <select name="direction" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm">
                {directionOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-ink">
              Method
              <select name="method" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm">
                {methodOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-ink">
              Contact (from Smart Contacts)
              <select name="contactId" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm">
                <option value="">Select contact…</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contactLabel([contact], contact.id)} {contact.role ? `· ${contact.role}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-ink">
              Organization (if not listed)
              <input name="organization" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" />
            </label>
            <label className="text-xs font-semibold text-ink">
              ROI status
              <input name="roiStatus" placeholder="On file / pending / N/A" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" />
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-ink">
              Purpose
              <input name="purpose" required placeholder="Why contact was made" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" />
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-ink">
              Summary (minimum necessary)
              <textarea name="summary" required className="focus-ring mt-1 min-h-24 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" placeholder="Who, why, info shared/received, next step — no PHI." />
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-ink">
              Follow-up plan
              <input name="followUp" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm" placeholder="Reminder, task, or SETC note needed?" />
            </label>
            <label className="sm:col-span-2 text-xs font-semibold text-ink">
              Linked resource (optional)
              <select name="linkedResourceId" className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-2 py-1.5 text-sm">
                <option value="">None</option>
                {resources.filter((r) => r.id).map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.organization || resource.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Save entry
          </button>
        </form>

        <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-ink">Recent communications</h2>
            <input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Search log…"
              className="focus-ring rounded-md border border-ink/15 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="mt-3 grid max-h-[32rem] gap-2 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="rounded-md bg-paper p-3 text-sm text-ink/65">No communications logged yet.</p>
            ) : (
              filtered.map((entry) => (
                <article key={entry.id} className="rounded-md border border-ink/10 bg-paper p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-ink">
                      {entry.date} {entry.time} · {entry.method} ({entry.direction})
                    </p>
                    <button type="button" onClick={() => removeEntry(entry.id)} className="text-xs font-semibold text-clay hover:underline">
                      Delete
                    </button>
                  </div>
                  <p className="mt-1 text-ink/75">
                    <strong>{entry.contactName}</strong>
                    {entry.organization ? ` — ${entry.organization}` : ""}
                  </p>
                  <p className="mt-1 text-ink/70"><strong>Purpose:</strong> {entry.purpose}</p>
                  <p className="mt-1 whitespace-pre-wrap text-ink/70">{entry.summary}</p>
                  {entry.roiStatus ? <p className="mt-1 text-xs text-ink/60">ROI: {entry.roiStatus}</p> : null}
                  {entry.followUp ? <p className="mt-1 text-xs text-lagoon">Follow-up: {entry.followUp}</p> : null}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
