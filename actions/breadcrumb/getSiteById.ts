"use server";

import { prisma } from "@/lib/prisma";

export async function getSiteById(siteId: number) {
  try {
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site) throw new Error("Pas de site pour cet id");
    return { success: true as const, message: site };
  } catch (error) {
    console.log(error);
    return { success: false as const, message: String(error) };
  }
}
