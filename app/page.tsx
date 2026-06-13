import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import DashboardStats from "@/components/DashboardStats";
import { navItems } from "@/lib/content";

const reminders = [
  "Review one Core Function before each internship day.",
  "Write reflections without client identifiers.",
  "Bring ethical or scope questions to supervision.",
];

export default function Home() {
  return (
    <>
      <PageHeader
        eyebrow="Home Dashboard"
        title="LADC Compass"
        description="A calm command center for learning, internship organization, group planning, documentation practice, and supervision preparation."
      />
      <section className="mb-6 rounded-lg border border-lagoon/25 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">
          Top Priority: Comprehensive Assessment Coach
        </h3>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          Use the AI Coach to walk through assessment sections, identify missing
          information, connect details to ASAM, and shape Procentive-ready
          clinical wording.
        </p>
        <Link
          href="/assistant"
          className="focus-ring mt-4 inline-flex rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          Open AI Assessment Coach
        </Link>
      </section>
      <DashboardStats />
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {navItems.slice(1).map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring rounded-lg border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-lagoon"
          >
            <p className="text-sm font-semibold text-lagoon">
              Section {index + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{item.label}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Open tools, examples, checklists, and saved local practice entries.
            </p>
          </Link>
        ))}
      </section>
      <section className="mt-6 rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">Reminders</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {reminders.map((reminder) => (
            <li
              key={reminder}
              className="rounded-lg border border-marigold/30 bg-marigold/10 p-4 text-sm text-ink/75"
            >
              {reminder}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
