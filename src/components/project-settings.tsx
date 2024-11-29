"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProject } from "@/lib/types";
import { Loader2, Settings } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";

export default function ProjectSettings({
  project,
}: {
  project: IProject | undefined | null;
}) {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState(project?.name);
  const [projectWebsite, setProjectWebsite] = useState(project?.website);
  const [loading, setLoading] = useState(false);

  const updateProject = useMutation(api.project.updateProject);
  const handleUpdateProject = async () => {
    setLoading(true);
    const status = await updateProject({
      projectId: project?._id as Id<"projects">,
      name: projectName as string,
      website: projectWebsite as string,
      summary: project?.summary as string,
      suggestions: project?.suggestions as string,
    });

    if (status === "updated") {
      setLoading(false);
      toast({
        variant: "default",
        title: "Project updated.",
        description: "Your project has been updated successfully.",
      });
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while storing summary and suggestions.",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="mx-2 h-auto rounded-full p-2">
          <Settings size={15} className="text-zinc-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-100"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input
              id="website"
              value={projectWebsite}
              onChange={(e) => setProjectWebsite(e.target.value)}
              className="col-span-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            onClick={() => handleUpdateProject()}
            className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? (
              <Loader2 className="h-7 w-7 animate-spin text-white" />
            ) : null}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
