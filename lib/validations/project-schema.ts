import { z } from "zod";

const linkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url().or(z.literal("#")),
});

export const projectInputSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image is required"),
  link: z.string().min(1).default("#"),
  role: z.string().optional().nullable(),
  smallDescription: z.string().min(10, "Description is required"),
  technologies: z.array(z.string()).default([]),
  keyFeatures: z.array(z.string()).default([]),
  links: z.array(linkSchema).default([]),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  slug: z.string().optional(),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
