import Link from "next/link";

export default function DocumentationMovedPage() {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Moved</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Documentation now lives in Documentation Lab</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
        The old standalone documentation page has been retired. Use Documentation Lab for clinical wording,
        progress notes, ASAM language, treatment plan wording, group notes, and Procentive-style templates.
      </p>
      <Link
        href="/documentation-lab/lab"
        className="focus-ring mt-5 inline-block rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
      >
        Open Documentation Lab
      </Link>
    </section>
  );
}
