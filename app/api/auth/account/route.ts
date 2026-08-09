import { NextResponse } from "next/server";
import {
  getAdminAccountEmail,
  getAdminSession,
  updateAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = await getAdminAccountEmail();
  return NextResponse.json({ email: email || session.email });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentPassword = String(body.currentPassword ?? "");
    const newEmail = body.newEmail
      ? String(body.newEmail).trim().toLowerCase()
      : undefined;
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

    if (!newEmail && !newPassword) {
      return NextResponse.json(
        { error: "Provide a new email and/or new password" },
        { status: 400 }
      );
    }

    if (newPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password confirmation does not match" },
        { status: 400 }
      );
    }

    const result = await updateAdminCredentials({
      currentPassword,
      newEmail,
      newPassword,
    });

    return NextResponse.json({
      success: true,
      email: result.email,
      message: "Account updated successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update account";

    if (message === "CURRENT_PASSWORD_INVALID") {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }
    if (message === "INVALID_EMAIL") {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (message === "PASSWORD_TOO_SHORT") {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }
    if (message === "PASSWORD_REQUIRED") {
      return NextResponse.json(
        { error: "Please set a new password as well" },
        { status: 400 }
      );
    }
    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("PUT /api/auth/account error:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
