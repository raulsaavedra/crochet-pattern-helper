"use client";

import React from "react";
import Button from "../../Button";
import { FormField, Input } from "../../Form";
import { FileText, Volleyball } from "lucide-react";
import { TProject } from "../ProjectDashboard";
import { useRouter } from "next/navigation";
import { createOrUpdateProject } from "@/app/actions/projects";
import { useForm } from "react-hook-form";
import { ProjectData } from "@/app/actions/projects/create-update";

interface ProjectFormProps {
  project?: TProject | null;
}

function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ProjectData>();

  const onSubmit = async (data: ProjectData) => {
    const { totalRows, totalRepeats, currentRow, currentRepeat } =
      data.stitches;

    clearErrors();

    if (Number(totalRows) < Number(currentRow)) {
      setError("stitches.totalRows", {
        message: "Total rows cannot be less than current row",
      });
      return;
    }

    if (Number(totalRepeats) < Number(currentRepeat)) {
      setError("stitches.totalRepeats", {
        message: "Total repeats cannot be less than current repeat",
      });
      return;
    }

    await createOrUpdateProject(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {project ? "Edit" : "Create"} Project
      </h1>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            placeholder="Name of the project"
            defaultValue={project?.name}
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
        </FormField>
        <Input
          type="text"
          id="slug"
          minLength={3}
          placeholder="Slug for the URL, must be unique"
          defaultValue={project?.slug}
          {...register("slug")}
          hidden
        />
        <FormField full>
          <label htmlFor="description">Description</label>
          <Input
            type="text"
            id="description"
            placeholder="Description of the project"
            defaultValue={project?.description}
            {...register("description")}
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
            defaultValue={project?.stitches.totalRows}
            {...register("stitches.totalRows", {
              required: "Total rows is required",
            })}
            error={errors.stitches?.totalRows?.message}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-repeats">Total Repeats</label>
          <Input
            type="number"
            id="stitches-total-repeats"
            defaultValue={project?.stitches.totalRepeats}
            {...register("stitches.totalRepeats", {
              required: "Total repeats is required",
            })}
            error={errors.stitches?.totalRepeats?.message}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-current-row">Current Row</label>
          <Input
            type="number"
            id="stitches-current-row"
            defaultValue={project?.stitches.currentRow || 0}
            {...register("stitches.currentRow", {
              required: "Current row is required",
            })}
            error={errors.stitches?.currentRow?.message}
          />
        </FormField>
        <FormField>
          <label htmlFor="stitches-current-repeat">Current Repeat</label>
          <Input
            type="number"
            id="stitches-current-repeat"
            defaultValue={project?.stitches.currentRepeat || 0}
            {...register("stitches.currentRepeat", {
              required: "Current repeat is required",
            })}
            error={errors.stitches?.currentRepeat?.message}
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
