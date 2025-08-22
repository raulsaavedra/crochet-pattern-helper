"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProject(slug: string) {
  const supabase = await createClient();

  // Ensure only the owner can delete their project
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("slug", slug)
    .eq("user_id", authData.user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");

  return { success: true };
}
