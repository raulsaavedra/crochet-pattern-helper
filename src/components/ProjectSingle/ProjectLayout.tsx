"use client";

import React from "react";
import { TProject } from "../ProjectDashboard/ProjectDashboard";
import Button from "../Button";
import { ArrowLeft } from "lucide-react";
import { useStitch } from "../StitchCounter/StitchContext";

interface ProjectLayoutProps {
  project: TProject;
  children: React.ReactNode;
}

function ProjectLayout({ project, children }: ProjectLayoutProps) {
  const { isSaving } = useStitch();

  return (
    <div>
      <div className="mb-10">
        <Button
          className="max-w-fit"
          variant="ghost"
          as="link"
          href={`/`}
          disabled={isSaving}
        >
          <ArrowLeft size={32} />
          <span>Back to projects</span>
        </Button>
      </div>
      <div className="border border-primary-light px-6 lg:px-8 py-8 rounded-lg">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{project.name}</h1>
          <p className="text-base md:text-lg">{project.description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ProjectLayout;
