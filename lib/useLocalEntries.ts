"use client";

import { useEffect, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

type StoredEntry = {
  id?: string;
};

export function useLocalEntries<T extends StoredEntry>(key: string) {
  const [entries, setEntries] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [syncing, setSyncing] = useState(false);
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
    if (loaded) {
      window.localStorage.setItem(key, JSON.stringify(entries));
    }
  }, [entries, key, loaded]);

  useEffect(() => {
    if (!supabase) return;

    function readLocalEntries() {
      try {
        return JSON.parse(window.localStorage.getItem(key) || "[]") as T[];
      } catch {
        return [];
      }
    }

    async function loadCloudEntries() {
      setSyncing(true);
      try {
        const { data: userData } = await supabase!.auth.getUser();
        const currentUserId = userData.user?.id ?? null;
        setUserId(currentUserId);
        setCloudEnabled(Boolean(currentUserId));

        if (!currentUserId) return;

        const { data: rows, error } = await supabase!
          .from("ladc_entries")
          .select("id,payload,created_at")
          .eq("collection", key)
          .order("created_at", { ascending: false });

        if (!error && rows) {
          if (rows.length === 0) {
            const localEntries = readLocalEntries();
            if (localEntries.length > 0) {
              const { data: inserted } = await supabase!
                .from("ladc_entries")
                .insert(
                  localEntries.map(({ id: _id, ...payload }) => ({
                    collection: key,
                    payload,
                  })),
                )
                .select("id,payload,created_at")
                .order("created_at", { ascending: false });

              if (inserted) {
                setEntries(
                  inserted.map((row) => ({
                    ...(row.payload as T),
                    id: row.id,
                  })) as T[],
                );
                return;
              }
            }
          }

          setEntries(
            rows.map((row) => ({
              ...(row.payload as T),
              id: row.id,
            })) as T[],
          );
        }
      } catch {
        /* keep local entries */
      } finally {
        setSyncing(false);
      }
    }

    loadCloudEntries();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        loadCloudEntries();
      }
    });

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

  async function updateEntry(id: string | undefined, entry: T) {
    if (!id) return;
    const { id: _id, ...payload } = entry;
    if (supabase && userId) {
      await supabase.from("ladc_entries").update({ payload }).eq("id", id);
    }
    setEntries((current) =>
      current.map((item) => (item.id === id ? { ...entry, id } : item)),
    );
  }

  async function clearEntries() {
    if (supabase && userId) {
      await supabase.from("ladc_entries").delete().eq("collection", key);
    }
    setEntries([]);
  }

  return {
    entries,
    addEntry,
    updateEntry,
    removeEntry,
    clearEntries,
    loaded,
    cloudEnabled,
    syncing,
    isCloudConfigured,
  };
}
