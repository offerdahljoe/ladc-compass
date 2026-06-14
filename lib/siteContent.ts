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
  externalLinks?: ExternalLink[];
};

export type ExternalLink = {
  title: string;
  url: string;
  description: string;
};

export type PageDetails = {
  what: string;
  why: string;
  when: string;
  explain: string;
  document: string;
  connects: string;
  examples: string[];
  mistakes: string[];
  externalLinks: ExternalLink[];
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

export const trustedExternalLinks: Record<string, ExternalLink[]> = {
  hipaa: [
    {
      title: "HHS HIPAA Privacy Rule",
      url: "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
      description:
        "Official HHS overview of the Privacy Rule, PHI safeguards, permitted uses/disclosures, and individual rights.",
    },
  ],
  part2: [
    {
      title: "eCFR 42 CFR Part 2",
      url: "https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-2",
      description:
        "Official electronic Code of Federal Regulations text for SUD patient record confidentiality.",
    },
  ],
  minnesota245g: [
    {
      title: "Minnesota Statutes Chapter 245G",
      url: "https://www.revisor.mn.gov/statutes/cite/245G",
      description:
        "Official Minnesota statute chapter for substance use disorder treatment services.",
    },
  ],
  samhsa: [
    {
      title: "SAMHSA",
      url: "https://www.samhsa.gov/",
      description:
        "Federal substance use and mental health resources, treatment locators, crisis links, and recovery information.",
    },
    {
      title: "FindTreatment.gov",
      url: "https://findtreatment.gov/",
      description:
        "SAMHSA treatment locator for substance use and mental health services.",
    },
  ],
  asam: [
    {
      title: "ASAM Criteria",
      url: "https://www.asam.org/asam-criteria",
      description:
        "ASAM information about multidimensional assessment and level-of-care criteria.",
    },
  ],
  ethics: [
    {
      title: "NAADAC Code of Ethics",
      url: "https://www.naadac.org/code-of-ethics",
      description:
        "Professional ethics reference for addiction counseling practice and supervision discussion.",
    },
  ],
  mnBoard: [
    {
      title: "Minnesota BBHT",
      url: "https://mn.gov/boards/behavioral-health/",
      description:
        "Minnesota Board of Behavioral Health and Therapy licensure and regulatory information.",
    },
  ],
};

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
    externalLinks: externalLinksFor(item.path, section, item.title),
  };
});

function externalLinksFor(path: string, section: string, title: string) {
  const lower = `${path} ${section} ${title}`.toLowerCase();
  const links: ExternalLink[] = [];
  if (lower.includes("hipaa")) links.push(...trustedExternalLinks.hipaa);
  if (lower.includes("42-cfr") || lower.includes("part-2") || lower.includes("confidentiality")) links.push(...trustedExternalLinks.part2);
  if (lower.includes("245g") || lower.includes("minnesota")) links.push(...trustedExternalLinks.minnesota245g);
  if (lower.includes("asam") || lower.includes("placement")) links.push(...trustedExternalLinks.asam);
  if (lower.includes("ethics") || lower.includes("boundaries") || lower.includes("dual")) links.push(...trustedExternalLinks.ethics);
  if (lower.includes("ladc") || lower.includes("licensure") || lower.includes("adc exam")) links.push(...trustedExternalLinks.mnBoard);
  if (lower.includes("resource") || lower.includes("mat") || lower.includes("crisis") || lower.includes("recovery")) links.push(...trustedExternalLinks.samhsa);
  return links.filter((link, index, all) => all.findIndex((item) => item.url === link.url) === index);
}

export function getPageDetails(page: ContentPage): PageDetails {
  const special = specialDetails[page.path];
  if (special) {
    return {
      ...detailBySection(page),
      ...special,
      externalLinks: [...(special.externalLinks ?? []), ...(page.externalLinks ?? [])].filter(
        (link, index, all) => all.findIndex((item) => item.url === link.url) === index,
      ),
    };
  }
  return detailBySection(page);
}

function detailBySection(page: ContentPage): PageDetails {
  const title = page.title;
  const lowerSection = page.section.toLowerCase();

  if (lowerSection.includes("assessment")) return assessmentDetails(page);
  if (lowerSection.includes("documentation")) return documentationDetails(page);
  if (lowerSection.includes("treatment")) return treatmentDetails(page);
  if (lowerSection.includes("wording")) return wordingDetails(page);
  if (lowerSection.includes("scripts") || lowerSection.includes("communication")) return scriptDetails(page);
  if (lowerSection.includes("group therapy")) return groupDetails(page);
  if (lowerSection.includes("ethics")) return ethicsDetails(page);
  if (lowerSection.includes("core functions")) return coreFunctionDetails(page);
  if (lowerSection.includes("procentive") || lowerSection.includes("kai-shin")) return procentiveDetails(page);
  if (lowerSection.includes("resource")) return resourceDetails(page);
  if (lowerSection.includes("internship")) return internshipDetails(page);

  return {
    what: `${title} is a practical LADC Compass workspace for organizing the task, finding related tools, and deciding the next clinical step.`,
    why: "It keeps learning, documentation, client communication, and supervision connected instead of scattered.",
    when: "Use it when the topic comes up in clinical work, exam study, internship reflection, supervision, or documentation review.",
    explain:
      "Client script: “I want to make this clear and useful. This helps us understand what support fits and what choices you have.”",
    document:
      "Document objective facts, clinical meaning, action taken, and follow-up. Avoid unsupported conclusions and unnecessary details.",
    connects:
      "Connect this page to assessment findings, ASAM dimensions, treatment planning, documentation, client communication, ethics, and supervision.",
    examples: [
      `Use ${title} to decide what information is missing before documenting.`,
      `Open Related Tools to move from ${title} into wording, scripts, or treatment planning.`,
    ],
    mistakes: [
      "Treating the page as a standalone checklist.",
      "Documenting a conclusion without evidence.",
      "Forgetting to connect the task to ASAM or the treatment plan.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function assessmentDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} helps organize clinical information into a useful picture of substance use, functioning, risk, strengths, diagnosis, ASAM needs, and recommendations.`,
    why:
      "Assessment is the bridge between story and service. It supports medical necessity, level-of-care thinking, client-centered planning, and ethical documentation.",
    when:
      "Use it at intake, reassessment, treatment plan review, placement decisions, diagnostic clarification, and whenever new information changes risk or need.",
    explain:
      "Client script: “This helps us understand the full picture, not just the substance use. I’ll ask about strengths, stressors, safety, health, supports, and goals so recommendations fit you.”",
    document:
      "Write in clear paragraphs: presenting concern, substance use pattern, mental/medical factors, risk, strengths, ASAM dimension summary, diagnostic impression, and recommendations. Use neutral phrases like “reports,” “describes,” “appears,” and “would benefit from.”",
    connects:
      "Assessment connects directly to ASAM Dimensions, DSM-5 criteria, diagnostic summary, treatment plan problems/goals, progress notes, referrals, and Procentive assessment fields.",
    examples: [
      "Presenting problem: “The individual presents for assessment due to recent substance-related consequences and desire to clarify treatment needs.”",
      "ASAM link: “Dimension 5 risk is elevated due to cravings, recent recurrence, and limited coping plan.”",
      "Recommendation: “Outpatient treatment with relapse prevention, recovery support planning, and continued monitoring of mental health symptoms is recommended.”",
    ],
    mistakes: [
      "Collecting facts but not explaining clinical meaning.",
      "Skipping strengths, readiness, or recovery environment.",
      "Writing ASAM ratings without rationale.",
      "Using client-identifying details in learning notes.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function documentationDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} is a documentation tool for turning clinical work into clear, ethical, objective records.`,
    why:
      "Good documentation protects continuity of care, shows medical necessity, supports supervision, and helps the counselor remember what happened and what comes next.",
    when:
      "Use it after services, contacts, coordination, crisis response, reviews, discharge planning, or any clinically relevant update.",
    explain:
      "Client script: “I document the service so your care team can understand what we worked on, what progress or barriers showed up, and what we plan to do next.”",
    document:
      "Use a structure such as DAP or SOAP. Include service focus, relevant client statements, counselor intervention, client response, progress/barriers, risk if relevant, and next plan.",
    connects:
      "Documentation connects to treatment plan goals, ASAM needs, core functions, ethical compliance, Procentive fields, and supervision questions.",
    examples: [
      "DAP Data: “Session focused on cravings and high-risk situations. Counselor used relapse prevention worksheet and MI reflections.”",
      "Assessment: “Client demonstrates increased insight into triggers but continues to need coping practice.”",
      "Plan: “Continue relapse prevention work and review sober support plan next session.”",
    ],
    mistakes: [
      "Writing vague notes like “client did well.”",
      "Leaving out the intervention or client response.",
      "Copying the same note language every session.",
      "Including excessive personal details unrelated to treatment.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function treatmentDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} turns assessment findings into an organized plan for change.`,
    why:
      "Treatment planning makes care intentional. It links assessed needs to goals, measurable objectives, counselor interventions, and reviewable progress.",
    when:
      "Use it after assessment, during plan development, at reviews, after new risk information, and when discharge or relapse prevention needs become clearer.",
    explain:
      "Client script: “This plan turns what we learned in assessment into specific goals and steps. It should sound like something useful to you, not just paperwork.”",
    document:
      "Use problem statements tied to assessed needs, goals in recovery language, objectives that can be observed or reviewed, and interventions that describe what the counselor/program will do.",
    connects:
      "Treatment planning connects to Comprehensive Assessment, ASAM, DSM-5 criteria, progress notes, relapse prevention, discharge planning, and Procentive treatment plan fields.",
    examples: [
      "Problem: “Recovery stability is affected by cravings, limited coping skills, and high-risk social situations.”",
      "Goal: “Increase recovery stability and reduce recurrence risk.”",
      "Objective: “Identify three triggers and practice three coping strategies within 30 days.”",
      "Intervention: “Counselor will use MI, CBT skills, relapse prevention planning, and referral coordination as indicated.”",
    ],
    mistakes: [
      "Writing goals that are too broad to review.",
      "Making objectives sound like counselor tasks instead of client steps.",
      "Creating a plan that does not match assessment findings.",
      "Forgetting strengths and client priorities.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function wordingDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} provides field-ready language patterns for documentation without replacing clinical judgment.`,
    why:
      "Wording matters because vague, judgmental, or unsupported language can confuse care, weaken documentation, and make Procentive entries harder to review.",
    when:
      "Use it when you know what happened clinically but need help saying it clearly, neutrally, and in a way that connects to assessment, ASAM, or treatment planning.",
    explain:
      "Client script: “I try to document in respectful, plain language that describes what we worked on and what support is needed.”",
    document:
      "Use observable facts first, then clinical interpretation, then plan. Replace labels with behavior-based language and connect wording to a goal, ASAM dimension, or recommendation.",
    connects:
      "Wording connects to Procentive copy/paste workflow, documentation examples, assessment summaries, treatment planning, and supervision review.",
    examples: [
      "Instead of “unmotivated,” write: “Client reports ambivalence about changing use and identified both reasons to continue and reasons to reduce use.”",
      "Instead of “noncompliant,” write: “Client has missed two appointments; barriers and engagement plan will be reviewed next contact.”",
      "ASAM wording: “Dimension 4 risk appears moderate due to ambivalence and inconsistent follow-through, with MI interventions recommended.”",
    ],
    mistakes: [
      "Using labels instead of observable information.",
      "Writing more than the field needs.",
      "Forgetting to state the clinical reason a detail matters.",
      "Copying language without checking fit.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function scriptDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} gives plain-language ways to explain clinical processes, forms, and difficult topics to clients.`,
    why:
      "Good scripts reduce confusion, support informed consent, lower defensiveness, and help counselors stay trauma-informed under pressure.",
    when:
      "Use it before forms, releases, assessment questions, treatment planning, group expectations, relapse conversations, discharge, or mandated reporting discussions.",
    explain:
      "Client script: “I’ll explain what this means, why we use it, what choices you have, and what questions you can ask before we move forward.”",
    document:
      "Document that the topic was explained, client questions were addressed, consent/refusal was noted if applicable, and any follow-up or supervision need was identified.",
    connects:
      "Client scripts connect to ethics, confidentiality, informed consent, documentation compliance, releases, assessment scripts, and progress note wording.",
    examples: [
      "If the client asks why: “The reason we ask this is to understand safety, support, and what level of care fits best.”",
      "If the client refuses: “That is your choice. I can explain what we can and cannot do without it, and we can talk about concerns.”",
      "Trauma-informed version: “You can pause me, ask for clarification, or tell me if a question feels too much right now.”",
    ],
    mistakes: [
      "Reading policy language without explaining it.",
      "Arguing with refusal instead of exploring concerns.",
      "Overpromising confidentiality.",
      "Using jargon such as ROI, ASAM, or compliance without translation.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function groupDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} helps plan and document group counseling in a way that is purposeful, structured, and clinically connected.`,
    why:
      "Groups can build insight, skills, peer support, and relapse prevention, but they need a clear purpose and documentation that shows the service provided.",
    when:
      "Use it before group planning, when choosing topics, when stuck on processing questions, or after group when writing documentation language.",
    explain:
      "Client script: “Group is a place to learn skills, hear from others, practice recovery thinking, and connect the topic to your own goals at your own comfort level.”",
    document:
      "Document topic, intervention, skill or activity, participation level, client response, ASAM/core function connection, and next practice step.",
    connects:
      "Group work connects to counseling, client education, relapse prevention, progress notes, ASAM Dimension 5, recovery environment, and treatment plan objectives.",
    examples: [
      "Opening question: “What is one warning sign that tells you your recovery needs more support?”",
      "Activity: trigger map, coping card, decisional balance, values exercise, refusal skills role play.",
      "Group note: “Group focused on relapse warning signs. Counselor provided psychoeducation and facilitated coping-plan practice.”",
    ],
    mistakes: [
      "Planning a topic but no clinical objective.",
      "Documenting attendance only.",
      "Letting discussion drift without tying back to skills.",
      "Forgetting quieter participants may still be engaged.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function ethicsDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} is an ethics/compliance reference for deciding what the counselor may do, must do, should document, or should bring to supervision.`,
    why:
      "Ethics protects clients, counselors, agencies, and the treatment relationship. It is especially important around confidentiality, boundaries, safety, releases, and documentation.",
    when:
      "Use it when a situation involves privacy, consent, mandated reporting, duty to warn, releases, dual relationships, documentation requirements, or uncertainty about scope.",
    explain:
      "Client script: “Part of my job is to explain privacy and safety limits clearly. Most things are private, but there are specific situations where I may have to act to protect safety or follow the law.”",
    document:
      "Document the situation, policy/legal consultation as appropriate, supervision, client explanation, action taken, and follow-up. Avoid emotional or blaming language.",
    connects:
      "Ethics connects to client scripts, releases, crisis notes, consultation, supervision, 245G, HIPAA, 42 CFR Part 2, and agency policy.",
    examples: [
      "Boundary note: “Counselor reviewed role limits and redirected communication to appropriate treatment channels.”",
      "Consultation note: “Counselor consulted supervisor regarding confidentiality question and followed agency policy.”",
    ],
    mistakes: [
      "Guessing instead of consulting policy/supervision.",
      "Over-sharing information without proper authorization.",
      "Promising absolute confidentiality.",
      "Documenting ethics issues with judgmental language.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function coreFunctionDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} is one of the 12 Core Functions used to understand addiction counseling practice and ADC/LADC exam content.`,
    why:
      "The Core Functions help interns connect daily tasks to professional counseling roles, documentation, ethics, referral, treatment planning, and consultation.",
    when:
      "Use it when logging internship hours, studying for exams, preparing supervision questions, or connecting a clinical activity to counselor responsibilities.",
    explain:
      "Client script: “This is part of my counseling role. It helps me understand your needs, explain options, coordinate care, and document the work clearly.”",
    document:
      "Document what function was performed, what information or service was provided, client response, follow-up, and any consultation or referral need.",
    connects:
      "Core Functions connect to internship hours, documentation examples, ASAM dimensions, ethics, client education, and treatment plan work.",
    examples: [
      "Internship log: “Observed assessment interview and identified ASAM-related follow-up questions for supervision.”",
      "Documentation: “Counselor provided client education on relapse warning signs and supported development of coping plan.”",
    ],
    mistakes: [
      "Logging hours without naming the actual function practiced.",
      "Confusing case management with counseling.",
      "Skipping consultation when outside scope.",
      "Forgetting documentation and ethics connections.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function procentiveDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} is a workflow guide for moving clinical information into Kai-Shin or Procentive-style documentation fields.`,
    why:
      "Workplace systems can make clinical thinking feel fragmented. This section keeps assessment, ASAM, diagnosis, treatment plan, and note language aligned before copying into fields.",
    when:
      "Use it during intake, assessment entry, ASAM summaries, diagnosis fields, treatment plan creation, progress notes, group notes, and discharge workflows.",
    explain:
      "Client script: “I’m entering information so the record accurately reflects what we discussed, what services are recommended, and what steps come next.”",
    document:
      "Before copying into fields, check: Is it neutral? Is it complete? Does it match the assessment? Does it avoid unnecessary identifiers? Does it connect to ASAM or treatment plan needs?",
    connects:
      "Procentive workflow connects to clinical wording, documentation templates, assessment sections, Kai-Shin checklists, and supervision questions.",
    examples: [
      "Copy/paste check: presenting problem should explain why now, current impact, motivation, and recommended next assessment steps.",
      "ASAM field check: rating plus evidence plus treatment implication.",
      "Progress note check: intervention, response, progress/barrier, plan.",
    ],
    mistakes: [
      "Pasting generic wording that does not match the person.",
      "Leaving fields disconnected from each other.",
      "Writing too much in one field and too little in another.",
      "Skipping a final PHI/scope/supervision check.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function resourceDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} is a practical resource navigation area for referrals, case management, and client support needs.`,
    why:
      "Recovery is affected by housing, transportation, medical care, mental health care, legal issues, food access, employment, and community support.",
    when:
      "Use it when assessment or session information shows a practical barrier, when making referrals, or when preparing case management follow-up.",
    explain:
      "Client script: “Part of recovery support can be connecting you with practical resources. We can look at options, and you decide what feels useful.”",
    document:
      "Document the need identified, resource discussed or provided, release/coordination status if applicable, client response, and follow-up plan.",
    connects:
      "Resources connect to case management, referral, recovery environment, ASAM Dimension 6, releases, and treatment plan barriers.",
    examples: [
      "Case management note: “Counselor provided housing resource options and reviewed next steps for client to contact provider.”",
      "Referral note: “ROI status reviewed; client requested information only at this time.”",
    ],
    mistakes: [
      "Making promises about resource availability.",
      "Skipping release requirements before coordination.",
      "Not documenting follow-up.",
      "Treating practical barriers as motivation problems.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

function internshipDetails(page: ContentPage): PageDetails {
  return {
    what: `${page.title} helps track internship learning, licensure readiness, supervision questions, and exam preparation.`,
    why:
      "Internship work is easier to defend and learn from when hours, functions, reflections, and supervision themes are organized.",
    when:
      "Use it after internship shifts, before supervision, while studying, and when checking direct/indirect hour balance.",
    explain:
      "Client script: “As an intern, I document my learning and receive supervision, but I do not include identifying client information in personal learning notes.”",
    document:
      "Track date, hours, activity type, core function, reflection, supervision connection, and questions. Keep learning notes de-identified.",
    connects:
      "Internship tracking connects to Core Functions, supervision log, ADC exam prep, ethics, documentation examples, and licensure requirements.",
    examples: [
      "Hours log: “2.0 direct hours observing assessment and treatment planning; Core Functions: Assessment, Treatment Planning.”",
      "Supervision question: “How do I word ASAM Dimension 4 when client is ambivalent but still attending?”",
    ],
    mistakes: [
      "Waiting too long to log hours.",
      "Mixing client identifiers into learning notes.",
      "Not separating direct and indirect hours.",
      "Missing supervision themes that could become exam study points.",
    ],
    externalLinks: page.externalLinks ?? [],
  };
}

const specialDetails: Record<string, Partial<PageDetails>> = {
  "/assessments/comprehensive-assessment": {
    what:
      "This is the main clinical picture. It organizes why the person is seeking help, what substances and patterns are involved, what risks and strengths exist, how mental/medical/social factors affect recovery, and what level of care or services may fit.",
    why:
      "It is the source document for almost everything else: DSM-5 diagnostic summary, ASAM placement, treatment plan problems, progress note focus, referrals, discharge planning, and Procentive assessment fields.",
    examples: [
      "Presenting problem: “The individual presents for assessment due to recent alcohol-related consequences and concern about ability to maintain abstinence without support.”",
      "Strengths: “The individual identifies family support, prior periods of abstinence, employment stability, and willingness to attend treatment.”",
      "Recommendation: “Recommend outpatient SUD treatment focused on relapse prevention, coping skills, recovery supports, and monitoring of co-occurring symptoms.”",
    ],
    mistakes: [
      "Making the assessment a transcript instead of a clinical synthesis.",
      "Not connecting substance use history to ASAM Dimensions 1, 4, 5, and 6.",
      "Forgetting medical, mental health, legal, and recovery environment factors.",
      "Writing recommendations without explaining why they fit.",
    ],
  },
  "/assessments/asam-dimensions": {
    what:
      "ASAM Dimensions organize multidimensional risk and need across withdrawal, biomedical, emotional/behavioral, readiness, relapse potential, and recovery environment.",
    examples: [
      "Dimension 1: “Risk appears low; no current withdrawal symptoms reported and no history of severe withdrawal disclosed.”",
      "Dimension 4: “Risk appears moderate due to ambivalence about abstinence and mixed motivation for treatment.”",
      "Dimension 6: “Risk appears elevated due to limited sober supports and substance use in the living environment.”",
    ],
  },
  "/documentation/progress-notes": {
    examples: [
      "D: “Session focused on cravings and weekend risk. Counselor used MI reflections and relapse prevention planning.”",
      "A: “Client identified two triggers and demonstrated increased insight, though coping plan remains limited.”",
      "P: “Continue coping practice and review support plan next session.”",
    ],
  },
  "/client-scripts/explaining-confidentiality": {
    examples: [
      "Simple: “Most of what you share stays private. There are safety and legal exceptions, and I’ll explain those before we go further.”",
      "If asked why: “You deserve to know what is private and what situations require action before you decide what to share.”",
    ],
  },
  "/procentive-workflow/assessment-entry-workflow": {
    examples: [
      "Workflow: paste presenting problem first, then substance use history, then risk/strengths, then ASAM summary, then recommendations.",
      "Quality check: each field should answer a different question and should not contradict another field.",
    ],
  },
  "/helper/im-stuck": {
    examples: [
      "If you do not know what to write, start with: What happened? Why does it matter? What is the next clinical step?",
      "If you do not know where to go, choose assessment, wording, script, treatment plan, Procentive, resource, or supervision.",
    ],
    mistakes: [
      "Staring at the blank field instead of choosing the clinical task.",
      "Trying to write final wording before identifying the purpose of the note.",
    ],
  },
};

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
