"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type StoredEntry = {
  id?: string;
};

export function useLocalEntries<T extends StoredEntry>(key: string) {
  const [entries, setEntries] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        setEntries(JSON.parse(raw) as T[]);
      } catch {
        setEntries([]);
      }
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (loaded && !cloudEnabled) {
      window.localStorage.setItem(key, JSON.stringify(entries));
    }
  }, [cloudEnabled, entries, key, loaded]);

  useEffect(() => {
    if (!supabase) return;

    async function loadCloudEntries() {
      const { data } = await supabase!.auth.getUser();
      const currentUserId = data.user?.id ?? null;
      setUserId(currentUserId);
      setCloudEnabled(Boolean(currentUserId));
      if (!currentUserId) return;

      const { data: rows, error } = await supabase!
        .from("ladc_entries")
        .select("id,payload,created_at")
        .eq("collection", key)
        .order("created_at", { ascending: false });

      if (!error && rows) {
        setEntries(
          rows.map((row) => ({
            ...(row.payload as T),
            id: row.id,
          })) as T[],
        );
      }
    }

    loadCloudEntries();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => loadCloudEntries());

    return () => subscription.unsubscribe();
  }, [key]);

  async function addEntry(entry: Omit<T, "id">) {
    if (supabase && userId) {
      const { data, error } = await supabase
        .from("ladc_entries")
        .insert({ collection: key, payload: entry })
        .select("id,payload")
        .single();

      if (!error && data) {
        setEntries((current) => [
          { ...(data.payload as T), id: data.id } as T,
          ...current,
        ]);
        return;
      }
    }

    setEntries((current) => [{ ...entry, id: crypto.randomUUID() } as T, ...current]);
  }

  async function removeEntry(id?: string) {
    if (supabase && userId && id) {
      await supabase.from("ladc_entries").delete().eq("id", id);
    }
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  async function clearEntries() {
    if (supabase && userId) {
      await supabase.from("ladc_entries").delete().eq("collection", key);
    }
    setEntries([]);
  }

  return { entries, addEntry, removeEntry, clearEntries, cloudEnabled };
}
