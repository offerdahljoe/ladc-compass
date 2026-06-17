import { supabase } from "@/lib/supabaseClient";

const BUCKET = "ladc-documents";

export async function uploadDocumentFile(file: File): Promise<{ storagePath: string } | null> {
  if (!supabase) return null;

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
  const storagePath = `${userId}/${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.warn("Document upload failed:", error.message);
    return null;
  }

  return { storagePath };
}

export async function downloadDocumentFile(storagePath: string): Promise<Blob | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.storage.from(BUCKET).download(storagePath);
  if (error || !data) return null;
  return data;
}

export async function removeDocumentFile(storagePath: string) {
  if (!supabase) return;
  await supabase.storage.from(BUCKET).remove([storagePath]);
}

export function documentBucketName() {
  return BUCKET;
}
