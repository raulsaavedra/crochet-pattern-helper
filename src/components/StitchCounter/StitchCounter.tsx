"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { TProject } from "../ProjectDashboard/ProjectDashboard";
import { Repeat, Shell, Volleyball } from "lucide-react";

function StitchCounter({ project }: { project: TProject }) {
  const [row, setRow] = useState(project.stitches.currentRow);
  const [repeat, setRepeat] = useState(project.stitches.currentRepeat);

  const totalRows = project.stitches.totalRows;
  const totalRepeats = project.stitches.totalRepeats;

  const handleRowChange = () => {
    setRow(row + 1);
    if (row === totalRows) {
      setRow(0);
      if (repeat === totalRepeats) {
        return;
      }
      setRepeat(repeat + 1);
    }
  };

  useEffect(() => {
    const projects = localStorage.getItem("projects");
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      const foundProject = parsedProjects.find(
        (p: TProject) => p.slug === project.slug
      );
      if (foundProject) {
        foundProject.stitches.currentRow = row;
        foundProject.stitches.currentRepeat = repeat;
        localStorage.setItem("projects", JSON.stringify(parsedProjects));
      }
    }
  }, [row, repeat, project.slug]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-4 text-2xl font-bold">
          <Volleyball className="text-primary-light" size={24} /> Row: {row} /{" "}
          {totalRows}
        </p>
        <p className="flex items-center gap-4 text-2xl font-bold">
          <Repeat className="text-primary-light" size={24} /> Repeat: {repeat} /{" "}
          {totalRepeats}
        </p>
      </div>
      {status === "finished" && (
        <p className="text-2xl font-bold">🎉&nbsp;&nbsp;Finished!</p>
      )}
      <div className="flex justify-start">
        <Button
          className="max-w-[200px] w-full mt-2"
          disabled={repeat === totalRepeats && row === totalRows}
          onClick={handleRowChange}
        >
          <Shell size={24} />
          <span>Next Row</span>
        </Button>
      </div>
    </div>
  );
}

export default StitchCounter;
