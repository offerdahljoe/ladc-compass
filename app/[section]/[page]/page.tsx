import { notFound } from "next/navigation";
import ADCPracticeTest from "@/components/ADCPracticeTest";
import ClinicalDecisionNavigator from "@/components/ClinicalDecisionNavigator";
import { WorkflowPhasePage } from "@/components/ClientJourneyComponents";
import DashboardHome from "@/components/DashboardHome";
import GroupTherapyHub from "@/components/GroupTherapyHub";
import HoursTrackerPlaceholder from "@/components/HoursTrackerPlaceholder";
import KaiShinCompanionWorkspace from "@/components/KaiShinCompanionWorkspace";
import KaiShinHubWorkspace from "@/components/KaiShinHubWorkspace";
import {
  BillingCodes,
  DocumentationLab,
  GroupStudio,
  LearningWorkspace,
  MedicationReference,
  ProcentiveCompanion,
  ResourceLibrary,
} from "@/components/OperatingSystemWorkspaces";
import PageTemplate from "@/components/PageTemplate";
import ResourceDatabase from "@/components/ResourceDatabase";
import WebsiteLibraryView from "@/components/WebsiteLibraryView";
import { getClientJourneyPhase } from "@/lib/clientJourneyPhases";
import { contentPages, getPageByPath } from "@/lib/siteContent";

export function generateStaticParams() {
  return contentPages.map((page) => {
    const [, section, pageSlug] = page.path.split("/");
    return { section, page: pageSlug };
  });
}

export default async function DynamicContentPage({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const { section, page: pageSlug } = await params;
  const path = `/${section}/${pageSlug}`;
  const contentPage = getPageByPath(path);
  if (!contentPage) notFound();

  if (section === "kai-shin-procentive") {
    if (pageSlug === "companion") {
      return <KaiShinCompanionWorkspace />;
    }
    notFound();
  }

  if (path === "/clinical-decision-navigator/navigator") {
    return <ClinicalDecisionNavigator />;
  }

  if (path === "/calendar-tasks/planner") {
    return <DashboardHome />;
  }

  if (section === "client-journey") {
    const phase = getClientJourneyPhase(pageSlug);
    if (!phase) notFound();
    return <WorkflowPhasePage phase={phase} />;
  }

  if (path === "/group-studio/studio") {
    return <GroupStudio />;
  }

  if (path === "/documentation-lab/lab") {
    return <DocumentationLab />;
  }

  if (path === "/procentive-companion/companion") {
    return <ProcentiveCompanion />;
  }

  if (path === "/resource-library/library") {
    return <ResourceLibrary />;
  }

  if (path === "/smart-contacts/contacts") {
    return <ResourceDatabase />;
  }

  if (path === "/billing-codes/reference") {
    return <BillingCodes />;
  }

  if (section === "medications") {
    return <MedicationReference path={path} />;
  }

  if (path === "/ladc-academy/academy") {
    return <LearningWorkspace title="LADC Academy" />;
  }

  if (path === "/exam-academy/practice") {
    return <LearningWorkspace title="Exam Academy" />;
  }

  if (path === "/case-challenges/challenges") {
    return <LearningWorkspace title="Case Challenges" />;
  }

  if (path === "/clinical-wisdom/wisdom") {
    return <LearningWorkspace title="Clinical Wisdom" />;
  }

  if (path === "/reset-room/reset") {
    return <LearningWorkspace title="Reset Room" />;
  }

  if (path === "/group-therapy-hub/planner") {
    return <GroupTherapyHub />;
  }

  if (path === "/kai-shin/hub") {
    return <KaiShinHubWorkspace />;
  }

  if (path === "/resource-hub/resources") {
    return <ResourceDatabase />;
  }

  if (path === "/internship-survival-guide/hours-tracker") {
    return (
      <PageTemplate page={contentPage}>
        <section className="mt-5">
          <HoursTrackerPlaceholder />
        </section>
      </PageTemplate>
    );
  }

  if (path === "/internship-survival-guide/practice-questions") {
    return (
      <PageTemplate page={contentPage}>
        <ADCPracticeTest />
      </PageTemplate>
    );
  }

  if (section === "website-library") {
    return (
      <PageTemplate page={contentPage}>
        <WebsiteLibraryView />
      </PageTemplate>
    );
  }

  return <PageTemplate page={contentPage} />;
}
