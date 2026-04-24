"use server";

import { Meeting } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import canDelete from "@/lib/utils/meeting/canDelete";

export default async function deleteMeeting(meetingToDelete: Meeting) {
  const { id, name } = meetingToDelete;
  try {
    //Obtenir la session
    const session = await auth();
    if (!session) throw new Error("Pas de session active");
    if (!session.user) throw new Error("Pas d'utilisateur connecté");
    if (!session.user.id) throw new Error("Pas d'id lié à l'utilisateur");
    const userId = session.user.id;

    //Vérification de l'auteur de la réunion pour suppression
    if (!canDelete(meetingToDelete, userId))
      throw new Error(
        "Vous ne pouvez pas supprimer cette réunion, vous n'en êtes pas l'auteur",
      );

    //Suppression de la réunion
    await prisma.meeting.delete({
      where: {
        id,
      },
    });
    return { success: true, message: `La réunion ${name} a bien été annulée` };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
