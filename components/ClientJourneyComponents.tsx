"use client";

import { useMemo, useState } from "react";
import {
  clientJourneyPhases,
  coordinationTemplates,
  documentationTemplates,
  journeyTimeline,
  roiContactTypes,
  type JourneyDocument,
  type JourneyPhase,
} from "@/lib/clientJourneyPhases";

export function PhaseChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">What I Do Next</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer gap-3 rounded-md bg-paper px-3 py-2 text-sm leading-6 text-ink/75"
          >
            <input
              type="checkbox"
              checked={Boolean(checked[item])}
              onChange={(event) =>
                setChecked((current) => ({
                  ...current,
                  [item]: event.target.checked,
                }))
              }
            />
            <span className={checked[item] ? "line-through opacity-60" : ""}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export function DocumentExplanationCard({ document }: { document: JourneyDocument }) {
  return (
    <details className="rounded-lg border border-ink/10 bg-paper p-4">
      <summary className="cursor-pointer font-semibold text-ink">
        {document.name} <span className="text-lagoon">({document.code})</span>
      </summary>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-ink/75">
        <InfoBlock title="Purpose for counselor" items={[document.purpose]} />
        <InfoBlock title="Plain-language client explanation" items={[document.clientExplanation]} />
        <InfoBlock title="What the client is agreeing to or acknowledging" items={[document.acknowledgement]} />
        <InfoBlock title="What the counselor should watch for" items={document.counselorWatchFor} />
        <InfoBlock title="Common client questions" items={document.commonQuestions} />
        <InfoBlock title="Suggested response" items={[document.suggestedResponse]} />
        <InfoBlock title="Next step after signing" items={[document.nextStep]} />
      </div>
    </details>
  );
}

export function RequiredDocumentsList({ documents }: { documents: JourneyDocument[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Required Documents</h2>
      <div className="mt-4 grid gap-3">
        {documents.length ? (
          documents.map((document) => (
            <DocumentExplanationCard key={`${document.code}-${document.name}`} document={document} />
          ))
        ) : (
          <p className="rounded-md bg-paper px-3 py-2 text-sm text-ink/70">
            No specific form has been added yet. Use this phase to verify the
            required Kai-Shin/Procentive document and document next steps.
          </p>
        )}
      </div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-white px-3 py-2">
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className="mt-1 grid gap-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ClientDialogueCard({ scripts }: { scripts: string[] }) {
  return <SimpleCard title="Dialogue / Client Explanation" items={scripts} />;
}

export function CounselorThinkingCard({ items }: { items: string[] }) {
  return <SimpleCard title="Counselor Thinking" items={items} />;
}

export function DocumentationGuidanceCard({ items }: { items: string[] }) {
  return <SimpleCard title="Documentation Guidance" items={items} />;
}

export function ClinicalWordingExamples({ items }: { items: string[] }) {
  return <SimpleCard title="Clinical Wording Examples" items={items} />;
}

export function CommonMistakesCard({ items }: { items: string[] }) {
  return <SimpleCard title="Common Mistakes" items={items} tone="clay" />;
}

export function NextStepsCard({ items }: { items: string[] }) {
  return <SimpleCard title="Next Logical Steps" items={items} />;
}

export function DeadlineReminder({ items }: { items: string[] }) {
  return <SimpleCard title="Deadline / Compliance Reminders" items={items} tone="lagoon" />;
}

function SimpleCard({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: string[];
  tone?: "default" | "clay" | "lagoon";
}) {
  const border =
    tone === "clay"
      ? "border-clay/30 bg-clay/10"
      : tone === "lagoon"
        ? "border-lagoon/25 bg-lagoon/10"
        : "border-ink/10 bg-white";
  return (
    <section className={`rounded-lg border p-5 shadow-soft ${border}`}>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-white/75 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ROIContactScriptBuilder() {
  const [contactType, setContactType] = useState(roiContactTypes[0]);
  const [purpose, setPurpose] = useState("");
  const [consent, setConsent] = useState("yes");
  const [shared, setShared] = useState("");
  const [requested, setRequested] = useState("");
  const [followUp, setFollowUp] = useState("");

  const script = useMemo(() => {
    const lower = contactType.toLowerCase();
    if (lower.includes("probation")) return coordinationTemplates.probation;
    if (lower.includes("therapist") || lower.includes("psychiatrist")) {
      return coordinationTemplates.therapist;
    }
    if (lower.includes("family")) return coordinationTemplates.family;
    return `Hello, this is Joe Offerdahl, ADC-T with Kai-Shin Clinic. I have a signed ROI for [client name]. I am calling regarding ${purpose || "[purpose of call]"}. The release allows us to share ${shared || "[information allowed]"} and I am requesting ${requested || "[information requested]"}. Follow-up needed: ${followUp || "[follow-up]"}.`;
  }, [contactType, followUp, purpose, requested, shared]);

  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">ROI Contact Script Builder</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Contact type
          <select
            value={contactType}
            onChange={(event) => setContactType(event.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
          >
            {roiContactTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-ink">
          Client consent confirmed?
          <select
            value={consent}
            onChange={(event) => setConsent(event.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
          >
            <option value="yes">Yes, signed ROI confirmed</option>
            <option value="no">No, do not contact</option>
          </select>
        </label>
        {[
          ["Purpose of call", purpose, setPurpose],
          ["What information can be shared", shared, setShared],
          ["What information is being requested", requested, setRequested],
          ["Follow-up needed", followUp, setFollowUp],
        ].map(([label, value, setter]) => (
          <label key={label as string} className="text-sm font-medium text-ink">
            {label as string}
            <textarea
              value={value as string}
              onChange={(event) =>
                (setter as React.Dispatch<React.SetStateAction<string>>)(
                  event.target.value,
                )
              }
              className="focus-ring mt-1 min-h-20 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-clay/30 bg-clay/10 p-3 text-sm text-ink">
        <strong>Reminder:</strong> Never contact collateral supports without a
        valid ROI unless there is a legally required safety exception. Always
        document the contact in Contact Log PRO-1081.
      </div>
      <div className="mt-4 rounded-md bg-paper p-4 text-sm leading-6 text-ink/75">
        <h3 className="font-semibold text-ink">Script draft</h3>
        <p className="mt-2">
          {consent === "yes"
            ? script
            : "Do not contact. Obtain a valid ROI or consult supervision/policy if a safety exception may apply."}
        </p>
      </div>
    </section>
  );
}

export function DocumentationAtEachPhaseTracker({
  phase,
}: {
  phase: JourneyPhase;
}) {
  const fallbackDocs: JourneyDocument[] = documentationTemplates.map((template) => ({
        name: template.title,
        code: template.code,
        purpose: "Documentation support template for this phase.",
        clientExplanation: "This document records services, coordination, or planning.",
        acknowledgement: "Documentation completed as clinically indicated.",
        counselorWatchFor: ["Correct form", "Timing", "Required content"],
        commonQuestions: ["What is documented?"],
        suggestedResponse: "The record explains the service and next steps.",
        nextStep: "Complete follow-up.",
        billable: template.billable as JourneyDocument["billable"],
        wordingTemplate: template.template,
      }));
  const docs: JourneyDocument[] = phase.requiredDocuments.length
    ? phase.requiredDocuments
    : fallbackDocs;

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">
        Documentation at This Phase
      </h2>
      <div className="mt-4 grid gap-3">
        {docs.map((document) => (
          <article
            key={`${document.code}-${document.name}`}
            className="rounded-lg border border-ink/10 bg-paper p-4 text-sm leading-6 text-ink/75"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-ink">{document.name}</h3>
              <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-lagoon">
                {document.code}
              </span>
              {document.billable ? (
                <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink/70">
                  {document.billable}
                </span>
              ) : null}
            </div>
            <p className="mt-2">
              <strong>When:</strong>{" "}
              {document.whenToComplete ?? "Complete during this phase as required by workflow."}
            </p>
            <p>
              <strong>Must include:</strong>{" "}
              {(document.mustInclude ?? ["Purpose", "client response", "action taken", "follow-up"]).join(", ")}
            </p>
            {document.wordingTemplate ? (
              <p className="mt-2 whitespace-pre-wrap rounded-md bg-white p-3">
                {document.wordingTemplate}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClientJourneyDashboard() {
  return (
    <section className="grid gap-5">
      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-semibold text-ink">Visual Timeline</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {journeyTimeline.map((item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-md bg-paper px-3 py-2 font-medium text-ink">
                {item}
              </span>
              {index < journeyTimeline.length - 1 ? (
                <span className="text-lagoon">-&gt;</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Current phase", "Choose the phase from the left sidebar."],
          ["Completed documents", "Use each phase checklist to track forms reviewed/signed."],
          ["Missing documents", "Look for required documents and deadline reminders."],
          ["Upcoming deadlines", "Assessment, plans, reviews, transition, and discharge."],
          ["Collateral contacts needed", "Check ROIs and Contact Log PRO-1081."],
          ["Discharge planning status", "Begin transition planning before final discharge."],
        ].map(([title, body]) => (
          <article
            key={title}
            className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
          >
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{body}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

export function WhatDoIDoNextPanel({ phase }: { phase: JourneyPhase }) {
  return (
    <aside className="sticky top-36 hidden max-h-[calc(100vh-10rem)] overflow-auto rounded-lg border border-lagoon/20 bg-paper p-4 shadow-soft xl:block">
      <h2 className="text-lg font-semibold text-ink">What Do I Do Next?</h2>
      <ol className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
        {phase.whatToDoNext.slice(0, 8).map((item) => (
          <li key={item} className="rounded-md bg-white px-3 py-2">
            {item}
          </li>
        ))}
      </ol>
      <h3 className="mt-4 text-sm font-semibold text-ink">Watch deadlines</h3>
      <ul className="mt-2 grid gap-2 text-xs leading-5 text-ink/70">
        {phase.deadlines.map((item) => (
          <li key={item} className="rounded-md bg-white px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function WorkflowPhasePage({ phase }: { phase: JourneyPhase }) {
  if (phase.id === "dashboard") return <ClientJourneyDashboard />;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <article className="grid gap-5">
        <SimpleCard title="Phase Overview" items={[phase.purpose]} />
        <PhaseChecklist items={phase.whatToDoNext} />
        <RequiredDocumentsList documents={phase.requiredDocuments} />
        <ClientDialogueCard scripts={phase.clientDialogue} />
        <CounselorThinkingCard items={phase.counselorThinking} />
        <DocumentationGuidanceCard items={phase.documentationGuidance} />
        <ClinicalWordingExamples items={phase.clinicalWordingExamples} />
        <CommonMistakesCard items={phase.commonMistakes} />
        <NextStepsCard items={phase.nextSteps} />
        <DeadlineReminder items={phase.deadlines} />
        <SimpleCard
          title="Related ASAM / Treatment Planning Connections"
          items={[...phase.relatedAsamDimensions, ...phase.relatedTreatmentPlanAreas]}
        />
        <DocumentationAtEachPhaseTracker phase={phase} />
        {phase.id === "collateral-contacts-rois" ? <ROIContactScriptBuilder /> : null}
      </article>
      <WhatDoIDoNextPanel phase={phase} />
    </div>
  );
}
