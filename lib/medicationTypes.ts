export type MedicationCategory =
  | "MAT Medications"
  | "Antidepressants"
  | "Mood Stabilizers"
  | "Antipsychotics"
  | "ADHD Medications"
  | "Sleep/Anxiety Medications"
  | "Benzodiazepines / Higher Caution";

export type MedicationEntry = {
  id: string;
  name: string;
  pronunciation: string;
  brandNames: string[];
  genericName: string;
  category: MedicationCategory;
  drugType: string;
  usedFor: string;
  ladcShouldKnow: string[];
  questionsToAsk: string[];
  redFlags: string[];
  commonSideEffects: string[];
  counselorConsiderations: string[];
  whenToCoordinate: string[];
  documentationExample: string;
  curiousAbout: string[];
};

type MedInput = {
  id: string;
  name: string;
  pronunciation: string;
  genericName: string;
  category: MedicationCategory;
  brandNames?: string[];
  drugType: string;
  usedFor: string;
  ladcShouldKnow?: string[];
  questionsToAsk?: string[];
  redFlags?: string[];
  commonSideEffects?: string[];
  counselorConsiderations?: string[];
  whenToCoordinate?: string[];
  documentationExample?: string;
  curiousAbout?: string[];
};

export function med(input: MedInput): MedicationEntry {
  const brandNames = input.brandNames ?? [input.name.split("(")[0]?.trim() ?? input.genericName];
  const {
    brandNames: _ignored,
    ladcShouldKnow,
    questionsToAsk,
    redFlags,
    commonSideEffects,
    counselorConsiderations,
    whenToCoordinate,
    documentationExample,
    curiousAbout,
    ...rest
  } = input;
  return {
    ...rest,
    brandNames,
    ladcShouldKnow: ladcShouldKnow ?? [
      "Document as client report — do not present as medical fact beyond what client/prescriber shared",
      "Do not advise starting, stopping, or changing dose",
      "Consider impact on cravings, mood, sleep, alertness, and treatment engagement",
    ],
    questionsToAsk: questionsToAsk ?? [
      "Who prescribes this?",
      "How long have you been taking it?",
      "Are you taking it as prescribed?",
      "Any missed doses or side effects?",
      "Any alcohol, opioids, or sedatives used with it?",
    ],
    redFlags: redFlags ?? [
      "Running out early or extra sources",
      "Severe sedation or confusion in session",
      "Stopping suddenly without prescriber",
      "Dangerous mixing with alcohol, opioids, or benzodiazepines",
    ],
    commonSideEffects: commonSideEffects ?? ["Nausea", "Headache", "Sleep changes", "Dizziness"],
    counselorConsiderations: counselorConsiderations ?? [
      "Use neutral documentation language",
      "Coordinate with prescriber when ROI exists",
    ],
    whenToCoordinate: whenToCoordinate ?? [
      "Misuse or adherence concerns",
      "Severe side effects",
      "Client wants to stop or change medication",
    ],
    documentationExample:
      documentationExample ??
      `Client reported ${input.genericName} for ${input.usedFor}. Counselor explored adherence, side effects, and impact on treatment without providing medication advice.`,
    curiousAbout: curiousAbout ?? ["Adherence", "Side effects", "Prescriber", "Sleep and alertness", "Substance mixing"],
  };
}
