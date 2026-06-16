"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

export default function SetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    async function loadSession() {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        await supabase!.auth.exchangeCodeForSession(code);
        window.history.replaceState(null, "", "/set-password");
      }

      const { data } = await supabase!.auth.getSession();
      setHasSession(Boolean(data.session));
    }

    loadSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  async function sendReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !email.trim()) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/set-password`,
    });
    setBusy(false);
    setMessage(
      error
        ? error.message
        : "Password email sent. Open the link in that email, then set your password here.",
    );
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    if (password.length < 8) {
      setMessage("Use at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("The two password fields do not match.");
      return;
    }

    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    setMessage(
      error
        ? error.message
        : "Password saved. You can now sign in from the top bar.",
    );
    if (!error) {
      setPassword("");
      setConfirmPassword("");
    }
  }

  if (!isCloudConfigured) {
    return (
      <section className="rounded-lg border border-clay/25 bg-white p-5 shadow-soft">
        <h1 className="text-2xl font-semibold text-ink">Cloud sign-in is not configured</h1>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Add the Supabase URL and anon key in Vercel before setting a password.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-2xl gap-5">
      <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h1 className="text-2xl font-semibold text-ink">Set Website Password</h1>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          LADC Compass is invite-only. Use the same email address that was
          invited in Supabase.
        </p>
      </div>

      {!hasSession ? (
        <form onSubmit={sendReset} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Send password setup email</h2>
          <label className="mt-4 block text-sm font-semibold text-ink">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
              placeholder="Your invited email"
            />
          </label>
          <button
            disabled={busy}
            className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
          >
            Send password email
          </button>
        </form>
      ) : (
        <form onSubmit={updatePassword} className="rounded-lg border border-lagoon/20 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Choose your password</h2>
          <div className="mt-4 grid gap-4">
            <label className="block text-sm font-semibold text-ink">
              New password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
                placeholder="At least 8 characters"
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Confirm password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="focus-ring mt-1 w-full rounded-md border border-ink/15 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <button
            disabled={busy}
            className="focus-ring mt-4 rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
          >
            Save password
          </button>
        </form>
      )}

      {message ? (
        <p className="rounded-lg border border-ink/10 bg-paper p-4 text-sm text-ink/75">
          {message}
        </p>
      ) : null}

      <Link href="/" className="focus-ring rounded-md text-sm font-semibold text-lagoon hover:text-ink">
        Back to dashboard
      </Link>
    </section>
  );
}
