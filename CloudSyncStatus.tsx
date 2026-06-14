"use client";

import { FormEvent, useEffect, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

export default function CloudSyncStatus() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    async function loadUser() {
      const { data } = await supabase!.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    }

    loadUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
      if (session?.user.email) {
        setMessage("Cloud sync is on for this browser.");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !email.trim() || !password) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    setMessage(
      error
        ? error.message
        : "Signed in. Cloud sync is on for this browser.",
    );
  }

  async function resetPassword() {
    if (!supabase || !email.trim()) {
      setMessage("Enter your email address first, then choose Reset password.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin,
    });
    setBusy(false);
    setMessage(
      error
        ? error.message
        : "Password reset email sent. Use it only for an invited account.",
    );
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
    setUserEmail(null);
    setMessage("Signed out. Saved tools will use this browser only.");
  }

  if (!isCloudConfigured) {
    return (
      <div className="rounded-lg border border-clay/25 bg-white px-3 py-2 text-xs text-ink/70">
        <strong className="text-ink">Cloud sync off.</strong> Add Supabase keys
        in Vercel to sync saved tools.
      </div>
    );
  }

  if (userEmail) {
    return (
      <div className="rounded-lg border border-lagoon/20 bg-white px-3 py-2 text-xs text-ink/75">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            <strong className="text-lagoon">Cloud sync on</strong> for {userEmail}
          </span>
          <button
            type="button"
            onClick={signOut}
            disabled={busy}
            className="focus-ring rounded-md border border-ink/15 px-2 py-1 font-semibold text-ink hover:bg-paper"
          >
            Sign out
          </button>
        </div>
        {message ? <p className="mt-1 text-ink/60">{message}</p> : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={signIn}
      className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-xs text-ink/75"
    >
      <label className="font-semibold text-ink">
        Sign in to save/sync
        <div className="mt-1 grid gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="focus-ring min-w-0 rounded-md border border-ink/15 px-2 py-1.5 text-xs"
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="focus-ring min-w-0 rounded-md border border-ink/15 px-2 py-1.5 text-xs"
            placeholder="Password"
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            disabled={busy}
            className="focus-ring rounded-md bg-lagoon px-3 py-1.5 font-semibold text-white hover:bg-ink"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={resetPassword}
            disabled={busy}
            className="focus-ring rounded-md border border-ink/15 px-3 py-1.5 font-semibold text-ink hover:bg-paper"
          >
            Reset password
          </button>
        </div>
      </label>
      <p className="mt-1 text-ink/55">Invite-only. No public account creation.</p>
      {message ? <p className="mt-1 text-ink/60">{message}</p> : null}
    </form>
  );
}
