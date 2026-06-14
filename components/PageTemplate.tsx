import FavoriteButton from "@/components/FavoriteButton";
import RelatedTools from "@/components/RelatedTools";
import { getPageDetails, getTopicBlocks, type ContentPage } from "@/lib/siteContent";

export default function PageTemplate({
  page,
  children,
}: {
  page: ContentPage;
  children?: React.ReactNode;
}) {
  const details = getPageDetails(page);
  const topicBlocks = getTopicBlocks(page);

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
          {topicBlocks.map((block) => (
            <div
              key={block.title}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
            >
              <h2 className="text-xl font-semibold text-ink">{block.title}</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
                {block.items.map((item) => (
                  <li key={item} className="rounded-md bg-paper px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {details.externalLinks.length > 0 ? (
          <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">Trusted External Links</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {details.externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring rounded-lg border border-ink/10 bg-paper p-4 hover:border-lagoon"
                >
                  <h3 className="font-semibold text-ink">{link.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    {link.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <RelatedTools paths={page.related} />
    </div>
  );
}
