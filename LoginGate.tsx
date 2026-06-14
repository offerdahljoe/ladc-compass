"use client";

import type { User } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

const buildLabel = "2026-06-14 medication-core-search build";

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [authIssue, setAuthIssue] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAuthIssue(
        "The sign-in check took too long. You can still request a new sign-in link below.",
      );
      setLoading(false);
    }, 5000);

    if (!supabase) {
      window.clearTimeout(timeout);
      setLoading(false);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) setAuthIssue(error.message);
        setUser(data.session?.user ?? null);
      })
      .catch((error: unknown) => {
        setAuthIssue(
          error instanceof Error
            ? error.message
            : "Unable to check sign-in status.",
        );
      })
      .finally(() => {
        window.clearTimeout(timeout);
        setLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      window.clearTimeout(timeout);
      setLoading(false);
    });
    return () => {
      window.clearTimeout(timeout);
      data.subscription.unsubscribe();
    };
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setMessage("Sending sign-in link...");
    const redirectTo = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setMessage(error ? error.message : "Check your email for the sign-in link.");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-6 text-ink shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
            LADC Compass
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Checking sign-in...</h1>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Build: {buildLabel}
          </p>
        </div>
      </div>
    );
  }

  if (!isCloudConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section className="w-full max-w-lg rounded-lg border border-marigold/35 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
            LADC Compass
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Cloud setup needed</h1>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Supabase environment variables are missing. Add
            `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
            `NEXT_PUBLIC_SITE_URL` in Vercel, then redeploy.
          </p>
          <p className="mt-3 rounded-md bg-paper px-3 py-2 text-sm text-ink/70">
            Build: {buildLabel}
          </p>
        </section>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
            LADC Compass
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Use your email to open your cloud-based learning workspace. Do not
            enter real client identifying information or PHI.
          </p>
          <p className="mt-3 rounded-md bg-lagoon/10 px-3 py-2 text-sm font-semibold text-lagoon">
            Build: {buildLabel}
          </p>
          {authIssue ? (
            <p className="mt-3 rounded-md border border-marigold/35 bg-marigold/10 px-3 py-2 text-sm text-ink">
              {authIssue}
            </p>
          ) : null}
          <form onSubmit={signIn} className="mt-5 grid gap-3">
            <label className="text-sm font-medium text-ink">
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
                placeholder="you@example.com"
              />
            </label>
            <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
              Email sign-in link
            </button>
          </form>
          {message ? <p className="mt-3 text-sm text-ink/70">{message}</p> : null}
        </section>
      </div>
    );
  }

  return children;
}
