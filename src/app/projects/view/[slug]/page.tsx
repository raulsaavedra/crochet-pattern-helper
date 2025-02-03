import ProjectSingle from "@/components/ProjectSingle/ProjectSingle";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title")
    .eq("slug", slug)
    .single();
  return {
    title: project?.title,
    description: `View ${project?.title}`,
    index: false,
    follow: false,
  };
}

async function Project({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
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
    .eq("user_id", authData.user.id)
    .single();

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectSingle project={project} />;
}

export default Project;
