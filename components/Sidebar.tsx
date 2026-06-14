"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/siteContent";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-ink/10 bg-white px-4 py-5 lg:block">
      <Link href="/" className="focus-ring block rounded-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-lagoon">
          LADC Compass
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">Clinical Workspace</h1>
      </Link>
      <nav className="mt-6 grid gap-2">
        {mainNavigation.map((item) => {
          const active =
            pathname === item.path ||
            item.items?.some((child) => pathname === child.path);
          return (
            <details key={item.title} open={active || item.path === "/"}>
              <summary className="focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-paper">
                {item.title}
              </summary>
              {item.items ? (
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
              ) : (
                <Link
                  href={item.path}
                  className={`focus-ring mt-1 block rounded-md px-3 py-2 text-sm ${
                    pathname === item.path
                      ? "bg-lagoon text-white"
                      : "text-ink/70 hover:bg-paper hover:text-ink"
                  }`}
                >
                  Open
                </Link>
              )}
            </details>
          );
        })}
      </nav>
    </aside>
  );
}
