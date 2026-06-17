export type AdcExamQuestion = {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  answer: number; // 0-based index
  explanation: string;
};

export const adcExamQuestionsAdditional: AdcExamQuestion[] = [
  {
    id: "q21",
    topic: "Intake",
    prompt:
      "At intake, a client becomes tearful when asked about recent arrests. What is the best counselor response?",
    choices: [
      "Skip the legal history section to avoid distress.",
      "Pause, acknowledge distress, explain why the question matters, and ask permission to continue when ready.",
      "Tell the client they must answer every question or leave.",
      "Document refusal and end intake immediately.",
    ],
    answer: 1,
    explanation:
      "Intake balances thoroughness with rapport. Acknowledging emotion, providing rationale, and offering pacing supports engagement without abandoning necessary assessment.",
  },
  {
    id: "q22",
    topic: "Screening",
    prompt:
      "A walk-in reports daily stimulant use, no prior treatment, and denies withdrawal symptoms. Which screening step is most appropriate next?",
    choices: [
      "Assign a diagnosis of severe stimulant use disorder on the spot.",
      "Use a brief validated screen, assess safety, and determine whether full assessment or urgent referral is indicated.",
      "Enroll the client in residential treatment without further questions.",
      "Defer all screening until the second session.",
    ],
    answer: 1,
    explanation:
      "Screening identifies severity, risk, and appropriate next level of service. It does not replace comprehensive assessment or bypass safety checks.",
  },
  {
    id: "q23",
    topic: "Assessment",
    prompt:
      "During biopsychosocial assessment, which area is most important to explore for treatment planning?",
    choices: [
      "Only the client's favorite coping skills from a worksheet.",
      "Substance use pattern, mental health symptoms, supports, barriers, trauma history, and functional impairment.",
      "Whether the counselor agrees with the client's self-diagnosis.",
      "The counselor's personal recovery story.",
    ],
    answer: 1,
    explanation:
      "A thorough assessment gathers multidimensional information that informs ASAM level-of-care thinking and individualized treatment planning.",
  },
  {
    id: "q24",
    topic: "Treatment Planning",
    prompt:
      "A client wants to repair family relationships but has no clear steps. What is the strongest initial treatment plan goal?",
    choices: [
      "Client will have better relationships.",
      "Client will stop being angry.",
      "Client will identify two communication behaviors to practice with one family member and review progress in four sessions.",
      "Counselor will fix family conflict.",
    ],
    answer: 2,
    explanation:
      "Effective goals are specific, measurable, client-centered, and time-limited. Vague goals are difficult to track or evaluate.",
  },
  {
    id: "q25",
    topic: "Counseling",
    prompt:
      "In individual counseling, a client repeatedly minimizes consequences of use. Which approach best fits evidence-based SUD counseling?",
    choices: [
      "Argue until the client admits the truth.",
      "Use structured exploration of consequences, values, and coping while maintaining a collaborative stance.",
      "Ignore minimization because confrontation works better in group.",
      "End counseling until the client is honest.",
    ],
    answer: 1,
    explanation:
      "Counseling uses structured techniques to increase insight and behavior change while preserving alliance. Argument and punitive responses usually reduce engagement.",
  },
  {
    id: "q26",
    topic: "Case Management",
    prompt:
      "A client lost identification and cannot access MAT or shelter beds. With a valid release, what is the best case management action?",
    choices: [
      "Tell the client to figure it out independently to build accountability.",
      "Coordinate with agency resources or community partners to obtain replacement ID and remove access barriers.",
      "Share the client's full chart with any agency that asks.",
      "Delay all services until the client finds employment.",
    ],
    answer: 1,
    explanation:
      "Case management addresses practical barriers to treatment and recovery through coordination, advocacy, and linkage when authorized.",
  },
  {
    id: "q27",
    topic: "Crisis Intervention",
    prompt:
      "A client in session discloses they took pills an hour ago and feel drowsy. What is the best immediate response?",
    choices: [
      "Schedule a follow-up next week.",
      "Activate emergency medical response according to agency policy and stay with the client until help arrives.",
      "Ask the client to sleep it off in the waiting room alone.",
      "Document the disclosure without further action because the client is an adult.",
    ],
    answer: 1,
    explanation:
      "Possible overdose or medical emergency requires immediate emergency intervention, not delayed counseling or passive monitoring.",
  },
  {
    id: "q28",
    topic: "Client Education",
    prompt:
      "A client using fentanyl-contaminated pills asks how naloxone works. What is the best education response?",
    choices: [
      "Explain that naloxone can temporarily reverse opioid overdose and discuss when and how to use it and call 911.",
      "Tell the client naloxone encourages continued use and should be avoided.",
      "Prescribe naloxone yourself.",
      "Refuse to discuss harm reduction because abstinence is the only goal.",
    ],
    answer: 0,
    explanation:
      "Client education includes accurate overdose response information within scope. Medication prescribing is not within LADC scope.",
  },
  {
    id: "q29",
    topic: "Referral",
    prompt:
      "Assessment reveals active psychotic symptoms unrelated to intoxication. What should the counselor do?",
    choices: [
      "Continue only SUD group counseling.",
      "Refer for psychiatric evaluation and coordinate care while addressing substance use within scope.",
      "Tell the client symptoms will disappear if they stop using.",
      "Ignore psychiatric symptoms because they are outside billing.",
    ],
    answer: 1,
    explanation:
      "When symptoms exceed SUD counseling scope, timely referral and coordinated care protect the client and support treatment engagement.",
  },
  {
    id: "q30",
    topic: "Record Keeping",
    prompt:
      "Which practice best supports accurate record keeping?",
    choices: [
      "Backdate notes to meet deadlines.",
      "Enter timely, factual, signed entries that reflect services provided and clinical decision-making.",
      "Store client information in personal text messages for convenience.",
      "Use only initials and slang so outsiders cannot understand the chart.",
    ],
    answer: 1,
    explanation:
      "Records should be contemporaneous or promptly completed, factual, legible, and sufficient for continuity of care and regulatory compliance.",
  },
  {
    id: "q31",
    topic: "Consultation",
    prompt:
      "You suspect a colleague is documenting services that did not occur. What is the best first step?",
    choices: [
      "Confront the colleague publicly in the waiting room.",
      "Follow agency ethics policy, consult supervision or compliance, and report through proper channels as required.",
      "Ignore it because it is not your client.",
      "Alter your own notes to match theirs.",
    ],
    answer: 1,
    explanation:
      "Ethical concerns about fraudulent documentation require consultation and reporting through established agency and professional channels.",
  },
  {
    id: "q32",
    topic: "ASAM",
    prompt:
      "A client with alcohol use disorder has elevated liver enzymes, poor nutrition, and no current withdrawal risk. Which ASAM dimension is most directly elevated?",
    choices: [
      "Dimension 1",
      "Dimension 2",
      "Dimension 4",
      "Dimension 6",
    ],
    answer: 1,
    explanation:
      "Dimension 2 addresses biomedical conditions and complications, including liver disease and related health concerns.",
  },
  {
    id: "q33",
    topic: "DSM-5",
    prompt:
      "A client meets five SUD criteria for cannabis. No social role impairment is reported. What severity specifier is most appropriate?",
    choices: [
      "Mild",
      "Moderate",
      "Severe",
      "In remission",
    ],
    answer: 2,
    explanation:
      "DSM-5 severity for SUD is based on the number of criteria met: mild 2–3, moderate 4–5, severe 6 or more.",
  },
  {
    id: "q34",
    topic: "42 CFR Part 2",
    prompt:
      "A client signs a Part 2 consent allowing disclosure to their primary care clinic. Which statement is most accurate?",
    choices: [
      "The clinic may redisclose the information freely to any insurer.",
      "Disclosure is limited to the purpose and recipient named in the consent unless another legal basis applies.",
      "Part 2 consent eliminates the need for any HIPAA notice.",
      "Verbal permission from the client's partner is sufficient.",
    ],
    answer: 1,
    explanation:
      "Part 2 consents must specify who may receive information and for what purpose. Redisclosure rules remain strict.",
  },
  {
    id: "q35",
    topic: "HIPAA",
    prompt:
      "A client's employer calls asking whether the client attended treatment last week. There is no authorization on file. Under HIPAA, what is the best response?",
    choices: [
      "Confirm attendance because the employer pays insurance.",
      "Decline to confirm or deny treatment information without valid authorization or applicable exception.",
      "Provide dates of service to prevent job loss.",
      "Transfer the call to another client who can verify attendance.",
    ],
    answer: 1,
    explanation:
      "HIPAA protects PHI. Treatment attendance is protected information and should not be disclosed without authorization or a permitted exception.",
  },
  {
    id: "q36",
    topic: "245G",
    prompt:
      "In Minnesota Rule 245G, which requirement most directly supports quality treatment services?",
    choices: [
      "Licensed programs must follow standards for assessment, treatment planning, counseling, and documentation.",
      "Counselors may skip assessment if the client appears motivated.",
      "Treatment plans never need updating once signed.",
      "Documentation may be optional in outpatient settings.",
    ],
    answer: 0,
    explanation:
      "245G establishes licensure standards for SUD programs, including assessment, person-centered planning, service delivery, and documentation requirements.",
  },
  {
    id: "q37",
    topic: "Mandated Reporting",
    prompt:
      "During session, a client says their partner hit their 6-year-old child last night, leaving a bruise. What is the best action?",
    choices: [
      "Keep it confidential because it was disclosed in counseling.",
      "Follow mandated reporting law and agency policy by reporting suspected child maltreatment to the appropriate authority.",
      "Ask the client to report it next week if it happens again.",
      "Notify the partner directly before making any report.",
    ],
    answer: 1,
    explanation:
      "Suspected child abuse generally requires mandated reporting regardless of counseling confidentiality, subject to state law and agency policy.",
  },
  {
    id: "q38",
    topic: "Duty to Warn",
    prompt:
      "A client states a specific plan to seriously harm a named ex-partner tomorrow and has access to a weapon. What is the best action?",
    choices: [
      "Maintain absolute confidentiality because of trust.",
      "Assess imminent risk, follow duty-to-warn/protect policies, and take steps to notify potential victim and emergency services as required by law.",
      "Document the threat and discuss coping skills next session.",
      "Ask the ex-partner to attend couples counseling.",
    ],
    answer: 1,
    explanation:
      "Identifiable threats of serious harm may trigger duty to warn or protect obligations alongside crisis intervention and documentation.",
  },
  {
    id: "q39",
    topic: "Boundaries",
    prompt:
      "A client offers you an expensive gift after discharge. What is the best response?",
    choices: [
      "Accept it to honor the client's gratitude.",
      "Decline or redirect per agency policy, explaining that professional boundaries protect the therapeutic relationship.",
      "Accept it but do not document it.",
      "Ask the client to give cash instead.",
    ],
    answer: 1,
    explanation:
      "Accepting significant gifts can blur boundaries, create obligation, and raise ethical concerns. Agency policy should guide response.",
  },
  {
    id: "q40",
    topic: "Dual Relationships",
    prompt:
      "A client asks you to sponsor them in a 12-step program while you are their counselor at the agency. What is the best response?",
    choices: [
      "Agree, because sponsorship shows commitment.",
      "Explain that combining roles can impair objectivity and refer the client to another sponsor while continuing clinical services.",
      "Become sponsor and reduce documentation to protect privacy.",
      "Terminate counseling immediately without explanation.",
    ],
    answer: 1,
    explanation:
      "Dual relationships can create conflicts of interest and boundary confusion. Separating clinical and sponsorship roles protects the client.",
  },
  {
    id: "q41",
    topic: "Group Counseling",
    prompt:
      "In early recovery group, members begin sharing detailed using stories that trigger others. What is the best facilitator response?",
    choices: [
      "Allow unlimited detail to keep the group authentic.",
      "Set group norms, redirect to recovery-focused sharing, and check in with affected members after session as needed.",
      "Remove anyone who becomes triggered.",
      "End group permanently.",
    ],
    answer: 1,
    explanation:
      "Group leaders manage safety and focus through norms, redirection, and monitoring emotional responses without shaming participants.",
  },
  {
    id: "q42",
    topic: "MAT stigma",
    prompt:
      "A client on methadone says peers in NA tell them they are not in real recovery. What is the best counselor response?",
    choices: [
      "Agree that MAT is replacing one addiction with another.",
      "Validate the client's experience, provide accurate education about MAT as evidence-based treatment, and explore support options.",
      "Tell the client to stop methadone to fit in with peers.",
      "Discourage attendance at any mutual-help meetings.",
    ],
    answer: 1,
    explanation:
      "Counselors should counter MAT stigma with accurate information and support client choice while addressing barriers to recovery support.",
  },
  {
    id: "q43",
    topic: "Documentation",
    prompt:
      "You realize a progress note was not completed until three days after the session. What is the best documentation practice?",
    choices: [
      "Date the note as if it were written on the service date without comment.",
      "Complete the note promptly, accurately reflect the session, and follow agency policy for late entries.",
      "Skip the note because too much time has passed.",
      "Copy another client's note and change the name.",
    ],
    answer: 1,
    explanation:
      "Late entries should still be completed accurately. Falsifying dates or copying notes is unethical and may violate regulations.",
  },
  {
    id: "q44",
    topic: "Cultural competence",
    prompt:
      "A Hmong client prefers family involvement in treatment decisions. What is the best approach?",
    choices: [
      "Insist on individual decision-making only because that is standard in the U.S.",
      "Explore cultural preferences, obtain appropriate releases, and adapt engagement respectfully within ethical and clinical limits.",
      "Exclude family entirely to protect confidentiality.",
      "Assume cultural beliefs mean the client will not benefit from treatment.",
    ],
    answer: 1,
    explanation:
      "Culturally responsive care explores preferences and involves supports when appropriate, while maintaining consent and confidentiality requirements.",
  },
  {
    id: "q45",
    topic: "Motivational Interviewing",
    prompt:
      "A client says, 'I could cut back on drinking if I tried.' Which response best elicits change talk?",
    choices: [
      "You said could—so why haven't you?",
      "What would cutting back look like for you, and what might help you start?",
      "Cutting back is not enough; you need abstinence now.",
      "I don't believe you can do it.",
    ],
    answer: 1,
    explanation:
      "MI uses open questions and reflections to strengthen the client's own reasons and plans for change rather than arguing.",
  },
  {
    id: "q46",
    topic: "Trauma-informed care",
    prompt:
      "A client becomes visibly anxious when you move your chair closer during intake. What is the best trauma-informed response?",
    choices: [
      "Move closer to show you are engaged.",
      "Notice the reaction, ask permission before adjusting space, and offer choices about pacing and seating.",
      "Tell the client their reaction is irrational.",
      "Complete the intake quickly to finish before they leave.",
    ],
    answer: 1,
    explanation:
      "Trauma-informed care emphasizes safety, choice, collaboration, and awareness of triggers, including physical proximity and pacing.",
  },
  {
    id: "q47",
    topic: "Scope of practice",
    prompt:
      "A client asks you to diagnose whether they have ADHD. What is the best response?",
    choices: [
      "Provide a definitive ADHD diagnosis in the chart.",
      "Explain that diagnosis is outside LADC scope and refer for qualified evaluation while continuing SUD assessment and support.",
      "Tell the client they definitely do not have ADHD.",
      "Recommend stimulant medication dosing.",
    ],
    answer: 1,
    explanation:
      "LADC scope includes SUD assessment and counseling, not independent diagnosis or prescribing outside credential and agency policy.",
  },
  {
    id: "q48",
    topic: "Intake",
    prompt:
      "Before contacting a client's probation officer, what is required in most cases?",
    choices: [
      "Only the counselor's judgment that contact would help.",
      "A valid signed release of information or other legal authority.",
      "Verbal consent from the client's roommate.",
      "Automatic disclosure because the client has legal involvement.",
    ],
    answer: 1,
    explanation:
      "Contact with criminal justice stakeholders generally requires client authorization or another legal basis, along with Part 2 and HIPAA considerations.",
  },
  {
    id: "q49",
    topic: "Screening",
    prompt:
      "A primary care clinic refers a patient who scored positive on an AUDIT-C screen but denies problems. What is the best next step?",
    choices: [
      "Close the referral because the client denies problems.",
      "Briefly explore the screen results, assess risk and readiness, and determine whether brief intervention or full assessment is indicated.",
      "Admit directly to residential treatment.",
      "Tell the patient they are in denial and end the conversation.",
    ],
    answer: 1,
    explanation:
      "Positive screens warrant further exploration and SBIRT-style intervention, not dismissal or automatic placement.",
  },
  {
    id: "q50",
    topic: "Assessment",
    prompt:
      "Which finding most strongly suggests the need for integrated treatment planning for co-occurring disorders?",
    choices: [
      "The client prefers morning appointments.",
      "Depressive symptoms persist for weeks, impair functioning, and are not fully explained by intoxication or withdrawal alone.",
      "The client dislikes group counseling.",
      "The client has a supportive employer.",
    ],
    answer: 1,
    explanation:
      "Persistent mood symptoms with functional impairment may indicate a co-occurring mental health disorder requiring coordinated SUD and mental health care.",
  },
  {
    id: "q51",
    topic: "Treatment Planning",
    prompt:
      "A client disagrees with the counselor's proposed goal of total abstinence and wants to reduce use first. What is the best planning approach?",
    choices: [
      "Discharge the client for noncompliance.",
      "Collaboratively negotiate goals within agency policy, document the plan, and revisit goals as progress and risk evolve.",
      "Secretly change the chart to abstinence without telling the client.",
      "Ignore the client's preference and proceed anyway.",
    ],
    answer: 1,
    explanation:
      "Treatment planning is collaborative. Goals should reflect client readiness, agency scope, and safety while remaining documented and reviewable.",
  },
  {
    id: "q52",
    topic: "Counseling",
    prompt:
      "A client identifies craving triggered by driving past a former dealer's house. Which counseling strategy is most appropriate?",
    choices: [
      "Suggest the client move out of state immediately.",
      "Develop a coping plan including trigger awareness, route changes, urge surfing, and support contacts.",
      "Tell the client cravings mean treatment failed.",
      "Avoid discussing triggers to prevent relapse.",
    ],
    answer: 1,
    explanation:
      "Counseling helps clients identify triggers and build practical coping and relapse prevention skills tailored to high-risk situations.",
  },
  {
    id: "q53",
    topic: "Case Management",
    prompt:
      "A client is eligible for county benefits that would pay for transportation to treatment but has not applied. What is the best case management step?",
    choices: [
      "Assume the client does not want help.",
      "Assist with application steps or referral to a benefits worker, with appropriate consent.",
      "Complete the application using fabricated information.",
      "Require sobriety for 90 days before offering help.",
    ],
    answer: 1,
    explanation:
      "Case management helps clients access entitlements and services that remove barriers to treatment engagement.",
  },
  {
    id: "q54",
    topic: "Crisis Intervention",
    prompt:
      "You witness a client overdosing in the agency parking lot. Staff have naloxone available. What is the best response?",
    choices: [
      "Wait to see if the client wakes up without intervention.",
      "Administer naloxone per agency protocol, call 911, and provide support until emergency personnel arrive.",
      "Drive the client home to avoid police involvement.",
      "Search the client's pockets before helping.",
    ],
    answer: 1,
    explanation:
      "Overdose response prioritizes immediate medical intervention, emergency activation, and support according to trained protocol.",
  },
  {
    id: "q55",
    topic: "Client Education",
    prompt:
      "A client who is not ready for abstinence asks about safer use strategies while engaging in treatment. What is the best approach?",
    choices: [
      "Refuse all education until the client commits to abstinence.",
      "Within agency policy and scope, provide accurate risk-reduction information while continuing to explore motivation and treatment goals.",
      "Encourage continued use without discussion of risk.",
      "Provide instructions for obtaining illegal substances.",
    ],
    answer: 1,
    explanation:
      "Client education can include harm-reduction information where policy allows, paired with ongoing engagement and goal discussion.",
  },
  {
    id: "q56",
    topic: "Referral",
    prompt:
      "A client reports worsening suicidal thoughts but no immediate plan. They agree to outpatient mental health therapy. What should the counselor do?",
    choices: [
      "Handle all mental health treatment alone without referral.",
      "Facilitate referral to mental health services, coordinate release of information, and maintain safety planning in SUD services.",
      "Delay referral until relapse occurs.",
      "Tell the client suicidal thoughts are normal and need no follow-up.",
    ],
    answer: 1,
    explanation:
      "Referral and coordination are indicated for mental health needs beyond SUD scope, with ongoing safety monitoring in SUD treatment.",
  },
  {
    id: "q57",
    topic: "Record Keeping",
    prompt:
      "An auditor requests access to client records. What is the best action?",
    choices: [
      "Provide full records to any caller who says they are an auditor.",
      "Verify authority, follow agency and regulatory procedures, and disclose only what is permitted.",
      "Delete notes that appear incomplete.",
      "Give records to the client's friend for safekeeping.",
    ],
    answer: 1,
    explanation:
      "Record access must follow verification, legal authority, and minimum necessary principles.",
  },
  {
    id: "q58",
    topic: "Consultation",
    prompt:
      "You are unsure whether a client's reported passive suicidal ideation requires a higher level of care. What should you do first?",
    choices: [
      "Rely solely on your own guess.",
      "Consult supervisor or on-call clinician immediately and document the consultation and plan.",
      "Wait until the next weekly supervision meeting in five days.",
      "Tell the client not to mention suicide again.",
    ],
    answer: 1,
    explanation:
      "Safety concerns warrant timely consultation, documented decision-making, and appropriate level-of-care planning.",
  },
  {
    id: "q59",
    topic: "ASAM",
    prompt:
      "A client has repeated relapse after leaving residential care, strong cravings, and limited coping skills. Which ASAM dimension is most directly involved?",
    choices: [
      "Dimension 3",
      "Dimension 5",
      "Dimension 2",
      "Dimension 1",
    ],
    answer: 1,
    explanation:
      "Dimension 5 addresses relapse, continued use, or continued problem potential, including cravings and coping capacity.",
  },
  {
    id: "q60",
    topic: "DSM-5",
    prompt:
      "Which scenario best supports a DSM-5 alcohol withdrawal diagnosis rather than intoxication alone?",
    choices: [
      "Slurred speech immediately after drinking.",
      "Autonomic hyperactivity, tremor, and anxiety developing after reduced or stopped drinking in a person with heavy use.",
      "The client reports liking the taste of beer.",
      "One episode of vomiting after a party.",
    ],
    answer: 1,
    explanation:
      "Withdrawal involves characteristic symptoms arising after cessation or reduction of prolonged heavy use, distinct from acute intoxication.",
  },
  {
    id: "q61",
    topic: "42 CFR Part 2",
    prompt:
      "A program receives a court order for SUD treatment records. What is the best first step?",
    choices: [
      "Release the entire database immediately.",
      "Review the order with compliance or legal counsel, determine scope and applicability, and respond according to Part 2 requirements.",
      "Ignore the order because Part 2 always prohibits disclosure.",
      "Ask the client to verbally waive Part 2 on the spot without documentation.",
    ],
    answer: 1,
    explanation:
      "Court orders may permit disclosure in limited circumstances, but programs must verify scope and follow Part 2 procedures carefully.",
  },
  {
    id: "q62",
    topic: "HIPAA",
    prompt:
      "Which action best reflects the HIPAA minimum necessary standard?",
    choices: [
      "Send a client's full chart to a referral source that only needs attendance dates.",
      "Disclose only the information needed for the stated purpose of the request or communication.",
      "Post client names on a public board to improve accountability.",
      "Share PHI on social media to educate the public.",
    ],
    answer: 1,
    explanation:
      "HIPAA requires limiting disclosures to the minimum information necessary to accomplish the intended purpose.",
  },
  {
    id: "q63",
    topic: "245G",
    prompt:
      "Under Minnesota 245G, when must a treatment plan generally be developed?",
    choices: [
      "Within required time frames after admission or initiation of services, as specified by rule and agency policy.",
      "Only at discharge.",
      "Never for outpatient clients.",
      "Only if the client requests one.",
    ],
    answer: 0,
    explanation:
      "245G requires timely development of person-centered treatment plans after admission, with ongoing review and update.",
  },
  {
    id: "q64",
    topic: "Mandated Reporting",
    prompt:
      "An elderly client with cognitive impairment reports a caregiver withholding food and medication. What is the best action?",
    choices: [
      "Maintain confidentiality because the client is in treatment.",
      "Follow vulnerable adult reporting requirements and agency policy.",
      "Confront the caregiver alone without documentation.",
      "Wait for the client to provide written proof.",
    ],
    answer: 1,
    explanation:
      "Many states require reporting suspected abuse, neglect, or exploitation of vulnerable adults, in addition to child maltreatment laws.",
  },
  {
    id: "q65",
    topic: "Duty to Warn",
    prompt:
      "Which factor most strongly increases the urgency of a duty-to-warn assessment?",
    choices: [
      "The client is angry about a parking ticket.",
      "The client identifies a specific target, credible means, and near-term intent to cause serious harm.",
      "The client had a bad day at work.",
      "The client dislikes their counselor.",
    ],
    answer: 1,
    explanation:
      "Specificity of threat, access to means, and imminence guide duty-to-warn and protective action.",
  },
  {
    id: "q66",
    topic: "Boundaries",
    prompt:
      "A client asks many personal questions about your recovery status. What is the best boundary response?",
    choices: [
      "Share detailed personal history to build trust.",
      "Acknowledge the question, explain that the focus remains on the client's recovery, and explore what the client hopes to learn.",
      "Refuse to speak for the rest of treatment.",
      "Lie about your background to impress the client.",
    ],
    answer: 1,
    explanation:
      "Limited, purposeful self-disclosure may be appropriate, but counselors maintain focus on client needs and avoid excessive personal sharing.",
  },
  {
    id: "q67",
    topic: "Dual Relationships",
    prompt:
      "You discover your new client is your neighbor. What is the best action?",
    choices: [
      "Continue without discussion to avoid awkwardness.",
      "Discuss the dual relationship with supervision, follow agency policy, and consider reassignment if objectivity or confidentiality could be impaired.",
      "Socialize frequently to normalize the relationship.",
      "Share the client's treatment details with other neighbors.",
    ],
    answer: 1,
    explanation:
      "Pre-existing relationships can impair clinical work. Supervision and possible reassignment protect the client and counselor.",
  },
  {
    id: "q68",
    topic: "Group Counseling",
    prompt:
      "One group member repeatedly dominates and interrupts others. What is the best facilitator intervention?",
    choices: [
      "Allow domination because participation is participation.",
      "Use structure, time limits, and direct redirection while reinforcing norms that support all members.",
      "Publicly shame the member in front of the group.",
      "Disband the group after one incident.",
    ],
    answer: 1,
    explanation:
      "Effective group facilitation balances participation through structure, norms, and respectful redirection rather than shaming or avoidance.",
  },
  {
    id: "q69",
    topic: "MAT stigma",
    prompt:
      "A client eligible for buprenorphine says they feel ashamed because family calls it cheating. What is the best counselor action?",
    choices: [
      "Recommend stopping medication to please family.",
      "Provide education on evidence-based MAT, explore stigma, and support shared decision-making with medical providers.",
      "Tell the family they are correct.",
      "Avoid discussing medication entirely.",
    ],
    answer: 1,
    explanation:
      "Counselors address internalized and family stigma with accurate MAT education while supporting collaboration with prescribers.",
  },
  {
    id: "q70",
    topic: "Scope of practice",
    prompt:
      "A client asks you to interpret recent lab results and adjust their diabetes medication. What is the best response?",
    choices: [
      "Interpret labs and suggest dose changes.",
      "Refer the client to their prescriber or primary care for medical interpretation and medication management while offering SUD support.",
      "Tell the client diabetes is unrelated to treatment.",
      "Order new labs yourself.",
    ],
    answer: 1,
    explanation:
      "Medical interpretation and medication management are outside LADC scope. Counselors coordinate and refer for medical care.",
  },
];
