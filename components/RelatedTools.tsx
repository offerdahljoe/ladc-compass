import Link from "next/link";
import { getRelatedPages } from "@/lib/siteContent";

export default function RelatedTools({ paths }: { paths: string[] }) {
  const related = getRelatedPages(paths);

  return (
    <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-ink">Related Tools</h2>
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
      </div>
    </aside>
  );
}
