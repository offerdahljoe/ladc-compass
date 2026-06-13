"use client";

import LocalEntryManager from "@/components/LocalEntryManager";
import PageHeader from "@/components/PageHeader";

const fields = [
  { name: "problem", label: "Problem statement", type: "textarea" as const, placeholder: "Example: Recovery is affected by cravings and limited coping strategies." },
  { name: "goal", label: "Goal", type: "textarea" as const, placeholder: "Example: Build a sustainable relapse prevention plan." },
  { name: "objective", label: "Objective", type: "textarea" as const, placeholder: "Example: Identify 3 triggers and 3 coping responses within 30 days." },
  { name: "intervention", label: "Interventions", type: "textarea" as const, placeholder: "Example: Use MI, CBT skill practice, relapse prevention worksheet, and referral discussion." },
];

export default function TreatmentPlanLabPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treatment Plan Lab"
        title="Build sample plans without client identifiers"
        description="Practice turning assessed needs into problem statements, goals, measurable objectives, and counselor interventions."
      />
      <section className="mb-5 grid gap-4 md:grid-cols-4">
        {["Problem statements", "Goals", "Objectives", "Interventions"].map((item) => (
          <div key={item} className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
            <h3 className="font-semibold text-ink">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Keep language behavioral, measurable where possible, and connected to ASAM needs.
            </p>
          </div>
        ))}
      </section>
      <LocalEntryManager
        storageKey="ladc-treatment-plans"
        fields={fields}
        emptyLabel="No sample treatment plans saved yet."
        titleField="problem"
      />
    </>
  );
}
