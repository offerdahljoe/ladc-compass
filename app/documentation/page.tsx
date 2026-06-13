import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import TemplateBrowser from "@/components/TemplateBrowser";
import { documentationTemplates } from "@/lib/content";

export default function DocumentationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation Center"
        title="Template starters for learning notes"
        description="These are practice structures, not legal advice or agency policy. Follow your site documentation standards and supervision guidance."
      />
      <TemplateBrowser />
      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        {documentationTemplates.map((template, index) => (
          <InfoCard
            key={template.title}
            title={template.title}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <ul className="space-y-2">
              {template.sections.map((section) => (
                <li key={section} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lagoon" />
                  <span>{section}</span>
                </li>
              ))}
            </ul>
            <p className="rounded-lg bg-paper p-3">
              Example language: De-identified learning note reviewed in supervision;
              next step is to clarify intervention, response, and follow-up plan.
            </p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
