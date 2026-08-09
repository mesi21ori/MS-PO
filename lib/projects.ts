import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export type ProjectLink = {
  name: string;
  url: string;
};

export type ProjectDTO = {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  link: string;
  role?: string;
  smallDescription: string;
  technologies: string[];
  keyFeatures: string[];
  links: ProjectLink[];
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function toProjectDTO(project: Project): ProjectDTO {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    category: project.category,
    image: project.image,
    link: project.link,
    role: project.role ?? undefined,
    smallDescription: project.smallDescription,
    technologies: parseJsonArray<string>(project.technologies),
    keyFeatures: parseJsonArray<string>(project.keyFeatures),
    links: parseJsonArray<ProjectLink>(project.links),
    published: project.published,
    sortOrder: project.sortOrder,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function getPublishedProjects() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return projects.map(toProjectDTO);
}

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return projects.map(toProjectDTO);
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({ where: { id } });
  return project ? toProjectDTO(project) : null;
}

export function groupProjectsByCategory(projects: ProjectDTO[]) {
  const tabsMap = new Map<string, ProjectDTO[]>();

  for (const project of projects) {
    const existing = tabsMap.get(project.category) ?? [];
    existing.push(project);
    tabsMap.set(project.category, existing);
  }

  return Array.from(tabsMap.entries()).map(([tabName, items]) => ({
    tabName,
    projects: items,
  }));
}
