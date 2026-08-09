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

export async function getAdminAccountEmail() {
  const account = await prisma.adminUser.findUnique({
    where: { id: "main" },
  });

  if (account?.email) return account.email;
  return process.env.ADMIN_EMAIL?.toLowerCase() || "";
}

export async function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = await prisma.adminUser.findUnique({
    where: { id: "main" },
  });

  if (account) {
    if (normalizedEmail !== account.email.toLowerCase()) {
      return false;
    }
    return bcrypt.compare(password, account.passwordHash);
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return false;
  }

  return normalizedEmail === adminEmail && password === adminPassword;
}

export async function updateAdminCredentials(input: {
  currentPassword: string;
  newEmail?: string;
  newPassword?: string;
}) {
  const session = await requireAdminSession();
  const currentEmail = session.email.toLowerCase();

  const valid = await verifyAdminCredentials(
    currentEmail,
    input.currentPassword
  );

  if (!valid) {
    throw new Error("CURRENT_PASSWORD_INVALID");
  }

  const nextEmail = (input.newEmail || currentEmail).trim().toLowerCase();
  if (!nextEmail.includes("@")) {
    throw new Error("INVALID_EMAIL");
  }

  const account = await prisma.adminUser.findUnique({
    where: { id: "main" },
  });

  let passwordHash = account?.passwordHash;

  if (input.newPassword) {
    if (input.newPassword.length < 8) {
      throw new Error("PASSWORD_TOO_SHORT");
    }
    passwordHash = await bcrypt.hash(input.newPassword, 12);
  } else if (!passwordHash) {
    const envPassword = process.env.ADMIN_PASSWORD;
    if (!envPassword) {
      throw new Error("PASSWORD_REQUIRED");
    }
    passwordHash = await bcrypt.hash(envPassword, 12);
  }

  await prisma.adminUser.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      email: nextEmail,
      passwordHash,
    },
    update: {
      email: nextEmail,
      passwordHash,
    },
  });

  await createAdminSession(nextEmail);
  return { email: nextEmail };
}
