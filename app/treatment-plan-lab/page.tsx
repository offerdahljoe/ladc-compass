import Link from "next/link";

export default function TreatmentPlanLabMovedPage() {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Moved</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Treatment planning now flows through Clinical Decision Navigator</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
        The old separate Treatment Plan Lab has been retired. Use Clinical Decision Navigator to connect
        assessment findings, ASAM risk, treatment priorities, level of care, and treatment plan ideas.
      </p>
      <Link
        href="/clinical-decision-navigator/navigator"
        className="focus-ring mt-5 inline-block rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
      >
        Open Clinical Decision Navigator
      </Link>
    </section>
  );
}
