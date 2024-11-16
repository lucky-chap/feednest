import ProjectCard from "@/components/project-card";
import React from "react";

export default function Page() {
  return (
    <div className="px-20 py-3">
      <div className="flex items-center">
        <h2 className="mr-2 font-medium">Your projects</h2>
        <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          21 in total
        </span>
      </div>
      <div className="py-10">
        <ProjectCard />
      </div>
    </div>
  );
}
