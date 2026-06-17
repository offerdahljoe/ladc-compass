export type JourneyDocument = {
  name: string;
  code: string;
  purpose: string;
  clientExplanation: string;
  acknowledgement: string;
  counselorWatchFor: string[];
  commonQuestions: string[];
  suggestedResponse: string;
  nextStep: string;
  billable?: "Billable" | "Non-billable" | "Depends";
  whenToComplete?: string;
  mustInclude?: string[];
  wordingTemplate?: string;
};

export type JourneyPhase = {
  id: string;
  title: string;
  description: string;
  purpose: string;
  whatToDoNext: string[];
  requiredDocuments: JourneyDocument[];
  clientDialogue: string[];
  counselorThinking: string[];
  documentationGuidance: string[];
  clinicalWordingExamples: string[];
  commonMistakes: string[];
  nextSteps: string[];
  deadlines: string[];
  relatedAsamDimensions: string[];
  relatedTreatmentPlanAreas: string[];
};

export const documentLibrary: Record<string, JourneyDocument> = {
  intake: {
    name: "Intake",
    code: "PRO-1333",
    purpose:
      "Starts the client chart, captures basic demographics/contact information, and begins the service record.",
    clientExplanation:
      "This starts your chart and gives us the basic information we need to begin services. It helps us understand who you are, how to contact you, and what brought you in today.",
    acknowledgement:
      "Client is providing basic identifying/contact information and initial service information so the chart can be opened correctly.",
    counselorWatchFor: [
      "Correct identity and contact information.",
      "Emergency contact and communication preferences.",
      "Immediate safety, housing, transportation, or basic needs concerns.",
      "Signs the client is overwhelmed by paperwork.",
    ],
    commonQuestions: [
      "Why do you need all of this information?",
      "Who can see this?",
      "Do I have to list an emergency contact?",
    ],
    suggestedResponse:
      "We collect only what we need to open your chart, contact you, coordinate services, and respond safely if something urgent comes up.",
    nextStep: "Explain confidentiality, review the intake packet, and identify immediate needs.",
    billable: "Depends",
    whenToComplete: "At first contact/intake before ongoing services begin.",
    mustInclude: ["Accurate client information", "Reason for service", "Immediate needs", "Contact preferences"],
  },
  initialServicePlan: {
    name: "Chemical Dependency Initial Services Plan",
    code: "R682-1202",
    purpose:
      "Creates a short-term starting plan before the full assessment and full treatment plan are complete.",
    clientExplanation:
      "This is a short-term starting plan. Before we finish the full assessment and full treatment plan, we still want to identify your immediate needs and what you want help with right away.",
    acknowledgement:
      "Client understands the early service focus and agrees to initial service priorities while the full assessment is being completed.",
    counselorWatchFor: [
      "Immediate needs that cannot wait for the full treatment plan.",
      "Safety concerns, withdrawal concerns, or urgent referrals.",
      "Client's own words for what they want help with first.",
      "Basic barriers to attending services.",
    ],
    commonQuestions: ["Is this my treatment plan?", "Can this change later?"],
    suggestedResponse:
      "This is the starting plan. It can change after the full assessment gives us a clearer picture.",
    nextStep: "Complete assessment scheduling and begin gathering information for ASAM and treatment planning.",
    billable: "Non-billable",
    whenToComplete: "At admission/first service phase according to site workflow.",
    mustInclude: ["Immediate needs", "Initial services", "Client priorities", "Safety or referral needs"],
  },
  vulnerableAdult: {
    name: "Outpatient CD Vulnerable Adult Determination",
    code: "R682-1000",
    purpose:
      "Helps determine whether vulnerability, safety, protection, or abuse-prevention planning concerns must be addressed.",
    clientExplanation:
      "This helps us determine whether there are any safety, protection, or vulnerability concerns that we need to be aware of. It is part of making sure we are providing services safely and appropriately.",
    acknowledgement:
      "Client acknowledges review of vulnerability/safety determination questions and related program responsibilities.",
    counselorWatchFor: [
      "Cognitive, physical, mental health, or environmental vulnerability.",
      "Exploitation, abuse, neglect, coercion, or unsafe living situation.",
      "Need for Individual Abuse Prevention Plan.",
      "Mandated reporting or supervision needs.",
    ],
    commonQuestions: ["Why are you asking if I am vulnerable?", "Will this get someone in trouble?"],
    suggestedResponse:
      "These questions help us know whether extra safety planning or protection is needed. If a reporting requirement comes up, I will explain the process.",
    nextStep: "Complete Individual Abuse Prevention Plan if indicated and consult supervision on safety/reporting concerns.",
  },
  mandatedReporting: {
    name: "Notification of Mandated Reporting of Use of Controlled Substance",
    code: "W435-1015",
    purpose:
      "Explains required reporting situations and confidentiality limits related to safety, abuse, neglect, or serious risk.",
    clientExplanation:
      "This explains situations where we may be legally required to report certain safety concerns. Most of what you share is confidential, but there are some exceptions related to safety, abuse, neglect, or serious risk.",
    acknowledgement:
      "Client acknowledges that confidentiality has legal/safety exceptions and that mandated reporting may apply in specific situations.",
    counselorWatchFor: [
      "Client misunderstanding confidentiality as absolute.",
      "Disclosures involving child abuse/neglect, vulnerable adult maltreatment, or serious risk.",
      "Fear or anxiety about legal involvement.",
      "Need for supervisor consultation.",
    ],
    commonQuestions: ["Are you going to report me?", "What exactly do you have to report?"],
    suggestedResponse:
      "Most information is private. If something falls under a legal reporting requirement, I will explain what needs to happen and involve you as much as possible.",
    nextStep: "Review confidentiality, privacy practices, and releases of information.",
  },
  privacyPractices: {
    name: "Notice of Privacy Practices",
    code: "R682-1001 / R682-1013",
    purpose:
      "Explains how health information is protected, used for treatment/payment/operations, and when disclosure may or may not occur.",
    clientExplanation:
      "This explains how your health information is protected, how it can be used for treatment and billing, and when information can or cannot be shared.",
    acknowledgement:
      "Client acknowledges receiving privacy information and understanding how information may be used or disclosed.",
    counselorWatchFor: [
      "Questions about who can see records.",
      "Probation/family/employer concerns.",
      "Confusion between privacy practices and ROI forms.",
      "Need to explain 42 CFR Part 2 protections.",
    ],
    commonQuestions: ["Can my family see this?", "Can probation see this?", "Is this public?"],
    suggestedResponse:
      "Your information is protected. We usually need written permission to share with outside people unless a specific safety/legal exception applies.",
    nextStep: "Review ROIs only for contacts the client wants or that are clinically/legally needed.",
  },
  grievance: {
    name: "Grievance Procedures",
    code: "0298-1031",
    purpose:
      "Explains the client's right to raise concerns about services and how to file a grievance.",
    clientExplanation:
      "This explains what you can do if you ever feel something was handled unfairly or you have a concern about your services. You have the right to speak up and know how to file a grievance.",
    acknowledgement:
      "Client acknowledges receiving information about grievance rights and the process for concerns.",
    counselorWatchFor: [
      "Client fear of retaliation.",
      "Past negative treatment experiences.",
      "Confusion about who to contact.",
      "Need to normalize advocacy and client rights.",
    ],
    commonQuestions: ["Will I get in trouble if I complain?", "Who do I talk to first?"],
    suggestedResponse:
      "You have the right to raise concerns. The form explains the process and who you can contact.",
    nextStep: "Continue rights/responsibilities and treatment consent review.",
  },
  informedConsent: {
    name: "Informed Consent for Treatment",
    code: "R682-1003",
    purpose:
      "Confirms that the client understands and agrees to participate in services, including expectations, rights, confidentiality limits, and general nature of treatment.",
    clientExplanation:
      "This form explains what treatment will look like while you are here. It covers your rights, our responsibilities, confidentiality, and what you can expect from services. It is not meant to confuse you or pressure you. It is just making sure we are both on the same page before we begin.",
    acknowledgement:
      "Client agrees to participate in services and acknowledges understanding of treatment expectations, rights, and responsibilities.",
    counselorWatchFor: [
      "Does the client understand what they are signing?",
      "Does the client appear pressured or confused?",
      "Are there literacy, language, cognitive, or anxiety barriers?",
      "Does the client ask about confidentiality or legal involvement?",
    ],
    commonQuestions: ["Am I required to sign?", "Can I stop treatment?", "What happens if I miss groups?"],
    suggestedResponse:
      "This confirms that you understand what services involve. You can ask questions before signing, and we can talk through concerns.",
    nextStep: "Review privacy practices and releases of information.",
  },
  healthInfo: {
    name: "Information Regarding HIV, STDs, Drug & Alcohol Use During Pregnancy, Hepatitis, and Tuberculosis",
    code: "R682-1002",
    purpose:
      "Provides education about substance use and infectious disease or pregnancy-related health risks.",
    clientExplanation:
      "This gives important health information related to substance use and infectious disease risks. It is educational and helps make sure you have access to information that may support your health and safety.",
    acknowledgement:
      "Client acknowledges receiving health education information related to substance use and infectious disease/pregnancy risks.",
    counselorWatchFor: [
      "Questions about testing, medical care, pregnancy, hepatitis, TB, HIV, or STDs.",
      "Need for medical referral.",
      "Client shame or anxiety.",
      "Health risks connected to route of use.",
    ],
    commonQuestions: ["Do I need testing?", "Why is this part of treatment?"],
    suggestedResponse:
      "We provide this because substance use can affect health and safety. If you want medical testing or support, we can talk about referral options.",
    nextStep: "Note any medical referral needs and continue assessment.",
  },
  daanes: {
    name: "DAANES Notification of Data Collection",
    code: "R682-1007",
    purpose:
      "Explains that certain treatment information is reported to the state data system for treatment tracking and funding purposes.",
    clientExplanation:
      "This explains that certain treatment information is reported to the state system. This helps track treatment services and funding. It is protected information and is not public.",
    acknowledgement:
      "Client acknowledges receiving notice of state data collection related to treatment services.",
    counselorWatchFor: [
      "Client concerns about privacy.",
      "Confusion about state reporting versus public disclosure.",
      "Questions about funding or billing.",
    ],
    commonQuestions: ["Is my information public?", "Why does the state need this?"],
    suggestedResponse:
      "This information is used for treatment system reporting and funding. It is protected and not public.",
    nextStep: "Confirm forms are signed and proceed to assessment/service planning.",
  },
  comprehensiveAssessment: {
    name: "Comprehensive Assessment",
    code: "PRO-245G-E1100",
    purpose: "Documents full clinical assessment, diagnosis, ASAM dimensions, and recommendations.",
    clientExplanation: "This is the full assessment where we understand your history, needs, strengths, risks, and what services fit best.",
    acknowledgement: "Client participates in assessment and reviews recommendations.",
    counselorWatchFor: ["Missing ASAM evidence", "Diagnosis support", "Safety needs", "Client preferences"],
    commonQuestions: ["Why are there so many questions?"],
    suggestedResponse: "The questions help us make recommendations that fit your actual situation.",
    nextStep: "Complete diagnosis, ASAM summary, and treatment planning.",
  },
  treatmentPlan: {
    name: "Initial Treatment Plan",
    code: "R682-1203",
    purpose: "Turns assessment findings into goals, objectives, and interventions.",
    clientExplanation: "This plan turns what we learned into goals and next steps for treatment.",
    acknowledgement: "Client understands and agrees with treatment goals and services.",
    counselorWatchFor: ["Plan matches assessment", "Client voice", "Measurable objectives"],
    commonQuestions: ["Can the plan change?"],
    suggestedResponse: "Yes. We review and update it as your needs and progress change.",
    nextStep: "Begin services and document progress toward goals.",
    wordingTemplate:
      "Treatment plan was developed collaboratively with the client based on assessment findings and identified needs. Services are medically necessary to address substance use concerns within identified ASAM dimensions. Client strengths, preferences, and cultural considerations were incorporated into planning. Client verbalized understanding of and agreement with the treatment plan.",
  },
  individualNote: {
    name: "Billable Individual Service Note",
    code: "PRO-1333",
    purpose: "Documents an individual service, intervention, client response, risk, and plan.",
    clientExplanation: "This note documents what we worked on, how it relates to your goals, and what we plan next.",
    acknowledgement: "Client participated in individual service.",
    counselorWatchFor: ["ASAM link", "Intervention", "Client response", "Risk statement", "Next session"],
    commonQuestions: ["What goes in my note?"],
    suggestedResponse: "The note summarizes service focus, progress, risk if relevant, and next steps.",
    nextStep: "Schedule next session and continue treatment plan work.",
    billable: "Billable",
    wordingTemplate:
      "Client identified concerns related to [insert info]. Session focused on ASAM Dimension(s) [insert info]. Counselor provided client-centered support using evidence-based strategies including culturally aligned substance use education, motivational interviewing, trauma-informed approaches. Client was engaged/intermittently engaged and shared insights related to [insert info]. Participation today indicates stable/limited/guarded progress toward treatment goals. Client denied suicidal or homicidal ideation. No imminent risk identified. Continue individual sessions focusing on substance use recovery, education, and harm-reduction strategies. Next session scheduled for [insert info].",
  },
  groupNote: {
    name: "Billable Group Note",
    code: "R682-1305",
    purpose: "Documents group topic, facilitation, ASAM/treatment goal connection, and individual participation.",
    clientExplanation: "This note documents the group topic, skills practiced, and how you participated.",
    acknowledgement: "Client participated in group service.",
    counselorWatchFor: ["Group topic", "ASAM dimensions", "Individual response", "Risk statement"],
    commonQuestions: ["Will other group members be named?"],
    suggestedResponse: "Your note focuses on your participation, not other members' private information.",
    nextStep: "Continue group programming and link participation to treatment goals.",
    billable: "Billable",
    wordingTemplate:
      "Group: Clients participated in a group session focused on [group topic]. Group discussion and activities addressed ASAM Dimension(s) [insert info]. Facilitator provided client-centered, evidence-based support including culturally aligned substance use education, motivational interviewing techniques, and trauma-informed approaches within the group setting.\n\nIndividual: Client was engaged and participated through listening, sharing, reflection, or skill practice. Client shared insights related to [insert info]. Participation today indicates stable/limited/guarded progress toward treatment goals. Client denied suicidal or homicidal ideation. No imminent risk identified.",
  },
  contactLog: {
    name: "Contact Log",
    code: "PRO-1081",
    purpose: "Documents collateral contacts, outreach attempts, coordination, and follow-up.",
    clientExplanation: "This records care coordination contacts when you have signed permission or when policy requires documentation.",
    acknowledgement: "Client consent/ROI status is confirmed when applicable.",
    counselorWatchFor: ["Valid ROI", "Minimum necessary", "Purpose of contact", "Follow-up needed"],
    commonQuestions: ["What did you tell them?"],
    suggestedResponse: "We only share what the release allows and what is needed for coordination.",
    nextStep: "Document contact and update treatment coordination needs.",
    billable: "Non-billable",
  },
  transitionCarePlan: {
    name: "Transition Care Plan",
    code: "W435-1402",
    purpose: "Plans continuing care, supports, referrals, and risk reduction before discharge/transition.",
    clientExplanation: "This helps plan what support continues after this phase of treatment.",
    acknowledgement: "Client reviews transition supports and next steps.",
    counselorWatchFor: ["Aftercare", "Relapse prevention", "Appointments", "Medication/referrals", "Safety"],
    commonQuestions: ["What happens after discharge?"],
    suggestedResponse: "We plan supports before discharge so you are not leaving without a next step.",
    nextStep: "Complete discharge summary when discharge occurs.",
  },
  dischargeSummary: {
    name: "Discharge Summary",
    code: "R682-1401",
    purpose: "Summarizes treatment episode, progress, discharge reason, recommendations, and continuing care.",
    clientExplanation: "This summarizes what happened in treatment and what is recommended next.",
    acknowledgement: "Client reviews discharge and continuing-care recommendations when possible.",
    counselorWatchFor: ["Reason for discharge", "Progress", "Risk", "Recommendations", "Referrals"],
    commonQuestions: ["Can I come back later?"],
    suggestedResponse: "We can talk about re-engagement options and continuing supports.",
    nextStep: "Final chart review and close documentation gaps.",
  },
};

export const roiContactTypes = [
  "Probation officer",
  "CPS worker",
  "Primary care provider",
  "Mental health therapist",
  "Psychiatrist / medication provider",
  "MAT provider",
  "Case manager",
  "Family member",
  "Referral source",
  "Employer, only if appropriate and consented",
  "Recovery support",
];

function phase(data: JourneyPhase): JourneyPhase {
  return data;
}


export const clientJourneyPhases: JourneyPhase[] = [
  phase({
    id: "dashboard",
    title: "Client Journey Dashboard",
    description: "Start here to see the full Kai-Shin workflow and jump to the phase you are in right now.",
    purpose: "Orient yourself to where this client is in the 245G outpatient workflow before opening Procentive.",
    whatToDoNext: [
      "Identify which phase matches today's work (intake, assessment, individual, group, coordination, discharge).",
      "Open that phase and work the checklist while Procentive is open.",
      "Note any missing forms before billing or supervisor review.",
    ],
    requiredDocuments: [],
    clientDialogue: [],
    counselorThinking: ["Which phase am I actually in?", "What forms should already be signed?", "Is anything urgent before I continue?"],
    documentationGuidance: [],
    clinicalWordingExamples: [],
    commonMistakes: ["Jumping to a note type without confirming the workflow phase.", "Assuming intake is done because the client is sitting in front of you."],
    nextSteps: ["Open the matching phase from the sidebar."],
    deadlines: [],
    relatedAsamDimensions: [],
    relatedTreatmentPlanAreas: [],
  }),
  phase({
    id: "screening-first-contact",
    title: "Screening / First Contact",
    description: "Phone call, walk-in, or referral touch before intake paperwork — decide fit, urgency, and first appointment.",
    purpose: "Determine whether Kai-Shin outpatient is appropriate today, whether the person is safe to wait for intake, and what must happen before forms are signed.",
    whatToDoNext: [
      "Get name, callback number, and how they heard about Kai-Shin.",
      "Ask what substance(s), last use, and what prompted the call today.",
      "Screen for withdrawal, overdose risk, SI/HI, DV, and inability to get here safely.",
      "If withdrawal or medical instability: warm handoff or ER guidance — do not schedule routine intake alone.",
      "If appropriate for OP: schedule intake and tell them what to bring (ID, insurance, medication list).",
      "Log the contact in Procentive if your site workflow requires a pre-intake note.",
    ],
    requiredDocuments: [],
    clientDialogue: [
      "What brings you in today, and when was your last use?",
      "Are you having any withdrawal symptoms right now — shaking, nausea, seizures, seeing things?",
      "Are you safe today? Any thoughts of hurting yourself or someone else?",
      "Do you have a way to get to intake, and is there anyone we should know about for safety?",
    ],
    counselorThinking: [
      "Is this OP, IOP, residential, detox, or ER?",
      "Does probation/court timing affect how soon intake must happen?",
      "Am I documenting enough to hand off to whoever does intake?",
    ],
    documentationGuidance: [
      "If your site uses a screening log or intake scheduling note, record presenting concern, substances, last use, risk screen, and appointment offered.",
      "Document any safety guidance given and who was notified (supervisor, on-call, 911/CRISIS).",
    ],
    clinicalWordingExamples: [
      "Screening completed by phone. Client reported [substance/last use]. Withdrawal/safety screen: [findings]. Outpatient intake scheduled for [date/time]. Client verbalized understanding of location and what to bring.",
    ],
    commonMistakes: [
      "Scheduling intake without a basic withdrawal/safety screen.",
      "Promising services before confirming program fit.",
      "No record of the conversation when the client no-shows intake later.",
    ],
    nextSteps: ["Move to Intake Packet when the client arrives for admission paperwork."],
    deadlines: ["Address acute risk immediately — do not defer to intake day."],
    relatedAsamDimensions: [
      "Dimension 1: intoxication/withdrawal at first contact.",
      "Dimension 3: acute psychiatric or safety concerns.",
      "Dimension 6: transportation, housing, or environment barriers to showing up.",
    ],
    relatedTreatmentPlanAreas: ["Engagement", "Referral needs", "Immediate safety planning"],
  }),
  phase({
    id: "intake-packet",
    title: "Intake Packet",
    description:
      "The intake paperwork phase where rights, consent, privacy, initial service needs, and required notices are reviewed in plain language before signatures.",
    purpose:
      "The intake packet starts services correctly, protects client rights, explains confidentiality and treatment expectations, identifies immediate needs, and creates the first clinical/documentation bridge into assessment and treatment planning.",
    whatToDoNext: [
      "Welcome client.",
      "Confirm identity and contact information.",
      "Explain confidentiality in plain language.",
      "Review intake packet.",
      "Pause for questions before signatures.",
      "Complete Initial Service Plan.",
      "Ask about immediate needs or safety concerns.",
      "Ask about family involvement.",
      "Ask about ROIs.",
      "Schedule individual appointment.",
      "Confirm group schedule if applicable.",
      "Explain next steps.",
      "Document intake contact/session.",
      "Verify required forms are active and signed.",
    ],
    requiredDocuments: [
      documentLibrary.intake,
      documentLibrary.initialServicePlan,
      documentLibrary.vulnerableAdult,
      documentLibrary.mandatedReporting,
      documentLibrary.privacyPractices,
      documentLibrary.grievance,
      documentLibrary.informedConsent,
      documentLibrary.healthInfo,
      documentLibrary.daanes,
    ],
    clientDialogue: [
      "Before we start, I want you to know that I will walk you through each form and explain what it means in plain language. Please stop me at any point if something does not make sense. My goal is not just to have you sign paperwork, but to make sure you understand what you are signing and what treatment will look like.",
      "Most of what you share here is confidential. That means I cannot share it with other people unless you give written permission. There are a few safety-related exceptions, such as if there is serious risk of harm to you or someone else, or if abuse or neglect must legally be reported. We will also talk about releases of information if you want us to coordinate with probation, family, medical providers, or other supports.",
    ],
    counselorThinking: [
      "Does the client understand what they are signing?",
      "Are there language, literacy, cognitive, anxiety, or coercion barriers?",
      "Are there immediate safety, withdrawal, housing, transportation, or mandated reporting concerns?",
      "Which ROIs may be needed for care coordination?",
      "What needs to be addressed before the full assessment is complete?",
    ],
    documentationGuidance: [
      "Document that intake paperwork, confidentiality, consent, privacy practices, grievance rights, mandated reporting information, and DAANES notification were reviewed.",
      "Document client questions, refusals, barriers to understanding, immediate needs, and next scheduled service.",
      "If ROIs are discussed, document whether they were signed, declined, or deferred.",
    ],
    clinicalWordingExamples: [
      "Counselor reviewed intake packet with client in plain language, including confidentiality limits, privacy practices, informed consent, grievance procedure, mandated reporting information, and DAANES notification.",
      "Client was provided opportunity to ask questions prior to signature and verbalized understanding of initial service expectations.",
      "Initial service needs were reviewed, including immediate safety/basic needs concerns and next scheduled assessment/service appointments.",
    ],
    commonMistakes: [
      "Rushing signatures without checking understanding.",
      "Explaining confidentiality after the client already disclosed sensitive information.",
      "Forgetting to ask about ROIs for probation, referral source, family, medical, or mental health coordination.",
      "Not documenting client questions or refusal to sign a form.",
      "Missing the Initial Service Plan before full assessment/treatment plan are complete.",
    ],
    nextSteps: [
      "Schedule or begin Comprehensive Assessment.",
      "Complete Initial Service Plan if not already completed.",
      "Identify and complete ROIs for needed collateral contacts.",
      "Document intake contact/session.",
      "Confirm next individual and group appointments.",
    ],
    deadlines: [
      "Complete required intake/admission forms at the start of services according to Kai-Shin workflow.",
      "Initial Service Plan should be completed early enough to guide services before the full assessment/treatment plan.",
      "Do not wait to address immediate safety, withdrawal, mandated reporting, or basic needs concerns.",
    ],
    relatedAsamDimensions: [
      "Dimension 1 if withdrawal/intoxication concerns appear at intake.",
      "Dimension 3 if safety, mental health, or cognitive barriers affect understanding.",
      "Dimension 4 if client appears pressured, ambivalent, or confused about treatment.",
      "Dimension 6 if housing, transportation, family, legal, or basic needs barriers appear.",
    ],
    relatedTreatmentPlanAreas: [
      "Immediate stabilization needs.",
      "Engagement and orientation to services.",
      "Case management/referral needs.",
      "Client rights, consent, and barriers to participation.",
    ],
  }),
  phase({
    id: "admission-first-day",
    title: "Admission / First Day",
    description: "First active service day after intake paperwork — orient the client, confirm immediate needs, and start services.",
    purpose: "Bridge signed intake forms into actual treatment engagement: confirm the client understands the schedule, address barriers, and begin billable or clinical work tied to the Initial Service Plan.",
    whatToDoNext: [
      "Confirm all intake forms are signed and scanned in Procentive.",
      "Review R682-1202 Initial Service Plan priorities with the client in plain language.",
      "Orient to group schedule, individual counselor, UA policy, and how to reach the clinic.",
      "Re-screen safety/withdrawal if intake was more than a few days ago.",
      "Schedule Comprehensive Assessment if not already booked.",
      "Complete first billable individual or group note if a service occurs today.",
    ],
    requiredDocuments: [documentLibrary.initialServicePlan],
    clientDialogue: [
      "Today we are moving from paperwork into services. Here is what your week looks like.",
      "What got in the way of treatment before, and what do you need from us to show up?",
      "Before we go further — any changes in use, safety, or medical needs since intake?",
    ],
    counselorThinking: [
      "Does the Initial Service Plan match what the client actually needs this week?",
      "Are there ROIs we should complete before calling probation or providers?",
      "Is assessment scheduled within Kai-Shin timeframe?",
    ],
    documentationGuidance: [
      "Document orientation topics covered, client questions, and immediate plan updates.",
      "If services occur, use PRO-1333 or R682-1305 with ASAM dimension and treatment plan link.",
    ],
    clinicalWordingExamples: [
      "Client oriented to outpatient schedule, group expectations, UA policy, and confidentiality. Initial Service Plan reviewed. Client identified immediate priorities: [needs]. Comprehensive Assessment scheduled for [date].",
    ],
    commonMistakes: [
      "Assuming intake paperwork equals treatment engagement — document today's clinical contact.",
      "Starting groups before explaining attendance expectations to probation-involved clients.",
      "No assessment date on the calendar.",
    ],
    nextSteps: ["Comprehensive Assessment", "Collateral Contacts / ROIs if coordination is needed"],
    deadlines: [
      "Initial Service Plan R682-1202 should guide services before full treatment plan is complete.",
      "Do not delay assessment scheduling beyond Kai-Shin workflow.",
    ],
    relatedAsamDimensions: [
      "Dimension 4: readiness and engagement on first service day.",
      "Dimension 6: barriers to attending groups or appointments.",
    ],
    relatedTreatmentPlanAreas: ["Engagement", "Orientation", "Immediate service priorities"],
  }),
  phase({
    id: "comprehensive-assessment",
    title: "Comprehensive Assessment",
    description: "Full clinical assessment in PRO-245G-E1100 — history, DSM, ASAM, recommendations.",
    purpose: "Build the clinical story that drives diagnosis, ASAM placement, level-of-care rationale, and the Initial Treatment Plan. Use Clinical Decision Navigator alongside Procentive for this phase.",
    whatToDoNext: [
      "Open PRO-245G-E1100 and Clinical Decision Navigator side by side.",
      "Gather substance use, mental health, medical, legal, family/social, and recovery environment history.",
      "Complete DSM-5 criteria count and ASAM dimension ratings with rationale.",
      "Document strengths, barriers, risk, and client goals in the client's words.",
      "Draft recommendations and level-of-care consideration — review with supervisor if uncertain.",
      "Schedule treatment plan session and any referrals (MAT, mental health, medical).",
    ],
    requiredDocuments: [documentLibrary.comprehensiveAssessment],
    clientDialogue: [
      "I am going to ask detailed questions so our recommendations fit your actual situation, not a generic program.",
      "What has been the hardest part of stopping or cutting back?",
      "Who supports your recovery, and who makes it harder?",
      "Any mental health, medical, or medication concerns we should coordinate on?",
    ],
    counselorThinking: [
      "Do I have enough evidence for each DSM criterion I am considering?",
      "Which ASAM dimensions are driving placement — not just Dimension 1?",
      "What would make a supervisor question this assessment?",
    ],
    documentationGuidance: [
      "Each Procentive section should answer a different question — avoid repeating the same paragraph.",
      "ASAM ratings need brief rationale tied to client statements or observed behavior.",
      "Link recommendations to identified dimensions and barriers.",
    ],
    clinicalWordingExamples: [
      "Comprehensive assessment completed. Client reported [presenting pattern]. DSM-5 criteria support [severity] [substance] use disorder. ASAM dimensions [list elevated dimensions with brief rationale]. Recommendations: [LOC/services/referrals]. Client participated and reviewed findings.",
    ],
    commonMistakes: [
      "Copy-pasting generic ASAM language without client-specific rationale.",
      "Missing legal/probation context when it affects treatment.",
      "Assessment finished but treatment plan not scheduled.",
    ],
    nextSteps: ["Initial Treatment Plan R682-1203", "Complete ROIs for needed collateral contacts"],
    deadlines: [
      "Complete assessment within Kai-Shin/245G admission timeframe before ongoing services rely on an outdated picture.",
    ],
    relatedAsamDimensions: [
      "All six dimensions — this is where they are formally scored and narrated.",
    ],
    relatedTreatmentPlanAreas: [
      "Problem statements",
      "Goals/objectives seed data",
      "Referral and case management needs",
    ],
  }),
  phase({
    id: "initial-service-plan",
    title: "Initial Service Plan",
    description: "R682-1202 short-term plan before full assessment and treatment plan are done.",
    purpose: "Document immediate service priorities when the full clinical picture is still being gathered — especially during intake and early admission.",
    whatToDoNext: [
      "Open R682-1202 in Procentive.",
      "List immediate needs the client wants addressed this week (safety, housing, withdrawal referral, legal deadline).",
      "Identify initial services (individual, group, case management) the client agrees to.",
      "Note any safety or referral actions before assessment is complete.",
      "Review with client — this is a starting plan, not the full treatment plan.",
    ],
    requiredDocuments: [documentLibrary.initialServicePlan],
    clientDialogue: [
      "This is our short-term plan while we finish the full assessment. What do you want help with first?",
      "What would make it easier to show up this week?",
    ],
    counselorThinking: [
      "Are any needs too urgent to wait for comprehensive assessment?",
      "Does this match what intake already identified?",
    ],
    documentationGuidance: [
      "Use client language for priorities where possible.",
      "Document immediate services agreed to and any deferrals.",
    ],
    clinicalWordingExamples: [
      "Initial Service Plan completed with client. Immediate needs: [list]. Initial services: [list]. Client verbalized understanding that plan will be updated after comprehensive assessment.",
    ],
    commonMistakes: [
      "Skipping R682-1202 because assessment is scheduled next week.",
      "Writing treatment-plan-level goals before assessment is done.",
    ],
    nextSteps: ["Comprehensive Assessment", "Intake Packet if forms still missing"],
    deadlines: ["Complete early in admission per Kai-Shin workflow — before relying on full treatment plan."],
    relatedAsamDimensions: ["Dimension 1 and 3 if immediate medical/psychiatric needs appear."],
    relatedTreatmentPlanAreas: ["Immediate stabilization", "Engagement"],
  }),
  phase({
    id: "initial-treatment-plan",
    title: "Initial Treatment Plan",
    description: "R682-1203 — turn assessment findings into goals, objectives, and interventions.",
    purpose: "Create the contract for treatment: what you are working on, how you will know it is working, and which services address which ASAM needs.",
    whatToDoNext: [
      "Open R682-1203 and pull problem statements from assessment findings.",
      "Write goals/objectives the client can repeat back in their own words.",
      "Tie each objective to ASAM dimension(s) and service type (individual, group, coordination).",
      "Document medical necessity language — why OP services match current ASAM profile.",
      "Have client sign/review; schedule first treatment plan review date.",
    ],
    requiredDocuments: [documentLibrary.treatmentPlan],
    clientDialogue: [
      "Here is what we heard in assessment. Do these goals match what you want from treatment?",
      "What would progress look like for you in the next 30 days?",
    ],
    counselorThinking: [
      "Is every objective measurable and tied to assessment data?",
      "Are probation or payer expectations reflected without replacing client voice?",
    ],
    documentationGuidance: [
      "Use the treatment plan wording template in document library as a starting frame.",
      "Objectives should be specific enough to guide progress notes.",
    ],
    clinicalWordingExamples: [
      documentLibrary.treatmentPlan.wordingTemplate ?? "",
    ],
    commonMistakes: [
      "Generic goals ('maintain sobriety') with no link to assessment findings.",
      "Plan signed without client understanding group/individual expectations.",
    ],
    nextSteps: ["Ongoing Individual Sessions", "Group Sessions", "Treatment Plan Reviews on schedule"],
    deadlines: ["Initial treatment plan due per 245G/Kai-Shin timing after assessment completion."],
    relatedAsamDimensions: ["Each elevated dimension should map to at least one objective or intervention."],
    relatedTreatmentPlanAreas: ["All active problem areas from assessment"],
  }),
  phase({
    id: "ongoing-individual-sessions",
    title: "Ongoing Individual Sessions",
    description: "Billable individual work in PRO-1333 tied to treatment plan and ASAM.",
    purpose: "Document focused individual clinical work — not a duplicate of group content — with intervention, client response, risk, and plan for next session.",
    whatToDoNext: [
      "Open PRO-1333 before or right after session while details are fresh.",
      "State session focus and which treatment plan objective(s) you addressed.",
      "Name ASAM dimension(s) and intervention approach (MI, education, relapse planning, etc.).",
      "Document client response, progress toward goal, and any risk screen.",
      "Schedule next individual and note homework or referrals.",
    ],
    requiredDocuments: [documentLibrary.individualNote],
    clientDialogue: [
      "What do you want to focus on today that connects to your treatment plan?",
      "Since last time — any use, cravings, safety concerns, or probation issues?",
    ],
    counselorThinking: [
      "Does this note prove medical necessity for today's service?",
      "If progress is flat, does the plan need updating?",
    ],
    documentationGuidance: [
      "Use Procentive Wording Mode in Clinical Decision Navigator or Documentation Lab for draft language.",
      "Include risk statement (SI/HI denied or described with plan).",
    ],
    clinicalWordingExamples: [
      documentLibrary.individualNote.wordingTemplate ?? "",
    ],
    commonMistakes: [
      "Vague notes ('discussed recovery') with no ASAM or treatment plan link.",
      "Missing risk statement.",
      "Billing individual when the contact was really non-billable coordination.",
    ],
    nextSteps: ["Next scheduled individual", "Treatment Plan Review if goals are stale"],
    deadlines: ["Complete PRO-1333 same day or per Kai-Shin billing workflow."],
    relatedAsamDimensions: ["Document whichever dimensions today's intervention addressed."],
    relatedTreatmentPlanAreas: ["Active objectives from R682-1203"],
  }),
  phase({
    id: "group-sessions",
    title: "Group Sessions",
    description: "Billable group documentation in R682-1305 with topic, ASAM link, and individual participation.",
    purpose: "Prove each client received clinically relevant group content connected to their treatment plan — without documenting other members' private information.",
    whatToDoNext: [
      "Facilitate with a clear topic tied to curriculum or treatment plan themes.",
      "During or immediately after group, open R682-1305 for each attendee.",
      "Document group topic, ASAM dimension(s), and facilitator interventions.",
      "For each client: participation level, individual response, risk screen, plan.",
      "Track attendance for probation/ROI reporting if applicable.",
    ],
    requiredDocuments: [documentLibrary.groupNote],
    clientDialogue: [
      "Today's group is about [topic]. How does this connect to what you are working on in your plan?",
    ],
    counselorThinking: [
      "Is the group topic defensible as addressing ASAM/treatment plan needs?",
      "Did anyone present risk that needs individual follow-up?",
    ],
    documentationGuidance: [
      "Group section can be similar across members; individual section must be client-specific.",
      "Use group note wording template — customize participation and insights.",
    ],
    clinicalWordingExamples: [
      documentLibrary.groupNote.wordingTemplate ?? "",
    ],
    commonMistakes: [
      "Same individual paragraph for every group member.",
      "Naming other clients in a member's note.",
      "No follow-up when a client discloses risk in group.",
    ],
    nextSteps: ["Individual follow-up if risk disclosed", "Update coordination if attendance report due"],
    deadlines: ["Complete group notes per Kai-Shin billing turnaround."],
    relatedAsamDimensions: ["Typically Dimensions 4–6 for skills, relapse, environment — document honestly."],
    relatedTreatmentPlanAreas: ["Group-related objectives", "Skills-building goals"],
  }),
  phase({
    id: "treatment-coordination",
    title: "Treatment Coordination",
    description: "Non-billable coordination, outreach, and continuity-of-care contacts documented in PRO-1081.",
    purpose: "Track calls, faxes, and outreach that keep care connected — especially when ROI allows probation, medical, or mental health coordination.",
    whatToDoNext: [
      "Confirm ROI or policy basis before contacting anyone outside Kai-Shin.",
      "Open PRO-1081 Contact Log.",
      "Record date/time, who you contacted, purpose, information shared/requested (minimum necessary), outcome.",
      "Note follow-up tasks and add to calendar if needed.",
      "If weekly progress notes to probation are required, use coordination template language.",
    ],
    requiredDocuments: [documentLibrary.contactLog],
    clientDialogue: [
      "I am going to contact [provider/probation] about [purpose]. The release allows [scope]. Is that still okay with you?",
    ],
    counselorThinking: [
      "Is this coordination or a billable individual session?",
      "Am I sharing only what ROI permits?",
    ],
    documentationGuidance: [
      "Contact Log for each attempt — including no-answer calls if site policy requires.",
      "Weekly progress coordination may use documentationTemplates treatment coordination wording.",
    ],
    clinicalWordingExamples: [
      "Treatment coordination completed with [contact] regarding [purpose]. Information shared limited to ROI scope. Outcome: [result]. Follow-up: [action].",
    ],
    commonMistakes: [
      "Discussing client details in hallway conversation without ROI or documentation.",
      "Forgetting to log failed contact attempts.",
    ],
    nextSteps: ["Collateral Contacts / ROIs if new releases needed", "Update treatment plan if coordination changes goals"],
    deadlines: ["Document contacts promptly — same day when possible."],
    relatedAsamDimensions: ["Dimension 3 and 6 when coordinating mental health, medical, legal, or family supports."],
    relatedTreatmentPlanAreas: ["Case management", "Legal coordination", "Continuing care"],
  }),
  phase({
    id: "collateral-contacts-rois",
    title: "Collateral Contacts / ROIs",
    description:
      "Helps the counselor understand who to contact, why, what can be shared, what to ask for, and how to document collateral coordination.",
    purpose:
      "ROI and collateral coordination supports continuity of care while protecting confidentiality. The counselor must confirm consent before contacting supports unless a legally required safety exception applies.",
    whatToDoNext: [
      "Identify why collateral contact is clinically or legally needed.",
      "Confirm a valid ROI is signed and active.",
      "Check what information can be shared and requested.",
      "Prepare a short purpose statement before calling.",
      "Use minimum necessary information.",
      "Document the contact in Contact Log PRO-1081.",
      "Follow up on requested records, expectations, or recommendations.",
    ],
    requiredDocuments: [
      {
        ...documentLibrary.contactLog,
        wordingTemplate:
          "Collateral contact completed with [contact type/name] after confirming ROI. Purpose of contact was [purpose]. Information shared/requested was limited to [scope]. Follow-up needed: [follow-up].",
      },
      {
        name: "ROI MAARC",
        code: "R563-1003",
        purpose: "Authorizes communication with MAARC when applicable.",
        clientExplanation: "This release tells us whether we can communicate with MAARC and what information may be shared.",
        acknowledgement: "Client authorizes or declines specified MAARC communication.",
        counselorWatchFor: ["Scope", "Expiration", "Client questions", "Minimum necessary"],
        commonQuestions: ["What is being shared?"],
        suggestedResponse: "Only what the release allows and what is needed for the stated purpose.",
        nextStep: "Document signed ROI status and any contact.",
      },
      {
        name: "ROI Medical Billing",
        code: "R562-1013",
        purpose: "Authorizes information sharing related to medical billing when applicable.",
        clientExplanation: "This release is used when billing-related communication is needed.",
        acknowledgement: "Client authorizes or declines billing-related communication.",
        counselorWatchFor: ["Billing scope", "Client understanding", "Minimum necessary"],
        commonQuestions: ["Is this for treatment or billing?"],
        suggestedResponse: "This one is specific to billing-related communication.",
        nextStep: "Document ROI status.",
      },
      {
        name: "ROI General Use",
        code: "R682-1019",
        purpose: "Authorizes communication with probation, providers, family, referral sources, or other supports as specified.",
        clientExplanation: "This release lets us coordinate with the people or providers you choose. You can ask what will be shared and with whom.",
        acknowledgement: "Client authorizes or declines communication with named collateral supports.",
        counselorWatchFor: ["Specific contact", "Scope", "Expiration", "Revocation rights", "Client pressure"],
        commonQuestions: ["Can I limit what you share?", "Can I revoke it?"],
        suggestedResponse: "Yes, releases can be specific. We review what is shared, with whom, and for what purpose.",
        nextStep: "Complete collateral contact and Contact Log if coordination occurs.",
      },
    ],
    clientDialogue: [
      "A release of information tells us who we can talk to, what we can share, and why. You can ask questions before signing, and we only share what is allowed and needed.",
      "Never contact collateral supports without a valid ROI unless there is a legally required safety exception. Always document the contact in the Contact Log PRO-1081.",
    ],
    counselorThinking: [
      "Is the contact necessary for treatment, legal coordination, safety, billing, or referral?",
      "Does the ROI name the correct person/agency and scope of information?",
      "What information is needed from the collateral contact?",
      "What information is allowed to be shared?",
      "What follow-up must be documented?",
    ],
    documentationGuidance: [
      "Document ROI status before contact.",
      "Document date/time, contact person, purpose, information shared/requested, outcome, and follow-up.",
      "Use minimum necessary information and avoid unnecessary details.",
    ],
    clinicalWordingExamples: [
      "Counselor confirmed signed ROI prior to collateral contact with probation officer. Contact focused on treatment expectations, reporting requirements, and coordination needs.",
      "Counselor documented collateral contact in Contact Log PRO-1081 and identified follow-up need for updated attendance/progress communication.",
      "Client declined ROI at this time; counselor reviewed how lack of ROI may limit coordination and documented client preference.",
    ],
    commonMistakes: [
      "Calling probation, family, or providers before verifying ROI.",
      "Sharing more information than the ROI allows.",
      "Forgetting to document attempted contacts.",
      "Treating a family member's concern as fact without client assessment.",
      "Using ROI as a blanket permission instead of checking specific scope.",
    ],
    nextSteps: [
      "Complete Contact Log PRO-1081.",
      "Update treatment coordination needs.",
      "Bring conflicting collateral information to supervision.",
      "Use received information to support assessment, ASAM, treatment planning, or discharge planning.",
    ],
    deadlines: [
      "Contact only after valid ROI unless safety/legal exception applies.",
      "Document collateral contact promptly after it occurs.",
      "Track follow-up items so coordination does not get lost.",
    ],
    relatedAsamDimensions: [
      "Dimension 3: mental health/safety collateral.",
      "Dimension 4: probation/legal expectations may affect readiness.",
      "Dimension 5: relapse history and supports.",
      "Dimension 6: family, housing, employment, recovery supports, environment.",
    ],
    relatedTreatmentPlanAreas: [
      "Coordination with legal/referral sources.",
      "Case management needs.",
      "Family/support involvement.",
      "Continuing care and discharge supports.",
    ],
  }),
  phase({
    id: "treatment-plan-reviews",
    title: "Treatment Plan Reviews",
    description: "Periodic R682-1203 updates — progress, barriers, continued medical necessity.",
    purpose: "Show the chart reflects current clinical reality: what changed, what worked, what did not, and why continued services remain appropriate.",
    whatToDoNext: [
      "Pull up current R682-1203 and recent PRO-1333 / R682-1305 notes.",
      "Review each goal/objective with the client — met, in progress, or needs revision.",
      "Update ASAM-linked language if dimensions shifted (new MH symptoms, relapse, housing loss).",
      "Document continued medical necessity for outpatient level of care.",
      "Obtain client signature on updated plan per workflow.",
    ],
    requiredDocuments: [documentLibrary.treatmentPlan],
    clientDialogue: [
      "Since your last plan, what improved and what got harder?",
      "Are these goals still the right focus, or should we change direction?",
    ],
    counselorThinking: [
      "Would a payer audit see progress or stagnation documented?",
      "Does the plan still match ASAM findings?",
    ],
    documentationGuidance: [
      "Reference specific progress or lack of progress from notes — not generic 'client progressing'.",
      "Document barrier updates and revised objectives.",
    ],
    clinicalWordingExamples: [
      "Treatment plan reviewed with client. Progress noted on [objectives]. Barriers include [barriers]. Plan updated to include [changes]. Client agreed to continued outpatient services based on ASAM dimensions [list].",
    ],
    commonMistakes: [
      "Rubber-stamping the old plan without clinical discussion.",
      "Review overdue because notes were backlogged.",
    ],
    nextSteps: ["Continue ongoing services", "Transition Planning if discharge is approaching"],
    deadlines: ["Follow Kai-Shin review interval — do not let plan expire silently."],
    relatedAsamDimensions: ["Re-rate or narrate any dimension that changed since initial plan."],
    relatedTreatmentPlanAreas: ["All active goals — update or close with rationale"],
  }),
  phase({
    id: "transition-planning",
    title: "Transition Planning",
    description: "W435-1402 Transition Care Plan before step-down, transfer, or discharge.",
    purpose: "Ensure the client leaves with supports — appointments, MAT, recovery meetings, safety plan — not a sudden stop in care.",
    whatToDoNext: [
      "Open W435-1402 Transition Care Plan.",
      "Identify continuing care: IOP step-down, MAT provider, therapist, recovery supports.",
      "Document relapse prevention strategies and early warning signs client recognizes.",
      "Confirm medication/refill plan and crisis numbers.",
      "Schedule discharge summary session if discharge is imminent.",
    ],
    requiredDocuments: [documentLibrary.transitionCarePlan],
    clientDialogue: [
      "Before you leave our program, let's map what support continues and who you call if things get hard.",
      "What is your plan for the first week after discharge?",
    ],
    counselorThinking: [
      "Is this transition clinically appropriate or driven only by attendance/policy?",
      "Any ROI contacts needed to warm-handoff care?",
    ],
    documentationGuidance: [
      "List specific appointments with dates when known.",
      "Document client response to transition plan and barriers to follow-through.",
    ],
    clinicalWordingExamples: [
      "Transition Care Plan developed with client. Continuing care: [list]. Relapse prevention strategies: [list]. Client verbalized understanding of follow-up appointments and crisis resources.",
    ],
    commonMistakes: [
      "Discharge without transition plan because client 'said they were fine'.",
      "Generic aftercare list with no client-specific barriers addressed.",
    ],
    nextSteps: ["Discharge Summary R682-1401 when episode ends"],
    deadlines: ["Complete transition planning before discharge date — not after."],
    relatedAsamDimensions: ["Dimension 5 and 6 for relapse risk and recovery environment post-discharge."],
    relatedTreatmentPlanAreas: ["Aftercare", "Relapse prevention", "Recovery supports"],
  }),
  phase({
    id: "discharge-summary",
    title: "Discharge Summary",
    description: "R682-1401 episode summary — progress, reason for discharge, recommendations.",
    purpose: "Close the treatment episode with a defensible summary for the chart, client, and any ROI recipient who needs continuity.",
    whatToDoNext: [
      "Open R682-1401 Discharge Summary.",
      "Summarize admission date, services received, and presenting problem at admission.",
      "Document progress toward goals, current status, and reason for discharge.",
      "Include recommendations, referrals, and risk considerations at discharge.",
      "Review with client when possible; coordinate ROI transmission if required.",
    ],
    requiredDocuments: [documentLibrary.dischargeSummary],
    clientDialogue: [
      "This summary captures what we worked on and what we recommend next. Anything you want corrected before we finalize?",
    ],
    counselorThinking: [
      "Does reason for discharge match chart facts (completion, AMA, administrative, transfer)?",
      "If discharge is early, is risk documented and handoff clear?",
    ],
    documentationGuidance: [
      "Align discharge summary with transition plan and recent progress notes.",
      "Include continuing care appointments actually scheduled — not aspirational.",
    ],
    clinicalWordingExamples: [
      "Client admitted [date] for [presenting concern]. Services included [individual/group/coordination]. Progress: [summary]. Discharge status: [reason]. Recommendations: [aftercare]. Client [participated/declined review] at discharge.",
    ],
    commonMistakes: [
      "Contradicting attendance records or last progress note.",
      "Missing recommendations when client may re-engage later.",
    ],
    nextSteps: ["Final Chart Review", "Close any open ROI coordination tasks"],
    deadlines: ["Complete discharge summary per Kai-Shin/245G timeframe at episode end."],
    relatedAsamDimensions: ["Note residual dimension needs at discharge for continuing care."],
    relatedTreatmentPlanAreas: ["Final status on each goal"],
  }),
  phase({
    id: "final-chart-review",
    title: "Final Chart Review",
    description: "Pre-closure QA — forms, signatures, note gaps, ROI, billing alignment.",
    purpose: "Catch what supervisors and auditors catch: missing signatures, date gaps, plan reviews, and mismatched billing before the chart is closed.",
    whatToDoNext: [
      "Verify intake packet complete and signed (all R682/PRO intake forms).",
      "Confirm assessment, initial plan, and required plan reviews on timeline.",
      "Scan for note gaps on dates services were billed.",
      "Check ROIs active for any documented collateral contacts.",
      "Confirm discharge/transition documents if episode ended.",
      "Run Procentive Companion 'Where Does This Go?' on anything unusual.",
    ],
    requiredDocuments: [],
    clientDialogue: [],
    counselorThinking: [
      "If a surveyor opened this chart tomorrow, what would they question first?",
      "Are ASAM and medical necessity visible across assessment, plan, and notes?",
    ],
    documentationGuidance: [
      "Use a personal checklist or supervisor tool — document corrections made.",
      "Add addendum notes rather than silent edits when policy requires.",
    ],
    clinicalWordingExamples: [
      "Chart review completed prior to closure. Corrections: [list or 'none identified']. All required 245G documents present per Kai-Shin workflow.",
    ],
    commonMistakes: [
      "Closing chart with unsigned treatment plan.",
      "Individual notes with no treatment plan in chart.",
      "Contact Log entries without ROI on file.",
    ],
    nextSteps: ["Close chart in Procentive per supervisor approval"],
    deadlines: ["Complete before billing finalization or internal audit deadlines."],
    relatedAsamDimensions: ["Verify assessment ASAM narrative matches later notes."],
    relatedTreatmentPlanAreas: ["Verify plan problems match note focus over time"],
  }),
];

export const clientJourneyNavItems = clientJourneyPhases.map((phase) => ({
  title: phase.title,
  path: `/client-journey/${phase.id}`,
}));

export function getClientJourneyPhase(id: string) {
  return clientJourneyPhases.find((phase) => phase.id === id);
}

export const journeyTimeline = [
  "Screening / First Contact",
  "Intake Packet",
  "Admission / First Day",
  "Comprehensive Assessment",
  "Initial Service Plan",
  "Initial Treatment Plan",
  "Ongoing Services",
  "Treatment Plan Reviews",
  "Transition Planning",
  "Discharge Summary",
  "Final Chart Review",
];

export const coordinationTemplates = {
  probation:
    "Hello, this is Joe Offerdahl, ADC-T with Kai-Shin Clinic in Bemidji. I have a signed release of information for [client name], and I am calling to coordinate care. I wanted to confirm any treatment-related expectations, reporting needs, court or probation requirements, and any concerns you believe would be helpful for us to know as we support the client in treatment.",
  therapist:
    "Hello, this is Joe Offerdahl, ADC-T with Kai-Shin Clinic. I have a signed ROI for [client name]. I am reaching out to coordinate care and better understand any current mental health concerns, treatment goals, safety considerations, or recommendations that may support the client's substance use treatment.",
  family:
    "Hello, this is Joe Offerdahl with Kai-Shin Clinic. [Client name] signed a release allowing us to speak with you. I am calling to better understand what support looks like from your perspective and to see whether there are concerns or strengths that may help us support the client's recovery.",
};

export const documentationTemplates = [
  {
    title: "Individual Session Billable",
    code: "PRO-1333",
    billable: "Billable",
    template: documentLibrary.individualNote.wordingTemplate ?? "",
  },
  {
    title: "Initial Treatment Plan",
    code: "R682-1203",
    billable: "Non-billable",
    template: documentLibrary.treatmentPlan.wordingTemplate ?? "",
  },
  {
    title: "Group Note",
    code: "R682-1305",
    billable: "Billable",
    template: documentLibrary.groupNote.wordingTemplate ?? "",
  },
  {
    title: "Treatment Coordination Note",
    code: "Contact Log / Coordination Note",
    billable: "Usually non-billable",
    template:
      "Treatment coordination services were provided via faxed weekly progress note to support continuity of care and engagement in recommended services.",
  },
  {
    title: "Weekly Progress Note",
    code: "Weekly Progress Note",
    billable: "Depends",
    template:
      "During this period, treatment coordination focused on supporting client engagement and continuity of care. Client reported [outside services or none]. Coordination needs were reviewed and will continue to be monitored as clinically indicated. Client identified barriers to coordination including [identified barriers], which will be addressed in ongoing treatment. No additional treatment coordination needs were identified during this review period. Client engaged in [number] group sessions and [number] individual sessions.",
  },
  {
    title: "Telehealth Statement",
    code: "Telehealth addendum",
    billable: "Use with service note",
    template:
      "Service provided via telehealth. Client location verified in Minnesota. Telehealth consent previously obtained.",
  },
];
