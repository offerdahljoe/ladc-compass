import AIChatCoach from "@/components/AIChatCoach";
import PageHeader from "@/components/PageHeader";

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clinical Documentation Assistant"
        title="Comprehensive Assessment Coach"
        description="The default AI chat mode is built around Comprehensive Assessment work. It teaches sections, asks follow-up questions, connects details to ASAM, identifies missing information, and helps shape Procentive-ready wording."
      />
      <AIChatCoach />
    </>
  );
}
