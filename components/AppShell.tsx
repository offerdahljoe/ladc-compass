"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";
import PrivacyBanner from "@/components/PrivacyBanner";
import Sidebar from "@/components/Sidebar";
import TopSearch from "@/components/TopSearch";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

function ShellCloudSignIn() {
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
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !email.trim() || !password) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    setMessage(error ? error.message : "Signed in. Cloud sync is on.");
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
    setUserEmail(null);
    setMessage("Signed out.");
  }

  if (!isCloudConfigured) {
    return (
      <div className="rounded-lg border border-clay/25 bg-white p-3 text-sm text-ink/70 shadow-soft">
        <strong className="text-ink">Cloud sync off.</strong> Add Supabase keys in
        Vercel to turn on invite-only sign-in.
      </div>
    );
  }

  if (userEmail) {
    return (
      <div className="rounded-lg border border-lagoon/20 bg-white p-3 text-sm text-ink/75 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-lagoon">Cloud sync on</strong>
          <span>{userEmail}</span>
          <button
            type="button"
            onClick={signOut}
            disabled={busy}
            className="focus-ring rounded-md border border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink hover:bg-paper"
          >
            Sign out
          </button>
        </div>
        {message ? <p className="mt-1 text-xs text-ink/60">{message}</p> : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={signIn}
      className="rounded-lg border border-ink/10 bg-white p-3 text-sm text-ink/75 shadow-soft"
    >
      <p className="font-semibold text-ink">Invite-only sign in</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="focus-ring min-w-0 rounded-md border border-ink/15 px-3 py-2 text-sm"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="focus-ring min-w-0 rounded-md border border-ink/15 px-3 py-2 text-sm"
          placeholder="Password"
        />
        <button
          disabled={busy}
          className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          Sign in
        </button>
      </div>
      <p className="mt-1 text-xs text-ink/55">No public account creation.</p>
      {message ? <p className="mt-1 text-xs text-ink/60">{message}</p> : null}
    </form>
  );
}

function ShellUtilityRow() {
  return (
    <section className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form
        action="https://www.google.com/search"
        method="get"
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-ink/10 bg-white p-3 shadow-soft"
      >
        <label className="block text-sm font-semibold text-ink">
          Google search
          <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              name="q"
              className="focus-ring min-w-0 rounded-md border border-ink/15 px-3 py-2 text-sm"
              placeholder="Search the web..."
            />
            <button className="focus-ring rounded-md bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-ink">
              Google
            </button>
          </div>
        </label>
      </form>
      <ShellCloudSignIn />
    </section>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopSearch />
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <MobileNav />
          <div className="mb-4 rounded-lg border border-lagoon/20 bg-white px-4 py-3 text-sm text-ink/70 shadow-soft">
            <strong className="text-ink">LADC Compass update:</strong> Medications,
            Google search, and detailed 12 Core Functions content are included
            in this build.
          </div>
          <ShellUtilityRow />
          <PrivacyBanner />
          <main className="mt-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
