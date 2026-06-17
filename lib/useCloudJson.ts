"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

type SingletonRow = {
  id: string;
  payload: unknown;
};

/** Syncs a single JSON blob per collection via Supabase ladc_entries (singleton row). */
export function useCloudJson<T>(collection: string, legacyLocalKey: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const rowIdRef = useRef<string | null>(null);

  const persistLocal = useCallback(
    (next: T) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(legacyLocalKey, JSON.stringify(next));
      }
    },
    [legacyLocalKey],
  );

  const readLocal = useCallback((): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = window.localStorage.getItem(legacyLocalKey);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [defaultValue, legacyLocalKey]);

  const fetchRowId = useCallback(async (): Promise<string | null> => {
    if (!supabase) return null;
    const { data: rows } = await supabase
      .from("ladc_entries")
      .select("id")
      .eq("collection", collection)
      .order("created_at", { ascending: false })
      .limit(1);
    const id = rows?.[0]?.id ?? null;
    rowIdRef.current = id;
    return id;
  }, [collection]);

  useEffect(() => {
    setValue(readLocal());
    setLoaded(true);
    if (!supabase) setHydrated(true);
  }, [readLocal]);

  useEffect(() => {
    if (!loaded || !hydrated) return;
    persistLocal(value);
  }, [hydrated, loaded, persistLocal, value]);

  useEffect(() => {
    if (!supabase) return;

    async function loadFromCloud() {
      setSyncing(true);
      const { data: userData } = await supabase!.auth.getUser();
      const userId = userData.user?.id ?? null;
      setCloudEnabled(Boolean(userId));
      if (!userId) {
        setHydrated(true);
        setSyncing(false);
        return;
      }

      const { data: rows, error } = await supabase!
        .from("ladc_entries")
        .select("id,payload")
        .eq("collection", collection)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        setHydrated(true);
        setSyncing(false);
        return;
      }

      const row = rows?.[0] as SingletonRow | undefined;
      if (row?.payload !== undefined && row.payload !== null) {
        rowIdRef.current = row.id;
        setValue(row.payload as T);
      } else {
        const local = readLocal();
        const hasLocal = JSON.stringify(local) !== JSON.stringify(defaultValue);
        if (hasLocal) {
          const { data: inserted } = await supabase!
            .from("ladc_entries")
            .insert({ collection, payload: local })
            .select("id")
            .single();
          if (inserted) rowIdRef.current = inserted.id;
        }
      }
      setHydrated(true);
      setSyncing(false);
    }

    loadFromCloud();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setHydrated(false);
      loadFromCloud();
    });
    return () => subscription.unsubscribe();
  }, [collection, defaultValue, readLocal]);

  const saveValue = useCallback(
    async (next: T) => {
      setValue(next);
      persistLocal(next);
      if (!supabase) return;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      setCloudEnabled(true);
      setSyncing(true);

      let id = rowIdRef.current;
      if (!id) id = await fetchRowId();

      if (id) {
        await supabase.from("ladc_entries").update({ payload: next }).eq("id", id);
      } else {
        const { data } = await supabase
          .from("ladc_entries")
          .insert({ collection, payload: next })
          .select("id")
          .single();
        if (data) rowIdRef.current = data.id;
      }
      setSyncing(false);
    },
    [collection, fetchRowId, persistLocal],
  );

  return {
    value,
    setValue: saveValue,
    loaded,
    hydrated,
    cloudEnabled,
    syncing,
    isCloudConfigured,
  };
}
