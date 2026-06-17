/** Normalize paths for nav active-state matching (handles trailing slashes). */
export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

/** Prefix groups so parent nav items stay highlighted on related child routes. */
const navPrefixGroups: Record<string, string[]> = {
  "/resource-library/library": ["/resource-library", "/smart-contacts", "/billing-codes"],
  "/ladc-academy/academy": [
    "/ladc-academy",
    "/exam-academy",
    "/case-challenges",
    "/core-functions",
    "/ethics-compliance",
    "/internship-survival-guide",
  ],
  "/clinical-decision-navigator/navigator": ["/clinical-decision-navigator"],
  "/client-workflow/workflow": ["/client-workflow"],
  "/group-studio/studio": ["/group-studio"],
  "/documentation-lab/lab": ["/documentation-lab"],
  "/medications/overview": ["/medications"],
  "/reset-room/reset": ["/reset-room"],
  "/communications-log/log": ["/communications-log"],
};

export function isNavActive(pathname: string, target: string) {
  const current = normalizePath(pathname);
  const goal = normalizePath(target);
  if (goal === "/") return current === "/";
  if (current === goal) return true;
  const prefixes = navPrefixGroups[goal];
  if (prefixes?.some((prefix) => current === prefix || current.startsWith(`${prefix}/`))) {
    return true;
  }
  if (goal.startsWith("/core-functions/") && current.startsWith("/core-functions/")) return true;
  if (goal.startsWith("/ethics-compliance/") && current.startsWith("/ethics-compliance/")) return true;
  if (goal.startsWith("/internship-survival-guide/") && current.startsWith("/internship-survival-guide/")) {
    return true;
  }
  return false;
}

export function navLinkClass(pathname: string, target: string, baseClass: string, idleClass: string) {
  return isNavActive(pathname, target) ? `${baseClass} bg-lagoon text-white` : idleClass;
}
