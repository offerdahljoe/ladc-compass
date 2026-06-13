"use client";

import type { User } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

export default function CloudAccount() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setMessage("Sending sign-in link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    setMessage(
      error
        ? error.message
        : "Check your email for the sign-in link. After signing in, your saved entries can sync across computers.",
    );
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setMessage("Signed out. Entries are still available on this browser if saved locally.");
  }

  if (!isCloudConfigured) {
    return (
      <section className="rounded-lg border border-marigold/40 bg-marigold/10 px-4 py-3 text-sm text-ink">
        <strong>Cloud sync not connected yet.</strong> In Vercel, add
        `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under
        Project Settings, then redeploy. Local browser saving still works.
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-lagoon/25 bg-white px-4 py-3 text-sm shadow-soft">
      {user ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink">
            <strong>Cloud sync on:</strong> {user.email}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="focus-ring rounded-md border border-ink/10 bg-paper px-3 py-2 font-semibold text-ink hover:border-lagoon"
          >
            Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={signIn} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="font-medium text-ink">
            Sign in to sync across computers
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2"
              placeholder="you@example.com"
            />
          </label>
          <button className="focus-ring rounded-md bg-lagoon px-4 py-2 font-semibold text-white hover:bg-ink">
            Email sign-in link
          </button>
        </form>
      )}
      {message ? <p className="mt-2 text-ink/70">{message}</p> : null}
    </section>
  );
}
