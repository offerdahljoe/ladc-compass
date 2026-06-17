"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ROIContactScriptBuilder } from "@/components/ClientJourneyComponents";
import {
  defaultWorkflowState,
  sectionProgress,
  setcDescription,
  workflowFlagOptions,
  workflowSections,
  type ClientWorkflowState,
  type RoiRecord,
  type WorkflowSection,
  type WorkflowTask,
  isTaskVisible,
} from "@/lib/clientWorkflow";
import { useCloudJson } from "@/lib/useCloudJson";

const STORAGE_KEY = "ladc-client-workflow-state";
const LEGACY_KEY = "ladc-workflow-progress";

function TaskRow({
  task,
  checked,
  onToggle,
}: {
  task: WorkflowTask;
  checked: boolean;
  onToggle: (id: string, value: boolean) => void;
}) {
  return (
    <div className="grid gap-1 rounded-md bg-paper px-3 py-2">
      <label className="flex cursor-pointer gap-3 text-sm leading-6 text-ink/80">
        <input type="checkbox" checked={checked} onChange={(e) => onToggle(task.id, e.target.checked)} />
        <span className={checked ? "line-through opacity-60" : ""}>{task.label}</span>
      </label>
      {task.formCode ? (
        <p className="pl-6 text-xs text-lagoon">Form: {task.formCode}</p>
      ) : null}
      {task.guidance && !checked ? (
        <p className="pl-6 text-xs text-ink/60">{task.guidance}</p>
      ) : null}
    </div>
  );
}

function IntakeFormBlock({ formId }: { formId: string }) {
  const form = workflowSections
    .find((s) => s.id === "intake-packet")
    ?.intakeForms?.find((f) => f.id === formId);
  if (!form) return null;
  return (
    <details className="rounded-md border border-ink/10 bg-white p-3">
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        {form.code} — {form.name}
      </summary>
      <div className="mt-3 grid gap-2 text-sm text-ink/75">
        <p><strong>Purpose:</strong> {form.purpose}</p>
        <p><strong>Client script:</strong> {form.clientScript}</p>
        <ul className="list-disc pl-5">
          {form.counselorConsiderations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-xs text-clay"><strong>Mistakes:</strong> {form.commonMistakes.join(" ")}</p>
      </div>
    </details>
  );
}

function RoiPanel({
  rois,
  onChange,
}: {
  rois: RoiRecord[];
  onChange: (rois: RoiRecord[]) => void;
}) {
  const [draft, setDraft] = useState<Partial<RoiRecord>>({});

  function addRoi() {
    if (!draft.person?.trim()) return;
    onChange([
      ...rois,
      {
        id: crypto.randomUUID(),
        person: draft.person ?? "",
        organization: draft.organization ?? "",
        relationship: draft.relationship ?? "",
        reason: draft.reason ?? "",
        expiration: draft.expiration ?? "",
        obtained: Boolean(draft.obtained),
        contactMade: false,
        documentedSetc: false,
      },
    ]);
    setDraft({});
  }

  return (
    <div className="mt-3 grid gap-3 rounded-md border border-lagoon/20 bg-paper p-3">
      <p className="text-xs font-semibold uppercase text-lagoon">ROI tracker</p>
      <div className="grid gap-2 md:grid-cols-2">
        {(["person", "organization", "relationship", "reason", "expiration"] as const).map((field) => (
          <label key={field} className="text-xs font-semibold text-ink">
            {field}
            <input
              value={draft[field] ?? ""}
              onChange={(e) => setDraft((c) => ({ ...c, [field]: e.target.value }))}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-2 py-1 text-sm"
            />
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={Boolean(draft.obtained)} onChange={(e) => setDraft((c) => ({ ...c, obtained: e.target.checked }))} />
          ROI obtained (PRO-1024RM)
        </label>
      </div>
      <button type="button" onClick={addRoi} className="focus-ring w-fit rounded-md border border-lagoon/30 px-3 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon hover:text-white">
        Add ROI contact
      </button>
      {rois.map((roi) => (
        <div key={roi.id} className="rounded-md border border-ink/10 bg-white p-3 text-sm">
          <p className="font-semibold text-ink">{roi.person} — {roi.organization}</p>
          <p className="text-ink/65">{roi.relationship} · {roi.reason}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            {(["obtained", "contactMade", "documentedSetc"] as const).map((key) => (
              <label key={key} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={roi[key]}
                  onChange={(e) =>
                    onChange(rois.map((r) => (r.id === roi.id ? { ...r, [key]: e.target.checked } : r)))
                  }
                />
                {key === "documentedSetc" ? "PRO-1081 logged" : key === "contactMade" ? "Contact made" : "ROI on file"}
              </label>
            ))}
          </div>
        </div>
      ))}
      <ROIContactScriptBuilder />
      <details className="text-sm text-ink/70">
        <summary className="cursor-pointer font-semibold text-ink">PRO-1081 SETC — what to document</summary>
        <p className="mt-2">{setcDescription.purpose}</p>
        <ul className="mt-2 list-disc pl-5">
          {setcDescription.document.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function WorkflowSectionBlock({
  section,
  state,
  onToggle,
  onFlags,
  onRois,
}: {
  section: WorkflowSection;
  state: ClientWorkflowState;
  onToggle: (id: string, value: boolean) => void;
  onFlags: (flags: string[]) => void;
  onRois: (rois: RoiRecord[]) => void;
}) {
  const { done, total } = sectionProgress(section, state.checkedTasks, state.flags);
  const visibleTasks = section.tasks.filter((t) => isTaskVisible(t, state.checkedTasks, state.flags));

  return (
    <details className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft" id={section.id}>
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        {section.title}
        <span className="ml-2 text-xs font-normal text-lagoon">
          {done}/{total} done
        </span>
      </summary>
      <p className="mt-2 text-sm text-ink/65">{section.summary}</p>
      {section.toolLinks?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {section.toolLinks.map((link) => (
            <Link key={link.href} href={link.href} className="focus-ring rounded-md border border-lagoon/20 px-2 py-1 text-xs font-semibold text-lagoon hover:bg-lagoon/10">
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
      {section.id === "comprehensive-assessment" ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {workflowFlagOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-1 rounded-md bg-paper px-2 py-1 text-xs">
              <input
                type="checkbox"
                checked={state.flags.includes(opt.id)}
                onChange={(e) =>
                  onFlags(
                    e.target.checked
                      ? [...state.flags, opt.id]
                      : state.flags.filter((f) => f !== opt.id),
                  )
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : null}
      {section.id === "intake-packet" && section.intakeForms ? (
        <div className="mt-3 grid gap-2">
          {section.intakeForms.map((form) => (
            <IntakeFormBlock key={form.id} formId={form.id} />
          ))}
        </div>
      ) : null}
      <div className="mt-3 grid gap-2">
        {visibleTasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            checked={Boolean(state.checkedTasks[task.id])}
            onToggle={onToggle}
          />
        ))}
      </div>
      {section.id === "roi-coordination" ? (
        <RoiPanel rois={state.rois} onChange={onRois} />
      ) : null}
    </details>
  );
}

export default function ClientWorkflow() {
  const { value: state, setValue, loaded, hydrated, cloudEnabled, syncing } = useCloudJson<ClientWorkflowState>(
    STORAGE_KEY,
    LEGACY_KEY,
    defaultWorkflowState,
  );

  const totalProgress = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const section of workflowSections) {
      const p = sectionProgress(section, state.checkedTasks, state.flags);
      done += p.done;
      total += p.total;
    }
    return { done, total };
  }, [state.checkedTasks, state.flags]);

  function update(partial: Partial<ClientWorkflowState>) {
    setValue({ ...state, ...partial });
  }

  function toggleTask(id: string, value: boolean) {
    const checkedTasks = { ...state.checkedTasks, [id]: value };
    setValue({ ...state, checkedTasks });
  }

  if (!loaded || !hydrated) {
    return <p className="text-sm text-ink/60">Loading workflow…</p>;
  }

  return (
    <section className="grid gap-3">
      <div className="sticky top-28 z-10 rounded-lg border border-lagoon/20 bg-white p-4 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Client Workflow</p>
        <p className="mt-1 text-sm text-ink/70">
          What did I just do → what does that unlock? Check tasks as you complete them in Procentive.
        </p>
        <label className="mt-3 block max-w-xs text-xs font-semibold text-ink">
          Client label (initials only)
          <input
            value={state.caseLabel}
            onChange={(e) => update({ caseLabel: e.target.value })}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
            placeholder="e.g. JS"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink/60">
          <span>{totalProgress.done}/{totalProgress.total} tasks complete</span>
          {cloudEnabled ? <span className="text-lagoon">Cloud sync on</span> : <span>Local only — sign in to sync</span>}
          {syncing ? <span>Syncing…</span> : null}
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-paper">
          <div
            className="h-1.5 rounded-full bg-lagoon transition-all"
            style={{ width: `${totalProgress.total ? (totalProgress.done / totalProgress.total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {workflowSections.map((section) => (
        <WorkflowSectionBlock
          key={section.id}
          section={section}
          state={state}
          onToggle={toggleTask}
          onFlags={(flags) => update({ flags })}
          onRois={(rois) => update({ rois })}
        />
      ))}
    </section>
  );
}
