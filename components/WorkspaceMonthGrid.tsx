"use client";

import type { ScheduleEvent } from "@/lib/workspaceTypes";
import { eventColorCategories } from "@/lib/workspaceTypes";

function colorClass(event: ScheduleEvent) {
  if (event.unavailable) return "border-clay/40 bg-clay/15";
  const cat = eventColorCategories.find((c) => c.id === event.colorCategory);
  return cat?.className ?? "border-lagoon/25 bg-lagoon/5";
}

export default function WorkspaceMonthGrid({
  days,
  viewMonth,
  selectedDate,
  eventsForDay,
  onSelectDay,
  onDropEvent,
  onDragStart,
  draggingEventId,
  renderEvent,
}: {
  days: Date[];
  viewMonth: Date;
  selectedDate: string;
  eventsForDay: (dayKey: string) => ScheduleEvent[];
  onSelectDay: (dayKey: string) => void;
  onDropEvent: (eventId: string, dayKey: string) => void;
  onDragStart: (eventId: string) => void;
  draggingEventId: string | null;
  renderEvent?: (event: ScheduleEvent, dayKey: string) => React.ReactNode;
}) {
  const monthIndex = viewMonth.getMonth();

  function dateKeyFor(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  return (
    <div className="mt-4 grid grid-cols-7 gap-1">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => (
        <div key={label} className="px-1 py-1 text-center text-[11px] font-semibold uppercase text-ink/55">
          {label}
        </div>
      ))}
      {days.map((day) => {
        const dayKey = dateKeyFor(day);
        const inMonth = day.getMonth() === monthIndex;
        const dayEvents = eventsForDay(dayKey);
        const hasUnavailable = dayEvents.some((e) => e.unavailable);
        const isSelected = dayKey === selectedDate;

        return (
          <div
            key={dayKey}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggingEventId) onDropEvent(draggingEventId, dayKey);
            }}
            className={`min-h-[6.5rem] rounded-lg border p-1 ${
              isSelected ? "border-lagoon bg-lagoon/5" : "border-ink/10 bg-white"
            } ${!inMonth ? "opacity-45" : ""}`}
          >
            <button
              type="button"
              onClick={() => onSelectDay(dayKey)}
              className="flex w-full items-center justify-between rounded px-1 py-0.5 text-left"
            >
              <span className={`text-sm font-semibold ${hasUnavailable ? "text-clay line-through decoration-2" : "text-ink"}`}>
                {day.getDate()}
              </span>
              {hasUnavailable ? (
                <span className="rounded bg-clay px-1 text-[10px] font-bold text-white">X</span>
              ) : dayEvents.length ? (
                <span className="text-[10px] font-semibold text-lagoon">{dayEvents.length}</span>
              ) : null}
            </button>
            <div className="mt-1 grid gap-0.5">
              {dayEvents.slice(0, 3).map((event) =>
                renderEvent ? (
                  renderEvent(event, dayKey)
                ) : (
                  <div
                    key={`${event.id}-${dayKey}`}
                    draggable={!event.unavailable}
                    onDragStart={() => onDragStart(event.id)}
                    className={`cursor-grab truncate rounded border px-1 py-0.5 text-[10px] font-medium active:cursor-grabbing ${colorClass(event)}`}
                    title={`${event.start} ${event.title}`}
                  >
                    {event.start} {event.title || event.action}
                  </div>
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
