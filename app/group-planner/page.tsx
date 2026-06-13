"use client";

import LocalEntryManager from "@/components/LocalEntryManager";
import PageHeader from "@/components/PageHeader";
import { coreFunctions } from "@/lib/content";

const fields = [
  { name: "topic", label: "Topic", placeholder: "Relapse warning signs" },
  { name: "opening", label: "Opening question", type: "textarea" as const },
  { name: "main", label: "Main questions", type: "textarea" as const },
  { name: "activity", label: "Activity", type: "textarea" as const },
  { name: "worksheet", label: "Worksheet idea", type: "textarea" as const },
  { name: "asam", label: "ASAM dimensions covered", type: "textarea" as const },
  { name: "core", label: "Core functions covered", type: "select" as const, options: coreFunctions.map((item) => item.name) },
  { name: "documentation", label: "Documentation language", type: "textarea" as const },
];

export default function GroupPlannerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Group Planner"
        title="Plan groups with purpose and documentation in mind"
        description="Create reusable group outlines that connect topic, process questions, ASAM dimensions, Core Functions, and documentation language."
      />
      <LocalEntryManager
        storageKey="ladc-group-plans"
        fields={fields}
        emptyLabel="No group plans saved yet."
        titleField="topic"
      />
    </>
  );
}
