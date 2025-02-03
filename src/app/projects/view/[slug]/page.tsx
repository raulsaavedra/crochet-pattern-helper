import ProjectSingle from "@/components/ProjectSingle/ProjectSingle";
import { DEFAULT_METADATA } from "@/lib/metadata";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";

type Params = Promise<{ slug: string }>;

const getAuthData = cache(async () => {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return null;
  }

  return authData.user;
});

const getProjectSingle = cache(async (slug: string) => {
  const supabase = await createClient();
  const authData = await getAuthData();
  if (!authData) {
    return null;
  }

  const { data: project } = await supabase
    .from("projects")
    .select(
      `
      *,
      stitches(
        totalRows:total_rows,
        totalRepeats:total_repeats,
        currentRow:current_row,
        currentRepeat:current_repeat
      )
    `
    )
    .eq("slug", slug)
    .eq("user_id", authData.id)
    .single();

  return project;
});

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectSingle(slug);

  if (!project) {
    return DEFAULT_METADATA;
  }

  return {
    title: project?.name,
    description: `View ${project?.name}`,
    index: false,
    follow: false,
  };
}

async function Project({ params }: { params: Params }) {
  const { slug } = await params;

  const authData = await getAuthData();
  if (!authData) {
    redirect("/login");
  }

  const project = await getProjectSingle(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectSingle project={project} />;
}

export default Project;
