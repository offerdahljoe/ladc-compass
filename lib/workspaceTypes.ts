export type EventStatus =
  | "scheduled"
  | "confirmed"
  | "showed"
  | "cancelled"
  | "no-show"
  | "rescheduled"
  | "needs-follow-up";

export type CalendarMode = "month" | "week" | "day";

export type WorkspaceContact = {
  id: string;
  label: string;
  organization: string;
  role: string;
  phone: string;
  email: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  contact: string;
  contactId?: string;
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
  colorCategory?: string;
  unavailable?: boolean;
  statusByDate?: Record<string, EventStatus>;
};

export type TaskItem = {
  id: string;
  text: string;
  createdDate: string;
  deadline: string;
  completedAt?: string;
  order: number;
  contactId?: string;
  linkedEventId?: string;
  priority?: "low" | "normal" | "high";
  pinned?: boolean;
};

export type AlarmSettings = {
  enabled: boolean;
  sound: "soft" | "double" | "steady";
  defaultWrapUpMinutes: number;
  upcomingReminderMinutes: number;
};

export type ReminderNotice = {
  id: string;
  kind: "upcoming" | "wrap-up" | "task";
  title: string;
  body: string;
  eventId?: string;
};

export const eventColorCategories = [
  { id: "clinical", label: "Clinical", className: "border-lagoon/40 bg-lagoon/10" },
  { id: "coordination", label: "Coordination", className: "border-sage/40 bg-sage/10" },
  { id: "supervision", label: "Supervision", className: "border-marigold/40 bg-marigold/10" },
  { id: "personal", label: "Personal", className: "border-ink/20 bg-paper" },
  { id: "unavailable", label: "Unavailable", className: "border-clay/40 bg-clay/15" },
] as const;
