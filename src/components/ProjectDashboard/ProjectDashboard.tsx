"use client";

import React from "react";
import { Volleyball } from "lucide-react";
import { ProjectList } from "./components/ProjectList";

export type TStitches = {
  totalRows: number;
  totalRepeats: number;
  currentRow: number;
  currentRepeat: number;
};

export type TProject = {
  slug: string;
  name: string;
  description: string;
  user_id: string;
  stitches: TStitches;
};

function ProjectDashboard({ projects }: { projects: TProject[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2 text-secondary flex gap-3 items-center">
        Projects
        <span className="text-primary-light">
          <Volleyball size={28} />
        </span>
      </h1>
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectDashboard;
