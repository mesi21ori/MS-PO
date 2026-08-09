import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getContactMessages } from "@/lib/messages";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getContactMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }
}
