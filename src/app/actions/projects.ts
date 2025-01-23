"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const generateSlug = (name: string) => {
  const randomString = crypto.randomUUID().slice(0, 8);
  return `${name.trim().replace(/\s+/g, "-")}-${randomString}`.toLowerCase();
};

export async function createOrUpdateProject(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || generateSlug(name);
  const totalRows = formData.get("stitches-total-rows") as string;
  const totalRepeats = formData.get("stitches-total-repeats") as string;
  const currentRow = formData.get("stitches-current-row") as string;
  const currentRepeat = formData.get("stitches-current-repeat") as string;
  const description = formData.get("description") as string;

  const { data: authData } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("projects")
    .upsert({
      name,
      slug,
      description,
      user_id: authData.user?.id,
    })
    .eq("slug", slug)
    .eq("user_id", authData.user?.id);

  const { error: stitchesError } = await supabase.from("stitches").upsert({
    project_slug: slug,
    total_rows: parseInt(totalRows),
    total_repeats: parseInt(totalRepeats),
    current_row: parseInt(currentRow),
    current_repeat: parseInt(currentRepeat),
  });

  if (error) {
    throw new Error(error.message);
  }

  if (stitchesError) {
    throw new Error(stitchesError.message);
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/view/${slug}`);
  redirect("/");
}

export async function deleteProject(slug: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");

  return { success: true };
}

export async function increaseCount(
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
