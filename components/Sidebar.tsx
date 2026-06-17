"use client";

import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation } from "@/lib/siteContent";

function hasActivePath(item: (typeof mainNavigation)[number], pathname: string): boolean {
  return pathname === item.path || Boolean(item.items?.some((child) => hasActivePath(child, pathname)));
}

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
          <NavLink href="/" className="focus-ring block rounded-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
              LADC Compass
            </p>
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
            className="focus-ring rounded-md bg-lagoon px-2 py-2 text-center text-xs font-bold text-white"
            title="Dashboard"
          >
            D
          </NavLink>
        </div>
      ) : null}
      {!collapsed ? (
      <nav className="mt-6 grid gap-2">
        {mainNavigation.map((item) => {
          const active = hasActivePath(item, pathname);
          if (!item.items || item.items.length <= 1) {
            return (
              <NavLink
                key={item.title}
                href={item.path}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-semibold ${
                  active
                    ? "bg-lagoon text-white"
                    : "text-ink hover:bg-paper"
                }`}
              >
                {item.title}
              </NavLink>
            );
          }
          return (
            <details key={item.title} open={active || item.path === "/"}>
              <summary className="focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-paper">
                {item.title}
              </summary>
              <div className="mt-1 grid gap-1 border-l border-ink/10 pl-3">
                {item.items.map((child) =>
                  child.items?.length ? (
                    <details key={child.path} open={hasActivePath(child, pathname)}>
                      <summary className="focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-paper">
                        {child.title}
                      </summary>
                      <div className="ml-2 mt-1 grid gap-1 border-l border-ink/10 pl-2">
                        <NavLink
                          href={child.path}
                          className={`focus-ring rounded-md px-3 py-2 text-sm ${
                            pathname === child.path
                              ? "bg-lagoon text-white"
                              : "text-ink/70 hover:bg-paper hover:text-ink"
                          }`}
                        >
                          Open {child.title}
                        </NavLink>
                        {child.items.map((grandchild) => (
                          <NavLink
                            key={grandchild.path}
                            href={grandchild.path}
                            className={`focus-ring rounded-md px-3 py-2 text-sm ${
                              pathname === grandchild.path
                                ? "bg-lagoon text-white"
                                : "text-ink/70 hover:bg-paper hover:text-ink"
                            }`}
                          >
                            {grandchild.title}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      key={child.path}
                      href={child.path}
                      className={`focus-ring rounded-md px-3 py-2 text-sm ${
                        pathname === child.path
                          ? "bg-lagoon text-white"
                          : "text-ink/70 hover:bg-paper hover:text-ink"
                      }`}
                    >
                      {child.title}
                    </NavLink>
                  ),
                )}
              </div>
            </details>
          );
        })}
      </nav>
      ) : null}
    </aside>
  );
}
