import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getAllProjects,
  getPublishedProjects,
  slugify,
  toProjectDTO,
} from "@/lib/projects";
import { projectInputSchema } from "@/lib/validations/project-schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const session = await getAdminSession();

    if (all) {
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const projects = await getAllProjects();
      return NextResponse.json({ projects });
    }

    const projects = await getPublishedProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = projectInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const baseSlug = slugify(data.slug || data.name);
    let slug = baseSlug;
    let attempt = 1;

    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${attempt++}`;
    }

    const project = await prisma.project.create({
      data: {
        name: data.name,
        slug,
        category: data.category,
        image: data.image,
        link: data.link || "#",
        role: data.role || null,
        smallDescription: data.smallDescription,
        technologies: JSON.stringify(data.technologies ?? []),
        keyFeatures: JSON.stringify(data.keyFeatures ?? []),
        links: JSON.stringify(data.links ?? []),
        published: data.published ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });

    return NextResponse.json({ project: toProjectDTO(project) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
