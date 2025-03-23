"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const generateSlug = (name: string) => {
  const randomString = crypto.randomUUID().slice(0, 8);
  return `${name.trim().replace(/\s+/g, "-")}-${randomString}`.toLowerCase();
};

export interface ProjectData {
  name: string;
  slug?: string;
  description?: string;
  stitches: {
    totalRows: string;
    totalRepeats: string;
    currentRow: string;
    currentRepeat: string;
  };
}

export async function createOrUpdateProject(data: ProjectData) {
  const { name, description, stitches } = data;
  const { totalRows, totalRepeats, currentRow, currentRepeat } = stitches;
  const supabase = await createClient();

  let slug = data.slug;
  if (!slug) {
    slug = generateSlug(name);
  }

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

  revalidatePath("/");
  revalidatePath(`/projects/view/${slug}`);
  redirect("/");
}
