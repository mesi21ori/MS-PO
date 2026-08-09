import { prisma } from "@/lib/prisma";

export async function getContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadMessageCount() {
  return prisma.contactMessage.count({
    where: { read: false },
  });
}
