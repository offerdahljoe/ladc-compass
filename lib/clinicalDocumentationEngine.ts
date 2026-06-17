export type Rating = 0 | 1 | 2 | 3 | 4;

export type DocumentationInputs = {
  snapshot: {
    label: string;
    age: string;
    referral: string;
    presenting: string;
    legal: string;
    setting: string;
    notes: string;
  };
  substance: string;
  dsmCount: number;
  dsmSeverity: string;
  dimensionSummaries: {
    id: string;
    title: string;
    rating: Rating | "";
    rationale: string;
  }[];
  selectedStrengths: string[];
  selectedBarriers: string[];
  selectedGoals: string[];
  selectedSafetyFlags: string[];
  elevatedDimensionIds: string[];
  highRiskDimensionIds: string[];
  maxRating: Rating | "";
};

function joinList(items: string[], fallback: string) {
  return items.length ? items.join(", ") : fallback;
}

function hasLegal(input: DocumentationInputs) {
  const blob = `${input.snapshot.legal} ${input.snapshot.referral} ${input.selectedBarriers.join(" ")}`.toLowerCase();
  return (
    blob.includes("probation") ||
    blob.includes("court") ||
    blob.includes("legal") ||
    input.selectedBarriers.includes("Legal involvement")
  );
}

function hasHousing(input: DocumentationInputs) {
  return (
    input.selectedBarriers.includes("Housing instability") ||
    input.dimensionSummaries.some((d) => d.id === "d6" && d.rating !== "" && d.rating >= 2)
  );
}

function hasCps(input: DocumentationInputs) {
  const blob = `${input.snapshot.referral} ${input.snapshot.notes}`.toLowerCase();
  return blob.includes("cps") || blob.includes("child protection");
}

function dimRating(input: DocumentationInputs, id: string) {
  return input.dimensionSummaries.find((d) => d.id === id)?.rating ?? "";
}

export function generateDocumentationOutputs(input: DocumentationInputs) {
  const clientRef = input.snapshot.label.trim() || "the client";
  const presenting = input.snapshot.presenting.trim() || "substance use concerns";
  const referral = input.snapshot.referral.trim() || "referral source not specified";

  const diagnosticSupport =
    input.dsmCount < 2
      ? `Assessment information indicates ${clientRef} meets ${input.dsmCount} of 11 DSM-5 criteria for ${input.substance} use. Current entries do not generate SUD severity. Continue gathering diagnostic evidence and review with supervisor if clinical concern remains.`
      : `Client reported a pattern of ${input.substance} use with ${input.dsmCount} DSM-5 criteria endorsed, which may support ${input.dsmSeverity} ${input.substance} Use Disorder. Diagnostic impression is documentation support only and requires supervisor review per agency policy.`;

  const asamSummary = input.dimensionSummaries
    .filter((d) => d.rating !== "")
    .map(
      (d) =>
        `${d.title}: rated ${d.rating}. ${d.rationale.trim() || "Additional rationale needed before finalizing this dimension."}`,
    )
    .join("\n\n");

  const elevated = input.dimensionSummaries.filter((d) => d.rating !== "" && d.rating >= 2);

  const medicalNecessityParts = [
    elevated.length
      ? `Continued services are medically necessary due to elevated ASAM concerns in ${elevated.map((d) => d.title.replace(/Dimension \d+: /, "Dimension ")).join(", ")}.`
      : "Continued services may be medically necessary pending completion of ASAM dimensional review.",
    input.selectedBarriers.length
      ? `Identified barriers (${joinList(input.selectedBarriers.slice(0, 4), "none listed")}) affect treatment engagement and require active clinical support.`
      : null,
    input.selectedSafetyFlags.length
      ? `Safety considerations (${joinList(input.selectedSafetyFlags, "none")}) require monitoring within the treatment plan.`
      : null,
  ].filter(Boolean);

  const medicalNecessity = medicalNecessityParts.join(" ");

  const recommendations: string[] = [];
  if ((dimRating(input, "d1") as number) >= 2) {
    recommendations.push(
      "Counselor recommends medical withdrawal monitoring review before assuming routine outpatient services are sufficient.",
    );
  }
  if ((dimRating(input, "d3") as number) >= 2) {
    recommendations.push(
      "Counselor recommends mental health symptom monitoring and coordination with mental health provider if ROI exists.",
    );
  }
  if ((dimRating(input, "d5") as number) >= 2) {
    recommendations.push(
      "Counselor recommends relapse prevention planning including trigger identification, refusal skills, coping strategies, and support monitoring.",
    );
  }
  if (hasLegal(input)) {
    recommendations.push(
      "Counselor recommends obtaining ROI for probation or court coordination if client consents; document legal involvement as external motivator and recovery barrier.",
    );
    recommendations.push(
      "If collateral contact occurs, document in PRO-1081 Client Contact Log (SETC) with minimum necessary information.",
    );
  }
  if (hasCps(input)) {
    recommendations.push(
      "Counselor recommends CPS coordination workflow; confirm ROI scope before contact and document purpose, information shared, and follow-up in PRO-1081.",
    );
  }
  if (hasHousing(input)) {
    recommendations.push(
      "Assessment information indicates recovery environment concern (ASAM Dimension 6); consider housing/resource coordination and treatment plan objective related to environment stability.",
    );
  }
  if (input.selectedGoals.includes("Medication-assisted treatment")) {
    recommendations.push("Counselor recommends MAT prescriber coordination if ROI is obtained and clinically indicated.");
  }
  if (!recommendations.length) {
    recommendations.push(
      "Counselor recommends outpatient substance use treatment with continued assessment, engagement, and treatment planning based on current findings.",
    );
  }

  const treatmentPlanSuggestions = [
    `Problem: Client presents with ${presenting} and may have difficulty maintaining recovery stability related to ${elevated[0]?.title.replace(/Dimension \d+: /, "") ?? "identified substance use patterns"}.`,
    `Goal: Client will increase recovery stability by addressing ${joinList(input.selectedGoals.slice(0, 2), "stated treatment priorities")}.`,
    "Objectives (tie to assessment findings, not generic placeholders):",
    ...elevated.slice(0, 3).map(
      (d) =>
        `- Address ${d.title.replace(/Dimension \d+: /, "")} through individualized services linked to ASAM Dimension ${d.id.replace("d", "")} (current rating ${d.rating}).`,
    ),
    ...(hasLegal(input)
      ? ["- Coordinate probation/legal expectations with valid ROI and document contacts in PRO-1081."]
      : []),
    ...(hasHousing(input)
      ? ["- Identify concrete steps to stabilize recovery environment (housing, transportation, sober supports)."]
      : []),
    ...(dimRating(input, "d5") !== "" && (dimRating(input, "d5") as number) >= 2
      ? ["- Client will identify personal triggers and practice at least two coping strategies before high-risk situations."]
      : []),
    "Interventions: MI, psychoeducation, relapse prevention, case management/referrals as clinically indicated and authorized.",
  ].join("\n");

  const levelOfCareRationale =
    input.selectedSafetyFlags.some((f) =>
      ["Immediate safety concern", "Severe medical instability", "Significant withdrawal risk"].includes(f),
    ) || input.maxRating === 4
      ? "Assessment information indicates potential need for higher level of care or immediate supervisor/medical review. Outpatient recommendation should not be assumed without clinical support."
      : input.highRiskDimensionIds.length >= 2
        ? "Multiple ASAM dimensions rated 3–4 suggest enhanced structure (e.g., IOP) may warrant discussion with supervisor depending on full criteria and agency policy."
        : input.elevatedDimensionIds.length > 0
          ? "Elevated ASAM dimensions may support ASAM Level 1.0 outpatient with enhanced supports if safety and stability are adequate."
          : "Current entries do not strongly indicate elevated multidimensional risk; continue assessment before placement conclusions.";

  const strengthsBarriers = `Strengths identified: ${joinList(input.selectedStrengths, "not yet documented")}. Barriers identified: ${joinList(input.selectedBarriers, "not yet documented")}. Client goals/preferences: ${joinList(input.selectedGoals, "not yet documented")}.`;

  const supervisorFlags = [
    ...input.dimensionSummaries
      .filter((d) => d.rating !== "" && d.rating >= 3)
      .map((d) => `${d.title} rated ${d.rating} — supervisor review recommended.`),
    ...input.selectedSafetyFlags.map((f) => `Safety flag: ${f}`),
    ...input.dimensionSummaries
      .filter((d) => d.rating !== "" && d.rating >= 2 && !d.rationale.trim())
      .map((d) => `${d.title} elevated but missing written rationale.`),
  ];

  const workflowUnlocks: string[] = [];
  if (hasLegal(input)) {
    workflowUnlocks.push("Client Workflow → ROI & Treatment Coordination: add probation ROI and contact schedule.");
  }
  if (hasCps(input)) {
    workflowUnlocks.push("Client Workflow → ROI & Treatment Coordination: CPS coordination tasks and PRO-1081 documentation.");
  }
  if (hasHousing(input)) {
    workflowUnlocks.push("Client Workflow → Treatment Plan: add recovery environment objective; consider resource coordination.");
  }
  if ((dimRating(input, "d1") as number) >= 2) {
    workflowUnlocks.push("Client Workflow → Comprehensive Assessment: flag medical/supervisor review before LOC finalization.");
  }
  workflowUnlocks.push("Client Workflow → Initial Treatment Plan: complete R682-1203 after assessment sign-off.");
  if (!workflowUnlocks.length) {
    workflowUnlocks.push("Complete remaining assessment sections to generate workflow unlocks.");
  }

  const clinicalSummary = `Client ${clientRef}${input.snapshot.age ? ` (age ${input.snapshot.age})` : ""} was referred by ${referral} for ${presenting}. ${diagnosticSupport} ASAM review indicates notable concerns in ${elevated.length ? elevated.map((d) => d.id.toUpperCase()).join(", ") : "dimensions still being assessed"}. ${strengthsBarriers} ${levelOfCareRationale} Review all findings with supervisor before final diagnosis, placement, or treatment plan signature.`;

  return {
    clinicalSummary,
    asamSummary,
    diagnosticSupport,
    treatmentRecommendations: recommendations.join("\n"),
    treatmentPlanSuggestions,
    medicalNecessity,
    levelOfCareRationale,
    strengthsBarriers,
    supervisorFlags: supervisorFlags.length ? supervisorFlags.join("\n") : "No elevated supervisor flags from current entries. Review uncertain cases with supervisor as intern policy requires.",
    workflowUnlocks: workflowUnlocks.join("\n"),
  };
}
