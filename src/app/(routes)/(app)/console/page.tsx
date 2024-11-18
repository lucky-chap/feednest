import ProjectCard from "@/components/project-card";

export default async function Page() {
  const projects: any[] = [];
  console.log("ALl projects", projects);
  return (
    <div className="px-20 py-3">
      <div className="flex items-center">
        <h2 className="mr-2 text-lg font-medium">Your projects</h2>
        <span className="me-2 rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          {projects.length} in total
        </span>
      </div>
      <div className="py-10">
        {/* <ProjectCard /> */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {projects.length === 0 && (
          <div className="grid h-[70vh] place-content-center">
            <p>No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}
