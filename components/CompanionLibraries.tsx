"use client";

import { useState } from "react";
import {
  clientExplanationScripts,
  simulatorProfiles,
  wordingCategories,
} from "@/lib/assessmentSections";

export function ClinicalWordingLibraryCompanion() {
  return (
    <section className="grid gap-4">
      <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
          Clinical Wording Library
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">
          Assessment Wording by Clinical Need
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          Use these examples to turn client language into neutral, specific,
          clinically useful documentation.
        </p>
      </header>
      {wordingCategories.map((category) => (
        <article
          key={category.title}
          className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
        >
          <h2 className="text-xl font-semibold text-ink">{category.title}</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            {category.plainMeaning}
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
            {category.examples.map((example) => (
              <li key={example} className="rounded-md bg-paper px-3 py-2">
                {example}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

export function ClientExplanationScriptsCompanion() {
  return (
    <section className="grid gap-4">
      <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
          Client Explanation Scripts
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">
          Plain-Language Assessment Scripts
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          These scripts help explain assessment sections without jargon.
        </p>
      </header>
      {clientExplanationScripts.map((script) => (
        <article
          key={script.title}
          className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
        >
          <h2 className="text-xl font-semibold text-ink">{script.title}</h2>
          <p className="mt-3 rounded-md bg-paper px-3 py-2 text-sm leading-6 text-ink/75">
            {script.script}
          </p>
        </article>
      ))}
    </section>
  );
}

export function LearnClinicalThinkingCompanion() {
  return (
    <section className="grid gap-5">
      <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
          Learn Clinical Thinking
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">
          Think Like an Assessment Counselor
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          Practice noticing what information matters, where it belongs, and how
          it becomes diagnosis, ASAM, recommendations, and wording.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "What is this section really asking?",
          "Where do I find the answer?",
          "How does this connect to ASAM?",
          "How do I turn client language into clinical wording?",
          "How do I justify a recommendation?",
          "How do I identify missing information?",
          "What would an experienced LADC notice?",
        ].map((title) => (
          <article
            key={title}
            className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
          >
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Ask what the client said, what clinical pattern it suggests, what
              information is still missing, and how it changes ASAM,
              recommendation, or treatment planning.
            </p>
          </article>
        ))}
      </div>
      <AssessmentSimulator />
    </section>
  );
}

function AssessmentSimulator() {
  const [profileId, setProfileId] = useState(simulatorProfiles[0].id);
  const [draft, setDraft] = useState("");
  const profile =
    simulatorProfiles.find((item) => item.id === profileId) ?? simulatorProfiles[0];

  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-2xl font-semibold text-ink">Assessment Simulator</h2>
      <label className="mt-4 block text-sm font-medium text-ink">
        Practice profile
        <select
          value={profileId}
          onChange={(event) => setProfileId(event.target.value)}
          className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
        >
          {simulatorProfiles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <p className="mt-4 rounded-md bg-paper px-3 py-2 text-sm leading-6 text-ink/75">
        {profile.snapshot}
      </p>
      <label className="mt-4 block text-sm font-medium text-ink">
        Your clinical justification
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="focus-ring mt-1 min-h-28 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
          placeholder="Identify relevant information, ASAM ratings, and level-of-care rationale..."
        />
      </label>
      <details className="mt-4 rounded-lg border border-ink/10 bg-paper p-4">
        <summary className="cursor-pointer font-semibold text-ink">
          Compare with sample answer
        </summary>
        <div className="mt-3 grid gap-3 text-sm leading-6 text-ink/75">
          <div>
            <h3 className="font-semibold text-ink">Relevant information</h3>
            <ul className="mt-2 grid gap-1">
              {profile.relevantInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Sample ASAM ratings</h3>
            <ul className="mt-2 grid gap-1">
              {profile.sampleAsamRatings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Sample justification:</strong> {profile.sampleJustification}
          </p>
        </div>
      </details>
    </section>
  );
}
