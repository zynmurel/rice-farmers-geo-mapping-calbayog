import { supabase } from "@/utils/supabaseClient";
import { sanitizeFilename } from "./utils";

export const handleUploadSupabase = async (file: File) => {
  if (!file) throw new Error("Please select a file.");

  // Keep the extension safe
  const fileExt = file.name.split('.').pop();
  const sanitizedBase = sanitizeFilename(file.name.replace(/\.[^/.]+$/, ""));
  const filePath = `uploads/${Date.now()}-${sanitizedBase}.${fileExt}`;

  const { error } = await supabase.storage
    .from("geo-mapping")
    .upload(filePath, file, {
      contentType: file.type, // Ensure Supabase knows it’s an image
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("geo-mapping")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
