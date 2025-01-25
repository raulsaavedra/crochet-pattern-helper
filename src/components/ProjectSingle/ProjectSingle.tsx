import { TProject } from "@/components/ProjectDashboard/ProjectDashboard";
import StitchCounter from "@/components/StitchCounter/StitchCounter";
import ProjectLayout from "./ProjectLayout";
import { StitchProvider } from "../StitchCounter/StitchContext";

interface ProjectSingleProps {
  project: TProject;
}

function ProjectSingle({ project }: ProjectSingleProps) {
  return (
    <StitchProvider project={project}>
      <ProjectLayout project={project}>
        <StitchCounter />
      </ProjectLayout>
    </StitchProvider>
  );
}

export default ProjectSingle;
