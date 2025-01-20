"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createOrUpdateProject(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const totalRows = formData.get("stitches-total-rows") as string;
  const totalRepeats = formData.get("stitches-total-repeats") as string;
  const currentRow = formData.get("stitches-current-row") as string;
  const currentRepeat = formData.get("stitches-current-repeat") as string;
  const description = formData.get("description") as string;

  const { data: authData } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("projects")
    .update({
      name,
      slug,
      description,
    })
    .eq("slug", slug)
    .eq("user_id", authData.user?.id);

  const { error: stitchesError } = await supabase
    .from("stitches")
    .upsert({
      total_rows: parseInt(totalRows),
      total_repeats: parseInt(totalRepeats),
      current_row: parseInt(currentRow),
      current_repeat: parseInt(currentRepeat),
    })
    .eq("project_slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  if (stitchesError) {
    throw new Error(stitchesError.message);
  }

  redirect("/projects");
}
