"use client";

import LocalEntryManager from "@/components/LocalEntryManager";
import PageHeader from "@/components/PageHeader";
import { coreFunctions } from "@/lib/content";

const fields = [
  { name: "date", label: "Date", type: "date" as const },
  { name: "directHours", label: "Direct hours", type: "number" as const, placeholder: "2.0" },
  { name: "indirectHours", label: "Indirect hours", type: "number" as const, placeholder: "0.5" },
  { name: "activity", label: "Activity", type: "textarea" as const },
  { name: "core", label: "Core function", type: "select" as const, options: coreFunctions.map((item) => item.name) },
  { name: "reflection", label: "Reflection", type: "textarea" as const },
  { name: "supervisor", label: "Supervisor contact", placeholder: "Consulted during supervision, email check-in, observation, etc." },
];

export default function InternshipTrackerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Internship Tracker"
        title="Track learning hours toward 880"
        description="Log de-identified internship activity, Core Function practice, reflection, and supervisor contact."
      />
      <LocalEntryManager
        storageKey="ladc-internship-hours"
        fields={fields}
        emptyLabel="No internship hours saved yet."
        titleField="activity"
        afterEntries={(entries) => {
          const direct = entries.reduce((sum, entry) => sum + Number(entry.directHours || 0), 0);
          const indirect = entries.reduce((sum, entry) => sum + Number(entry.indirectHours || 0), 0);
          const legacy = entries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
          const total = direct + indirect + legacy;
          const progress = Math.min(100, Math.round((total / 880) * 100));
          return (
            <div className="mt-4 rounded-lg border border-lagoon/25 bg-lagoon/10 p-4">
              <div className="grid gap-3 text-sm font-semibold text-ink sm:grid-cols-4">
                <span>Direct: {direct.toFixed(1)}</span>
                <span>Indirect: {indirect.toFixed(1)}</span>
                <span>Total: {total.toFixed(1)} / 880</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-white">
                <div className="h-3 rounded-full bg-lagoon" style={{ width: `${progress}%` }} />
              </div>
            </div>
          );
        }}
      />
    </>
  );
}
