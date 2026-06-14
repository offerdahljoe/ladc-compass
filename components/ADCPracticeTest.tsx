"use client";

import { FormEvent, useMemo, useState } from "react";

type Question = {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    id: "q1",
    topic: "Screening",
    prompt: "A caller asks if outpatient treatment is appropriate after reporting daily alcohol use and past withdrawal seizures. What is the best first response?",
    choices: [
      "Schedule outpatient group because the caller is motivated.",
      "Screen for immediate medical/withdrawal risk and refer for medical evaluation or detox assessment as indicated.",
      "Tell the caller to stop drinking before intake.",
      "Complete a treatment plan over the phone.",
    ],
    answer: 1,
    explanation: "Withdrawal seizure history is a safety issue. Screening should identify urgent risk and route the person to medical/detox evaluation before routine outpatient placement.",
  },
  {
    id: "q2",
    topic: "Assessment",
    prompt: "During assessment, the client reports opioid use, depression symptoms, unstable housing, and recent overdose. Which framework best organizes level-of-care thinking?",
    choices: ["DSM-5 criteria only", "ASAM six dimensions", "A discharge summary", "A group curriculum outline"],
    answer: 1,
    explanation: "ASAM organizes multidimensional need: withdrawal, biomedical, emotional/behavioral, readiness, relapse potential, and recovery environment.",
  },
  {
    id: "q3",
    topic: "Confidentiality",
    prompt: "A probation officer calls requesting treatment attendance and progress. There is no release in the chart. What should the counselor do?",
    choices: [
      "Confirm attendance only because probation is involved.",
      "Share progress because it supports accountability.",
      "Decline to disclose and explain that a valid release or legal basis is needed.",
      "Ask the probation officer to call the client's family instead.",
    ],
    answer: 2,
    explanation: "Without valid authorization or another legal basis, SUD treatment information should not be disclosed. Check policy and Part 2/HIPAA requirements.",
  },
  {
    id: "q4",
    topic: "Treatment Planning",
    prompt: "Which treatment plan objective is strongest?",
    choices: [
      "Client will understand addiction.",
      "Client will be compliant with treatment.",
      "Client will identify three triggers and three coping responses within 30 days.",
      "Counselor will teach relapse prevention.",
    ],
    answer: 2,
    explanation: "A strong objective is client-centered, observable, measurable, and time-limited.",
  },
  {
    id: "q5",
    topic: "Motivational Interviewing",
    prompt: "A client says, 'I know using is causing problems, but I am not ready to stop.' Which response best fits MI?",
    choices: [
      "You need to stop immediately or treatment will not work.",
      "It sounds like part of you sees the consequences, and another part is unsure about changing right now.",
      "You are in denial.",
      "Let us skip this and talk about discharge.",
    ],
    answer: 1,
    explanation: "MI uses reflective listening to explore ambivalence without arguing or labeling.",
  },
  {
    id: "q6",
    topic: "Documentation",
    prompt: "Which progress note statement is most clinically useful?",
    choices: [
      "Client did fine in group.",
      "Client was resistant and difficult.",
      "Client participated in relapse prevention group, identified two triggers, and practiced one coping response.",
      "Group was good.",
    ],
    answer: 2,
    explanation: "Good documentation names the intervention, response, skill/insight, and treatment relevance.",
  },
  {
    id: "q7",
    topic: "Referral",
    prompt: "A client reports chest pain during intake. What should the counselor do first?",
    choices: [
      "Continue the assessment because it is almost finished.",
      "Refer or activate medical evaluation according to agency emergency policy.",
      "Document it as anxiety without further action.",
      "Suggest the client drink water and wait.",
    ],
    answer: 1,
    explanation: "Possible medical emergency is outside counseling scope and requires immediate medical response per policy.",
  },
  {
    id: "q8",
    topic: "42 CFR Part 2",
    prompt: "What is a key reason 42 CFR Part 2 matters in SUD treatment?",
    choices: [
      "It removes the need for releases.",
      "It gives extra confidentiality protections to certain SUD treatment records.",
      "It only applies to billing records.",
      "It allows disclosure to any family member.",
    ],
    answer: 1,
    explanation: "Part 2 provides heightened protections for covered SUD treatment records and requires careful attention to consent and exceptions.",
  },
  {
    id: "q9",
    topic: "Core Functions",
    prompt: "Helping a client obtain housing resources and coordinating with a shelter after a valid release is best described as which core function?",
    choices: ["Counseling", "Case Management", "Orientation", "Screening"],
    answer: 1,
    explanation: "Case management connects clients to needed services and coordinates practical supports when appropriate.",
  },
  {
    id: "q10",
    topic: "Crisis Intervention",
    prompt: "A client reports current suicidal intent, a plan, and access to means. What is the best action?",
    choices: [
      "Ask the client to journal and discuss it next session.",
      "Use agency crisis policy immediately, consult supervision, and arrange emergency/safety response.",
      "Ignore it if the client promises not to act.",
      "Discharge the client from services.",
    ],
    answer: 1,
    explanation: "Current intent, plan, and means indicate elevated risk requiring immediate crisis response and consultation.",
  },
  {
    id: "q11",
    topic: "ASAM Dimension 4",
    prompt: "A client attends sessions but says they are only there for court and do not believe substance use is a problem. Which ASAM dimension is most directly involved?",
    choices: ["Dimension 1", "Dimension 2", "Dimension 4", "Dimension 6"],
    answer: 2,
    explanation: "Dimension 4 addresses readiness to change, motivation, engagement, and ambivalence.",
  },
  {
    id: "q12",
    topic: "Boundaries",
    prompt: "A client sends a social media friend request to the counselor. What is the best response?",
    choices: [
      "Accept it to build rapport.",
      "Ignore it and never discuss it.",
      "Follow agency policy, maintain professional boundaries, and discuss appropriate communication channels if needed.",
      "Message the client from a personal account.",
    ],
    answer: 2,
    explanation: "Professional boundaries protect confidentiality, role clarity, and client welfare.",
  },
  {
    id: "q13",
    topic: "Client Education",
    prompt: "Which example best fits client education?",
    choices: [
      "Explaining relapse warning signs and helping the client identify personal examples.",
      "Diagnosing a medical condition.",
      "Telling a client exactly which medication dose to take.",
      "Sharing another client's story.",
    ],
    answer: 0,
    explanation: "Client education provides information and connects it to the client's recovery skills and choices, while staying within scope.",
  },
  {
    id: "q14",
    topic: "Consultation",
    prompt: "An intern is unsure whether a disclosure requires mandated reporting. What should happen next?",
    choices: [
      "Make a private decision and move on.",
      "Ask a peer who is also an intern.",
      "Consult supervisor immediately and follow agency reporting policy.",
      "Avoid documenting the concern.",
    ],
    answer: 2,
    explanation: "Mandated reporting uncertainty requires timely supervision/consultation and policy-based action.",
  },
  {
    id: "q15",
    topic: "Group Counseling",
    prompt: "Which group note is strongest?",
    choices: [
      "Group was about triggers.",
      "Client attended group.",
      "Group focused on triggers; counselor facilitated trigger mapping; client identified one high-risk situation and one coping response.",
      "Everyone shared.",
    ],
    answer: 2,
    explanation: "It includes topic, intervention, participation/response, and skill connection.",
  },
  {
    id: "q16",
    topic: "Discharge Planning",
    prompt: "Discharge planning should begin:",
    choices: [
      "Only after the final session.",
      "At admission and continue throughout treatment.",
      "Only when the client relapses.",
      "Only when insurance requires it.",
    ],
    answer: 1,
    explanation: "Discharge planning is ongoing and should connect treatment goals, recovery supports, relapse prevention, and continuing care.",
  },
  {
    id: "q17",
    topic: "DSM-5 SUD",
    prompt: "Which information is most important when determining SUD criteria?",
    choices: [
      "A pattern of symptoms such as impaired control, social impairment, risky use, tolerance/withdrawal when applicable.",
      "Whether the counselor personally believes use is excessive.",
      "Only the amount used on the last day.",
      "Whether the client is court ordered.",
    ],
    answer: 0,
    explanation: "SUD diagnosis is based on a pattern of criteria, not counselor opinion or one isolated detail.",
  },
  {
    id: "q18",
    topic: "Recovery Environment",
    prompt: "A client wants abstinence but lives with people who use substances daily and has no sober supports. Which ASAM dimension is most directly elevated?",
    choices: ["Dimension 2", "Dimension 3", "Dimension 5", "Dimension 6"],
    answer: 3,
    explanation: "Dimension 6 covers recovery/living environment, supports, barriers, and exposure to substance use.",
  },
  {
    id: "q19",
    topic: "Reports and Record Keeping",
    prompt: "Which is the best documentation principle?",
    choices: [
      "Write as much personal detail as possible.",
      "Use labels to save time.",
      "Document objective facts, clinical relevance, intervention, response, and plan.",
      "Avoid documenting supervision or consultation.",
    ],
    answer: 2,
    explanation: "Records should be objective, clinically relevant, respectful, and useful for continuity of care.",
  },
  {
    id: "q20",
    topic: "Scope of Practice",
    prompt: "A client asks whether to stop taking prescribed buprenorphine. What should the LADC counselor do?",
    choices: [
      "Tell the client to stop if they feel ready.",
      "Give a taper schedule.",
      "Encourage the client to speak with the prescriber and support discussion of recovery goals and concerns.",
      "Document that medication is unnecessary.",
    ],
    answer: 2,
    explanation: "Medication changes are outside LADC scope. The counselor can support adherence barriers, education, coordination with ROI, and prescriber referral.",
  },
];

export default function ADCPracticeTest() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question) =>
          answers[question.id] === question.answer ? total + 1 : total,
        0,
      ),
    [answers],
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="mt-5 rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">ADC Practice Test</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            Twenty exam-style questions across assessment, ASAM, ethics,
            documentation, counseling, referral, crisis, and scope of practice.
          </p>
        </div>
        {submitted ? (
          <div className="rounded-md bg-lagoon/10 px-4 py-2 text-sm font-semibold text-lagoon">
            Score: {score} / {questions.length}
          </div>
        ) : null}
      </div>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        {questions.map((question, index) => {
          const selected = answers[question.id];
          const correct = selected === question.answer;
          return (
            <article
              key={question.id}
              className="rounded-lg border border-ink/10 bg-paper p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
                {question.topic}
              </p>
              <h3 className="mt-2 font-semibold leading-6 text-ink">
                {index + 1}. {question.prompt}
              </h3>
              <div className="mt-3 grid gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const isSelected = selected === choiceIndex;
                  const isAnswer = question.answer === choiceIndex;
                  const resultClass = !submitted
                    ? "border-ink/10 bg-white"
                    : isAnswer
                      ? "border-lagoon bg-lagoon/10"
                      : isSelected
                        ? "border-clay bg-clay/10"
                        : "border-ink/10 bg-white";
                  return (
                    <label
                      key={choice}
                      className={`flex cursor-pointer gap-3 rounded-md border px-3 py-2 text-sm leading-6 text-ink ${resultClass}`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={isSelected}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: choiceIndex,
                          }))
                        }
                      />
                      <span>{choice}</span>
                    </label>
                  );
                })}
              </div>
              {submitted ? (
                <div className="mt-3 rounded-md bg-white px-3 py-2 text-sm leading-6 text-ink/75">
                  <strong className={correct ? "text-lagoon" : "text-clay"}>
                    {correct ? "Correct." : "Review this one."}
                  </strong>{" "}
                  {question.explanation}
                </div>
              ) : null}
            </article>
          );
        })}

        <div className="flex flex-wrap gap-3">
          <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Submit answers
          </button>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="focus-ring rounded-md border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:bg-paper"
          >
            Reset test
          </button>
        </div>
      </form>
    </section>
  );
}
