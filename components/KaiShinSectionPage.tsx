import ClinicalConnectionMap from "@/components/ClinicalConnectionMap";
import ClinicalNavigationAssistant from "@/components/ClinicalNavigationAssistant";
import MissingInfoAlert from "@/components/MissingInfoAlert";
import ParagraphBuilder from "@/components/ParagraphBuilder";
import TranslateToClinical from "@/components/TranslateToClinical";
import type { AssessmentSection } from "@/lib/assessmentSections";

function CardList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-paper px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TextCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-ink/75">{text}</p>
    </section>
  );
}

function CommonMistakes({
  mistakes,
}: {
  mistakes: { bad: string; better: string }[];
}) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Common Intern Mistakes</h2>
      <div className="mt-3 grid gap-3">
        {mistakes.map((item) => (
          <div key={item.bad} className="rounded-md bg-paper p-3 text-sm leading-6">
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

function AsamAccordions({ section }: { section: AssessmentSection }) {
  if (!section.asamDimensions?.length) return null;

  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">ASAM Dimension Guide</h2>
      <div className="mt-4 grid gap-3">
        {section.asamDimensions.map((dimension) => (
          <details
            key={dimension.id}
            className="rounded-lg border border-ink/10 bg-paper p-4"
          >
            <summary className="cursor-pointer font-semibold text-ink">
              {dimension.title}
            </summary>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-ink/75">
              <p>{dimension.purpose}</p>
              <CardList title="Where to find information" items={dimension.whereToFindInfo} />
              <CardList title="Rating guidance 0-4" items={dimension.ratingGuidance} />
              <CardList title="Low rating clues" items={dimension.lowRating} />
              <CardList title="Moderate rating clues" items={dimension.moderateRating} />
              <CardList title="High rating clues" items={dimension.highRating} />
              <TextCard title="Example clinical justification" text={dimension.exampleJustification} />
              <CardList title="Problem statement examples" items={dimension.problemStatements} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function LevelOfCareBuilder({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">
        Level of Care Recommendation Builder
      </h2>
      <ParagraphBuilder
        fields={[
          {
            id: "clientReport",
            label: "What is the diagnosis?",
            placeholder: "Substance Use Disorder, severity, co-occurring considerations...",
          },
          {
            id: "impact",
            label: "What are the ASAM ratings?",
            placeholder: "D1 low, D2 mild, D3 moderate, D4 moderate, D5 high, D6 high...",
          },
          {
            id: "risks",
            label: "Highest risk dimension and structured-care risks",
            placeholder: "Relapse risk, recovery environment, withdrawal, safety, mental health...",
          },
          {
            id: "strengths",
            label: "Strengths supporting this level of care",
            placeholder: "Employment, willingness, stable medical status, supports...",
          },
          {
            id: "interpretation",
            label: "Recommended level of care and rationale",
            placeholder: "Outpatient, IOP, residential, withdrawal management, referral...",
          },
        ]}
      />
    </section>
  );
}

export default function KaiShinSectionPage({
  section,
}: {
  section: AssessmentSection;
}) {
  const isSummary = section.id === "summary-recommendations";

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <article className="grid gap-5">
        <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
            Kai-Shin Procentive Companion
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            {section.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
            {section.description}
          </p>
        </header>

        <ClinicalConnectionMap items={section.connectionMap ?? []} />
        <MissingInfoAlert items={section.missingInfo ?? []} />

        <TextCard title="What This Section Is Asking" text={section.whatItAsks} />
        <TextCard title="Why This Section Matters" text={section.whyItMatters} />
        <CardList title="What Information Am I Listening For?" items={section.listenFor} />
        <CardList title="Where Do I Find This Information?" items={section.whereToFindInfo} />
        <CardList title="Questions to Ask the Client" items={section.clientQuestions} />
        <CardList title="Red Flags" items={section.redFlags} />
        <CardList title="ASAM Connections" items={section.asamConnections} />
        <CardList title="Clinical Wording Examples" items={section.clinicalExamples} />
        <CommonMistakes mistakes={section.commonMistakes} />
        <AsamAccordions section={section} />
        <ParagraphBuilder fields={section.paragraphBuilderFields} />
        <TranslateToClinical />
        <LevelOfCareBuilder enabled={isSummary} />
      </article>
      <ClinicalNavigationAssistant section={section} />
    </div>
  );
}
