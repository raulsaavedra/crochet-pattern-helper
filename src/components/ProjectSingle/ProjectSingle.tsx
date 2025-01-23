import Button from "@/components/Button";
import { TProject } from "@/components/ProjectDashboard/ProjectDashboard";
import StitchCounter from "@/components/StitchCounter/StitchCounter";
import { ArrowLeft } from "lucide-react";

interface ProjectSingleProps {
  project: TProject;
}

function ProjectSingle({ project }: ProjectSingleProps) {
  return (
    <div>
      <div className="mb-10">
        <Button className="max-w-fit" variant="ghost" as="link" href={`/`}>
          <ArrowLeft size={32} />
          <span>Back to projects</span>
        </Button>
      </div>
      <div className="border border-primary-light px-8 py-8 rounded-lg">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
        <StitchCounter project={project} />
      </div>
    </div>
  );
}

export default ProjectSingle;
