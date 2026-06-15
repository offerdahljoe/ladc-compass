import type { AssessmentSection } from "@/lib/assessmentSections";

function MiniBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-3">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-2 grid gap-1 text-xs leading-5 text-ink/70">
        {items.slice(0, 5).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ClinicalNavigationAssistant({
  section,
}: {
  section: AssessmentSection;
}) {
  return (
    <aside className="sticky top-36 hidden max-h-[calc(100vh-10rem)] overflow-auto rounded-lg border border-lagoon/20 bg-paper p-4 shadow-soft xl:block">
      <h2 className="text-lg font-semibold text-ink">Clinical Navigation Assistant</h2>
      <div className="mt-4 grid gap-3">
        <MiniBlock
          title="What this section determines"
          items={[section.whatItAsks]}
        />
        <MiniBlock title="Listen for" items={section.listenFor} />
        <MiniBlock title="Find supporting information" items={section.whereToFindInfo} />
        <MiniBlock title="Related ASAM dimensions" items={section.asamConnections} />
        <MiniBlock title="Related documentation sections" items={section.relatedSections} />
        <MiniBlock
          title="Common mistakes"
          items={section.commonMistakes.map((item) => item.bad)}
        />
        <MiniBlock title="Quick wording examples" items={section.clinicalExamples} />
      </div>
    </aside>
  );
}
