import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

export type RemoteReminderPayload = {
  channel: "email" | "sms";
  to: string;
  subject: string;
  body: string;
  eventTitle: string;
  eventWhen: string;
};

/** Calls Supabase Edge Function `send-reminder` when deployed. No-op if unavailable. */
export async function sendRemoteReminder(payload: RemoteReminderPayload): Promise<{ ok: boolean; message: string }> {
  if (!isCloudConfigured || !supabase) {
    return { ok: false, message: "Cloud not configured." };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session?.access_token) {
    return { ok: false, message: "Sign in to send email/SMS reminders." };
  }

  try {
    const { data, error } = await supabase.functions.invoke("send-reminder", {
      body: payload,
    });

    if (error) {
      return {
        ok: false,
        message:
          error.message.includes("404") || error.message.includes("not found")
            ? "Reminder service not deployed yet. Deploy supabase/functions/send-reminder on Supabase."
            : error.message,
      };
    }

    return { ok: true, message: String((data as { message?: string })?.message ?? "Reminder queued.") };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Reminder send failed." };
  }
}
