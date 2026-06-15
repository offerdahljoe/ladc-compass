"use client";

import { useMemo, useState } from "react";
import type { ParagraphField } from "@/lib/assessmentSections";

export default function ParagraphBuilder({ fields }: { fields: ParagraphField[] }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const paragraph = useMemo(() => {
    const report = values.clientReport || "[client report]";
    const impact = values.impact || "[impact on functioning/recovery]";
    const risks = values.risks || "[identified risks]";
    const strengths = values.strengths || "[strengths/supports]";
    const interpretation = values.interpretation || "[clinical interpretation]";

    return `Client reports ${report}. This appears to affect ${impact}. Current clinical considerations include ${risks}. Strengths/supports include ${strengths}. Clinically, ${interpretation}.`;
  }, [values]);

  return (
    <section className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Build My Clinical Paragraph</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.id} className="text-sm font-medium text-ink">
            {field.label}
            <textarea
              value={values[field.id] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.id]: event.target.value,
                }))
              }
              className="focus-ring mt-1 min-h-24 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm"
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-ink/10 bg-paper p-4">
        <h3 className="font-semibold text-ink">Generated paragraph draft</h3>
        <p className="mt-2 text-sm leading-6 text-ink/75">{paragraph}</p>
      </div>
    </section>
  );
}
