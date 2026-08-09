import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProjectById, slugify, toProjectDTO } from "@/lib/projects";
import { projectInputSchema } from "@/lib/validations/project-schema";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!project.published) {
      const session = await getAdminSession();
      if (!session) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = projectInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let slug = existing.slug;

    if (data.slug && data.slug !== existing.slug) {
      slug = slugify(data.slug);
    } else if (data.name !== existing.name) {
      slug = slugify(data.name);
    }

    if (slug !== existing.slug) {
      const conflict = await prisma.project.findUnique({ where: { slug } });
      if (conflict && conflict.id !== id) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const project = await prisma.project.update({
      where: { id },
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

    return NextResponse.json({ project: toProjectDTO(project) });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
