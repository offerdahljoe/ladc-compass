export const navItems = [
  { href: "/assistant", label: "Clinical Documentation Assistant", short: "AI Coach" },
  { href: "/documentation-uploads", label: "Documentation Uploads", short: "Uploads" },
  { href: "/chatgpt", label: "ChatGPT", short: "ChatGPT" },
  { href: "/comprehensive-assessment", label: "Comprehensive Assessment", short: "Assessment" },
  { href: "/", label: "Home Dashboard", short: "Home" },
  { href: "/core-functions", label: "12 Core Functions", short: "Core Functions" },
  { href: "/asam", label: "ASAM Dimensions", short: "ASAM" },
  { href: "/documentation", label: "Documentation Center", short: "Docs" },
  { href: "/treatment-plan-lab", label: "Treatment Plan Lab", short: "Plan Lab" },
  { href: "/group-planner", label: "Group Planner", short: "Groups" },
  { href: "/internship-tracker", label: "Internship Tracker", short: "Hours" },
  { href: "/supervision-notebook", label: "Supervision Notebook", short: "Supervision" },
  { href: "/resources", label: "Resource Library", short: "Resources" },
];

export const coreFunctions = [
  "Screening",
  "Intake",
  "Orientation",
  "Assessment",
  "Treatment Planning",
  "Counseling",
  "Case Management",
  "Crisis Intervention",
  "Client Education",
  "Referral",
  "Reports and Record Keeping",
  "Consultation",
].map((name) => ({
  name,
  purpose:
    name === "Crisis Intervention"
      ? "Respond to immediate safety or stabilization needs within role and agency policy."
      : `Support clear, ethical ${name.toLowerCase()} work within the substance use counseling process.`,
  counselor:
    "Gathers relevant information, uses supervision, stays within scope, and connects the task to the person's stage of care.",
  paperwork:
    "May include agency forms, progress notes, releases, assessments, treatment plan updates, referrals, or supervision notes.",
  example:
    "Intern practiced this function using de-identified information, documented observable behavior, and identified next clinical steps for supervision.",
  mistakes:
    "Using vague language, skipping risk factors, writing beyond scope, missing follow-up tasks, or including identifying information in learning notes.",
  internship:
    "Log the activity, note the core function, reflect on learning, and bring questions to supervision.",
}));

export const asamDimensions = [
  {
    title: "1. Acute Intoxication / Withdrawal",
    assess: "Current use, last use, withdrawal history, detox needs, medication needs, and immediate safety.",
    questions: "When was last use? Any withdrawal symptoms? Any history of seizures, delirium, or medical detox?",
    wording: "Dimension 1 risk appears moderate based on reported withdrawal symptoms and need for medical monitoring.",
  },
  {
    title: "2. Biomedical Conditions",
    assess: "Medical conditions, pain, medications, pregnancy, sleep, nutrition, and access to health care.",
    questions: "Are medical concerns affecting recovery? Are medications taken as prescribed? Any urgent symptoms?",
    wording: "Dimension 2 risk appears low with stable reported health and no acute biomedical barriers identified.",
  },
  {
    title: "3. Emotional / Behavioral / Cognitive",
    assess: "Mental health symptoms, trauma, cognition, safety, coping skills, and need for coordinated care.",
    questions: "Any thoughts of self-harm? What symptoms are hardest to manage? What helps you cope safely?",
    wording: "Dimension 3 risk appears elevated due to mood symptoms affecting recovery engagement.",
  },
  {
    title: "4. Readiness to Change",
    assess: "Motivation, insight, ambivalence, treatment engagement, goals, and barriers to participation.",
    questions: "What feels important about change right now? What feels difficult? What would make treatment useful?",
    wording: "Dimension 4 indicates ambivalence; motivational interviewing interventions are recommended.",
  },
  {
    title: "5. Relapse / Continued Use Potential",
    assess: "Cravings, triggers, recurrence history, coping plan, recovery skills, and recent patterns.",
    questions: "What situations increase risk? What warning signs show up first? What recovery supports are active?",
    wording: "Dimension 5 risk appears high due to frequent cravings and limited relapse prevention planning.",
  },
  {
    title: "6. Recovery Environment",
    assess: "Housing, relationships, transportation, work, legal concerns, sober supports, and environmental stressors.",
    questions: "Who supports recovery? Are there substances in the home? What practical barriers affect attendance?",
    wording: "Dimension 6 suggests environmental stressors that may require case management and support planning.",
  },
];

export const documentationTemplates = [
  {
    title: "DAP Note",
    sections: ["Data: observable facts and client statements", "Assessment: clinical impression tied to goals", "Plan: next steps, referrals, homework, or follow-up"],
  },
  {
    title: "SOAP Note",
    sections: ["Subjective: reported experience", "Objective: observed information", "Assessment: counselor interpretation", "Plan: next steps"],
  },
  {
    title: "Group Note",
    sections: ["Topic and purpose", "Participation level", "Skills discussed", "Response to group", "Plan or assignment"],
  },
  {
    title: "Individual Note",
    sections: ["Session focus", "Progress toward goals", "Interventions used", "Client response", "Plan"],
  },
  {
    title: "Case Management Note",
    sections: ["Need identified", "Action taken", "Resource or referral", "Follow-up plan"],
  },
  {
    title: "Assessment Summary",
    sections: ["Presenting concerns", "Substance use pattern", "ASAM risk summary", "Strengths", "Recommended level of care"],
  },
  {
    title: "Treatment Plan Review",
    sections: ["Goals reviewed", "Progress", "Barriers", "Updates", "Client input"],
  },
  {
    title: "Discharge Summary",
    sections: ["Reason for discharge", "Services provided", "Progress at discharge", "Continuing care recommendations"],
  },
];

export const resourceSections = [
  "Minnesota LADC rules",
  "IC&RC ADC exam",
  "245G",
  "MAT",
  "CBT",
  "Motivational Interviewing",
  "Relapse prevention",
  "Crisis resources",
];
