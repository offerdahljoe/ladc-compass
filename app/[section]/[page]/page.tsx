import { notFound } from "next/navigation";
import ADCPracticeTest from "@/components/ADCPracticeTest";
import { WorkflowPhasePage } from "@/components/ClientJourneyComponents";
import GroupTherapyHub from "@/components/GroupTherapyHub";
import HoursTrackerPlaceholder from "@/components/HoursTrackerPlaceholder";
import KaiShinCompanionWorkspace from "@/components/KaiShinCompanionWorkspace";
import KaiShinHubWorkspace from "@/components/KaiShinHubWorkspace";
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

  if (section === "client-journey") {
    const phase = getClientJourneyPhase(pageSlug);
    if (!phase) notFound();
    return <WorkflowPhasePage phase={phase} />;
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
