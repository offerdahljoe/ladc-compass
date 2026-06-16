"use client";

import Link from "next/link";
import { mainNavigation, NavItem } from "@/lib/siteContent";

function MobileLinkTree({ item }: { item: NavItem }) {
  if (!item.items?.length) {
    return (
      <Link
        href={item.path}
        className="rounded-md px-3 py-2 text-sm text-ink/70 hover:bg-paper"
      >
        {item.title}
      </Link>
    );
  }

  return (
    <details>
      <summary className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink/80">
        {item.title}
      </summary>
      <div className="grid gap-1 border-l border-ink/10 pl-3">
        <Link
          href={item.path}
          className="rounded-md px-3 py-2 text-sm text-ink/70 hover:bg-paper"
        >
          Open {item.title}
        </Link>
        {item.items.map((child) => (
          <MobileLinkTree key={child.path} item={child} />
        ))}
      </div>
    </details>
  );
}

export default function MobileNav() {
  return (
    <div className="mb-4 rounded-lg border border-ink/10 bg-white p-4 shadow-soft lg:hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
        LADC Compass
      </p>
      <details className="mt-2">
        <summary className="focus-ring cursor-pointer rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink">
          Open navigation
        </summary>
        <nav className="mt-3 grid gap-2">
          {mainNavigation.map((section) =>
            !section.items || section.items.length <= 1 ? (
              <Link
                key={section.title}
                href={section.path}
                className="rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-paper"
              >
                {section.title}
              </Link>
            ) : (
              <details key={section.title}>
                <summary className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-ink">
                  {section.title}
                </summary>
                <div className="grid gap-1 pl-3">
                  <Link
                    href={section.path}
                    className="rounded-md px-3 py-2 text-sm text-ink/70 hover:bg-paper"
                  >
                    Open {section.title}
                  </Link>
                  {section.items?.map((item) => <MobileLinkTree key={item.path} item={item} />)}
                </div>
              </details>
            ),
          )}
        </nav>
      </details>
    </div>
  );
}
