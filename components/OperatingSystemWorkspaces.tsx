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

function NextStepEngine({ title = "Next Step Engine", steps }: { title?: string; steps: { label: string; href?: string; note: string }[] }) {
  return (
    <section className="rounded-lg border border-lagoon/20 bg-lagoon/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">{title}</p>
      <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step) => (
          step.href ? (
            <a key={step.label} href={step.href} className="focus-ring rounded-md border border-lagoon/20 bg-white p-3 text-sm hover:border-lagoon">
              <strong className="block text-ink">{step.label}</strong>
              <span className="mt-1 block text-ink/65">{step.note}</span>
            </a>
          ) : (
            <div key={step.label} className="rounded-md border border-lagoon/20 bg-white p-3 text-sm">
              <strong className="block text-ink">{step.label}</strong>
              <span className="mt-1 block text-ink/65">{step.note}</span>
            </div>
          )
        ))}
      </div>
    </section>
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
      <NextStepEngine
        steps={[
          { label: "Copy to Procentive", href: "/procentive-companion/companion", note: "Check where the wording belongs before entering it." },
          { label: "Build treatment priorities", href: "/clinical-decision-navigator/navigator", note: "Connect this wording to ASAM, DSM, and treatment planning." },
          { label: "Review billing code", href: "/billing-codes/reference", note: "Confirm the note type matches the service." },
        ]}
      />
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
          <details className="mt-3 rounded-md bg-paper p-3 text-sm text-ink/70">
            <summary className="cursor-pointer font-semibold">What to avoid</summary>
            <p className="mt-2">Avoid names, exact legal identifiers, judgmental labels, unsupported diagnoses, promises of level of care, or statements that sound more certain than the assessment supports.</p>
          </details>
        </section>
      </section>
    </Shell>
  );
}

const procentiveSections = [
  {
    title: "New Comprehensive Assessment",
    belongs: ["presenting problem", "substance use history", "DSM support", "ASAM narrative", "recommendations", "strengths/barriers", "summary"],
    examples: ["Client reports [pattern] with consequences in [life areas].", "ASAM Dimension 5 appears elevated due to [risk evidence]."],
  },
  {
    title: "New Treatment Plan",
    belongs: ["problem statements", "goals", "objectives", "interventions", "medical necessity"],
    examples: ["Client will identify 5 triggers and 3 coping strategies.", "Counselor will provide relapse prevention education."],
  },
  {
    title: "New Progress Note",
    belongs: ["service focus", "intervention", "client response", "progress", "risk", "plan"],
    examples: ["Session focused on coping skills and relapse prevention.", "Client was engaged and identified two high-risk situations."],
  },
  {
    title: "New Group Note / Individual Session Note",
    belongs: ["group participation", "session focus", "clinical intervention", "client response", "progress", "risk", "next step"],
    examples: ["Client participated in group discussion focused on [topic] and identified [skill/insight]."],
  },
  {
    title: "New Discharge Summary",
    belongs: ["treatment course", "progress", "discharge reason", "aftercare", "remaining needs", "referrals"],
    examples: ["Client is discharged with recommendations for continued recovery support, relapse prevention, and follow-up with [support]."],
  },
  {
    title: "Where Does This Go? ROI / Contact Log",
    belongs: ["collateral contact", "coordination", "release-confirmed communication", "non-billable follow-up"],
    examples: ["Contact made with probation after valid ROI to coordinate treatment expectations."],
  },
];

export function ProcentiveCompanion() {
  const [phrase, setPhrase] = useState("");
  const lower = phrase.toLowerCase();
  const matches = procentiveSections.filter((section) =>
    section.belongs.some((item) => lower.includes(item.split(" ")[0])) ||
    (!phrase.trim() ? section.title === "New Comprehensive Assessment" : false),
  );
  const visible = matches.length ? matches : procentiveSections;
  const whereDoesThisGo = lower.includes("active user") || lower.includes("housing") || lower.includes("living")
    ? "Suggested placement: ASAM Dimension 6, Clinical Summary, Treatment Priorities, Treatment Plan barriers/objectives, Discharge Planning, and Documentation Lab wording examples."
    : lower.includes("craving") || lower.includes("relapse") || lower.includes("trigger")
      ? "Suggested placement: ASAM Dimension 5, relapse prevention problem statement, treatment objectives, progress note focus, and group/individual session planning."
      : "Suggested placement depends on the clinical meaning. Ask: Is this diagnosis support, ASAM risk, treatment planning need, coordination need, or progress-note response?";

  return (
    <Shell eyebrow="Procentive Companion" title="Where Does This Go?">
      <NextStepEngine
        steps={[
          { label: "Send wording to Documentation Lab", href: "/documentation-lab/lab", note: "Turn the detail into usable Procentive language." },
          { label: "Check ASAM fit", href: "/clinical-decision-navigator/navigator", note: "Decide whether it changes risk, level of care, or treatment priorities." },
          { label: "Use Contact Log", href: "/client-journey/collateral-contacts-rois", note: "If this came from collateral contact, document ROI-based coordination." },
        ]}
      />
      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <label className="block text-sm font-semibold text-ink">
          Enter a de-identified statement or documentation idea
          <textarea value={phrase} onChange={(event) => setPhrase(event.target.value)} className="focus-ring mt-2 min-h-24 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Example: Client lives with active users and has limited sober support." />
        </label>
        <div className="mt-4 rounded-md bg-paper p-3 text-sm leading-6 text-ink/75">
          <strong>Output:</strong> {whereDoesThisGo}
        </div>
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
  asam: string;
  coreFunction: string;
  goal: string;
  opening: string;
  questions: string;
  activity: string;
  worksheet: string;
  video: string;
  reflection: string;
  closing: string;
  materials: string;
  facilitatorNotes: string;
  handoutNotes: string;
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
    asam: "",
    coreFunction: "",
    goal: "",
    opening: "",
    questions: "",
    activity: "",
    worksheet: "",
    video: "",
    reflection: "",
    closing: "",
    materials: "",
    facilitatorNotes: "",
    handoutNotes: "",
    documentation: "",
  });

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    store.addEntry(draft);
    setDraft({ ...draft, title: "", asam: "", coreFunction: "", goal: "", opening: "", questions: "", activity: "", worksheet: "", video: "", reflection: "", closing: "", materials: "", facilitatorNotes: "", handoutNotes: "", documentation: "" });
  }

  function generatedNote(session: GroupSession) {
    return session.documentation || `Group focused on ${session.title || "[topic]"} using ${session.type}. Group addressed ASAM Dimension(s) ${session.asam || "[dimensions]"} and supported ${session.coreFunction || "[core function]"}. Group goal was ${session.goal || "[goal]"}. Counselor facilitated discussion, activity, reflection, and recovery application.`;
  }

  return (
    <Shell eyebrow="Group Studio" title="Build, Save, and Reuse Group Sessions">
      <NextStepEngine
        steps={[
          { label: "Add to Calendar", href: "/calendar-tasks/planner", note: "Schedule the group and attach the session plan in the event notes." },
          { label: "Generate Group Note Language", href: "/documentation-lab/lab", note: "Copy the documentation paragraph into the note generator." },
          { label: "Connect to ASAM", href: "/clinical-decision-navigator/navigator", note: "Confirm which treatment need the group supports." },
        ]}
      />
      <section className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <form onSubmit={save} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Session builder</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm font-semibold text-ink">Session title<input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" /></label>
            <label className="text-sm font-semibold text-ink">Group type<select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">{groupTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            {(["asam", "coreFunction", "goal", "opening", "questions", "activity", "worksheet", "video", "reflection", "closing", "materials", "facilitatorNotes", "handoutNotes", "documentation"] as const).map((field) => (
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
                <p><strong>ASAM:</strong> {session.asam || "Add ASAM dimensions."}</p>
                <p><strong>Core function:</strong> {session.coreFunction || "Add core function connection."}</p>
                <p><strong>Opening:</strong> {session.opening || "Add an opening question."}</p>
                <p><strong>Activity:</strong> {session.activity || "Add activity details."}</p>
                <p><strong>Materials:</strong> {session.materials || "Add materials needed."}</p>
                <p><strong>Documentation:</strong> {generatedNote(session)}</p>
              </div>
              {session.id ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => store.addEntry({ ...session, title: `${session.title} copy` })} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Duplicate</button>
                  <button onClick={() => window.print()} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Print/export</button>
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

const medicationCards = [
  {
    slug: "/medications/buprenorphine",
    name: "Buprenorphine",
    brand: "Suboxone, Subutex, Sublocade, Brixadi",
    className: "Partial opioid agonist / MOUD",
    use: "Used to treat opioid use disorder by reducing withdrawal symptoms and cravings.",
    plain: "This medication can help stabilize opioid cravings and withdrawal so the client can focus on recovery work.",
    sideEffects: "Headache, constipation, nausea, sweating, sleep changes.",
    warnings: "Sedation, breathing problems, mixing with alcohol/benzodiazepines, diversion concerns, missed doses.",
    listenFor: "Cravings, withdrawal, medication adherence, sedation, continued opioid use, stigma, access barriers.",
    related: "Opioid use disorder, fentanyl/heroin/prescription opioid use, relapse prevention, MAT coordination.",
  },
  {
    slug: "/medications/methadone",
    name: "Methadone",
    brand: "Methadose, Dolophine",
    className: "Full opioid agonist / MOUD",
    use: "Used in opioid treatment programs to reduce opioid withdrawal, cravings, and illicit opioid use.",
    plain: "Methadone is a structured medication treatment that can help prevent withdrawal and support stability.",
    sideEffects: "Constipation, sweating, sleepiness, nausea, sexual side effects.",
    warnings: "Over-sedation, respiratory depression, QT/cardiac concerns, mixing with sedatives, missed clinic dosing.",
    listenFor: "Daily attendance barriers, sedation, cravings, transportation, stigma, take-home dose expectations.",
    related: "Opioid use disorder, OTP coordination, treatment compliance, ASAM Dimensions 1, 2, 5, and 6.",
  },
  {
    slug: "/medications/naltrexone",
    name: "Naltrexone",
    brand: "Vivitrol, Revia",
    className: "Opioid antagonist / AUD and OUD medication",
    use: "Used for alcohol use disorder and opioid use disorder after opioid-free period.",
    plain: "This medication blocks opioid effects and may reduce alcohol cravings for some clients.",
    sideEffects: "Nausea, headache, fatigue, injection-site soreness for Vivitrol.",
    warnings: "Must not be physically dependent on opioids when starting; liver concerns; overdose risk if attempting to override blockade.",
    listenFor: "Recent opioid use, cravings, injection follow-through, liver history, motivation, overdose education.",
    related: "Alcohol use disorder, opioid use disorder, relapse prevention, overdose prevention.",
  },
  {
    slug: "/medications/naloxone",
    name: "Naloxone",
    brand: "Narcan, Kloxxado, Zimhi",
    className: "Opioid overdose reversal medication",
    use: "Used to reverse suspected opioid overdose.",
    plain: "Naloxone can temporarily reverse an opioid overdose and give emergency responders time to help.",
    sideEffects: "Withdrawal symptoms after reversal, agitation, nausea, sweating.",
    warnings: "Call emergency services after use; effects can wear off before opioids do; more than one dose may be needed.",
    listenFor: "Overdose history, fentanyl exposure, using alone, access to naloxone, family education needs.",
    related: "Harm reduction, fentanyl/opioid risk, crisis planning, safety planning.",
  },
  {
    slug: "/medications/acamprosate",
    name: "Acamprosate",
    brand: "Campral",
    className: "Alcohol use disorder medication",
    use: "Used to support abstinence from alcohol after stopping drinking.",
    plain: "This medication may help the brain adjust after alcohol use and support continued abstinence.",
    sideEffects: "Diarrhea, nausea, anxiety, insomnia.",
    warnings: "Kidney concerns, adherence challenges due to multiple daily dosing.",
    listenFor: "Abstinence goal, adherence barriers, cravings, renal history, medication consistency.",
    related: "Alcohol use disorder, relapse prevention, treatment planning.",
  },
  {
    slug: "/medications/disulfiram",
    name: "Disulfiram",
    brand: "Antabuse",
    className: "Alcohol deterrent medication",
    use: "Creates an unpleasant reaction when alcohol is consumed.",
    plain: "This medication is meant to discourage drinking by causing a reaction if alcohol is used.",
    sideEffects: "Drowsiness, headache, metallic taste.",
    warnings: "Severe reaction with alcohol; hidden alcohol in products; liver concerns; must be used with informed consent.",
    listenFor: "Motivation, understanding of risks, alcohol exposure, liver history, support/accountability.",
    related: "Alcohol use disorder, relapse prevention, client education, informed consent.",
  },
];

export function MedicationReference({ path }: { path: string }) {
  const card = medicationCards.find((item) => item.slug === path) ?? medicationCards[0];
  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(card.name));
  }

  return (
    <Shell eyebrow="Medication Reference" title={path === "/medications/overview" ? "Fast Counselor Medication Cards" : card.name}>
      <NextStepEngine
        steps={[
          { label: "Ask medication questions", href: "/medications/medication-questions-for-assessment", note: "Use non-prescribing assessment questions and document client report." },
          { label: "Coordinate care with ROI", href: "/client-journey/collateral-contacts-rois", note: "Contact prescriber/pharmacy only with valid ROI or safety exception." },
          { label: "Document clinical relevance", href: "/documentation-lab/lab", note: "Describe adherence, side effects, access barriers, or recovery relevance." },
        ]}
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(path === "/medications/overview" ? medicationCards : [card]).map((item) => (
          <article key={item.name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">{item.className}</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{item.name}</h2>
              </div>
              <button type="button" onClick={() => speak()} className="focus-ring rounded-md border border-lagoon/20 px-3 py-2 text-sm font-semibold text-lagoon">Hear</button>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-ink/75">
              <p><strong>Brand names:</strong> {item.brand}</p>
              <p><strong>Common use:</strong> {item.use}</p>
              <p><strong>Plain-language explanation:</strong> {item.plain}</p>
              <p><strong>Common side effects:</strong> {item.sideEffects}</p>
              <p><strong>Warning signs:</strong> {item.warnings}</p>
              <p><strong>Counselor note:</strong> Listen for {item.listenFor}</p>
              <p><strong>Related:</strong> {item.related}</p>
              <p className="rounded-md bg-paper p-3 text-xs">Scope reminder: do not give medical advice. Encourage the client to ask their prescriber or pharmacist about dosing, side effects, medication changes, or safety concerns.</p>
            </div>
          </article>
        ))}
      </section>
    </Shell>
  );
}

export function BillingCodes() {
  const [query, setQuery] = useState("");
  const filtered = billingCodes.filter((code) => code.join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <Shell eyebrow="Billing Codes" title="Documentation Code Reference">
      <NextStepEngine
        steps={[
          { label: "Write the note", href: "/documentation-lab/lab", note: "Use the code to choose the correct documentation format." },
          { label: "Check workflow phase", href: "/client-journey/dashboard", note: "Make sure the form belongs at this point in the client journey." },
        ]}
      />
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
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const expanded = [
    ...websiteLibrary,
    { name: "SAMHSA TIPs", description: "Treatment Improvement Protocols for clinical learning and evidence-informed practice.", url: "https://store.samhsa.gov/?f%5B0%5D=series%3A5566", tags: ["training", "evidence-based"] },
    { name: "NIDA DrugFacts", description: "Substance-specific education useful for psychoeducation and counselor preparation.", url: "https://nida.nih.gov/research-topics/drugfacts", tags: ["client education", "substances"] },
    { name: "CDC Overdose Prevention", description: "Overdose prevention and naloxone information.", url: "https://www.cdc.gov/overdose-prevention/", tags: ["overdose", "safety"] },
    { name: "IC&RC", description: "Certification and exam-related information for credentialing pathways.", url: "https://internationalcredentialing.org/", tags: ["exam", "credentialing"] },
  ];
  const categories = ["All", "National organizations", "Minnesota organizations", "Recovery resources", "Client resources", "Professional organizations", "Trainings", "Crisis resources", "Financial resources", "Scholarship resources", "Career development", "Cultural resources", "Veteran resources", "Family resources"];
  const filtered = expanded.filter((item) => {
    const haystack = [item.name, item.description, ...item.tags].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && (category === "All" || haystack.includes(category.split(" ")[0].toLowerCase()));
  });
  return (
    <Shell eyebrow="Resource Library" title="Professional and Client Resource Finder">
      <NextStepEngine
        steps={[
          { label: "Save a contact", href: "/smart-contacts/contacts", note: "Move useful local resources into your contacts database." },
          { label: "Use as referral support", href: "/core-functions/referral", note: "Connect resources to the Referral core function." },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-[1fr_16rem]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm shadow-soft" placeholder="Search ASAM, SAMHSA, ethics, Minnesota, overdose, exam..." />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm shadow-soft">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.url} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
              <button onClick={() => setFavorites(toggleString(favorites, item.url))} className="rounded-md border border-ink/10 px-2 py-1 text-sm">{favorites.includes(item.url) ? "Starred" : "Star"}</button>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
            <p className="mt-3 text-sm leading-6 text-ink/70"><strong>Why it matters:</strong> Useful for counselor learning, client education, referral planning, or professional development depending on the category.</p>
            <textarea className="focus-ring mt-3 min-h-16 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Private notes about how you might use this resource." />
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
