import NavLink from "@/components/NavLink";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";

const sections = [
  ["Presenting Problem", "Why services now, referral context, primary concerns, and stated goals."],
  ["Substance Use History", "Current and historical patterns, consequences, withdrawal, cravings, prior treatment, and recovery periods."],
  ["Mental Health History", "Symptoms, diagnoses, safety, coping, medications, treatment, and interaction with substance use."],
  ["Medical and Medication History", "Biomedical needs, pain, medications, pregnancy, sleep, nutrition, and care coordination."],
  ["Family, Social, Legal, Employment", "Functioning, stressors, supports, culture, legal concerns, school or work impact."],
  ["ASAM Summary", "Dimension 1-6 risk ratings, rationale, and treatment planning connection."],
  ["Strengths and Preferences", "Protective factors, motivation, values, previous success, and preferred supports."],
  ["Recommendations", "Level-of-care rationale, services, referrals, treatment plan themes, and next steps."],
];

export default function ComprehensiveAssessmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comprehensive Assessment"
        title="Assessment sections and clinical purpose"
        description="Use this page as a map, then open the same work in the AI Assessment Coach for interactive guidance, follow-up questions, ASAM links, and Procentive-ready wording."
      />
      <section className="mb-5 rounded-lg border border-lagoon/25 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">Work this inside the AI chatbox</h3>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          The Comprehensive Assessment Coach is the default AI mode and the top-priority documentation feature.
        </p>
        <NavLink
          href="/assistant"
          className="focus-ring mt-4 inline-flex rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          Open in AI Assessment Coach
        </NavLink>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {sections.map(([title, body], index) => (
          <InfoCard
            key={title}
            title={title}
            accent={["lagoon", "sage", "clay", "marigold"][index % 4] as "lagoon"}
          >
            <p>{body}</p>
            <p>
              <strong>Coach prompt:</strong> Ask what is known, why it matters,
              what is missing, and how it connects to ASAM.
            </p>
          </InfoCard>
        ))}
      </section>
    </>
  );
}
