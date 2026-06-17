
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
    title: "Workspace",
    path: "/",
  },
  {
    title: "Communications Log",
    path: "/communications-log/log",
  },
  {
    title: "Client Workflow",
    path: "/client-workflow/workflow",
  },
  {
    title: "Clinical Decision Navigator",
    path: "/clinical-decision-navigator/navigator",
    items: [
      { title: "Decision Workspace", path: "/clinical-decision-navigator/navigator" },
    ],
  },
  {
    title: "Group Studio",
    path: "/group-studio/studio",
  },
  {
    title: "Documentation Lab",
    path: "/documentation-lab/lab",
  },
  {
    title: "Medication Reference",
    path: "/medications/overview",
  },
  {
    title: "Reset Room",
    path: "/reset-room/reset",
  },
  {
    title: "Resource Library",
    path: "/resource-library/library",
    items: [
      { title: "Resource Library", path: "/resource-library/library" },
      { title: "Smart Contacts", path: "/smart-contacts/contacts" },
      { title: "Billing Codes", path: "/billing-codes/reference" },
    ],
  },
  {
    title: "LADC Academy",
    path: "/ladc-academy/academy",
    items: [
      { title: "Learning Paths", path: "/ladc-academy/academy" },
      { title: "Exam Academy", path: "/exam-academy/practice" },
      { title: "Case Challenges", path: "/case-challenges/challenges" },
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
          "Confidentiality",
          "Mandated Reporting",
          "Duty to Warn",
          "Boundaries",
          "Dual Relationships",
          "Documentation Compliance",
        ].map((title) => ({ title, path: `/ethics-compliance/${slugify(title)}` })),
      },
    ],
  },
  {
    title: "Licensure Journey",
    path: "/internship-survival-guide/hours-tracker",
    items: [
      "Hours Tracker",
      "Supervision Log",
      "Upload Internship Docs",
      "Licensure Roadmap",
      "ADC Exam Prep",
      "LADC Requirements",
      "Study Center",
      "Practice Questions",
    ].map((title) => ({ title, path: `/internship-survival-guide/${slugify(title)}` })),
  },
];

export const quickActions = [
  { title: "Open Clinical Decision Navigator", path: "/clinical-decision-navigator/navigator" },
  { title: "Open Workspace", path: "/" },
  { title: "Communications Log", path: "/communications-log/log" },
  { title: "Open Client Workflow", path: "/client-workflow/workflow" },
  { title: "Start Group Studio", path: "/group-studio/studio" },
  { title: "Create Documentation", path: "/documentation-lab/lab" },
  { title: "Find Resource", path: "/resource-library/library" },
  { title: "Find Contact", path: "/smart-contacts/contacts" },
  { title: "Study 12 Core Functions", path: "/core-functions/screening" },
  { title: "Track Licensure", path: "/internship-survival-guide/hours-tracker" },
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
    {
      title: "BBHT Apply for LADC",
      url: "https://mn.gov/boards/behavioral-health/applicants/apply/apply-for-ladc.jsp",
      description:
        "Minnesota BBHT application information for Licensed Alcohol and Drug Counselor applicants.",
    },
    {
      title: "BBHT LADC Exam Information",
      url: "https://mn.gov/boards/behavioral-health/applicants/exam-information/ladc-exam-information.jsp",
      description:
        "Minnesota BBHT exam information for LADC applicants, including current exam guidance.",
    },
  ],
  icrc: [
    {
      title: "IC&RC ADC Credential",
      url: "https://internationalcredentialing.org/creds/adc",
      description:
        "IC&RC information about the Alcohol and Drug Counselor credential and examination resources.",
    },
    {
      title: "IC&RC Exam Prep",
      url: "https://internationalcredentialing.org/examprep",
      description:
        "IC&RC exam preparation resources and candidate information.",
    },
  ],
  mandatedReporting: [
    {
      title: "Minnesota DHS Mandated Reporting",
      url: "https://mn.gov/dhs/people-we-serve/children-and-families/services/child-protection/programs-services/reporting-child-abuse-neglect.jsp",
      description:
        "Minnesota DHS information on reporting suspected child abuse or neglect.",
    },
    {
      title: "Minnesota Adult Abuse Reporting Center",
      url: "https://mn.gov/dhs/people-we-serve/seniors/services/adult-protection/programs-services/maarc.jsp",
      description:
        "Minnesota DHS information about reporting suspected maltreatment of vulnerable adults.",
    },
  ],
  medicationInfo: [
    {
      title: "MedlinePlus Drug Information",
      url: "https://medlineplus.gov/druginformation.html",
      description:
        "NIH consumer medication information, including generic/brand names, uses, warnings, and side effects.",
    },
  ],
  moud: [
    {
      title: "SAMHSA: Medications for Opioid Use Disorder",
      url: "https://www.samhsa.gov/substance-use/treatment/options/medications-opioid-use-disorder",
      description:
        "SAMHSA overview of FDA-approved medications used to treat opioid use disorder.",
    },
  ],
  audMeds: [
    {
      title: "NIAAA: Alcohol Treatment Medications",
      url: "https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/understanding-alcohol-use-disorder",
      description:
        "NIAAA information about alcohol use disorder and treatment options, including medication as part of care.",
    },
  ],
  naloxone: [
    {
      title: "FDA: Naloxone",
      url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/naloxone-drugfacts",
      description:
        "FDA naloxone information for opioid overdose reversal.",
    },
  ],
};

type CoreFunctionGuide = {
  summary: string;
  definition: string[];
  whenUsed: string[];
  forms: string[];
  documentation: string[];
  clinicalConnections: string[];
  examPrep: string[];
  mistakes: string[];
};

const coreFunctionGuides: Record<string, CoreFunctionGuide> = {
  "/core-functions/screening": {
    summary:
      "Screening is the first-pass process of deciding whether substance use, mental health, safety, or practical concerns need deeper assessment or referral.",
    definition: [
      "Screening is brief and focused. It is not the full assessment.",
      "The goal is to identify possible substance use disorder, withdrawal risk, crisis concerns, co-occurring needs, eligibility questions, and urgency.",
      "Screening helps decide whether to move forward with intake/assessment, refer elsewhere, or respond to immediate safety or medical needs.",
    ],
    whenUsed: [
      "First phone call, walk-in, referral review, pre-admission contact, or early program contact.",
      "When a person is unsure whether they need treatment.",
      "When the counselor needs to quickly identify risk before scheduling or completing full intake.",
    ],
    forms: [
      "Screening form or pre-admission questionnaire.",
      "Brief substance use screen, withdrawal risk questions, mental health/safety screen.",
      "Referral source information, contact information, consent to contact if applicable.",
      "Eligibility or program fit checklist.",
    ],
    documentation: [
      "Screening completed to determine need for SUD assessment and service fit.",
      "Individual reports current concerns related to [substance/use pattern] and was referred for comprehensive assessment.",
      "Immediate risk concerns were [not identified/identified and addressed according to policy].",
    ],
    clinicalConnections: [
      "ASAM Dimension 1 if intoxication or withdrawal risk appears possible.",
      "ASAM Dimension 3 if mental health or safety concerns are present.",
      "Ethics: confidentiality limits, crisis response, referral if needs are outside program scope.",
    ],
    examPrep: [
      "Know the difference between screening and assessment.",
      "Screening answers: Is there likely a problem and what should happen next?",
      "Screening does not establish the full diagnosis or treatment plan.",
    ],
    mistakes: [
      "Trying to complete a full assessment during screening.",
      "Missing immediate withdrawal, overdose, or suicide risk.",
      "Failing to document referral or next step.",
    ],
  },
  "/core-functions/intake": {
    summary:
      "Intake is the administrative and clinical entry process that opens services, gathers required information, and prepares the person for assessment and treatment.",
    definition: [
      "Intake establishes the person's admission record and confirms basic program requirements.",
      "It includes demographics, consents, releases, financial or insurance information, rights, policies, and initial service needs.",
      "Intake is where the person begins to understand what the program is, what is expected, and what information is needed.",
    ],
    whenUsed: [
      "When someone starts services or transfers into a program.",
      "Before or alongside comprehensive assessment.",
      "When updating admission paperwork, consents, or releases.",
    ],
    forms: [
      "Admission/intake packet.",
      "Consent for treatment.",
      "Client rights and responsibilities.",
      "HIPAA/Notice of Privacy Practices.",
      "42 CFR Part 2 consent or disclosure forms when applicable.",
      "Release of Information forms.",
      "Emergency contact and financial/insurance forms.",
    ],
    documentation: [
      "Intake paperwork reviewed and completed with client.",
      "Client rights, confidentiality, treatment consent, and release options were explained in plain language.",
      "Client questions were addressed; pending items include [missing form/document/signature].",
    ],
    clinicalConnections: [
      "Orientation because intake often introduces program rules and expectations.",
      "Assessment because intake provides referral context and required background information.",
      "Ethics: informed consent, confidentiality, releases, client rights, and documentation compliance.",
    ],
    examPrep: [
      "Intake is the entry/admission process, not the full clinical assessment.",
      "Know common intake documents and why they matter.",
      "Client rights and informed consent are central.",
    ],
    mistakes: [
      "Rushing signatures without checking understanding.",
      "Confusing ROI, HIPAA, and 42 CFR Part 2 requirements.",
      "Leaving missing forms undocumented.",
    ],
  },
  "/core-functions/orientation": {
    summary:
      "Orientation explains the treatment program, expectations, rules, services, rights, schedules, and how the person can participate effectively.",
    definition: [
      "Orientation helps the client understand how treatment works.",
      "It covers program structure, group expectations, attendance, confidentiality, grievances, drug testing expectations, emergency procedures, and who to contact.",
      "Good orientation reduces anxiety and prevents misunderstandings later.",
    ],
    whenUsed: [
      "At admission or first active service contact.",
      "When a client starts a new level of care, group, or program track.",
      "When expectations need to be reviewed due to missed appointments, group issues, or confusion.",
    ],
    forms: [
      "Program handbook.",
      "Client rights/responsibilities.",
      "Group rules and expectations.",
      "Attendance policy.",
      "UA/testing policy if applicable.",
      "Grievance procedure.",
      "Emergency and after-hours instructions.",
    ],
    documentation: [
      "Program orientation completed; client was informed of schedule, expectations, rights, confidentiality limits, and contact procedures.",
      "Client verbalized understanding of group expectations and attendance policy.",
      "Questions regarding [topic] were answered and will be reviewed again as needed.",
    ],
    clinicalConnections: [
      "Client Education because orientation teaches how the program works.",
      "Ethics: informed participation, rights, confidentiality, boundaries.",
      "Case Management when barriers to attendance or participation appear.",
    ],
    examPrep: [
      "Orientation is about explaining program expectations and client rights.",
      "It supports engagement and informed participation.",
      "It is different from intake paperwork and different from counseling.",
    ],
    mistakes: [
      "Handing out forms without explaining them.",
      "Using program jargon the client does not understand.",
      "Failing to document questions, refusals, or barriers.",
    ],
  },
  "/core-functions/assessment": {
    summary:
      "Assessment is the structured clinical process of gathering and interpreting information to understand diagnosis, ASAM needs, strengths, risks, and recommendations.",
    definition: [
      "Assessment is deeper than screening and broader than diagnosis.",
      "It gathers substance use history, mental health, medical, family/social, legal, education/employment, recovery environment, risk, strengths, and barriers.",
      "It turns information into clinical meaning and recommendations.",
    ],
    whenUsed: [
      "At admission after screening/intake.",
      "When a major change occurs: recurrence, crisis, new diagnosis, legal change, medical issue, or treatment nonresponse.",
      "Before placement recommendation, diagnosis, and treatment planning.",
    ],
    forms: [
      "Comprehensive assessment.",
      "ASAM Dimension summary.",
      "DSM-5 criteria checklist or diagnostic summary.",
      "Risk/safety assessment.",
      "Collateral information and releases when appropriate.",
      "Placement recommendation.",
    ],
    documentation: [
      "Comprehensive assessment completed using client report, available referral information, and clinical interview.",
      "Assessment indicates primary needs related to [ASAM dimensions] and supports recommendation for [level/service].",
      "Strengths include [supports/skills/motivation]; barriers include [risk/environment/readiness].",
    ],
    clinicalConnections: [
      "ASAM Dimensions 1-6.",
      "DSM-5 diagnostic summary.",
      "Treatment plan problems, goals, objectives, and interventions.",
      "Ethics: scope, consent, confidentiality, collateral information, risk response.",
    ],
    examPrep: [
      "Assessment identifies the nature and extent of SUD and related issues.",
      "Assessment informs diagnosis, placement, and treatment planning.",
      "Know what domains belong in a comprehensive assessment.",
    ],
    mistakes: [
      "Collecting facts without clinical interpretation.",
      "Skipping strengths and recovery environment.",
      "Writing recommendations that do not follow from findings.",
    ],
  },
  "/core-functions/treatment-planning": {
    summary:
      "Treatment Planning turns assessment findings into individualized problems, goals, objectives, and counselor interventions.",
    definition: [
      "Treatment planning translates assessed needs into a written plan for change.",
      "It should reflect the client's goals, ASAM needs, diagnosis, strengths, barriers, and stage of change.",
      "A strong plan guides sessions and makes progress notes easier to write.",
    ],
    whenUsed: [
      "After comprehensive assessment and diagnosis/placement recommendation.",
      "During plan reviews, recurrence response, discharge planning, or level-of-care changes.",
      "When goals or barriers change.",
    ],
    forms: [
      "Individual treatment plan.",
      "Treatment plan review.",
      "Problem/goal/objective/intervention worksheet.",
      "Relapse prevention plan.",
      "Discharge or continuing care plan.",
    ],
    documentation: [
      "Treatment plan developed collaboratively based on assessment findings and client priorities.",
      "Problem area identified as [need/barrier]. Goal is [recovery direction]. Objectives include [measurable steps].",
      "Counselor interventions include MI, CBT skills, relapse prevention planning, psychoeducation, and referral coordination as indicated.",
    ],
    clinicalConnections: [
      "Assessment and ASAM determine problem areas.",
      "Progress notes should connect back to treatment plan goals.",
      "Ethics: client participation, individualized care, medical necessity.",
    ],
    examPrep: [
      "Know the difference between goals, objectives, and interventions.",
      "Treatment plans should be individualized and based on assessment.",
      "Objectives should be measurable or reviewable.",
    ],
    mistakes: [
      "Using generic goals that could apply to anyone.",
      "Writing objectives that are not measurable.",
      "Failing to connect progress notes to plan goals.",
    ],
  },
  "/core-functions/counseling": {
    summary:
      "Counseling is the direct therapeutic work that helps clients build insight, motivation, coping skills, recovery behaviors, and relapse prevention strategies.",
    definition: [
      "Counseling may be individual, group, or family-oriented within scope and program policy.",
      "It uses evidence-informed methods such as MI, CBT skills, psychoeducation, relapse prevention, and supportive counseling.",
      "Counseling is not advice-giving only; it is purposeful clinical intervention tied to goals.",
    ],
    whenUsed: [
      "During individual sessions, group therapy, treatment plan work, relapse prevention, and recovery skill building.",
      "When a client needs help with motivation, cravings, triggers, coping, relationships, or recovery routines.",
      "When processing recurrence, ambivalence, or barriers to change.",
    ],
    forms: [
      "Progress notes.",
      "Group notes.",
      "Treatment plan and plan review.",
      "Relapse prevention worksheet.",
      "CBT/MI worksheets or group materials.",
    ],
    documentation: [
      "Counselor used MI to explore ambivalence and elicit change talk related to [goal].",
      "Session focused on identifying triggers and practicing coping responses.",
      "Client participated in group discussion and connected topic to personal recovery plan.",
    ],
    clinicalConnections: [
      "ASAM Dimension 4 for readiness and Dimension 5 for relapse/continued use potential.",
      "Treatment plan objectives and interventions.",
      "Ethics: boundaries, scope of practice, cultural humility, trauma-informed care.",
    ],
    examPrep: [
      "Counseling is a core clinical function, not just conversation.",
      "Know common counseling methods used in SUD treatment.",
      "Group counseling still requires purposeful intervention and documentation.",
    ],
    mistakes: [
      "Documenting only the topic and not the intervention.",
      "Giving advice without assessing readiness.",
      "Letting sessions drift away from treatment goals.",
    ],
  },
  "/core-functions/case-management": {
    summary:
      "Case Management helps coordinate practical services and supports that affect recovery, such as housing, transportation, medical care, legal needs, and benefits.",
    definition: [
      "Case management addresses barriers that interfere with treatment engagement and recovery stability.",
      "It may include resource identification, referral coordination, follow-up, advocacy within role, and care coordination with proper releases.",
      "It is connected to ASAM Dimension 6 and recovery environment needs.",
    ],
    whenUsed: [
      "When practical barriers affect attendance, safety, recovery, housing, food, medical care, legal obligations, or employment.",
      "When the client needs help connecting to outside services.",
      "When coordination with probation, medical providers, social services, or recovery supports is needed and authorized.",
    ],
    forms: [
      "Case management note.",
      "Release of Information.",
      "Referral form.",
      "Resource list.",
      "Care coordination/contact log.",
    ],
    documentation: [
      "Client identified need for [resource]. Counselor provided resource information and reviewed next steps.",
      "With valid release, counselor coordinated with [provider/agency] regarding [purpose].",
      "Follow-up plan is to review contact outcome at next session.",
    ],
    clinicalConnections: [
      "ASAM Dimension 6 recovery environment.",
      "Referral core function.",
      "Ethics: releases, minimum necessary information, boundaries, role clarity.",
    ],
    examPrep: [
      "Case management is about coordinating needed services, not providing every service yourself.",
      "Know when releases are needed.",
      "Practical barriers can be treatment barriers.",
    ],
    mistakes: [
      "Calling outside providers without proper release.",
      "Promising resource availability.",
      "Not documenting follow-up.",
    ],
  },
  "/core-functions/crisis-intervention": {
    summary:
      "Crisis Intervention is the immediate response to safety, stabilization, intoxication, withdrawal, overdose, suicidal/homicidal risk, or acute behavioral concerns.",
    definition: [
      "Crisis intervention focuses on immediate safety and stabilization.",
      "It is not long-term therapy; it is a structured response to urgent risk.",
      "It requires agency policy, supervision/consultation, and emergency referral when needed.",
    ],
    whenUsed: [
      "Suicidal ideation, homicidal ideation, overdose risk, severe withdrawal risk, intoxication, domestic violence concerns, psychosis, severe agitation, or unsafe environment.",
      "When client safety or public safety may be at immediate risk.",
      "When a counselor must pause routine services and follow crisis procedures.",
    ],
    forms: [
      "Risk/safety assessment.",
      "Crisis note.",
      "Safety plan.",
      "Incident report if required.",
      "Consultation/supervision note.",
      "Emergency referral documentation.",
    ],
    documentation: [
      "Counselor assessed immediate safety concerns including [risk area].",
      "Supervisor/emergency services were consulted according to agency policy.",
      "Safety plan reviewed and client was referred to [service/level of care] as indicated.",
    ],
    clinicalConnections: [
      "ASAM Dimension 1 for intoxication/withdrawal and Dimension 3 for emotional/behavioral/cognitive risk.",
      "Ethics: mandated reporting, duty to warn/protect, scope, consultation.",
      "Documentation compliance and crisis policy.",
    ],
    examPrep: [
      "Crisis intervention prioritizes safety and stabilization.",
      "Know when to consult, refer, or activate emergency procedures.",
      "Documentation should include risk assessed, action taken, and follow-up.",
    ],
    mistakes: [
      "Trying to manage high-risk crisis alone.",
      "Failing to document consultation and safety steps.",
      "Returning to routine counseling before stabilization is addressed.",
    ],
  },
  "/core-functions/client-education": {
    summary:
      "Client Education provides accurate, understandable information about SUD, recovery, health risks, treatment, coping skills, and available supports.",
    definition: [
      "Client education teaches information that supports recovery decisions and skill development.",
      "It should be understandable, relevant, culturally responsive, and connected to the person's goals.",
      "Education can happen individually, in groups, during orientation, or as part of treatment planning.",
    ],
    whenUsed: [
      "Explaining relapse prevention, cravings, withdrawal, MAT, overdose prevention, coping skills, group expectations, confidentiality, or treatment process.",
      "When a client has misinformation or limited understanding.",
      "When education supports a treatment plan objective.",
    ],
    forms: [
      "Progress note or group note.",
      "Educational handout or worksheet.",
      "Relapse prevention plan.",
      "Overdose prevention/Narcan education documentation if applicable.",
      "Client form explanations.",
    ],
    documentation: [
      "Counselor provided education on [topic] and checked client understanding.",
      "Client identified one way the information applies to current recovery plan.",
      "Group focused on psychoeducation regarding [topic] with discussion and skill practice.",
    ],
    clinicalConnections: [
      "ASAM Dimension 4 readiness and Dimension 5 relapse potential.",
      "Counseling, orientation, treatment planning, and group therapy.",
      "Ethics: informed consent and accurate information.",
    ],
    examPrep: [
      "Client education is not lecturing; it supports informed recovery choices.",
      "Education should be matched to readiness and need.",
      "Documentation should include topic and client response.",
    ],
    mistakes: [
      "Overloading the client with information.",
      "Using jargon without checking understanding.",
      "Not tying education to the treatment plan.",
    ],
  },
  "/core-functions/referral": {
    summary:
      "Referral connects the client to services outside the counselor's role or program when additional support is needed.",
    definition: [
      "Referral is the process of identifying and linking to another service or provider.",
      "It may be internal or external and may involve warm handoff, resource information, or coordination with valid release.",
      "Referral is used when needs exceed the current program's scope, availability, or level of care.",
    ],
    whenUsed: [
      "Medical care, detox, mental health therapy, psychiatry, MAT, housing, legal assistance, food, transportation, higher/lower level of care, peer recovery support.",
      "When assessment identifies needs outside SUD counseling scope.",
      "When discharge or continuing care requires outside supports.",
    ],
    forms: [
      "Referral form.",
      "Release of Information.",
      "Case management note.",
      "Discharge/continuing care plan.",
      "Resource list or contact log.",
    ],
    documentation: [
      "Counselor discussed referral need for [service] and provided information for [provider/resource].",
      "Client agreed to [contact/consider/decline] referral at this time.",
      "With valid release, counselor coordinated referral information with [agency].",
    ],
    clinicalConnections: [
      "Case management and discharge planning.",
      "ASAM Dimensions 2, 3, and 6 often drive referrals.",
      "Ethics: scope of practice, informed choice, releases, continuity of care.",
    ],
    examPrep: [
      "Referral is appropriate when another provider/service is needed.",
      "Know the difference between referral and case management.",
      "Client choice and consent matter.",
    ],
    mistakes: [
      "Making the referral decision without client involvement.",
      "Coordinating without release.",
      "Not documenting refusal or follow-up plan.",
    ],
  },
  "/core-functions/reports-and-record-keeping": {
    summary:
      "Reports & Record Keeping includes accurate, timely, ethical documentation of services, assessments, plans, releases, referrals, and required reports.",
    definition: [
      "This function covers written records that support care, compliance, continuity, billing, supervision, and legal/ethical accountability.",
      "It includes progress notes, assessments, treatment plans, reviews, discharge summaries, releases, incident reports, and contact logs.",
      "Good records are clear, objective, timely, and clinically connected.",
    ],
    whenUsed: [
      "After nearly every clinical service or relevant client contact.",
      "During assessment, treatment planning, plan review, case management, crisis response, and discharge.",
      "When preparing reports for authorized referral sources, courts, probation, or other providers with proper consent/legal basis.",
    ],
    forms: [
      "Progress notes.",
      "Group notes.",
      "Comprehensive assessment.",
      "Treatment plan and reviews.",
      "Discharge summary.",
      "ROI forms.",
      "Case management contacts.",
      "Incident/crisis reports.",
    ],
    documentation: [
      "Documentation completed to reflect service provided, client response, clinical assessment, and plan.",
      "Record updated to include [assessment/plan/review/referral] consistent with agency policy.",
      "Authorized report prepared using minimum necessary information.",
    ],
    clinicalConnections: [
      "All ASAM dimensions may be documented depending on service.",
      "Ethics: confidentiality, accuracy, timely records, minimum necessary disclosure.",
      "Procentive workflow and documentation compliance.",
    ],
    examPrep: [
      "Records should be accurate, objective, timely, and confidential.",
      "Know why documentation is part of clinical care, not separate from it.",
      "Reports require authorization or legal basis.",
    ],
    mistakes: [
      "Late or vague notes.",
      "Copy/paste documentation that does not match the service.",
      "Including unnecessary details in reports.",
      "Forgetting client response or next plan.",
    ],
  },
  "/core-functions/consultation": {
    summary:
      "Consultation is seeking professional input from supervisors or qualified colleagues to improve care, stay within scope, and address complex clinical or ethical questions.",
    definition: [
      "Consultation helps the counselor make better decisions when the issue is complex, risky, outside scope, or ethically uncertain.",
      "It can involve supervision, multidisciplinary team discussion, medical/mental health consultation, or agency leadership.",
      "Consultation does not replace informed consent, releases, or emergency procedures.",
    ],
    whenUsed: [
      "Risk/safety concerns, mandated reporting questions, duty-to-warn concerns, diagnostic uncertainty, placement uncertainty, dual relationships, boundary issues, documentation concerns, scope questions.",
      "When client needs exceed counselor expertise.",
      "When an intern needs supervision before acting.",
    ],
    forms: [
      "Supervision log.",
      "Consultation note.",
      "Case staffing note.",
      "Crisis/risk documentation.",
      "Treatment plan review or referral documentation.",
    ],
    documentation: [
      "Counselor consulted supervisor regarding [issue] and followed recommendation to [action].",
      "Case staffing reviewed concerns related to [risk/placement/coordination]. Follow-up plan is [next step].",
      "Consultation completed due to scope/ethical concern; client care plan updated accordingly.",
    ],
    clinicalConnections: [
      "Ethics and compliance.",
      "Crisis intervention, diagnosis, ASAM placement, treatment planning, and referral.",
      "Internship supervision and licensure development.",
    ],
    examPrep: [
      "Consultation is a professional responsibility, especially for interns.",
      "Know when to seek supervision instead of acting alone.",
      "Consultation should be documented when clinically relevant.",
    ],
    mistakes: [
      "Waiting too long to consult.",
      "Consulting without protecting confidentiality.",
      "Ignoring scope of practice limits.",
      "Failing to document the consultation outcome.",
    ],
  },
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

function uniqueByPath(items: NavItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

export const allNavItems = uniqueByPath(flatten(mainNavigation).filter((item) => item.path !== "/"));

function findTopSectionFor(path: string, items: NavItem[] = mainNavigation, topTitle?: string): string | undefined {
  for (const item of items) {
    const currentTop = topTitle ?? item.title;
    if (item.path === path) return currentTop;
    const nested = item.items ? findTopSectionFor(path, item.items, currentTop) : undefined;
    if (nested) return nested;
  }
  return undefined;
}

function pageSummaryFor(item: NavItem, section: string) {
  if (section === "Medications") {
    return `${item.title} is a medication reference page for understanding clinical purpose, generic/common names, counseling relevance, assessment questions, documentation wording, and scope-of-practice cautions.`;
  }
  if (section === "Ethics & Compliance") {
    return `${item.title} explains the practical rule, counselor responsibility, client explanation, documentation expectation, supervision trigger, and official reference links for LADC work.`;
  }
  if (section === "Internship Survival Guide" || section === "Internship & Licensure") {
    return `${item.title} supports LADC internship organization, licensure readiness, supervision preparation, exam study, and accountable hour tracking.`;
  }
  return `${item.title} gives practical guidance, examples, documentation language, related tools, and next-step questions for the ${section} workflow.`;
}

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
      "/kai-shin/hub",
      "/kai-shin-procentive/companion",
    ],
  },
  "/clinical-wording/assessment-wording": {
    summary:
      "A reusable wording library for turning de-identified assessment information into neutral, clinically useful language for documentation and Procentive fields.",
    related: [
      "/assessments/comprehensive-assessment",
      "/clinical-wording/asam-wording",
      "/clinical-wording/dsm-5-diagnostic-wording",
      "/kai-shin-procentive/companion",
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
  "/group-therapy-hub/planner": {
    summary:
      "A practical group workflow for quickly choosing a topic, opening question, activity, processing questions, skill practice, and documentation language.",
    related: [
      "/group-therapy-hub/planner",
      "/documentation/group-notes",
      "/core-functions/counseling",
    ],
  },
  "/kai-shin/hub": {
    summary:
      "A single workplace-specific Kai-Shin reference for Procentive orientation, document codes, intake workflow, templates, policies, and de-identified upload reminders.",
    related: [
      "/kai-shin-procentive/companion",
      "/client-workflow/workflow",
      "/assessments/comprehensive-assessment",
      "/documentation/templates",
    ],
  },
  "/resource-hub/resources": {
    summary:
      "A one-page resource directory for adding categories, saving resource contact information, filtering by category, and opening web or map searches.",
    related: [
      "/client-communication/release-of-information",
      "/core-functions/referral",
      "/core-functions/case-management",
    ],
  },
  "/internship-survival-guide/hours-tracker": {
    summary:
      "A working tracker for logging direct hours, indirect hours, core functions practiced, supervision contact, reflections, and total progress toward 880 hours.",
    related: [
      "/internship-survival-guide/supervision-log",
      "/core-functions/screening",
      "/internship-survival-guide/licensure-roadmap",
      "/internship-survival-guide/adc-exam-prep",
    ],
  },
};

export const contentPages: ContentPage[] = allNavItems.map((item) => {
  const section = findTopSectionFor(item.path) ?? "LADC Compass";
  const override = specialPages[item.path] ?? {};
  const coreGuide = section === "12 Core Functions" ? coreFunctionGuides[item.path] : undefined;
  return {
    title: item.title,
    path: item.path,
    section,
    summary:
      override.summary ??
      coreGuide?.summary ??
      pageSummaryFor(item, section),
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
  if (lower.includes("adc exam") || lower.includes("practice questions") || lower.includes("study center")) links.push(...trustedExternalLinks.icrc);
  if (lower.includes("mandated reporting")) links.push(...trustedExternalLinks.mandatedReporting);
  if (lower.includes("resource") || lower.includes("mat") || lower.includes("crisis") || lower.includes("recovery")) links.push(...trustedExternalLinks.samhsa);
  if (lower.includes("medication") || lower.includes("buprenorphine") || lower.includes("methadone") || lower.includes("naltrexone") || lower.includes("acamprosate") || lower.includes("disulfiram") || lower.includes("antidepressant") || lower.includes("antipsychotic")) links.push(...trustedExternalLinks.medicationInfo);
  if (lower.includes("moud") || lower.includes("opioid use disorder") || lower.includes("buprenorphine") || lower.includes("methadone")) links.push(...trustedExternalLinks.moud);
  if (lower.includes("alcohol use disorder") || lower.includes("acamprosate") || lower.includes("disulfiram")) links.push(...trustedExternalLinks.audMeds);
  if (lower.includes("naloxone") || lower.includes("overdose")) links.push(...trustedExternalLinks.naloxone);
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
  "/kai-shin-procentive/companion": {
    examples: [
      "Workflow: paste presenting problem first, then substance use history, then risk/strengths, then ASAM summary, then recommendations.",
      "Quality check: each field should answer a different question and should not contradict another field.",
    ],
  },
};

function defaultRelatedFor(path: string, section: string) {
  const base = [
    "/clinical-decision-navigator/navigator",
    "/client-workflow/workflow",
    "/group-therapy-hub/planner",
    "/resource-hub/resources",
    "/kai-shin/hub",
  ];
  const sectionLinks: Record<string, string[]> = {
    "Client Communication Toolkit": [
      "/client-workflow/workflow",
      "/ethics-compliance/confidentiality",
      "/clinical-decision-navigator/navigator",
    ],
    "12 Core Functions": [
      "/clinical-decision-navigator/navigator",
      "/client-workflow/workflow",
      "/ethics-compliance/documentation-compliance",
    ],
    "Ethics & Compliance": [
      "/client-workflow/workflow",
      "/clinical-decision-navigator/navigator",
      "/core-functions/consultation",
    ],
    "Kai-Shin Hub": [
      "/clinical-decision-navigator/navigator",
      "/client-workflow/workflow",
      "/resource-hub/resources",
    ],
    "Group Therapy Hub": [
      "/clinical-decision-navigator/navigator",
      "/client-workflow/workflow",
      "/core-functions/counseling",
    ],
  };

  return [...(sectionLinks[section] ?? []), ...base]
    .filter((link, index, links) => link !== path && links.indexOf(link) === index)
    .slice(0, 8);
}

export type TopicBlock = {
  title: string;
  items: string[];
};

export function getTopicBlocks(page: ContentPage): TopicBlock[] {
  const specific = specificTopicBlocks[page.path];
  if (specific) return specific;

  const title = page.title;
  const lowerTitle = title.toLowerCase();
  const section = page.section;

  if (page.path === "/assessments/comprehensive-assessment") {
    return [
      {
        title: "Assessment map",
        items: [
          "Start with why the person is being assessed now: self-referral, court/probation, family concern, treatment transfer, use recurrence, safety concern, or program requirement.",
          "Build the clinical story across substance use, mental health, medical issues, legal concerns, education/employment, family/social context, recovery environment, strengths, and barriers.",
          "End with DSM-5 diagnostic impression, ASAM placement summary, treatment recommendations, and initial treatment plan themes.",
        ],
      },
      {
        title: "Questions that actually help",
        items: [
          "What substance or behavior is causing the most current concern?",
          "When was last use, how often is use happening, and what consequences are showing up?",
          "What has helped before, even briefly?",
          "What makes recovery harder at home, work, school, legally, medically, or emotionally?",
          "What does the person want to be different 30 days from now?",
        ],
      },
      {
        title: "Documentation starters",
        items: [
          "Presenting Problem: The individual presents for assessment due to [current reason], reporting [pattern/concern] affecting [life areas].",
          "Strengths: The individual identifies [supports/skills/values/prior success] as recovery assets.",
          "Recommendations: Based on reported history and current needs, treatment should focus on [relapse prevention/coping/supports/coordination].",
        ],
      },
      {
        title: "Clinical traps to avoid",
        items: [
          "Do not turn the assessment into a transcript. Summarize patterns and clinical meaning.",
          "Do not write an ASAM rating without evidence.",
          "Do not forget strengths, readiness, and recovery environment.",
          "Do not include client identifiers in learning notes or examples.",
        ],
      },
    ];
  }

  if (lowerTitle.includes("asam")) {
    return [
      {
        title: "Dimension-by-dimension use",
        items: [
          "Dimension 1: intoxication, withdrawal, last use, detox risk, history of severe withdrawal.",
          "Dimension 2: medical conditions, pain, medications, pregnancy, sleep, nutrition, health access.",
          "Dimension 3: mental health symptoms, cognition, trauma impact, safety, coping, behavioral risk.",
          "Dimension 4: motivation, insight, ambivalence, treatment engagement, readiness barriers.",
          "Dimension 5: cravings, triggers, recurrence pattern, coping plan, sober supports.",
          "Dimension 6: housing, relationships, transportation, work/school, legal stressors, substances in environment.",
        ],
      },
      {
        title: "Wording formula",
        items: [
          "Dimension [#] risk is assessed as [0-4] based on [specific evidence].",
          "Current need is [monitoring, stabilization, relapse prevention, coping skill development, referral, or case management].",
          "This connects to treatment planning by [goal/objective/intervention].",
        ],
      },
      {
        title: "Examples",
        items: [
          "Dimension 5 risk appears elevated due to recent recurrence, cravings, and limited coping plan.",
          "Dimension 4 risk appears moderate due to ambivalence about abstinence while continuing to attend sessions.",
          "Dimension 6 risk appears high due to unstable housing and regular exposure to substance use in the home.",
        ],
      },
    ];
  }

  if (lowerTitle.includes("dsm")) {
    return [
      {
        title: "How to think about criteria",
        items: [
          "Look for a pattern of impaired control, social impairment, risky use, and pharmacological indicators.",
          "Do not diagnose from one consequence alone; identify a pattern over the relevant timeframe.",
          "Use severity specifiers carefully and follow site/supervisor guidance.",
        ],
      },
      {
        title: "Information to gather",
        items: [
          "Substance, frequency, amount, route, last use, tolerance, withdrawal, unsuccessful cut-down attempts.",
          "Role impairment, relationship impact, risky situations, cravings, continued use despite consequences.",
          "Periods of remission or sustained recovery.",
        ],
      },
      {
        title: "Documentation examples",
        items: [
          "Reported history is consistent with substance use disorder criteria including cravings, continued use despite consequences, and impaired role functioning.",
          "Further diagnostic clarification is recommended due to incomplete information about duration, tolerance, and withdrawal.",
        ],
      },
    ];
  }

  if (section === "Documentation") return documentationBlocks(page);
  if (section === "Treatment Planning") return treatmentBlocks(page);
  if (section === "Clinical Wording Library") return wordingBlocks(page);
  if (section === "Client Explanation Scripts" || section === "Client Scripts Library" || section === "Client Communication Toolkit") return scriptBlocks(page);
  if (section === "Group Therapy Hub" || lowerTitle.includes("group")) return groupBlocks(page);
  if (section === "Clinical Toolbox") return toolboxBlocks(page);
  if (section === "Medications") return medicationBlocks(page);
  if (section === "12 Core Functions") return coreBlocks(page);
  if (section === "Ethics & Compliance") return ethicsBlocks(page);
  if (section === "Procentive Workflow" || section === "Kai-Shin Hub") return procentiveBlocks(page);
  if (section === "Resource Hub") return resourceBlocks(page);
  if (section === "Internship Survival Guide" || section === "Internship & Licensure") return internshipBlocks(page);
  if (section === "Website Library") return websiteBlocks(page);

  return [
    {
      title: `${title} in practice`,
      items: [
        `${title} should help the counselor decide what to do next, what to document, and what related tool to open.`,
        "Add program-specific content, supervision notes, and examples as this section develops.",
      ],
    },
  ];
}

const specificTopicBlocks: Record<string, TopicBlock[]> = {
  "/documentation/progress-notes": [
    {
      title: "DAP note anatomy",
      items: [
        "Data: session focus, client statements, observed behavior, counselor intervention, skills practiced, risk updates, and clinically relevant events.",
        "Assessment: counselor’s clinical impression of progress, barriers, readiness, risk, symptoms, or connection to treatment goals.",
        "Plan: next appointment focus, homework, referral follow-up, safety step, treatment plan update, or supervision/consultation need.",
      ],
    },
    {
      title: "Strong progress note examples",
      items: [
        "D: Session focused on weekend cravings and conflict at home. Counselor used MI reflections and relapse prevention planning. Client identified two high-risk situations.",
        "A: Client demonstrates increased awareness of triggers but continues to need coping practice and support planning.",
        "P: Continue relapse prevention work, review coping card next session, and monitor Dimension 5 recurrence risk.",
      ],
    },
    {
      title: "Weak note → stronger note",
      items: [
        "Weak: Client talked about relapse. Stronger: Client processed recent recurrence, identified trigger sequence, and practiced two coping responses for future high-risk situations.",
        "Weak: Client was resistant. Stronger: Client expressed ambivalence about abstinence and identified both perceived benefits and consequences of continued use.",
      ],
    },
  ],
  "/documentation/group-notes": [
    {
      title: "Group note anatomy",
      items: [
        "Topic: what the group was about and why it mattered clinically.",
        "Intervention: psychoeducation, skills practice, worksheet, discussion, role play, MI exercise, CBT activity, or relapse prevention planning.",
        "Participation: attendance alone is not enough; note engagement, response, insight, skill practice, or barriers.",
        "Plan: next group focus, practice assignment, or treatment plan connection.",
      ],
    },
    {
      title: "Group note wording",
      items: [
        "Group focused on identifying relapse warning signs and early coping responses. Counselor provided psychoeducation and facilitated a trigger-mapping activity.",
        "Participant engaged in discussion and identified one personal warning sign and one support contact. Plan is to continue relapse prevention skill practice.",
      ],
    },
    {
      title: "Common group documentation problems",
      items: [
        "Only documenting the topic, not the intervention.",
        "Writing the same participation sentence for every person.",
        "Including unnecessary personal disclosures from other group members.",
        "Forgetting the treatment plan or ASAM connection.",
      ],
    },
  ],
  "/treatment-planning/problem-statements": [
    {
      title: "Problem statement formula",
      items: [
        "Name the clinical barrier without blaming the person.",
        "Tie the problem to assessment findings: cravings, withdrawal risk, recurrence, ambivalence, coping deficits, legal stress, mental health symptoms, or recovery environment.",
        "Keep it broad enough to support services, but specific enough to guide goals.",
      ],
    },
    {
      title: "Examples by presentation",
      items: [
        "Alcohol: Recovery stability is affected by alcohol cravings, high-risk social situations, and limited refusal skills.",
        "Opioids: Recovery and safety are affected by opioid cravings, overdose risk, and need for coordinated recovery support.",
        "Stimulants: Recovery stability is affected by stimulant use patterns, sleep disruption, and difficulty managing emotional triggers.",
        "Co-occurring: Substance use recovery is complicated by anxiety symptoms and limited coping strategies.",
      ],
    },
  ],
  "/treatment-planning/goals": [
    {
      title: "Good goal qualities",
      items: [
        "Client-centered: sounds like something the person can understand.",
        "Recovery-oriented: points toward stability, health, coping, support, safety, or functioning.",
        "Connected: clearly follows from assessment findings and ASAM needs.",
      ],
    },
    {
      title: "Goal examples",
      items: [
        "Increase recovery stability and reduce recurrence risk.",
        "Strengthen coping skills for cravings and emotional stressors.",
        "Improve ability to maintain recovery-supportive routines.",
        "Build sober support and reduce isolation.",
      ],
    },
  ],
  "/treatment-planning/objectives": [
    {
      title: "Objective formula",
      items: [
        "Client will + observable action + number/frequency/timeframe.",
        "Use objectives that can be reviewed in session.",
        "Avoid vague objectives such as “understand addiction” unless paired with a concrete behavior.",
      ],
    },
    {
      title: "Objective examples",
      items: [
        "Client will identify three personal triggers and three coping responses within 30 days.",
        "Client will develop a written relapse prevention plan by the next treatment plan review.",
        "Client will attend two recovery-supportive activities weekly and process barriers in session.",
      ],
    },
  ],
  "/treatment-planning/interventions": [
    {
      title: "Intervention formula",
      items: [
        "Counselor will + clinical method + purpose.",
        "Name the intervention: MI, CBT, psychoeducation, relapse prevention planning, skills rehearsal, referral coordination, safety planning.",
        "Match the intervention to the objective and assessed need.",
      ],
    },
    {
      title: "Intervention examples",
      items: [
        "Counselor will use MI to explore ambivalence and strengthen change talk related to substance use goals.",
        "Counselor will use CBT skill practice to help client identify thoughts, feelings, triggers, and alternative coping responses.",
        "Counselor will provide relapse prevention education and support development of a written prevention plan.",
      ],
    },
  ],
  "/assessments/risk-safety-assessment": [
    {
      title: "Risk areas to clarify",
      items: [
        "Suicidal ideation, intent, plan, access to means, past attempts, protective factors, and current supports.",
        "Homicidal ideation or threats, duty-to-warn concerns, violence risk, and immediate safety needs.",
        "Overdose risk, withdrawal risk, intoxication, impaired driving, unsafe environment, exploitation, or medical instability.",
      ],
    },
    {
      title: "Safety documentation",
      items: [
        "Document what was asked, what was reported or observed, risk level, protective factors, consultation, safety plan, referrals, and follow-up.",
        "Use agency crisis policy and supervision immediately when risk is elevated.",
      ],
    },
  ],
  "/client-communication/confidentiality": [
    {
      title: "Plain-language explanation",
      items: [
        "Most of what you share is private.",
        "There are exceptions related to safety, abuse/neglect reporting, court/legal requirements, and situations where you sign permission for information to be shared.",
        "If something comes up that may require action, I will explain what is happening and involve you as much as possible.",
      ],
    },
    {
      title: "Questions clients often ask",
      items: [
        "Will my probation officer know? Answer depends on releases, court requirements, and agency policy.",
        "Will my family know? Not without proper permission unless a legal/safety exception applies.",
        "Can I choose what is shared? In many cases, releases can specify what information is shared and with whom.",
      ],
    },
  ],
  "/ethics-compliance/42-cfr-part-2": [
    {
      title: "Practical meaning",
      items: [
        "42 CFR Part 2 adds confidentiality protections for certain substance use disorder treatment records.",
        "Do not assume HIPAA permission automatically means SUD treatment information can be shared.",
        "Check agency policy, valid consent, redisclosure language, and supervision when unsure.",
      ],
    },
    {
      title: "Counselor decision checklist",
      items: [
        "Is this a Part 2 record?",
        "Who is requesting information?",
        "Is there a valid written consent or legal exception?",
        "What exactly can be disclosed?",
        "Does the client understand what they are authorizing?",
      ],
    },
  ],
  "/ethics-compliance/hipaa": [
    {
      title: "Practical meaning",
      items: [
        "HIPAA protects individually identifiable health information held by covered entities and business associates.",
        "It sets limits on use/disclosure and gives people rights related to their health information.",
        "For SUD treatment records, also check 42 CFR Part 2 and agency policy.",
      ],
    },
    {
      title: "LADC intern reminders",
      items: [
        "Do not use real client details in personal notes, AI tools, screenshots, or study examples.",
        "Use minimum necessary information when discussing care.",
        "Ask supervision before sharing anything that feels uncertain.",
      ],
    },
  ],
  "/ethics-compliance/245g": [
    {
      title: "Practical meaning",
      items: [
        "245G is a Minnesota substance use disorder treatment services statute area and should be read alongside agency policy.",
        "For an intern, the key is knowing that documentation, assessment, treatment planning, and service delivery are compliance-sensitive.",
        "Use official statute resources and supervision rather than relying on memory.",
      ],
    },
    {
      title: "How it shows up in daily work",
      items: [
        "Assessment requirements and timelines.",
        "Treatment plan and review expectations.",
        "Documentation standards.",
        "Policies, client rights, and service coordination.",
      ],
    },
  ],
  "/clinical-toolbox/motivational-interviewing": [
    {
      title: "MI in real use",
      items: [
        "Use MI when the client feels mixed, pressured, unsure, defensive, or not ready.",
        "Listen for change talk: desire, ability, reasons, need, commitment, activation, taking steps.",
        "Use OARS: open questions, affirmations, reflections, summaries.",
      ],
    },
    {
      title: "Useful prompts",
      items: [
        "What do you like about using, and what concerns you about it?",
        "Where does this fit with what you want for yourself?",
        "On a scale of 0-10, how important is change right now? Why that number and not lower?",
      ],
    },
  ],
  "/clinical-toolbox/cbt-tools": [
    {
      title: "CBT in SUD counseling",
      items: [
        "Map situation → thought → feeling → urge → behavior → consequence.",
        "Identify patterns that increase use risk.",
        "Practice alternative thoughts, coping actions, and refusal skills.",
      ],
    },
    {
      title: "Session activities",
      items: [
        "Trigger chain analysis.",
        "Thought record tied to cravings.",
        "Coping card for high-risk moments.",
        "Behavioral activation plan for recovery-supportive routines.",
      ],
    },
  ],
  "/clinical-toolbox/relapse-prevention": [
    {
      title: "Relapse prevention targets",
      items: [
        "Warning signs, triggers, cravings, high-risk routines, emotional states, support gaps, and recovery drift.",
        "Early intervention steps before use happens.",
        "Post-recurrence plan that reduces shame and increases learning.",
      ],
    },
    {
      title: "Plan components",
      items: [
        "Top five triggers.",
        "Three coping actions.",
        "Three support contacts.",
        "Emergency/safety steps.",
        "What to do after a lapse.",
      ],
    },
  ],
};

function documentationBlocks(page: ContentPage): TopicBlock[] {
  const title = page.title;
  return [
    {
      title: `${title} structure`,
      items: [
        "Service focus: what the contact/session/group was about.",
        "Counselor intervention: MI, CBT skill, psychoeducation, crisis response, case management, referral, review, or planning.",
        "Client response: engagement, insight, barriers, skill practice, questions, refusal, or follow-up need.",
        "Clinical link: treatment plan goal, ASAM need, risk issue, referral need, or discharge plan.",
      ],
    },
    {
      title: "Sample language",
      items: [
        "Counselor met with client to address [topic]. Counselor used [intervention]. Client responded by [observable response].",
        "Progress is noted in [goal area] as evidenced by [specific behavior/report]. Continued focus is needed on [barrier/skill].",
        "Plan is to [next step], monitor [risk/need], and review [homework/referral/support] at next contact.",
      ],
    },
    {
      title: "What makes the note stronger",
      items: [
        "Specific intervention instead of vague support.",
        "Observable client response instead of judgment.",
        "Clear tie to treatment plan or assessed need.",
        "Next step that another counselor could understand.",
      ],
    },
  ];
}

function treatmentBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Assessment-to-plan translation",
      items: [
        "Assessment finding: cravings, recurrence, withdrawal risk, ambivalence, mental health symptoms, legal pressure, or recovery environment barrier.",
        "Problem statement: phrase the barrier without blame.",
        "Goal: state the recovery direction.",
        "Objective: make the next step observable or reviewable.",
        "Intervention: describe what the counselor or program will do.",
      ],
    },
    {
      title: "Disorder-specific examples",
      items: [
        "Stimulant use: build sleep/routine stabilization, trigger planning, refusal skills, emotional regulation, and support accountability.",
        "Opioid use: include overdose prevention, MAT coordination when appropriate, cravings plan, recovery supports, and safety planning.",
        "Alcohol use: assess withdrawal risk, high-risk situations, coping skills, sober supports, and medical coordination.",
        "Cannabis use: connect use pattern to motivation, functioning, legal/work/school impact, coping alternatives, and relapse prevention.",
      ],
    },
    {
      title: "Strong wording examples",
      items: [
        "Problem: Recovery stability is affected by cravings and limited coping responses during high-risk situations.",
        "Goal: Increase ability to maintain recovery during emotional and environmental stressors.",
        "Objective: Identify three triggers and practice three coping strategies within 30 days.",
        "Intervention: Counselor will use MI, CBT skill practice, psychoeducation, and relapse prevention planning.",
      ],
    },
  ];
}

function wordingBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Use this wording pattern",
      items: [
        "Start with observable or reported information.",
        "Add clinical meaning only when supported.",
        "Connect the statement to ASAM, diagnosis, treatment plan, or next step.",
        "Keep language respectful, concise, and field-ready.",
      ],
    },
    {
      title: "Replace weak wording",
      items: [
        "Instead of “unmotivated,” write “reports ambivalence about changing use and identified mixed reasons for change.”",
        "Instead of “noncompliant,” write “missed two appointments; barriers to attendance will be reviewed.”",
        "Instead of “denies problem,” write “does not currently identify substance use as primary concern.”",
      ],
    },
    {
      title: "Copy/paste starters",
      items: [
        "The individual reports [pattern] with impact on [life area].",
        "Current presentation suggests need for [skill/referral/monitoring/support].",
        "Counselor will continue to assess [risk/need] and support [goal/objective].",
      ],
    },
  ];
}

function scriptBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Plain-language script",
      items: [
        "“I want to explain this in regular language before we move forward.”",
        "“This helps us understand what support fits, what choices you have, and what information is needed.”",
        "“You can ask questions, slow me down, or tell me if something does not make sense.”",
      ],
    },
    {
      title: "If the client asks why",
      items: [
        "“The reason we ask is to understand safety, support, and treatment needs.”",
        "“This is not about judging you. It helps us match care to what is actually happening.”",
        "“Some forms also protect your rights and clarify what information can be shared.”",
      ],
    },
    {
      title: "If the client refuses",
      items: [
        "“That is your choice. I can explain what we can still do and what may be limited without it.”",
        "“Can you tell me what concerns you about signing or answering that?”",
        "“We can pause and bring this back after you have more information.”",
      ],
    },
  ];
}

function groupBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Group plan ingredients",
      items: [
        "Topic: one focused recovery theme.",
        "Opening question: safe, concrete, and related to the topic.",
        "Skill or activity: something clients practice, not just discuss.",
        "Processing questions: connect insight to behavior and recovery goals.",
        "Documentation language: topic, intervention, participation, response, plan.",
      ],
    },
    {
      title: "Usable topic ideas",
      items: [
        "Relapse warning signs and early intervention.",
        "Cravings: urge surfing, delay, distract, decide.",
        "High-risk people, places, and routines.",
        "Values and recovery motivation.",
        "Repairing trust and communicating needs.",
      ],
    },
    {
      title: "Group note starter",
      items: [
        "Group focused on [topic]. Counselor provided [psychoeducation/skill practice/activity]. Participant [engagement level] and identified [skill/insight]. Plan is to continue practicing [next step].",
      ],
    },
  ];
}

function toolboxBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Use during session",
      items: [
        "Choose one concrete tool that matches the client’s current need.",
        "Explain why the tool fits before using it.",
        "Ask the client to apply it to a real situation from the week.",
        "End with one practice step or homework item.",
      ],
    },
    {
      title: "Counselor prompts",
      items: [
        "What happened before the urge or behavior?",
        "What did the client try already?",
        "What would make this plan realistic outside the office?",
        "What support or barrier needs to be addressed?",
      ],
    },
  ];
}

type MedicationGuide = {
  category: string;
  names: string[];
  usedFor: string[];
  counselorFocus: string[];
  assessmentQuestions: string[];
  documentation: string[];
  clientExplanation: string[];
  cautions: string[];
};

const medicationGuides: Record<string, MedicationGuide> = {
  "/medications/overview": {
    category: "Medication reference overview",
    names: [
      "MOUD/MAT medications for opioid use disorder: buprenorphine, methadone, naltrexone.",
      "Alcohol use disorder medications: naltrexone, acamprosate, disulfiram.",
      "Overdose reversal: naloxone.",
      "Co-occurring mental health medication categories: antidepressants, anti-anxiety medications, mood stabilizers, antipsychotics.",
    ],
    usedFor: [
      "Supporting recovery, reducing cravings or withdrawal risk, treating co-occurring mental health symptoms, preventing overdose death, and improving stability when prescribed by qualified medical providers.",
      "Helping counselors understand what clients are talking about, what questions to ask, and when to coordinate care or refer to medical providers.",
    ],
    counselorFocus: [
      "Counselors do not prescribe. The counseling role is education, screening for medication-related barriers, supporting adherence goals, coordinating with releases, and knowing when to refer medical questions.",
      "Medication information should be documented as client report unless verified by medical records or provider communication.",
    ],
    assessmentQuestions: [
      "What medications are you currently prescribed, and who prescribes them?",
      "Are you taking them as prescribed? If not, what gets in the way?",
      "Any side effects, missed doses, cost barriers, transportation barriers, or concerns about stigma?",
      "Any recent medication changes, detox medications, MAT/MOUD, psychiatric medications, or overdose reversal kit access?",
    ],
    documentation: [
      "Client reports current prescription for [medication] from [provider type if known] and reports [adherence/barrier/side effect concern].",
      "Counselor encouraged client to discuss medication questions with prescriber and obtained ROI for coordination as appropriate.",
    ],
    clientExplanation: [
      "Medication can be one support in recovery or mental health care. A medical provider decides what is appropriate. My role is to understand how it affects your treatment goals and help coordinate support if you want that.",
    ],
    cautions: [
      "Do not give dosing advice.",
      "Do not tell clients to start, stop, or change medication.",
      "Refer urgent side effects, withdrawal risk, overdose risk, pregnancy-related medication questions, and medication interactions to medical providers immediately.",
    ],
  },
  "/medications/moud-opioid-use-disorder": {
    category: "MOUD / MAT",
    names: [
      "Buprenorphine: Suboxone, Subutex, Sublocade, Brixadi, Zubsolv, Bunavail depending on formulation.",
      "Methadone: commonly dispensed through opioid treatment programs.",
      "Naltrexone: oral naltrexone or extended-release injectable Vivitrol.",
    ],
    usedFor: [
      "Medications for opioid use disorder are used to reduce withdrawal, cravings, illicit opioid use, and overdose risk as part of a broader recovery plan.",
      "Medication choice depends on medical evaluation, client preference, access, pregnancy status, opioid tolerance, treatment history, and provider guidance.",
    ],
    counselorFocus: [
      "Normalize MOUD as evidence-based treatment, not “replacing one addiction with another.”",
      "Assess stigma, access barriers, missed doses, transportation, clinic attendance, cravings, continued use, overdose history, and recovery supports.",
      "Coordinate with OTP/MOUD prescriber only with proper release and within agency policy.",
    ],
    assessmentQuestions: [
      "Have you ever been prescribed methadone, buprenorphine, or naltrexone?",
      "What worked or did not work about it?",
      "Any missed doses, cravings, withdrawal symptoms, continued opioid use, or side effects?",
      "Do you have naloxone available?",
    ],
    documentation: [
      "Client reports current MOUD with [medication/provider] and identifies [benefit/barrier].",
      "Counselor provided education that MOUD can be part of evidence-based OUD treatment and encouraged prescriber follow-up for medication questions.",
    ],
    clientExplanation: [
      "MOUD means medication is being used to support opioid recovery. It can reduce cravings and withdrawal and lower overdose risk. It works best when paired with counseling, support, and medical follow-up.",
    ],
    cautions: [
      "Do not frame MOUD as a failure of recovery.",
      "Do not advise dose changes.",
      "Be alert for sedation, intoxication, missed doses, diversion concerns, pregnancy questions, or overdose risk and follow policy.",
    ],
  },
  "/medications/buprenorphine": {
    category: "MOUD / partial opioid agonist",
    names: [
      "Generic: buprenorphine.",
      "Combination: buprenorphine/naloxone.",
      "Common brand/formulation names include Suboxone, Subutex, Sublocade, Brixadi, Zubsolv, and Bunavail.",
    ],
    usedFor: [
      "Used to treat opioid use disorder by reducing withdrawal symptoms and cravings.",
      "May be prescribed in office-based settings or other approved treatment settings depending on provider and formulation.",
    ],
    counselorFocus: [
      "Ask about adherence, cravings, missed doses, side effects, continued opioid use, access barriers, and stigma.",
      "Support treatment engagement and coordinate with prescriber with valid ROI.",
    ],
    assessmentQuestions: [
      "When did you start buprenorphine and what formulation are you prescribed?",
      "Any cravings, withdrawal, sedation, missed doses, or continued opioid use?",
      "Any trouble filling prescriptions, attending appointments, or taking it as prescribed?",
    ],
    documentation: [
      "Client reports buprenorphine treatment and states it has [reduced/not reduced] cravings and withdrawal.",
      "Client identified barrier to medication adherence as [barrier]; counselor encouraged prescriber follow-up.",
    ],
    clientExplanation: [
      "Buprenorphine is a medication used for opioid use disorder. Many people use it to reduce withdrawal and cravings while they work on recovery goals.",
    ],
    cautions: [
      "Medication questions about dose, side effects, pregnancy, sedation, or interactions should go to the prescriber.",
      "Alcohol, benzodiazepines, and other sedating substances can increase safety risk and should be addressed clinically/medically.",
    ],
  },
  "/medications/methadone": {
    category: "MOUD / full opioid agonist",
    names: [
      "Generic: methadone.",
      "Often provided for OUD through certified opioid treatment programs.",
    ],
    usedFor: [
      "Used to treat opioid use disorder by reducing withdrawal and cravings and supporting stabilization.",
      "May be especially relevant for people who need structured daily dosing or have not stabilized on other options.",
    ],
    counselorFocus: [
      "Ask about OTP attendance, take-home doses, sedation, cravings, continued opioid use, transportation, and coordination needs.",
      "Understand clinic attendance and dosing routines may affect treatment scheduling.",
    ],
    assessmentQuestions: [
      "Are you currently enrolled in a methadone clinic or OTP?",
      "Any missed doses, cravings, sedation, continued use, or transportation barriers?",
      "Do you want coordination between this program and the OTP?",
    ],
    documentation: [
      "Client reports methadone treatment through [OTP if known] and identifies [benefit/barrier].",
      "ROI discussed for coordination with OTP; client [accepted/declined] at this time.",
    ],
    clientExplanation: [
      "Methadone is a medication used for opioid use disorder that can reduce withdrawal and cravings. It is usually provided through a structured clinic program.",
    ],
    cautions: [
      "Do not interpret dose adequacy; refer to OTP/prescriber.",
      "Sedation, missed doses, alcohol/benzodiazepine use, or overdose risk require prompt clinical attention and policy follow-up.",
    ],
  },
  "/medications/naltrexone": {
    category: "Opioid antagonist / AUD and OUD medication",
    names: [
      "Generic: naltrexone.",
      "Brand/formulation: Vivitrol is extended-release injectable naltrexone.",
    ],
    usedFor: [
      "Used for alcohol use disorder to reduce rewarding effects/cravings for some people.",
      "Used for opioid use disorder relapse prevention after opioid detoxification because it blocks opioid effects.",
    ],
    counselorFocus: [
      "Clarify whether prescribed for AUD or OUD.",
      "For OUD, assess whether the client understands opioid blockade and overdose risk after stopping.",
      "Ask about adherence, injection appointments, cravings, side effects, and medical follow-up.",
    ],
    assessmentQuestions: [
      "Is naltrexone prescribed for alcohol use, opioid use, or both?",
      "When was the last injection or dose?",
      "Any cravings, return to use, side effects, or missed appointments?",
    ],
    documentation: [
      "Client reports naltrexone treatment for [AUD/OUD] and reports [effect/barrier].",
      "Counselor encouraged client to discuss medication questions with prescriber.",
    ],
    clientExplanation: [
      "Naltrexone is a medication that can reduce alcohol reward/craving for some people and can block opioid effects when used for opioid recovery.",
    ],
    cautions: [
      "Clients must discuss opioid use, pain treatment, and medical procedures with prescriber.",
      "Do not advise starting naltrexone after opioid use; medical evaluation is required.",
    ],
  },
  "/medications/naloxone": {
    category: "Overdose reversal / harm reduction",
    names: [
      "Generic: naloxone.",
      "Common brand/formulations include Narcan nasal spray and other naloxone products.",
    ],
    usedFor: [
      "Used to reverse opioid overdose effects temporarily and restore breathing while emergency help is obtained.",
      "Important for clients using opioids, returning to use after abstinence, using alone, or exposed to fentanyl risk.",
    ],
    counselorFocus: [
      "Ask if client has naloxone, knows how to use it, and has told support people where it is.",
      "Use overdose education as safety planning, not judgment.",
    ],
    assessmentQuestions: [
      "Do you have naloxone available?",
      "Have you or someone close to you ever experienced an overdose?",
      "Do people around you know where naloxone is and how to use it?",
    ],
    documentation: [
      "Counselor provided overdose prevention education and discussed naloxone access.",
      "Client reports [has/does not have] naloxone and was provided information about access options.",
    ],
    clientExplanation: [
      "Naloxone is an emergency medication that can reverse an opioid overdose long enough to get help. It is a safety tool, like a fire extinguisher.",
    ],
    cautions: [
      "Naloxone is not a substitute for emergency medical care.",
      "Overdose risk can return after naloxone wears off; call emergency services according to training/policy.",
    ],
  },
  "/medications/alcohol-use-disorder-medications": {
    category: "AUD medication overview",
    names: [
      "Naltrexone.",
      "Acamprosate.",
      "Disulfiram.",
    ],
    usedFor: [
      "Used as part of alcohol use disorder treatment to support abstinence or reduced alcohol use goals depending on medication, medical guidance, and client goals.",
      "Medication is typically combined with counseling, recovery supports, relapse prevention, and medical monitoring.",
    ],
    counselorFocus: [
      "Ask about cravings, drinking pattern, abstinence goals, liver/medical concerns, adherence, side effects, and prescriber follow-up.",
      "Normalize medication as one recovery support option.",
    ],
    assessmentQuestions: [
      "Have you ever tried medication to support alcohol recovery?",
      "What was helpful or not helpful?",
      "Are cravings, withdrawal concerns, or return-to-drinking patterns current issues?",
    ],
    documentation: [
      "Client expressed interest in medication options for AUD; counselor encouraged medical provider consultation.",
      "Client reports current AUD medication and identifies [benefit/barrier].",
    ],
    clientExplanation: [
      "Some medications can support alcohol recovery by helping with cravings, maintaining abstinence, or creating a safety consequence if alcohol is used. A medical provider decides what fits.",
    ],
    cautions: [
      "Withdrawal risk from alcohol can be medically serious; refer to medical/detox assessment when indicated.",
      "Do not give dosing or medication selection advice.",
    ],
  },
  "/medications/acamprosate": {
    category: "AUD medication",
    names: ["Generic: acamprosate.", "Brand: Campral."],
    usedFor: [
      "Used to support maintenance of abstinence from alcohol for some people after they have stopped drinking.",
      "Often discussed as part of relapse prevention and recovery stabilization.",
    ],
    counselorFocus: [
      "Ask about abstinence goal, adherence, side effects, cravings, and prescriber follow-up.",
      "Explore practical barriers because acamprosate may involve multiple daily doses.",
    ],
    assessmentQuestions: [
      "What goal did your prescriber connect this medication to?",
      "Any missed doses or side effects?",
      "How are cravings and high-risk situations currently?",
    ],
    documentation: [
      "Client reports acamprosate prescription to support alcohol abstinence and reports [benefit/barrier].",
      "Counselor reviewed relapse prevention supports and encouraged prescriber follow-up for medication questions.",
    ],
    clientExplanation: [
      "Acamprosate is a medication some people use after stopping alcohol to support ongoing abstinence.",
    ],
    cautions: [
      "Medical provider should address kidney concerns, dosing, side effects, and fit.",
      "Counselor should not present it as a standalone treatment.",
    ],
  },
  "/medications/disulfiram": {
    category: "AUD medication / alcohol deterrent",
    names: ["Generic: disulfiram.", "Brand: Antabuse."],
    usedFor: [
      "Used to support abstinence by causing an unpleasant and potentially serious reaction if alcohol is consumed.",
      "Works best when the client fully understands the reaction and has strong support/monitoring.",
    ],
    counselorFocus: [
      "Assess understanding, informed consent, adherence, alcohol exposure risk, motivation, and prescriber follow-up.",
      "Explore whether the client knows hidden alcohol sources can matter, such as some products or medications, depending on prescriber guidance.",
    ],
    assessmentQuestions: [
      "What did your prescriber explain about alcohol reactions?",
      "What is your plan if you feel tempted to drink?",
      "Any missed doses, side effects, or alcohol exposure?",
    ],
    documentation: [
      "Client reports disulfiram prescription and verbalizes understanding that alcohol use can cause serious reaction.",
      "Counselor encouraged client to follow prescriber guidance and reviewed relapse prevention supports.",
    ],
    clientExplanation: [
      "Disulfiram is a medication that can make drinking alcohol cause a very unpleasant or serious reaction. It requires careful medical guidance.",
    ],
    cautions: [
      "Do not minimize the alcohol-disulfiram reaction.",
      "Refer all side effect, alcohol exposure, and medication interaction questions to prescriber.",
    ],
  },
  "/medications/withdrawal-support-medications": {
    category: "Withdrawal support / detox-related medications",
    names: [
      "Alcohol withdrawal may involve benzodiazepines or other medically supervised protocols.",
      "Opioid withdrawal support may involve buprenorphine, methadone, clonidine, lofexidine, or symptom-targeted medications depending on provider.",
      "Thiamine and other vitamin/medical supports may be used in alcohol-related medical care.",
    ],
    usedFor: [
      "Used by medical providers to reduce withdrawal risk, manage symptoms, and prevent complications.",
      "Withdrawal management can require detox, emergency care, or medical monitoring depending on severity.",
    ],
    counselorFocus: [
      "Screen for last use, withdrawal history, seizures, delirium tremens, overdose risk, pregnancy, medical conditions, and current symptoms.",
      "Know when to refer to detox/medical assessment instead of routine outpatient counseling.",
    ],
    assessmentQuestions: [
      "When was last use?",
      "What withdrawal symptoms are happening now?",
      "Any history of seizures, hallucinations, delirium tremens, severe vomiting, blackouts, or medical detox?",
      "Any current medications or medical conditions?",
    ],
    documentation: [
      "Client reports withdrawal symptoms including [symptoms]. Counselor referred client for medical evaluation/detox assessment according to policy.",
      "No current withdrawal symptoms reported; history of [risk/no severe withdrawal] noted for ASAM Dimension 1.",
    ],
    clientExplanation: [
      "Withdrawal can be uncomfortable and sometimes medically dangerous. A medical provider can decide what level of support is safest.",
    ],
    cautions: [
      "Alcohol and benzodiazepine withdrawal can be life-threatening.",
      "Do not advise home detox when medical risk may be present.",
      "Follow agency policy for intoxication and withdrawal risk.",
    ],
  },
  "/medications/antidepressants": {
    category: "Psychiatric medication category",
    names: [
      "SSRIs: sertraline, fluoxetine, escitalopram, citalopram, paroxetine.",
      "SNRIs: venlafaxine, duloxetine, desvenlafaxine.",
      "Other examples: bupropion, mirtazapine, trazodone.",
    ],
    usedFor: [
      "Commonly used for depression, anxiety disorders, trauma-related symptoms, and other conditions depending on prescriber.",
      "Can affect recovery by improving mood/anxiety stability or by creating adherence/side effect concerns.",
    ],
    counselorFocus: [
      "Ask what symptoms the medication targets, adherence, side effects, missed doses, and whether substance use affects taking it.",
      "Monitor for mood changes and safety concerns within counseling role.",
    ],
    assessmentQuestions: [
      "What is the medication prescribed for?",
      "How long have you been taking it?",
      "Any side effects, missed doses, or concerns?",
      "Any recent mood changes or safety concerns?",
    ],
    documentation: [
      "Client reports antidepressant medication for [symptom/diagnosis] and reports [adherence/effect/barrier].",
      "Counselor encouraged client to discuss medication concerns with prescriber.",
    ],
    clientExplanation: [
      "Antidepressants are medications some people use for depression, anxiety, trauma symptoms, or related concerns. Your prescriber is the best person for medication questions.",
    ],
    cautions: [
      "Do not advise stopping abruptly.",
      "Escalate suicidal ideation, severe mood changes, mania-like symptoms, or concerning side effects according to policy.",
    ],
  },
  "/medications/anti-anxiety-medications": {
    category: "Psychiatric medication category",
    names: [
      "SSRIs/SNRIs may be used for anxiety.",
      "Buspirone is a non-benzodiazepine anxiety medication.",
      "Hydroxyzine may be used for anxiety symptoms.",
      "Benzodiazepines include alprazolam, clonazepam, lorazepam, diazepam and require caution in SUD settings.",
    ],
    usedFor: [
      "Used to treat anxiety symptoms depending on diagnosis, medical history, and prescriber judgment.",
      "In SUD treatment, sedating or controlled medications require careful coordination and risk awareness.",
    ],
    counselorFocus: [
      "Ask about anxiety symptoms, panic, sleep, trauma triggers, medication adherence, sedation, misuse risk, and combining with alcohol/opioids.",
      "Coordinate with prescriber only with ROI and within policy.",
    ],
    assessmentQuestions: [
      "What anxiety symptoms are you treating?",
      "Any sedation, missed doses, taking more than prescribed, or mixing with alcohol/opioids?",
      "What non-medication coping skills help?",
    ],
    documentation: [
      "Client reports anxiety medication and identifies [benefit/side effect/barrier].",
      "Counselor reviewed coping skills and encouraged prescriber consultation for medication concerns.",
    ],
    clientExplanation: [
      "Some medications can help anxiety, but safety matters, especially with alcohol, opioids, or sedating medications. Your prescriber should guide medication decisions.",
    ],
    cautions: [
      "Benzodiazepines plus alcohol/opioids can increase overdose/sedation risk.",
      "Do not give medication safety clearance; refer to prescriber.",
    ],
  },
  "/medications/mood-stabilizers": {
    category: "Psychiatric medication category",
    names: [
      "Examples include lithium, valproate/divalproex, carbamazepine, lamotrigine, and others depending on diagnosis.",
    ],
    usedFor: [
      "Often used for bipolar disorder, mood instability, seizure-related indications, or other prescriber-determined conditions.",
      "May require lab monitoring depending on medication.",
    ],
    counselorFocus: [
      "Ask about diagnosis, mood episodes, adherence, side effects, monitoring appointments, and substance use impact.",
      "Watch for manic symptoms, depression, safety risk, and medication nonadherence barriers.",
    ],
    assessmentQuestions: [
      "What symptoms or diagnosis is this medication for?",
      "Any recent manic, depressive, or mixed symptoms?",
      "Any lab monitoring or prescriber follow-up needed?",
    ],
    documentation: [
      "Client reports mood stabilizer prescription and reports [stability/barrier/side effect concern].",
      "Counselor encouraged continued prescriber follow-up and monitored mood symptoms within treatment plan.",
    ],
    clientExplanation: [
      "Mood stabilizers are medications some people use to reduce mood swings or stabilize bipolar-type symptoms. Prescribers monitor fit and safety.",
    ],
    cautions: [
      "Medication-specific lab and side effect questions belong with prescriber.",
      "Escalate safety concerns, severe mood changes, or signs of mania/psychosis according to policy.",
    ],
  },
  "/medications/antipsychotic-medications": {
    category: "Psychiatric medication category",
    names: [
      "Examples include risperidone, quetiapine, olanzapine, aripiprazole, ziprasidone, haloperidol, and long-acting injectable formulations.",
    ],
    usedFor: [
      "May be used for psychosis, bipolar disorder, severe mood symptoms, agitation, or other prescriber-determined conditions.",
      "Can be relevant in SUD treatment when symptoms affect safety, cognition, treatment engagement, or relapse risk.",
    ],
    counselorFocus: [
      "Ask about symptoms targeted, adherence, side effects, sedation, restlessness, metabolic concerns, and prescriber follow-up.",
      "Assess whether psychotic or severe mood symptoms are active and affecting safety or treatment participation.",
    ],
    assessmentQuestions: [
      "What symptoms does this medication help with?",
      "Any hallucinations, paranoia, severe mood changes, or safety concerns currently?",
      "Any side effects or missed doses?",
    ],
    documentation: [
      "Client reports antipsychotic medication for [symptom/diagnosis] and reports [benefit/barrier].",
      "Counselor monitored mental health symptoms and encouraged prescriber follow-up.",
    ],
    clientExplanation: [
      "Antipsychotic medications can help with symptoms like psychosis, severe mood instability, or agitation depending on the person’s diagnosis and prescriber plan.",
    ],
    cautions: [
      "Do not interpret medication effectiveness beyond client report and observed functioning.",
      "Active psychosis, severe agitation, or safety risk may require urgent consultation or higher level of care.",
    ],
  },
  "/medications/medication-questions-for-assessment": {
    category: "Assessment tool",
    names: [
      "Medication reconciliation questions.",
      "MAT/MOUD questions.",
      "Psychiatric medication questions.",
      "Adherence and side effect questions.",
    ],
    usedFor: [
      "Used during comprehensive assessment, reassessment, treatment planning, case management, and coordination of care.",
    ],
    counselorFocus: [
      "Identify current medications, prescribers, adherence barriers, side effects, safety concerns, and coordination needs.",
      "Understand how medication affects ASAM Dimensions 2 and 3, and sometimes Dimensions 1, 4, 5, and 6.",
    ],
    assessmentQuestions: [
      "What medications are you currently prescribed?",
      "Who prescribes each medication?",
      "What do you take it for?",
      "Are you taking it as prescribed?",
      "Any side effects, missed doses, cost barriers, transportation barriers, or pharmacy problems?",
      "Any medication for opioid use disorder or alcohol use disorder?",
      "Any overdose reversal medication available, such as naloxone?",
      "Do you want coordination with your prescriber?",
    ],
    documentation: [
      "Client reports current medications include [list as reported]. Client reports [adherence/barriers/side effects].",
      "Medication concerns appear relevant to ASAM Dimension [2/3] and treatment planning due to [reason].",
      "ROI for prescriber coordination was [completed/offered/declined].",
    ],
    clientExplanation: [
      "I ask about medications because they can affect withdrawal risk, mood, safety, cravings, and treatment planning. I will not tell you how to take them; that is for your medical provider.",
    ],
    cautions: [
      "Do not document unverified medication information as fact beyond client report.",
      "Urgent medication reactions, withdrawal concerns, overdose risk, pregnancy questions, or severe side effects need medical consultation.",
    ],
  },
};

export const medicationStaticParams = Object.keys(medicationGuides).map((path) => ({
  section: "medications",
  page: path.replace("/medications/", ""),
}));

function medicationBlocks(page: ContentPage): TopicBlock[] {
  const guide = medicationGuides[page.path] ?? medicationGuides["/medications/overview"];
  return [
    { title: "Category", items: [guide.category] },
    { title: "Generic names and common names", items: guide.names },
    { title: "What it is used for", items: guide.usedFor },
    { title: "What counselors need to pay attention to", items: guide.counselorFocus },
    { title: "Assessment questions", items: guide.assessmentQuestions },
    { title: "Documentation examples", items: guide.documentation },
    { title: "Client-friendly explanation", items: guide.clientExplanation },
    { title: "Safety and scope reminders", items: guide.cautions },
  ];
}

function coreBlocks(page: ContentPage): TopicBlock[] {
  const guide = coreFunctionGuides[page.path];
  if (guide) {
    return [
      { title: "Definition", items: guide.definition },
      { title: "When you use it", items: guide.whenUsed },
      { title: "Forms and documentation connected to it", items: guide.forms },
      { title: "Documentation examples", items: guide.documentation },
      { title: "ASAM, ethics, and clinical connections", items: guide.clinicalConnections },
      { title: "ADC/LADC exam prep points", items: guide.examPrep },
      { title: "Common mistakes", items: guide.mistakes },
    ];
  }

  return [
    {
      title: "What this core function looks like",
      items: [
        "A real counselor task connected to client care, documentation, ethics, and supervision.",
        "A way to categorize internship activity and exam study.",
        "A reminder that addiction counseling includes more than direct counseling sessions.",
      ],
    },
    {
      title: "Internship examples",
      items: [
        "Observe or practice the task with supervision.",
        "Log the core function in internship hours.",
        "Write one reflection about what was learned and one question for supervision.",
      ],
    },
    {
      title: "Exam prep angle",
      items: [
        "Know the purpose of the function.",
        "Know what documentation or forms connect to it.",
        "Know common ethical issues and referral/consultation points.",
      ],
    },
  ];
}

const ethicsGuides: Record<string, TopicBlock[]> = {
  "/ethics-compliance/245g": [
    {
      title: "What 245G means in daily LADC work",
      items: [
        "245G is Minnesota's substance use disorder treatment services statute area. For interns, it matters because assessment, treatment planning, documentation, policies, service delivery, and client rights are not just clinical preferences; they are compliance-sensitive.",
        "Use 245G as a map for what licensed programs must have in place. Use your agency policy for exact workflow, forms, timelines, and supervisor expectations.",
        "In practice, 245G shows up when completing assessments, treatment plans, progress notes, treatment plan reviews, discharge planning, client rights information, and service coordination.",
      ],
    },
    {
      title: "What to pay attention to",
      items: [
        "Assessment content and whether the record explains the client's treatment need.",
        "Treatment plan problems, goals, objectives, interventions, and review dates.",
        "Progress notes that show service provided, client response, and connection to treatment plan.",
        "Discharge planning and continuing care recommendations.",
        "Client rights, grievance process, consent, releases, and confidentiality expectations.",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Assessment documentation should connect history, current need, ASAM dimensions, diagnosis, recommendations, and treatment planning themes.",
        "Progress note: Counselor provided relapse prevention education and facilitated coping-plan practice connected to treatment plan objective on managing cravings.",
        "Treatment plan review: Client made progress toward identifying triggers and continues to need skill practice for high-risk social situations.",
      ],
    },
    {
      title: "Common mistakes",
      items: [
        "Treating 245G as something only supervisors need to know.",
        "Writing notes that do not show a billable/clinical service or treatment plan connection.",
        "Using templates without checking whether the required information is actually present.",
        "Trying to answer compliance questions from memory instead of checking policy, statute, or supervision.",
      ],
    },
  ],
  "/ethics-compliance/hipaa": [
    {
      title: "Core idea",
      items: [
        "HIPAA protects individually identifiable health information. For an LADC intern, the everyday rule is simple: do not disclose, copy, paste, upload, text, email, or discuss identifiable health information unless policy and authorization allow it.",
        "HIPAA is not the only rule. Substance use disorder treatment records may also be protected by 42 CFR Part 2, which can be stricter.",
        "Use the minimum necessary information when sharing is allowed. If you are unsure, pause and consult supervision.",
      ],
    },
    {
      title: "Intern checklist",
      items: [
        "Am I using client-identifying information in a learning note, AI tool, screenshot, personal device, or study example? If yes, stop.",
        "Is there a valid release, policy reason, or treatment/operations reason for this disclosure?",
        "Does 42 CFR Part 2 also apply?",
        "Am I sharing only what is necessary?",
        "Have I documented the release, explanation, refusal, or consultation if clinically relevant?",
      ],
    },
    {
      title: "Client-friendly explanation",
      items: [
        "Most health information is private. We use it to support your care, and there are rules about who can see it.",
        "Some information can be shared for treatment or when you give permission, but substance use treatment information may have extra protections.",
        "If there is a safety or legal exception, I will explain what is happening and involve you as much as possible.",
      ],
    },
  ],
  "/ethics-compliance/42-cfr-part-2": [
    {
      title: "Core idea",
      items: [
        "42 CFR Part 2 protects certain substance use disorder treatment records. It exists because SUD information can carry stigma and legal/social consequences if disclosed improperly.",
        "Do not assume a general HIPAA permission automatically allows SUD treatment information to be released.",
        "Part 2 decisions often depend on whether the program and record are covered, what consent says, who is receiving information, and whether an exception applies.",
      ],
    },
    {
      title: "Release-of-information checklist",
      items: [
        "Who is requesting the information?",
        "What exact information is being requested?",
        "Does the client understand what will be shared and why?",
        "Is the consent valid under agency policy?",
        "Is redisclosure language required?",
        "Is there a safety, medical emergency, court order, mandated reporting, or audit/evaluation issue that requires supervision or policy review?",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Counselor reviewed ROI purpose, recipient, information to be shared, expiration, and client questions prior to signature.",
        "Client declined ROI at this time. Counselor reviewed what coordination may be limited without consent and documented client preference.",
        "Counselor consulted supervisor regarding Part 2 disclosure question before releasing information.",
      ],
    },
  ],
  "/ethics-compliance/confidentiality": [
    {
      title: "What confidentiality means",
      items: [
        "Confidentiality is the counselor's duty to protect client information and explain privacy limits clearly.",
        "It is not absolute. Common exceptions involve safety risk, abuse/neglect reporting, court/legal requirements, medical emergencies, valid releases, and agency policy.",
        "Confidentiality should be explained early, in plain language, and revisited when releases or safety issues come up.",
      ],
    },
    {
      title: "Plain-language script",
      items: [
        "Most of what you share here is private.",
        "There are a few exceptions, mostly related to safety, abuse or neglect reporting, certain legal requirements, or when you sign permission for information to be shared.",
        "If something comes up where I may need to act, I will explain what is happening and involve you as much as I can.",
      ],
    },
    {
      title: "Common mistakes",
      items: [
        "Saying everything is confidential.",
        "Explaining confidentiality only through paperwork without checking understanding.",
        "Talking about clients in public spaces, hallways, texts, personal email, or informal settings.",
        "Sharing with family, probation, employers, or other providers without checking the release and policy.",
      ],
    },
  ],
  "/ethics-compliance/mandated-reporting": [
    {
      title: "What mandated reporting means",
      items: [
        "Mandated reporting means the counselor may be legally required to report suspected abuse, neglect, or maltreatment involving children or vulnerable adults.",
        "You do not investigate or prove what happened. You report reasonable suspicion according to law and agency policy.",
        "For interns: consult supervision immediately, follow agency reporting procedure, and document objectively.",
      ],
    },
    {
      title: "What to clarify",
      items: [
        "Who is at risk: child, vulnerable adult, elder, or other protected person?",
        "What was disclosed or observed?",
        "Is there immediate danger?",
        "What does agency policy require right now?",
        "Who was consulted and when?",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Client disclosed concern related to possible maltreatment. Counselor consulted supervisor immediately and followed agency mandated reporting procedure.",
        "Counselor documented reported information objectively, avoiding conclusions beyond what was disclosed or observed.",
      ],
    },
  ],
  "/ethics-compliance/duty-to-warn": [
    {
      title: "What duty to warn/protect means",
      items: [
        "Duty to warn/protect involves taking action when there is a serious threat of harm to an identifiable person or group, depending on law and agency policy.",
        "This is not a solo intern decision. If threat language, intent, plan, target, means, or escalating behavior appears, consult supervision immediately and follow crisis policy.",
        "The clinical task is to assess risk, protect safety, document objectively, and involve the proper chain of support.",
      ],
    },
    {
      title: "Risk questions",
      items: [
        "Who is the person thinking about harming?",
        "What exactly has the client said or planned?",
        "Is there intent, access to means, timeframe, or prior violence?",
        "Is substance use, intoxication, withdrawal, psychosis, or extreme distress increasing risk?",
        "What immediate safety steps and consultation are required?",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Counselor assessed reported threat content, consulted supervisor, and followed agency crisis/duty-to-warn procedure.",
        "Documentation should include reported statements, observed behavior, risk factors, protective factors, consultation, action taken, and follow-up plan.",
      ],
    },
  ],
  "/ethics-compliance/boundaries": [
    {
      title: "What boundaries mean",
      items: [
        "Boundaries define the professional relationship: counselor role, communication channels, time/place of services, gifts, self-disclosure, social media, dual roles, and limits of availability.",
        "Strong boundaries are not cold. They protect safety, trust, fairness, and clinical focus.",
        "Interns should bring boundary uncertainty to supervision early, especially in small communities or recovery communities where overlap can happen.",
      ],
    },
    {
      title: "Common boundary situations",
      items: [
        "Client sends friend request or messages on social media.",
        "Client asks for personal phone number or after-hours support outside policy.",
        "Client offers a gift.",
        "Counselor sees client at a meeting, community event, or workplace.",
        "Counselor feels pulled into rescuing, over-disclosing, or bending rules for one client.",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Counselor reviewed communication boundaries and redirected client to approved contact channels.",
        "Counselor consulted supervisor regarding boundary concern and followed agency policy.",
      ],
    },
  ],
  "/ethics-compliance/dual-relationships": [
    {
      title: "What dual relationships mean",
      items: [
        "A dual relationship exists when the counselor has another relationship with the client beyond the clinical role: friend, family connection, business contact, peer recovery contact, neighbor, social media connection, or community overlap.",
        "Not every overlap is automatically unethical, but every overlap should be assessed for power, exploitation risk, confidentiality, objectivity, and client welfare.",
        "Interns should disclose potential dual relationships to supervision before proceeding.",
      ],
    },
    {
      title: "Decision checklist",
      items: [
        "Could this impair objectivity or clinical judgment?",
        "Could the client feel pressured or exploited?",
        "Could confidentiality be compromised?",
        "Is there a safer referral or staffing option?",
        "What does agency policy require?",
      ],
    },
    {
      title: "Common mistakes",
      items: [
        "Assuming good intentions remove ethical risk.",
        "Trying to handle the issue privately without supervision.",
        "Continuing treatment without documenting consultation when overlap is significant.",
        "Using social media or community relationships in a way that blurs roles.",
      ],
    },
  ],
  "/ethics-compliance/documentation-compliance": [
    {
      title: "What compliant documentation must show",
      items: [
        "What service occurred, when it occurred, why it was clinically relevant, what the counselor did, how the client responded, and what happens next.",
        "The note should connect to assessed need, treatment plan, ASAM dimension, risk/safety issue, case management need, or discharge plan.",
        "Use objective, respectful language. Avoid labels, unsupported conclusions, and unnecessary personal detail.",
      ],
    },
    {
      title: "Quality checklist",
      items: [
        "Does the note identify the service focus?",
        "Does it name the counselor intervention?",
        "Does it describe client response or progress/barrier?",
        "Does it connect to the treatment plan or clinical need?",
        "Does it avoid PHI outside the official record and avoid irrelevant details?",
      ],
    },
    {
      title: "Weak to strong examples",
      items: [
        "Weak: Client participated. Strong: Client engaged in relapse prevention discussion and identified two high-risk weekend situations.",
        "Weak: Client was resistant. Strong: Client expressed ambivalence about abstinence and explored perceived benefits and consequences of continued use.",
        "Weak: Did case management. Strong: Counselor provided housing resource list, reviewed contact steps, and planned follow-up next session.",
      ],
    },
  ],
};

function ethicsBlocks(page: ContentPage): TopicBlock[] {
  return ethicsGuides[page.path] ?? [
    {
      title: "Ethical decision points",
      items: [
        "Identify the protected information, risk, boundary, consent, or documentation issue.",
        "Check agency policy, consult supervision, and use official sources when law or regulation is involved.",
        "Document the situation, consultation, action taken, and follow-up objectively.",
      ],
    },
  ];
}

function procentiveBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Workflow checklist",
      items: [
        "Confirm which field you are completing and what question it should answer.",
        "Paste only language that fits that specific field.",
        "Check consistency across presenting problem, history, ASAM, diagnosis, plan, and notes.",
        "Remove unnecessary detail and identifiers from learning examples.",
      ],
    },
    {
      title: "Field-ready language checks",
      items: [
        "Is it neutral?",
        "Is it clinically specific?",
        "Does it explain why the information matters?",
        "Does it connect to ASAM, diagnosis, treatment plan, or follow-up?",
      ],
    },
    {
      title: "Common Procentive problems",
      items: [
        "Same language pasted into multiple unrelated fields.",
        "ASAM summary with no rating rationale.",
        "Treatment plan problem that does not match the assessment.",
        "Progress note that names a topic but no intervention or response.",
      ],
    },
  ];
}

function resourceBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "Referral thinking",
      items: [
        "Name the practical barrier: housing, food, transportation, legal, medical, mental health, MAT, or recovery support.",
        "Clarify whether the client wants information only or help making contact.",
        "Check release requirements before coordinating directly.",
        "Document resource provided and follow-up plan.",
      ],
    },
    {
      title: "Case management note starter",
      items: [
        "Client identified need for [resource area]. Counselor provided information for [resource] and reviewed next steps. Client plans to [action]. Follow-up will occur [timeframe].",
      ],
    },
  ];
}

const internshipGuides: Record<string, TopicBlock[]> = {
  "/internship-survival-guide/hours-tracker": [
    {
      title: "How to use the tracker",
      items: [
        "Enter direct hours when you are providing or observing client-facing clinical services such as assessment, counseling, group, case management, crisis response, client education, or referral work.",
        "Enter indirect hours for supervision, documentation practice, training, case review, exam study tied to internship, policy review, or administrative learning tasks allowed by your program/site.",
        "Use the reflection field to name what you learned and what question should go to supervision.",
      ],
    },
  ],
  "/internship-survival-guide/supervision-log": [
    {
      title: "What to bring to supervision",
      items: [
        "Cases or situations where you are unsure about ASAM rating, diagnosis, risk, boundaries, confidentiality, treatment planning, or documentation wording.",
        "One example of something you did well and one area where you need feedback.",
        "Questions about how your work connects to the 12 Core Functions.",
        "Any ethical discomfort, safety concern, or role confusion. Do not wait for it to become a crisis.",
      ],
    },
    {
      title: "Useful supervision questions",
      items: [
        "What information is missing before I can support this ASAM rating?",
        "How would you word this progress note more clinically?",
        "Is this case management, counseling, referral, or consultation?",
        "What boundary or confidentiality issue should I be noticing here?",
      ],
    },
    {
      title: "Documentation examples",
      items: [
        "Supervision focused on ASAM Dimension 4 wording and treatment plan connection for ambivalence.",
        "Supervisor advised intern to gather additional information about recovery environment before finalizing recommendation.",
      ],
    },
  ],
  "/internship-survival-guide/upload-internship-docs": [
    {
      title: "What belongs here",
      items: [
        "De-identified school rubrics, internship instructions, supervision forms, study guides, blank templates, and personal checklists.",
        "Do not upload client charts, screenshots from records, client names, dates of birth, addresses, phone numbers, case numbers, or anything that identifies a real person.",
        "Use the notes field to tell LADC Compass what the document should help you learn or build.",
      ],
    },
  ],
  "/internship-survival-guide/licensure-roadmap": [
    {
      title: "LADC roadmap checklist",
      items: [
        "Standard Minnesota LADC pathway information on BBHT currently lists: bachelor's degree, 18 semester credits/270 clock hours of specific alcohol and drug counseling coursework, 880-hour practicum, and required exam completion. Verify current rules before applying.",
        "Confirm current Minnesota BBHT education requirements for your pathway.",
        "Track internship/practicum hours and separate direct from indirect hours according to your school/site requirements.",
        "Maintain supervision documentation and ask your supervisor how they want hours verified.",
        "Complete required coursework and keep syllabi/transcripts organized.",
        "Prepare for and complete the required ADC/LADC exam process listed by BBHT.",
        "Complete background check and application materials through the BBHT process.",
        "Keep copies of forms, supervision verification, transcripts, exam results, and correspondence.",
      ],
    },
    {
      title: "What to verify directly with BBHT",
      items: [
        "Whether your pathway is Standard Method, Supervision Alternative, Reciprocity, Temporary Permit, or another current board-recognized route.",
        "Degree/coursework requirements.",
        "Exam requirements and accepted exam provider.",
        "Supervised practice requirements.",
        "Application documents and fees.",
        "Temporary permit rules if applicable.",
        "Any recent statutory or rule changes.",
      ],
    },
  ],
  "/internship-survival-guide/adc-exam-prep": [
    {
      title: "What to study first",
      items: [
        "12 Core Functions: know definitions, practical examples, documentation links, and ethical issues.",
        "Screening/assessment: know what information to gather, how to identify missing information, and how to connect data to diagnosis and ASAM.",
        "Counseling theory and skills: MI, CBT basics, relapse prevention, group counseling, client education, cultural responsiveness, and trauma-informed practice.",
        "Case management/referral: know when referral is indicated, how releases work, and how to coordinate without overstepping confidentiality.",
        "Ethics: confidentiality, 42 CFR Part 2, HIPAA, boundaries, dual relationships, mandated reporting, duty to warn/protect, documentation, and consultation.",
      ],
    },
    {
      title: "Study method that actually works",
      items: [
        "For each topic, write: definition, when used, documentation involved, ethical risk, ASAM connection, and one exam-style example.",
        "Practice explaining why the wrong answers are wrong. This builds exam judgment better than memorizing only correct answers.",
        "Use practice questions by domain: assessment, counseling, treatment planning, case management/referral, ethics, documentation, pharmacology/MAT awareness, and crisis/risk.",
      ],
    },
    {
      title: "High-yield exam reminders",
      items: [
        "Choose the answer that protects client safety and confidentiality first.",
        "Consult or refer when the issue is outside scope, involves medical/psychiatric risk, or creates ethical uncertainty.",
        "Assessment comes before treatment planning. Do not jump to intervention before gathering enough information.",
        "Use client-centered, least judgmental language. Avoid punitive or confrontational options unless immediate safety requires action.",
      ],
    },
  ],
  "/internship-survival-guide/ladc-requirements": [
    {
      title: "What this page should help you organize",
      items: [
        "Degree: BBHT's standard LADC method currently identifies a bachelor's degree requirement. Verify your exact pathway directly with BBHT.",
        "Coursework: BBHT's standard method currently identifies 18 semester credits/270 clock hours of specific alcohol and drug counseling coursework.",
        "Practicum: BBHT's standard method currently identifies an 880-hour alcohol and drug counseling practicum.",
        "Exam: BBHT identifies required exam completion; check the LADC Exam Information page for the current exam process.",
        "Education/coursework requirements and transcripts.",
        "Practicum or supervised professional practice documentation.",
        "Exam requirement and exam results.",
        "Background check and application steps.",
        "Supervisor verification, site paperwork, and any temporary permit documents.",
      ],
    },
    {
      title: "Do not rely on memory",
      items: [
        "Licensure rules can change. Always verify with Minnesota BBHT before submitting materials.",
        "Keep a folder for official BBHT instructions, submitted forms, receipts, and emails.",
        "Ask your supervisor or school advisor to review your roadmap before final submission.",
      ],
    },
  ],
  "/internship-survival-guide/study-center": [
    {
      title: "Weekly study structure",
      items: [
        "Day 1: 12 Core Functions definitions and examples.",
        "Day 2: ASAM dimensions and placement rationale.",
        "Day 3: documentation, treatment plans, and progress note wording.",
        "Day 4: ethics, confidentiality, Part 2, HIPAA, mandated reporting, boundaries.",
        "Day 5: counseling skills, MI, CBT, relapse prevention, group counseling.",
        "Day 6: practice questions with explanations.",
        "Day 7: supervision questions and weak-area review.",
      ],
    },
    {
      title: "Active recall prompts",
      items: [
        "Define this topic without looking.",
        "Give a client example.",
        "Name the documentation connected to it.",
        "Name the ethical risk.",
        "Name the ASAM dimension most connected to it.",
      ],
    },
  ],
  "/internship-survival-guide/practice-questions": [
    {
      title: "How to use the interactive test",
      items: [
        "Answer each question before opening other resources.",
        "Submit the test to see your score, correct answer, and explanation.",
        "Review missed questions by topic and write one supervision or study question from each miss.",
      ],
    },
  ],
};

function internshipBlocks(page: ContentPage): TopicBlock[] {
  return internshipGuides[page.path] ?? [
    {
      title: "Internship learning focus",
      items: [
        "Track the task, direct/indirect hours, core function, clinical learning, documentation practice, and supervision questions.",
        "Keep all personal learning notes de-identified.",
      ],
    },
  ];
}

function websiteBlocks(page: ContentPage): TopicBlock[] {
  return [
    {
      title: "How to use outside links",
      items: [
        "Use official or professional sources for laws, ethics, licensure, ASAM, and federal resources.",
        "Do not rely on memory for regulations that may change.",
        "Bring legal/compliance uncertainty to supervision or agency leadership.",
      ],
    },
  ];
}

export function getPageByPath(path: string) {
  return contentPages.find((page) => page.path === path);
}

export function getRelatedPages(paths: string[]) {
  return paths
    .map((path) => contentPages.find((page) => page.path === path))
    .filter(Boolean) as ContentPage[];
}
