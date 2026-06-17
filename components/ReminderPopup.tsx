"use client";

import type { ReminderNotice } from "@/lib/workspaceTypes";

export default function ReminderPopup({
  notices,
  onAcknowledge,
}: {
  notices: ReminderNotice[];
  onAcknowledge: (id: string) => void;
}) {
  if (!notices.length) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] grid max-w-sm gap-2">
      {notices.map((notice) => (
        <article
          key={notice.id}
          className="pointer-events-auto animate-pulse rounded-lg border-2 border-lagoon bg-white p-4 shadow-soft"
          role="alert"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-lagoon">
            {notice.kind === "wrap-up" ? "Wrap-up reminder" : notice.kind === "upcoming" ? "Upcoming event" : "Task reminder"}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-ink">{notice.title}</h3>
          <p className="mt-1 text-sm leading-6 text-ink/75">{notice.body}</p>
          <button
            type="button"
            onClick={() => onAcknowledge(notice.id)}
            className="focus-ring mt-3 w-full rounded-md bg-lagoon px-3 py-2 text-xs font-semibold text-white hover:bg-ink"
          >
            Acknowledge
          </button>
        </article>
      ))}
    </div>
  );
}
