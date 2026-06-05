"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getRoomById(roomId: number) {
  try {
    const session = await auth();
    if (!session) throw new Error("Pas de session active");
    if (!session.user) throw new Error("Pas d'utilisateur connecté");
    if (!session.user.id) throw new Error("Pas d'id lié à l'utilisateur");
    const userId = session.user.id;
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
