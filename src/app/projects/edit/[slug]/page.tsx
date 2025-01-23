import { ProjectForm } from "@/components/ProjectDashboard/components/ProjectForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Params = Promise<{ slug: string }>;

export default async function EditProject({ params }: { params: Params }) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
  }

  const { slug } = await params;

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

  return (
    <div className="flex flex-col gap-4">
      <ProjectForm project={project} />
    </div>
  );
}
