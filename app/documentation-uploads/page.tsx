import DocumentationUploads from "@/components/DocumentationUploads";
import PageHeader from "@/components/PageHeader";

export default function DocumentationUploadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation Uploads"
        title="Save and analyze documentation examples"
        description="Upload de-identified templates, assignment drafts, rubrics, or documentation examples. The analysis looks for content areas that suggest what LADC Compass should add, improve, or emphasize."
      />
      <DocumentationUploads />
    </>
  );
}
