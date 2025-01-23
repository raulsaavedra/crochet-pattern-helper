"use client";

import React from "react";
import Button from "../../Button";
import { FormField, Input } from "../../Form";
import { FileText, Volleyball } from "lucide-react";
import { TProject } from "../ProjectDashboard";
import { useRouter } from "next/navigation";
import { createOrUpdateProject } from "@/app/actions/projects";

interface ProjectFormProps {
  project?: TProject | null;
}

function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <form className="grid grid-cols-2 gap-4" action={createOrUpdateProject}>
        <div className="col-span-2">
          <p className="text-lg font-semibold flex items-center gap-2 mt-2">
            <FileText size={24} className="text-primary-light" />
            Project Details
          </p>
        </div>
        <FormField className="col-span-2">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Name of the project"
            defaultValue={project?.name}
          />
        </FormField>
        <Input
          type="text"
          id="slug"
          name="slug"
          minLength={3}
          placeholder="Slug for the URL, must be unique"
          defaultValue={project?.slug}
          hidden
        />
        <FormField full>
          <label htmlFor="description">Description</label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Description of the project"
            defaultValue={project?.description}
          />
        </FormField>
        <div className="col-span-2 mt-4">
          <p className="text-lg font-semibold flex items-center gap-2">
            <Volleyball size={24} className="text-primary-light" />
            Stitches
          </p>
        </div>
        <FormField>
          <label htmlFor="stitches-rows">Total Rows</label>
          <Input
            type="number"
            id="stitches-total-rows"
            name="stitches-total-rows"
            required
            defaultValue={project?.stitches.totalRows}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-repeats">Total Repeats</label>
          <Input
            type="number"
            id="stitches-total-repeats"
            name="stitches-total-repeats"
            required
            defaultValue={project?.stitches.totalRepeats}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-current-row">Current Row</label>
          <Input
            type="number"
            id="stitches-current-row"
            name="stitches-current-row"
            defaultValue={project?.stitches.currentRow || 0}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-current-repeat">Current Repeat</label>
          <Input
            type="number"
            id="stitches-current-repeat"
            name="stitches-current-repeat"
            defaultValue={project?.stitches.currentRepeat || 0}
          />
        </FormField>
        <div className="col-span-2 flex flex-col gap-6">
          <Button className="mt-4 w-full" type="submit">
            {project ? "Update" : "Create"}
          </Button>
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export { ProjectForm };
