import { notFound } from "next/navigation";
import ADCPracticeTest from "@/components/ADCPracticeTest";
import ClinicalDecisionNavigator from "@/components/ClinicalDecisionNavigator";
import ClientWorkflow from "@/components/ClientWorkflow";
import DashboardHome from "@/components/DashboardHome";
import GroupTherapyHub from "@/components/GroupTherapyHub";
import KaiShinCompanionWorkspace from "@/components/KaiShinCompanionWorkspace";
import KaiShinHubWorkspace from "@/components/KaiShinHubWorkspace";
import MedicationReferencePage from "@/components/MedicationReferencePage";
import {
  BillingCodes,
  DocumentationLab,
  GroupStudio,
  LearningWorkspace,
  LicensureJourneyWorkspace,
  ProcentiveCompanion,
  ResourceLibrary,
} from "@/components/OperatingSystemWorkspaces";
import PageTemplate from "@/components/PageTemplate";
import ResourceDatabase from "@/components/ResourceDatabase";
import WebsiteLibraryView from "@/components/WebsiteLibraryView";
import { contentPages, getPageByPath, medicationStaticParams } from "@/lib/siteContent";

export function generateStaticParams() {
  const fromNav = contentPages.map((page) => {
    const [, section, pageSlug] = page.path.split("/");
    return { section, page: pageSlug };
  });
  return [
    ...fromNav,
    { section: "calendar-tasks", page: "planner" },
    { section: "client-workflow", page: "workflow" },
    { section: "group-therapy-hub", page: "planner" },
    { section: "resource-hub", page: "resources" },
    ...medicationStaticParams.filter(
      (item) => !fromNav.some((nav) => nav.section === item.section && nav.page === item.page),
    ),
  ];
}

export default async function DynamicContentPage({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const { section, page: pageSlug } = await params;
  const path = `/${section}/${pageSlug}`;

  if (path === "/calendar-tasks/planner") {
    return <DashboardHome />;
  }

  if (path === "/client-workflow/workflow") {
    return <ClientWorkflow />;
  }

  if (path === "/clinical-decision-navigator/navigator") {
    return <ClinicalDecisionNavigator />;
  }

  if (path === "/group-therapy-hub/planner") {
    return <GroupTherapyHub />;
  }

  if (path === "/resource-hub/resources") {
    return <ResourceDatabase />;
  }

  const contentPage = getPageByPath(path);
  if (!contentPage) notFound();

  if (section === "kai-shin-procentive") {
    if (pageSlug === "companion") {
      return <KaiShinCompanionWorkspace />;
    }
    notFound();
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
    const medId = pageSlug === "overview" ? undefined : pageSlug;
    return <MedicationReferencePage medId={medId} />;
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

  if (path === "/internship-survival-guide/hours-tracker") {
    return <LicensureJourneyWorkspace />;
  }

  if (path === "/kai-shin/hub") {
    return <KaiShinHubWorkspace />;
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
