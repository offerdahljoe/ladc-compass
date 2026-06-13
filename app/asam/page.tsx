import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import { asamDimensions } from "@/lib/content";

export default function AsamPage() {
  return (
    <>
      <PageHeader
        eyebrow="ASAM Dimensions"
        title="Six dimensions for structured clinical thinking"
        description="Use the 0-4 risk rating as a learning prompt: 0 no issue, 1 mild, 2 moderate, 3 serious, 4 severe or urgent."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {asamDimensions.map((dimension, index) => (
          <InfoCard
            key={dimension.title}
            title={dimension.title}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <p><strong>What to assess:</strong> {dimension.assess}</p>
            <p><strong>Questions to ask:</strong> {dimension.questions}</p>
            <div>
              <strong>Risk rating 0-4:</strong>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <span
                    key={rating}
                    className="rounded-md border border-ink/10 bg-paper px-2 py-2 text-center font-semibold"
                  >
                    {rating}
                  </span>
                ))}
              </div>
            </div>
            <p><strong>Example wording:</strong> {dimension.wording}</p>
            <p><strong>Treatment planning connection:</strong> Translate the risk level into goals, interventions, referrals, monitoring, and level-of-care discussion.</p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
