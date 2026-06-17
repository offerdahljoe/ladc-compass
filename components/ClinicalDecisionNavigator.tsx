"use client";

import NavLink from "@/components/NavLink";
import { useMemo, useState } from "react";
import { buildWorkflowImportFromCdn, mergeWorkflowImport } from "@/lib/cdnWorkflowImport";
import { defaultWorkflowState, type ClientWorkflowState } from "@/lib/clientWorkflow";
import { generateDocumentationOutputs } from "@/lib/clinicalDocumentationEngine";
import { useCloudJson } from "@/lib/useCloudJson";

type DimensionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6";
type Rating = 0 | 1 | 2 | 3 | 4;

type Question = {
  id: string;
  label: string;
  options: { label: string; score: Rating }[];
};

type AsamDimension = {
  id: DimensionId;
  title: string;
  plainPurpose: string;
  raisesScore: string[];
  questions: Question[];
};

type DimensionState = {
  answers: Record<string, string>;
  userRating: Rating | "";
  rationale: string;
  notes: string;
};

type Snapshot = {
  label: string;
  age: string;
  referral: string;
  presenting: string;
  legal: string;
  setting: string;
  notes: string;
};

const substances = [
  "Alcohol",
  "Methamphetamine",
  "Amphetamine",
  "Prescription stimulants",
  "Cocaine",
  "Crack cocaine",
  "Other stimulants",
  "Heroin",
  "Fentanyl",
  "Prescription opioids",
  "Other opioids",
  "Cannabis",
  "Synthetic cannabinoids",
  "Benzodiazepines",
  "Barbiturates",
  "Sleep medications",
  "Other sedatives/hypnotics/anxiolytics",
  "LSD",
  "Psilocybin",
  "PCP",
  "Ketamine",
  "MDMA/Ecstasy",
  "Other hallucinogens",
  "Inhalants",
  "Nicotine/Tobacco",
  "Caffeine",
  "Multiple substance use",
  "Other",
];

const dsmCriteria = [
  "Larger amounts or longer period than intended",
  "Persistent desire or unsuccessful efforts to cut down",
  "Significant time spent obtaining, using, or recovering",
  "Craving or strong desire to use",
  "Recurrent use resulting in failure to fulfill obligations",
  "Continued use despite social or interpersonal problems",
  "Important activities given up or reduced",
  "Recurrent use in physically hazardous situations",
  "Continued use despite physical or psychological problems",
  "Tolerance",
  "Withdrawal",
];

const strengths = [
  "Motivated for change",
  "Stable housing",
  "Supportive family",
  "Employment",
  "Education goals",
  "Insight into addiction",
  "Prior treatment success",
  "Recovery community involvement",
  "Spiritual/cultural supports",
  "Positive coping skills",
];

const barriers = [
  "Limited coping skills",
  "Limited recovery supports",
  "Active users in environment",
  "Housing instability",
  "Transportation barriers",
  "Financial stress",
  "Legal involvement",
  "Mental health symptoms",
  "Medical concerns",
  "Employment instability",
  "Low motivation",
  "Treatment resistance",
];

const goals = [
  "Maintain sobriety",
  "Reduce use",
  "Improve relationships",
  "Address legal issues",
  "Improve mental health",
  "Build recovery supports",
  "Improve employment/education",
  "Stabilize housing",
  "Improve coping skills",
  "Medication-assisted treatment",
];

const safetyFlags = [
  "Current intoxication",
  "Significant withdrawal risk",
  "Suicidal or homicidal ideation",
  "Immediate safety concern",
  "Severe mental health instability",
  "Severe medical instability",
  "Pregnancy with substance use",
  "Active domestic violence concern",
  "Unstable housing",
  "Client refuses recommended care",
];

const dimensions: AsamDimension[] = [
  {
    id: "d1",
    title: "Dimension 1: Acute Intoxication / Withdrawal Potential",
    plainPurpose: "Looks at current intoxication, last use, withdrawal symptoms, and whether medical monitoring may be needed.",
    raisesScore: ["Current intoxication", "moderate/severe withdrawal", "history of seizures, hallucinations, or DTs", "recent detox need", "medical instability today"],
    questions: [
      { id: "lastUse", label: "When was the client's last use?", options: [
        { label: "1+ months ago", score: 0 }, { label: "1-4 weeks ago", score: 1 }, { label: "4-7 days ago", score: 1 }, { label: "2-3 days ago", score: 2 }, { label: "Within 24 hours", score: 3 }, { label: "Currently intoxicated", score: 4 },
      ] },
      { id: "withdrawal", label: "Current withdrawal symptoms?", options: [
        { label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Severe", score: 4 },
      ] },
      { id: "complications", label: "History of significant withdrawal complications?", options: [
        { label: "None", score: 0 }, { label: "Unknown", score: 1 }, { label: "Prior detox only", score: 2 }, { label: "History of seizures", score: 4 }, { label: "History of hallucinations/DTs", score: 4 }, { label: "Multiple severe withdrawal episodes", score: 4 },
      ] },
      { id: "detox", label: "Has medical detox previously been required?", options: [
        { label: "No", score: 0 }, { label: "Yes, once", score: 2 }, { label: "Yes, multiple times", score: 3 },
      ] },
      { id: "stable", label: "Does client appear medically stable today?", options: [
        { label: "Yes", score: 0 }, { label: "Minor concerns", score: 1 }, { label: "Moderate concerns", score: 2 }, { label: "Significant concerns", score: 4 },
      ] },
    ],
  },
  {
    id: "d2",
    title: "Dimension 2: Biomedical Conditions",
    plainPurpose: "Looks at medical conditions, pain, medications, health stability, and whether medical issues interfere with treatment.",
    raisesScore: ["unstable medical conditions", "recent emergency care", "poor medical follow-through", "medical barriers to participation"],
    questions: [
      { id: "medical", label: "How significant are medical conditions?", options: [
        { label: "None", score: 0 }, { label: "Mild/stable", score: 1 }, { label: "Moderate/managed", score: 2 }, { label: "Significant", score: 3 }, { label: "Severe/unstable", score: 4 },
      ] },
      { id: "daily", label: "Medical conditions interfere with daily functioning?", options: [
        { label: "Not at all", score: 0 }, { label: "Occasionally", score: 1 }, { label: "Frequently", score: 2 }, { label: "Significantly", score: 3 },
      ] },
      { id: "participation", label: "Medical conditions interfere with treatment participation?", options: [
        { label: "No", score: 0 }, { label: "Mildly", score: 1 }, { label: "Moderately", score: 2 }, { label: "Significantly", score: 3 },
      ] },
      { id: "management", label: "Is client actively managing health conditions?", options: [
        { label: "Yes", score: 0 }, { label: "Mostly", score: 1 }, { label: "Inconsistently", score: 2 }, { label: "No", score: 3 },
      ] },
      { id: "hospital", label: "Recent hospitalization or emergency care?", options: [
        { label: "Never", score: 0 }, { label: "Over 1 year ago", score: 1 }, { label: "Within last year", score: 2 }, { label: "Within last 6 months", score: 3 }, { label: "Within last month", score: 4 },
      ] },
    ],
  },
  {
    id: "d3",
    title: "Dimension 3: Emotional / Behavioral / Cognitive Conditions",
    plainPurpose: "Looks at mental health symptoms, trauma, safety risk, cognition, emotional regulation, and co-occurring needs.",
    raisesScore: ["safety risk", "severe symptoms", "symptoms interfering with functioning", "substance use tied strongly to mental health", "no treatment support"],
    questions: [
      { id: "symptoms", label: "Current mental health symptom severity?", options: [
        { label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Significant", score: 3 }, { label: "Severe", score: 4 },
      ] },
      { id: "functioning", label: "Symptoms interfere with daily functioning?", options: [
        { label: "No", score: 0 }, { label: "Mildly", score: 1 }, { label: "Moderately", score: 2 }, { label: "Significantly", score: 3 },
      ] },
      { id: "treatment", label: "Engaged in mental health treatment?", options: [
        { label: "Yes", score: 0 }, { label: "Partially", score: 1 }, { label: "No", score: 2 }, { label: "Needs referral", score: 2 },
      ] },
      { id: "safety", label: "Current safety risk?", options: [
        { label: "None", score: 0 }, { label: "Mild concern", score: 1 }, { label: "Moderate concern", score: 2 }, { label: "Significant concern", score: 3 }, { label: "Immediate concern", score: 4 },
      ] },
      { id: "contribution", label: "Mental health contribution to substance use?", options: [
        { label: "Not at all", score: 0 }, { label: "Slightly", score: 1 }, { label: "Moderately", score: 2 }, { label: "Significantly", score: 3 },
      ] },
    ],
  },
  {
    id: "d4",
    title: "Dimension 4: Readiness to Change",
    plainPurpose: "Looks at motivation, insight, ambivalence, engagement, confidence, and internal versus external reasons for treatment.",
    raisesScore: ["external pressure only", "limited insight", "resistance", "low confidence", "unlikely to follow recommendations"],
    questions: [
      { id: "reason", label: "Why is client participating?", options: [
        { label: "Entirely self-motivated", score: 0 }, { label: "Mostly self-motivated", score: 1 }, { label: "Mixed internal/external motivation", score: 2 }, { label: "Mostly external pressure", score: 3 }, { label: "Entirely external pressure", score: 4 },
      ] },
      { id: "insight", label: "Insight into substance use problem?", options: [
        { label: "Excellent", score: 0 }, { label: "Good", score: 1 }, { label: "Moderate", score: 2 }, { label: "Limited", score: 3 }, { label: "None", score: 4 },
      ] },
      { id: "willingness", label: "Willingness to participate?", options: [
        { label: "Very willing", score: 0 }, { label: "Willing", score: 1 }, { label: "Ambivalent", score: 2 }, { label: "Resistant", score: 3 }, { label: "Refusing", score: 4 },
      ] },
      { id: "confidence", label: "Confidence in ability to change?", options: [
        { label: "Very confident", score: 0 }, { label: "Moderately confident", score: 1 }, { label: "Unsure", score: 2 }, { label: "Low confidence", score: 3 }, { label: "No confidence", score: 4 },
      ] },
      { id: "follow", label: "Likelihood of following recommendations?", options: [
        { label: "Very likely", score: 0 }, { label: "Likely", score: 1 }, { label: "Unsure", score: 2 }, { label: "Unlikely", score: 3 }, { label: "Very unlikely", score: 4 },
      ] },
    ],
  },
  {
    id: "d5",
    title: "Dimension 5: Relapse / Continued Use Potential",
    plainPurpose: "Looks at craving, relapse history, coping skills, triggers, prior attempts to stop, and likelihood of continued use without structure.",
    raisesScore: ["multiple unsuccessful quit attempts", "high stress vulnerability", "limited coping", "poor trigger awareness", "no relapse plan"],
    questions: [
      { id: "quit", label: "Prior attempts to quit?", options: [
        { label: "None", score: 0 }, { label: "1 attempt", score: 1 }, { label: "2-3 attempts", score: 2 }, { label: "4+ attempts", score: 3 },
      ] },
      { id: "stress", label: "Vulnerability to use during stress?", options: [
        { label: "Very low", score: 0 }, { label: "Low", score: 1 }, { label: "Moderate", score: 2 }, { label: "High", score: 3 }, { label: "Very high", score: 4 },
      ] },
      { id: "coping", label: "Coping skills?", options: [
        { label: "Strong", score: 0 }, { label: "Adequate", score: 1 }, { label: "Limited", score: 2 }, { label: "Minimal", score: 3 }, { label: "None", score: 4 },
      ] },
      { id: "triggers", label: "Trigger awareness?", options: [
        { label: "Excellent", score: 0 }, { label: "Good", score: 1 }, { label: "Moderate", score: 2 }, { label: "Limited", score: 3 }, { label: "None", score: 4 },
      ] },
      { id: "plan", label: "Relapse prevention plan?", options: [
        { label: "Well established", score: 0 }, { label: "Somewhat established", score: 1 }, { label: "Minimal", score: 3 }, { label: "None", score: 4 },
      ] },
    ],
  },
  {
    id: "d6",
    title: "Dimension 6: Recovery Environment",
    plainPurpose: "Looks at housing, supports, peers, family, transportation, financial barriers, legal environment, and safety.",
    raisesScore: ["active substance use in environment", "homelessness", "no recovery supports", "significant practical barriers", "harmful relationships"],
    questions: [
      { id: "living", label: "Living environment?", options: [
        { label: "Stable and supportive", score: 0 }, { label: "Stable with minor concerns", score: 1 }, { label: "Stable but unsupportive", score: 2 }, { label: "Active substance use present", score: 3 }, { label: "Unstable/homeless", score: 4 },
      ] },
      { id: "support", label: "Recovery support network?", options: [
        { label: "Very strong", score: 0 }, { label: "Strong", score: 1 }, { label: "Moderate", score: 2 }, { label: "Limited", score: 3 }, { label: "None", score: 4 },
      ] },
      { id: "barriers", label: "Financial/employment/transportation barriers?", options: [
        { label: "None", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Significant", score: 3 },
      ] },
      { id: "stress", label: "Environmental stress?", options: [
        { label: "Minimal", score: 0 }, { label: "Mild", score: 1 }, { label: "Moderate", score: 2 }, { label: "Significant", score: 3 }, { label: "Severe", score: 4 },
      ] },
      { id: "relationships", label: "Important relationships?", options: [
        { label: "Very supportive", score: 0 }, { label: "Supportive", score: 1 }, { label: "Mixed", score: 2 }, { label: "Unsupportive", score: 3 }, { label: "Harmful to recovery", score: 4 },
      ] },
    ],
  },
];

function emptyDimensions(): Record<DimensionId, DimensionState> {
  return dimensions.reduce((acc, dimension) => {
    acc[dimension.id] = { answers: {}, userRating: "", rationale: "", notes: "" };
    return acc;
  }, {} as Record<DimensionId, DimensionState>);
}

function toggleItem(items: string[], item: string) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}

function severity(count: number) {
  if (count < 2) return "criteria not met / no SUD severity generated";
  if (count <= 3) return "mild";
  if (count <= 5) return "moderate";
  return "severe";
}

function ratingLabel(rating: Rating | "") {
  if (rating === "") return "Incomplete";
  return `${rating} - ${["No issue / very low risk", "Mild difficulty", "Moderate difficulty", "Significant difficulty", "Severe / imminent danger"][rating]}`;
}

function getSuggestedRating(dimension: AsamDimension, state: DimensionState): Rating | "" {
  const scores = dimension.questions
    .map((question) => question.options.find((option) => option.label === state.answers[question.id])?.score)
    .filter((score): score is Rating => score !== undefined);
  if (scores.length === 0) return "";
  return Math.max(...scores) as Rating;
}

function confidence(dimension: AsamDimension, state: DimensionState, rating: Rating | "") {
  const answered = dimension.questions.filter((question) => state.answers[question.id]).length;
  if (answered === 0) return "Missing";
  if (rating !== "" && rating >= 2 && !state.rationale.trim()) return "Low";
  if (answered < dimension.questions.length) return "Medium";
  return "High";
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      className="focus-ring rounded-md border border-lagoon/20 px-3 py-1.5 text-xs font-semibold text-lagoon hover:bg-lagoon hover:text-white"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

function CheckGrid({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {options.map((option) => (
        <label key={option} className="flex items-start gap-2 rounded-md bg-paper px-3 py-2 text-sm text-ink/75">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(toggleItem(selected, option))}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function OutputCard({
  title,
  text,
  children,
  tone = "default",
}: {
  title: string;
  text?: string;
  children?: React.ReactNode;
  tone?: "default" | "warning" | "danger";
}) {
  const toneClass =
    tone === "danger"
      ? "border-clay/30 bg-clay/10"
      : tone === "warning"
        ? "border-marigold/40 bg-marigold/10"
        : "border-ink/10 bg-white";
  return (
    <section className={`rounded-lg border p-4 shadow-soft ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {text ? <CopyButton text={text} /> : null}
      </div>
      {text ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink/75">{text}</p> : null}
      {children}
    </section>
  );
}

export default function ClinicalDecisionNavigator() {
  const [mode, setMode] = useState("Beginner / Intern Mode");
  const [importMessage, setImportMessage] = useState("");
  const { value: workflowState, setValue: setWorkflowState } = useCloudJson<ClientWorkflowState>(
    "ladc-client-workflow-state",
    "ladc-workflow-progress",
    defaultWorkflowState,
  );
  const [snapshot, setSnapshot] = useState<Snapshot>({
    label: "",
    age: "",
    referral: "",
    presenting: "",
    legal: "",
    setting: "",
    notes: "",
  });
  const [primarySubstance, setPrimarySubstance] = useState("Alcohol");
  const [secondarySubstance, setSecondarySubstance] = useState("");
  const [tertiarySubstance, setTertiarySubstance] = useState("");
  const [otherSubstance, setOtherSubstance] = useState("");
  const [criteria, setCriteria] = useState<string[]>([]);
  const [dimensionState, setDimensionState] = useState(emptyDimensions);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedSafetyFlags, setSelectedSafetyFlags] = useState<string[]>([]);

  const substance = primarySubstance === "Other" ? otherSubstance || "other substance" : primarySubstance;
  const dsmCount = criteria.length;
  const dsmSeverity = severity(dsmCount);
  const dimensionOutputs = useMemo(
    () =>
      dimensions.map((dimension) => {
        const state = dimensionState[dimension.id];
        const suggested = getSuggestedRating(dimension, state);
        const finalRating = state.userRating === "" ? suggested : state.userRating;
        return {
          dimension,
          state,
          suggested,
          finalRating,
          confidence: confidence(dimension, state, finalRating),
        };
      }),
    [dimensionState],
  );

  const elevated = dimensionOutputs.filter((item) => item.finalRating !== "" && item.finalRating >= 2);
  const highRisk = dimensionOutputs.filter((item) => item.finalRating !== "" && item.finalRating >= 3);
  const maxRating = dimensionOutputs.reduce<Rating | "">((max, item) => {
    if (item.finalRating === "") return max;
    if (max === "") return item.finalRating;
    return item.finalRating > max ? item.finalRating : max;
  }, "");

  const treatmentPriorities = [
    ...(dimensionOutputs.find((item) => item.dimension.id === "d1")?.finalRating || 0) >= 2 ? ["Withdrawal monitoring / medical safety review"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d3")?.finalRating || 0) >= 2 ? ["Mental health symptom management and safety monitoring"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d4")?.finalRating || 0) >= 2 ? ["Motivation enhancement and engagement using MI"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d5")?.finalRating || 0) >= 2 ? ["Relapse prevention and coping skill development"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d6")?.finalRating || 0) >= 2 ? ["Recovery environment stabilization and support development"] : [],
    ...selectedBarriers.includes("Transportation barriers") || selectedBarriers.includes("Housing instability") || selectedBarriers.includes("Financial stress") ? ["Case management and practical barrier reduction"] : [],
    ...selectedGoals.slice(0, 3).map((goal) => `Client goal support: ${goal}`),
  ].filter((item, index, all) => all.indexOf(item) === index);

  const documentation = useMemo(
    () =>
      generateDocumentationOutputs({
        snapshot,
        substance,
        dsmCount,
        dsmSeverity,
        dimensionSummaries: dimensionOutputs.map(({ dimension, state, finalRating }) => ({
          id: dimension.id,
          title: dimension.title,
          rating: finalRating,
          rationale: state.rationale,
        })),
        selectedStrengths,
        selectedBarriers,
        selectedGoals,
        selectedSafetyFlags,
        elevatedDimensionIds: elevated.map((item) => item.dimension.id),
        highRiskDimensionIds: highRisk.map((item) => item.dimension.id),
        maxRating,
      }),
    [
      dimensionOutputs,
      dsmCount,
      dsmSeverity,
      elevated,
      highRisk,
      maxRating,
      selectedBarriers,
      selectedGoals,
      selectedSafetyFlags,
      selectedStrengths,
      snapshot,
      substance,
    ],
  );

  const dsmSummary = documentation.diagnosticSupport;
  const asamNarrative = documentation.asamSummary;
  const treatmentPlanText = documentation.treatmentPlanSuggestions;
  const clinicalSummary = documentation.clinicalSummary;
  const levelOfCare = documentation.levelOfCareRationale;

  const referrals = [
    ...(dimensionOutputs.find((item) => item.dimension.id === "d1")?.finalRating || 0) >= 3 ? ["Detox / medical withdrawal monitoring"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d2")?.finalRating || 0) >= 2 ? ["Primary care or medical follow-up"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d3")?.finalRating || 0) >= 2 ? ["Mental health therapy", "Psychiatry / medication provider if indicated"] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d6")?.finalRating || 0) >= 2 ? ["Housing/resource support", "Peer recovery support"] : [],
    ...selectedBarriers.includes("Transportation barriers") ? ["Transportation support"] : [],
    ...selectedBarriers.includes("Legal involvement") ? ["Probation/legal coordination with valid ROI"] : [],
    ...selectedGoals.includes("Medication-assisted treatment") ? ["MAT provider"] : [],
    ...selectedSafetyFlags.includes("Active domestic violence concern") ? ["Domestic violence services"] : [],
    ...selectedSafetyFlags.some((flag) => flag.includes("safety") || flag.includes("Suicidal")) ? ["Crisis services / safety protocol"] : [],
  ].filter((item, index, all) => all.indexOf(item) === index);

  const warnings = [
    ...(dimensionOutputs.find((item) => item.dimension.id === "d1")?.finalRating || 0) >= 3 ? ["Dimension 1 is elevated. Consider detox/withdrawal monitoring and supervisor or medical review."] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d3")?.finalRating || 0) >= 3 || selectedSafetyFlags.some((flag) => flag.includes("Suicidal") || flag.includes("safety")) ? ["Dimension 3 or safety risk is elevated. Follow safety protocol and consult supervisor immediately."] : [],
    ...highRisk.length > 0 ? ["Any ASAM dimension rated 3 or 4 should be reviewed with supervisor."] : [],
    ...(dsmSeverity === "severe" ? ["Severe DSM criteria count does not automatically determine level of care. ASAM multidimensional risk still drives placement thinking."] : []),
    ...(dimensionOutputs.find((item) => item.dimension.id === "d5")?.finalRating || 0) >= 2 ? ["Dimension 5 is elevated. Relapse prevention should be a treatment priority."] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d6")?.finalRating || 0) >= 2 ? ["Dimension 6 is elevated. Recovery environment and discharge/transition planning should be addressed."] : [],
    ...(dimensionOutputs.find((item) => item.dimension.id === "d4")?.finalRating || 0) >= 2 ? ["Readiness concerns are present. Consider motivational interviewing and engagement-focused interventions."] : [],
  ];

  const missingInfo = [
    ...(criteria.length === 0 ? ["DSM-5 criteria have not been selected."] : []),
    ...dimensionOutputs.flatMap((item) => item.finalRating === "" ? [`${item.dimension.title} is unanswered.`] : []),
    ...dimensionOutputs.flatMap((item) => item.finalRating !== "" && item.finalRating >= 2 && !item.state.rationale.trim() ? [`${item.dimension.title} is elevated but needs rationale.`] : []),
    ...(selectedStrengths.length === 0 ? ["No client strengths entered."] : []),
    ...(selectedBarriers.length === 0 ? ["No barriers entered."] : []),
    ...(selectedGoals.length === 0 ? ["No client goals/preferences entered."] : []),
  ];

  const copyAll = [
    "Clinical Summary",
    clinicalSummary,
    "ASAM Summary",
    asamNarrative,
    "Diagnostic Support",
    dsmSummary,
    "Medical Necessity",
    documentation.medicalNecessity,
    "Treatment Recommendations",
    documentation.treatmentRecommendations,
    "Level of Care Rationale",
    levelOfCare,
    "Treatment Plan Suggestions",
    treatmentPlanText,
    "Strengths and Barriers",
    documentation.strengthsBarriers,
    "Supervisor Flags",
    documentation.supervisorFlags,
    "Client Workflow Unlocks",
    documentation.workflowUnlocks,
  ].join("\n\n");

  function updateDimension(id: DimensionId, update: Partial<DimensionState>) {
    setDimensionState((current) => ({
      ...current,
      [id]: { ...current[id], ...update },
    }));
  }

  function loadSample() {
    setSnapshot({
      label: "Sample A",
      age: "32",
      referral: "Probation referral",
      presenting: "Stimulant use concerns with legal and relationship consequences",
      legal: "Current probation involvement",
      setting: "Outpatient assessment",
      notes: "Training example only; no real client information.",
    });
    setPrimarySubstance("Methamphetamine");
    setCriteria(dsmCriteria.slice(0, 7));
    setSelectedStrengths(["Motivated for change", "Insight into addiction", "Employment"]);
    setSelectedBarriers(["Limited coping skills", "Legal involvement", "Mental health symptoms", "Active users in environment"]);
    setSelectedGoals(["Maintain sobriety", "Address legal issues", "Improve coping skills", "Build recovery supports"]);
    setSelectedSafetyFlags([]);
    setDimensionState({
      ...emptyDimensions(),
      d3: { answers: { symptoms: "Moderate", functioning: "Moderately", treatment: "Needs referral", safety: "None", contribution: "Moderately" }, userRating: 2, rationale: "Anxiety symptoms appear to increase relapse vulnerability and coping needs.", notes: "" },
      d4: { answers: { reason: "Mixed internal/external motivation", insight: "Moderate", willingness: "Ambivalent", confidence: "Unsure", follow: "Unsure" }, userRating: 2, rationale: "Client shows mixed motivation with probation pressure and some personal concern.", notes: "" },
      d5: { answers: { quit: "2-3 attempts", stress: "High", coping: "Limited", triggers: "Limited", plan: "Minimal" }, userRating: 3, rationale: "Relapse vulnerability appears elevated due to limited coping, triggers, and prior attempts.", notes: "" },
      d6: { answers: { living: "Active substance use present", support: "Limited", barriers: "Moderate", stress: "Significant", relationships: "Mixed" }, userRating: 3, rationale: "Recovery environment includes active-use exposure and limited sober support.", notes: "" },
    });
  }

  function importToClientWorkflow() {
    const patch = buildWorkflowImportFromCdn({
      snapshot,
      substance,
      dsmCount,
      dsmSeverity,
      dimensionSummaries: dimensionOutputs.map(({ dimension, state, finalRating }) => ({
        id: dimension.id,
        title: dimension.title,
        rating: finalRating,
        rationale: state.rationale,
      })),
      selectedStrengths,
      selectedBarriers,
      selectedGoals,
      selectedSafetyFlags,
      elevatedDimensionIds: elevated.map((item) => item.dimension.id),
      highRiskDimensionIds: highRisk.map((item) => item.dimension.id),
      maxRating,
    });
    setWorkflowState(mergeWorkflowImport(workflowState, patch));
    setImportMessage(`Imported ${patch.flags?.length ?? 0} workflow flags and assessment checkboxes. Open Client Workflow to review.`);
  }

  function resetAll() {
    setSnapshot({ label: "", age: "", referral: "", presenting: "", legal: "", setting: "", notes: "" });
    setPrimarySubstance("Alcohol");
    setSecondarySubstance("");
    setTertiarySubstance("");
    setOtherSubstance("");
    setCriteria([]);
    setDimensionState(emptyDimensions());
    setSelectedStrengths([]);
    setSelectedBarriers([]);
    setSelectedGoals([]);
    setSelectedSafetyFlags([]);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="grid gap-4">
        <div className="rounded-lg border border-lagoon/20 bg-white p-3 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-lagoon">Clinical Decision Navigator</p>
              <p className="text-xs text-ink/60">Initials only · supervisor and agency policy override this tool</p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <label className="text-xs font-semibold text-ink">
                Mode
                <select value={mode} onChange={(event) => setMode(event.target.value)} className="focus-ring ml-1 rounded-md border border-ink/15 px-2 py-1 text-xs">
                  <option>Beginner / Intern Mode</option>
                  <option>Concise Clinician Mode</option>
                  <option>Procentive Wording Mode</option>
                  <option>Supervisor Review Mode</option>
                </select>
              </label>
              <button onClick={loadSample} className="focus-ring rounded-md border border-ink/10 px-2 py-1 text-xs font-semibold hover:bg-paper">Sample</button>
              <CopyButton text={copyAll} label="Copy all" />
              <button onClick={resetAll} className="focus-ring rounded-md border border-clay/30 px-2 py-1 text-xs font-semibold text-clay hover:bg-clay hover:text-white">Clear</button>
            </div>
          </div>
        </div>

        <details open className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <summary className="cursor-pointer text-lg font-semibold text-ink">1. Client Snapshot</summary>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {([
              ["label", "Client initials / learning label"],
              ["age", "Age"],
              ["referral", "Referral source"],
              ["presenting", "Presenting concern"],
              ["legal", "Legal involvement"],
              ["setting", "Current treatment setting"],
            ] as const).map(([key, label]) => (
              <label key={key} className="text-sm font-semibold text-ink">
                {label}
                <input value={snapshot[key]} onChange={(event) => setSnapshot((current) => ({ ...current, [key]: event.target.value }))} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
            ))}
          </div>
          <label className="mt-3 block text-sm font-semibold text-ink">
            Additional notes
            <textarea value={snapshot.notes} onChange={(event) => setSnapshot((current) => ({ ...current, notes: event.target.value }))} className="focus-ring mt-1 min-h-20 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
          </label>
        </details>

        <details open className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <summary className="cursor-pointer text-lg font-semibold text-ink">2. DSM-5 Criteria Builder</summary>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="text-sm font-semibold text-ink">
              Primary substance
              <select value={primarySubstance} onChange={(event) => setPrimarySubstance(event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                {substances.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-ink">
              Secondary substance(s)
              <input value={secondarySubstance} onChange={(event) => setSecondarySubstance(event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
            </label>
            <label className="text-sm font-semibold text-ink">
              Tertiary substance(s)
              <input value={tertiarySubstance} onChange={(event) => setTertiarySubstance(event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
            </label>
          </div>
          {primarySubstance === "Other" ? (
            <label className="mt-3 block text-sm font-semibold text-ink">
              Other substance
              <input value={otherSubstance} onChange={(event) => setOtherSubstance(event.target.value)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
            </label>
          ) : null}
          <div className="mt-4">
            <CheckGrid options={dsmCriteria} selected={criteria} onChange={setCriteria} />
          </div>
        </details>

        <details open className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <summary className="cursor-pointer text-lg font-semibold text-ink">3. ASAM Determination Assistant</summary>
          <div className="mt-4 grid gap-4">
            {dimensions.map((dimension) => {
              const state = dimensionState[dimension.id];
              const suggested = getSuggestedRating(dimension, state);
              return (
                <details key={dimension.id} className="rounded-lg border border-ink/10 bg-paper p-4">
                  <summary className="cursor-pointer font-semibold text-ink">{dimension.title}</summary>
                  <p className="mt-3 text-sm leading-6 text-ink/70">{dimension.plainPurpose}</p>
                  <div className="mt-3 rounded-md bg-white p-3 text-sm text-ink/70">
                    <strong>What raises this score:</strong> {dimension.raisesScore.join(", ")}.
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {dimension.questions.map((question) => (
                      <label key={question.id} className="text-sm font-semibold text-ink">
                        {question.label}
                        <select
                          value={state.answers[question.id] ?? ""}
                          onChange={(event) => updateDimension(dimension.id, { answers: { ...state.answers, [question.id]: event.target.value } })}
                          className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
                        >
                          <option value="">Choose one</option>
                          {question.options.map((option) => <option key={option.label}>{option.label}</option>)}
                        </select>
                      </label>
                    ))}
                    <label className="text-sm font-semibold text-ink">
                      Suggested rating
                      <input readOnly value={ratingLabel(suggested)} className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink/65" />
                    </label>
                    <label className="text-sm font-semibold text-ink">
                      Counselor rating
                      <select value={state.userRating} onChange={(event) => updateDimension(dimension.id, { userRating: event.target.value === "" ? "" : Number(event.target.value) as Rating })} className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm">
                        <option value="">Use suggested / incomplete</option>
                        {[0, 1, 2, 3, 4].map((rating) => <option key={rating} value={rating}>{ratingLabel(rating as Rating)}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="mt-3 block text-sm font-semibold text-ink">
                    Clinical rationale
                    <textarea value={state.rationale} onChange={(event) => updateDimension(dimension.id, { rationale: event.target.value })} className="focus-ring mt-1 min-h-20 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm" />
                  </label>
                  <label className="mt-3 block text-sm font-semibold text-ink">
                    Optional notes
                    <textarea value={state.notes} onChange={(event) => updateDimension(dimension.id, { notes: event.target.value })} className="focus-ring mt-1 min-h-16 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm" />
                  </label>
                </details>
              );
            })}
          </div>
        </details>

        <details className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <summary className="cursor-pointer text-lg font-semibold text-ink">4. Strengths, Barriers, Goals, Safety Flags</summary>
          <div className="mt-4 grid gap-5">
            <section>
              <h2 className="font-semibold text-ink">Client strengths</h2>
              <div className="mt-3"><CheckGrid options={strengths} selected={selectedStrengths} onChange={setSelectedStrengths} /></div>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Client barriers</h2>
              <div className="mt-3"><CheckGrid options={barriers} selected={selectedBarriers} onChange={setSelectedBarriers} /></div>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Client goals / preferences</h2>
              <div className="mt-3"><CheckGrid options={goals} selected={selectedGoals} onChange={setSelectedGoals} /></div>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Safety / supervisor review flags</h2>
              <div className="mt-3"><CheckGrid options={safetyFlags} selected={selectedSafetyFlags} onChange={setSelectedSafetyFlags} /></div>
            </section>
          </div>
        </details>
      </section>

      <aside className="grid content-start gap-4 xl:sticky xl:top-28 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
        <OutputCard title="Critical Thinking Warnings" tone={warnings.some((warning) => warning.includes("immediately")) ? "danger" : warnings.length ? "warning" : "default"}>
          {warnings.length ? (
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
              {warnings.map((warning) => <li key={warning} className="rounded-md bg-white/75 px-3 py-2">{warning}</li>)}
            </ul>
          ) : <p className="mt-3 text-sm text-ink/65">No elevated warning generated yet.</p>}
        </OutputCard>

        <OutputCard title="DSM-5 Diagnostic Summary" text={dsmSummary}>
          <details className="mt-3 text-sm text-ink/70">
            <summary className="cursor-pointer font-semibold">Why?</summary>
            <p className="mt-2">This is based on {dsmCount} selected criteria for {substance}. Severity is a criteria-count support, not a final diagnosis.</p>
          </details>
        </OutputCard>

        <OutputCard title="ASAM Summary Dashboard">
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-ink/60">
                <tr><th className="py-2">Dim</th><th>Rating</th><th>Conf.</th><th>Need?</th></tr>
              </thead>
              <tbody>
                {dimensionOutputs.map((item) => (
                  <tr key={item.dimension.id} className="border-t border-ink/10">
                    <td className="py-2 font-semibold">{item.dimension.title.slice(0, 11)}</td>
                    <td>{item.finalRating === "" ? "-" : item.finalRating}</td>
                    <td>{item.confidence}</td>
                    <td>{item.finalRating !== "" && item.finalRating >= 2 && !item.state.rationale.trim() ? "Rationale" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OutputCard>

        <OutputCard title="ASAM Narrative Summaries" text={asamNarrative} />

        <OutputCard title="Treatment Priorities">
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
            {(treatmentPriorities.length ? treatmentPriorities : ["Complete assessment sections to generate priorities."]).map((priority) => <li key={priority} className="rounded-md bg-paper px-3 py-2">{priority}</li>)}
          </ol>
          <details className="mt-3 text-sm text-ink/70">
            <summary className="cursor-pointer font-semibold">Why?</summary>
            <p className="mt-2">Priorities are based on elevated ASAM dimensions, DSM severity support, selected barriers, and client goals.</p>
          </details>
        </OutputCard>

        <OutputCard title="Level of Care Consideration" text={`${levelOfCare}. Final determination should be reviewed with supervisor, ASAM criteria, agency policy, and payer/program requirements.`} />

        <OutputCard title="Initial Treatment Plan Suggestions" text={treatmentPlanText} />

        <OutputCard title="Referral Recommendations">
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
            {(referrals.length ? referrals : ["No specific referral generated yet. Continue assessment and review barriers."]).map((referral) => <li key={referral} className="rounded-md bg-paper px-3 py-2">{referral}</li>)}
          </ul>
        </OutputCard>

        <OutputCard title="Clinical Summary Paragraph" text={clinicalSummary} />

        <OutputCard title="Medical Necessity Statement" text={documentation.medicalNecessity} />

        <OutputCard title="Treatment Recommendations" text={documentation.treatmentRecommendations} />

        <OutputCard title="Strengths and Barriers Summary" text={documentation.strengthsBarriers} />

        <OutputCard title="What This Unlocks in Client Workflow" text={documentation.workflowUnlocks} />

        <section className="rounded-lg border border-lagoon/25 bg-lagoon/5 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-ink">One-click import to Client Workflow</h2>
          <p className="mt-1 text-xs text-ink/65">Sets assessment flags, ROI placeholders, and completed CDN tasks in your cloud-synced workflow.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={importToClientWorkflow} className="focus-ring rounded-md bg-lagoon px-3 py-2 text-xs font-semibold text-white hover:bg-ink">
              Import to Client Workflow
            </button>
            <NavLink href="/client-workflow/workflow" className="focus-ring rounded-md border border-lagoon/30 px-3 py-2 text-xs font-semibold text-lagoon hover:bg-white">
              Open Client Workflow
            </NavLink>
          </div>
          {importMessage ? <p className="mt-2 text-xs text-lagoon">{importMessage}</p> : null}
        </section>

        <OutputCard title="Supervisor Review Flags" tone={highRisk.length || selectedSafetyFlags.length ? "warning" : "default"} text={documentation.supervisorFlags} />

        <OutputCard title="Missing Information Detector" tone={missingInfo.length ? "warning" : "default"}>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/75">
            {(missingInfo.length ? missingInfo : ["No major missing-information flags based on current entries."]).map((item) => <li key={item} className="rounded-md bg-paper px-3 py-2">{item}</li>)}
          </ul>
        </OutputCard>
      </aside>
    </div>
  );
}
