"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import ResourceDatabase from "@/components/ResourceDatabase";
import { useCloudJson } from "@/lib/useCloudJson";
import { useLocalEntries } from "@/lib/useLocalEntries";

type ResourceContact = {
  id?: string;
  organization?: string;
  contactNames?: string;
  name?: string;
};

type EventStatus =
  | "scheduled"
  | "confirmed"
  | "showed"
  | "cancelled"
  | "no-show"
  | "rescheduled"
  | "needs-follow-up";

type ScheduleEvent = {
  id: string;
  title: string;
  contact: string;
  action: string;
  date: string;
  start: string;
  end: string;
  repeat: "none" | "daily" | "weekly" | "monthly";
  repeatEndDate: string;
  repeatCount: number;
  editScope: "one" | "future" | "series";
  deleteScope: "one" | "future" | "series";
  reminderAmount: number;
  reminderUnit: "minutes" | "hours" | "days";
  emailReminder: boolean;
  emailReminderAddress: string;
  textReminder: boolean;
  textReminderPhone: string;
  notes: string;
  wrapUpMinutes: number;
  unavailable?: boolean;
  statusByDate?: Record<string, EventStatus>;
};

type TaskItem = {
  id: string;
  text: string;
  createdDate: string;
  deadline: string;
  completedAt?: string;
  order: number;
};

type AlarmSettings = {
  enabled: boolean;
  sound: "soft" | "double" | "steady";
  defaultWrapUpMinutes: number;
};

const eventKey = "ladc-dashboard-events";
const taskKey = "ladc-dashboard-tasks";
const alarmKey = "ladc-dashboard-alarm";

const actionOptions = [
  "Meet",
  "Call",
  "Email",
  "Zoom",
  "Group",
  "Intake",
  "Assessment",
  "Individual Session",
  "Supervision",
  "Treatment Coordination",
  "Documentation",
  "Follow-up",
  "Unavailable",
];

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: "confirmed", label: "Confirmed" },
  { value: "showed", label: "Showed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No-show" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "needs-follow-up", label: "Needs follow-up" },
];

const defaultAlarm: AlarmSettings = {
  enabled: true,
  sound: "soft",
  defaultWrapUpMinutes: 10,
};

const emptyEvents: ScheduleEvent[] = [];
const emptyTasks: TaskItem[] = [];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dateKeyFor(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function startOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

function sameOrBefore(left: string, right: string) {
  return parseDateKey(left).getTime() <= parseDateKey(right).getTime();
}

function formatMonth(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function occursOn(event: ScheduleEvent, dayKey: string) {
  if (event.date === dayKey) return true;
  if (event.repeat === "none" || !sameOrBefore(event.date, dayKey)) return false;
  if (event.repeatEndDate && !sameOrBefore(dayKey, event.repeatEndDate)) return false;
  const first = parseDateKey(event.date);
  const day = parseDateKey(dayKey);
  const daysSince = Math.floor((day.getTime() - first.getTime()) / 86400000);
  if ((event.repeatCount ?? 0) > 0) {
    const occurrenceIndex =
      event.repeat === "daily"
        ? daysSince
        : event.repeat === "weekly"
          ? Math.floor(daysSince / 7)
          : (day.getFullYear() - first.getFullYear()) * 12 + day.getMonth() - first.getMonth();
    if (occurrenceIndex >= event.repeatCount) return false;
  }
  if (event.repeat === "daily") return true;
  if (event.repeat === "weekly") return first.getDay() === day.getDay();
  return first.getDate() === day.getDate();
}

function statusFor(event: ScheduleEvent, dayKey: string): EventStatus {
  return event.statusByDate?.[dayKey] ?? "scheduled";
}

function monthDays(viewMonth: Date) {
  const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const gridStart = startOfWeek(first);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function minutesFromTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function playSound(sound: AlarmSettings["sound"]) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();

  function tone(start: number, duration: number, frequency: number) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = sound === "steady" ? "sine" : "triangle";
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.001, context.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + start + duration);
    oscillator.start(context.currentTime + start);
    oscillator.stop(context.currentTime + start + duration + 0.02);
  }

  if (sound === "double") {
    tone(0, 0.18, 660);
    tone(0.3, 0.18, 660);
  } else if (sound === "steady") {
    tone(0, 0.8, 520);
  } else {
    tone(0, 0.22, 620);
    tone(0.25, 0.22, 820);
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

function EventCard({
  event,
  dayKey,
  onStatus,
  onEdit,
}: {
  event: ScheduleEvent;
  dayKey: string;
  onStatus: (eventId: string, dayKey: string, status: EventStatus) => void;
  onEdit: (event: ScheduleEvent, dayKey: string) => void;
}) {
  const status = statusFor(event, dayKey);
  return (
    <article
      className={`rounded-md border px-2 py-2 text-xs ${
        event.unavailable
          ? "border-clay/30 bg-clay/10"
          : "border-lagoon/20 bg-white"
      }`}
      onClick={(eventClick) => eventClick.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onEdit(event, dayKey)}
        className="block w-full text-left font-semibold text-ink hover:text-lagoon"
      >
        {event.start} {event.title || event.action}
      </button>
      <p className="mt-1 text-ink/60">
        {event.action}
        {event.contact ? ` | ${event.contact}` : ""}
      </p>
      <p className="mt-1 text-ink/55">Status: {status}</p>
      {!event.unavailable ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {statusOptions.slice(0, 4).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatus(event.id, dayKey, option.value)}
              className="rounded border border-ink/10 bg-paper px-2 py-1 text-[11px] font-semibold text-ink hover:border-lagoon"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function DashboardHome() {
  const todayKey = dateKeyFor(new Date());
  const {
    value: events,
    setValue: persistEvents,
    loaded: eventsLoaded,
    cloudEnabled,
    syncing,
  } = useCloudJson<ScheduleEvent[]>("workspace-events", eventKey, emptyEvents);
  const { value: tasks, setValue: persistTasks, loaded: tasksLoaded } = useCloudJson<TaskItem[]>(
    "workspace-tasks",
    taskKey,
    emptyTasks,
  );
  const { value: alarm, setValue: persistAlarm, loaded: alarmLoaded } = useCloudJson<AlarmSettings>(
    "workspace-alarm",
    alarmKey,
    defaultAlarm,
  );
  const { entries: resourceEntries, loaded: resourcesLoaded } =
    useLocalEntries<ResourceContact>("ladc-resource-directory");

  const setEvents = useCallback(
    (updater: ScheduleEvent[] | ((current: ScheduleEvent[]) => ScheduleEvent[])) => {
      const next = typeof updater === "function" ? updater(events) : updater;
      void persistEvents(next);
    },
    [events, persistEvents],
  );

  const setTasks = useCallback(
    (updater: TaskItem[] | ((current: TaskItem[]) => TaskItem[])) => {
      const next = typeof updater === "function" ? updater(tasks) : updater;
      void persistTasks(next);
    },
    [tasks, persistTasks],
  );

  const setAlarm = useCallback(
    (updater: AlarmSettings | ((current: AlarmSettings) => AlarmSettings)) => {
      const next = typeof updater === "function" ? updater(alarm) : updater;
      void persistAlarm(next);
    },
    [alarm, persistAlarm],
  );
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [weekStart, setWeekStart] = useState(dateKeyFor(startOfWeek(new Date())));
  const [miniMonth, setMiniMonth] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState<"week" | "day">("week");
  const [monthOverlayOpen, setMonthOverlayOpen] = useState(false);
  const [resourceOverlayOpen, setResourceOverlayOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [eventDraft, setEventDraft] = useState<ScheduleEvent | null>(null);
  const [taskDraft, setTaskDraft] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [warning, setWarning] = useState<ScheduleEvent | null>(null);
  const [warnedKeys, setWarnedKeys] = useState<string[]>([]);
  const [contactSuggestions, setContactSuggestions] = useState<string[]>([]);

  const weekDays = useMemo(
    () => Array.from({ length: 5 }, (_, index) => addDays(parseDateKey(weekStart), index)),
    [weekStart],
  );

  useEffect(() => {
    if (!resourcesLoaded) return;
    const names = resourceEntries.flatMap((resource) => [
      resource.organization,
      resource.contactNames,
      resource.name,
    ]);
    setContactSuggestions(
      Array.from(new Set(names.filter(Boolean).map((name) => String(name)))).sort(),
    );
  }, [resourceEntries, resourcesLoaded]);

  useEffect(() => {
    if (!warning) {
      document.title = "LADC Compass";
      return;
    }
    let visible = true;
    const interval = window.setInterval(() => {
      document.title = visible ? "WRAP UP - LADC Compass" : "LADC Compass";
      visible = !visible;
    }, 900);
    return () => {
      window.clearInterval(interval);
      document.title = "LADC Compass";
    };
  }, [warning]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!alarm.enabled) {
        setWarning(null);
        return;
      }
      const now = new Date();
      const dayKey = dateKeyFor(now);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const active = events
        .filter((event) => occursOn(event, dayKey) && !event.unavailable)
        .find((event) => {
          const end = minutesFromTime(event.end);
          const startWarning = end - (event.wrapUpMinutes || alarm.defaultWrapUpMinutes);
          const status = statusFor(event, dayKey);
          return status === "scheduled" && nowMinutes >= startWarning && nowMinutes < end;
        });

      if (!active) {
        setWarning(null);
        return;
      }

      const warningKey = `${active.id}-${dayKey}`;
      setWarning(active);
      if (!warnedKeys.includes(warningKey)) {
        playSound(alarm.sound);
        setWarnedKeys((current) => [...current, warningKey]);
      }
    }, 20000);
    return () => window.clearInterval(interval);
  }, [alarm, events, warnedKeys]);

  function loadContacts() {
    const names = resourceEntries.flatMap((resource) => [
      resource.organization,
      resource.contactNames,
      resource.name,
    ]);
    setContactSuggestions(
      Array.from(new Set(names.filter(Boolean).map((name) => String(name)))).sort(),
    );
  }

  function eventsForDay(dayKey: string) {
    return events
      .filter((event) => occursOn(event, dayKey))
      .sort((left, right) => left.start.localeCompare(right.start));
  }

  function activeTasksForDate(dayKey: string) {
    return tasks
      .filter((task) => !task.completedAt)
      .filter((task) => sameOrBefore(task.createdDate, dayKey))
      .filter((task) => !task.deadline || sameOrBefore(task.deadline, dayKey) || dayKey === todayKey)
      .sort((left, right) => left.order - right.order);
  }

  function openEventForm(dayKey: string, event?: ScheduleEvent) {
    setSelectedDate(dayKey);
    setEventDraft(
      event ? {
        ...event,
        repeatEndDate: event.repeatEndDate ?? "",
        repeatCount: event.repeatCount ?? 0,
        editScope: event.editScope ?? "one",
        deleteScope: event.deleteScope ?? "series",
        reminderAmount: event.reminderAmount ?? alarm.defaultWrapUpMinutes,
        reminderUnit: event.reminderUnit ?? "minutes",
        emailReminder: event.emailReminder ?? false,
        emailReminderAddress: event.emailReminderAddress ?? "",
        textReminder: event.textReminder ?? false,
        textReminderPhone: event.textReminderPhone ?? "",
      } : {
        id: crypto.randomUUID(),
        title: "",
        contact: "",
        action: "Meet",
        date: dayKey,
        start: "09:00",
        end: "10:00",
        repeat: "none",
        repeatEndDate: "",
        repeatCount: 0,
        editScope: "one",
        deleteScope: "series",
        reminderAmount: alarm.defaultWrapUpMinutes,
        reminderUnit: "minutes",
        emailReminder: false,
        emailReminderAddress: "",
        textReminder: false,
        textReminderPhone: "",
        notes: "",
        wrapUpMinutes: alarm.defaultWrapUpMinutes,
        statusByDate: {},
      },
    );
  }

  function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventDraft) return;
    const clean = {
      ...eventDraft,
      title: eventDraft.title || `${eventDraft.action}${eventDraft.contact ? `: ${eventDraft.contact}` : ""}`,
      unavailable: eventDraft.action === "Unavailable" || eventDraft.unavailable,
      repeatCount: Number(eventDraft.repeatCount || 0),
      reminderAmount: Number(eventDraft.reminderAmount || 0),
    };
    setEvents((current) => {
      const exists = current.some((item) => item.id === clean.id);
      return exists
        ? current.map((item) => (item.id === clean.id ? clean : item))
        : [...current, clean];
    });
    setEventDraft(null);
  }

  function updateStatus(eventId: string, dayKey: string, status: EventStatus) {
    setEvents((current) =>
      current.map((event) =>
        event.id === eventId
          ? {
              ...event,
              statusByDate: { ...(event.statusByDate ?? {}), [dayKey]: status },
            }
          : event,
      ),
    );
  }

  function deleteEvent() {
    if (!eventDraft) return;
    setEvents((current) => current.filter((event) => event.id !== eventDraft.id));
    setEventDraft(null);
  }

  function markUnavailable(dayKey: string) {
    setEvents((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: "Unavailable",
        contact: "",
        action: "Unavailable",
        date: dayKey,
        start: "08:00",
        end: "17:00",
        repeat: "none",
        repeatEndDate: "",
        repeatCount: 0,
        editScope: "one",
        deleteScope: "series",
        reminderAmount: 0,
        reminderUnit: "minutes",
        emailReminder: false,
        emailReminderAddress: "",
        textReminder: false,
        textReminderPhone: "",
        notes: "Marked unavailable.",
        wrapUpMinutes: 0,
        unavailable: true,
        statusByDate: {},
      },
    ]);
  }

  function selectCalendarDate(dayKey: string, mode: "week" | "day" = "day") {
    const day = parseDateKey(dayKey);
    setSelectedDate(dayKey);
    setWeekStart(dateKeyFor(startOfWeek(day)));
    setCalendarMode(mode);
  }

  function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = taskDraft.trim();
    if (!clean) return;
    if (editingTaskId) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTaskId
            ? { ...task, text: clean, deadline: taskDeadline }
            : task,
        ),
      );
      setEditingTaskId(null);
    } else {
      setTasks((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          text: clean,
          createdDate: selectedDate,
          deadline: taskDeadline,
          order: current.length,
        },
      ]);
    }
    setTaskDraft("");
    setTaskDeadline("");
  }

  function editTask(task: TaskItem) {
    setEditingTaskId(task.id);
    setTaskDraft(task.text);
    setTaskDeadline(task.deadline);
  }

  function completeTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completedAt: new Date().toISOString() } : task,
      ),
    );
  }

  function moveTask(id: string, direction: -1 | 1) {
    const list = [...tasks].sort((left, right) => left.order - right.order);
    const index = list.findIndex((task) => task.id === id);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= list.length) return;
    [list[index], list[nextIndex]] = [list[nextIndex], list[index]];
    setTasks(list.map((task, order) => ({ ...task, order })));
  }

  const selectedTasks = activeTasksForDate(selectedDate);
  const selectedDateEvents = eventsForDay(selectedDate);
  const miniDays = monthDays(miniMonth);

  if (!eventsLoaded || !tasksLoaded || !alarmLoaded) {
    return <p className="text-sm text-ink/60">Loading workspace…</p>;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]">
      {warning ? (
        <div className="fixed left-0 right-0 top-0 z-50 bg-clay px-4 py-2 text-center text-sm font-bold text-white">
          Wrap-up warning: {warning.title} ends at {warning.end}
        </div>
      ) : null}

      <aside className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
              Workspace · Tasks
            </p>
            <h2 className="text-lg font-semibold text-ink">{formatShortDate(parseDateKey(selectedDate))}</h2>
            {cloudEnabled ? (
              <p className="text-[11px] text-lagoon">{syncing ? "Syncing…" : "Cloud sync on"}</p>
            ) : (
              <p className="text-[11px] text-ink/55">Sign in to sync across devices</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="focus-ring rounded-md border border-ink/10 px-2 py-1 text-xs font-semibold text-ink hover:bg-paper"
          >
            History
          </button>
        </div>

        <form onSubmit={submitTask} className="mt-4 grid gap-2">
          <textarea
            value={taskDraft}
            onChange={(event) => setTaskDraft(event.target.value)}
            className="focus-ring min-h-20 rounded-md border border-ink/15 px-3 py-2 text-sm"
            placeholder="Add task. Use de-identified wording."
          />
          <label className="text-xs font-semibold text-ink">
            Deadline
            <input
              type="date"
              value={taskDeadline}
              onChange={(event) => setTaskDeadline(event.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
            />
          </label>
          <button className="focus-ring rounded-md bg-lagoon px-3 py-2 text-sm font-semibold text-white hover:bg-ink">
            {editingTaskId ? "Update task" : "Add task"}
          </button>
        </form>

        <div className="mt-4 grid gap-2">
          {selectedTasks.length === 0 ? (
            <p className="rounded-md bg-paper p-3 text-sm text-ink/65">No active tasks for this day.</p>
          ) : null}
          {selectedTasks.map((task) => (
            <article key={task.id} className="rounded-md border border-ink/10 bg-paper p-3 text-sm">
              <label className="flex gap-2 font-medium text-ink">
                <input type="checkbox" onChange={() => completeTask(task.id)} />
                <span>{task.text}</span>
              </label>
              {task.deadline ? (
                <p className="mt-1 text-xs text-ink/55">Deadline: {task.deadline}</p>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-1">
                <button type="button" onClick={() => editTask(task)} className="rounded border border-ink/10 bg-white px-2 py-1 text-xs font-semibold">Edit</button>
                <button type="button" onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))} className="rounded border border-ink/10 bg-white px-2 py-1 text-xs font-semibold">Delete</button>
                <button type="button" onClick={() => moveTask(task.id, -1)} className="rounded border border-ink/10 bg-white px-2 py-1 text-xs font-semibold">Up</button>
                <button type="button" onClick={() => moveTask(task.id, 1)} className="rounded border border-ink/10 bg-white px-2 py-1 text-xs font-semibold">Down</button>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
              {calendarMode === "week" ? "This Week" : "Selected Day"}
            </p>
            <h2 className="text-2xl font-semibold text-ink">
              {calendarMode === "week"
                ? `${formatShortDate(weekDays[0])} - ${formatShortDate(weekDays[4])}`
                : formatShortDate(parseDateKey(selectedDate))}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => selectCalendarDate(todayKey, "day")}
              className={`focus-ring rounded-md border px-3 py-2 text-sm font-semibold ${
                calendarMode === "day" && selectedDate === todayKey
                  ? "border-lagoon bg-lagoon text-white"
                  : "border-ink/10 hover:bg-paper"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setCalendarMode("week")}
              className={`focus-ring rounded-md border px-3 py-2 text-sm font-semibold ${
                calendarMode === "week"
                  ? "border-lagoon bg-lagoon text-white"
                  : "border-ink/10 hover:bg-paper"
              }`}
            >
              Weekly View
            </button>
            <button
              type="button"
              onClick={() =>
                calendarMode === "week"
                  ? setWeekStart(dateKeyFor(addDays(parseDateKey(weekStart), -7)))
                  : selectCalendarDate(dateKeyFor(addDays(parseDateKey(selectedDate), -1)), "day")
              }
              className="focus-ring rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold hover:bg-paper"
            >
              Previous
            </button>
            <button type="button" onClick={() => selectCalendarDate(todayKey, calendarMode)} className="focus-ring rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold hover:bg-paper">Current</button>
            <button
              type="button"
              onClick={() =>
                calendarMode === "week"
                  ? setWeekStart(dateKeyFor(addDays(parseDateKey(weekStart), 7)))
                  : selectCalendarDate(dateKeyFor(addDays(parseDateKey(selectedDate), 1)), "day")
              }
              className="focus-ring rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold hover:bg-paper"
            >
              Next
            </button>
          </div>
        </div>

        {calendarMode === "day" ? (
          <section className="mt-4 min-h-[34rem] rounded-xl border border-lagoon/25 bg-lagoon/5 p-4">
            <div className="flex flex-col gap-3 border-b border-lagoon/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-ink">
                  {formatShortDate(parseDateKey(selectedDate))}
                </h3>
                <p className="mt-1 text-sm text-ink/60">
                  {selectedDateEvents.length} scheduled item{selectedDateEvents.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEventForm(selectedDate)}
                  className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
                >
                  Add event
                </button>
                <button
                  type="button"
                  onClick={() => markUnavailable(selectedDate)}
                  className="focus-ring rounded-md border border-clay/30 px-4 py-2 text-sm font-semibold text-clay hover:bg-clay hover:text-white"
                >
                  Make unavailable
                </button>
              </div>
            </div>
            <div
              onClick={() => openEventForm(selectedDate)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") openEventForm(selectedDate);
              }}
              className="focus-ring mt-4 grid min-h-96 cursor-pointer content-start gap-3 rounded-lg border border-ink/10 bg-white p-4"
            >
              {selectedDateEvents.length === 0 ? (
                <p className="rounded-md bg-paper p-4 text-sm text-ink/65">
                  Nothing scheduled. Click here or use Add event.
                </p>
              ) : null}
              {selectedDateEvents.map((event) => (
                <EventCard
                  key={`${event.id}-${selectedDate}`}
                  event={event}
                  dayKey={selectedDate}
                  onStatus={updateStatus}
                  onEdit={(item, occurrenceDay) => openEventForm(occurrenceDay, item)}
                />
              ))}
            </div>
          </section>
        ) : (
        <div className="mt-4 grid min-h-[38rem] gap-3 lg:grid-cols-5">
          {weekDays.map((day) => {
            const dayKey = dateKeyFor(day);
            const dayEvents = eventsForDay(dayKey);
            const isSelected = dayKey === selectedDate;
            return (
              <div
                key={dayKey}
                onClick={() => openEventForm(dayKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") openEventForm(dayKey);
                }}
                className={`focus-ring flex min-h-[34rem] cursor-pointer flex-col rounded-xl border p-4 text-left shadow-sm ${
                  isSelected ? "border-lagoon bg-lagoon/5" : "border-ink/15 bg-paper"
                }`}
              >
                <span className="rounded-md bg-white px-3 py-2 text-base font-semibold text-ink shadow-sm">
                  {formatShortDate(day)}
                </span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-lagoon">Click to add</span>
                <span className="mt-3 grid gap-2">
                  {dayEvents.map((event) => (
                    <EventCard
                      key={`${event.id}-${dayKey}`}
                      event={event}
                      dayKey={dayKey}
                      onStatus={updateStatus}
                      onEdit={(item, occurrenceDay) => openEventForm(occurrenceDay, item)}
                    />
                  ))}
                </span>
              </div>
            );
          })}
        </div>
        )}
      </section>

      <aside className="grid content-start gap-4">
        <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setMiniMonth(addMonths(miniMonth, -1))} className="rounded px-2 py-1 text-sm font-semibold hover:bg-paper">Prev</button>
            <button type="button" onClick={() => setMonthOverlayOpen(true)} className="focus-ring rounded-md px-2 py-1 text-sm font-semibold text-ink hover:bg-paper">
              {formatMonth(miniMonth)}
            </button>
            <button type="button" onClick={() => setMiniMonth(addMonths(miniMonth, 1))} className="rounded px-2 py-1 text-sm font-semibold hover:bg-paper">Next</button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-ink/55">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {miniDays.map((day) => {
              const dayKey = dateKeyFor(day);
              const dayEvents = eventsForDay(dayKey);
              const hasUnavailable = dayEvents.some((event) => event.unavailable);
              const hasActive = dayEvents.some((event) => !event.unavailable);
              const inMonth = day.getMonth() === miniMonth.getMonth();
              return (
                <button
                  key={dayKey}
                  type="button"
                  onClick={() => selectCalendarDate(dayKey, "day")}
                  className={`focus-ring relative rounded-md px-1 py-2 text-xs font-semibold ${
                    inMonth ? "text-ink hover:bg-paper" : "text-ink/25"
                  } ${dayKey === selectedDate ? "bg-lagoon text-white" : ""}`}
                >
                  {day.getDate()}
                  {hasUnavailable ? <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-clay" /> : null}
                  {!hasUnavailable && hasActive ? <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sage" /> : null}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setResourceOverlayOpen(true)} className="focus-ring mt-4 w-full rounded-md border border-lagoon/20 px-3 py-2 text-sm font-semibold text-lagoon hover:bg-lagoon hover:text-white">
            Resources / Contacts
          </button>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Alarm</p>
          <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={alarm.enabled}
              onChange={(event) => setAlarm((current) => ({ ...current, enabled: event.target.checked }))}
            />
            Wrap-up warnings on
          </label>
          <label className="mt-3 block text-xs font-semibold text-ink">
            Default minutes before end
            <input
              type="number"
              min="1"
              value={alarm.defaultWrapUpMinutes}
              onChange={(event) => setAlarm((current) => ({ ...current, defaultWrapUpMinutes: Number(event.target.value || 1) }))}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-3 block text-xs font-semibold text-ink">
            Sound
            <select
              value={alarm.sound}
              onChange={(event) => setAlarm((current) => ({ ...current, sound: event.target.value as AlarmSettings["sound"] }))}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
            >
              <option value="soft">Soft chime</option>
              <option value="double">Double beep</option>
              <option value="steady">Steady tone</option>
            </select>
          </label>
          <button type="button" onClick={() => playSound(alarm.sound)} className="focus-ring mt-3 w-full rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink hover:bg-lagoon hover:text-white">
            Test sound
          </button>
        </section>

        <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Selected Day</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{formatShortDate(parseDateKey(selectedDate))}</h2>
          <p className="mt-2 text-sm text-ink/65">{selectedDateEvents.length} event{selectedDateEvents.length === 1 ? "" : "s"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => openEventForm(selectedDate)} className="focus-ring rounded-md bg-lagoon px-3 py-2 text-sm font-semibold text-white">Add event</button>
            <button type="button" onClick={() => markUnavailable(selectedDate)} className="focus-ring rounded-md border border-clay/30 px-3 py-2 text-sm font-semibold text-clay">Unavailable</button>
          </div>
        </section>
      </aside>

      {eventDraft ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-ink/40 p-4">
          <form onSubmit={saveEvent} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">Schedule Event</p>
                <h2 className="text-2xl font-semibold text-ink">{eventDraft.date}</h2>
              </div>
              <button type="button" onClick={() => setEventDraft(null)} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Close</button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-ink">
                Action
                <select value={eventDraft.action} onChange={(event) => setEventDraft((current) => current ? { ...current, action: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                  {actionOptions.map((action) => <option key={action}>{action}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Contact / place
                <input list="dashboard-contacts" value={eventDraft.contact} onChange={(event) => setEventDraft((current) => current ? { ...current, contact: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Use initials or non-identifying label" />
                <datalist id="dashboard-contacts">
                  {contactSuggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}
                </datalist>
              </label>
              <label className="text-sm font-semibold text-ink">
                Title
                <input value={eventDraft.title} onChange={(event) => setEventDraft((current) => current ? { ...current, title: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Example: Individual session, supervision, call back" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Date
                <input type="date" value={eventDraft.date} onChange={(event) => setEventDraft((current) => current ? { ...current, date: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Start
                <input type="time" value={eventDraft.start} onChange={(event) => setEventDraft((current) => current ? { ...current, start: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm font-semibold text-ink">
                End
                <input type="time" value={eventDraft.end} onChange={(event) => setEventDraft((current) => current ? { ...current, end: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Repeat
                <select value={eventDraft.repeat} onChange={(event) => setEventDraft((current) => current ? { ...current, repeat: event.target.value as ScheduleEvent["repeat"] } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Repeat end date
                <input type="date" value={eventDraft.repeatEndDate} onChange={(event) => setEventDraft((current) => current ? { ...current, repeatEndDate: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm font-semibold text-ink">
                End after occurrences
                <input type="number" min="0" value={eventDraft.repeatCount} onChange={(event) => setEventDraft((current) => current ? { ...current, repeatCount: Number(event.target.value || 0) } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="0 = no count limit" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Edit scope
                <select value={eventDraft.editScope} onChange={(event) => setEventDraft((current) => current ? { ...current, editScope: event.target.value as ScheduleEvent["editScope"] } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                  <option value="one">Edit this event only</option>
                  <option value="future">Edit this and future events</option>
                  <option value="series">Edit entire series</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Delete scope
                <select value={eventDraft.deleteScope} onChange={(event) => setEventDraft((current) => current ? { ...current, deleteScope: event.target.value as ScheduleEvent["deleteScope"] } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                  <option value="one">Delete this event only</option>
                  <option value="future">Delete future events</option>
                  <option value="series">Delete entire series</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Wrap-up warning minutes
                <input type="number" min="0" value={eventDraft.wrapUpMinutes} onChange={(event) => setEventDraft((current) => current ? { ...current, wrapUpMinutes: Number(event.target.value || 0) } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Reminder timing
                <div className="mt-1 grid grid-cols-[1fr_1fr] gap-2">
                  <input type="number" min="0" value={eventDraft.reminderAmount} onChange={(event) => setEventDraft((current) => current ? { ...current, reminderAmount: Number(event.target.value || 0) } : current)} className="focus-ring w-full rounded-md border border-ink/15 px-3 py-2 text-sm" />
                  <select value={eventDraft.reminderUnit} onChange={(event) => setEventDraft((current) => current ? { ...current, reminderUnit: event.target.value as ScheduleEvent["reminderUnit"] } : current)} className="focus-ring w-full rounded-md border border-ink/15 px-3 py-2 text-sm">
                    <option value="minutes">Minutes before</option>
                    <option value="hours">Hours before</option>
                    <option value="days">Days before</option>
                  </select>
                </div>
              </label>
              <div className="rounded-md border border-ink/10 bg-paper p-3 text-sm text-ink/70">
                <p className="font-semibold text-ink">Future reminder integrations</p>
                <label className="mt-2 flex items-center gap-2">
                  <input type="checkbox" checked={eventDraft.emailReminder} onChange={(event) => setEventDraft((current) => current ? { ...current, emailReminder: event.target.checked } : current)} />
                  Email reminder UI only
                </label>
                {eventDraft.emailReminder ? (
                  <label className="mt-2 block text-xs font-semibold text-ink">
                    Email address
                    <input type="email" value={eventDraft.emailReminderAddress} onChange={(event) => setEventDraft((current) => current ? { ...current, emailReminderAddress: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm" placeholder="Future integration only" />
                  </label>
                ) : null}
                <label className="mt-2 flex items-center gap-2">
                  <input type="checkbox" checked={eventDraft.textReminder} onChange={(event) => setEventDraft((current) => current ? { ...current, textReminder: event.target.checked } : current)} />
                  Text reminder UI only
                </label>
                {eventDraft.textReminder ? (
                  <label className="mt-2 block text-xs font-semibold text-ink">
                    Phone number
                    <input type="tel" value={eventDraft.textReminderPhone} onChange={(event) => setEventDraft((current) => current ? { ...current, textReminderPhone: event.target.value } : current)} className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm" placeholder="Future integration only" />
                  </label>
                ) : null}
                <p className="mt-2 text-xs">These preferences are saved for future integration. The site does not send email or SMS yet.</p>
              </div>
            </div>
            <label className="mt-4 block text-sm font-semibold text-ink">
              Notes
              <textarea value={eventDraft.notes} onChange={(event) => setEventDraft((current) => current ? { ...current, notes: event.target.value } : current)} className="focus-ring mt-1 min-h-24 w-full rounded-md border border-ink/15 px-3 py-2 text-sm" placeholder="Do not enter PHI. Use general reminders only." />
            </label>
            <div className="mt-5 flex flex-wrap justify-between gap-2">
              <button type="button" onClick={deleteEvent} className="focus-ring rounded-md border border-clay/30 px-4 py-2 text-sm font-semibold text-clay hover:bg-clay hover:text-white">Delete</button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEventDraft(null)} className="focus-ring rounded-md border border-ink/10 px-4 py-2 text-sm font-semibold">Cancel</button>
                <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">Save event</button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {monthOverlayOpen ? (
        <div className="fixed inset-0 z-40 bg-paper p-4">
          <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setMiniMonth(addMonths(miniMonth, -1))} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Previous</button>
                <h2 className="text-2xl font-semibold text-ink">{formatMonth(miniMonth)}</h2>
                <button type="button" onClick={() => setMiniMonth(addMonths(miniMonth, 1))} className="rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold">Next</button>
              </div>
              <button type="button" onClick={() => setMonthOverlayOpen(false)} className="rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white">Close month</button>
            </div>
            <div className="grid min-h-0 grid-cols-7 gap-2">
              {miniDays.map((day) => {
                const dayKey = dateKeyFor(day);
                const dayEvents = eventsForDay(dayKey);
                return (
                  <button key={dayKey} type="button" onClick={() => openEventForm(dayKey)} className="focus-ring overflow-y-auto rounded-lg border border-ink/10 bg-white p-3 text-left shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">{day.getDate()}</span>
                      <span className="text-xs text-ink/45">{dayEvents.length}</span>
                    </div>
                    <div className="mt-2 grid gap-1">
                      {dayEvents.slice(0, 4).map((event) => (
                        <span key={`${event.id}-${dayKey}`} className={`rounded px-2 py-1 text-xs ${event.unavailable ? "bg-clay/10 text-clay" : "bg-paper text-ink"}`}>
                          {event.start} {event.title}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {resourceOverlayOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-paper p-4">
          <div className="mx-auto max-w-7xl">
            <div className="sticky top-0 z-10 mb-4 flex justify-end bg-paper py-2">
              <button type="button" onClick={() => { setResourceOverlayOpen(false); loadContacts(); }} className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white">Close resources</button>
            </div>
            <ResourceDatabase />
          </div>
        </div>
      ) : null}

      {historyOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-ink/40 p-4">
          <section className="mx-auto max-w-5xl rounded-lg bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-ink">Schedule and Task History</h2>
              <button type="button" onClick={() => setHistoryOpen(false)} className="rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white">Close</button>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <article className="rounded-lg border border-ink/10 bg-paper p-4">
                <h3 className="font-semibold text-ink">Events</h3>
                <div className="mt-3 grid max-h-96 gap-2 overflow-y-auto text-sm">
                  {events.map((event) => (
                    <p key={event.id} className="rounded-md bg-white p-3">
                      <strong>{event.date} {event.start}</strong> {event.title} {event.repeat !== "none" ? `(${event.repeat})` : ""}
                    </p>
                  ))}
                </div>
              </article>
              <article className="rounded-lg border border-ink/10 bg-paper p-4">
                <h3 className="font-semibold text-ink">Tasks</h3>
                <div className="mt-3 grid max-h-96 gap-2 overflow-y-auto text-sm">
                  {tasks.map((task) => (
                    <p key={task.id} className="rounded-md bg-white p-3">
                      <strong>{task.completedAt ? "Done" : "Open"}:</strong> {task.text}
                      {task.deadline ? ` | Deadline: ${task.deadline}` : ""}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
