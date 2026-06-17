"use client";

import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isNavActive, navLinkClass, normalizePath } from "@/lib/navUtils";
import { mainNavigation, type NavItem } from "@/lib/siteContent";

function hasActivePath(item: NavItem, pathname: string): boolean {
  if (isNavActive(pathname, item.path)) return true;
  return Boolean(item.items?.some((child) => hasActivePath(child, pathname)));
}

function linkClasses(pathname: string, target: string, size: "main" | "sub" = "sub") {
  const base = "focus-ring rounded-md px-3 py-2 text-sm font-semibold";
  const idle =
    size === "main"
      ? "text-ink hover:bg-paper"
      : "font-medium text-ink/70 hover:bg-paper hover:text-ink";
  return navLinkClass(pathname, target, base, `${base} ${idle}`);
}

function NavTree({
  item,
  pathname,
  depth = 0,
}: {
  item: NavItem;
  pathname: string;
  depth?: number;
}) {
  if (!item.items?.length) {
    return (
      <NavLink href={item.path} className={linkClasses(pathname, item.path, depth === 0 ? "main" : "sub")}>
        {item.title}
      </NavLink>
    );
  }

  const open = hasActivePath(item, pathname);
  return (
    <details open={open}>
      <summary
        className={`focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-semibold ${
          isNavActive(pathname, item.path) ? "bg-lagoon text-white" : "text-ink hover:bg-paper"
        }`}
      >
        {item.title}
      </summary>
      <div className="mt-1 grid gap-1 border-l border-ink/10 pl-3">
        {item.path !== "/" ? (
          <NavLink href={item.path} className={linkClasses(pathname, item.path, "sub")}>
            Open {item.title}
          </NavLink>
        ) : null}
        {item.items.map((child) => (
          <NavTree key={child.path} item={child} pathname={pathname} depth={depth + 1} />
        ))}
      </div>
    </details>
  );
}

export default function Sidebar() {
  const pathname = normalizePath(usePathname() ?? "/");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-screen shrink-0 overflow-y-auto border-r border-ink/10 bg-white py-5 transition-all lg:block ${
        collapsed ? "w-14 px-2" : "w-72 px-4"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        {!collapsed ? (
          <NavLink href="/" className="focus-ring block rounded-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">LADC Compass</p>
            <h1 className="mt-1 text-2xl font-semibold text-ink">Clinical Workspace</h1>
          </NavLink>
        ) : null}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          className="focus-ring rounded-md border border-ink/10 bg-paper px-2 py-1 text-lg font-bold text-ink hover:bg-lagoon hover:text-white"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>
      {collapsed ? (
        <div className="mt-6 grid gap-2">
          <NavLink
            href="/"
            className={`focus-ring rounded-md px-2 py-2 text-center text-xs font-bold ${
              isNavActive(pathname, "/") ? "bg-lagoon text-white" : "bg-paper text-ink"
            }`}
            title="Workspace"
          >
            D
          </NavLink>
        </div>
      ) : null}
      {!collapsed ? (
        <nav className="mt-6 grid gap-2">
          {mainNavigation.map((item) =>
            !item.items || item.items.length <= 1 ? (
              <NavLink key={item.title} href={item.path} className={linkClasses(pathname, item.path, "main")}>
                {item.title}
              </NavLink>
            ) : (
              <NavTree key={item.title} item={item} pathname={pathname} />
            ),
          )}
        </nav>
      ) : null}
    </aside>
  );
}
