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
];

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
                    Add questions, clinical listening points, documentation
                    examples, and related tools for this assessment area.
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
                Placeholder content for {page.title}. This section will hold
                practical counseling guidance, examples, scripts, forms,
                documentation language, and internal links relevant to this
                workflow.
              </p>
            </div>
          ))}
        </section>
      </article>
      <RelatedTools paths={page.related} />
    </div>
  );
}
