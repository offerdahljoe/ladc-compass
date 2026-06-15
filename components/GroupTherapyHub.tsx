"use client";

import { useMemo, useState } from "react";

type GroupSession = {
  title: string;
  purpose: string;
  openingQuestion: string;
  teachingPoint: string;
  activity: string;
  processingQuestions: string[];
  worksheetIdea: string;
  asam: string[];
  documentation: string;
};

type GroupTopic = {
  title: string;
  clinicalFocus: string;
  sessions: GroupSession[];
};

type TherapyStyle = {
  title: string;
  plainLanguage: string;
  counselorUse: string;
  topics: GroupTopic[];
};

const therapyStyles: TherapyStyle[] = [
  {
    title: "Relapse Prevention",
    plainLanguage:
      "Helps clients identify warning signs, triggers, high-risk situations, coping skills, and recovery supports before relapse happens.",
    counselorUse:
      "Use when clients report cravings, repeated return to use, limited coping skills, high-risk peers, boredom, stress, or environmental triggers.",
    topics: [
      {
        title: "Triggers and Cravings",
        clinicalFocus:
          "Connect internal and external triggers to ASAM Dimension 5 relapse risk and practical coping plans.",
        sessions: [
          {
            title: "Trigger Map and Coping Menu",
            purpose:
              "Clients identify personal triggers and build a menu of realistic alternatives they can use before cravings escalate.",
            openingQuestion: "What is one situation where staying sober feels harder than usual?",
            teachingPoint:
              "Triggers are not excuses; they are warning signs. The goal is to notice them earlier and respond with a plan.",
            activity:
              "Have clients divide paper into people, places, emotions, thoughts, and body cues. Add one coping response beside each trigger.",
            processingQuestions: [
              "Which trigger shows up most often?",
              "What do you usually do first when that trigger appears?",
              "What coping skill feels realistic enough to actually use this week?",
              "Who can you contact before the craving gets stronger?",
            ],
            worksheetIdea: "Personal Trigger Map with Coping Response column.",
            asam: ["Dimension 5", "Dimension 6", "Dimension 3"],
            documentation:
              "Client participated in relapse prevention group focused on identifying triggers, craving patterns, and coping responses. Group addressed ASAM Dimension 5 by strengthening awareness of relapse vulnerability and practical prevention strategies.",
          },
          {
            title: "Urge Surfing Practice",
            purpose:
              "Clients learn that cravings rise, peak, and fall, and practice tolerating discomfort without acting on it.",
            openingQuestion: "When you have a craving, what do you notice first in your body or thoughts?",
            teachingPoint:
              "A craving is temporary even when it feels urgent. Skills help clients create space between urge and action.",
            activity:
              "Guide a brief breathing exercise, then have clients write a 10-minute craving plan: notice, name, breathe, move, call, distract, decide.",
            processingQuestions: [
              "What makes cravings feel urgent for you?",
              "What helped you ride out discomfort in the past?",
              "What could you do for the first ten minutes of a craving?",
            ],
            worksheetIdea: "10-Minute Craving Survival Plan.",
            asam: ["Dimension 5", "Dimension 3"],
            documentation:
              "Client engaged in skill practice related to craving management and relapse prevention. Client explored strategies for delaying substance use urges and increasing coping capacity during high-risk moments.",
          },
        ],
      },
      {
        title: "Recovery Environment",
        clinicalFocus:
          "Examine how housing, peers, transportation, family conflict, and routine affect ASAM Dimension 6.",
        sessions: [
          {
            title: "People, Places, and Routines",
            purpose:
              "Clients identify environmental risks and supports, then choose one change that makes recovery easier.",
            openingQuestion: "What part of your environment helps recovery, and what part makes it harder?",
            teachingPoint:
              "Recovery is not only willpower. The environment can either lower or raise relapse risk.",
            activity:
              "Create a two-column recovery environment inventory: supports and risks. Add one action step for each risk.",
            processingQuestions: [
              "Who supports your recovery without pressuring or judging you?",
              "What place is hardest for you to avoid?",
              "What routine change would reduce risk this week?",
            ],
            worksheetIdea: "Recovery Environment Supports/Risks Inventory.",
            asam: ["Dimension 6", "Dimension 5", "Dimension 4"],
            documentation:
              "Client participated in group discussion regarding recovery environment, sober supports, and high-risk settings. Client identified environmental factors that may affect relapse risk and treatment engagement.",
          },
        ],
      },
    ],
  },
  {
    title: "CBT",
    plainLanguage:
      "Helps clients notice how thoughts, feelings, body sensations, and behaviors connect to substance use and recovery choices.",
    counselorUse:
      "Use when clients struggle with automatic thoughts, emotional reactivity, shame, avoidance, anxiety, depression, anger, or impulsive behavior.",
    topics: [
      {
        title: "Thoughts, Feelings, Behaviors",
        clinicalFocus:
          "Teach clients to slow down the chain between event, thought, feeling, urge, and behavior.",
        sessions: [
          {
            title: "CBT Chain for Substance Use",
            purpose:
              "Clients map a recent high-risk moment and identify where a different choice could be inserted.",
            openingQuestion: "What is one thought that tends to show up before you use or want to use?",
            teachingPoint:
              "Changing behavior often starts by noticing the thought or feeling that comes before the behavior.",
            activity:
              "Use a chain: situation -> thought -> feeling -> body cue -> urge -> action -> consequence -> alternate response.",
            processingQuestions: [
              "Where in the chain do you usually lose control?",
              "What thought made the urge stronger?",
              "What alternate thought would be more balanced?",
              "What action would match your recovery goal?",
            ],
            worksheetIdea: "CBT Use Chain and Alternate Response.",
            asam: ["Dimension 3", "Dimension 5"],
            documentation:
              "Client participated in CBT-based group focused on identifying connections between thoughts, emotions, urges, and substance use behaviors. Client practiced identifying alternate responses aligned with recovery goals.",
          },
        ],
      },
      {
        title: "Shame and Self-Talk",
        clinicalFocus:
          "Address shame-based thinking that can increase avoidance, relapse risk, and low motivation.",
        sessions: [
          {
            title: "From Shame Statement to Recovery Statement",
            purpose:
              "Clients practice replacing harsh self-talk with accountable, realistic recovery language.",
            openingQuestion: "What is something you say to yourself after a setback?",
            teachingPoint:
              "Accountability helps change. Shame often keeps people stuck.",
            activity:
              "Write one shame statement, one accountability statement, and one next-step statement.",
            processingQuestions: [
              "Does this thought help you take action or make you want to give up?",
              "What would accountability sound like without attacking yourself?",
              "What is the next right step after a setback?",
            ],
            worksheetIdea: "Shame, Accountability, Next Step worksheet.",
            asam: ["Dimension 3", "Dimension 4", "Dimension 5"],
            documentation:
              "Client engaged in CBT group addressing shame, self-talk, accountability, and recovery-oriented reframing. Client practiced identifying a more balanced statement to support continued engagement in treatment.",
          },
        ],
      },
    ],
  },
  {
    title: "Motivational Interviewing",
    plainLanguage:
      "Helps clients explore ambivalence, values, reasons for change, and confidence without arguing or pushing.",
    counselorUse:
      "Use when motivation is low, treatment is court or family pressured, client minimizes use, or client feels unsure about change.",
    topics: [
      {
        title: "Ambivalence",
        clinicalFocus:
          "Build insight and readiness by helping clients name both sides of change.",
        sessions: [
          {
            title: "The Good Things and Not-So-Good Things",
            purpose:
              "Clients explore what substances have done for them and what substances have cost them.",
            openingQuestion: "What do you like about using, and what do you not like about it?",
            teachingPoint:
              "Ambivalence is normal. Looking honestly at both sides can help clients choose their next step.",
            activity:
              "Decisional balance worksheet: benefits of use, costs of use, benefits of change, costs of change.",
            processingQuestions: [
              "Which box was easiest to fill in?",
              "What surprised you when you looked at both sides?",
              "If nothing changed for six months, what might happen?",
              "What would be one small change you could test?",
            ],
            worksheetIdea: "Four-box Decisional Balance.",
            asam: ["Dimension 4", "Dimension 5"],
            documentation:
              "Client participated in motivational interviewing group focused on ambivalence and personal reasons for change. Client explored perceived benefits and consequences of substance use and identified possible next steps.",
          },
        ],
      },
    ],
  },
  {
    title: "Psychoeducation",
    plainLanguage:
      "Gives clients clear information about addiction, recovery, mental health, relapse, medications, safety, and treatment expectations.",
    counselorUse:
      "Use when clients need accurate information, normalization, risk education, or help understanding treatment concepts.",
    topics: [
      {
        title: "Addiction and the Brain",
        clinicalFocus:
          "Explain craving, tolerance, withdrawal, reward pathways, and why repeated use becomes hard to stop.",
        sessions: [
          {
            title: "Why Stopping Can Feel Hard",
            purpose:
              "Clients learn how substance use affects reward, stress, memory, and decision-making systems.",
            openingQuestion: "What is one thing you wish people understood about addiction?",
            teachingPoint:
              "Addiction involves learned patterns, brain adaptation, environment, coping, and choice points. Recovery builds new patterns over time.",
            activity:
              "Have clients list one brain/body effect, one behavior effect, and one recovery action that can help.",
            processingQuestions: [
              "How does this information change the way you view relapse risk?",
              "What recovery action helps your brain and body stabilize?",
              "What support do you need when your thinking is pulled toward use?",
            ],
            worksheetIdea: "Brain, Behavior, Recovery Action worksheet.",
            asam: ["Dimension 1", "Dimension 3", "Dimension 5"],
            documentation:
              "Client participated in psychoeducation group focused on addiction, craving, brain/body adaptation, and recovery stabilization. Client demonstrated understanding by identifying recovery actions that support reduced relapse risk.",
          },
        ],
      },
    ],
  },
  {
    title: "DBT / Emotional Regulation",
    plainLanguage:
      "Helps clients manage intense emotions, distress, conflict, and urges without making the situation worse.",
    counselorUse:
      "Use when clients report anger, anxiety, impulsivity, self-sabotage, relationship conflict, or substance use to cope with emotions.",
    topics: [
      {
        title: "Distress Tolerance",
        clinicalFocus:
          "Practice short-term coping strategies for emotional spikes that can lead to use.",
        sessions: [
          {
            title: "Pause Plan for Emotional Spikes",
            purpose:
              "Clients build a short plan for surviving intense emotion without using substances.",
            openingQuestion: "What emotion is hardest for you to sit with sober?",
            teachingPoint:
              "Distress tolerance is not pretending everything is fine. It is getting through the wave without adding harm.",
            activity:
              "Create a pause plan: stop, breathe, name emotion, ground, contact support, choose next step.",
            processingQuestions: [
              "What emotion usually leads to impulsive decisions?",
              "What grounding skill could you use without anyone noticing?",
              "Who is safe to contact when emotions spike?",
            ],
            worksheetIdea: "Five-Step Pause Plan.",
            asam: ["Dimension 3", "Dimension 5"],
            documentation:
              "Client participated in emotional regulation group focused on distress tolerance and coping with high-risk emotions. Client practiced developing a pause plan to reduce impulsive substance use behaviors.",
          },
        ],
      },
    ],
  },
];

const planningLinks = [
  {
    name: "SAMHSA Evidence-Based Practices Resource Center",
    url: "https://www.samhsa.gov/resource-search/ebp",
    description: "Evidence-based treatment, recovery, and behavioral health resources.",
  },
  {
    name: "NIDA DrugFacts",
    url: "https://nida.nih.gov/research-topics/drugfacts",
    description: "Clear substance-specific education that can support psychoeducation groups.",
  },
  {
    name: "Therapist Aid",
    url: "https://www.therapistaid.com/",
    description: "Worksheets and counseling tools. Review for fit with your setting before use.",
  },
  {
    name: "SMART Recovery Tools",
    url: "https://smartrecovery.org/toolbox",
    description: "Recovery tools focused on motivation, coping, urges, and balanced thinking.",
  },
  {
    name: "VA Whole Health Library",
    url: "https://www.va.gov/WHOLEHEALTHLIBRARY/",
    description: "Wellness, coping, values, and self-management handouts useful for group ideas.",
  },
];

export default function GroupTherapyHub() {
  const [styleTitle, setStyleTitle] = useState(therapyStyles[0].title);
  const selectedStyle = useMemo(
    () => therapyStyles.find((style) => style.title === styleTitle) ?? therapyStyles[0],
    [styleTitle],
  );
  const [topicTitle, setTopicTitle] = useState(selectedStyle.topics[0].title);
  const selectedTopic =
    selectedStyle.topics.find((topic) => topic.title === topicTitle) ?? selectedStyle.topics[0];
  const [sessionTitle, setSessionTitle] = useState(selectedTopic.sessions[0].title);
  const selectedSession =
    selectedTopic.sessions.find((session) => session.title === sessionTitle) ??
    selectedTopic.sessions[0];

  function chooseStyle(value: string) {
    const nextStyle = therapyStyles.find((style) => style.title === value) ?? therapyStyles[0];
    setStyleTitle(nextStyle.title);
    setTopicTitle(nextStyle.topics[0].title);
    setSessionTitle(nextStyle.topics[0].sessions[0].title);
  }

  function chooseTopic(value: string) {
    const nextTopic =
      selectedStyle.topics.find((topic) => topic.title === value) ?? selectedStyle.topics[0];
    setTopicTitle(nextTopic.title);
    setSessionTitle(nextTopic.sessions[0].title);
  }

  return (
    <div className="grid gap-5">
      <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">Group Therapy Hub</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Group Session Planner</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-ink/72">
          Choose a therapy style, then a recovery topic, then a specific group session. Each session gives you the clinical purpose, opening question, activity, processing prompts, ASAM connection, and documentation language.
        </p>
      </header>

      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-ink">
            Therapy style
            <select value={styleTitle} onChange={(event) => chooseStyle(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm">
              {therapyStyles.map((style) => <option key={style.title}>{style.title}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-ink">
            Addiction / recovery topic
            <select value={topicTitle} onChange={(event) => chooseTopic(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm">
              {selectedStyle.topics.map((topic) => <option key={topic.title}>{topic.title}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-ink">
            Specific group session
            <select value={sessionTitle} onChange={(event) => setSessionTitle(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm">
              {selectedTopic.sessions.map((session) => <option key={session.title}>{session.title}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">{selectedStyle.title}</h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">{selectedStyle.plainLanguage}</p>
          <p className="mt-3 text-sm leading-6 text-ink/72"><strong>When to use it:</strong> {selectedStyle.counselorUse}</p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">{selectedTopic.title}</h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">{selectedTopic.clinicalFocus}</p>
        </article>
      </section>

      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <h2 className="text-2xl font-semibold text-ink">{selectedSession.title}</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {[
            ["Clinical purpose", selectedSession.purpose],
            ["Opening question", selectedSession.openingQuestion],
            ["Teaching point", selectedSession.teachingPoint],
            ["Activity", selectedSession.activity],
            ["Worksheet idea", selectedSession.worksheetIdea],
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-ink/10 bg-paper p-4">
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/72">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-ink">Processing questions</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
              {selectedSession.processingQuestions.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </article>
          <article className="rounded-lg border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-ink">ASAM dimensions covered</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSession.asam.map((dimension) => (
                <span key={dimension} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-lagoon">{dimension}</span>
              ))}
            </div>
          </article>
        </div>
        <article className="mt-4 rounded-lg border border-lagoon/20 bg-lagoon/10 p-4">
          <h3 className="font-semibold text-ink">Documentation language</h3>
          <p className="mt-2 text-sm leading-6 text-ink/75">{selectedSession.documentation}</p>
        </article>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-semibold text-ink">Helpful websites for group planning</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {planningLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="focus-ring rounded-lg border border-ink/10 bg-paper p-4 hover:border-lagoon">
              <h3 className="font-semibold text-ink">{link.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
