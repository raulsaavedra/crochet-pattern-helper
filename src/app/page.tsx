import ProjectDashboard from "@/components/ProjectDashboard/ProjectDashboard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select(
      `
      *,
      stitches (
        *
      )
    `
    )
    .eq("user_id", authData.user.id);

  if (projectsError) {
    return <div>Error loading projects</div>;
  }

  return <ProjectDashboard projects={projects ?? []} />;
}
