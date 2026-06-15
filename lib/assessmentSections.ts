export type ParagraphField = {
  id: string;
  label: string;
  placeholder: string;
};

export type AsamDimensionGuide = {
  id: string;
  title: string;
  purpose: string;
  whereToFindInfo: string[];
  ratingGuidance: string[];
  lowRating: string[];
  moderateRating: string[];
  highRating: string[];
  exampleJustification: string;
  problemStatements: string[];
};

export type AssessmentSection = {
  id: string;
  title: string;
  description: string;
  whatItAsks: string;
  whyItMatters: string;
  listenFor: string[];
  whereToFindInfo: string[];
  clientQuestions: string[];
  redFlags: string[];
  asamConnections: string[];
  clinicalExamples: string[];
  commonMistakes: { bad: string; better: string }[];
  paragraphBuilderFields: ParagraphField[];
  relatedSections: string[];
  missingInfo?: string[];
  connectionMap?: string[];
  asamDimensions?: AsamDimensionGuide[];
};

export const paragraphBuilderFields: ParagraphField[] = [
  {
    id: "clientReport",
    label: "What did the client report?",
    placeholder: "Client reports...",
  },
  {
    id: "impact",
    label: "What impact has this had?",
    placeholder: "This has affected legal, relational, work, mood, health, or recovery stability...",
  },
  {
    id: "risks",
    label: "What risks are present?",
    placeholder: "Withdrawal risk, relapse risk, safety risk, environmental risk, medical/mental health risk...",
  },
  {
    id: "strengths",
    label: "What strengths are present?",
    placeholder: "Motivation, supports, prior abstinence, employment, insight, willingness, coping skills...",
  },
  {
    id: "interpretation",
    label: "What is your clinical interpretation?",
    placeholder: "Clinical meaning, ASAM connection, diagnosis/treatment planning implication...",
  },
];

const clinicalFlow = [
  "Substance Use History",
  "DSM-5 Diagnosis",
  "ASAM Dimensions",
  "Level of Care Recommendation",
  "Summary & Recommendations",
  "Treatment Plan",
];

export const asamDimensionGuides: AsamDimensionGuide[] = [
  {
    id: "dimension-1",
    title: "Dimension 1: Acute Intoxication / Withdrawal Potential",
    purpose:
      "Assess current intoxication, withdrawal risk, last use, withdrawal history, and need for medical monitoring.",
    whereToFindInfo: [
      "Last use",
      "Withdrawal symptoms",
      "Substance use history",
      "Medical history",
      "Current presentation",
    ],
    ratingGuidance: [
      "0: No current intoxication or withdrawal concern.",
      "1: Mild risk; monitor symptoms and history.",
      "2: Moderate risk; withdrawal symptoms or history require structured monitoring.",
      "3: Serious risk; likely needs medically monitored withdrawal management.",
      "4: Severe/imminent risk; urgent medical/emergency intervention may be needed.",
    ],
    lowRating: [
      "No current withdrawal symptoms.",
      "No history of severe withdrawal.",
      "Last use and substance type do not suggest immediate medical risk.",
    ],
    moderateRating: [
      "Some withdrawal symptoms or increased tolerance.",
      "History suggests monitoring is needed.",
      "Client may need medical consultation before outpatient care is safe.",
    ],
    highRating: [
      "History of seizures, delirium tremens, severe alcohol/benzodiazepine withdrawal, or medically risky opioid withdrawal.",
      "Current intoxication or withdrawal interferes with assessment participation.",
      "Immediate detox or medical evaluation may be indicated.",
    ],
    exampleJustification:
      "Dimension 1 risk appears moderate due to recent heavy alcohol use, reported withdrawal symptoms, and need for medical monitoring before routine outpatient participation.",
    problemStatements: [
      "Withdrawal risk may interfere with safe engagement in outpatient treatment.",
      "Medical stabilization needs should be addressed before ongoing SUD counseling.",
    ],
  },
  {
    id: "dimension-2",
    title: "Dimension 2: Biomedical Conditions",
    purpose:
      "Assess medical problems, physical health conditions, medications, pain, disabilities, and whether medical issues interfere with treatment.",
    whereToFindInfo: [
      "Physical health",
      "Medications",
      "Allergies",
      "Medical diagnoses",
      "Referrals",
      "Treatment compliance",
    ],
    ratingGuidance: [
      "0: No biomedical concerns affecting treatment.",
      "1: Stable medical concerns; routine coordination may help.",
      "2: Medical needs require monitoring or referral but are not immediately unstable.",
      "3: Significant medical instability or poor follow-through interferes with treatment.",
      "4: Severe biomedical condition requires immediate medical care.",
    ],
    lowRating: ["No active medical issue reported.", "Medical needs are stable and managed."],
    moderateRating: [
      "Medical issue may affect attendance, cravings, mood, sleep, pain, or medication adherence.",
      "Client needs follow-up with primary care or specialty provider.",
    ],
    highRating: [
      "Unmanaged medical problem creates safety risk.",
      "Pain, pregnancy, disability, infectious disease concern, or medication problem requires active coordination.",
    ],
    exampleJustification:
      "Dimension 2 risk appears mild to moderate due to reported chronic pain and inconsistent medical follow-up, which may affect treatment engagement and relapse vulnerability.",
    problemStatements: [
      "Biomedical needs may complicate recovery stability and treatment participation.",
      "Client would benefit from medical follow-up and coordination as clinically appropriate.",
    ],
  },
  {
    id: "dimension-3",
    title: "Dimension 3: Emotional, Behavioral, Cognitive Conditions",
    purpose:
      "Assess mental health symptoms, trauma, emotional regulation, suicidality, cognitive issues, and co-occurring needs.",
    whereToFindInfo: [
      "Mental health",
      "Trauma history",
      "Suicide history",
      "GAIN-SS",
      "Medication list",
      "Current symptoms",
    ],
    ratingGuidance: [
      "0: No emotional/behavioral/cognitive concern affecting care.",
      "1: Mild symptoms; monitor and support coping.",
      "2: Moderate symptoms affect recovery and need integrated treatment attention.",
      "3: Serious symptoms or safety concerns require active mental health coordination.",
      "4: Severe/imminent risk requiring emergency psychiatric/safety response.",
    ],
    lowRating: ["Symptoms denied or mild.", "No current safety concerns.", "Functioning is stable."],
    moderateRating: [
      "Anxiety, depression, trauma symptoms, sleep problems, or mood instability increase relapse vulnerability.",
      "Client needs coping skills, monitoring, or mental health referral.",
    ],
    highRating: [
      "Current suicidal/homicidal ideation, psychosis, mania, severe impairment, or inability to maintain safety.",
      "Mental health symptoms prevent participation without higher support.",
    ],
    exampleJustification:
      "Dimension 3 risk appears moderate due to anxiety and depressive symptoms that interfere with emotional regulation and increase vulnerability to substance use.",
    problemStatements: [
      "Co-occurring mental health symptoms may increase relapse risk when coping skills are limited.",
      "Client would benefit from integrated support addressing emotional regulation and substance use recovery.",
    ],
  },
  {
    id: "dimension-4",
    title: "Dimension 4: Readiness to Change",
    purpose:
      "Assess motivation, insight, treatment engagement, denial, ambivalence, and internal versus external reasons for treatment.",
    whereToFindInfo: [
      "Client perception",
      "Reason for referral",
      "Client preferences",
      "Treatment history",
      "Legal involvement",
      "Interview behavior",
    ],
    ratingGuidance: [
      "0: Actively engaged and internally motivated.",
      "1: Some ambivalence but generally cooperative.",
      "2: Mixed motivation; engagement needs MI support.",
      "3: Significant resistance, denial, or poor follow-through.",
      "4: Unable or unwilling to engage despite serious risk.",
    ],
    lowRating: ["Client identifies personal reasons for change.", "Client is engaged and accepts help."],
    moderateRating: [
      "Client attends but motivation is partly external.",
      "Client minimizes consequences or is unsure about abstinence/reduction.",
    ],
    highRating: [
      "Client rejects need for treatment despite severe consequences.",
      "Legal/family pressure is the only stated reason for attendance and engagement is poor.",
    ],
    exampleJustification:
      "Dimension 4 risk appears moderate due to legal referral pressure and partial minimization, though client is willing to attend assessment and discuss goals.",
    problemStatements: [
      "Ambivalence about change may interfere with treatment engagement.",
      "Client would benefit from motivational interviewing to strengthen internal reasons for recovery.",
    ],
  },
  {
    id: "dimension-5",
    title: "Dimension 5: Relapse / Continued Use Potential",
    purpose: "Assess likelihood of continued use or relapse without treatment.",
    whereToFindInfo: [
      "Substance use history",
      "Relapse history",
      "Triggers",
      "Cravings",
      "Previous treatment",
      "Coping skills",
      "Recovery supports",
      "Mental health",
    ],
    ratingGuidance: [
      "0: Low relapse risk; stable coping and supports.",
      "1: Mild risk; some triggers but adequate coping.",
      "2: Moderate risk; cravings/triggers and limited coping require structured prevention planning.",
      "3: High risk; repeated relapse/continued use without strong supports.",
      "4: Severe/imminent risk; unable to avoid use without intensive structure.",
    ],
    lowRating: [
      "Sustained abstinence or controlled risk with strong supports.",
      "Client can identify triggers and coping steps.",
    ],
    moderateRating: [
      "Recent use, cravings, or trigger exposure with limited coping plan.",
      "Prior relapse after treatment or periods of abstinence.",
    ],
    highRating: [
      "Repeated recurrence despite consequences.",
      "High cravings, easy access, limited supports, and poor coping.",
      "Continued use likely without structured care.",
    ],
    exampleJustification:
      "Dimension 5 risk appears elevated due to recent relapse, boredom and loneliness triggers, impaired control once use begins, and limited coping supports.",
    problemStatements: [
      "Relapse vulnerability is increased by triggers, cravings, and limited coping strategies.",
      "Client needs relapse prevention planning and recovery support development.",
    ],
  },
  {
    id: "dimension-6",
    title: "Dimension 6: Recovery Environment",
    purpose:
      "Assess housing, family/social supports, peer influences, transportation, financial barriers, employment, legal environment, and safety.",
    whereToFindInfo: [
      "Living situation",
      "Family/social",
      "Legal",
      "Employment",
      "Recovery supports",
      "Client barriers",
      "Economic status",
    ],
    ratingGuidance: [
      "0: Recovery environment is stable and supportive.",
      "1: Mild stressors but adequate support.",
      "2: Moderate barriers require case management or support planning.",
      "3: High-risk environment substantially interferes with recovery.",
      "4: Environment is unsafe or makes recovery nearly impossible without immediate change.",
    ],
    lowRating: ["Stable housing.", "Supportive relationships.", "Transportation and basic needs are manageable."],
    moderateRating: [
      "Some exposure to use, unstable supports, transportation barriers, or financial/legal stress.",
      "Needs resource coordination and recovery support planning.",
    ],
    highRating: [
      "Lives with active use, unsafe housing, violence, homelessness, or severe isolation.",
      "Environment strongly increases relapse or safety risk.",
    ],
    exampleJustification:
      "Dimension 6 risk appears high due to unstable housing, regular exposure to substance use, limited sober supports, and transportation barriers.",
    problemStatements: [
      "Recovery environment instability increases relapse risk and treatment barriers.",
      "Client would benefit from case management, support development, and environmental risk planning.",
    ],
  },
];

function section(
  data: Omit<AssessmentSection, "paragraphBuilderFields" | "connectionMap"> & {
    paragraphBuilderFields?: ParagraphField[];
    connectionMap?: string[];
  },
): AssessmentSection {
  return {
    paragraphBuilderFields,
    connectionMap: clinicalFlow,
    ...data,
  };
}

function placeholderSection(id: string, title: string, description: string): AssessmentSection {
  return section({
    id,
    title,
    description,
    whatItAsks:
      "This Procentive assessment area gathers information needed to understand the client's current functioning, treatment needs, risks, strengths, and next clinical steps.",
    whyItMatters:
      "Experienced LADCs use this information to support diagnosis, ASAM ratings, treatment planning, documentation quality, and clear recommendations.",
    listenFor: [
      "Concrete client statements rather than vague impressions.",
      "How the issue affects recovery, safety, functioning, and treatment engagement.",
      "Strengths, barriers, supports, and missing information.",
    ],
    whereToFindInfo: [
      "Client interview",
      "Related assessment sections",
      "Collateral or referral information when authorized",
      "Screening tools and prior treatment history when available",
    ],
    clientQuestions: [
      "What feels most important for me to understand about this area?",
      "How has this affected your recovery or daily functioning?",
      "What has helped before?",
      "What would you want support with next?",
    ],
    redFlags: [
      "Safety concerns, unstable basic needs, severe impairment, or information that contradicts another section.",
      "Missing details needed for ASAM, diagnosis, or recommendation.",
    ],
    asamConnections: [
      "Review which ASAM dimension this information affects before finalizing ratings.",
      "Ask whether this area changes risk, readiness, relapse vulnerability, or recovery environment.",
    ],
    clinicalExamples: [
      "Client reports [issue] affecting [functioning/recovery area] and identifies [strength/support/barrier].",
      "Further assessment is needed regarding [missing information] to clarify treatment recommendations.",
    ],
    commonMistakes: [
      {
        bad: "Client is fine in this area.",
        better:
          "Client denies current concerns in this area and no immediate impairment was identified during assessment; continue to monitor as treatment progresses.",
      },
    ],
    relatedSections: ["summary-recommendations", "asam-dimensions", "dsm-5-diagnosis"],
    missingInfo: ["Specific examples", "Current impact", "Risk level", "Strengths/supports"],
  });
}

export const assessmentSections: AssessmentSection[] = [
  placeholderSection(
    "assessment-summary",
    "Assessment Summary",
    "A quick orientation to the overall Comprehensive Assessment workflow.",
  ),
  placeholderSection(
    "background-information",
    "Background Information",
    "Basic context that helps orient the assessment before clinical interpretation.",
  ),
  section({
    id: "presenting-problem-referral-information",
    title: "Presenting Problem / Referral Information",
    description:
      "Clarifies why the client is presenting now, what started the referral, and how the client understands the need for services.",
    whatItAsks:
      "This section identifies why the client is presenting for services, what brought them to treatment now, whether there are immediate safety or basic needs concerns, and how the client understands their own condition.",
    whyItMatters:
      "The presenting problem frames the rest of the assessment. It helps the counselor understand urgency, motivation, referral pressure, safety issues, ASAM Dimension 4 readiness, ASAM Dimension 6 barriers, and the first treatment planning themes.",
    listenFor: [
      "Referral source",
      "Legal pressure",
      "Family pressure",
      "Self-referral",
      "Crisis events",
      "Recent use",
      "Immediate safety concerns",
      "Basic needs instability",
      "Insight or minimization",
      "Motivation level",
    ],
    whereToFindInfo: [
      "Client reason for referral",
      "Circumstances on day of service initiation",
      "Legal section",
      "Substance use history",
      "Mental health section",
      "Client preferences",
      "ASAM Dimension 4",
      "ASAM Dimension 6",
    ],
    clientQuestions: [
      "What brought you in for the assessment today?",
      "Was this your idea, someone else's recommendation, or a requirement?",
      "What happened recently that made services feel necessary now?",
      "What are you hoping will be different after treatment?",
      "Are there any immediate safety, housing, transportation, or basic needs concerns we should know about today?",
    ],
    redFlags: [
      "Client reports current intoxication, withdrawal, overdose risk, suicidal ideation, or violence risk.",
      "Client is present only because of court/probation and denies all personal concern.",
      "Client lacks stable housing, transportation, food, or safe environment.",
      "Referral reason conflicts with client report and needs clarification.",
    ],
    asamConnections: [
      "Dimension 4: Shows internal versus external motivation, insight, minimization, ambivalence, and treatment engagement.",
      "Dimension 6: Identifies basic needs, legal pressure, family stress, and environmental instability.",
      "Dimension 3: Immediate emotional or safety concerns may appear here before the mental health section.",
    ],
    clinicalExamples: [
      "Client presents for a comprehensive assessment following referral related to substance use concerns and associated life consequences.",
      "Client acknowledges substance use has contributed to legal, relational, and emotional difficulties, though motivation for treatment appears partially externally driven.",
      "Client reports seeking services to address ongoing substance use patterns and improve stability in recovery.",
    ],
    commonMistakes: [
      {
        bad: "Client is here because court said so.",
        better:
          "Client reports legal involvement as a primary referral factor and demonstrates limited internal motivation at this time.",
      },
      {
        bad: "Client needs help.",
        better:
          "Client reports seeking services due to recent substance-related consequences and desire to improve recovery stability.",
      },
    ],
    relatedSections: [
      "legal",
      "substance-use-history",
      "mental-health",
      "client-preferences",
      "asam-dimensions",
      "summary-recommendations",
    ],
    missingInfo: [
      "Referral source",
      "Current reason for assessment",
      "Client's own view of the problem",
      "External pressure or requirements",
      "Immediate safety/basic needs concerns",
    ],
  }),
  section({
    id: "substance-use-history",
    title: "Substance Use History",
    description:
      "Builds the clinical timeline of substance use pattern, progression, consequences, withdrawal risk, relapse history, and attempts to stop.",
    whatItAsks:
      "This section documents the client's pattern, progression, frequency, amount, duration, consequences, withdrawal symptoms, relapse history, and prior attempts to stop or reduce use.",
    whyItMatters:
      "Substance use history supports DSM-5 diagnosis, severity, ASAM Dimension 1 withdrawal risk, Dimension 5 relapse risk, treatment recommendations, and relapse prevention goals.",
    listenFor: [
      "Primary substance",
      "Secondary substances",
      "Age of first use",
      "Progression over time",
      "Last use",
      "Route of use",
      "Frequency",
      "Amount",
      "Tolerance",
      "Withdrawal",
      "Cravings",
      "Failed quit attempts",
      "Consequences",
      "Relapse triggers",
      "Periods of abstinence",
    ],
    whereToFindInfo: [
      "Substance use table",
      "DSM-5 criteria",
      "Treatment history",
      "Legal section",
      "Family/social section",
      "Mental health section",
      "ASAM Dimension 1",
      "ASAM Dimension 5",
    ],
    clientQuestions: [
      "What substances have caused the most problems for you?",
      "When did use start, and how has it changed over time?",
      "When was your last use, and how much did you use?",
      "Have you noticed tolerance, withdrawal, cravings, or trouble stopping once you start?",
      "What consequences have shown up legally, emotionally, medically, relationally, or at work/school?",
      "What tends to trigger use or relapse?",
      "What has helped you stop or reduce use in the past?",
    ],
    redFlags: [
      "Recent use with withdrawal symptoms or severe withdrawal history.",
      "Use despite overdose, psychosis, violence, DWI, job loss, legal consequences, or medical harm.",
      "Impaired control once use begins.",
      "No coping plan for cravings or triggers.",
      "High-risk route of use or polysubstance use.",
    ],
    asamConnections: [
      "Dimension 1: Last use, withdrawal, intoxication, tolerance, detox history.",
      "Dimension 5: Cravings, relapse pattern, triggers, failed quit attempts, coping skills.",
      "Dimension 6: Access to substances, peer influence, unstable recovery environment.",
      "DSM-5: Criteria such as impaired control, risky use, continued use despite consequences, tolerance, and withdrawal.",
    ],
    clinicalExamples: [
      "Client reports a history of methamphetamine use characterized by escalating frequency, impaired control, and continued use despite significant negative consequences.",
      "Client identifies emotional distress, boredom, and social influences as triggers for substance use.",
      "Client reports prior periods of abstinence followed by relapse when exposed to high-risk environments and limited coping supports.",
    ],
    commonMistakes: [
      {
        bad: "Client used meth a lot.",
        better:
          "Client reports chronic methamphetamine use with increased frequency over time and associated impairment in legal, occupational, and relational functioning.",
      },
      {
        bad: "Client relapsed.",
        better:
          "Client reports return to use after a period of abstinence when exposed to high-risk peers and limited coping support.",
      },
    ],
    relatedSections: [
      "symptoms-of-substance-use-disorder",
      "treatment-history",
      "recovery-supports",
      "mental-health",
      "legal",
      "dsm-5-diagnosis",
      "asam-dimensions",
      "summary-recommendations",
    ],
    missingInfo: [
      "Primary and secondary substances",
      "Last use and route of use",
      "Frequency/amount/duration",
      "Tolerance and withdrawal",
      "Consequences",
      "Triggers and relapse history",
      "Periods of abstinence",
    ],
  }),
  placeholderSection(
    "symptoms-of-substance-use-disorder",
    "Symptoms of Substance Use Disorder",
    "Maps the client narrative onto DSM-5 substance use disorder criteria.",
  ),
  placeholderSection(
    "treatment-history",
    "Treatment History",
    "Reviews prior treatment attempts, what helped, what did not, and what changed after discharge.",
  ),
  placeholderSection(
    "recovery-supports",
    "Recovery Supports",
    "Identifies sober support, community resources, recovery activities, and support gaps.",
  ),
  placeholderSection(
    "physical-health",
    "Physical Health",
    "Clarifies medical conditions, medications, withdrawal risks, pain, and treatment barriers.",
  ),
  section({
    id: "mental-health",
    title: "Mental Health",
    description:
      "Assesses co-occurring symptoms, safety, trauma, medication, emotional regulation, and how mental health affects recovery.",
    whatItAsks:
      "This section identifies current and historical mental health symptoms, previous treatment, current treatment, psychotropic medications, trauma history, suicidal ideation, self-harm, and how mental health affects recovery.",
    whyItMatters:
      "Mental health information affects ASAM Dimension 3, relapse risk, safety planning, integrated care recommendations, treatment plan goals, medication coordination, and level-of-care decisions.",
    listenFor: [
      "Depression",
      "Anxiety",
      "Trauma",
      "Mood instability",
      "Psychosis",
      "Suicidal ideation",
      "Self-harm",
      "Sleep issues",
      "Emotional regulation",
      "Mental health treatment history",
      "Medication compliance",
      "Relationship between symptoms and substance use",
    ],
    whereToFindInfo: [
      "Mental health history",
      "Current symptoms",
      "Medication list",
      "Trauma/abuse history",
      "Suicide history",
      "GAIN-SS",
      "Physical health section",
      "ASAM Dimension 3",
      "ASAM Dimension 5",
    ],
    clientQuestions: [
      "What mental health symptoms have been most difficult recently?",
      "How do anxiety, depression, trauma, anger, or sleep affect your substance use or recovery?",
      "Have you ever had thoughts of suicide, self-harm, or not wanting to be alive?",
      "Are you currently taking any mental health medications? Are there barriers to taking them as prescribed?",
      "Have you ever received therapy, hospitalization, crisis services, or psychiatric care?",
      "What helps you regulate emotions without using substances?",
    ],
    redFlags: [
      "Current suicidal ideation, plan, intent, means, or recent attempt.",
      "Current psychosis, mania, severe depression, severe trauma symptoms, or inability to maintain safety.",
      "Mental health symptoms directly trigger use and client lacks coping skills.",
      "Medication nonadherence, severe side effects, or abrupt discontinuation.",
    ],
    asamConnections: [
      "Dimension 3: Current emotional, behavioral, cognitive, trauma, safety, or psychiatric needs.",
      "Dimension 5: Mental health symptoms may increase relapse vulnerability.",
      "Dimension 2: Medication, sleep, pain, and physical health may interact with mental health.",
    ],
    clinicalExamples: [
      "Client reports symptoms of anxiety and depression that appear to contribute to emotional distress and increased vulnerability to substance use.",
      "Client denies current suicidal ideation, plan, or intent, but reports a history of emotional distress requiring continued monitoring.",
      "Client would benefit from integrated services addressing both substance use and mental health symptoms.",
    ],
    commonMistakes: [
      {
        bad: "Client has anxiety.",
        better:
          "Client reports anxiety symptoms that interfere with emotional regulation and may increase relapse vulnerability when coping skills are limited.",
      },
      {
        bad: "Client is depressed but okay.",
        better:
          "Client reports depressive symptoms and denies current suicidal ideation, plan, or intent; symptoms should continue to be monitored during treatment.",
      },
    ],
    relatedSections: [
      "physical-health",
      "risk-behaviors",
      "supportive-screenings",
      "substance-use-history",
      "asam-dimensions",
      "summary-recommendations",
    ],
    missingInfo: [
      "Current symptoms",
      "Safety screening",
      "Treatment history",
      "Medication list/adherence",
      "Trauma history",
      "How symptoms relate to substance use",
    ],
  }),
  placeholderSection(
    "family-social",
    "Family & Social",
    "Looks at family relationships, social supports, isolation, peer influence, and recovery environment.",
  ),
  placeholderSection(
    "legal",
    "Legal",
    "Clarifies legal involvement, court/probation requirements, DWI, custody issues, and compliance barriers.",
  ),
  placeholderSection(
    "education-employment",
    "Education & Employment",
    "Assesses functioning, stability, barriers, strengths, and role impairment.",
  ),
  placeholderSection(
    "risk-behaviors",
    "Risk Behaviors",
    "Screens for safety concerns, overdose risk, self-harm, violence risk, risky use, and urgent care needs.",
  ),
  placeholderSection(
    "client-preferences",
    "Client Preferences",
    "Identifies treatment goals, preferred services, cultural needs, barriers, and what the client wants help with.",
  ),
  placeholderSection(
    "supportive-screenings",
    "Supportive Screenings",
    "Uses tools such as GAIN-SS or other screens to clarify symptoms and follow-up needs.",
  ),
  placeholderSection(
    "dsm-5-diagnosis",
    "DSM-5 Diagnosis",
    "Translates substance use symptoms into diagnostic criteria, severity, and clinical wording.",
  ),
  section({
    id: "asam-dimensions",
    title: "ASAM Dimensions 1-6",
    description:
      "Guides multidimensional risk rating and connects assessment facts to level-of-care recommendations.",
    whatItAsks:
      "This section asks how much risk or need is present across withdrawal, physical health, mental health, readiness, relapse potential, and recovery environment.",
    whyItMatters:
      "ASAM ratings explain why a level of care is recommended. Strong ASAM documentation uses evidence from the assessment, not a number by itself.",
    listenFor: [
      "Current withdrawal or intoxication concerns",
      "Medical barriers",
      "Mental health and safety concerns",
      "Motivation and engagement",
      "Relapse risk, triggers, cravings, coping skills",
      "Housing, supports, transportation, legal and environmental barriers",
    ],
    whereToFindInfo: [
      "Substance use history",
      "Withdrawal symptoms",
      "Physical health",
      "Mental health",
      "Client perception and motivation",
      "Treatment history",
      "Recovery supports",
      "Family/social",
      "Legal",
      "Education/employment",
    ],
    clientQuestions: [
      "What withdrawal symptoms have you had when stopping or cutting down?",
      "What medical or mental health issues affect your recovery?",
      "How ready do you feel to make changes right now?",
      "What usually leads to relapse or continued use?",
      "What in your living environment supports recovery, and what makes it harder?",
    ],
    redFlags: [
      "Severe withdrawal history or current withdrawal symptoms.",
      "Current suicidal/homicidal ideation, psychosis, mania, or inability to maintain safety.",
      "Repeated relapse with little coping support.",
      "Unsafe or substance-saturated living environment.",
      "Ratings that do not match narrative evidence.",
    ],
    asamConnections: [
      "Dimension 1: Acute intoxication/withdrawal.",
      "Dimension 2: Biomedical conditions.",
      "Dimension 3: Emotional/behavioral/cognitive conditions.",
      "Dimension 4: Readiness to change.",
      "Dimension 5: Relapse/continued use potential.",
      "Dimension 6: Recovery environment.",
    ],
    clinicalExamples: [
      "Dimension 5 risk appears elevated due to recent relapse, cravings, limited coping skills, and ongoing exposure to triggers.",
      "Dimension 4 risk appears moderate due to legal referral pressure and partial minimization, though client is willing to participate.",
      "Dimension 6 risk appears high due to unstable housing and limited sober supports.",
    ],
    commonMistakes: [
      {
        bad: "D5 = 3.",
        better:
          "Dimension 5 risk is rated high due to repeated relapse after treatment, current cravings, limited coping skills, and ongoing exposure to high-risk peers.",
      },
      {
        bad: "Client has anxiety so D3 is high.",
        better:
          "Dimension 3 risk appears moderate due to anxiety symptoms that interfere with emotional regulation; client denies current safety concerns and is able to participate in outpatient services.",
      },
    ],
    relatedSections: [
      "substance-use-history",
      "mental-health",
      "physical-health",
      "recovery-supports",
      "family-social",
      "legal",
      "summary-recommendations",
    ],
    missingInfo: [
      "Relapse history",
      "Triggers",
      "Previous treatment attempts",
      "Current coping skills",
      "Recovery supports",
      "Motivation for change",
      "Environmental risks",
    ],
    asamDimensions: asamDimensionGuides,
  }),
  section({
    id: "summary-recommendations",
    title: "Summary & Recommendations",
    description:
      "Integrates assessment findings into a concise clinical picture and explains the recommended level of care.",
    whatItAsks:
      "This section integrates the entire assessment into a clear clinical picture and explains the recommended level of care.",
    whyItMatters:
      "The summary is where the assessment becomes a recommendation. It should connect diagnosis, ASAM ratings, risk, strengths, barriers, client preferences, and treatment planning direction.",
    listenFor: [
      "Diagnosis",
      "Severity",
      "ASAM ratings",
      "Strengths",
      "Risks",
      "Barriers",
      "Motivation",
      "Recovery supports",
      "Co-occurring needs",
      "Client preferences",
      "Level of care rationale",
    ],
    whereToFindInfo: [
      "Entire assessment",
      "DSM-5 diagnosis",
      "ASAM Dimensions 1-6",
      "Substance use history",
      "Mental health",
      "Physical health",
      "Legal",
      "Recovery environment",
      "Client strengths",
      "Treatment preferences",
    ],
    clientQuestions: [
      "Does this summary sound accurate to what you shared?",
      "What feels most important for treatment to focus on first?",
      "What strengths or supports should be included in the recommendation?",
      "What barriers might get in the way of attending or participating?",
      "What level of support feels realistic right now?",
    ],
    redFlags: [
      "Recommendation does not match ASAM ratings.",
      "Diagnosis is listed without evidence.",
      "Risks or safety needs are not addressed.",
      "Client preferences, strengths, or barriers are missing.",
      "No rationale for level of care.",
    ],
    asamConnections: [
      "Uses all six ASAM dimensions to justify level of care.",
      "Highest risk dimensions should be named in the rationale.",
      "Dimension 4 and 6 often explain engagement barriers and whether outpatient care is realistic.",
    ],
    clinicalExamples: [
      "Based on the information gathered during the comprehensive assessment, client meets criteria for Substance Use Disorder and demonstrates continued need for structured treatment services.",
      "Client presents with relapse vulnerability related to limited coping skills, environmental triggers, and history of continued use despite consequences.",
      "Recommended services include outpatient substance use treatment with relapse prevention, coping skill development, psychoeducation, and coordination with relevant supports.",
    ],
    commonMistakes: [
      {
        bad: "Client needs treatment.",
        better:
          "Client is recommended for outpatient substance use treatment based on diagnostic criteria, ASAM risk ratings, relapse vulnerability, and need for continued recovery support.",
      },
      {
        bad: "Recommend OP.",
        better:
          "Outpatient treatment is recommended due to moderate relapse risk, partial treatment readiness, stable enough biomedical/psychiatric presentation for outpatient participation, and need for structured coping and recovery support.",
      },
    ],
    relatedSections: [
      "dsm-5-diagnosis",
      "asam-dimensions",
      "substance-use-history",
      "mental-health",
      "physical-health",
      "legal",
      "recovery-supports",
      "client-preferences",
    ],
    missingInfo: [
      "Diagnosis and severity",
      "ASAM ratings and rationale",
      "Highest risk dimension",
      "Strengths and supports",
      "Barriers",
      "Client preference",
      "Recommended level of care",
    ],
  }),
  placeholderSection(
    "signatures-final-review",
    "Signatures / Final Review",
    "Final quality check before assessment completion, signatures, and recommendations are finalized.",
  ),
];

export function getAssessmentSection(id: string) {
  return assessmentSections.find((item) => item.id === id);
}

export const assessmentNavItems = assessmentSections.map((item) => ({
  title: item.title,
  path: `/kai-shin-procentive/${item.id}`,
}));

export type WordingCategory = {
  title: string;
  plainMeaning: string;
  examples: string[];
};

export const wordingCategories: WordingCategory[] = [
  {
    title: "Substance use severity",
    plainMeaning: "How serious the use pattern appears based on frequency, consequences, control, and impairment.",
    examples: [
      "Client reports escalating use with impaired control and continued use despite negative consequences.",
      "Substance use appears to significantly affect legal, relational, and occupational functioning.",
    ],
  },
  {
    title: "Withdrawal risk",
    plainMeaning: "Whether stopping or reducing use may create medical or safety concerns.",
    examples: [
      "Client reports withdrawal symptoms requiring continued monitoring and possible medical consultation.",
      "No current withdrawal symptoms were reported; continue to monitor based on use pattern and history.",
    ],
  },
  {
    title: "Mental health symptoms",
    plainMeaning: "How emotional/behavioral symptoms affect functioning and relapse vulnerability.",
    examples: [
      "Client reports anxiety symptoms that interfere with emotional regulation and increase relapse vulnerability.",
      "Client denies current suicidal ideation, plan, or intent; mood symptoms should continue to be monitored.",
    ],
  },
  {
    title: "Motivation/readiness",
    plainMeaning: "How willing and able the client is to engage in change right now.",
    examples: [
      "Client demonstrates mixed motivation, with external legal pressure and some emerging personal reasons for change.",
      "Client would benefit from MI interventions to explore ambivalence and strengthen internal motivation.",
    ],
  },
  {
    title: "Relapse risk",
    plainMeaning: "Likelihood of continued use or return to use without support.",
    examples: [
      "Relapse vulnerability is elevated due to cravings, boredom, loneliness, and limited coping responses.",
      "Client identifies high-risk peers and emotional distress as primary recurrence triggers.",
    ],
  },
  {
    title: "Recovery environment",
    plainMeaning: "How housing, peers, supports, transportation, and safety affect recovery.",
    examples: [
      "Recovery environment is unstable due to exposure to active substance use and limited sober support.",
      "Client would benefit from case management and recovery support development.",
    ],
  },
  {
    title: "Legal involvement",
    plainMeaning: "How court, probation, DWI, custody, or legal pressure affects treatment.",
    examples: [
      "Client reports legal involvement as a primary referral factor and demonstrates partially externally driven motivation.",
      "Legal stressors appear to increase treatment urgency and should be coordinated with valid releases as appropriate.",
    ],
  },
  {
    title: "Family/social functioning",
    plainMeaning: "How relationships and social patterns support or interfere with recovery.",
    examples: [
      "Client reports relationship strain related to substance use and limited sober peer support.",
      "Family concern appears to be a motivating factor for treatment engagement.",
    ],
  },
  {
    title: "Strengths",
    plainMeaning: "Protective factors that can support treatment participation and recovery.",
    examples: [
      "Client identifies employment, prior abstinence, and willingness to attend treatment as recovery strengths.",
      "Client demonstrates insight into triggers and expresses interest in building coping skills.",
    ],
  },
  {
    title: "Barriers",
    plainMeaning: "Obstacles that may interfere with treatment participation or recovery.",
    examples: [
      "Barriers include transportation instability, limited sober supports, and emotional distress.",
      "Client may need case management support to reduce practical barriers to treatment participation.",
    ],
  },
  {
    title: "Treatment recommendations",
    plainMeaning: "What services are recommended and why.",
    examples: [
      "Recommended services include outpatient SUD treatment focused on relapse prevention, coping skills, psychoeducation, and recovery support planning.",
      "Integrated attention to mental health symptoms is recommended due to emotional distress contributing to relapse vulnerability.",
    ],
  },
];

export type ClientScript = {
  title: string;
  script: string;
};

export const clientExplanationScripts: ClientScript[] = [
  {
    title: "DSM-5 Diagnosis",
    script:
      "This part helps us understand whether your substance use meets criteria for a substance use disorder and how severe it appears to be.",
  },
  {
    title: "ASAM",
    script:
      "These six areas help us decide what level of care will best support you. They look at withdrawal risk, health, mental health, readiness, relapse risk, and your recovery environment.",
  },
  {
    title: "Summary & Recommendations",
    script:
      "This is where we pull everything together and explain what services are being recommended and why.",
  },
  {
    title: "Presenting Problem",
    script:
      "This helps us understand what brought you here now, what feels most urgent, and what you want help with.",
  },
  {
    title: "Substance Use History",
    script:
      "I ask about your substance use pattern so we can understand risk, consequences, what has helped before, and what support fits now.",
  },
  {
    title: "Mental Health",
    script:
      "Mental health symptoms can affect cravings, coping, safety, and recovery, so we look at both substance use and emotional health together.",
  },
];

export type SimulatorProfile = {
  id: string;
  title: string;
  snapshot: string;
  relevantInfo: string[];
  sampleAsamRatings: string[];
  sampleJustification: string;
};

export const simulatorProfiles: SimulatorProfile[] = [
  {
    id: "meth-probation-anxiety",
    title: "Methamphetamine use, probation, anxiety, unstable environment",
    snapshot:
      "Client is referred by probation after methamphetamine-related legal consequences. Client reports anxiety, boredom/loneliness triggers, recent use, limited sober supports, and living with peers who use.",
    relevantInfo: [
      "Legal referral and external motivation.",
      "Methamphetamine use with relapse triggers.",
      "Anxiety symptoms increasing vulnerability.",
      "Unstable recovery environment and peer exposure.",
      "Limited coping skills and recovery supports.",
    ],
    sampleAsamRatings: [
      "D1: 1-2 depending on intoxication/withdrawal presentation.",
      "D3: 2 due to anxiety affecting emotional regulation.",
      "D4: 2 due to probation pressure and mixed motivation.",
      "D5: 3 due to recent use, triggers, and limited coping.",
      "D6: 3 due to active-use environment and limited sober support.",
    ],
    sampleJustification:
      "Outpatient SUD treatment with strong relapse prevention, MI, anxiety coping skills, probation coordination with ROI, and recovery environment planning is indicated. Dimension 5 and 6 are primary risk drivers.",
  },
  {
    id: "alcohol-dwi-employed",
    title: "Alcohol use, DWI, employed, moderate insight",
    snapshot:
      "Client presents after DWI. Client is employed, reports weekend binge drinking, acknowledges consequences, denies severe withdrawal, and has some supportive family involvement.",
    relevantInfo: [
      "DWI and legal consequences.",
      "Binge drinking pattern and impaired control.",
      "Employment is a strength.",
      "Moderate insight and some internal motivation.",
      "Need to assess withdrawal history and relapse risk.",
    ],
    sampleAsamRatings: [
      "D1: 0-1 if no withdrawal symptoms or severe history.",
      "D3: 0-1 unless mood/anxiety symptoms emerge.",
      "D4: 1-2 due to moderate insight and legal pressure.",
      "D5: 2 due to binge pattern and legal consequences.",
      "D6: 1-2 depending on social alcohol exposure.",
    ],
    sampleJustification:
      "Outpatient services focused on alcohol education, relapse prevention, decision-making, DWI risk reduction, and recovery-supportive routines appear appropriate if no higher medical or safety risks are identified.",
  },
  {
    id: "cannabis-young-adult-family-pressure",
    title: "Cannabis use, young adult, family pressure, low motivation",
    snapshot:
      "Young adult attends assessment after family pressure. Client reports daily cannabis use, low concern about use, school/work motivation problems, family conflict, and limited interest in treatment.",
    relevantInfo: [
      "Family pressure and low internal motivation.",
      "Daily cannabis use and possible functioning impact.",
      "Education/employment concerns.",
      "Family conflict and support complexity.",
      "Need to assess DSM-5 criteria and readiness.",
    ],
    sampleAsamRatings: [
      "D1: 0-1 unless withdrawal symptoms are reported.",
      "D3: 1-2 if mood, motivation, or cognitive symptoms affect functioning.",
      "D4: 3 if client strongly denies need for change.",
      "D5: 2 depending on daily use and coping alternatives.",
      "D6: 1-2 depending on family conflict and peer use.",
    ],
    sampleJustification:
      "Motivational interviewing and client-centered education are key. Treatment should focus on exploring personal goals, functioning impact, family conflict, and readiness rather than confrontation.",
  },
];
