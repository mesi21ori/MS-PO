import { NextResponse } from "next/server";
import {
  createAdminSession,
  getAdminSession,
  getAdminUser,
  updateAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const admin = await getAdminUser();
    return NextResponse.json({ email: admin.email });
  } catch (error) {
    console.error("GET /api/auth/account error:", error);
    return NextResponse.json(
      { error: "Failed to load account" },
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
    const currentPassword = String(body.currentPassword ?? "");
    const email = body.email ? String(body.email).trim().toLowerCase() : undefined;
    const newPassword = body.newPassword
      ? String(body.newPassword)
      : undefined;
    const confirmPassword = body.confirmPassword
      ? String(body.confirmPassword)
      : undefined;

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400 }
      );
    }

    if (newPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match" },
        { status: 400 }
      );
    }

    const updated = await updateAdminCredentials({
      currentPassword,
      email,
      newPassword,
    });

    // Refresh session cookie if email changed
    await createAdminSession(updated.email);

    return NextResponse.json({
      success: true,
      email: updated.email,
      message: "Account updated successfully.",
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";

    if (code === "CURRENT_PASSWORD_INVALID") {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }
    if (code === "EMAIL_INVALID") {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    if (code === "PASSWORD_TOO_SHORT") {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }
    if (code === "NOTHING_TO_UPDATE") {
      return NextResponse.json(
        { error: "Enter a new email and/or new password to update" },
        { status: 400 }
      );
    }

    console.error("PUT /api/auth/account error:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
