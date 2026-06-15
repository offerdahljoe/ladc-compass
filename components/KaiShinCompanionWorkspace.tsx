"use client";

import { useMemo, useState } from "react";
import MissingInfoAlert from "@/components/MissingInfoAlert";
import ParagraphBuilder from "@/components/ParagraphBuilder";
import TranslateToClinical from "@/components/TranslateToClinical";
import {
  asamDimensionGuides,
  assessmentSections,
  wordingCategories,
} from "@/lib/assessmentSections";

const prioritySections = [
  "presenting-problem-referral-information",
  "substance-use-history",
  "mental-health",
  "asam-dimensions",
  "summary-recommendations",
];

const viewOptions = [
  { id: "guide", label: "Section Guide" },
  { id: "wording", label: "Clinical Translator" },
  { id: "builder", label: "Build Paragraph" },
  { id: "asam", label: "ASAM Helper" },
] as const;

type WorkspaceView = (typeof viewOptions)[number]["id"];

const assessmentRoadmap = [
  {
    title: "Start here",
    items: [
      "Presenting Problem / Referral Information",
      "Substance Use History",
      "Mental Health",
    ],
  },
  {
    title: "Then connect the clinical picture",
    items: [
      "DSM-5 diagnosis",
      "ASAM Dimensions 1-6",
      "Risk, recovery environment, strengths, and barriers",
    ],
  },
  {
    title: "Finish with the recommendation",
    items: [
      "Summary & Recommendations",
      "Level of care rationale",
      "Treatment plan problem areas",
    ],
  },
];

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-paper px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SummaryCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-ink/72">{body}</p>
    </section>
  );
}

function CommonMistakes({
  mistakes,
}: {
  mistakes: { bad: string; better: string }[];
}) {
  return (
    <section className="rounded-lg border border-clay/25 bg-clay/10 p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Common Intern Mistakes</h2>
      <div className="mt-3 grid gap-3">
        {mistakes.map((item) => (
          <div key={item.bad} className="rounded-md bg-white px-3 py-2 text-sm leading-6">
            <p className="text-clay">
              <strong>Weak:</strong> {item.bad}
            </p>
            <p className="mt-1 text-ink/75">
              <strong>Better:</strong> {item.better}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConnectionStrip() {
  const steps = [
    "Client story",
    "Assessment facts",
    "DSM-5 criteria",
    "ASAM risk",
    "Recommendation",
    "Treatment plan",
  ];
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">How the assessment should flow</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step} className="rounded-md bg-paper px-3 py-3 text-sm font-semibold text-ink">
            <span className="text-lagoon">{index + 1}.</span> {step}
          </div>
        ))}
      </div>
    </section>
  );
}

function AssessmentRoadmap() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Simple Assessment Roadmap</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        This replaces the old maze of separate Kai-Shin pages. Use the dropdown
        for the detailed sections that are built out now, then use this roadmap
        to keep the whole assessment organized.
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {assessmentRoadmap.map((group) => (
          <div key={group.title} className="rounded-lg border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-ink">{group.title}</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClinicalTranslatorTemplates() {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Clinical Translator Templates</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Use these when the client gives casual language and you need a neutral
        assessment phrase.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {wordingCategories.slice(0, 8).map((category) => (
          <details key={category.title} className="rounded-lg border border-ink/10 bg-paper p-4">
            <summary className="cursor-pointer font-semibold text-ink">
              {category.title}
            </summary>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              {category.plainMeaning}
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
              {category.examples.map((example) => (
                <li key={example} className="rounded-md bg-white px-3 py-2">
                  {example}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

function AsamQuickGuide() {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">ASAM Dimensions Quick Guide</h2>
      <div className="mt-4 grid gap-3">
        {asamDimensionGuides.map((dimension) => (
          <details key={dimension.id} className="rounded-lg border border-ink/10 bg-paper p-4">
            <summary className="cursor-pointer font-semibold text-ink">
              {dimension.title}
            </summary>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              {dimension.purpose}
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <BulletCard title="Where to find it" items={dimension.whereToFindInfo} />
              <BulletCard title="Rating clues 0-4" items={dimension.ratingGuidance} />
              <BulletCard title="Low to moderate clues" items={[...dimension.lowRating, ...dimension.moderateRating]} />
              <BulletCard title="High-risk clues" items={dimension.highRating} />
            </div>
            <div className="mt-3 rounded-md bg-white px-3 py-2 text-sm leading-6 text-ink/75">
              <strong>Example:</strong> {dimension.exampleJustification}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function KaiShinCompanionWorkspace() {
  const [selectedId, setSelectedId] = useState("presenting-problem-referral-information");
  const [view, setView] = useState<WorkspaceView>("guide");
  const sections = useMemo(
    () => assessmentSections.filter((section) => prioritySections.includes(section.id)),
    [],
  );
  const selected =
    sections.find((section) => section.id === selectedId) ?? sections[0];

  return (
    <div className="grid gap-5">
      <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
          Kai-Shin Procentive Companion
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          Comprehensive Assessment Workspace
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-ink/72">
          One guided page for understanding each assessment section, finding
          supporting information, translating client language, and drafting
          clinical wording without jumping across a dozen pages.
        </p>
      </header>

      <ConnectionStrip />

      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <label className="block text-sm font-semibold text-ink">
            Choose assessment section
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap gap-2">
            {viewOptions.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-semibold ${
                  view === id
                    ? "bg-lagoon text-white"
                    : "border border-ink/15 bg-white text-ink hover:bg-paper"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AssessmentRoadmap />

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-2xl font-semibold text-ink">{selected.title}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/72">{selected.description}</p>
      </section>

      {view === "guide" ? (
        <div className="grid gap-4">
          <MissingInfoAlert items={selected.missingInfo ?? []} />
          <div className="grid gap-4 xl:grid-cols-2">
            <SummaryCard title="What this section is asking" body={selected.whatItAsks} />
            <SummaryCard title="Why it matters" body={selected.whyItMatters} />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <BulletCard title="Listen for" items={selected.listenFor} />
            <BulletCard title="Where to find it" items={selected.whereToFindInfo} />
            <BulletCard title="Questions to ask" items={selected.clientQuestions} />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <BulletCard title="ASAM connections" items={selected.asamConnections} />
            <BulletCard title="Red flags" items={selected.redFlags} />
          </div>
        </div>
      ) : null}

      {view === "wording" ? (
        <div className="grid gap-4">
          <TranslateToClinical />
          <BulletCard title="Wording examples for this section" items={selected.clinicalExamples} />
          <CommonMistakes mistakes={selected.commonMistakes} />
          <ClinicalTranslatorTemplates />
        </div>
      ) : null}

      {view === "builder" ? (
        <div className="grid gap-4">
          <ParagraphBuilder fields={selected.paragraphBuilderFields} />
          <BulletCard title="Useful phrases from this section" items={selected.clinicalExamples} />
        </div>
      ) : null}

      {view === "asam" ? <AsamQuickGuide /> : null}
    </div>
  );
}
