import ClientWorkflow from "@/components/ClientWorkflow";
import { clientJourneyNavItems } from "@/lib/clientJourneyPhases";

export function generateStaticParams() {
  return clientJourneyNavItems.map((item) => {
    const slug = item.path.split("/").pop() ?? "dashboard";
    return { page: slug };
  });
}

export default function LegacyClientJourneyPage() {
  return <ClientWorkflow />;
}
