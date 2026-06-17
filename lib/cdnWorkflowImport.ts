import type { ClientWorkflowState } from "@/lib/clientWorkflow";
import type { DocumentationInputs } from "@/lib/clinicalDocumentationEngine";

function hasLegal(input: DocumentationInputs) {
  const blob = `${input.snapshot.legal} ${input.snapshot.referral} ${input.selectedBarriers.join(" ")}`.toLowerCase();
  return (
    blob.includes("probation") ||
    blob.includes("court") ||
    blob.includes("legal") ||
    input.selectedBarriers.includes("Legal involvement")
  );
}

function hasCps(input: DocumentationInputs) {
  const blob = `${input.snapshot.referral} ${input.snapshot.notes}`.toLowerCase();
  return blob.includes("cps") || blob.includes("child protection");
}

function dimRating(input: DocumentationInputs, id: string) {
  return input.dimensionSummaries.find((d) => d.id === id)?.rating ?? "";
}

export function buildWorkflowImportFromCdn(input: DocumentationInputs): Partial<ClientWorkflowState> {
  const flags = new Set<string>();
  if (hasLegal(input)) flags.add("probation");
  if (hasCps(input)) flags.add("cps");
  if (
    input.selectedBarriers.includes("Housing instability") ||
    (dimRating(input, "d6") !== "" && (dimRating(input, "d6") as number) >= 2)
  ) {
    flags.add("housing");
  }
  if (dimRating(input, "d1") !== "" && (dimRating(input, "d1") as number) >= 2) flags.add("withdrawal");
  if (dimRating(input, "d3") !== "" && (dimRating(input, "d3") as number) >= 2) flags.add("mh");
  if (dimRating(input, "d5") !== "" && (dimRating(input, "d5") as number) >= 2) flags.add("relapse");
  if (hasLegal(input) || hasCps(input) || flags.has("housing")) flags.add("coordination");

  const checkedTasks: Record<string, boolean> = {
    "assess-cdn": true,
    "assess-import-flags": true,
  };
  if (input.dsmCount >= 2) {
    checkedTasks["assess-dsm"] = true;
  }
  if (input.dimensionSummaries.some((d) => d.rating !== "")) {
    checkedTasks["assess-asam"] = true;
  }

  const rois = [
    ...(hasLegal(input)
      ? [
          {
            id: crypto.randomUUID(),
            person: "Probation officer",
            organization: "Court / probation",
            relationship: "Legal",
            reason: "Treatment coordination per assessment",
            expiration: "",
            obtained: false,
            contactMade: false,
            documentedSetc: false,
          },
        ]
      : []),
    ...(hasCps(input)
      ? [
          {
            id: crypto.randomUUID(),
            person: "CPS worker",
            organization: "Child protection",
            relationship: "CPS",
            reason: "Coordination per assessment",
            expiration: "",
            obtained: false,
            contactMade: false,
            documentedSetc: false,
          },
        ]
      : []),
  ];

  const reviewDue = new Date();
  reviewDue.setDate(reviewDue.getDate() + 90);

  return {
    flags: Array.from(flags),
    checkedTasks,
    rois,
    assessmentImported: true,
    lastReviewDate: new Date().toISOString().slice(0, 10),
    nextReviewDue: reviewDue.toISOString().slice(0, 10),
  };
}

export function mergeWorkflowImport(
  current: ClientWorkflowState,
  patch: Partial<ClientWorkflowState>,
): ClientWorkflowState {
  return {
    ...current,
    ...patch,
    caseLabel: current.caseLabel || patch.caseLabel || "",
    flags: Array.from(new Set([...(current.flags ?? []), ...(patch.flags ?? [])])),
    checkedTasks: { ...current.checkedTasks, ...(patch.checkedTasks ?? {}) },
    rois: [...(current.rois ?? []), ...(patch.rois ?? [])],
  };
}
