"use client";

import { FormEvent } from "react";
import { useLocalEntries } from "@/lib/useLocalEntries";

type UploadEntry = {
  id?: string;
  name: string;
  docType: string;
  purpose: string;
  savedAt: string;
  text: string;
  analysis: string;
};

const storageKey = "ladc-documentation-uploads";

function analyzeUpload(text: string) {
  const lower = text.toLowerCase();
  const ideas: string[] = [];
  if (lower.includes("comprehensive") || lower.includes("assessment") || lower.includes("diagnostic")) ideas.push("Add more Comprehensive Assessment section prompts, missing-info checks, and Procentive-ready assessment wording.");
  if (lower.includes("asam") || lower.includes("dimension") || lower.includes("level of care")) ideas.push("Expand ASAM Dimension support with rating rationale, risk examples, and level-of-care language.");
  if (lower.includes("treatment plan") || lower.includes("goal") || lower.includes("objective") || lower.includes("intervention")) ideas.push("Improve Treatment Plan Lab with problem-goal-objective-intervention builders tied to assessment findings.");
  if (lower.includes("progress note") || lower.includes("dap") || lower.includes("soap")) ideas.push("Add stronger Progress Note coaching with DAP/SOAP examples, common mistakes, and copy/paste note scaffolds.");
  if (lower.includes("group")) ideas.push("Enhance Group Planner with group documentation language, topic libraries, and ASAM/Core Function mapping.");
  if (lower.includes("procentive")) ideas.push("Create more Procentive copy/paste formatting helpers and field-specific wording blocks.");
  if (lower.includes("245g") || lower.includes("minnesota")) ideas.push("Add Minnesota/245G reference prompts and compliance-oriented documentation reminders.");
  if (lower.includes("discharge") || lower.includes("aftercare")) ideas.push("Add discharge and continuing-care templates with relapse prevention and referral language.");
  if (lower.includes("risk") || lower.includes("suicid") || lower.includes("crisis")) ideas.push("Add risk/safety documentation prompts and reminders to follow agency crisis policy and supervision.");
  if (!ideas.length) ideas.push("No strong category detected. Add a note describing what this document should teach the website, or paste de-identified text for a deeper scan.");
  return ideas.map((idea, index) => `${index + 1}. ${idea}`).join("\n");
}

function isReadableText(file: File) {
  return /\.(txt|md|csv|json|html|rtf)$/i.test(file.name) || file.type.startsWith("text/");
}

export default function DocumentationUploads() {
  const { entries, addEntry, removeEntry, cloudEnabled, syncing } =
    useLocalEntries<UploadEntry>(storageKey);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("docFile");
    const pastedText = String(data.get("pastedText") || "").trim();
    let text = pastedText;
    let name = "Pasted documentation text";

    if (file instanceof File && file.name) {
      name = file.name;
      if (!text && isReadableText(file)) {
        text = (await file.text()).slice(0, 35000);
      }
    }

    const docType = String(data.get("docType") || "Other");
    const purpose = String(data.get("purpose") || "");
    const entry: Omit<UploadEntry, "id"> = {
      name,
      docType,
      purpose,
      savedAt: new Date().toLocaleString(),
      text,
      analysis: analyzeUpload(`${docType}\n${purpose}\n${text}`),
    };

    await addEntry(entry);
    form.reset();
  }

  return (
    <>
      <section className="mb-5 rounded-lg border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-ink">
        <strong>Upload safety:</strong> Do not upload files with real client
        names, dates of birth, addresses, phone numbers, case numbers,
        screenshots from client charts, or any protected health information.
      </section>
      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-semibold text-ink">Add documentation file</h3>
          <label className="mt-4 block text-sm font-medium text-ink">
            Document file
            <input
              name="docFile"
              type="file"
              accept=".txt,.md,.csv,.json,.html,.rtf,.doc,.docx,.pdf"
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Document type
            <select name="docType" className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm">
              {["Comprehensive Assessment", "Progress Note", "Group Note", "Treatment Plan", "ASAM Wording", "Procentive Template", "Class Assignment or Rubric", "Other"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            What should the website learn from this?
            <textarea
              name="purpose"
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
              placeholder="Example: Add a better assessment checklist, include 245G language, create a copy/paste section..."
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Paste de-identified text for deeper analysis
            <textarea
              name="pastedText"
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
              placeholder="Paste only de-identified content. No client identifiers or PHI."
            />
          </label>
          <button className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Save and analyze
          </button>
        </form>

        <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-semibold text-ink">Saved uploads</h3>
          <p className="mt-2 text-sm text-ink/70">
            {entries.length} saved document{entries.length === 1 ? "" : "s"}.
            {syncing
              ? " Checking cloud sync..."
              : cloudEnabled
                ? " Saving to your private cloud account."
                : " Saving in this browser only until you sign in."}{" "}
            Do not upload real client identifiers or PHI.
          </p>
          <div className="mt-4 grid gap-3">
            {entries.length === 0 ? (
              <p className="rounded-lg border border-dashed border-ink/20 bg-paper p-4 text-sm text-ink/70">
                No documentation uploads saved yet.
              </p>
            ) : (
              entries.map((entry) => (
                <article key={entry.id} className="rounded-lg border border-ink/10 bg-paper p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold text-ink">{entry.name}</h4>
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      className="focus-ring rounded-md px-2 py-1 text-sm font-semibold text-clay hover:bg-clay/10"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-ink/75"><strong>Type:</strong> {entry.docType}</p>
                  <p className="mt-2 text-sm text-ink/75"><strong>Saved:</strong> {entry.savedAt}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-ink/75"><strong>Website update notes:</strong><br />{entry.purpose || "No notes added."}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-ink/75"><strong>Analysis:</strong><br />{entry.analysis}</p>
                  {entry.text ? (
                    <details className="mt-3 text-sm text-ink/75">
                      <summary className="cursor-pointer font-semibold text-ink">View saved de-identified text</summary>
                      <p className="mt-2 whitespace-pre-wrap">{entry.text}</p>
                    </details>
                  ) : (
                    <p className="mt-2 text-sm text-ink/75">
                      <strong>Readable text:</strong> Not saved from this file
                      type. Paste de-identified text when deeper analysis is
                      needed.
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
}
