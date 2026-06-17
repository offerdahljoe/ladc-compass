"use client";

import NavLink from "@/components/NavLink";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { contentPages } from "@/lib/siteContent";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

function CloudSyncStatus() {
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
      redirectTo: `${window.location.origin}/set-password`,
    });
    setBusy(false);
    setMessage(
      error
        ? error.message
        : "Password setup email sent. Open the email link to choose your password.",
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
            Set/reset password
          </button>
        </div>
      </label>
      <p className="mt-1 text-ink/55">Invite-only. No public account creation.</p>
      {message ? <p className="mt-1 text-ink/60">{message}</p> : null}
    </form>
  );
}

export default function TopSearch() {
  const [query, setQuery] = useState("");
  const [googleQuery, setGoogleQuery] = useState("");
  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return contentPages
      .filter((page) =>
        [page.title, page.section, page.summary, ...page.tags]
          .join(" ")
          .toLowerCase()
          .includes(clean),
      )
      .slice(0, 6);
  }, [query]);

  function searchGoogle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = googleQuery.trim();
    if (!clean) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(clean)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto mb-2 flex max-w-7xl flex-wrap items-center gap-2">
        <NavLink
          href="/#workspace-uploads"
          className="focus-ring rounded-md bg-lagoon px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink"
        >
          Upload Docs
        </NavLink>
        <div className="flex-1 rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-xs font-medium text-ink">
          <strong>No PHI:</strong> Do not enter real client names, dates of birth,
          addresses, phone numbers, case numbers, chart screenshots, or other
          identifying information.
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.6fr)_minmax(18rem,0.55fr)] xl:items-end">
        <label className="block text-sm font-medium text-ink">
          LADC Compass search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
            placeholder="Search ASAM, progress notes, confidentiality, resources..."
          />
        </label>
        <form onSubmit={searchGoogle} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block text-sm font-medium text-ink">
            Google search
            <input
              value={googleQuery}
              onChange={(event) => setGoogleQuery(event.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm"
              placeholder="Search the web..."
            />
          </label>
          <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
            Google
          </button>
        </form>
        <CloudSyncStatus />
      </div>
      {results.length > 0 ? (
        <div className="absolute left-4 right-4 top-24 mx-auto grid max-w-5xl gap-1 rounded-lg border border-ink/10 bg-white p-2 shadow-soft lg:top-20">
          {results.map((page) => (
            <NavLink
              key={page.path}
              href={page.path}
              onClick={() => setQuery("")}
              className="focus-ring rounded-md px-3 py-2 text-sm text-ink hover:bg-paper"
            >
              <strong>{page.title}</strong>
              <span className="ml-2 text-ink/55">{page.section}</span>
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
