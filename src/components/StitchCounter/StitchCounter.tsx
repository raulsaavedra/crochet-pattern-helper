"use client";

import React from "react";
import Button from "../Button";
import { Repeat, Shell, Volleyball, RotateCcw } from "lucide-react";
import { useStitch } from "./StitchContext";

function StitchCounter() {
  const { currentRow, currentRepeat, totalRows, totalRepeats, handleRow } =
    useStitch();

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
      <div className="flex justify-start gap-4 md:flex-row flex-col">
        <Button
          className="max-w-[200px] w-full mt-2"
          disabled={currentRepeat === 0 && currentRow === 0}
          onClick={() => handleRow("decrease")}
          size="small"
        >
          <RotateCcw size={24} />
          <span>Previous Row</span>
        </Button>
        <Button
          className="max-w-[200px] w-full mt-2"
          disabled={currentRepeat === totalRepeats && currentRow === totalRows}
          onClick={() => handleRow("increase")}
          size="small"
        >
          <Shell size={24} />
          <span>Next Row</span>
        </Button>
      </div>
    </div>
  );
}

export default StitchCounter;
