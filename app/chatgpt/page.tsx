import PageHeader from "@/components/PageHeader";
import InfoCard from "@/components/InfoCard";

const prompts = [
  "Act as an LADC documentation coach. Help me improve this de-identified comprehensive assessment section. Teach me what the section means, identify missing information, connect it to ASAM, and draft Procentive-ready language.",
  "Help me turn this de-identified assessment into ASAM Dimension 1-6 wording. Include risk level 0-4, clinical rationale, missing information, and treatment planning connection.",
  "Help me create treatment plan problems, goals, objectives, and interventions from this de-identified assessment. Keep the language clinical, measurable, and appropriate for SUD treatment.",
  "Review this de-identified progress note draft. Help me make it clearer, more objective, tied to the treatment plan, and appropriate for Procentive copy/paste.",
  "Help me write a group note for this de-identified group session. Include topic, intervention, participation, client response, skill practiced, and plan.",
];

export default function ChatGPTPage() {
  return (
    <>
      <PageHeader
        eyebrow="ChatGPT"
        title="Open ChatGPT with LADC-ready prompts"
        description="Use this tab when you want to continue documentation coaching in ChatGPT. Do not paste real client identifying information or protected health information."
      />
      <section className="mb-5 rounded-lg border border-lagoon/25 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">Open ChatGPT</h3>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          ChatGPT opens in a separate browser tab. Copy a prompt below, then
          paste de-identified practice details only.
        </p>
        <a
          href="https://chatgpt.com/"
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-4 inline-flex rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          Open ChatGPT
        </a>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {prompts.map((prompt, index) => (
          <InfoCard
            key={prompt}
            title={`Prompt ${index + 1}`}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <p>{prompt}</p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
