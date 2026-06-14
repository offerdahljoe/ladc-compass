"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("ladc-favorites") || "[]";
    const favorites = JSON.parse(raw) as { path: string; title: string }[];
    setFavorite(favorites.some((item) => item.path === path));
  }, [path]);

  function toggle() {
    const raw = window.localStorage.getItem("ladc-favorites") || "[]";
    const favorites = JSON.parse(raw) as { path: string; title: string }[];
    const next = favorite
      ? favorites.filter((item) => item.path !== path)
      : [{ path, title }, ...favorites];
    window.localStorage.setItem("ladc-favorites", JSON.stringify(next));
    setFavorite(!favorite);
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
