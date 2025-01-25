"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { changeCount } from "@/app/actions/projects";
import { TProject } from "../ProjectDashboard/ProjectDashboard";

interface StitchContextType {
  currentRow: number;
  currentRepeat: number;
  totalRows: number;
  totalRepeats: number;
  isSaving: boolean;
  handleRow: (direction: "increase" | "decrease") => Promise<void>;
}

const StitchContext = createContext<StitchContextType | null>(null);

export function useStitch() {
  const context = useContext(StitchContext);
  if (!context) {
    throw new Error("useStitch must be used within a StitchProvider");
  }
  return context;
}

interface StitchProviderProps {
  children: React.ReactNode;
  project: TProject;
}

function StitchProvider({ children, project }: StitchProviderProps) {
  const initialRow = project.stitches.currentRow;
  const initialRepeat = project.stitches.currentRepeat;

  const [currentRow, setCurrentRow] = useState(initialRow);
  const [currentRepeat, setCurrentRepeat] = useState(initialRepeat);
  const [isSaving, setIsSaving] = useState(false);

  const totalRows = project.stitches.totalRows;
  const totalRepeats = project.stitches.totalRepeats;

  const handleRowSave = useDebouncedCallback(
    async (row: number, repeat: number) => {
      try {
        await changeCount(project.slug, row, repeat);
      } finally {
        setIsSaving(false);
      }
    },
    1000
  );

  const handleRow = useCallback(
    async (direction: "increase" | "decrease") => {
      let nextRow: number;
      let nextRepeat: number;

      switch (direction) {
        case "increase":
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
          break;
        case "decrease":
          if (currentRow === 0) {
            if (currentRepeat === 0) {
              return;
            }
            nextRow = totalRows;
            nextRepeat = currentRepeat - 1;
          } else {
            nextRow = currentRow - 1;
            nextRepeat = currentRepeat;
          }
          break;
      }

      setCurrentRow(nextRow);
      setCurrentRepeat(nextRepeat);
      setIsSaving(true);
      handleRowSave(nextRow, nextRepeat);
    },
    [currentRow, currentRepeat, totalRows, totalRepeats, handleRowSave]
  );
  const value = useMemo(
    () => ({
      currentRow,
      currentRepeat,
      totalRows,
      totalRepeats,
      handleRow,
      isSaving,
    }),
    [currentRow, currentRepeat, totalRows, totalRepeats, handleRow, isSaving]
  );

  return (
    <StitchContext.Provider value={value}>{children}</StitchContext.Provider>
  );
}

export { StitchProvider };
