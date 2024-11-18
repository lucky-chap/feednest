import ProjectForm from "@/components/project-form";
import React from "react";

export default function NewProject() {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-4xl px-20 py-3">
      <h2 className="mr-2 text-lg font-medium">Create a new project</h2>
      <ProjectForm />
    </div>
  );
}
