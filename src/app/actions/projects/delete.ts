"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProject(slug: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");

  return { success: true };
}
