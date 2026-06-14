import { notFound } from "next/navigation";
import HoursTrackerPlaceholder from "@/components/HoursTrackerPlaceholder";
import PageTemplate from "@/components/PageTemplate";
import ResourceDatabase from "@/components/ResourceDatabase";
import StuckHelper from "@/components/StuckHelper";
import WebsiteLibraryView from "@/components/WebsiteLibraryView";
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

  if (path === "/resource-hub/community-resources" || path === "/resource-hub/contacts-database") {
    return (
      <PageTemplate page={contentPage}>
        <ResourceDatabase />
      </PageTemplate>
    );
  }

  if (path === "/internship-licensure/hours-tracker") {
    return (
      <PageTemplate page={contentPage}>
        <section className="mt-5">
          <HoursTrackerPlaceholder />
        </section>
      </PageTemplate>
    );
  }

  if (path === "/helper/im-stuck") {
    return (
      <PageTemplate page={contentPage}>
        <StuckHelper />
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
