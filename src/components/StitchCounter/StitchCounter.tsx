"use client";

import React, { useState } from "react";
import Button from "../Button";
import { TProject } from "../ProjectDashboard/ProjectDashboard";
import { Repeat, Shell, Volleyball } from "lucide-react";
import { increaseCount } from "@/app/actions/projects";
import { useDebouncedCallback } from "use-debounce";

function StitchCounter({ project }: { project: TProject }) {
  const initialRow = project.stitches.currentRow;
  const initialRepeat = project.stitches.currentRepeat;

  const [currentRow, setCurrentRow] = useState(initialRow);
  const [currentRepeat, setCurrentRepeat] = useState(initialRepeat);

  const totalRows = project.stitches.totalRows;
  const totalRepeats = project.stitches.totalRepeats;

  const handleRowChange = async () => {
    let nextRow: number;
    let nextRepeat: number;

    if (currentRow === totalRows) {
      if (currentRepeat === totalRepeats) {
        return;
      }
      nextRow = 0;
      nextRepeat = currentRepeat + 1;
    } else {
      nextRow = currentRow + 1;
      nextRepeat = currentRepeat;
    }

    setCurrentRow(nextRow);
    setCurrentRepeat(nextRepeat);
    handleRowSave(nextRow, nextRepeat);
  };

  const handleRowSave = useDebouncedCallback(
    async (row: number, repeat: number) => {
      await increaseCount(project.slug, row, repeat);
    },
    1000
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-4 text-xl md:text-2xl font-bold">
          <Volleyball className="text-primary-light w-5 h-5 md:w-6 md:h-6" />{" "}
          Row: {currentRow} / {totalRows}
        </p>
        <p className="flex items-center gap-4 text-xl md:text-2xl font-bold">
          <Repeat className="text-primary-light w-5 h-5 md:w-6 md:h-6" />{" "}
          Repeat: {currentRepeat} / {totalRepeats}
        </p>
      </div>
      <div className="flex justify-start">
        <Button
          className="max-w-[200px] w-full mt-2"
          disabled={currentRepeat === totalRepeats && currentRow === totalRows}
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
