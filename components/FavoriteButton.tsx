"use client";

import { useEffect, useState } from "react";
import { useLocalEntries } from "@/lib/useLocalEntries";

type Favorite = { id?: string; path: string; title: string };

export default function FavoriteButton({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const { entries, addEntry, removeEntry, loaded } = useLocalEntries<Favorite>("ladc-favorites");
  const favorite = entries.some((item) => item.path === path);

  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;
    if (entries.length) return;
    const legacy = window.localStorage.getItem("ladc-favorites");
    if (!legacy) return;
    try {
      const parsed = JSON.parse(legacy) as { path: string; title: string }[];
      if (!parsed.length) return;
      parsed.forEach((item) => void addEntry(item));
      window.localStorage.removeItem("ladc-favorites");
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-time legacy migration
  }, [loaded]);

  function toggle() {
    const existing = entries.find((item) => item.path === path);
    if (existing?.id) {
      void removeEntry(existing.id);
    } else {
      void addEntry({ path, title });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-lagoon"
    >
      {favorite ? "Saved Favorite" : "Add Favorite"}
    </button>
  );
}
