export type NavItem = {
  title: string;
  path: string;
  items?: NavItem[];
};

export type ContentPage = {
  title: string;
  path: string;
  section: string;
  summary: string;
  prompts?: string[];
  related: string[];
  tags: string[];
};

export const mainNavigation: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Assessments",
    path: "/assessments/comprehensive-assessment",
    items: [
      { title: "Comprehensive Assessment", path: "/assessments/comprehensive-assessment" },
      { title: "ASAM Dimensions", path: "/assessments/asam-dimensions" },
      { title: "DSM-5 Substance Use Criteria", path: "/assessments/dsm-5-substance-use-criteria" },
      { title: "Risk/Safety Assessment", path: "/assessments/risk-safety-assessment" },
      { title: "Diagnostic Summary", path: "/assessments/diagnostic-summary" },
      { title: "Placement Recommendation", path: "/assessments/placement-recommendation" },
      { title: "Assessment Scripts", path: "/assessments/assessment-scripts" },
    ],
  },
  {
    title: "Documentation",
    path: "/documentation/progress-notes",
    items: [
      { title: "Progress Notes", path: "/documentation/progress-notes" },
      { title: "Group Notes", path: "/documentation/group-notes" },
      { title: "Individual Notes", path: "/documentation/individual-notes" },
      { title: "Case Management Notes", path: "/documentation/case-management-notes" },
      { title: "Crisis Notes", path: "/documentation/crisis-notes" },
      { title: "Discharge Summaries", path: "/documentation/discharge-summaries" },
      { title: "Client Form Explanations", path: "/documentation/client-form-explanations" },
      { title: "Documentation Templates", path: "/documentation/templates" },
      { title: "Documentation Examples", path: "/documentation/examples" },
    ],
  },
  {
    title: "Treatment Planning",
    path: "/treatment-planning/problem-statements",
    items: [
      { title: "Problem Statements", path: "/treatment-planning/problem-statements" },
      { title: "Goals", path: "/treatment-planning/goals" },
      { title: "Objectives", path: "/treatment-planning/objectives" },
      { title: "Interventions", path: "/treatment-planning/interventions" },
      { title: "Treatment Plan Reviews", path: "/treatment-planning/reviews" },
      { title: "Relapse Prevention Planning", path: "/treatment-planning/relapse-prevention-planning" },
      { title: "Discharge Planning", path: "/treatment-planning/discharge-planning" },
    ],
  },
  {
    title: "Clinical Toolbox",
    path: "/clinical-toolbox/group-therapy-ideas",
    items: [
      { title: "Group Therapy Ideas", path: "/clinical-toolbox/group-therapy-ideas" },
      { title: "Individual Session Tools", path: "/clinical-toolbox/individual-session-tools" },
      { title: "Motivational Interviewing", path: "/clinical-toolbox/motivational-interviewing" },
      { title: "CBT Tools", path: "/clinical-toolbox/cbt-tools" },
      { title: "Relapse Prevention", path: "/clinical-toolbox/relapse-prevention" },
      { title: "De-escalation", path: "/clinical-toolbox/de-escalation" },
      { title: "Safety Planning", path: "/clinical-toolbox/safety-planning" },
      { title: "Client Education", path: "/clinical-toolbox/client-education" },
      { title: "Worksheets", path: "/clinical-toolbox/worksheets" },
      { title: "Processing Questions", path: "/clinical-toolbox/processing-questions" },
    ],
  },
  {
    title: "Clinical Wording Library",
    path: "/clinical-wording/assessment-wording",
    items: [
      "Assessment Wording",
      "ASAM Wording",
      "DSM-5 Diagnostic Wording",
      "Progress Note Wording",
      "Group Note Wording",
      "Treatment Plan Wording",
      "Risk and Safety Wording",
      "Discharge Wording",
      "Procentive Copy/Paste Wording",
    ].map((title) => ({ title, path: `/clinical-wording/${slugify(title)}` })),
  },
  {
    title: "Client Scripts Library",
    path: "/client-scripts/opening-the-conversation",
    items: [
      "Opening the Conversation",
      "Explaining Confidentiality",
      "Explaining Releases",
      "Explaining Assessment",
      "Explaining ASAM",
      "Explaining Treatment Plans",
      "Explaining Groups",
      "Discussing Positive UAs",
      "Discussing Relapse",
      "Discussing Discharge",
      "Mandated Reporting",
      "When a Client Refuses",
    ].map((title) => ({ title, path: `/client-scripts/${slugify(title)}` })),
  },
  {
    title: "Client Communication Toolkit",
    path: "/client-communication/confidentiality",
    items: [
      { title: "Explaining Confidentiality", path: "/client-communication/confidentiality" },
      { title: "Explaining Release of Information", path: "/client-communication/release-of-information" },
      { title: "Explaining Treatment Consent", path: "/client-communication/treatment-consent" },
      { title: "Explaining HIPAA", path: "/client-communication/hipaa" },
      { title: "Explaining 42 CFR Part 2", path: "/client-communication/42-cfr-part-2" },
      { title: "Explaining Comprehensive Assessment", path: "/client-communication/comprehensive-assessment" },
      { title: "Explaining ASAM Placement", path: "/client-communication/asam-placement" },
      { title: "Explaining Treatment Plans", path: "/client-communication/treatment-plans" },
      { title: "Explaining Group Expectations", path: "/client-communication/group-expectations" },
      { title: "Explaining Positive UAs", path: "/client-communication/positive-uas" },
      { title: "Discussing Relapse", path: "/client-communication/relapse" },
      { title: "Discussing Discharge", path: "/client-communication/discharge" },
      { title: "Mandated Reporting Scripts", path: "/client-communication/mandated-reporting" },
    ],
  },
  {
    title: "Group Therapy Hub",
    path: "/group-therapy-hub/group-session-builder",
    items: [
      "Group Session Builder",
      "Topic Library",
      "Opening Questions",
      "Processing Questions",
      "Skills Practice Activities",
      "Psychoeducation Groups",
      "Relapse Prevention Groups",
      "Documentation Language",
      "Group Expectations",
      "Worksheet Ideas",
    ].map((title) => ({ title, path: `/group-therapy-hub/${slugify(title)}` })),
  },
  {
    title: "12 Core Functions",
    path: "/core-functions/screening",
    items: [
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
      "Reports & Record Keeping",
      "Consultation",
    ].map((title) => ({
      title,
      path: `/core-functions/${slugify(title)}`,
    })),
  },
  {
    title: "Ethics & Compliance",
    path: "/ethics-compliance/245g",
    items: [
      "245G",
      "HIPAA",
      "42 CFR Part 2",
      "Minnesota Laws/Regulations",
      "Federal Laws/Regulations",
      "Confidentiality",
      "Mandated Reporting",
      "Duty to Warn",
      "Boundaries",
      "Dual Relationships",
      "Documentation Compliance",
    ].map((title) => ({ title, path: `/ethics-compliance/${slugify(title)}` })),
  },
  {
    title: "Internship & Licensure",
    path: "/internship-licensure/hours-tracker",
    items: [
      "Hours Tracker",
      "Direct Hours",
      "Indirect Hours",
      "Supervision Log",
      "Upload Internship Docs",
      "Licensure Roadmap",
      "ADC Exam Prep",
      "LADC Requirements",
      "Study Center",
      "Flashcards",
      "Practice Questions",
    ].map((title) => ({ title, path: `/internship-licensure/${slugify(title)}` })),
  },
  {
    title: "Kai-Shin Hub",
    path: "/kai-shin/procentive",
    items: [
      "Procentive",
      "Counselor Checklist",
      "Documentation Codes",
      "Intake Workflow",
      "Templates",
      "Company Information",
      "Policies/Paperwork",
      "Upload Kai-Shin Docs",
    ].map((title) => ({ title, path: `/kai-shin/${slugify(title)}` })),
  },
  {
    title: "Procentive Workflow",
    path: "/procentive-workflow/intake-to-assessment",
    items: [
      "Intake to Assessment",
      "Assessment Entry Workflow",
      "ASAM Fields",
      "Diagnosis Fields",
      "Treatment Plan Fields",
      "Progress Note Workflow",
      "Group Note Workflow",
      "Discharge Workflow",
      "Copy/Paste Checks",
    ].map((title) => ({ title, path: `/procentive-workflow/${slugify(title)}` })),
  },
  {
    title: "Resource Hub",
    path: "/resource-hub/community-resources",
    items: [
      "Community Resources",
      "Contacts Database",
      "Housing",
      "Employment",
      "Food Assistance",
      "Transportation",
      "Medical",
      "Dental",
      "Mental Health",
      "Psychiatry",
      "MAT Programs",
      "Recovery Support",
      "Legal Assistance",
      "Crisis Resources",
    ].map((title) => ({ title, path: `/resource-hub/${slugify(title)}` })),
  },
  {
    title: "Website Library",
    path: "/website-library/naadac",
    items: [
      "NAADAC",
      "MAARCH",
      "ASAM",
      "DSM-5",
      "Minnesota Board of Behavioral Health and Therapy",
      "Minnesota DHS",
      "SAMHSA",
      "42 CFR Part 2 Resources",
    ].map((title) => ({ title, path: `/website-library/${slugify(title)}` })),
  },
  {
    title: "I'm Stuck Helper",
    path: "/helper/im-stuck",
    items: [
      { title: "I'm Stuck", path: "/helper/im-stuck" },
      { title: "What Page Do I Need?", path: "/helper/what-page-do-i-need" },
      { title: "What Wording Do I Need?", path: "/helper/what-wording-do-i-need" },
      { title: "What Does This Connect To?", path: "/helper/what-does-this-connect-to" },
    ],
  },
];

export const quickActions = [
  { title: "Start Comprehensive Assessment", path: "/assessments/comprehensive-assessment" },
  { title: "Write Progress Note", path: "/documentation/progress-notes" },
  { title: "Build Treatment Plan", path: "/treatment-planning/problem-statements" },
  { title: "Find ASAM Dimension", path: "/assessments/asam-dimensions" },
  { title: "Explain Form to Client", path: "/client-communication/treatment-consent" },
  { title: "Find Community Resource", path: "/resource-hub/community-resources" },
  { title: "Study 12 Core Functions", path: "/core-functions/screening" },
  { title: "Track Internship Hours", path: "/internship-licensure/hours-tracker" },
  { title: "Open Kai-Shin Hub", path: "/kai-shin/procentive" },
  { title: "I'm Stuck", path: "/helper/im-stuck" },
  { title: "Find Clinical Wording", path: "/clinical-wording/assessment-wording" },
  { title: "Build a Group", path: "/group-therapy-hub/group-session-builder" },
];

export const resourceCategories = [
  "Housing",
  "Employment",
  "Food Assistance",
  "Transportation",
  "Medical",
  "Dental",
  "Mental Health",
  "Psychiatry",
  "MAT Programs",
  "Recovery Support",
  "Legal Assistance",
  "Crisis Resources",
];

export const websiteLibrary = [
  {
    name: "NAADAC",
    description: "Professional association resources, ethics, education, and addiction counseling materials.",
    url: "https://www.naadac.org/",
    tags: ["professional", "education", "ethics"],
  },
  {
    name: "MAARCH",
    description: "Minnesota addiction recovery and treatment advocacy resources.",
    url: "https://www.maarch.org/",
    tags: ["minnesota", "recovery", "advocacy"],
  },
  {
    name: "ASAM",
    description: "Placement criteria, clinical dimensions, and addiction medicine resources.",
    url: "https://www.asam.org/",
    tags: ["asam", "placement", "clinical"],
  },
  {
    name: "Minnesota BBHT",
    description: "Minnesota Board of Behavioral Health and Therapy licensure information.",
    url: "https://mn.gov/boards/behavioral-health/",
    tags: ["licensure", "minnesota", "ladc"],
  },
  {
    name: "Minnesota DHS",
    description: "Minnesota human services information, provider resources, and 245G-related materials.",
    url: "https://mn.gov/dhs/",
    tags: ["245g", "minnesota", "compliance"],
  },
  {
    name: "SAMHSA",
    description: "Federal substance use and mental health resources, publications, and crisis links.",
    url: "https://www.samhsa.gov/",
    tags: ["federal", "resources", "sud"],
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function flatten(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...(item.items ? flatten(item.items) : [])]);
}

export const allNavItems = flatten(mainNavigation).filter((item) => item.path !== "/");

const specialPages: Record<string, Partial<ContentPage>> = {
  "/assessments/comprehensive-assessment": {
    summary:
      "The Comprehensive Assessment is the primary clinical map. It gathers presenting needs, history, risk, strengths, diagnostic impressions, ASAM placement rationale, and recommendations.",
    prompts: [
      "Presenting Problem",
      "Substance Use History",
      "Mental Health History",
      "Medical History",
      "Family/Social History",
      "Legal History",
      "Education/Employment",
      "Recovery Environment",
      "Strengths and Barriers",
      "Risk Assessment",
      "DSM-5 Diagnostic Summary",
      "ASAM Placement Summary",
      "Recommendations",
    ],
    related: [
      "/assessments/asam-dimensions",
      "/assessments/dsm-5-substance-use-criteria",
      "/treatment-planning/problem-statements",
      "/documentation/progress-notes",
      "/client-communication/comprehensive-assessment",
      "/client-scripts/explaining-assessment",
      "/clinical-wording/assessment-wording",
      "/core-functions/assessment",
      "/kai-shin/intake-workflow",
      "/procentive-workflow/assessment-entry-workflow",
    ],
  },
  "/clinical-wording/assessment-wording": {
    summary:
      "A reusable wording library for turning de-identified assessment information into neutral, clinically useful language for documentation and Procentive fields.",
    related: [
      "/assessments/comprehensive-assessment",
      "/clinical-wording/asam-wording",
      "/clinical-wording/dsm-5-diagnostic-wording",
      "/procentive-workflow/assessment-entry-workflow",
      "/treatment-planning/problem-statements",
    ],
  },
  "/client-scripts/opening-the-conversation": {
    summary:
      "A plain-language script library for explaining clinical processes without jargon, reducing client confusion, and supporting informed participation.",
    related: [
      "/client-scripts/explaining-assessment",
      "/client-scripts/explaining-confidentiality",
      "/client-communication/confidentiality",
      "/ethics-compliance/confidentiality",
    ],
  },
  "/group-therapy-hub/group-session-builder": {
    summary:
      "A practical group workflow for quickly choosing a topic, opening question, activity, processing questions, skill practice, and documentation language.",
    related: [
      "/group-therapy-hub/topic-library",
      "/group-therapy-hub/processing-questions",
      "/documentation/group-notes",
      "/clinical-wording/group-note-wording",
      "/core-functions/counseling",
    ],
  },
  "/procentive-workflow/intake-to-assessment": {
    summary:
      "A workplace-specific workflow map for moving from intake information into assessment, ASAM, diagnosis, treatment planning, and documentation fields.",
    related: [
      "/kai-shin/procentive",
      "/procentive-workflow/assessment-entry-workflow",
      "/assessments/comprehensive-assessment",
      "/clinical-wording/procentive-copy-paste-wording",
    ],
  },
  "/helper/im-stuck": {
    summary:
      "A guided triage helper for moments when you know the clinical task but not the next page, wording, form, or connection.",
    related: [
      "/assessments/comprehensive-assessment",
      "/clinical-wording/assessment-wording",
      "/client-scripts/opening-the-conversation",
      "/documentation/progress-notes",
      "/treatment-planning/problem-statements",
    ],
  },
  "/resource-hub/community-resources": {
    summary:
      "A searchable working list for community resources, contact information, notes, web searches, and map searches.",
    related: [
      "/resource-hub/contacts-database",
      "/client-communication/release-of-information",
      "/core-functions/referral",
      "/core-functions/case-management",
    ],
  },
  "/internship-licensure/hours-tracker": {
    summary:
      "A placeholder tracker for logging internship hours, direct hours, indirect hours, supervision, and reflection.",
    related: [
      "/internship-licensure/direct-hours",
      "/internship-licensure/indirect-hours",
      "/internship-licensure/supervision-log",
      "/core-functions/screening",
    ],
  },
};

export const contentPages: ContentPage[] = allNavItems.map((item) => {
  const section =
    mainNavigation.find((nav) =>
      nav.path === item.path || nav.items?.some((child) => child.path === item.path),
    )?.title ?? "LADC Compass";
  const override = specialPages[item.path] ?? {};
  return {
    title: item.title,
    path: item.path,
    section,
    summary:
      override.summary ??
      `${item.title} is a placeholder workspace in the ${section} section. It is ready for section-specific examples, scripts, forms, and clinical guidance.`,
    prompts: override.prompts,
    related:
      override.related ??
      defaultRelatedFor(item.path, section),
    tags: [section, item.title],
  };
});

function defaultRelatedFor(path: string, section: string) {
  const base = [
    "/assessments/comprehensive-assessment",
    "/assessments/asam-dimensions",
    "/clinical-wording/assessment-wording",
    "/client-scripts/opening-the-conversation",
    "/treatment-planning/problem-statements",
    "/documentation/progress-notes",
    "/helper/im-stuck",
  ];
  const sectionLinks: Record<string, string[]> = {
    Documentation: [
      "/clinical-wording/progress-note-wording",
      "/procentive-workflow/progress-note-workflow",
      "/core-functions/reports-and-record-keeping",
    ],
    "Treatment Planning": [
      "/assessments/comprehensive-assessment",
      "/clinical-wording/treatment-plan-wording",
      "/procentive-workflow/treatment-plan-fields",
    ],
    "Clinical Toolbox": [
      "/group-therapy-hub/group-session-builder",
      "/client-scripts/opening-the-conversation",
      "/documentation/progress-notes",
    ],
    "Client Communication Toolkit": [
      "/client-scripts/opening-the-conversation",
      "/ethics-compliance/confidentiality",
      "/clinical-wording/assessment-wording",
    ],
    "12 Core Functions": [
      "/assessments/comprehensive-assessment",
      "/documentation/progress-notes",
      "/ethics-compliance/documentation-compliance",
    ],
    "Ethics & Compliance": [
      "/client-scripts/explaining-confidentiality",
      "/documentation/crisis-notes",
      "/core-functions/consultation",
    ],
    "Kai-Shin Hub": [
      "/procentive-workflow/intake-to-assessment",
      "/clinical-wording/procentive-copy-paste-wording",
      "/documentation/templates",
    ],
    "Procentive Workflow": [
      "/kai-shin/procentive",
      "/clinical-wording/procentive-copy-paste-wording",
      "/documentation/examples",
    ],
    "Group Therapy Hub": [
      "/documentation/group-notes",
      "/clinical-wording/group-note-wording",
      "/clinical-toolbox/group-therapy-ideas",
    ],
  };

  return [...(sectionLinks[section] ?? []), ...base]
    .filter((link, index, links) => link !== path && links.indexOf(link) === index)
    .slice(0, 8);
}

export function getPageByPath(path: string) {
  return contentPages.find((page) => page.path === path);
}

export function getRelatedPages(paths: string[]) {
  return paths
    .map((path) => contentPages.find((page) => page.path === path))
    .filter(Boolean) as ContentPage[];
}
