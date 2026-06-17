import type { WorkspaceContact } from "@/lib/workspaceTypes";

type ResourceRow = {
  id?: string;
  organization?: string;
  contactNames?: string;
  name?: string;
  category?: string;
  phone?: string;
  email?: string;
};

export function contactsFromResources(entries: ResourceRow[]): WorkspaceContact[] {
  return entries
    .filter((entry) => entry.id)
    .map((entry) => ({
      id: entry.id!,
      label: String(entry.contactNames || entry.name || entry.organization || "Contact").trim(),
      organization: String(entry.organization || entry.name || "").trim(),
      role: String(entry.category || "").trim(),
      phone: String(entry.phone || "").trim(),
      email: String(entry.email || "").trim(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function contactLabel(contacts: WorkspaceContact[], contactId?: string, fallback = "") {
  if (!contactId) return fallback;
  const match = contacts.find((c) => c.id === contactId);
  if (!match) return fallback;
  return match.organization ? `${match.label} (${match.organization})` : match.label;
}
