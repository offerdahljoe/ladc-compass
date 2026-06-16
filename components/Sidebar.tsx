"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation } from "@/lib/siteContent";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-screen shrink-0 overflow-y-auto border-r border-ink/10 bg-white py-5 transition-all lg:block ${
        collapsed ? "w-14 px-2" : "w-72 px-4"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        {!collapsed ? (
          <Link href="/" className="focus-ring block rounded-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
              LADC Compass
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-ink">Clinical Workspace</h1>
          </Link>
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
          <Link
            href="/"
            className="focus-ring rounded-md bg-lagoon px-2 py-2 text-center text-xs font-bold text-white"
            title="Dashboard"
          >
            D
          </Link>
        </div>
      ) : null}
      {!collapsed ? (
      <nav className="mt-6 grid gap-2">
        {mainNavigation.map((item) => {
          const active =
            pathname === item.path ||
            item.items?.some((child) => pathname === child.path);
          if (!item.items || item.items.length <= 1) {
            return (
              <Link
                key={item.title}
                href={item.path}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-semibold ${
                  active
                    ? "bg-lagoon text-white"
                    : "text-ink hover:bg-paper"
                }`}
              >
                {item.title}
              </Link>
            );
          }
          return (
            <details key={item.title} open={active || item.path === "/"}>
              <summary className="focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-paper">
                {item.title}
              </summary>
              <div className="mt-1 grid gap-1 border-l border-ink/10 pl-3">
                {item.items.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className={`focus-ring rounded-md px-3 py-2 text-sm ${
                      pathname === child.path
                        ? "bg-lagoon text-white"
                        : "text-ink/70 hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </details>
          );
        })}
      </nav>
      ) : null}
    </aside>
  );
}
