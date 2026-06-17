"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isCloudConfigured, supabase } from "@/lib/supabaseClient";

type SingletonRow = {
  id: string;
  payload: unknown;
};

const CLOUD_TIMEOUT_MS = 6000;

function shouldReloadOnAuth(event: string) {
  return event === "SIGNED_IN" || event === "SIGNED_OUT";
}

/** Syncs a single JSON blob per collection via Supabase ladc_entries (singleton row). */
export function useCloudJson<T>(collection: string, legacyLocalKey: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loaded, setLoaded] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const rowIdRef = useRef<string | null>(null);
  const userEditedRef = useRef(false);
  const loadGenerationRef = useRef(0);
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const persistLocal = useCallback(
    (next: T) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(legacyLocalKey, JSON.stringify(next));
      }
    },
    [legacyLocalKey],
  );

  const readLocal = useCallback((): T => {
    if (typeof window === "undefined") return defaultValueRef.current;
    try {
      const raw = window.localStorage.getItem(legacyLocalKey);
      return raw ? (JSON.parse(raw) as T) : defaultValueRef.current;
    } catch {
      return defaultValueRef.current;
    }
  }, [legacyLocalKey]);

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
  }, [readLocal]);

  useEffect(() => {
    if (!loaded) return;
    persistLocal(value);
  }, [loaded, persistLocal, value]);

  useEffect(() => {
    if (!supabase) return;

    async function loadFromCloud(resetEdited: boolean) {
      const generation = ++loadGenerationRef.current;
      if (resetEdited) userEditedRef.current = false;

      setSyncing(true);
      try {
        const authResult = await Promise.race([
          supabase!.auth.getUser(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("auth timeout")), CLOUD_TIMEOUT_MS),
          ),
        ]);
        if (generation !== loadGenerationRef.current) return;

        const userId = authResult.data.user?.id ?? null;
        setCloudEnabled(Boolean(userId));
        if (!userId) return;

        const { data: rows, error } = await Promise.race([
          supabase!
            .from("ladc_entries")
            .select("id,payload")
            .eq("collection", collection)
            .order("created_at", { ascending: false })
            .limit(1),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("cloud timeout")), CLOUD_TIMEOUT_MS),
          ),
        ]);
        if (generation !== loadGenerationRef.current) return;

        if (error) return;

        const row = rows?.[0] as SingletonRow | undefined;
        if (row?.payload !== undefined && row.payload !== null) {
          rowIdRef.current = row.id;
          if (!userEditedRef.current) {
            setValue(row.payload as T);
          }
          return;
        }

        const local = readLocal();
        const hasLocal =
          JSON.stringify(local) !== JSON.stringify(defaultValueRef.current);
        if (hasLocal) {
          const { data: inserted } = await supabase!
            .from("ladc_entries")
            .insert({ collection, payload: local })
            .select("id")
            .single();
          if (inserted) rowIdRef.current = inserted.id;
        }
      } catch {
        /* keep local data — cloud sync is best-effort */
      } finally {
        if (generation === loadGenerationRef.current) {
          setSyncing(false);
        }
      }
    }

    void loadFromCloud(true);
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (shouldReloadOnAuth(event)) {
        void loadFromCloud(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [collection, legacyLocalKey, readLocal]);

  const saveValue = useCallback(
    async (next: T) => {
      userEditedRef.current = true;
      setValue(next);
      persistLocal(next);
      if (!supabase) return;

      try {
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
      } catch {
        /* local copy already saved */
      } finally {
        setSyncing(false);
      }
    },
    [collection, fetchRowId, persistLocal],
  );

  return {
    value,
    setValue: saveValue,
    loaded,
    cloudEnabled,
    syncing,
    isCloudConfigured,
  };
}
