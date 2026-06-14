import Link from "next/link";
import { getRelatedPages } from "@/lib/siteContent";

export default function RelatedTools({ paths }: { paths: string[] }) {
  const related = getRelatedPages(paths);

  return (
    <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-ink">Related Tools</h2>
      <p className="mt-2 text-sm leading-6 text-ink/65">
        Move from clinical question to assessment, wording, client script,
        treatment plan, and workflow.
      </p>
      <div className="mt-4 grid gap-2">
        {related.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="focus-ring rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-semibold text-ink hover:border-lagoon hover:text-lagoon"
          >
            {page.title}
          </Link>
        ))}
        <Link
          href="/helper/im-stuck"
          className="focus-ring rounded-md border border-clay/20 bg-clay/10 px-3 py-2 text-sm font-semibold text-ink hover:border-clay"
        >
          I’m stuck. Guide me.
        </Link>
      </div>
    </aside>
  );
}
