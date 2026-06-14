"use client";

import LocalEntryManager from "@/components/LocalEntryManager";
import { mainNavigation } from "@/lib/siteContent";

const coreFunctions =
  mainNavigation
    .find((item) => item.title === "12 Core Functions")
    ?.items?.map((item) => item.title) ?? [];

const fields = [
  { name: "date", label: "Date", type: "date" as const },
  { name: "hours", label: "Hours", type: "number" as const },
  { name: "activity", label: "Activity", type: "textarea" as const },
  { name: "core", label: "Core function", type: "select" as const, options: coreFunctions },
  { name: "reflection", label: "Reflection", type: "textarea" as const },
];

export default function HoursTrackerPlaceholder() {
  return (
    <LocalEntryManager
      storageKey="ladc-internship-hours"
      fields={fields}
      emptyLabel="No internship hours saved yet."
      titleField="activity"
    />
  );
}
