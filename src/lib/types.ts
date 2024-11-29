import { Id } from "../../convex/_generated/dataModel";

export type IProject = {
  _id: Id<"projects">;
  _creationTime: number;
  userId: Id<"users">;
  userEmail: string;
  name: string;
  website: string;
  summary: string;
  suggestions?: string | undefined;
};

export type IFeedback = {
  _id: Id<"feedback">;
  _creationTime: number;
  type: string;
  by: string;
  content: string;
  projectId: Id<"projects">;
  location: string;
  country_code: string;
  route: string;
  status: string;
  sentiment: string;
};
