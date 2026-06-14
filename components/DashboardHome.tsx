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

  useEffect(() => {
    setFavorites(JSON.parse(window.localStorage.getItem("ladc-favorites") || "[]"));
  }, []);

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
        <h2 className="text-xl font-semibold text-ink">Connected clinical operating system</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          These hubs are designed to keep assessment, wording, client
          communication, Procentive workflow, groups, and treatment planning
          connected instead of scattered.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Clinical Wording Library", "/clinical-wording/assessment-wording"],
            ["Client Scripts Library", "/client-scripts/opening-the-conversation"],
            ["Procentive Workflow", "/procentive-workflow/intake-to-assessment"],
            ["Group Therapy Hub", "/group-therapy-hub/group-session-builder"],
            ["I’m Stuck", "/helper/im-stuck"],
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
