import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import { resourceSections } from "@/lib/content";

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title="Study shelves to fill over time"
        description="Placeholder sections for rules, exam prep, clinical models, and crisis resources. Add links or notes later as your program and supervisor recommend them."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resourceSections.map((section, index) => (
          <InfoCard
            key={section}
            title={section}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <p>Placeholder for trusted links, reading notes, practice prompts, and supervision reminders.</p>
            <label className="block text-sm font-medium text-ink">
              Notes
              <textarea
                className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
                placeholder="Add a study note later..."
              />
            </label>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
