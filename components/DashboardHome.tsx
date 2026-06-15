"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quickActions } from "@/lib/siteContent";

type Favorite = {
  path: string;
  title: string;
};

export default function DashboardHome() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [hourTotals, setHourTotals] = useState({ direct: 0, indirect: 0, total: 0 });

  useEffect(() => {
    setFavorites(JSON.parse(window.localStorage.getItem("ladc-favorites") || "[]"));
    try {
      const entries = JSON.parse(window.localStorage.getItem("ladc-internship-hours") || "[]") as Record<string, string>[];
      const direct = entries.reduce((sum, entry) => sum + Number(entry.directHours || 0), 0);
      const indirect = entries.reduce((sum, entry) => sum + Number(entry.indirectHours || 0), 0);
      const legacy = entries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
      setHourTotals({ direct, indirect, total: direct + indirect + legacy });
    } catch {
      setHourTotals({ direct: 0, indirect: 0, total: 0 });
    }
  }, []);

  const hourProgress = Math.min(100, Math.round((hourTotals.total / 880) * 100));

  return (
    <>
      <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          Your clinical home base
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Start common workflows, find connected tools quickly, and keep LADC
          learning, documentation, resources, and internship work in one calm
          workspace.
        </p>
      </section>

      <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
              Internship Hours
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">
              {hourTotals.total.toFixed(1)} / 880 hours logged
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Direct: {hourTotals.direct.toFixed(1)} | Indirect:{" "}
              {hourTotals.indirect.toFixed(1)}
            </p>
          </div>
          <Link
            href="/internship-survival-guide/hours-tracker"
            className="focus-ring rounded-lg bg-lagoon px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
          >
            Open Hours Tracker
          </Link>
        </div>
        <div className="mt-4 h-3 rounded-full bg-paper">
          <div className="h-3 rounded-full bg-lagoon" style={{ width: `${hourProgress}%` }} />
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            href={action.path}
            className="focus-ring rounded-lg border border-ink/10 bg-white p-5 shadow-soft hover:border-lagoon"
          >
            <h2 className="text-lg font-semibold text-ink">{action.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Open this workflow and see related tools in context.
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-semibold text-ink">Main work areas</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          These are the areas you are most likely to use during internship work:
          client workflow, Kai-Shin assessment support, groups, resources, and
          hour tracking.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Client Journey Navigator", "/client-journey/dashboard"],
            ["Kai-Shin Companion", "/kai-shin-procentive/companion"],
            ["Group Therapy Hub", "/group-therapy-hub/planner"],
            ["Resource Hub", "/resource-hub/resources"],
            ["Kai-Shin Hub", "/kai-shin/hub"],
            ["Internship Survival Guide", "/internship-survival-guide/hours-tracker"],
          ].map(([title, path]) => (
            <Link
              key={path}
              href={path}
              className="focus-ring rounded-lg border border-ink/10 bg-paper p-4 text-sm font-semibold text-ink hover:border-lagoon hover:text-lagoon"
            >
              {title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-4">
        {[
          ["Favorites", favorites.length ? favorites.map((item) => item.title).join(", ") : "No favorites saved yet."],
          ["Recent Pages", "Recent activity placeholder."],
          ["Quick Actions", "Assessment, notes, treatment plan, resources."],
          ["Recent Uploads", "Upload activity placeholder."],
        ].map(([title, body]) => (
          <article
            key={title}
            className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
          >
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
