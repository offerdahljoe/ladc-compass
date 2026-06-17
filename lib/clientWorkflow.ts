export type WorkflowSectionId =
  | "referral-screening"
  | "intake-packet"
  | "comprehensive-assessment"
  | "initial-service-plan"
  | "initial-treatment-plan"
  | "roi-coordination"
  | "scheduling-services"
  | "ongoing-group"
  | "ongoing-individual"
  | "ongoing-documentation"
  | "treatment-plan-reviews"
  | "transition-planning"
  | "discharge"
  | "final-chart-review";

export type IntakeFormDef = {
  id: string;
  code: string;
  name: string;
  purpose: string;
  clientScript: string;
  counselorConsiderations: string[];
  commonMistakes: string[];
  taskIds: string[];
};

export type WorkflowTask = {
  id: string;
  label: string;
  formCode?: string;
  guidance?: string;
  requires?: string[];
  unlocks?: string[];
  flagGated?: string[];
};

export type WorkflowSection = {
  id: WorkflowSectionId;
  title: string;
  summary: string;
  tasks: WorkflowTask[];
  intakeForms?: IntakeFormDef[];
  toolLinks?: { label: string; href: string }[];
};

export type RoiRecord = {
  id: string;
  person: string;
  organization: string;
  relationship: string;
  reason: string;
  expiration: string;
  obtained: boolean;
  contactMade: boolean;
  documentedSetc: boolean;
};

export type ClientWorkflowState = {
  caseLabel: string;
  checkedTasks: Record<string, boolean>;
  flags: string[];
  rois: RoiRecord[];
  assessmentImported: boolean;
  lastReviewDate: string;
  nextReviewDue: string;
};

export const defaultWorkflowState: ClientWorkflowState = {
  caseLabel: "",
  checkedTasks: {},
  flags: [],
  rois: [],
  assessmentImported: false,
  lastReviewDate: "",
  nextReviewDue: "",
};

export const intakeForms: IntakeFormDef[] = [
  {
    id: "r682-1202",
    code: "R682-1202",
    name: "Initial Services Plan",
    purpose: "Documents immediate service priorities before full assessment and treatment plan are complete.",
    clientScript:
      "This is our short-term starting plan while we finish the full assessment. What do you want help with first this week?",
    counselorConsiderations: [
      "Capture immediate safety, withdrawal, housing, or legal deadlines.",
      "Use client words for priorities — not counselor assumptions.",
    ],
    commonMistakes: ["Skipping because assessment is scheduled next week.", "Writing full treatment-plan goals too early."],
    taskIds: ["intake-r682-1202-review", "intake-r682-1202-sign"],
  },
  {
    id: "r682-1000",
    code: "R682-1000",
    name: "Vulnerable Adult Determination",
    purpose: "Determines whether abuse prevention planning or mandated reporting pathways apply.",
    clientScript:
      "These questions help us know whether extra safety planning is needed. If reporting is required, I will explain that process.",
    counselorConsiderations: ["Watch for cognitive, physical, or environmental vulnerability.", "Consult supervisor if IAP needed."],
    commonMistakes: ["Rushing past vulnerability questions.", "Not documenting supervisor consult when indicated."],
    taskIds: ["intake-r682-1000-review", "intake-r682-1000-sign"],
  },
  {
    id: "w435-1015",
    code: "W435-1015",
    name: "Mandated Reporting — Controlled Substances",
    purpose: "Explains legal reporting limits before sensitive disclosures continue.",
    clientScript:
      "Most of what you share is confidential. There are safety and legal exceptions — I will explain those before we go further.",
    counselorConsiderations: ["Explain BEFORE deep clinical disclosure when possible.", "Document client questions about reporting."],
    commonMistakes: ["Explaining confidentiality after sensitive disclosure already occurred."],
    taskIds: ["intake-w435-1015-review", "intake-w435-1015-sign"],
  },
  {
    id: "r682-1001",
    code: "R682-1001",
    name: "Notice of Privacy Practices",
    purpose: "Explains how PHI is used, protected, and when disclosure may occur.",
    clientScript: "This explains who can see your information and when we need written permission to share outside Kai-Shin.",
    counselorConsiderations: ["Clarify difference between privacy notice and ROI forms.", "Address probation/family/employer concerns."],
    commonMistakes: ["Assuming client read the form without verbal review."],
    taskIds: ["intake-r682-1001-review", "intake-r682-1001-sign"],
  },
  {
    id: "o978-1031",
    code: "O978-1031",
    name: "Grievance Procedures",
    purpose: "Explains how the client can raise concerns about services.",
    clientScript: "You have the right to speak up if something feels unfair. This form explains how to do that.",
    counselorConsiderations: ["Normalize advocacy; address fear of retaliation."],
    commonMistakes: ["Treating grievance rights as throwaway paperwork."],
    taskIds: ["intake-o978-1031-review", "intake-o978-1031-sign"],
  },
  {
    id: "r682-1003",
    code: "R682-1003",
    name: "Informed Consent for Treatment",
    purpose: "Confirms client understands and agrees to participate in services.",
    clientScript:
      "This explains what treatment here looks like, your rights, confidentiality limits, and what we expect. Ask questions before signing.",
    counselorConsiderations: ["Check literacy, language, anxiety, coercion.", "Pause for questions — do not rush signatures."],
    commonMistakes: ["Signature without comprehension check.", "Not documenting refusal or partial consent."],
    taskIds: ["intake-r682-1003-review", "intake-r682-1003-sign"],
  },
  {
    id: "r682-1002",
    code: "R682-1002",
    name: "HIV / STDs / Pregnancy / Hepatitis / TB Information",
    purpose: "Provides required health education related to substance use risks.",
    clientScript: "This is health education — not a test requirement unless you want referral support.",
    counselorConsiderations: ["Note medical referral interest.", "Address shame around health topics."],
    commonMistakes: ["Skipping because client says they already know."],
    taskIds: ["intake-r682-1002-review", "intake-r682-1002-sign"],
  },
  {
    id: "r682-1007",
    code: "R682-1007",
    name: "DAANES Notification of Data Collection",
    purpose: "Explains state treatment data reporting for funding and system tracking.",
    clientScript: "Certain information goes to a protected state system — it is not public.",
    counselorConsiderations: ["Separate state reporting from public disclosure fears."],
    commonMistakes: ["Dismissing client privacy concerns."],
    taskIds: ["intake-r682-1007-review", "intake-r682-1007-sign"],
  },
];

function intakeTasks(): WorkflowTask[] {
  return intakeForms.flatMap((form) => [
    {
      id: form.taskIds[0],
      label: `Review ${form.code} with client in plain language`,
      formCode: form.code,
      guidance: form.purpose,
      unlocks: [form.taskIds[1]],
    },
    {
      id: form.taskIds[1],
      label: `Confirm ${form.code} signed/scanned in Procentive`,
      formCode: form.code,
      requires: [form.taskIds[0]],
      unlocks: form.id === "r682-1007" ? ["assess-schedule"] : undefined,
    },
  ]);
}

export const workflowSections: WorkflowSection[] = [
  {
    id: "referral-screening",
    title: "1. Referral / Screening",
    summary: "First contact — fit, urgency, safety, intake scheduling.",
    tasks: [
      { id: "screen-name", label: "Get name, callback, referral source" },
      { id: "screen-substance", label: "Ask substance(s), last use, what prompted contact today", unlocks: ["screen-safety"] },
      {
        id: "screen-safety",
        label: "Screen withdrawal, SI/HI, DV, safe travel to intake",
        requires: ["screen-substance"],
        guidance: "If withdrawal/medical instability — do not schedule routine intake alone.",
        unlocks: ["screen-schedule"],
      },
      {
        id: "screen-schedule",
        label: "Schedule intake or warm handoff; tell client what to bring",
        requires: ["screen-safety"],
        unlocks: ["intake-r682-1202-review"],
      },
      { id: "screen-log", label: "Log screening contact in Procentive if site workflow requires" },
    ],
  },
  {
    id: "intake-packet",
    title: "2. Intake Packet",
    summary: "Eight required forms — explain each before signature.",
    intakeForms,
    tasks: intakeTasks(),
    toolLinks: [{ label: "Procentive Companion", href: "/procentive-companion/companion" }],
  },
  {
    id: "comprehensive-assessment",
    title: "3. Comprehensive Assessment",
    summary: "PRO-245G-E1100 + Clinical Decision Navigator → drives later unlocks.",
    tasks: [
      { id: "assess-open", label: "Open PRO-245G-E1100 in Procentive", formCode: "PRO-245G-E1100" },
      { id: "assess-schedule", label: "Schedule assessment appointment if not done at intake", requires: ["intake-r682-1007-sign"] },
      { id: "assess-cdn", label: "Complete Clinical Decision Navigator sections", unlocks: ["assess-import-flags"] },
      {
        id: "assess-import-flags",
        label: "Import assessment flags into workflow (probation, CPS, housing, etc.)",
        requires: ["assess-cdn"],
        guidance: "Use CDN 'Workflow Unlocks' output to set flags.",
        unlocks: ["plan-initial-treatment"],
      },
      { id: "assess-dsm", label: "Document DSM-5 support and diagnostic impression" },
      { id: "assess-asam", label: "Document ASAM dimension ratings with rationale" },
      { id: "assess-sign", label: "Supervisor review if required; finalize assessment in Procentive" },
    ],
    toolLinks: [
      { label: "Clinical Decision Navigator", href: "/clinical-decision-navigator/navigator" },
      { label: "Procentive Companion", href: "/procentive-companion/companion" },
    ],
  },
  {
    id: "initial-service-plan",
    title: "4. Initial Service Plan",
    summary: "R682-1202 — early priorities if not completed at intake.",
    tasks: [
      { id: "isp-verify", label: "Verify R682-1202 reflects current immediate needs", formCode: "R682-1202" },
      { id: "isp-update", label: "Update if assessment changed priorities" },
    ],
  },
  {
    id: "initial-treatment-plan",
    title: "5. Initial Treatment Plan",
    summary: "R682-1203 — goals/objectives tied to assessment.",
    tasks: [
      {
        id: "plan-initial-treatment",
        label: "Complete R682-1203 with client — measurable objectives linked to ASAM",
        formCode: "R682-1203",
        requires: ["assess-import-flags"],
      },
      { id: "plan-medical-necessity", label: "Document medical necessity for outpatient level of care" },
      { id: "plan-sign", label: "Client review/signature; schedule first plan review date" },
    ],
  },
  {
    id: "roi-coordination",
    title: "6. ROI & Treatment Coordination",
    summary: "PRO-1024RM + PRO-1081 SETC mini-workflow.",
    tasks: [
      { id: "roi-identify", label: "Identify who requires ROI (probation, CPS, therapist, prescriber, family)", flagGated: ["probation", "cps", "coordination"] },
      { id: "roi-obtain", label: "Obtain PRO-1024RM Release of Information", formCode: "PRO-1024RM", requires: ["roi-identify"] },
      { id: "roi-contact", label: "Make collateral contact — minimum necessary only", requires: ["roi-obtain"], unlocks: ["roi-setc"] },
      {
        id: "roi-setc",
        label: "Document contact in PRO-1081 Client Contact Log (SETC)",
        formCode: "PRO-1081",
        requires: ["roi-contact"],
        guidance: "Record who, why, ROI status, info shared/received, follow-up.",
      },
      { id: "roi-reminder", label: "Create follow-up reminder for ROI expiration or return call" },
    ],
    toolLinks: [{ label: "Smart Contacts", href: "/smart-contacts/contacts" }],
  },
  {
    id: "scheduling-services",
    title: "7. Scheduling Services",
    summary: "Book individual, group, and coordination on Workspace calendar.",
    tasks: [
      { id: "sched-individual", label: "Schedule next individual session in Workspace calendar" },
      { id: "sched-group", label: "Confirm group schedule and attendance expectations" },
      { id: "sched-coord", label: "Schedule any ROI follow-up or referral appointments" },
    ],
    toolLinks: [{ label: "Workspace Calendar", href: "/" }],
  },
  {
    id: "ongoing-group",
    title: "8. Ongoing Group Sessions",
    summary: "PRO-1334 Group Progress Note after each group.",
    tasks: [
      { id: "group-attend", label: "Did client attend today?" },
      { id: "group-participation", label: "Document participation: active, passive, disruptive, engaged, withdrawn", requires: ["group-attend"] },
      { id: "group-tp-link", label: "Link participation to treatment plan goal/objective", requires: ["group-participation"] },
      { id: "group-note", label: "Complete PRO-1334 Group Progress Note", formCode: "PRO-1334", requires: ["group-tp-link"] },
      { id: "group-followup", label: "Flag individual follow-up if risk or disruption disclosed", requires: ["group-note"] },
    ],
  },
  {
    id: "ongoing-individual",
    title: "9. Ongoing Individual Sessions",
    summary: "PRO-1333 Individual Progress Note.",
    tasks: [
      { id: "ind-goal", label: "Identify treatment plan goal/objective addressed this session" },
      { id: "ind-progress", label: "Document progress, barriers, client response", requires: ["ind-goal"] },
      { id: "ind-adjust", label: "Does treatment plan need adjustment?", requires: ["ind-progress"] },
      { id: "ind-coord", label: "Does coordination need to happen (ROI/SETC)?", requires: ["ind-progress"] },
      { id: "ind-note", label: "Complete PRO-1333 Individual Progress Note", formCode: "PRO-1333", requires: ["ind-progress"] },
    ],
  },
  {
    id: "ongoing-documentation",
    title: "10. Ongoing Documentation",
    summary: "Stay current — notes, SETC, uploads.",
    tasks: [
      { id: "doc-same-day", label: "Complete billable notes same day when possible" },
      { id: "doc-setc", label: "Log non-session contacts in PRO-1081 SETC", formCode: "PRO-1081" },
      { id: "doc-gaps", label: "Scan chart for date gaps before end of week" },
    ],
  },
  {
    id: "treatment-plan-reviews",
    title: "11. Treatment Plan Reviews",
    summary: "R682-1203 review; W435-1213 update if needed.",
    tasks: [
      { id: "tpr-due", label: "Check treatment plan review due date" },
      { id: "tpr-progress", label: "Review progress on each goal with client", requires: ["tpr-due"] },
      { id: "tpr-barriers", label: "Update barriers and continued medical necessity", requires: ["tpr-progress"] },
      { id: "tpr-r682", label: "Complete R682-1203 Treatment Plan Review", formCode: "R682-1203", requires: ["tpr-barriers"] },
      { id: "tpr-w435", label: "Complete W435-1213 SUD Treatment Plan Update if clinically indicated", formCode: "W435-1213", requires: ["tpr-r682"] },
    ],
  },
  {
    id: "transition-planning",
    title: "12. Transition Planning",
    summary: "Aftercare before step-down or discharge.",
    tasks: [
      { id: "trans-aftercare", label: "Identify continuing care appointments and supports" },
      { id: "trans-relapse", label: "Document relapse prevention plan with client" },
      { id: "trans-warm", label: "Warm handoff referrals with ROI where needed" },
    ],
  },
  {
    id: "discharge",
    title: "13. Discharge",
    summary: "R590-1401 Chemical Dependency Discharge Summary.",
    tasks: [
      { id: "dc-reason", label: "Document reason for discharge" },
      { id: "dc-completed", label: "Was treatment completed vs administrative/AMA?", requires: ["dc-reason"] },
      { id: "dc-referrals", label: "Were referrals and aftercare documented?", requires: ["dc-completed"] },
      { id: "dc-risk", label: "Unresolved risks documented with plan?", requires: ["dc-referrals"] },
      { id: "dc-roi-close", label: "ROI/coordination items closed or transferred?", requires: ["dc-risk"] },
      { id: "dc-summary", label: "Complete R590-1401 Discharge Summary in Procentive", formCode: "R590-1401", requires: ["dc-roi-close"] },
    ],
  },
  {
    id: "final-chart-review",
    title: "14. Final Chart Review",
    summary: "QA before chart closure.",
    tasks: [
      { id: "chart-intake", label: "All intake forms signed" },
      { id: "chart-assess", label: "Assessment + plans on timeline" },
      { id: "chart-notes", label: "No note gaps on billed dates" },
      { id: "chart-roi", label: "SETC entries match ROI on file" },
      { id: "chart-close", label: "Supervisor approval to close chart" },
    ],
  },
];

export function allTasks() {
  return workflowSections.flatMap((s) => s.tasks);
}

export function isTaskVisible(task: WorkflowTask, checked: Record<string, boolean>, flags: string[]) {
  if (task.requires?.length && !task.requires.every((id) => checked[id])) return false;
  if (task.flagGated?.length && !task.flagGated.some((f) => flags.includes(f))) {
    if (task.flagGated.includes("coordination") && flags.length > 0) return true;
    if (!task.flagGated.includes("coordination")) return false;
  }
  return true;
}

export function sectionProgress(section: WorkflowSection, checked: Record<string, boolean>, flags: string[]) {
  const visible = section.tasks.filter((t) => isTaskVisible(t, checked, flags));
  const done = visible.filter((t) => checked[t.id]).length;
  return { done, total: visible.length };
}

export const workflowFlagOptions = [
  { id: "probation", label: "Probation / court involved" },
  { id: "cps", label: "CPS involved" },
  { id: "housing", label: "Unstable housing" },
  { id: "withdrawal", label: "Withdrawal risk elevated" },
  { id: "mh", label: "Mental health symptoms elevated" },
  { id: "relapse", label: "Relapse risk elevated" },
  { id: "coordination", label: "Coordination needed" },
];

export const setcDescription = {
  purpose:
    "Documents treatment coordination activities, collateral contacts, outreach attempts, and clinically relevant communication outside standard individual/group progress notes.",
  examples: [
    "Contacting probation officers",
    "Contacting CPS",
    "Contacting therapists or psychiatrists",
    "Family contact with ROI",
    "Medical provider coordination",
    "Outreach after missed appointments",
  ],
  document: [
    "Who was contacted",
    "Why they were contacted",
    "Information shared",
    "Information received",
    "ROI status",
    "Actions taken",
    "Follow-up plan",
  ],
};
