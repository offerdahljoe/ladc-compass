"use client";

import { useMemo, useState } from "react";
import {
  filterMedications,
  medicationCategories,
  medications,
  neverPanicContent,
  type MedicationCategory,
  type MedicationEntry,
} from "@/lib/medicationReference";

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function MedCard({ med }: { med: MedicationEntry }) {
  return (
    <details className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        {med.name}
        <span className="ml-2 text-xs font-normal text-lagoon">{med.category}</span>
      </summary>
      <div className="mt-3 grid gap-3 text-sm leading-6 text-ink/75">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => speak(med.pronunciation.split(".")[0] ?? med.name)}
            className="focus-ring rounded-md border border-lagoon/20 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon hover:text-white"
          >
            Pronounce
          </button>
          <span className="text-xs text-ink/55">{med.pronunciation}</span>
        </div>
        <p><strong>Generic:</strong> {med.genericName} · <strong>Brands:</strong> {med.brandNames.join(", ")}</p>
        <p><strong>Type:</strong> {med.drugType} · <strong>Used for:</strong> {med.usedFor}</p>
        <Section title="Things an LADC should know" items={med.ladcShouldKnow} />
        <Section title="Questions to ask" items={med.questionsToAsk} />
        <Section title="Red flags" items={med.redFlags} tone="clay" />
        <Section title="Common side effects" items={med.commonSideEffects} />
        <Section title="Counselor considerations" items={med.counselorConsiderations} />
        <Section title="When to coordinate care" items={med.whenToCoordinate} />
        <p className="rounded-md bg-paper p-3 text-xs"><strong>Documentation example:</strong> {med.documentationExample}</p>
        <Section title="What should this make me curious about?" items={med.curiousAbout} />
      </div>
    </details>
  );
}

function Section({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "clay" }) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className={`mt-1 grid gap-1 ${tone === "clay" ? "text-clay" : ""}`}>
        {items.map((item) => (
          <li key={item} className="rounded-md bg-paper px-2 py-1 text-xs">{item}</li>
        ))}
      </ul>
    </div>
  );
}

const medSlugAliases: Record<string, string> = {
  buprenorphine: "suboxone",
  naltrexone: "vivitrol",
  naloxone: "naloxone",
  antidepressants: "sertraline",
  "anti-anxiety-medications": "hydroxyzine",
  "mood-stabilizers": "lithium",
  "antipsychotic-medications": "quetiapine",
  acamprosate: "acamprosate",
  disulfiram: "disulfiram",
  methadone: "methadone",
};

export default function MedicationReferencePage({ medId }: { medId?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MedicationCategory | "All">("All");

  const resolvedId = medId ? medSlugAliases[medId] ?? medId : undefined;

  const results = useMemo(() => filterMedications(query, category), [query, category]);
  const focused = resolvedId ? medications.find((m) => m.id === resolvedId) : null;

  return (
    <section className="grid gap-3">
      <div className="rounded-lg border border-lagoon/20 bg-white p-3 shadow-soft">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-lagoon">Medication Reference</p>
        <p className="text-xs text-ink/60">{medications.length} medications · search or filter by category</p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, generic, brand, use…"
          className="focus-ring mt-3 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`rounded-md px-2 py-1 text-xs font-semibold ${category === "All" ? "bg-lagoon text-white" : "bg-paper text-ink"}`}
          >
            All
          </button>
          {medicationCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-md px-2 py-1 text-xs font-semibold ${category === cat ? "bg-lagoon text-white" : "bg-paper text-ink"}`}
            >
              {cat.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <details open className="rounded-lg border border-ink/10 bg-paper p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">{neverPanicContent.title}</summary>
        <ul className="mt-2 grid gap-1 text-sm text-ink/75">
          {neverPanicContent.body.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-clay">{neverPanicContent.disclaimer}</p>
      </details>

      {focused ? <MedCard med={focused} /> : null}

      <div className="grid gap-2">
        {(focused ? results.filter((m) => m.id !== focused.id) : results).map((med) => (
          <MedCard key={med.id} med={med} />
        ))}
        {!results.length ? (
          <p className="text-sm text-ink/60">No medications match. Try a generic or brand name.</p>
        ) : null}
      </div>
    </section>
  );
}
