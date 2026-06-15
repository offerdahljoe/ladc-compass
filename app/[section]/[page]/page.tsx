import { notFound } from "next/navigation";
import ADCPracticeTest from "@/components/ADCPracticeTest";
import {
  ClientExplanationScriptsCompanion,
  ClinicalWordingLibraryCompanion,
  LearnClinicalThinkingCompanion,
} from "@/components/CompanionLibraries";
import HoursTrackerPlaceholder from "@/components/HoursTrackerPlaceholder";
import KaiShinSectionPage from "@/components/KaiShinSectionPage";
import PageTemplate from "@/components/PageTemplate";
import ResourceDatabase from "@/components/ResourceDatabase";
import WebsiteLibraryView from "@/components/WebsiteLibraryView";
import { getAssessmentSection } from "@/lib/assessmentSections";
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
    const assessmentSection = getAssessmentSection(pageSlug);
    if (!assessmentSection) notFound();
    return <KaiShinSectionPage section={assessmentSection} />;
  }

  if (path === "/clinical-wording-library/wording") {
    return <ClinicalWordingLibraryCompanion />;
  }

  if (path === "/client-explanation-scripts/scripts") {
    return <ClientExplanationScriptsCompanion />;
  }

  if (section === "learn-clinical-thinking") {
    return <LearnClinicalThinkingCompanion />;
  }

  if (path === "/resource-hub/community-resources" || path === "/resource-hub/contacts-database") {
    return (
      <PageTemplate page={contentPage}>
        <ResourceDatabase />
      </PageTemplate>
    );
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
