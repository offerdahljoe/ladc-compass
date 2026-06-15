"use client";

import { useState } from "react";

const kaiShinSections = [
  {
    title: "Procentive Quick Orientation",
    purpose:
      "Use this when you need to remember where work lives in Procentive and what should happen before a note, form, or contact is finalized.",
    details: [
      "Confirm you are in the correct client chart before opening any form.",
      "Check whether the task belongs in assessment, treatment plan, progress note, contact log, discharge, or miscellaneous documents.",
      "Use neutral clinical language and avoid copying the same wording into unrelated fields.",
      "Do not enter or upload practice examples with real client identifiers into LADC Compass.",
    ],
    documents: [
      "Comprehensive Assessment: PRO-245G-E1100",
      "Contact Log: PRO-1081",
      "Miscellaneous Documents: PRO-1033",
    ],
  },
  {
    title: "Counselor Checklist",
    purpose:
      "A practical daily checklist for staying organized around client contact, documentation, coordination, and supervision questions.",
    details: [
      "Review today’s scheduled groups, individual sessions, intakes, and collateral contacts.",
      "Check which clients need assessment completion, treatment plan updates, plan reviews, or discharge planning.",
      "Confirm signed ROIs before contacting probation, family, medical providers, therapists, or referral sources.",
      "Document each service or contact the same day whenever possible.",
      "Bring unclear ASAM ratings, diagnosis questions, safety concerns, or documentation uncertainty to supervision.",
    ],
    documents: [
      "Billable Individual Service Note: PRO-1333",
      "Billable Group Note: R682-1305",
      "Contact Log: PRO-1081",
      "Treatment Plan Review: internal Procentive workflow",
    ],
  },
  {
    title: "Documentation Codes",
    purpose:
      "A working reference for the Kai-Shin forms and codes that keep showing up in intake, assessment, treatment, coordination, and discharge.",
    details: [
      "ROI MAARC: R563-1003",
      "ROI Medical Billing: R562-1013",
      "ROI General Use: R682-1019",
      "Rights and Responsibilities: R682-1020",
      "Privacy Practices: R682-1013 or R682-1001 depending internal naming",
      "Vulnerable Adult Determination: R682-1000",
      "HIV, STD, Pregnancy, Hepatitis, TB Information: R682-1002",
      "Informed Consent for Treatment: R682-1003",
      "Individual Abuse Prevention Plan: PRO-1548",
      "Comprehensive Assessment: PRO-245G-E1100",
      "Initial Service Plan: R682-1202",
      "Initial Treatment Plan: R682-1203",
      "Progress Note: R682-1203",
      "Billable Individual Service Note: PRO-1333",
      "Billable Group Note: R682-1305",
      "Transition Care Plan: W435-1402",
      "Discharge Summary: R682-1401",
      "Contact Log: PRO-1081",
      "UA Log / Miscellaneous Documents: PRO-1033",
      "CPA: PRO-1046",
      "Mandated Reporting Controlled Substance Notice: W435-1015",
      "Grievance Procedures: 0298-1031",
    ],
    documents: ["Keep this list verified against Kai-Shin’s current internal workflow."],
  },
  {
    title: "Intake Workflow",
    purpose:
      "Use this during the first appointment to keep paperwork, client explanation, immediate needs, and next steps organized.",
    details: [
      "Welcome the client and explain that you will walk through each form in plain language.",
      "Confirm identity, contact information, emergency contact, and referral source.",
      "Explain confidentiality and limits before asking sensitive questions.",
      "Complete intake forms and pause for questions before signatures.",
      "Complete the Initial Service Plan to capture immediate needs before the full assessment is finished.",
      "Ask about urgent safety, basic needs, family involvement, and ROIs.",
      "Schedule next individual appointment and confirm group expectations if applicable.",
      "Document the intake contact/session and verify required forms are active and signed.",
    ],
    documents: [
      "Intake: PRO-1333",
      "Initial Services Plan: R682-1202",
      "Vulnerable Adult Determination: R682-1000",
      "Mandated Reporting Notice: W435-1015",
      "Privacy Practices: R682-1001 or R682-1013",
      "Grievance Procedures: 0298-1031",
      "Informed Consent: R682-1003",
      "HIV/STD/Pregnancy/Hepatitis/TB Info: R682-1002",
      "DAANES: R682-1007",
    ],
  },
  {
    title: "Templates",
    purpose:
      "Copy/paste starters for common documentation tasks. These should be adjusted so they match the actual service and client presentation.",
    details: [
      "Individual session: Client identified concerns related to [insert]. Session focused on ASAM Dimension(s) [insert]. Counselor provided client-centered support using motivational interviewing, trauma-informed approaches, and substance use education. Client was [engaged/intermittently engaged/guarded] and shared insights related to [insert]. Client denied suicidal or homicidal ideation. No imminent risk identified. Continue services focusing on [insert].",
      "Group note: Client participated in group focused on [topic]. Group addressed ASAM Dimension(s) [insert]. Client participated through [listening/sharing/reflection/skill practice] and connected the topic to [insert recovery area]. No imminent risk identified.",
      "Treatment plan: Treatment plan was developed collaboratively with the client based on assessment findings and identified needs. Services are medically necessary to address substance use concerns within identified ASAM dimensions. Client strengths, preferences, and cultural considerations were incorporated.",
      "Treatment coordination: Treatment coordination services were provided to support continuity of care and engagement in recommended services.",
      "Telehealth: Service provided via telehealth. Client location verified in Minnesota. Telehealth consent previously obtained.",
    ],
    documents: [
      "Billable Individual Service Note: PRO-1333",
      "Billable Group Note: R682-1305",
      "Initial Treatment Plan: R682-1203",
      "Contact Log: PRO-1081",
    ],
  },
  {
    title: "Policies / Paperwork",
    purpose:
      "Use this as a reminder to explain forms in plain language and watch for barriers to understanding before signatures.",
    details: [
      "Ask whether the client wants forms read aloud or explained differently.",
      "Watch for anxiety, literacy barriers, language barriers, cognitive barriers, intoxication, withdrawal, or pressure from outside systems.",
      "Do not rush signatures when the client appears confused.",
      "Document questions, refusals, limitations, or follow-up when clinically relevant.",
    ],
    documents: [
      "Rights and Responsibilities",
      "Privacy Practices",
      "Informed Consent",
      "Grievance Procedures",
      "ROIs",
      "Mandated Reporting Notice",
    ],
  },
  {
    title: "Upload Kai-Shin Docs",
    purpose:
      "A reminder space for de-identified blank templates, instructions, and personal workflow notes. Do not upload PHI or client chart screenshots.",
    details: [
      "Appropriate: blank forms, de-identified workflow instructions, personal checklists, training notes, and non-client examples.",
      "Not appropriate: client names, dates of birth, addresses, case numbers, chart screenshots, appointment screenshots, or real clinical records.",
      "When in doubt, do not upload it. Ask supervision how the information should be handled.",
    ],
    documents: ["Use Documentation Uploads for saved de-identified materials."],
  },
];

export default function KaiShinHubWorkspace() {
  const [selectedTitle, setSelectedTitle] = useState(kaiShinSections[0].title);
  const selected =
    kaiShinSections.find((section) => section.title === selectedTitle) ?? kaiShinSections[0];

  return (
    <div className="grid gap-5">
      <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
        <label className="block text-sm font-semibold text-ink">
          Choose Kai-Shin area
          <select
            value={selectedTitle}
            onChange={(event) => setSelectedTitle(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
          >
            {kaiShinSections.map((section) => (
              <option key={section.title}>{section.title}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-2xl font-semibold text-ink">{selected.title}</h2>
        <p className="mt-3 text-sm leading-6 text-ink/72">{selected.purpose}</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <article className="rounded-lg border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-ink">What to know / do</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
              {selected.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-ink">Related forms / codes</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink/72">
              {selected.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
