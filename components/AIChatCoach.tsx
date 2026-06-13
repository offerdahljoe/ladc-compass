"use client";

import { FormEvent, useState } from "react";

const modes = [
  "Comprehensive Assessment Coach",
  "ASAM Wording Helper",
  "Treatment Plan Helper",
  "Progress Note Helper",
  "Group Note Helper",
  "Procentive Copy/Paste Helper",
];

const quickPrompts = [
  "Walk me through a Comprehensive Assessment",
  "Help me word the presenting problem",
  "Help me write substance use history",
  "Help me write mental health history",
  "Help me write ASAM Dimensions from this assessment",
  "Tell me what information is missing",
  "Convert this to Procentive-ready language",
  "Generate treatment plan ideas from this assessment",
];

type Message = {
  role: "coach" | "user";
  text: string;
};

function intro(mode: string) {
  if (mode === "Comprehensive Assessment Coach") {
    return "Comprehensive Assessment Coach is active. I will prioritize assessment structure, follow-up questions, clinical meaning, ASAM links, missing information, Procentive wording, and treatment plan ideas.";
  }
  if (mode === "ASAM Wording Helper") return "ASAM Wording Helper is active. Paste de-identified details and I will help rate risk, explain the clinical rationale, and draft Dimension 1-6 language.";
  if (mode === "Treatment Plan Helper") return "Treatment Plan Helper is active. Share assessment themes and I will help build problem statements, goals, measurable objectives, and interventions.";
  if (mode === "Progress Note Helper") return "Progress Note Helper is active. I can help organize DAP or SOAP wording while keeping documentation observable, concise, and tied to the plan.";
  if (mode === "Group Note Helper") return "Group Note Helper is active. I can connect topic, participation, interventions, skills, client response, and plan language.";
  return "Procentive Copy/Paste Helper is active. I will format clean, neutral, de-identified language that is easier to paste into documentation fields.";
}

function assessmentReply(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("walk me through")) {
    return "A Comprehensive Assessment tells the clinical story: what is happening, why it matters, what risks and strengths are present, and what treatment should focus on.\n\nWalkthrough:\n1. Presenting problem: why services now.\n2. Substance use history: pattern, consequences, withdrawal, cravings, prior treatment.\n3. Mental health history: symptoms, safety, coping, treatment.\n4. Medical and medication needs.\n5. Family, social, legal, employment, culture, and recovery environment.\n6. Strengths and preferences.\n7. ASAM Dimensions 1-6.\n8. Recommendations and treatment plan themes.\n\nWhy it matters: each section clarifies risk, functioning, barriers, strengths, or medical necessity. Start with the presenting problem using no identifying details.";
  }
  if (lower.includes("presenting problem")) {
    return "Presenting problem answers: why this service, why now, and what is the main clinical concern?\n\nClinical purpose: it anchors medical necessity, ASAM risk, and initial treatment plan problems.\n\nProcentive-ready starter:\nThe individual presents for a substance use assessment due to [reason/referral/context]. They report [main substance-related concern] with impact on [functioning area]. They identify [motivation or concern] and would benefit from further assessment of ASAM dimensions and treatment needs.\n\nFollow-up questions: What prompted the assessment now? What are the current consequences? What does the person want help with?";
  }
  if (lower.includes("substance use history")) {
    return "Substance use history explains pattern, severity, consequences, and risk.\n\nInclude: primary substance, frequency, amount, route, last use, withdrawal, tolerance, cravings, prior treatment, recurrence history, consequences, and longest recovery period.\n\nASAM links: Dimension 1 for withdrawal/intoxication, Dimension 5 for relapse or continued use risk, and Dimension 6 for environmental triggers and supports.\n\nMissing items to check: overdose risk, MAT involvement, last use, withdrawal risk, prior treatment response, and recovery supports.";
  }
  if (lower.includes("mental health history")) {
    return "Mental health history clarifies co-occurring needs, safety, coping, and coordination of care.\n\nTeaching point: document symptoms and treatment relevance without over-diagnosing beyond scope.\n\nASAM link: primarily Dimension 3, with possible impact on readiness, relapse risk, and recovery environment.\n\nFollow-up questions: current symptoms and severity? safety concerns? medications or therapy? how do symptoms interact with substance use?";
  }
  if (lower.includes("asam")) {
    return "Turn assessment details into ASAM language by linking facts to risk and treatment need.\n\nFormat:\nDimension [#] risk is assessed as [0-4] based on [specific evidence]. This impacts treatment by [recommended focus, intervention, monitoring, referral, or support].\n\nTeaching point: do not just list facts. Explain what the facts mean clinically.";
  }
  if (lower.includes("missing")) {
    return "Missing information checklist:\n- Presenting problem: why now, referral source, stated concern.\n- Substance use: last use, frequency, amount, route, withdrawal, cravings, consequences, prior treatment.\n- Mental health: symptoms, safety, diagnoses, medications, hospitalizations.\n- Medical: current conditions, medications, urgent needs.\n- Readiness: motivation, ambivalence, barriers.\n- Recovery environment: housing, supports, transportation, legal/work stressors.\n- Strengths: supports, coping, previous success.\n- Recommendations: level-of-care rationale and next steps.";
  }
  if (lower.includes("procentive")) {
    return "For Procentive-ready language, use concise clinical paragraphs with clear headings.\n\nPresenting Problem: The individual presents for assessment due to [context]. They report [concerns] affecting [life areas].\n\nSubstance Use History: The individual reports [pattern] with [consequences]. Withdrawal/craving risk is [summary].\n\nASAM Summary: Dimension risks indicate [main level-of-care rationale]. Primary needs include [stabilization, relapse prevention, coping skills, coordination, recovery supports].";
  }
  if (lower.includes("treatment plan")) {
    return "Assessment findings become treatment plan ideas when needs are translated into change targets.\n\nProblems: continued use risk, limited coping skills, ambivalence, limited sober support.\nGoals: increase recovery stability, strengthen relapse prevention, improve coping, build support.\nObjectives: identify triggers, develop relapse prevention plan, attend services, practice recovery supports.\nInterventions: MI, CBT skills, psychoeducation, relapse prevention planning, referral or case management as indicated.";
  }
  return "I will coach this like an LADC documentation supervisor.\n\nNext step:\n1. Identify the assessment section.\n2. Separate facts from clinical impression.\n3. Connect details to ASAM if relevant.\n4. Draft neutral Procentive-ready language.\n5. Translate themes into treatment plan problems, goals, objectives, or interventions.\n\nWhich section are you working on, and what de-identified details are known?";
}

function reply(mode: string, text: string) {
  if (mode === "Comprehensive Assessment Coach") return assessmentReply(text);
  if (mode === "ASAM Wording Helper") return "ASAM wording should explain risk and treatment need.\n\nDraft: Dimension # risk is assessed as [0-4] based on [de-identified evidence]. Current need is [monitoring, skill-building, referral, coordination, or stabilization].\n\nFollow-up: What increases risk, what lowers risk, and what intervention follows?";
  if (mode === "Treatment Plan Helper") return "Treatment plans should flow from assessed needs.\n\nProblem: Recovery stability is affected by [barrier].\nGoal: Improve [recovery skill/functioning].\nObjective: Complete [measurable action] by [timeframe].\nIntervention: Counselor will use [MI/CBT/psychoeducation/referral/case management].";
  if (mode === "Progress Note Helper") return "Progress note coaching:\nD: What happened and what was reported or observed.\nA: What it means clinically, tied to goals or ASAM need.\nP: What happens next.\n\nKeep it observable, concise, and de-identified.";
  if (mode === "Group Note Helper") return "Group note coaching:\nDocument topic, intervention, participation level, response to material, skill practiced, and plan. Avoid unnecessary personal detail.";
  return "Procentive copy/paste coaching:\nUse neutral complete sentences, remove unsupported conclusions, keep de-identified wording, and connect the language to assessment findings, ASAM, treatment needs, and next steps.";
}

export default function AIChatCoach() {
  const [mode, setMode] = useState(modes[0]);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "coach",
      text: "I am in Comprehensive Assessment Coach mode. Share de-identified assessment details, or choose a quick prompt. I will teach the section, ask follow-up questions, connect details to ASAM, and help shape Procentive-ready wording.",
    },
  ]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: clean },
      { role: "coach", text: reply(mode, clean) },
    ]);
    setDraft("");
  }

  function changeMode(nextMode: string) {
    setMode(nextMode);
    setMessages((current) => [...current, { role: "coach", text: intro(nextMode) }]);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">Chat modes</h3>
        <div className="mt-4 grid gap-2">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeMode(item)}
              className={`focus-ring rounded-md border px-3 py-2 text-left text-sm font-semibold ${
                item === mode
                  ? "border-lagoon bg-lagoon text-white"
                  : "border-ink/10 bg-paper text-ink hover:border-lagoon"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <h3 className="mt-6 text-xl font-semibold text-ink">Quick prompts</h3>
        <div className="mt-4 grid gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="focus-ring rounded-md border border-ink/10 bg-paper px-3 py-2 text-left text-sm font-semibold text-ink hover:border-lagoon hover:bg-lagoon hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">{mode}</p>
        <h3 className="mt-1 text-xl font-semibold text-ink">Interactive documentation coaching</h3>
        <div className="mt-4 max-h-[30rem] min-h-80 overflow-auto rounded-lg border border-ink/10 bg-paper p-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`mb-3 max-w-[88%] whitespace-pre-wrap rounded-lg p-3 text-sm leading-6 ${
                message.role === "user"
                  ? "ml-auto bg-lagoon text-white"
                  : "border border-lagoon/20 bg-white text-ink/78"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <textarea
            className="focus-ring w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Paste de-identified assessment notes or ask for help with wording, missing information, ASAM, Procentive language, or treatment plan ideas."
          />
          <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Send
          </button>
        </form>
      </section>
    </section>
  );
}
