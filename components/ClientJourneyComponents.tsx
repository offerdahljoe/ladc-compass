"use client";

import NavLink from "@/components/NavLink";
import { useMemo, useState } from "react";
import {
  clientJourneyNavItems,
  coordinationTemplates,
  documentationTemplates,
  journeyTimeline,
  roiContactTypes,
  type JourneyDocument,
  type JourneyPhase,
} from "@/lib/clientJourneyPhases";

function JourneySection({
  title,
  defaultOpen = false,
  tone = "default",
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  tone?: "default" | "clay" | "lagoon";
  children: React.ReactNode;
}) {
  const border =
    tone === "clay"
      ? "border-clay/30"
      : tone === "lagoon"
        ? "border-lagoon/25"
        : "border-ink/10";
  return (
    <details
      open={defaultOpen}
      className={`rounded-lg border bg-white p-4 shadow-soft ${border}`}
    >
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        {title}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function BulletList({ items, tone = "default" }: { items: string[]; tone?: "default" | "clay" | "lagoon" }) {
  const itemClass =
    tone === "clay"
      ? "rounded-md bg-clay/10 px-3 py-2"
      : tone === "lagoon"
        ? "rounded-md bg-lagoon/10 px-3 py-2"
        : "rounded-md bg-paper px-3 py-2";
  return (
    <ul className="grid gap-2 text-sm leading-6 text-ink/75">
      {items.map((item) => (
        <li key={item} className={itemClass}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PhaseContextHeader({ phase }: { phase: JourneyPhase }) {
  return (
    <div className="sticky top-28 z-10 rounded-lg border border-lagoon/20 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
        Client Journey · {phase.title}
      </p>
      <p className="mt-1 text-sm leading-6 text-ink/70">{phase.description}</p>
      {phase.requiredDocuments.length ? (
        <p className="mt-2 text-xs text-ink/60">
          Procentive forms this phase:{" "}
          {phase.requiredDocuments.map((doc) => doc.code).join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function PhaseChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="grid gap-2">
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
    <div className="grid gap-3">
      {documents.length ? (
        documents.map((document) => (
          <DocumentExplanationCard key={`${document.code}-${document.name}`} document={document} />
        ))
      ) : (
        <p className="rounded-md bg-paper px-3 py-2 text-sm text-ink/70">
          No specific form is listed for this phase. Open Procentive, confirm the
          Kai-Shin workflow form for this step, and document what you completed.
        </p>
      )}
    </div>
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
    <div className="mt-4 rounded-lg border border-lagoon/20 bg-paper p-4">
      <h3 className="text-sm font-semibold text-ink">ROI Contact Script Builder</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Contact type
          <select
            value={contactType}
            onChange={(event) => setContactType(event.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
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
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
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
              className="focus-ring mt-1 min-h-20 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-clay/30 bg-clay/10 p-3 text-sm text-ink">
        <strong>Reminder:</strong> Never contact collateral supports without a
        valid ROI unless there is a legally required safety exception. Always
        document the contact in Contact Log PRO-1081.
      </div>
      <div className="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-ink/75">
        <h4 className="font-semibold text-ink">Script draft</h4>
        <p className="mt-2">
          {consent === "yes"
            ? script
            : "Do not contact. Obtain a valid ROI or consult supervision/policy if a safety exception may apply."}
        </p>
      </div>
    </div>
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
  );
}

export function ClientJourneyDashboard() {
  const phases = clientJourneyNavItems.filter((item) => !item.path.endsWith("/dashboard"));

  return (
    <section className="grid gap-4">
      <div className="rounded-lg border border-lagoon/20 bg-white p-4 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
          Client Journey
        </p>
        <p className="mt-1 text-sm text-ink/70">
          Pick the phase that matches where the client is right now. Use the left
          sidebar to jump between phases while the chart is open in Procentive.
        </p>
      </div>
      <details open className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          Workflow timeline
        </summary>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {journeyTimeline.map((item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-md bg-paper px-2 py-1 font-medium text-ink">
                {item}
              </span>
              {index < journeyTimeline.length - 1 ? (
                <span className="text-lagoon">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </details>
      <details open className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          Jump to a phase
        </summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {phases.map((item) => (
            <NavLink
              key={item.path}
              href={item.path}
              className="focus-ring rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-medium text-ink hover:border-lagoon"
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </details>
    </section>
  );
}

export function WorkflowPhasePage({ phase }: { phase: JourneyPhase }) {
  if (phase.id === "dashboard") return <ClientJourneyDashboard />;

  const clinicalThinking = [
    ...phase.counselorThinking,
    ...phase.relatedAsamDimensions.map((item) => `ASAM: ${item}`),
    ...phase.relatedTreatmentPlanAreas.map((item) => `Treatment plan: ${item}`),
  ];
  const documentationItems = [
    ...phase.documentationGuidance,
    ...phase.clinicalWordingExamples.map((item) => `Wording: ${item}`),
  ];
  const nextStepItems = [...phase.nextSteps, ...phase.deadlines.map((item) => `Deadline: ${item}`)];

  return (
    <section className="grid gap-3">
      <PhaseContextHeader phase={phase} />

      <JourneySection title="Purpose" defaultOpen>
        <p className="text-sm leading-6 text-ink/75">{phase.purpose}</p>
      </JourneySection>

      <JourneySection title="What am I doing?" defaultOpen>
        <PhaseChecklist items={phase.whatToDoNext} />
      </JourneySection>

      <JourneySection title="Questions to ask">
        <BulletList items={phase.clientDialogue} />
      </JourneySection>

      <JourneySection title="Documents involved" defaultOpen={phase.requiredDocuments.length > 0}>
        <RequiredDocumentsList documents={phase.requiredDocuments} />
        {phase.id === "collateral-contacts-rois" ? <ROIContactScriptBuilder /> : null}
      </JourneySection>

      <JourneySection title="Clinical thinking">
        <BulletList items={clinicalThinking} />
      </JourneySection>

      <JourneySection title="What do I document?">
        <BulletList items={documentationItems} />
        <DocumentationAtEachPhaseTracker phase={phase} />
      </JourneySection>

      <JourneySection title="Common mistakes" tone="clay">
        <BulletList items={phase.commonMistakes} tone="clay" />
      </JourneySection>

      <JourneySection title="Next step" tone="lagoon">
        <BulletList items={nextStepItems} tone="lagoon" />
      </JourneySection>
    </section>
  );
}
