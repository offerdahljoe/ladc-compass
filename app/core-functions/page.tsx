import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import { coreFunctions } from "@/lib/content";

export default function CoreFunctionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="12 Core Functions"
        title="What each function means in practice"
        description="Use these cards as a study map and internship reflection guide. Each example uses de-identified learning language."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {coreFunctions.map((item, index) => (
          <InfoCard
            key={item.name}
            title={item.name}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <p><strong>Purpose:</strong> {item.purpose}</p>
            <p><strong>What the counselor does:</strong> {item.counselor}</p>
            <p><strong>Documentation:</strong> {item.paperwork}</p>
            <p><strong>Example language:</strong> {item.example}</p>
            <p><strong>Common mistakes:</strong> {item.mistakes}</p>
            <p><strong>Internship connection:</strong> {item.internship}</p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
