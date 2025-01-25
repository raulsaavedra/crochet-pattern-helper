"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function changeCount(
  slug: string,
  currentRow: number,
  currentRepeat: number
) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    throw new Error("User not found");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("user_id", authData.user.id)
    .single();

  if (!project) {
    throw new Error("Project not found");
  }

  const { data: stitches } = await supabase
    .from("stitches")
    .select("*")
    .eq("project_slug", slug);

  if (!stitches) {
    throw new Error("Stitches not found");
  }

  const { error } = await supabase
    .from("stitches")
    .update({ current_row: currentRow, current_repeat: currentRepeat })
    .eq("project_slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/projects/view/${slug}`);

  return { success: true };
}
