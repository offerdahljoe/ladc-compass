"use client";

import LocalEntryManager from "@/components/LocalEntryManager";
import PageHeader from "@/components/PageHeader";

const fields = [
  { name: "question", label: "Question for supervisor", type: "textarea" as const },
  { name: "ethical", label: "Ethical concern", type: "textarea" as const },
  { name: "clinical", label: "Clinical question", type: "textarea" as const },
  { name: "feedback", label: "Feedback received", type: "textarea" as const },
  { name: "improve", label: "Things to improve", type: "textarea" as const },
];

export default function SupervisionNotebookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Supervision Notebook"
        title="Prepare better questions and capture feedback"
        description="Use this notebook to organize scope questions, ethical concerns, clinical uncertainty, feedback, and growth edges."
      />
      <LocalEntryManager
        storageKey="ladc-supervision-notes"
        fields={fields}
        emptyLabel="No supervision notes saved yet."
        titleField="question"
      />
    </>
  );
}
