"use client";
import { TProject } from "@/components/ProjectDashboard/ProjectDashboard";
import ProjectSingle from "@/components/ProjectSingle/ProjectSingle";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Project() {
  const params = useParams();
  const slug = params.slug;

  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    const projects = localStorage.getItem("projects");

    if (projects) {
      setProjects(JSON.parse(projects));
    }
  }, []);

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectSingle project={project} />;
}

export default Project;
