"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Entry = Record<string, string>;

function readCount(key: string) {
  if (typeof window === "undefined") return 0;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]").length;
  } catch {
    return 0;
  }
}

function readHours() {
  if (typeof window === "undefined") return 0;
  try {
    const entries = JSON.parse(
      window.localStorage.getItem("ladc-internship-hours") || "[]",
    ) as Entry[];
    return entries.reduce(
      (sum, entry) =>
        sum +
        Number(entry.directHours || 0) +
        Number(entry.indirectHours || 0) +
        Number(entry.hours || 0),
      0,
    );
  } catch {
    return 0;
  }
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    hours: 0,
    notes: 0,
    groups: 0,
    supervision: 0,
  });

  useEffect(() => {
    async function loadStats() {
      if (supabase) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { data } = await supabase
            .from("ladc_entries")
            .select("collection,payload")
            .in("collection", [
              "ladc-internship-hours",
              "ladc-treatment-plans",
              "ladc-group-plans",
              "ladc-supervision-notes",
            ]);

          if (data) {
            setStats({
              hours: data
                .filter((entry) => entry.collection === "ladc-internship-hours")
                .reduce(
                  (sum, entry) =>
                    sum +
                    Number((entry.payload as Entry).directHours || 0) +
                    Number((entry.payload as Entry).indirectHours || 0) +
                    Number((entry.payload as Entry).hours || 0),
                  0,
                ),
              notes: data.filter(
                (entry) => entry.collection === "ladc-treatment-plans",
              ).length,
              groups: data.filter(
                (entry) => entry.collection === "ladc-group-plans",
              ).length,
              supervision: data.filter(
                (entry) => entry.collection === "ladc-supervision-notes",
              ).length,
            });
            return;
          }
        }
      }

      setStats({
        hours: readHours(),
        notes: readCount("ladc-treatment-plans"),
        groups: readCount("ladc-group-plans"),
        supervision: readCount("ladc-supervision-notes"),
      });
    }

    void loadStats();

    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        void loadStats();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const progress = Math.min(100, Math.round((stats.hours / 880) * 100));

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <article className="rounded-lg border border-lagoon/25 bg-white p-5 shadow-soft md:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-lagoon">Internship hours</p>
            <h3 className="mt-1 text-3xl font-semibold text-ink">
              {stats.hours.toFixed(1)} / 880
            </h3>
          </div>
          <span className="rounded-md bg-lagoon/10 px-3 py-2 text-sm font-semibold text-lagoon">
            {progress}%
          </span>
        </div>
        <div className="mt-4 h-3 rounded-full bg-ink/10">
          <div
            className="h-3 rounded-full bg-lagoon"
            style={{ width: `${progress}%` }}
          />
        </div>
      </article>
      {[
        ["Notes due", stats.notes],
        ["Groups planned", stats.groups],
        ["Supervision questions", stats.supervision],
      ].map(([label, value]) => (
        <article
          key={label}
          className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
        >
          <p className="text-sm font-semibold text-ink/60">{label}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{value}</h3>
        </article>
      ))}
    </section>
  );
}
