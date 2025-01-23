import { ProjectForm } from "@/components/ProjectDashboard/components/ProjectForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function NewProject() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <ProjectForm />
    </div>
  );
}
