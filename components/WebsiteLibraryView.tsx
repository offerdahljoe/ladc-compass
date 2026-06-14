import { websiteLibrary } from "@/lib/siteContent";

export default function WebsiteLibraryView() {
  return (
    <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Website Library</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Open trusted outside references when you need source material, rules,
        professional guidance, or client resource links. Use agency policy and
        supervision to interpret requirements.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {websiteLibrary.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-lg border border-ink/10 bg-paper p-4 hover:border-lagoon"
          >
            <h3 className="font-semibold text-ink">{site.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">{site.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {site.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
