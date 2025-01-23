"use client";
import React, { useState } from "react";
import { TProject } from "../ProjectDashboard/ProjectDashboard";
import Button from "../Button";
import { Eye, Pencil, Trash } from "lucide-react";
import Image from "next/image";

function ProjectCard({
  project,
  onEdit,
  onView,
  onDelete,
}: {
  project: TProject;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => Promise<void>;
}) {
  const [deleteStatus, setDeleteStatus] = useState<
    "default" | "confirm" | "loading" | "success"
  >("default");

  const handleOnDelete = async () => {
    if (deleteStatus === "default") {
      setDeleteStatus("confirm");
      return;
    }

    if (deleteStatus === "confirm") {
      setDeleteStatus("loading");
      setTimeout(async () => {
        await onDelete();
        setDeleteStatus("success");
      }, 1000);
      return;
    }
  };

  if (deleteStatus === "loading" || deleteStatus === "success") {
    return (
      <div className="flex justify-center ">
        <Image
          src="/staring-cat.gif"
          alt="Staring cat"
          width={150}
          height={150}
          className="rounded-full max-w-[150px] max-h-[150px]"
          quality={100}
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 70%",
          }}
        />
      </div>
    );
  }

  return (
    <div
      key={project.slug}
      className="p-6 px-8 border border-primary-light rounded-lg"
    >
      <h2 className="text-lg font-semibold">{project.name}</h2>
      {project.description && (
        <p className="text-base text-gray-500 mt-1">{project.description}</p>
      )}
      <div className="flex justify-start items-center gap-8 mt-4">
        <Button size="small" variant="filled" onClick={onView}>
          <Eye size={20} />
          <span>View</span>
        </Button>
        <Button size="small" variant="ghost" onClick={onEdit}>
          <Pencil size={20} />
          <span>Edit</span>
        </Button>
        <div className="flex-1 flex justify-end items-center">
          <Button
            size="small"
            variant="ghost"
            onClick={handleOnDelete}
            className="flex items-center gap-2"
          >
            <Trash
              className="text-primary-light relative bottom-[1px]"
              size={20}
            />
            <span className="text-primary-light">
              {deleteStatus === "confirm" ? "Confirm?" : "Delete"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
