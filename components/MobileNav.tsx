"use client";

import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import { isNavActive, navLinkClass, normalizePath } from "@/lib/navUtils";
import { mainNavigation, type NavItem } from "@/lib/siteContent";

function linkClasses(pathname: string, target: string) {
  const base = "focus-ring rounded-md px-3 py-2 text-sm font-semibold";
  return navLinkClass(pathname, target, base, `${base} text-ink hover:bg-paper`);
}

function subLinkClasses(pathname: string, target: string) {
  const base = "focus-ring rounded-md px-3 py-2 text-sm font-medium";
  return navLinkClass(pathname, target, base, `${base} text-ink/70 hover:bg-paper hover:text-ink`);
}

function MobileNavLinkTree({ item, pathname }: { item: NavItem; pathname: string }) {
  if (!item.items?.length) {
    return (
      <NavLink href={item.path} className={subLinkClasses(pathname, item.path)}>
        {item.title}
      </NavLink>
    );
  }

  return (
    <details open={isNavActive(pathname, item.path)}>
      <summary
        className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold ${
          isNavActive(pathname, item.path) ? "bg-lagoon text-white" : "text-ink/80"
        }`}
      >
        {item.title}
      </summary>
      <div className="grid gap-1 border-l border-ink/10 pl-3">
        <NavLink href={item.path} className={subLinkClasses(pathname, item.path)}>
          Open {item.title}
        </NavLink>
        {item.items.map((child) => (
          <MobileNavLinkTree key={child.path} item={child} pathname={pathname} />
        ))}
      </div>
    </details>
  );
}

export default function MobileNav() {
  const pathname = normalizePath(usePathname() ?? "/");

  return (
    <div className="mb-4 rounded-lg border border-ink/10 bg-white p-4 shadow-soft lg:hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">LADC Compass</p>
      <details className="mt-2">
        <summary className="focus-ring cursor-pointer rounded-md bg-paper px-3 py-2 text-sm font-semibold text-ink">
          Open navigation
        </summary>
        <nav className="mt-3 grid gap-2">
          {mainNavigation.map((section) =>
            !section.items || section.items.length <= 1 ? (
              <NavLink key={section.title} href={section.path} className={linkClasses(pathname, section.path)}>
                {section.title}
              </NavLink>
            ) : (
              <details key={section.title} open={isNavActive(pathname, section.path)}>
                <summary
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold ${
                    isNavActive(pathname, section.path) ? "bg-lagoon text-white" : "text-ink"
                  }`}
                >
                  {section.title}
                </summary>
                <div className="grid gap-1 pl-3">
                  <NavLink href={section.path} className={subLinkClasses(pathname, section.path)}>
                    Open {section.title}
                  </NavLink>
                  {section.items?.map((item) => (
                    <MobileNavLinkTree key={item.path} item={item} pathname={pathname} />
                  ))}
                </div>
              </details>
            ),
          )}
        </nav>
      </details>
    </div>
  );
}
