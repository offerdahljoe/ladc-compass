import FavoriteButton from "@/components/FavoriteButton";
import RelatedTools from "@/components/RelatedTools";
import type { ContentPage } from "@/lib/siteContent";

const templateSections = [
  "What is this?",
  "Why does it matter?",
  "When do I use it?",
  "How do I explain it to a client?",
  "How do I document it?",
  "What does it connect to?",
  "Examples",
  "Common mistakes",
];

function sectionCopy(section: string, page: ContentPage) {
  const title = page.title.toLowerCase();
  const context = `${page.title} in ${page.section}`;

  if (section === "What is this?") {
    return `${context} is a working clinical reference page. It helps an LADC intern understand the task, choose the right next step, and connect the topic to assessment, documentation, treatment planning, ethics, and workplace workflow.`;
  }
  if (section === "Why does it matter?") {
    return `This matters because clinical work is connected. A detail gathered in assessment may affect ASAM risk, diagnosis, treatment plan problems, progress note language, referrals, client scripts, and consultation. This page is designed to prevent the topic from living in isolation.`;
  }
  if (section === "When do I use it?") {
    return `Use this page when ${title} shows up in real work, supervision, documentation review, exam study, client communication, or Kai-Shin/Procentive workflow. It is also a good place to start when you know the clinical issue but are not sure which form, wording, or tool comes next.`;
  }
  if (section === "How do I explain it to a client?") {
    return `Plain-language script: "I want to explain what we are doing and why. This part helps us understand what support fits best, what needs attention, and what choices you have. You can ask questions, and we will go at a pace that makes sense."`;
  }
  if (section === "How do I document it?") {
    return `Documentation pattern: state the clinically relevant facts, connect them to risk/need/strengths, describe the counselor action or recommendation, and note the follow-up. Keep wording neutral, behavioral, de-identified for learning notes, and tied to the treatment plan or ASAM dimension when applicable.`;
  }
  if (section === "What does it connect to?") {
    return `Common connections: Comprehensive Assessment, ASAM Dimensions, DSM-5 criteria, treatment plan problems/goals/objectives/interventions, progress notes, client scripts, ethical duties, Core Functions, Procentive workflow, and supervision questions. Use the Related Tools panel to move through those connections.`;
  }
  if (section === "Examples") {
    return `Example wording: "Counselor reviewed ${page.title.toLowerCase()} with the individual using plain-language explanation, assessed relevant needs and strengths, and identified follow-up items for treatment planning and supervision." Example next step: open a related wording page, script page, or Procentive workflow page before documenting.`;
  }
  return `Common mistakes: treating the page like a standalone checklist, copying language without clinical rationale, skipping ASAM or treatment-plan connections, using jargon with clients, documenting conclusions without observable support, or forgetting to bring uncertainty to supervision.`;
}

export default function PageTemplate({
  page,
  children,
}: {
  page: ContentPage;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <article>
        <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
            {page.section}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
                {page.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
                {page.summary}
              </p>
            </div>
            <FavoriteButton path={page.path} title={page.title} />
          </div>
        </div>

        {page.prompts ? (
          <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">Guided Subsections</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {page.prompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-lg border border-ink/10 bg-paper p-4"
                >
                  <h3 className="font-semibold text-ink">{prompt}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    Use this subsection to collect what is known, what is
                    missing, why it matters clinically, how it connects to ASAM,
                    and what wording or treatment plan idea may follow.
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {children}

        <section className="mt-5 grid gap-4">
          {templateSections.map((section) => (
            <div
              key={section}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
            >
              <h2 className="text-xl font-semibold text-ink">{section}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/72">
                {sectionCopy(section, page)}
              </p>
            </div>
          ))}
        </section>
      </article>
      <RelatedTools paths={page.related} />
    </div>
  );
}
