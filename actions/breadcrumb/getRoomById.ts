"use server";

import { prisma } from "@/lib/prisma";

export async function getRoomById(roomId: number) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) throw new Error("Pas de room pour cet id");
    return { success: true as const, message: room };
  } catch (error) {
    console.log(error);
    return { success: false as const, message: String(error) };
  }
}
