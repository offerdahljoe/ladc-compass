"use client";

import { useMemo, useState } from "react";

function translate(value: string) {
  const lower = value.toLowerCase();
  const triggers: string[] = [];
  if (lower.includes("bored")) triggers.push("boredom");
  if (lower.includes("lonely") || lower.includes("alone")) triggers.push("loneliness/isolation");
  if (lower.includes("stress") || lower.includes("anxious")) triggers.push("emotional distress");
  if (lower.includes("friends") || lower.includes("people")) triggers.push("social influence");
  if (lower.includes("can't stop") || lower.includes("cant stop") || lower.includes("cannot stop")) {
    triggers.push("impaired control once use is initiated");
  }

  if (!value.trim()) {
    return "Type a client statement to generate a clinical wording draft.";
  }

  if (triggers.length === 0) {
    return `Client reports: "${value.trim()}." Clinical wording draft: Client describes substance use-related concerns that should be further assessed for triggers, impairment, coping skills, and treatment planning needs.`;
  }

  return `Client identifies ${triggers.join(", ")} as clinically relevant factors related to substance use. Client would benefit from continued assessment of relapse triggers, coping skills, emotional regulation strategies, and recovery support planning.`;
}

export default function TranslateToClinical() {
  const [clientLanguage, setClientLanguage] = useState("");
  const output = useMemo(() => translate(clientLanguage), [clientLanguage]);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">
        Translate Client Language to Clinical Language
      </h2>
      <label className="mt-4 block text-sm font-medium text-ink">
        Casual client statement
        <textarea
          value={clientLanguage}
          onChange={(event) => setClientLanguage(event.target.value)}
          className="focus-ring mt-1 min-h-24 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
          placeholder="Example: I use because I get bored and lonely and then I can't stop once I start."
        />
      </label>
      <div className="mt-4 rounded-md border border-lagoon/20 bg-lagoon/10 p-4">
        <h3 className="font-semibold text-ink">Clinical wording draft</h3>
        <p className="mt-2 text-sm leading-6 text-ink/75">{output}</p>
      </div>
    </section>
  );
}
