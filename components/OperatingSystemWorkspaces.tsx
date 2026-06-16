"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import { websiteLibrary } from "@/lib/siteContent";
import { useLocalEntries } from "@/lib/useLocalEntries";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className="focus-ring rounded-md border border-lagoon/25 px-3 py-2 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Shell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="grid gap-5">
      <section className="rounded-lg border border-lagoon/20 bg-white p-4 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">{title}</h1>
      </section>
      {children}
    </div>
  );
}

const documentationTypes = [
  "Comprehensive Assessment Summary",
  "ASAM Narrative",
  "DSM Diagnostic Support",
  "Treatment Plan",
  "Progress Note",
  "Group Note",
  "Individual Session Note",
  "Discharge Summary",
  "Referral Wording",
  "ROI Phone Script",
  "Client Explanation Script",
  "Supervisor Talking Points",
  "Billing Documentation Note",
];

export function DocumentationLab() {
  const [type, setType] = useState(documentationTypes[0]);
  const [facts, setFacts] = useState("");
  const [tone, setTone] = useState("Beginner explanation");

  const generated = useMemo(() => {
    const base = facts.trim() || "[enter de-identified facts]";
    if (type.includes("ASAM")) {
      return `ASAM documentation support: Based on the information provided, ${base}. This may support continued review of ASAM risk and treatment needs. Include the specific dimension, evidence for the rating, client strengths, barriers, and follow-up plan. Review elevated ratings with supervisor.`;
    }
    if (type.includes("Progress")) {
      return `Progress note example: Session focused on ${base}. Counselor used client-centered, trauma-informed, and motivational strategies to support treatment goals. Client response, progress, risk status, and next steps should be documented clearly. No PHI should be entered into this learning tool.`;
    }
    if (type.includes("Group")) {
      return `Group note example: Client participated in group focused on ${base}. Group addressed recovery skill development, ASAM-related treatment needs, and application to personal recovery. Document participation, response, and plan without unnecessary detail.`;
    }
    if (type.includes("Treatment Plan")) {
      return `Treatment plan language: Problem: Client demonstrates treatment needs related to ${base}. Goal: Client will improve recovery stability by addressing identified needs. Objectives should be measurable, behavior-based, and connected to assessment findings. Counselor interventions should describe what the counselor will do.`;
    }
    if (type.includes("ROI")) {
      return `ROI script: Hello, this is [name/role] with Kai-Shin Clinic. I have a signed release of information allowing coordination regarding ${base}. I am calling to confirm relevant treatment expectations, coordination needs, safety considerations, and follow-up steps.`;
    }
    return `${type}: Based on the de-identified information entered, ${base}. Use objective, clinically specific language. Connect the wording to assessment findings, ASAM/DSM support when applicable, treatment priorities, client response, and follow-up. Review uncertain wording with supervisor.`;
  }, [facts, type]);

  return (
    <Shell eyebrow="Documentation Lab" title="Clinical Wording Generator">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <form className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <label className="block text-sm font-semibold text-ink">
            Documentation type
            <select value={type} onChange={(event) => setType(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
              {documentationTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-ink">
            Mode
            <select value={tone} onChange={(event) => setTone(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
              <option>Beginner explanation</option>
              <option>Concise clinician version</option>
              <option>Procentive copy/paste style</option>
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-ink">
            De-identified facts
            <textarea value={facts} onChange={(event) => setFacts(event.target.value)} className="focus-ring mt-2 min-h-44 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Example: limited coping skills, high relapse risk, probation referral, needs sober support..." />
          </label>
        </form>
        <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">Generated wording</h2>
              <p className="mt-1 text-sm text-ink/60">{tone}</p>
            </div>
            <CopyButton text={generated} />
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink/75">{generated}</p>
          <details className="mt-4 rounded-md bg-paper p-3 text-sm text-ink/70">
            <summary className="cursor-pointer font-semibold">Why this wording works</summary>
            <p className="mt-2">It avoids definitive claims, connects facts to clinical meaning, and leaves room for supervision, agency policy, and clinical judgment.</p>
          </details>
        </section>
      </section>
    </Shell>
  );
}

const procentiveSections = [
  {
    title: "Comprehensive Assessment",
    belongs: ["presenting problem", "substance use history", "DSM support", "ASAM narrative", "recommendations", "strengths/barriers"],
    examples: ["Client reports [pattern] with consequences in [life areas].", "ASAM Dimension 5 appears elevated due to [risk evidence]."],
  },
  {
    title: "Treatment Plan",
    belongs: ["problem statements", "goals", "objectives", "interventions", "medical necessity"],
    examples: ["Client will identify 5 triggers and 3 coping strategies.", "Counselor will provide relapse prevention education."],
  },
  {
    title: "Progress Note",
    belongs: ["service focus", "intervention", "client response", "progress", "risk", "plan"],
    examples: ["Session focused on coping skills and relapse prevention.", "Client was engaged and identified two high-risk situations."],
  },
  {
    title: "Contact Log / ROI",
    belongs: ["collateral contact", "coordination", "release-confirmed communication", "non-billable follow-up"],
    examples: ["Contact made with probation after valid ROI to coordinate treatment expectations."],
  },
];

export function ProcentiveCompanion() {
  const [phrase, setPhrase] = useState("");
  const lower = phrase.toLowerCase();
  const matches = procentiveSections.filter((section) =>
    section.belongs.some((item) => lower.includes(item.split(" ")[0])) ||
    (!phrase.trim() ? section.title === "Comprehensive Assessment" : false),
  );
  const visible = matches.length ? matches : procentiveSections;

  return (
    <Shell eyebrow="Procentive Companion" title="Where Does This Go?">
      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <label className="block text-sm font-semibold text-ink">
          Enter a de-identified statement or documentation idea
          <textarea value={phrase} onChange={(event) => setPhrase(event.target.value)} className="focus-ring mt-2 min-h-24 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Example: Client lives with active users and has limited sober support." />
        </label>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {visible.map((section) => (
          <article key={section.title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-3 text-sm font-semibold text-lagoon">Information that belongs here</p>
            <ul className="mt-2 grid gap-2 text-sm text-ink/70">
              {section.belongs.map((item) => <li key={item} className="rounded-md bg-paper px-3 py-2">{item}</li>)}
            </ul>
            <p className="mt-3 text-sm font-semibold text-lagoon">Example wording</p>
            {section.examples.map((example) => <p key={example} className="mt-2 rounded-md bg-paper px-3 py-2 text-sm text-ink/70">{example}</p>)}
          </article>
        ))}
      </section>
    </Shell>
  );
}

type GroupSession = {
  id?: string;
  title: string;
  type: string;
  goal: string;
  opening: string;
  questions: string;
  activity: string;
  worksheet: string;
  closing: string;
  documentation: string;
};

const groupTypes = [
  "Relapse prevention",
  "CBT",
  "DBT skills",
  "Motivational interviewing",
  "Psychoeducation",
  "Emotional regulation",
  "Relationships",
  "Communication",
  "Boundaries",
  "Trauma-informed recovery",
  "Life skills",
  "Cravings management",
  "Coping skills",
  "MAT education",
  "Wellness/self-care",
];

export function GroupStudio() {
  const store = useLocalEntries<GroupSession>("ladc-group-studio-sessions");
  const [draft, setDraft] = useState<GroupSession>({
    title: "",
    type: groupTypes[0],
    goal: "",
    opening: "",
    questions: "",
    activity: "",
    worksheet: "",
    closing: "",
    documentation: "",
  });

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    store.addEntry(draft);
    setDraft({ ...draft, title: "", goal: "", opening: "", questions: "", activity: "", worksheet: "", closing: "", documentation: "" });
  }

  function generatedNote(session: GroupSession) {
    return session.documentation || `Group focused on ${session.title || "[topic]"} using ${session.type}. Group goal was ${session.goal || "[goal]"}. Counselor facilitated discussion, activity, reflection, and recovery application.`;
  }

  return (
    <Shell eyebrow="Group Studio" title="Build, Save, and Reuse Group Sessions">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <form onSubmit={save} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Session builder</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm font-semibold text-ink">Session title<input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" /></label>
            <label className="text-sm font-semibold text-ink">Group type<select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">{groupTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            {(["goal", "opening", "questions", "activity", "worksheet", "closing", "documentation"] as const).map((field) => (
              <label key={field} className="text-sm font-semibold capitalize text-ink">{field}<textarea value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} className="focus-ring mt-1 min-h-16 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" /></label>
            ))}
          </div>
          <button className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">Save session</button>
        </form>
        <section className="grid gap-4">
          {(store.entries.length ? store.entries : [draft]).map((session, index) => (
            <article key={session.id ?? "draft"} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-lagoon">{session.type}</p>
                  <h2 className="text-xl font-semibold text-ink">{session.title || "Draft group session"}</h2>
                </div>
                <CopyButton text={generatedNote(session)} />
              </div>
              <div className="mt-3 grid gap-2 text-sm text-ink/70">
                <p><strong>Goal:</strong> {session.goal || "Add a goal."}</p>
                <p><strong>Opening:</strong> {session.opening || "Add an opening question."}</p>
                <p><strong>Activity:</strong> {session.activity || "Add activity details."}</p>
                <p><strong>Documentation:</strong> {generatedNote(session)}</p>
              </div>
              {session.id ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => store.addEntry({ ...session, title: `${session.title} copy` })} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Duplicate</button>
                  <button onClick={() => store.removeEntry(session.id)} className="rounded-md border border-clay/30 px-3 py-2 text-sm font-semibold text-clay">Delete</button>
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </section>
    </Shell>
  );
}

const billingCodes = [
  ["PRO-1333", "Billable Individual Service Note / Intake", "Use for billable individual services or intake workflows. Document service focus, intervention, response, risk, and plan."],
  ["R682-1305", "Billable Group Note", "Use for group services. Include topic, clinical purpose, ASAM connection, participation, response, and plan."],
  ["R682-1202", "Initial Service Plan", "Use early to identify immediate needs before full assessment/treatment plan completion."],
  ["R682-1203", "Initial Treatment Plan / Progress Note reference", "Use when documenting treatment plan development and progress-note related workflow."],
  ["PRO-245G-E1100", "Comprehensive Assessment", "Use for the full assessment narrative, DSM support, ASAM summaries, and recommendations."],
  ["R682-1401", "Discharge Summary", "Use at discharge to summarize treatment course, progress, discharge status, recommendations, and aftercare."],
  ["PRO-1081", "Contact Log", "Use for collateral contacts, coordination, ROI-based communication, and non-billable follow-up."],
  ["PRO-1033", "Miscellaneous Documents / UA Log", "Use for miscellaneous uploads/logs according to Kai-Shin workflow."],
  ["R682-1019", "ROI General Use", "Use before contacting collateral supports unless a safety exception applies."],
  ["R682-1003", "Informed Consent for Treatment", "Use to confirm the client understands treatment expectations, rights, confidentiality, and consent."],
];

export function BillingCodes() {
  const [query, setQuery] = useState("");
  const filtered = billingCodes.filter((code) => code.join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <Shell eyebrow="Billing Codes" title="Documentation Code Reference">
      <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm shadow-soft" placeholder="Search code, service, note type..." />
      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map(([code, description, reminder]) => (
          <article key={code} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-lagoon">{code}</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{description}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{reminder}</p>
          </article>
        ))}
      </section>
    </Shell>
  );
}

export function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const expanded = [
    ...websiteLibrary,
    { name: "SAMHSA TIPs", description: "Treatment Improvement Protocols for clinical learning and evidence-informed practice.", url: "https://store.samhsa.gov/?f%5B0%5D=series%3A5566", tags: ["training", "evidence-based"] },
    { name: "NIDA DrugFacts", description: "Substance-specific education useful for psychoeducation and counselor preparation.", url: "https://nida.nih.gov/research-topics/drugfacts", tags: ["client education", "substances"] },
    { name: "CDC Overdose Prevention", description: "Overdose prevention and naloxone information.", url: "https://www.cdc.gov/overdose-prevention/", tags: ["overdose", "safety"] },
    { name: "IC&RC", description: "Certification and exam-related information for credentialing pathways.", url: "https://internationalcredentialing.org/", tags: ["exam", "credentialing"] },
  ];
  const filtered = expanded.filter((item) => [item.name, item.description, ...item.tags].join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <Shell eyebrow="Resource Library" title="Professional and Client Resource Finder">
      <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm shadow-soft" placeholder="Search ASAM, SAMHSA, ethics, Minnesota, overdose, exam..." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.url} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
              <button onClick={() => setFavorites(toggleString(favorites, item.url))} className="rounded-md border border-ink/10 px-2 py-1 text-sm">{favorites.includes(item.url) ? "Starred" : "Star"}</button>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-lagoon">{item.tags.join(" | ")}</p>
            <a href={item.url} target="_blank" rel="noreferrer" className="focus-ring mt-4 inline-block rounded-md bg-lagoon px-3 py-2 text-sm font-semibold text-white">Open site</a>
          </article>
        ))}
      </section>
    </Shell>
  );
}

function toggleString(items: string[], item: string) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}

const academyPaths = {
  "LADC Academy": ["ADC-T Foundations", "12 Core Functions", "ASAM Foundations", "DSM-5 Foundations", "Documentation Foundations", "Group Facilitation", "Ethics and Boundaries", "Clinical Interviewing"],
  "Exam Academy": ["Multiple choice drills", "Clinical scenarios", "ASAM questions", "DSM-5 questions", "Ethics questions", "Documentation questions", "Missed question review"],
  "Case Challenges": ["Level 1 straightforward case", "Level 2 moderate complexity", "Level 3 co-occurring conditions", "Level 4 complex systems case"],
  "Licensure Journey": ["Education requirements", "Internship hours", "Supervision documentation", "ADC exam steps", "Application materials", "Renewal reminders"],
  "Clinical Wisdom": ["Common intern mistakes", "What supervisors wish interns knew", "Red flags", "Better questions", "Boundaries", "De-escalation", "Burnout prevention"],
  "Reset Room": ["2-minute breathing reset", "5-minute grounding", "Post-group decompression", "Burnout check-in", "Positive reflection"],
};

export function LearningWorkspace({ title }: { title: keyof typeof academyPaths }) {
  const [complete, setComplete] = useState<string[]>([]);
  return (
    <Shell eyebrow={title} title={title === "Reset Room" ? "Reset Tools for the Workday" : "Guided Learning Workspace"}>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {academyPaths[title].map((item) => (
          <article key={item} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={complete.includes(item)} onChange={() => setComplete(toggleString(complete, item))} />
              <span>
                <strong className="text-ink">{item}</strong>
                <span className="mt-2 block text-sm leading-6 text-ink/70">
                  Learn the concept, why it matters, a real-world example, a reflection question, and one practice activity. This module is ready to expand into deeper lessons.
                </span>
              </span>
            </label>
          </article>
        ))}
      </section>
    </Shell>
  );
}
