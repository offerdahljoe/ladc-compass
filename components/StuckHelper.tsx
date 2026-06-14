"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const choices = [
  {
    label: "I need to assess something",
    links: [
      ["/assessments/comprehensive-assessment", "Start Comprehensive Assessment"],
      ["/assessments/asam-dimensions", "Find ASAM Dimension"],
      ["/assessments/risk-safety-assessment", "Check Risk/Safety"],
    ],
    prompt:
      "Start by naming what is known, what is missing, and whether there is immediate risk. Then connect the concern to ASAM and documentation.",
  },
  {
    label: "I need wording",
    links: [
      ["/clinical-wording/assessment-wording", "Assessment Wording"],
      ["/clinical-wording/progress-note-wording", "Progress Note Wording"],
      ["/clinical-wording/procentive-copy-paste-wording", "Procentive Copy/Paste"],
    ],
    prompt:
      "Use neutral, observable language. Separate facts from clinical impression and connect the wording to ASAM, treatment plan, or follow-up.",
  },
  {
    label: "I need to explain something to a client",
    links: [
      ["/client-scripts/opening-the-conversation", "Opening Script"],
      ["/client-scripts/explaining-assessment", "Explain Assessment"],
      ["/client-scripts/when-a-client-refuses", "Client Refuses"],
    ],
    prompt:
      "Use plain language, explain the purpose, invite questions, and offer a trauma-informed version when the topic feels sensitive.",
  },
  {
    label: "I need a treatment plan idea",
    links: [
      ["/treatment-planning/problem-statements", "Problem Statements"],
      ["/treatment-planning/goals", "Goals"],
      ["/treatment-planning/interventions", "Interventions"],
    ],
    prompt:
      "Translate assessment findings into a need, then a goal, then a measurable objective, then counselor interventions.",
  },
  {
    label: "I am working in Procentive",
    links: [
      ["/procentive-workflow/intake-to-assessment", "Intake to Assessment"],
      ["/procentive-workflow/assessment-entry-workflow", "Assessment Entry"],
      ["/procentive-workflow/copy-paste-checks", "Copy/Paste Checks"],
    ],
    prompt:
      "Move field by field. Check that each pasted paragraph is neutral, complete, connected to assessment findings, and free of PHI in learning notes.",
  },
  {
    label: "I need a group idea",
    links: [
      ["/group-therapy-hub/group-session-builder", "Group Session Builder"],
      ["/group-therapy-hub/topic-library", "Topic Library"],
      ["/group-therapy-hub/documentation-language", "Group Documentation"],
    ],
    prompt:
      "Pick a topic, opening question, skill practice, processing questions, ASAM/Core Function connections, and note language.",
  },
];

export default function StuckHelper() {
  const [selected, setSelected] = useState(choices[0].label);
  const active = useMemo(
    () => choices.find((choice) => choice.label === selected) ?? choices[0],
    [selected],
  );

  return (
    <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">I’m stuck. Point me somewhere.</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Choose what kind of stuck you are. LADC Compass will suggest the next
        page and a clinical thinking prompt.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              onClick={() => setSelected(choice.label)}
              className={`focus-ring rounded-md border px-3 py-2 text-left text-sm font-semibold ${
                selected === choice.label
                  ? "border-lagoon bg-lagoon text-white"
                  : "border-ink/10 bg-paper text-ink hover:border-lagoon"
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-ink/10 bg-paper p-4">
          <h3 className="font-semibold text-ink">{active.label}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/70">{active.prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {active.links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="focus-ring rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink hover:text-lagoon"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
