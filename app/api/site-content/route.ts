import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("GET /api/site-content error:", error);
    return NextResponse.json(
      { error: "Failed to load site content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const content = body.content as SiteContent;

    if (!content?.platform?.name || !content?.navbar || !content?.heroSection) {
      return NextResponse.json(
        { error: "Invalid site content payload" },
        { status: 400 }
      );
    }

    const saved = await saveSiteContent(content);
    return NextResponse.json({ content: saved });
  } catch (error) {
    console.error("PUT /api/site-content error:", error);
    return NextResponse.json(
      { error: "Failed to save site content" },
      { status: 500 }
    );
  }
}
