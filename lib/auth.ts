import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  email: string;
  role: "admin";
};

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin" || typeof payload.email !== "string") {
      return null;
    }
    return { email: payload.email, role: "admin" };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function ensureAdminUser() {
  const existing = await prisma.adminUser.findUnique({
    where: { id: "main" },
  });
  if (existing) return existing;

  const email = (process.env.ADMIN_EMAIL || "admin@meseret.dev")
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";
  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.adminUser.create({
    data: {
      id: "main",
      email,
      passwordHash,
    },
  });
}

export async function getAdminUser() {
  return ensureAdminUser();
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await ensureAdminUser();
  const normalized = email.trim().toLowerCase();

  if (normalized !== admin.email.toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, admin.passwordHash);
}

export async function updateAdminCredentials(input: {
  currentPassword: string;
  email?: string;
  newPassword?: string;
}) {
  const admin = await ensureAdminUser();
  const valid = await bcrypt.compare(input.currentPassword, admin.passwordHash);

  if (!valid) {
    throw new Error("CURRENT_PASSWORD_INVALID");
  }

  const nextEmail = input.email?.trim().toLowerCase();
  const data: { email?: string; passwordHash?: string } = {};

  if (nextEmail && nextEmail !== admin.email.toLowerCase()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      throw new Error("EMAIL_INVALID");
    }
    data.email = nextEmail;
  }

  if (input.newPassword) {
    if (input.newPassword.length < 8) {
      throw new Error("PASSWORD_TOO_SHORT");
    }
    data.passwordHash = await bcrypt.hash(input.newPassword, 10);
  }

  if (!data.email && !data.passwordHash) {
    throw new Error("NOTHING_TO_UPDATE");
  }

  return prisma.adminUser.update({
    where: { id: "main" },
    data,
  });
}
