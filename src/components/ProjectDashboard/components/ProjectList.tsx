"use client";

import React from "react";
import Button from "../../Button";
import ProjectCard from "../../ProjectCard/ProjectCard";
import { TProject } from "../ProjectDashboard";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/app/actions/projects";

interface ProjectListProps {
  projects: TProject[];
}

function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    await deleteProject(slug);
  };

  return (
    <div className="flex flex-col gap-4">
      {projects.length === 0 && (
        <p className="text-base text-gray-500">No projects yet</p>
      )}
      {projects.length > 0 && (
        <ul className="grid gap-4 mb-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onEdit={() => router.push(`/projects/edit/${project.slug}`)}
              onView={() => router.push(`/projects/view/${project.slug}`)}
              onDelete={async () => await handleDelete(project.slug)}
            />
          ))}
        </ul>
      )}
      <div className="flex justify mt-2">
        <Button
          className="w-full max-w-48"
          onClick={() => router.push("/projects/new")}
        >
          Add Project
        </Button>
      </div>
    </div>
  );
}

export { ProjectList };
