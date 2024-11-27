"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Project name must be at least 4 characters.",
  }),
  website: z.string().url({
    message: "Invalid URL.",
  }),
});

export type FormSchema = z.infer<typeof FormSchema>;

export default function ProjectForm() {
  const user = useQuery(api.user.viewer);

  const createNewProject = useMutation(api.project.createProject);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const projectId = await createNewProject({
        name: data.name,
        userEmail: user?.email as string,
        website: data.website,
      });
      if (projectId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "New project created.",
          description: "Find it in /console",
        });
        form.reset();
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your project was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Project creation failed.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="Cool project name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://coolproject.sh" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-14"></div>
        <Button
          disabled={loading}
          type="submit"
          className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          {loading ? "Creating..." : "Create project"}
        </Button>
      </form>
    </Form>
  );
}
