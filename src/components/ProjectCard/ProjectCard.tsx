import React from "react";
import { TProject } from "../ProjectDashboard/ProjectDashboard";
import Button from "../Button";
import { Eye, Pencil } from "lucide-react";

function ProjectCard({
  project,
  onEdit,
  onView,
}: {
  project: TProject;
  onEdit: () => void;
  onView: () => void;
}) {
  return (
    <div
      key={project.slug}
      className="p-6 px-8 border border-primary-light rounded-lg"
    >
      <h2 className="text-lg font-semibold">{project.name}</h2>
      {project.description && (
        <p className="text-base text-gray-500 mt-1">{project.description}</p>
      )}
      <div className="flex justify-start gap-8 mt-4">
        <Button size="small" variant="filled" onClick={onView}>
          <Eye size={20} />
          <span>View</span>
        </Button>
        <Button size="small" variant="ghost" onClick={onEdit}>
          <Pencil size={20} />
          <span>Edit</span>
        </Button>
      </div>
    </div>
  );
}

export default ProjectCard;
